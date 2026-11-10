/*
 * Motor de reproducción por muestras: decodifica el MP3 completo.
 * Así adelantar o retroceder no depende del índice MP3 ni de solicitudes Range.
 * Conserva una alternativa HTMLAudioElement para navegadores sin Web Audio.
 */
(() => {
  "use strict";
  class PreciseAudio extends EventTarget {
    constructor(native) {
      super();
      this.native = native;
      this._context = null;
      this._gain = null;
      this._source = null;
      this._buffer = null;
      this._bufferPromise = null;
      this._src = "";
      this._position = 0;
      this._startedAt = 0;
      this._paused = true;
      this._volume = .85;
      this._request = 0;
      this._timer = null;
      this._nativeMode = !Boolean(window.AudioContext || window.webkitAudioContext);
      this.isLoading = false;
      const events = ["loadedmetadata", "canplay", "play", "playing", "pause", "timeupdate", "seeking", "seeked", "ended", "error", "waiting"];
      for (const name of events) native.addEventListener(name, () => {
        if (this._nativeMode) this.dispatchEvent(new Event(name));
      });
    }
    get src() { return this._src; }
    set src(url) { this._src = url || ""; }
    get currentSrc() { return this._nativeMode ? this.native.currentSrc : this._src; }
    get paused() { return this._nativeMode ? this.native.paused : this._paused; }
    get duration() { return this._nativeMode ? this.native.duration : this._buffer?.duration ?? NaN; }
    get currentTime() {
      if (this._nativeMode) return this.native.currentTime;
      const seconds = this._paused ? this._position : this._position + this._context.currentTime - this._startedAt;
      return Math.max(0, Math.min(Number.isFinite(this.duration) ? this.duration : Infinity, seconds));
    }
    set currentTime(seconds) {
      const target = Math.max(0, Math.min(Number.isFinite(this.duration) ? Math.max(0, this.duration - .02) : Infinity, Number(seconds) || 0));
      if (this._nativeMode) { this.native.currentTime = target; return; }
      const playing = !this._paused;
      this.dispatchEvent(new Event("seeking"));
      if (playing) this._stopSource();
      this._position = target;
      if (playing) this._startSource();
      this.dispatchEvent(new Event("seeked"));
      this.dispatchEvent(new Event("timeupdate"));
    }
    get volume() { return this._nativeMode ? this.native.volume : this._volume; }
    set volume(value) {
      this._volume = Math.max(0, Math.min(1, Number(value) || 0));
      this.native.volume = this._volume;
      if (this._gain) this._gain.gain.value = this._volume;
    }
    getAttribute(name) { return name === "src" ? this._src || null : this.native.getAttribute(name); }
    removeAttribute(name) {
      if (name === "src") { this._src = ""; this.load(); }
      else this.native.removeAttribute(name);
    }
    load() {
      this._request++;
      if (this._nativeMode) {
        if (this._src) this.native.src = this._src;
        else this.native.removeAttribute("src");
        this.native.load();
        return;
      }
      this._stopSource();
      this._paused = true;
      this._position = 0;
      this._buffer = null;
      this._bufferPromise = null;
      this.isLoading = false;
      this._stopTimer();
    }
    _ensureContext() {
      if (!this._context) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this._context = new AudioContextClass();
        this._gain = this._context.createGain();
        this._gain.gain.value = this._volume;
        this._gain.connect(this._context.destination);
      }
      return this._context;
    }
    _stopSource() {
      if (!this._source) return;
      this._source.onended = null;
      try { this._source.stop(); } catch { /* Ya se detuvo. */ }
      this._source.disconnect();
      this._source = null;
    }
    _startSource() {
      if (!this._buffer || !this._context) return;
      const node = this._context.createBufferSource();
      node.buffer = this._buffer;
      node.connect(this._gain);
      this._source = node;
      this._startedAt = this._context.currentTime;
      node.onended = () => {
        if (this._source !== node || this._paused) return;
        this._source = null;
        node.disconnect();
        this._paused = true;
        this._position = 0;
        this._stopTimer();
        this.dispatchEvent(new Event("ended"));
      };
      node.start(0, Math.min(this._position, Math.max(0, this._buffer.duration - .02)));
    }
    _stopTimer() {
      if (this._timer !== null) clearInterval(this._timer);
      this._timer = null;
    }
    async _decode() {
      if (this._buffer) return this._buffer;
      if (!this._bufferPromise) {
        const url = this._src;
        this._bufferPromise = (async () => {
          const response = await fetch(url, { credentials: "same-origin" });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const bytes = await response.arrayBuffer();
          const result = await this._context.decodeAudioData(bytes);
          if (this._src !== url) throw new Error("La selección cambió mientras cargaba el MP3.");
          this._buffer = result;
          this.dispatchEvent(new Event("loadedmetadata"));
          this.dispatchEvent(new Event("canplay"));
          return result;
        })().catch(error => { this._bufferPromise = null; throw error; });
      }
      return this._bufferPromise;
    }
    async _useNative() {
      this._nativeMode = true;
      this._stopSource();
      this._stopTimer();
      if (this.native.getAttribute("src") !== this._src) {
        this.native.src = this._src;
        this.native.load();
        if (this._position > 0) this.native.currentTime = this._position;
      }
      this.native.volume = this._volume;
      await this.native.play();
    }
    async play() {
      if (this._nativeMode) return this._useNative();
      if (!this._paused) return;
      if (!this._src) throw new Error("No hay un archivo de audio seleccionado.");
      const ticket = ++this._request;
      let context;
      try {
        context = this._ensureContext();
        const resumed = context.resume(); // Activar el audio durante el gesto del usuario.
        this.isLoading = true;
        this.dispatchEvent(new Event("loadstart"));
        await Promise.all([resumed, this._decode()]);
        if (ticket !== this._request) return;
        this.isLoading = false;
        this._paused = false;
        this._startSource();
        this._stopTimer();
        this._timer = setInterval(() => this.dispatchEvent(new Event("timeupdate")), 120);
        this.dispatchEvent(new Event("play"));
        this.dispatchEvent(new Event("playing"));
      } catch (error) {
        this.isLoading = false;
        if (ticket !== this._request) return;
        // La reproducción nativa mantiene el servicio disponible si Web Audio falla.
        await this._useNative();
      }
    }
    pause() {
      if (this._nativeMode) { this.native.pause(); return; }
      const wasActive = !this._paused || this.isLoading;
      if (!this._paused) this._position = this.currentTime;
      this._request++;
      this._paused = true;
      this.isLoading = false;
      this._stopSource();
      this._stopTimer();
      if (wasActive) this.dispatchEvent(new Event("pause"));
    }
  }
  window.PreciseAudio = PreciseAudio;
})();
