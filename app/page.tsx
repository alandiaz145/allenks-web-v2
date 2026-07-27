"use client";

import { useEffect, useRef, useState } from "react";

const navigationItems = [
  { label: "Descargas" },
  { label: "Tienda" },
  { label: "Sorteos" },
  { label: "Spartans", href: "#spartans" },
  { label: "Asesoramiento" },
  { label: "Otra Noche" },
];

const musicLinks = {
  latestCover: "",
  latestYouTubeId: "3u6WUPHy0fI",
  latestYouTubeStart: 19,
  upcomingSoundCloudUrl:
    "https://api.soundcloud.com/tracks/soundcloud:tracks:2367584102?secret_token=s-9N3Owgy78ze",
};

const nextReleaseDate = "2026-08-06T00:00:00-03:00";

const communityStats = [
  { platform: "Spotify", value: "126", unit: "seguidores", theme: "spotify" },
  {
    platform: "SoundCloud",
    value: "689",
    unit: "seguidores",
    theme: "soundcloud",
  },
  {
    platform: "YouTube",
    value: "1,88K",
    unit: "suscriptores",
    theme: "youtube",
  },
];

const youtubePlaylists = [
  { title: "PLAYLIST 01", meta: "YouTube · enlace pendiente", theme: "youtube" },
  { title: "PLAYLIST 02", meta: "YouTube · enlace pendiente", theme: "youtube" },
  { title: "PLAYLIST 03", meta: "YouTube · enlace pendiente", theme: "youtube" },
];

const discoveryPlaylists = [
  {
    title: "PLAYLIST DE SOUNDCLOUD",
    meta: "Selección pendiente",
    theme: "soundcloud",
  },
  {
    title: "MÁS MÚSICA DE ALLEN KS",
    meta: "Selección pendiente",
    theme: "spotify",
  },
  {
    title: "DUBSTEP ARGENTINO",
    meta: "Selección pendiente",
    theme: "youtube",
  },
];

const placeholderLiveDates = [
  {
    day: "00",
    month: "MES",
    city: "CIUDAD / PROVINCIA",
    venue: "LUGAR O FESTIVAL",
  },
  {
    day: "00",
    month: "MES",
    city: "CIUDAD / PROVINCIA",
    venue: "LUGAR O FESTIVAL",
  },
  {
    day: "00",
    month: "MES",
    city: "CIUDAD / PROVINCIA",
    venue: "LUGAR O FESTIVAL",
  },
];

const liveVideos = [
  {
    videoId: "gj2hWnohCco",
    start: 3522,
    title: "ALLEN KS tocando en vivo con IKI",
  },
  {
    videoId: "fo5r5zwix6A",
    start: 913,
    title: "ALLEN KS en vivo — video 2",
  },
  {
    videoId: "t1Ax3fmWiYE",
    start: 548,
    title: "ALLEN KS en vivo — video 3",
  },
  {
    videoId: "kwbqAT45G00",
    start: 491,
    title: "ALLEN KS en vivo — video 4",
  },
];

const spartansAreas = [
  {
    number: "01",
    title: "RELEASES",
    description: "Catálogo y lanzamientos del sello.",
  },
  {
    number: "02",
    title: "ARTISTS",
    description: "Productores que forman parte del proyecto.",
  },
  {
    number: "03",
    title: "DEMOS",
    description: "Canal para presentar nueva música.",
  },
];

const footerSocials = [
  {
    name: "Instagram",
    handle: "@DUBSTEPWACHO",
    href: "https://www.instagram.com/dubstepwacho/",
    theme: "instagram",
  },
  {
    name: "Spotify",
    handle: "ALLEN KS",
    href: "https://open.spotify.com/artist/2Qutt1ypoIqkTMZEELO8TZ",
    theme: "spotify",
  },
  {
    name: "SoundCloud",
    handle: "ALLENKSMUSIC",
    href: "https://soundcloud.com/allenksmusic",
    theme: "soundcloud",
  },
  {
    name: "YouTube",
    handle: "@ALLENKSMUSIC",
    href: "https://www.youtube.com/@allenksmusic",
    theme: "youtube",
  },
];

type YouTubePlayerInstance = {
  destroy: () => void;
  mute: () => void;
  playVideo: () => void;
  setVolume: (volume: number) => void;
};

type YouTubePlayerEvent = {
  target: YouTubePlayerInstance;
};

type YouTubePlayerStateEvent = {
  data: number;
};

