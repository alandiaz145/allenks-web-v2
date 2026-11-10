/* The public catalogue lists R2 filenames with Alan's explicit consent.
 * New uploads get a review card and individual page automatically.
 * Filenames NEVER grant playback or download permission.
 */
(() => {
  "use strict";
  const data = window.ALLENKS_CONTENT;
  const endpoint = "https://allenks-music-media.allenbeatsadb.workers.dev/catalog.json";
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]);
  const comparable = value => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, "");
  const titleFromFilename = filename => filename
    .replace(/\.mp3$/i, "")
    .replace(/^ALLEN\s*KS\s*[-–.]\s*/i, "")
    .replace(/^ALLEN\s*[-–]\s*/i, "")
    .replace(/\s*[-–]\s*original SoundCloud$/i, "")
    .replace(/\s*\(Mp3\)$/i, "")
    .trim();
  const stableId = name => {
    let hash = 2166136261;
    for (const char of name) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
    const slug = titleFromFilename(name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 65) || "archivo";
    return `r2-${slug}-${hash.toString(36)}`;
  };
  const reviewType = (title, filename) => {
    const name = `${title} ${filename}`;
    if (/\bREMIX\b|REMIX CONTEST/i.test(name)) return "Remix";
    if (/\bVIP\b|\bEDIT\b/i.test(name)) return "VIP / Edit";
    if (/\bFT\.?\b|\bFEAT\.?\b|\bX\b|ALLEN\s*KS\s*,/i.test(name)) return "Colaboración";
    return "Original / por confirmar";
  };
  const thirdParty = name => /SKRILLEX|VIRTUAL RIOT|YSY.?A|METRO BOOMIN|HERMEX|RYNOME|MALEVO|REVENANT|SOPHIA|KOLD AXN/i.test(name);

  window.ALLENKS_CATALOG_READY = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);
    try {
      const response = await fetch(endpoint, {signal: controller.signal, mode: "cors"});
      if (!response.ok) throw new Error("catalogue unavailable");
      const listing = await response.json();
      if (!Array.isArray(listing.names)) throw new Error("catalogue invalid");
      const existing = new Set(data.tracks.map(track => comparable(track.title)));
      const seen = new Map();
      const additions = [];
      for (const filename of listing.names) {
        if (typeof filename !== "string" || !/\.mp3$/i.test(filename)) continue;
        const title = titleFromFilename(filename);
        const key = comparable(title);
        if (!title || existing.has(key)) continue;
        const repeated = seen.has(key);
        seen.set(key, (seen.get(key) || 0) + 1);
        const type = reviewType(title, filename);
        const ambiguous = /^(from PIECES|LOOK AT ME NOW|REVENANT|SHOCK DAMAGE|B\.U\.H\.O)/i.test(title);
        additions.push({
          id: stableId(filename), title: escapeHtml(title), category: /Remix|Colaboración/.test(type) ? "collaboration" : "catalogue",
          sourceFile: escapeHtml(filename), versionType: type,
          reviewStatus: thirdParty(filename) ? "REVISAR DERECHOS" : repeated ? "POSIBLE DUPLICADO" : ambiguous ? "REVISAR TÍTULO" : "AUDIO POR VALIDAR",
          artwork: null, audio: null, download: null, durationLabel: "--:--", theme: ["lime","cyan","purple","acid"][additions.length % 4],
          filesPending: true, salesEnabled: false
        });
      }
      data.tracks.push(...additions);
      data.catalogSource = {detected: listing.names.length, pending: additions.length, updatedAutomatically: true};
    } catch (error) {
      data.catalogSource = {detected: null, pending: null, updatedAutomatically: false};
      console.warn("El catálogo en vivo no está disponible; se muestra la versión respaldada.");
    } finally { clearTimeout(timeout); }
  })();
})();