type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      width: string;
      height: string;
      videoId: string;
      playerVars: {
        start: number;
        rel: number;
        playsinline: number;
      };
      events: {
        onReady: (event: YouTubePlayerEvent) => void;
        onStateChange: (event: YouTubePlayerStateEvent) => void;
      };
    },
  ) => YouTubePlayerInstance;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
};

type YouTubeWindow = Window & {
  YT?: YouTubeApi;
  onYouTubeIframeAPIReady?: () => void;
};

type SoundCloudWidget = {
  bind: (eventName: string, listener: () => void) => void;
  unbind: (eventName: string) => void;
};

type SoundCloudWidgetFactory = {
  (iframe: HTMLIFrameElement): SoundCloudWidget;
  Events: {
    PLAY: string;
    PAUSE: string;
    FINISH: string;
  };
};

type SoundCloudWindow = Window & {
  SC?: {
    Widget: SoundCloudWidgetFactory;
  };
};

let youtubeApiPromise: Promise<YouTubeApi> | null = null;
let soundCloudApiPromise: Promise<SoundCloudWindow["SC"]> | null = null;

function loadYouTubeApi() {
  const browserWindow = window as YouTubeWindow;

  if (browserWindow.YT?.Player) {
    return Promise.resolve(browserWindow.YT);
  }

  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise<YouTubeApi>((resolve, reject) => {
      const previousReadyHandler = browserWindow.onYouTubeIframeAPIReady;

      browserWindow.onYouTubeIframeAPIReady = () => {
        previousReadyHandler?.();

        if (browserWindow.YT) {
          resolve(browserWindow.YT);
        }
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = () => {
          youtubeApiPromise = null;
          reject(new Error("No se pudo cargar la API de YouTube."));
        };
        document.head.appendChild(script);
      }
    });
  }

  return youtubeApiPromise;
}

function loadSoundCloudApi() {
  const browserWindow = window as SoundCloudWindow;

  if (browserWindow.SC?.Widget) {
    return Promise.resolve(browserWindow.SC);
  }

  if (!soundCloudApiPromise) {
    soundCloudApiPromise = new Promise<SoundCloudWindow["SC"]>(
      (resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
          'script[src="https://w.soundcloud.com/player/api.js"]',
        );
        const script = existingScript ?? document.createElement("script");

        script.addEventListener(
          "load",
          () => {
            if (browserWindow.SC) {
              resolve(browserWindow.SC);
            }
          },
          { once: true },
        );
        script.addEventListener(
          "error",
          () => {
            soundCloudApiPromise = null;
            reject(new Error("No se pudo cargar la API de SoundCloud."));
          },
          { once: true },
        );

        if (!existingScript) {
          script.src = "https://w.soundcloud.com/player/api.js";
          script.async = true;
          document.head.appendChild(script);
        }
      },
    );
  }

  return soundCloudApiPromise;
}

function YouTubePlayer({
  className,
  videoId,
  start,
  title,
  initialVolume,
  autoPlayMutedWhenVisible = false,
  onPlaybackChange,
}: {
  className: string;
  videoId: string;
  start: number;
  title: string;
  initialVolume?: number;
  autoPlayMutedWhenVisible?: boolean;
  onPlaybackChange?: (isPlaying: boolean) => void;
}) {
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let player: YouTubePlayerInstance | null = null;
    let autoplayObserver: IntersectionObserver | null = null;

    loadYouTubeApi()
      .then((api) => {
        if (cancelled || !playerHostRef.current) {
          return;
        }

        player = new api.Player(playerHostRef.current, {
          width: "100%",
          height: "100%",
          videoId,
          playerVars: {
            start,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              if (initialVolume !== undefined) {
                event.target.setVolume(initialVolume);
              }

              if (autoPlayMutedWhenVisible) {
                event.target.mute();

                if ("IntersectionObserver" in window && playerWrapperRef.current) {
                  autoplayObserver = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        event.target.playVideo();
                        autoplayObserver?.disconnect();
                      }
                    },
                    { threshold: 0.5 },
                  );
                  autoplayObserver.observe(playerWrapperRef.current);
                } else {
                  event.target.playVideo();
                }
              }
            },
            onStateChange: (event) => {
              if (event.data === api.PlayerState.PLAYING) {
                onPlaybackChange?.(true);
              } else if (
                event.data === api.PlayerState.PAUSED ||
                event.data === api.PlayerState.ENDED ||
                event.data === api.PlayerState.CUED
              ) {
                onPlaybackChange?.(false);
              }
            },
          },
        });
      })
      .catch(() => {
        onPlaybackChange?.(false);
      });

    return () => {
      cancelled = true;
      autoplayObserver?.disconnect();
      onPlaybackChange?.(false);
      player?.destroy();
    };
  }, [
    autoPlayMutedWhenVisible,
    initialVolume,
    onPlaybackChange,
    start,
    videoId,
  ]);

  return (
    <div
      ref={playerWrapperRef}
      className={`${className} youtube-player-api`}
      aria-label={title}
    >
      <div ref={playerHostRef} />
    </div>
  );
}

function SoundCloudPlayer({
  url,
  onPlaybackChange,
}: {
  url: string;
  onPlaybackChange: (isPlaying: boolean) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let cancelled = false;
    let widget: SoundCloudWidget | null = null;
    let eventNames: SoundCloudWidgetFactory["Events"] | null = null;

    loadSoundCloudApi()
      .then((api) => {
        if (cancelled || !api || !iframeRef.current) {
          return;
        }

        widget = api.Widget(iframeRef.current);
        eventNames = api.Widget.Events;
        widget.bind(eventNames.PLAY, () => onPlaybackChange(true));
        widget.bind(eventNames.PAUSE, () => onPlaybackChange(false));
        widget.bind(eventNames.FINISH, () => onPlaybackChange(false));
      })
      .catch(() => {
        onPlaybackChange(false);
      });

    return () => {
      cancelled = true;
      onPlaybackChange(false);

      if (widget && eventNames) {
        widget.unbind(eventNames.PLAY);
        widget.unbind(eventNames.PAUSE);
        widget.unbind(eventNames.FINISH);
      }
    };
  }, [onPlaybackChange]);

  return (
    <iframe
      ref={iframeRef}
      className="soundcloud-square"
      title="Próximo lanzamiento de ALLEN KS en SoundCloud"
      width="100%"
      height="100%"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
        url,
      )}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&show_artwork=true`}
    />
  );
}

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getCountdownValue(): CountdownValue {
  const difference = new Date(nextReleaseDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference % 86_400_000) / 3_600_000),
    minutes: Math.floor((difference % 3_600_000) / 60_000),
    seconds: Math.floor((difference % 60_000) / 1_000),
    expired: false,
  };
}

function Countdown() {
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdownValue());

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1_000);

    return () => window.clearInterval(timer);
  }, []);

  const time = countdown
    ? `${String(countdown.hours).padStart(2, "0")}:${String(
        countdown.minutes,
      ).padStart(2, "0")}:${String(countdown.seconds).padStart(2, "0")}`
    : "--:--:--";

  return (
    <div className="release-countdown">
      <span className="countdown-label">Sale en</span>
      <strong className="countdown-value">
        {countdown?.expired ? (
          "YA DISPONIBLE"
        ) : (
          <>
            <span>{countdown?.days ?? "--"} DÍAS</span>
            <i aria-hidden="true">·</i>
            <span>{time}</span>
          </>
        )}
      </strong>
      <time className="countdown-date" dateTime={nextReleaseDate}>
        JUEVES 06 · AGOSTO 2026
      </time>
    </div>
  );
}

function PlaylistStack({
  playlists,
}: {
  playlists: Array<{ title: string; meta: string; theme: string }>;
}) {
  return (
    <div className="playlist-stack">
      {playlists.map((playlist, index) => (
        <div
          className={`playlist-slot playlist-slot--${playlist.theme}`}
          key={playlist.title}
        >
          <span className="playlist-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="playlist-copy">
            <strong>{playlist.title}</strong>
            <small>{playlist.meta}</small>
          </span>
          <span className="playlist-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      ))}
    </div>
  );
}

function CommunityPanel() {
  return (
    <section className="community-panel" aria-labelledby="community-title">
      <p className="community-title" id="community-title">
        <span aria-hidden="true" />
        Comunidad
      </p>
      <div className="community-grid">
        {communityStats.map((stat) => (
          <div
            className={`community-stat community-stat--${stat.theme}`}
            key={stat.platform}
          >
            <span className="community-platform">{stat.platform}</span>
            <strong>{stat.value}</strong>
            <span className="community-unit">{stat.unit}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="ALLEN KS — Inicio">
      <img
        className="brand-logo"
        src="/assets/allen-ks-logo.png"
        alt=""
        width="926"
        height="609"
      />
      <span className="brand-name">ALLEN KS</span>
    </a>
  );
}

function DesktopNavigation() {
  return (
    <nav className="desktop-nav" aria-label="Navegación principal">
      <a className="nav-link nav-link--active" href="#inicio" aria-current="page">
        Inicio
      </a>
      {navigationItems.map((item) =>
        item.href ? (
          <a
            className="nav-link nav-link--section"
            href={item.href}
            key={item.label}
          >
            {item.label}
          </a>
        ) : (
          <span
            className="nav-link nav-link--planned"
            aria-disabled="true"
            key={item.label}
            title="Sección pendiente"
          >
            {item.label}
          </span>
        ),
      )}
    </nav>
  );
}

function MobileNavigation() {
  return (
    <details className="mobile-nav">
      <summary aria-label="Abrir menú">
        <span />
        <span />
      </summary>
      <nav className="mobile-nav-panel" aria-label="Navegación móvil">
        <a className="mobile-link mobile-link--active" href="#inicio">
          Inicio
        </a>
        {navigationItems.map((item) =>
          item.href ? (
            <a
              className="mobile-link mobile-link--section"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ) : (
            <span
              className="mobile-link mobile-link--planned"
              key={item.label}
            >
              {item.label}
            </span>
          ),
        )}
      </nav>
    </details>
  );
}

export default function Home() {
  const [activeMusicSlide, setActiveMusicSlide] = useState(0);
  const [isYouTubePlaying, setIsYouTubePlaying] = useState(false);
  const [isSoundCloudPlaying, setIsSoundCloudPlaying] = useState(false);
  const [activeLiveVideo, setActiveLiveVideo] = useState(0);
  const selectedLiveVideo = liveVideos[activeLiveVideo];
  const isMusicPlaying = isYouTubePlaying || isSoundCloudPlaying;

  useEffect(() => {
    if (isMusicPlaying) {
      return;
    }

    const rotationTimer = window.setTimeout(() => {
      setActiveMusicSlide((currentSlide) => (currentSlide + 1) % 2);
    }, 7_000);

    return () => window.clearTimeout(rotationTimer);
  }, [activeMusicSlide, isMusicPlaying]);

  return (
    <main id="inicio" className="site-shell">
      <header className="site-header">
        <Brand />
        <DesktopNavigation />
        <MobileNavigation />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-photo"
          src="/assets/allen-ks-portada.jpg"
          alt="Allen KS tocando en vivo frente al público"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />

        <div className="hero-content">
          <p className="eyebrow">DJ · PRODUCTOR · PROMOTOR</p>
          <h1 id="hero-title">
            <span>ALLEN</span>
            <span>KS</span>
          </h1>
          <p className="aka">AKA DUBSTEP WACHO · ARGENTINA BASS CULTURE</p>
          <p className="hero-description">
            DJ, productor y promotor argentino. Creador de Otra Noche, director
            de Spartans Label y referente de una comunidad enfocada en Dubstep,
            Drum &amp; Bass, Riddim y cultura bass.
          </p>
        </div>

        <p className="hero-index" aria-hidden="true">
          01
        </p>
      </section>

      <section className="music-section" id="musica" aria-label="Música destacada">
        <div className="music-shell">
          <div className="music-toolbar">
            <p className="section-kicker">
              <span>02</span>
              Música destacada
            </p>

            <div className="slider-controls" aria-label="Cambiar lanzamiento">
              <span className="slider-status" aria-live="polite">
                0{activeMusicSlide + 1} / 02
              </span>
              <button
                type="button"
                onClick={() => setActiveMusicSlide(0)}
                disabled={activeMusicSlide === 0}
                aria-label="Ver último lanzamiento"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setActiveMusicSlide(1)}
                disabled={activeMusicSlide === 1}
                aria-label="Ver próximo lanzamiento"
              >
                →
              </button>
            </div>
          </div>

          <div className="music-slider">
            <div
              className="music-slider-track"
              style={{ transform: `translateX(-${activeMusicSlide * 100}%)` }}
            >
              <article
                className="music-slide"
                aria-hidden={activeMusicSlide !== 0}
                inert={activeMusicSlide !== 0 ? true : undefined}
              >
                <h2>ÚLTIMO LANZAMIENTO</h2>

                <div className="release-layout">
                  <div className="release-square">
                    {musicLinks.latestYouTubeId ? (
                      <YouTubePlayer
                        className="youtube-square"
                        videoId={musicLinks.latestYouTubeId}
                        start={musicLinks.latestYouTubeStart}
                        title="Último lanzamiento de ALLEN KS en YouTube"
                        onPlaybackChange={setIsYouTubePlaying}
                      />
                    ) : (
                      <div
                        className="youtube-cover-placeholder"
                        role="img"
                        aria-label="Espacio reservado para la portada y el video del último lanzamiento"
                        style={
                          musicLinks.latestCover
                            ? {
                                backgroundImage: `url(${musicLinks.latestCover})`,
                              }
                            : undefined
                        }
                      >
                        <span className="youtube-play" aria-hidden="true">
                          <span />
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="release-side">
                    <div className="side-heading">
                      <p className="release-label">
                        <span aria-hidden="true" />
                        Seguí escuchando
                      </p>
                      <h3>DESCUBRIR MÁS MÚSICA</h3>
                      <p>
                        Playlists y selecciones de ALLEN KS para seguir
                        recorriendo el proyecto.
                      </p>
                    </div>

                    <PlaylistStack playlists={youtubePlaylists} />
                    <CommunityPanel />
                  </div>
                </div>
              </article>

              <article
                className="music-slide"
                aria-hidden={activeMusicSlide !== 1}
                inert={activeMusicSlide !== 1 ? true : undefined}
              >
                <h2>PRÓXIMAMENTE</h2>

                <div className="release-layout">
                  <div className="release-square release-square--soundcloud">
                    {musicLinks.upcomingSoundCloudUrl ? (
                      <SoundCloudPlayer
                        url={musicLinks.upcomingSoundCloudUrl}
                        onPlaybackChange={setIsSoundCloudPlaying}
                      />
                    ) : (
                      <div
                        className="soundcloud-cover-placeholder"
                        aria-label="Portada y reproductor de SoundCloud pendientes"
                      >
                        SOUNDCLOUD
                      </div>
                    )}
                  </div>

                  <div className="release-side release-side--upcoming">
                    <div className="side-heading">
                      <p className="release-label">
                        <span aria-hidden="true" />
                        Próximo lanzamiento
                      </p>
                      <h3>NUEVA MÚSICA EN CAMINO</h3>
                      <p className="release-artist">ALLEN KS</p>
                    </div>

                    <Countdown />

                    <div className="upcoming-discovery">
                      <p className="mini-heading">Descubrir más música</p>
                      <PlaylistStack playlists={discoveryPlaylists} />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="slider-dots" aria-label="Posición del carrusel">
            {[0, 1].map((slide) => (
              <button
                type="button"
                className={activeMusicSlide === slide ? "is-active" : ""}
                onClick={() => setActiveMusicSlide(slide)}
                aria-label={
                  slide === 0
                    ? "Ir a último lanzamiento"
                    : "Ir a próximo lanzamiento"
                }
                aria-current={activeMusicSlide === slide ? "true" : undefined}
                key={slide}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="live-section" id="en-vivo" aria-labelledby="live-title">
        <div className="live-shell">
          <p className="section-kicker">
            <span>03</span>
            Escenarios &amp; fechas
          </p>

          <div className="live-heading">
            <h2 id="live-title">EN VIVO</h2>
            <p>
              Próximas fechas y la experiencia de ALLEN KS en directo.
            </p>
          </div>

          <div className="live-layout">
            <article className="live-feature">
              <div className="live-video-frame">
                {selectedLiveVideo ? (
                  <YouTubePlayer
                    key={selectedLiveVideo.videoId}
                    className="live-video"
                    videoId={selectedLiveVideo.videoId}
                    start={selectedLiveVideo.start}
                    title={selectedLiveVideo.title}
                    initialVolume={25}
                    autoPlayMutedWhenVisible={activeLiveVideo === 0}
                  />
                ) : (
                  <div className="live-video-placeholder">
                    <span>VIDEO {String(activeLiveVideo + 1).padStart(2, "0")}</span>
                    <strong>ENLACE PENDIENTE</strong>
                  </div>
                )}
              </div>

              <div className="live-feature-copy">
                <div>
                  <span>Experiencia en directo</span>
                  <h3>ALLEN KS EN VIVO</h3>
                </div>

                <div className="live-video-nav" aria-label="Videos en vivo">
                  {liveVideos.map((video, index) => (
                    <button
                      type="button"
                      className={activeLiveVideo === index ? "is-active" : ""}
                      onClick={() => setActiveLiveVideo(index)}
                      aria-label={
                        video
                          ? `Ver video en vivo ${index + 1}`
                          : `Ver espacio reservado para el video ${index + 1}`
                      }
                      aria-current={
                        activeLiveVideo === index ? "true" : undefined
                      }
                      key={index}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </article>

            <div className="live-agenda">
              <div className="agenda-heading">
                <p className="release-label">
                  <span aria-hidden="true" />
                  Agenda
                </p>
                <h3>PRÓXIMAS FECHAS</h3>
              </div>

              <div className="date-list">
                {placeholderLiveDates.map((event, index) => (
                  <article className="date-card" key={index}>
                    <time className="date-block">
                      <strong>{event.day}</strong>
                      <span>{event.month}</span>
                    </time>
                    <div className="date-copy">
                      <strong>{event.city}</strong>
                      <span>{event.venue}</span>
                    </div>
                    <span className="date-state">A CONFIRMAR</span>
                  </article>
                ))}
              </div>

              <div className="agenda-footer">
                <span>¿Querés contratar a ALLEN KS?</span>
                <a
                  href="https://wa.me/5491136133976?text=Hola%20Allen%20KS%2C%20quiero%20consultar%20por%20una%20contrataci%C3%B3n."
                  target="_blank"
                  rel="noreferrer"
                >
                  CONTACTAR <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="spartans-section"
        id="spartans"
        aria-labelledby="spartans-title"
      >
        <div className="spartans-shell">
          <p className="section-kicker">
            <span>04</span>
            Sello &amp; comunidad
          </p>

          <div className="spartans-heading">
            <div>
              <p className="spartans-overline">Proyecto fundado por ALLEN KS</p>
              <h2 id="spartans-title">
                SPARTANS
                <span>LABEL</span>
              </h2>
            </div>
            <p className="spartans-intro">
              Un sello independiente enfocado en Dubstep, Bass Music y el
              crecimiento de artistas latinoamericanos.
            </p>
          </div>

          <div className="spartans-layout">
            <div
              className="spartans-brand-card"
              role="img"
              aria-label="Espacio de identidad visual de Spartans Label"
            >
              <div className="spartans-stars" aria-hidden="true">
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <span className="spartans-monogram" aria-hidden="true">
                S
              </span>

              <div className="spartans-wordmark">
                <strong>SPARTANS</strong>
                <span>LABEL</span>
              </div>

              <div className="spartans-card-footer">
                <span>ARGENTINA · MÉXICO</span>
                <time dateTime="2024-12-23">EST. 23.12.2024</time>
              </div>
            </div>

            <div className="spartans-content">
              <div className="spartans-statement">
                <span>MANIFIESTO</span>
                <p>
                  Conectar artistas, impulsar colaboraciones y construir una
                  escena con identidad propia.
                </p>
              </div>

              <div className="spartans-areas">
                {spartansAreas.map((area) => (
                  <article className="spartans-area" key={area.number}>
                    <span className="spartans-area-number">{area.number}</span>
                    <div>
                      <h3>{area.title}</h3>
                      <p>{area.description}</p>
                    </div>
                    <span className="spartans-area-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </article>
                ))}
              </div>

              <div className="spartans-meta">
                <span>CONTENIDO EN PREPARACIÓN</span>
                <span>SPARTANS LABEL · 2024—2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-shell">
          <div className="footer-top">
            <div className="footer-identity">
              <img
                className="footer-logo"
                src="/assets/allen-ks-logo.png"
                alt="Logo de ALLEN KS"
                width="926"
                height="609"
              />
              <div>
                <strong>ALLEN KS</strong>
                <p>DJ · PRODUCTOR · PROMOTOR</p>
                <span>BUENOS AIRES · ARGENTINA</span>
              </div>
            </div>

            <div className="footer-contact">
              <p className="footer-contact-label">
                <span aria-hidden="true" />
                Bookings &amp; contacto
              </p>
              <div className="footer-contact-row">
                <h2>
                  ¿HACEMOS ALGO
                  <span>JUNTOS?</span>
                </h2>
                <a
                  href="https://wa.me/5491136133976?text=Hola%20Allen%20KS%2C%20quiero%20hacerte%20una%20consulta."
                  target="_blank"
                  rel="noreferrer"
                >
                  HABLAR POR WHATSAPP <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <nav className="footer-socials" aria-label="Redes de ALLEN KS">
            {footerSocials.map((social) => (
              <a
                className={`footer-social footer-social--${social.theme}`}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                key={social.name}
              >
                <span>
                  <strong>{social.name}</strong>
                  <small>{social.handle}</small>
                </span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </nav>

          <div className="footer-bottom">
            <span>© 2026 ALLEN KS · TODOS LOS DERECHOS RESERVADOS</span>
            <a href="#inicio">
              VOLVER ARRIBA <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
