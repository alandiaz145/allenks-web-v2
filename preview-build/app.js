(async () => {
  "use strict";
  const data = window.ALLENKS_CONTENT;
  if (window.ALLENKS_CATALOG_READY) await window.ALLENKS_CATALOG_READY;
  const app = document.querySelector("#app");
  const audio = new window.PreciseAudio(document.querySelector("#audio-engine"));
  const toast = document.querySelector("#toast");
  const routes = [
    { path: "/", label: "Inicio" },
    { path: "/musica", label: "Música" },
    { path: "/en-vivo", label: "En vivo" },
    { path: "/proyectos", label: "Proyectos" },
    { path: "/contacto", label: "Contacto" }
  ];
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const page = ["/", "/musica", "/en-vivo", "/proyectos", "/contacto", "/sobre-mi", "/cancion", "/spotify", "/soundcloud", "/apple-music", "/whatsapp", "/instagram", "/youtube", "/tiktok"].includes(path) ? path : "/404";
  const requestedTrackId = new URLSearchParams(window.location.search).get("tema");
  const requestedTrackIndex = data.tracks.findIndex(t => t.id === requestedTrackId);
  let selected = page === "/cancion" && requestedTrackIndex >= 0 ? requestedTrackIndex : 0;
  let pendingSeekPercent = null;
  let resumeAfterSkip = false;
  let resumeSkipTimer;
  let toastTimer;
  let promoTimer;
  let pastEventsTimer;
  const CATALOG_PAGE_SIZE = 8;
  const catalogState = {
    catalog: Math.max(1, Number.parseInt(new URLSearchParams(window.location.search).get("catalogo"), 10) || 1),
    collaborations: Math.max(1, Number.parseInt(new URLSearchParams(window.location.search).get("colaboraciones"), 10) || 1)
  };
  let collabFilter = "all";
  function collaborationTracks() {
    const tracks = data.tracks.filter(t => t.category === "collaboration");
    return tracks.filter(t => {
      if (collabFilter === "all") return true;
      const type = t.versionType || "";
      if (collabFilter === "contest") return type === "Remix contest";
      if (collabFilter === "remixes") return /Mi remix|Remix \/ por clasificar/.test(type);
      return !/Remix contest|Mi remix|Remix \/ por clasificar/.test(type);
    });
  }
  const asset = (url, cls = "", alt = "") => url ? `<img class="${cls}" src="${url}" alt="${alt}" loading="lazy" />` : "";
  const trackHref = track => `/cancion/?tema=${encodeURIComponent(track.id)}`;
  const whatsappLink = (track, format) => {
    const message = `Hola, quiero comprar los ${format === "STEMS" ? "stems" : "archivos FLP"} de "${track.title}" de ALLEN KS (US$9.99). ¿Me pasás la información?`;
    const number = (data.contact.whatsappNumber || "").replace(/\D/g, "");
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };
  const icon = (name, size = 22) => {
    const paths = {
      play: '<path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none"/>',
      pause: '<path d="M7 5h4v14H7zM14 5h4v14h-4z" fill="currentColor" stroke="none"/>',
      download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
      arrow: '<path d="M5 19 19 5M7 5h12v12"/>',
      location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      close: '<path d="M5 5 19 19M19 5 5 19"/>',
      volume: '<path d="M4 9v6h4l5 4V5L8 9H4ZM17 9c2 2 2 4 0 6M20 6c4 4 4 8 0 12"/>',
      external: '<path d="M7 17 17 7M8 7h9v9"/>'
    };
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ""}</svg>`;
  };
  function announce(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 3600);
  }
  function header() {
    return `<header class="site-header"><div class="header-inner">
      <a class="brand" href="/" aria-label="ALLEN KS, ir al inicio">ALLEN KS</a>
      <nav class="desktop-nav" aria-label="Navegación principal">${routes.map(r => `<a href="${r.path}" class="${page === r.path ? "active" : ""}">${r.label}</a>`).join("")}</nav>
      <button class="menu-trigger" type="button" aria-label="Abrir menú" aria-expanded="false">${icon("menu", 26)}</button>
      </div><nav class="mobile-nav" aria-label="Navegación móvil">${routes.map(r => `<a href="${r.path}" class="${page === r.path ? "active" : ""}">${r.label}</a>`).join("")}</nav></header>`;
  }
  function socials() {
    return data.socials.map(s => {
      const brandIcon = `<img class="social-icon" src="${s.icon}" alt="" width="22" height="22" />`;
      return `<a href="${s.path}" title="${s.name} — sección de ALLEN KS" aria-label="Ver ${s.name} dentro de esta web">${brandIcon}</a>`;
    }).join("");
  }
  function footer() {
    return `<footer class="site-footer"><div class="footer-aura"></div><div class="footer-inner">
      <div class="footer-top"><a class="footer-brand" href="/">ALLEN KS</a><nav aria-label="Navegación de pie de página">${routes.map(r => `<a href="${r.path}">${r.label}</a>`).join("")}</nav><div class="footer-social">${socials()}</div></div>
      <div class="footer-bottom"><span>© 2026 ALLEN KS. Todos los derechos reservados. <a href="/musica#terminos-musica">Condiciones de uso</a></span><span>Argentina ${icon("location", 18)}</span></div>
    </div></footer>`;
  }
  function sectionTitle(title, description = "") {
    return `<div class="section-header"><h2><span class="acid-slash"></span>${title}</h2>${description ? `<p>${description}</p>` : ""}</div>`;
  }
  function portraitSlot() {
    return data.artist.portrait
      ? `<a class="portrait-holder has-photo" href="/sobre-mi" aria-label="Conocé a ALLEN KS">${asset(data.artist.portrait, "artist-portrait", "Retrato de ALLEN KS")}</a>`
      : `<a class="portrait-holder portrait-pending" href="/sobre-mi" aria-label="Conocé a ALLEN KS, fotografía pendiente"><div class="portrait-placeholder"><div class="silhouette-head"></div><div class="silhouette-body"></div><span>FOTO OFICIAL<br/>ALLEN KS</span></div></a>`;
  }
  function hero() {
    return `<section class="hero"><div class="hero-glow"></div>
      ${asset(data.artist.heroBackground, "hero-ribbon-back", "")}
      <div class="hero-inner">
        <div class="hero-copy">
          <h1><span>ALLEN</span><span>KS</span></h1>
          <div class="genre-sticker">DUBSTEP /<br>BASS</div>
          <span class="sticker-flashes"><i></i><i></i><i></i></span>
          <p class="hero-subtitle">Productor y DJ desde<br>Buenos Aires. Música desde 2016.</p>
          <div class="hero-actions">
            <a href="/musica" class="hero-cta">${icon("play", 25)} <span>ESCUCHAR</span></a>
            <a href="/musica#lanzamientos" class="hero-cta">${icon("download", 25)} <span>DESCARGAR</span></a>
          </div>
        </div>
        ${portraitSlot()}
      </div>
      ${asset(data.artist.heroForeground, "hero-ribbon-front", "")}
    </section>`;
  }
  function artwork(track, kind = "") {
    return track.artwork
      ? `<div class="release-cover ${kind}">${asset(track.artwork, "release-image", `Portada de ${track.title}`)}</div>`
      : `<div class="release-cover ${kind} cover-${track.theme}" role="img" aria-label="Espacio para portada original de ${track.title}">
          <span class="cover-melt one"></span><span class="cover-melt two"></span><span class="cover-melt three"></span>
        </div>`;
  }
  function releaseCard(track, index) {
    return `<article class="release-card"><a class="release-art-link" href="${trackHref(track)}" aria-label="Abrir página de ${track.title}">${artwork(track)}</a>
      <h3><a href="${trackHref(track)}" aria-label="Ver detalles de ${track.title}">${track.title}</a></h3>
      ${track.artists ? `<p class="release-artist-label">${track.artists}</p>` : ""}
      ${track.versionType && !/por confirmar|por clasificar/.test(track.versionType) ? `<p class="catalog-review-tag">${track.versionType}</p>` : ""}
      <div class="release-actions">
        ${track.audio ? `<button class="pill-btn play-btn" type="button" data-play="${index}" aria-label="Reproducir ${track.title}" aria-pressed="false">${icon("play", 15)} PLAY</button>` : `<span class="pill-btn no-audio-badge">${track.sourceFile ? "EN REVISIÓN" : "SIN AUDIO"}</span>`}
        <a class="pill-btn download-btn" href="${trackHref(track)}" aria-label="Ficha de ${track.title}">${track.download ? icon("download", 15) : icon("arrow",15)} ${track.download ? "DESCARGAR" : "VER FICHA"}</a>
      </div>
    </article>`;
  }
  function spotifyPlaylistCard() {
    return `<article class="release-card spotify-promo-card"><a class="release-art-link" href="/spotify" aria-label="Descubrí las playlists oficiales de ALLEN KS en la sección Spotify"><div class="release-cover spotify-promo-cover"><img src="/assets/social/spotify.svg" alt="" /><span>PLAYLISTS<br>OFICIALES</span><small>ESCUCHÁ EN SPOTIFY ${icon("arrow",16)}</small></div></a><h3><a href="/spotify">MI MÚSICA EN SPOTIFY</a></h3><div class="release-actions"><a class="pill-btn spotify-promo-action" href="/spotify">EXPLORAR PLAYLISTS ${icon("arrow",14)}</a></div></article>`;
  }
  function editorialCard(kind) {
    const isCollab = kind === "collab";
    const href = isCollab ? "/contacto" : "/whatsapp";
    const title = isCollab ? "¿HACEMOS UN TEMA?" : "STEMS Y FLP";
    const label = isCollab ? "COLABORACIONES" : "ARCHIVOS DE PRODUCCIÓN";
    const action = isCollab ? "CONTACTAME" : "CONSULTAR ARCHIVOS";
    return `<article class="release-card editorial-promo-card"><a class="release-art-link" href="${href}" aria-label="${action}: ${title}"><div class="release-cover editorial-promo-cover"><span class="editorial-promo-kicker">ALLEN KS / ${label}</span><span class="editorial-promo-title">${title}</span><small>${isCollab ? "PRODUCCIÓN · REMIXES · FEATS" : "PROYECTOS · PISTAS SEPARADAS"}</small><span class="editorial-promo-arrow">${icon("arrow",26)}</span></div></a><h3><a href="${href}">${label}</a></h3><div class="release-actions"><a class="pill-btn editorial-promo-action" href="${href}">${action} ${icon("arrow",14)}</a></div></article>`;
  }
  function releases() {
    const isMusicPage = page === "/musica";
    return `<section class="releases container ${isMusicPage ? "inner-releases" : ""}" id="lanzamientos">
      <div class="section-header"><h2><span class="acid-slash"></span>${isMusicPage ? "ÚLTIMOS LANZAMIENTOS" : "LANZAMIENTOS"}</h2>
        <a class="more-music-link" href="${page === "/" ? "/musica" : "#catalogo"}">${page === "/" ? "MÁS MÚSICA" : "VER CATÁLOGO"} ${icon("arrow", 18)}</a>
      </div>
      <div class="release-grid">${data.tracks.slice(0, 3).map((track,index) => releaseCard(track, index)).join("")}
        ${spotifyPlaylistCard()}
      </div>
    </section>`;
  }
  const promoLines = ["DESCARGA GRATUITA", "DISPONIBLE EN SOUNDCLOUD", "EXPLORÁ MI MÚSICA", "ALLEN KS · DUBSTEP / BASS"];
  function player() {
    const t = data.tracks[selected];
    return `<section class="player-wrap container" aria-label="Reproductor musical">
      <div class="music-player" id="music-player">
        <a class="player-cover" id="player-cover-link" href="${trackHref(t)}" aria-label="Abrir página de ${t.title}">${artwork(t, "player-art")}</a>
        <div class="player-controls"><button class="player-skip-btn" type="button" data-skip="-10" aria-label="Retroceder 10 segundos">−10</button><button class="player-main-btn" id="player-main-btn" type="button" aria-label="Reproducir o pausar">${icon("play", 30)}</button><button class="player-skip-btn" type="button" data-skip="10" aria-label="Adelantar 10 segundos">+10</button></div>
        <div class="player-meta"><strong id="player-title">${t.title}</strong><span>ALLEN KS</span></div>
        <div class="player-promo" id="player-promo" aria-live="off"><span id="player-promo-label">${promoLines[0]}</span><a class="player-download-link" id="player-download-link" href="${playerDownloadHref(t)}">${icon("download",16)} DESCARGAR</a></div>
        <div class="time-label"><span id="current-time">0:00</span> / <span id="total-time">${t.durationLabel}</span></div>
        <div class="player-progress-wrap" id="player-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Progreso de reproducción. Usá los botones de diez segundos para avanzar o retroceder."><div class="player-progress-track"><span id="player-progress-fill" class="player-progress-fill"></span><span id="player-progress-thumb" class="player-progress-thumb"></span></div></div>
        <div class="player-volume">${icon("volume", 17)} <input type="range" id="volume-range" min="0" max="1" step=".05" value=".85" aria-label="Volumen" /></div>
      </div>
    </section>`;
  }
  function playerDownloadHref(track) {
    return page === "/" ? "/musica" : page === "/musica" ? trackHref(track) : track.download || "#descargas";
  }
  function eventPoster() {
    if (data.event.artwork) return `<div class="event-poster">${asset(data.event.artwork, "event-poster-image", "Flyer OTRA NOCHE × OVERDRIVE")}</div>`;
    return `<div class="event-poster poster-placeholder">
      <div class="poster-liquid"></div>
      <div class="poster-top">OTRA<br>NOCHE <b>× OVERDRIVE</b><small>PRESENTAN</small></div>
      <div class="poster-middle">ALLEN<br><span>KS</span><em>DUBSTEP /<br>BASS</em></div>
      <div class="poster-bottom">22 NOV <small>ARKHAM<br>MULTIESPACIO</small></div>
    </div>`;
  }
  function ticket() {
    const e = data.event;
    return `<section class="event-section container"><a class="ticket-link" href="/en-vivo" aria-label="Ver detalles del evento ${e.name}">
      <div class="ticket-card">
        <div class="ticket-copy">
          <div class="ticket-kicker"><span class="acid-slash"></span>PRÓXIMA FECHA</div>
          <div class="ticket-date">${e.day} ${e.month}</div>
          <div class="ticket-name">OTRA NOCHE <span>×</span> OVERDRIVE</div>
          <div class="ticket-venue">${icon("location", 25)} ${e.venue}</div>
        </div>
        <div class="ticket-perforation"></div>
        <div class="ticket-qr"><img src="/assets/hero/event-details-qr.svg" alt="QR con información del evento" loading="lazy" /><small>INFO DEL EVENTO</small></div>
      </div>
      ${eventPoster()}
    </a></section>`;
  }
  function projectIcon(id) {
    const icons = { spartans: "vinyl.svg", "otra-noche": "event-ticket.svg", academia: "academy.svg" };
    return `<span class="project-pictogram"><img class="project-svg" src="/assets/projects/${icons[id] || "vinyl.svg"}" alt="" /></span>`;
  }
  function projectPill(p) {
    return `<a class="project-pill ${p.color}" href="/proyectos#${p.id}" aria-label="Conocer ${p.name}">
      ${p.logo ? asset(p.logo, "project-logo", `Logo ${p.name}`) : `${projectIcon(p.id)}<strong>${p.name}</strong>`}
      <span class="project-arrow">${icon("arrow", 26)}</span>
    </a>`;
  }
  function projectsShort() {
    return `<section class="projects-home container">
      ${sectionTitle("PROYECTOS", "Iniciativas que impulsan la escena del Dubstep / Bass<br>en Argentina y la región.")}
      <div class="project-showcase-grid">${data.projects.map((p,i)=>`<article class="project-showcase">
        ${projectPill(p)}
        <a class="project-preview-link" href="/proyectos#${p.id}" aria-label="Ver ${p.name}">${artwork({title:p.name,artwork:p.previewImage||null,theme:"lime"},"project-preview-art")}</a>
        <a class="project-summary-card" href="/proyectos#${p.id}"><span>0${i+1} / CONOCÉ EL PROYECTO</span><p>${p.short}</p><strong>DESCUBRIR MÁS ${icon("arrow",17)}</strong></a>
      </article>`).join("")}</div>
    </section>`;
  }
  function home() {
    return hero() + releases() + player() + ticket() + projectsShort() + liveBookingCTA("/assets/hero/allen-ks-booking-dj.png");
  }
  function pageHero(kicker, title, desc) {
    return `<section class="inner-hero"><div class="inner-hero-ribbon"></div><div class="container inner-hero-content"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${desc}</p></div></section>`;
  }
  function musicPage() {
    return pageHero("ALLEN KS / DISCOGRAFÍA", "MI MÚSICA", "Dubstep, Bass y exploración sonora desde Buenos Aires. Escuchá los lanzamientos y descargá los archivos habilitados.")
      + catalog() + releases() + player()
      + `<section class="inner-section container" id="free-downloads"><div class="split-callout">
          <div><span class="eyebrow">ARCHIVOS DEL ARTISTA</span><h2>FREE<br>DOWNLOADS<span class="accent-dot">.</span></h2></div>
          <div><p>Descargá mi música directamente desde la web. Cada canción tiene su propia página con MP3, portada y opciones de producción.</p><p class="small-note">Las portadas oficiales se habilitan para descargar cuando estén disponibles.</p><a class="callout-cta" href="#catalogo">EXPLORAR CATÁLOGO ${icon("arrow", 19)}</a></div>
        </div></section>`
      + collaborations() + `<section class="music-terms container" id="terminos-musica"><h2>CONDICIONES DE USO</h2><p>La música disponible para escuchar en este sitio no autoriza su distribución, reventa, reupload, explotación comercial ni publicación en plataformas sin permiso expreso de sus respectivos titulares. Para solicitar autorización, escribí a <a href="mailto:soyallenks@gmail.com">soyallenks@gmail.com</a>. Los remixes y colaboraciones conservan los derechos correspondientes a sus autores.</p></section>` + journeyLinks();
  }
  function catalog() {
    const tracks = data.tracks.filter(t=>t.category!=="collaboration");
    const count = tracks.filter(t=>t.audio).length;
    return `<section class="catalog-section container" id="catalogo">
      <div class="section-header"><h2><span class="acid-slash"></span>CATÁLOGO OFICIAL</h2><span class="catalog-count">${tracks.length} CANCIONES · ${count} PARA ESCUCHAR</span></div>
      <div class="catalog-grid release-grid" id="catalog-grid" aria-live="polite">${catalogCards("catalog", tracks)}</div>
      <div id="catalog-pages">${catalogPagination("catalog", tracks.length)}</div>
      <p class="catalog-note">Explorá mis producciones, versiones y temas favoritos. Algunas canciones incluyen descarga gratuita desde su propia ficha.</p>
    </section>`;
  }
  function collaborations() {
    const tracks=collaborationTracks();
    return `<section class="collaborations-section container" id="colaboraciones">${sectionTitle("COLABORACIONES Y REMIXES", "Producciones compartidas, reinterpretaciones y remix contests.")}
      <div class="collab-filters" role="group" aria-label="Filtrar colaboraciones y remixes"><button type="button" data-collab-filter="all" class="active" aria-pressed="true">TODOS</button><button type="button" data-collab-filter="collabs">COLABORACIONES</button><button type="button" data-collab-filter="remixes">MIS REMIXES</button><button type="button" data-collab-filter="contest">REMIX CONTEST</button></div>
      <div class="catalog-grid release-grid" id="collaborations-grid" aria-live="polite">${catalogCards("collaborations", tracks)}</div>
      <div id="collaborations-pages">${catalogPagination("collaborations", tracks.length)}</div>
      <p class="catalog-note">Disfrutá la música y descubrí artistas con los que compartimos escena. Los créditos y permisos de cada versión se respetan.</p>
    </section>`;
  }
  function catalogCards(kind, tracks) {
    const totalPages = Math.max(1, Math.ceil(tracks.length / CATALOG_PAGE_SIZE));
    catalogState[kind] = Math.min(catalogState[kind], totalPages);
    const offset = (catalogState[kind] - 1) * CATALOG_PAGE_SIZE;
    const visible = tracks.slice(offset, offset + CATALOG_PAGE_SIZE);
    const cards = visible.map(track => releaseCard(track, data.tracks.indexOf(track)));
    // Las fichas faltantes no se rellenan con lanzamientos ficticios.
    if (visible.length < CATALOG_PAGE_SIZE) cards.push(spotifyPlaylistCard());
    if (visible.length < CATALOG_PAGE_SIZE - 1) cards.push(editorialCard(kind === "collaborations" ? "collab" : "stems"));
    return cards.join("");
  }
  function catalogPagination(kind, itemCount) {
    const total = Math.max(1, Math.ceil(itemCount / CATALOG_PAGE_SIZE));
    if (total === 1) return `<p class="catalog-page-info">${itemCount} ${kind === "catalog" ? "TEMAS" : "COLABORACIONES"}</p>`;
    const current = catalogState[kind];
    const visiblePages = [...new Set([1, total, current - 1, current, current + 1].filter(n => n >= 1 && n <= total))].sort((a,b) => a-b);
    let lastPage = 0;
    const numberButtons = visiblePages.map(number => {
      const dots = number - lastPage > 1 ? '<span class="catalog-page-dots" aria-hidden="true">…</span>' : "";
      lastPage = number;
      return `${dots}<button type="button" data-catalog-nav="${kind}" data-page="${number}" class="${number === current ? "current" : ""}" ${number === current ? 'aria-current="page"' : ""} aria-label="Ir a la página ${number}">${number}</button>`;
    }).join("");
    return `<nav class="catalog-pagination" aria-label="Páginas de ${kind === "catalog" ? "música" : "colaboraciones"}"><button type="button" class="catalog-page-arrow" data-catalog-nav="${kind}" data-page="${current - 1}" ${current === 1 ? "disabled" : ""} aria-label="Página anterior">←</button>${numberButtons}<button type="button" class="catalog-page-arrow" data-catalog-nav="${kind}" data-page="${current + 1}" ${current === total ? "disabled" : ""} aria-label="Página siguiente">→</button><span class="catalog-page-info">PÁGINA ${current} DE ${total}</span></nav>`;
  }
  function changeCatalogPage(kind, newPage) {
    const tracks = kind === "catalog" ? data.tracks.filter(t => t.category !== "collaboration") : collaborationTracks();
    const total = Math.max(1, Math.ceil(tracks.length / CATALOG_PAGE_SIZE));
    if (!Number.isInteger(newPage) || newPage < 1 || newPage > total || newPage === catalogState[kind]) return;
    catalogState[kind] = newPage;
    const grid = document.getElementById(kind === "catalog" ? "catalog-grid" : "collaborations-grid");
    const pagination = document.getElementById(`${kind}-pages`);
    if (!grid || !pagination) return;
    grid.innerHTML = catalogCards(kind, tracks);
    pagination.innerHTML = catalogPagination(kind, tracks.length);
    bindTrackButtons(grid);
    refreshPlayButton();
    const url = new URL(window.location.href);
    url.searchParams.set(kind === "catalog" ? "catalogo" : "colaboraciones", String(newPage));
    window.history.replaceState(null, "", url);
    grid.closest("section")?.scrollIntoView({behavior: "smooth", block: "start"});
  }
  function journeyLinks() {
    return `<nav class="journey-links container" aria-label="Seguí explorando la web">
      <a href="/">INICIO ${icon("arrow", 19)}</a>
      <a href="/proyectos#academia">CURSOS ${icon("arrow", 19)}</a>
      <span class="journey-pending" title="Sección en preparación">SAMPLEPACKS <small>PRÓXIMAMENTE</small></span>
    </nav>`;
  }
  function trackPage() {
    const track = data.tracks[requestedTrackIndex];
    if (!track) return notFound();
    return pageHero(track.download ? "ALLEN KS / DESCARGAS" : "ALLEN KS / MÚSICA", track.title, track.download ? "Escuchá el tema y elegí qué archivos querés descargar o consultar." : "Escuchá esta producción desde mi catálogo musical.")
      + `<section class="track-detail container">
          <div class="track-detail-art">${artwork(track, "detail-art")}</div>
          <div class="track-detail-content">
            <span class="eyebrow">${track.download ? "FREE DOWNLOAD" : "ESCUCHAR ONLINE"} / ALLEN KS</span>
            <h2>${track.title}</h2><p>ALLEN KS · DUBSTEP / BASS</p>
            ${track.versionType && !/por confirmar|por clasificar/.test(track.versionType) ? `<p class="catalog-review-tag">${track.versionType}</p>` : ""}
            <div class="download-options" id="descargas">
              ${track.download ? `<a class="download-option available" href="${track.download}" download="ALLEN KS - ${track.title}.mp3"><span><strong>${icon("download", 20)} DESCARGAR MP3</strong><small>Archivo de audio</small></span><b>GRATIS</b></a>` : `<span class="download-option unavailable"><span><strong>SOLO REPRODUCCIÓN</strong><small>Descarga no habilitada para esta versión</small></span><b>ESCUCHÁ ONLINE</b></span>`}
              ${track.artwork ? `<a class="download-option available" href="${track.artwork}" download="ALLEN KS - ${track.title} - Artwork"><span><strong>${icon("download", 20)} DESCARGAR ARTWORK</strong><small>Portada oficial</small></span><b>GRATIS</b></a>` : `<span class="download-option unavailable"><span><strong>DESCARGAR ARTWORK</strong><small>Portada oficial pendiente de cargar</small></span><b>PRONTO</b></span>`}
              ${track.salesEnabled===false ? `<span class="download-option unavailable"><span><strong>STEMS Y PROYECTO FLP</strong><small>Disponibilidad y archivos pendientes de confirmar</small></span><b>PRONTO</b></span>` : `<a class="download-option purchase" href="${whatsappLink(track,"STEMS")}" target="_blank" rel="noopener noreferrer"><span><strong>COMPRAR STEMS ${icon("arrow", 19)}</strong><small>Consulta por WhatsApp para esta canción</small></span><b>US$9.99</b></a>
              <a class="download-option purchase" href="${whatsappLink(track,"FLP")}" target="_blank" rel="noopener noreferrer"><span><strong>COMPRAR PROYECTO FLP ${icon("arrow", 19)}</strong><small>Consulta por WhatsApp para esta canción</small></span><b>US$9.99</b></a>`}
            </div>
            ${track.salesEnabled===false ? `<p class="track-purchase-note">Disponible para escuchar. Para permisos de uso o distribución, escribí a soyallenks@gmail.com.</p>` : `<p class="track-purchase-note">STEMS y FLP se solicitan por mensaje. La compra no se cobra automáticamente en esta página.</p>`}
          </div>
        </section>` + (track.audio ? player() : "") + journeyLinks();
  }
  function livePage() {
    const e = data.event;
    return pageHero("SHOWS / SETS / FIESTAS", "EN VIVO", "La energía del Dubstep / Bass en la pista. Fechas confirmadas, line-ups y próximos encuentros.")
      + ticket()
      + `<section class="inner-section container live-details"><div><span class="eyebrow">DOMINGO 22 DE NOVIEMBRE DE 2026</span><h2>OTRA NOCHE<br><span>× OVERDRIVE</span></h2><p>Dos pistas, dos escenas que se encuentran en Arkham Multiespacio, Capital Federal.</p>
        <div class="detail-row">${icon("location", 20)} ${e.venue} · ${e.location}</div>
        ${e.ticketsUrl ? `<a class="hero-cta compact" target="_blank" rel="noopener noreferrer" href="${e.ticketsUrl}">ENTRADAS ${icon("arrow", 18)}</a>` : `<span class="disabled-action">Enlace de entradas pendiente de cargar</span>`}</div>
        <div class="lineup-panel"><span class="eyebrow">LINE-UP CONFIRMADO</span><div class="lineup-list">${e.lineup.map(x => `<strong>${x}</strong>`).join("")}</div></div>
      </section>` + pastEventsSection() + liveBookingCTA();
  }
  function pastEventsSection() {
    return `<section class="past-events-section container" id="eventos-pasados">
      <div class="archive-divider"></div>
      ${sectionTitle("EVENTOS PASADOS", "Una mirada a fechas, flyers y momentos de otras noches.")}
      <div class="past-events-layout">
        <div class="past-events-copy"><span class="eyebrow">ARCHIVO / ALLEN KS</span><h3>HISTORIAS<br>DE LA PISTA<span>.</span></h3><p>Un recorrido visual por los shows. Hay cuatro espacios preparados para sumar los flyers originales de fechas anteriores.</p>
          <div class="past-events-controls"><button type="button" data-past-prev aria-label="Flyer anterior">←</button><span id="past-index-label">01 / 04</span><button type="button" data-past-next aria-label="Flyer siguiente">→</button></div>
        </div>
        <div class="past-flyers-deck" aria-label="Carrusel de flyers pasados">${data.pastEvents.slice(0,4).map((event,i)=>`<article class="past-flyer" data-past-card data-depth="${i}" aria-hidden="${i>0}">${event.image ? asset(event.image,"past-flyer-image",event.title) : `<div class="past-flyer-placeholder"><span>ALLEN KS / ARCHIVO</span><strong>EVENTO<br>PASADO</strong><em>${String(i+1).padStart(2,"0")}</em><small>FLYER ORIGINAL PENDIENTE</small></div>`}</article>`).join("")}</div>
      </div>
    </section>`;
  }
  function liveBookingCTA(portrait = data.artist.portrait) {
    const link=generalWhatsappLink("Hola Alan, me gustaría contratar a ALLEN KS para un próximo show. ¿Podemos hablar de fechas y condiciones?", "bookings");
    const homeVersion=portrait!==data.artist.portrait;
    return `<section class="container booking-cta-wrap"><div class="booking-cta${homeVersion ? " booking-cta-home" : ""}"><div class="booking-copy"><span class="eyebrow">BOOKINGS / ARGENTINA</span><h2>¿LLEVAMOS EL BASS<br>A TU PRÓXIMA FECHA?</h2><p>Clubs, fiestas, festivales y encuentros donde la música se vive fuerte. Hablemos de tu evento y armemos algo que se sienta de verdad.</p><a href="${link}" target="_blank" rel="noopener noreferrer" class="booking-whatsapp">CONSULTAR POR WHATSAPP ${icon("arrow",21)}</a></div>${asset(portrait,"booking-portrait","ALLEN KS, productor y DJ")}</div></section>`;
  }
  function projectsPage() {
    return pageHero("CREAR / CONECTAR / IMPULSAR", "PROYECTOS", "Más allá de la música: sello, fiestas y formación para la comunidad bass.")
      + `<section class="container projects-detail">${data.projects.map((p,i) => `<article id="${p.id}" class="project-detail-card ${p.color}">
          <div class="project-number">0${i+1} / PROYECTO</div><div class="project-detail-heading">${projectIcon(p.id)}<h2>${p.name}</h2></div><p>${p.short}</p>
          ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="project-visit">VISITAR PROYECTO ${icon("arrow", 18)}</a>` : `<span class="project-visit muted">ENLACE OFICIAL PENDIENTE</span>`}
        </article>`).join("")}</section>`;
  }
  function aboutPage() {
    return pageHero("DETRÁS DEL SONIDO", "SOBRE MÍ", "Productor, DJ y apasionado por la cultura bass desde Buenos Aires.")
      + `<section class="container about-layout"><div class="about-photo">${data.artist.portrait ? asset(data.artist.portrait, "", "ALLEN KS") : `<div class="about-placeholder"><span>ESPACIO PARA<br>FOTOGRAFÍA OFICIAL</span></div>`}</div>
        <div><span class="eyebrow">ALLEN KS / ARGENTINA</span><h2>EL SONIDO<br>COMO IDENTIDAD<span class="accent-dot">.</span></h2>
          <p>ALLEN KS es un productor y DJ de Dubstep / Bass de Buenos Aires, Argentina. Comenzó su recorrido musical en 2016, inspirado por la escena electrónica y las posibilidades de la producción musical.</p>
          <p>Su universo artístico también se expande a Spartans Label, Otra Noche y Dubstep Academia, proyectos conectados por el impulso de crear y fortalecer la cultura bass.</p>
          <div class="about-facts"><div><strong>2016</strong><span>INICIO MUSICAL</span></div><div><strong>BA</strong><span>ARGENTINA</span></div><div><strong>BASS</strong><span>IDENTIDAD</span></div></div>
          <a class="hero-cta compact" href="/contacto">CONTACTO ${icon("arrow", 20)}</a>
        </div></section>`;
  }
  function contactPage() {
    const instagram = data.socials.find(s => s.name === "Instagram")?.url;
    return pageHero("BOOKINGS / COLABORACIONES", "CONTACTO", "¿Querés llevar ALLEN KS a tu evento o proponer una colaboración? Conectemos.")
      + `<section class="container contact-layout">
        <div class="contact-options"><div class="contact-card"><span class="eyebrow">01 / CONTRATACIONES</span><h2>SHOWS &<br>BOOKINGS</h2><p>Para fechas, festivales, clubes y propuestas en vivo.</p></div>
          <div class="contact-card"><span class="eyebrow">02 / COLABORACIONES</span><h2>MÚSICA &<br>PROYECTOS</h2><p>Para colaboraciones, prensa y proyectos relacionados con la escena bass.</p></div>
          <div class="contact-channel-links">${instagram ? `<a href="${instagram}" target="_blank" rel="noopener noreferrer" class="contact-instagram">HABLAME POR INSTAGRAM ${icon("arrow", 20)}</a>` : ""}
            <a href="${generalWhatsappLink("Hola Alan, quiero comunicarme por una propuesta para ALLEN KS.", "bookings")}" target="_blank" rel="noopener noreferrer" class="contact-instagram contact-whatsapp">HABLAME POR WHATSAPP ${icon("arrow", 20)}</a></div></div>
        <form class="contact-form" id="contact-form"><span class="eyebrow">FORMULARIO DE CONTACTO</span><label>Tu nombre<input type="text" name="name" placeholder="Nombre y apellido" required /></label>
          <label>Tu email<input type="email" name="email" placeholder="nombre@ejemplo.com" required /></label>
          <label>Tipo de consulta<select name="subject"><option>Contratación</option><option>Colaboración musical</option><option>Prensa</option><option>Otra consulta</option></select></label>
          <label>Mensaje<textarea name="message" rows="5" placeholder="Contame tu propuesta..." required></textarea></label>
          <button class="hero-cta compact form-submit" type="submit">ENVIAR POR WHATSAPP ${icon("arrow", 20)}</button>
          <p class="form-note">La consulta se prepara en WhatsApp. Revisá el mensaje antes de enviarlo.</p>
        </form></section>`;
  }
  function metricCard(metric) {
    if (!metric || !Number.isFinite(metric.current)) return `<div class="hub-metric empty-metric"><span class="eyebrow">OBJETIVO DE CRECIMIENTO</span><h3>PREPARANDO LA META</h3><p>La cifra pública todavía no está verificada. Activaremos este indicador cuando tengamos una referencia confiable.</p></div>`;
    const target = Math.round(metric.current * (metric.targetMultiplier || 2));
    const progress = Math.max(0, Math.min(100, (metric.current / target) * 100));
    const remaining = Math.max(0, target - metric.current);
    const until = metric.goalDate ? Math.max(0, Math.ceil((new Date(`${metric.goalDate}T23:59:59`) - new Date()) / 86400000)) : null;
    return `<div class="hub-metric">
      <div class="hub-metric-top"><span class="eyebrow">META: MULTIPLICAR ×${metric.targetMultiplier || 2}</span><span class="hub-goal-date">${until === null ? "FECHA POR DEFINIR" : `${until} DÍAS RESTANTES · OBJETIVO TENTATIVO`}</span></div>
      <h3>${metric.label}</h3>
      <div class="hub-metric-numbers"><strong>${metric.current.toLocaleString("es-AR")}</strong><span>DE ${target.toLocaleString("es-AR")}</span></div>
      <div class="hub-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${target}" aria-valuenow="${metric.current}" aria-label="Avance de la meta"><span style="width:${progress}%"></span></div>
      <p><b>Faltan ${remaining.toLocaleString("es-AR")}</b> para llegar a la meta.</p>
      <small>${metric.source} La fecha y el objetivo son propuestas editables.</small>
    </div>`;
  }
  function hubResources(type, hub, social) {
    const slots = type === "spotify" ? ["PLAYLISTS", "PERFIL DEL ARTISTA"]
      : type === "youtube" ? ["SETS Y VIDEOS", "PRÓXIMOS ESTRENOS"]
      : type === "soundcloud" ? ["TRACKS Y REMIXES", "PLAYLISTS Y SETS"]
      : type === "apple-music" ? ["DISCOGRAFÍA", "PLAYLISTS"] : ["CONTENIDO DESTACADO", "NOVEDADES"];
    return `<section class="hub-section container">
      <div class="hub-section-top"><h2>EXPLORÁ ${social.name.toUpperCase()}</h2><span>TODO EN UN MISMO LUGAR</span></div>
      <div class="hub-resources">
        ${hub.embed ? `<div class="hub-embed"><span class="eyebrow">REPRODUCTOR OFICIAL</span><iframe src="${hub.embed}" loading="lazy" title="Perfil de ALLEN KS en ${social.name}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>` : `<div class="hub-placeholder"><span class="eyebrow">REPRODUCTOR INTEGRADO</span><strong>PRÓXIMAMENTE</strong><p>Este espacio se activa cuando agreguemos el enlace oficial para incrustar el contenido.</p></div>`}
        <div class="hub-resource-list">${slots.map((slot,i) => `<div class="hub-resource"><span class="hub-resource-number">0${i+1}</span><strong>${slot}</strong><p>${hub.embed ? "Encontrá más música y novedades desde el reproductor y el perfil oficial." : "Espacio reservado para el contenido original de ALLEN KS."}</p></div>`).join("")}
          ${social.url ? `<a class="hub-external" href="${social.url}" target="_blank" rel="noopener noreferrer">ABRIR ${social.name.toUpperCase()} ${icon("external",19)}</a>` : `<span class="hub-external pending-link">ENLACE OFICIAL PENDIENTE DE CARGAR</span>`}
        </div>
      </div>
    </section>`;
  }
  function instagramGrid(hub) {
    return `<section class="hub-section container"><div class="hub-section-top"><h2>SELECCIÓN 3 × 3</h2><span>PUBLICACIONES ELEGIDAS POR ALLEN KS</span></div>
      <div class="instagram-grid">${(hub.posts || []).slice(0,9).map((post,i) => post?.url && post?.image
        ? `<a class="instagram-tile" href="${post.url}" target="_blank" rel="noopener noreferrer"><img src="${post.image}" alt="${post.label || `Publicación de Instagram ${i+1}`}" loading="lazy" /><span>VER PUBLICACIÓN ${icon("arrow",14)}</span></a>`
        : `<div class="instagram-tile instagram-empty"><span class="instagram-slot">${String(i+1).padStart(2,"0")}</span><strong>PUBLICACIÓN<br>DESTACADA</strong><small>ESPACIO PARA TU POST</small></div>`).join("")}</div>
      <p class="hub-disclaimer">Los nueve espacios son editables: cargaremos únicamente las publicaciones que vos elijas, sin mostrar posteos inventados.</p>
    </section>`;
  }
  function socialHubPage(type) {
    const hub = data.socialHubs[type];
    const social = data.socials.find(item => item.path === `/${type}`);
    if (!hub || !social) return notFound();
    return `<section class="hub-hero"><div class="container hub-hero-inner"><div class="hub-copy"><span class="eyebrow">ALLEN KS / PLATAFORMAS</span><div class="hub-title-row"><img src="${social.icon}" alt="" /><h1>${hub.heading}</h1></div><p>${hub.intro}</p><div class="hub-hero-actions"><a class="hub-button" href="/musica">ESCUCHÁ MI MÚSICA ${icon("arrow",18)}</a>${social.url ? `<a class="hub-text-link" href="${social.url}" target="_blank" rel="noopener noreferrer">PERFIL OFICIAL ${icon("external",17)}</a>` : ""}</div></div></div></section>
      ${hub.metric ? `<section class="container hub-metric-wrap">${metricCard(hub.metric)}</section>` : ""}
      ${type === "instagram" ? instagramGrid(hub) : hubResources(type,hub,social)}
      <div class="container hub-end-cta"><h2>SEGUÍ ESCUCHANDO.</h2><p>Encontrá canciones y descargas sin salir de esta web.</p><a class="hub-button" href="/musica#catalogo">IR AL CATÁLOGO ${icon("arrow",18)}</a></div>`;
  }
  function generalWhatsappLink(message, kind="bookings") {
    const number=kind==="sales" || kind==="tickets" ? data.contact.whatsappNumber : data.contact.bookingsNumber;
    return `https://wa.me/${(number || "").replace(/\D/g,"")}?text=${encodeURIComponent(message)}`;
  }
  function whatsappPage() {
    const topics = [
      {number:"01",title:"CONTRATACIONES",text:"Shows, clubes, festivales y fechas para ALLEN KS.",message:"Hola Alan, quiero consultar por la contratación de ALLEN KS para un evento."},
      {number:"02",title:"ASESORÍAS",text:"Producción musical, Dubstep y consultas sobre tus proyectos.",message:"Hola Alan, quiero consultar por una asesoría de producción musical con ALLEN KS."},
      {number:"03",title:"LLAMADA PERSONALIZADA",text:"Una consulta individual para resolver dudas concretas.",message:"Hola Alan, quiero coordinar una llamada personalizada con vos. ¿Qué opciones hay?"},
      {number:"04",title:"STEMS / FLP",text:"Consultas por archivos de producción, stems y proyectos FL Studio.",message:"Hola Alan, quiero consultar por STEMS o proyectos FLP de tu catálogo.",kind:"sales"},
      {number:"05",title:"PRODUCTOS",text:"Samplepacks, recursos y próximas novedades.",message:"Hola Alan, quiero consultar por productos y samplepacks de ALLEN KS."},
      {number:"06",title:"PRÓXIMAS FECHAS",text:"Eventos, entradas y próximos shows.",message:"Hola Alan, quiero saber sobre tus próximas fechas y entradas.",kind:"tickets"}
    ];
    return pageHero("HABLEMOS DIRECTO", "WHATSAPP", "Elegí qué necesitás y abrí una conversación con un mensaje preparado para tu consulta.")
      + `<section class="container whatsapp-hub"><div class="whatsapp-intro"><span class="eyebrow">CONTACTO DIRECTO</span><h2>¿EN QUÉ TE PUEDO AYUDAR?</h2><p>Elegí un tema. Contrataciones y consultas van al <strong>+54 9 11 7294-0652</strong>; STEMS, FLP y entradas van al <strong>+54 9 11 3613-3976</strong>. Podés editar cada mensaje antes de enviarlo.</p></div>
      <div class="whatsapp-topic-grid">${topics.map(t=>`<article class="whatsapp-topic"><span>${t.number} / CONSULTA</span><h3>${t.title}</h3><p>${t.text}</p><a href="${generalWhatsappLink(t.message,t.kind)}" target="_blank" rel="noopener noreferrer">CONSULTAR POR WHATSAPP ${icon("arrow",18)}</a></article>`).join("")}</div></section>` + journeyLinks();
  }
  function notFound() {
    return pageHero("404", "NO ENCONTRADO", "Esta página no existe. Volvé al inicio para seguir explorando.") + `<div class="container not-found-link"><a class="hero-cta compact" href="/">VOLVER AL INICIO ${icon("arrow", 20)}</a></div>`;
  }
  function render() {
    const views = { "/":home, "/musica":musicPage, "/cancion":trackPage, "/en-vivo":livePage, "/proyectos":projectsPage, "/sobre-mi":aboutPage, "/contacto":contactPage,
      "/spotify":()=>socialHubPage("spotify"), "/soundcloud":()=>socialHubPage("soundcloud"), "/apple-music":()=>socialHubPage("apple-music"), "/whatsapp":whatsappPage,
      "/instagram":()=>socialHubPage("instagram"), "/youtube":()=>socialHubPage("youtube"), "/tiktok":()=>socialHubPage("tiktok") };
    app.innerHTML = header() + `<main id="main-content">${(views[page] || notFound)()}</main>` + footer();
    document.title = `${page === "/" ? "Sitio Oficial" : page === "/sobre-mi" ? "Sobre mí" : page === "/cancion" && requestedTrackIndex >= 0 ? `${data.tracks[requestedTrackIndex].title} — Descargas` : (routes.find(r=>r.path===page)?.label || page.slice(1).toUpperCase())} — ALLEN KS`;
    bindEvents();
    if (document.querySelector("#music-player") && data.tracks[selected]?.audio) {
      audio.src = data.tracks[selected].audio;
      audio.load();
    }
  }
  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    return `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,"0")}`;
  }
  function updatePlayer() {
    const container = document.querySelector("#music-player");
    if (!container) return;
    const track = data.tracks[selected];
    const cover = container.querySelector(".player-cover");
    cover.innerHTML = artwork(track, "player-art");
    cover.href = trackHref(track);
    cover.setAttribute("aria-label", `Abrir página de ${track.title}`);
    container.querySelector("#player-title").textContent = track.title;
    container.querySelector("#player-download-link").href = playerDownloadHref(track);
    container.querySelector("#current-time").textContent = "0:00";
    container.querySelector("#total-time").textContent = track.durationLabel;
    setPlayerProgress(0);
    pendingSeekPercent = null;
    refreshPlayButton();
  }
  function setPlayerProgress(percent) {
    const value=Math.max(0,Math.min(100,percent));
    const progress=document.querySelector("#player-progress");
    if (!progress) return;
    progress.setAttribute("aria-valuenow", String(Math.round(value)));
    progress.style.setProperty("--seek-percent", `${value}%`);
  }
  function applyPendingSeek() {
    if (pendingSeekPercent === null) return;
    const duration=audio.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;
    const target=Math.min(duration-.02, Math.max(0,pendingSeekPercent * duration));
    try {
      audio.currentTime=target;
      if (Math.abs(audio.currentTime-target)<1.5) pendingSeekPercent=null;
    } catch { /* Se reintenta al cargar los datos reproducibles. */ }
  }
  function refreshPlayButton() {
    const playing = !audio.paused && !!audio.currentSrc;
    const btn = document.querySelector("#player-main-btn");
    if (btn) {
      btn.classList.toggle("is-loading", audio.isLoading);
      btn.innerHTML = audio.isLoading ? '<span class="player-loading-spinner" aria-hidden="true"></span>' : icon(playing ? "pause" : "play", 30);
      btn.setAttribute("aria-label", audio.isLoading ? `Cargando ${data.tracks[selected].title}` : playing ? `Pausar ${data.tracks[selected].title}` : `Reproducir ${data.tracks[selected].title}`);
    }
    const panel = document.querySelector("#music-player");
    panel?.classList.toggle("is-playing", playing);
    document.querySelectorAll("[data-play]").forEach(cardBtn => {
      const index = Number(cardBtn.dataset.play);
      const current = index === selected;
      const active = current && playing;
      cardBtn.innerHTML = `${icon(active ? "pause" : "play", 15)} ${active ? "PAUSA" : "PLAY"}`;
      cardBtn.setAttribute("aria-label", `${active ? "Pausar" : "Reproducir"} ${data.tracks[index].title}`);
      cardBtn.setAttribute("aria-pressed", String(active));
      cardBtn.closest(".release-card")?.classList.toggle("is-selected", current);
      cardBtn.closest(".release-card")?.classList.toggle("is-playing", active);
    });
  }
  async function selectTrack(i, autoplay = true) {
    const track = data.tracks[i];
    if (!track) return;
    const changed = selected !== i;
    if (!changed && autoplay && !audio.paused) {
      audio.pause();
      return;
    }
    if (changed || !audio.getAttribute("src")) {
      audio.pause();
      resumeAfterSkip = false;
      selected = i;
      if (track.audio) audio.src = track.audio;
      else audio.removeAttribute("src");
      audio.load();
      updatePlayer();
    }
    if (!autoplay) return;
    if (!track.audio) {
      announce(`El audio de ${track.title} todavía no está cargado. El espacio está preparado para el MP3 original.`);
      return;
    }
    try { await audio.play(); } catch { announce("El navegador no pudo iniciar la reproducción."); }
    refreshPlayButton();
  }
  function togglePlay() {
    const track = data.tracks[selected];
    if (!track.audio) return announce(`Falta cargar el MP3 original de ${track.title}.`);
    resumeAfterSkip = false;
    if (audio.paused) selectTrack(selected, true);
    else audio.pause();
    refreshPlayButton();
  }
  function seekToPercent(value) {
    const percent = Math.max(0, Math.min(1, value));
    if (!data.tracks[selected]?.audio) return;
    pendingSeekPercent = percent;
    setPlayerProgress(percent*100);
    applyPendingSeek();
    const displayDuration = (Number.isFinite(audio.duration)&&audio.duration>0 ? audio.duration : null) || (() => {
      const [minutes,seconds] = data.tracks[selected].durationLabel.split(":").map(Number);
      return (minutes*60)+seconds;
    })();
    const label = document.querySelector("#current-time");
    if (label) label.textContent = formatTime(percent * displayDuration);
  }
  function skipSeconds(delta) {
    const track = data.tracks[selected];
    if (!track?.audio) return announce("Todavía no hay un MP3 disponible para esta canción.");
    const [min, sec] = track.durationLabel.split(":").map(Number);
    const total = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : min * 60 + sec;
    if (!Number.isFinite(total) || total <= 0) return;
    const target = Math.max(0, Math.min(total - .2, audio.currentTime + delta));
    const wasPlaying = !audio.paused;
    resumeAfterSkip = wasPlaying;
    seekToPercent(target / total);
    clearTimeout(resumeSkipTimer);
    if (wasPlaying) resumeSkipTimer = setTimeout(() => {
      if (resumeAfterSkip && audio.paused) audio.play().catch(() => announce("No se pudo reanudar el audio."));
      resumeAfterSkip = false;
    }, 250);
  }
  function bindTrackButtons(scope = document) {
    scope.querySelectorAll("[data-play]").forEach(btn => btn.addEventListener("click", () => selectTrack(Number(btn.dataset.play), true)));
  }
  function bindEvents() {
    const trigger = document.querySelector(".menu-trigger");
    trigger?.addEventListener("click", () => {
      const open = document.querySelector(".mobile-nav").classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(open));
      trigger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      trigger.innerHTML = icon(open ? "close" : "menu", 26);
    });
    bindTrackButtons();
    ["catalog", "collaborations"].forEach(kind => {
      document.getElementById(`${kind}-pages`)?.addEventListener("click", e => {
        const button = e.target.closest("button[data-catalog-nav]");
        if (button) changeCatalogPage(kind, Number(button.dataset.page));
      });
    });
    document.querySelector(".collab-filters")?.addEventListener("click", e => {
      const button = e.target.closest("button[data-collab-filter]");
      if (!button) return;
      collabFilter = button.dataset.collabFilter;
      catalogState.collaborations = 1;
      document.querySelectorAll("[data-collab-filter]").forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      const tracks = collaborationTracks();
      document.getElementById("collaborations-grid").innerHTML = catalogCards("collaborations", tracks);
      document.getElementById("collaborations-pages").innerHTML = catalogPagination("collaborations", tracks.length);
      bindTrackButtons(document.getElementById("collaborations-grid"));
      refreshPlayButton();
    });
    document.querySelector("#player-main-btn")?.addEventListener("click", togglePlay);
    document.querySelectorAll("[data-skip]").forEach(btn => btn.addEventListener("click", () => skipSeconds(Number(btn.dataset.skip))));
    const promo = document.querySelector("#player-promo");
    if (promo) {
      let promoIndex = 0;
      clearInterval(promoTimer);
      promoTimer = setInterval(() => {
        if (document.hidden) return;
        promoIndex = (promoIndex + 1) % promoLines.length;
        const label = document.querySelector("#player-promo-label");
        if (!label) return clearInterval(promoTimer);
        label.classList.remove("promo-animate");
        void label.offsetWidth;
        label.textContent = promoLines[promoIndex];
        label.classList.add("promo-animate");
      }, 4700);
    }
    document.querySelector("#volume-range")?.addEventListener("input", e => audio.volume = Number(e.target.value));
    document.querySelector("#contact-form")?.addEventListener("submit", e => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      const message=`Hola Alan, te escribo desde tu web.\nConsulta: ${f.get("subject")}\nNombre: ${f.get("name")}\nEmail: ${f.get("email")}\nMensaje: ${f.get("message")}`;
      window.open(generalWhatsappLink(message,"bookings"),"_blank","noopener,noreferrer");
    });
    const pastCards=[...document.querySelectorAll("[data-past-card]")];
    if (pastCards.length) {
      let front=0;
      const draw=()=>{
        pastCards.forEach((card,i)=>{
          const depth=(i-front+pastCards.length)%pastCards.length;
          card.dataset.depth=String(depth);
          card.setAttribute("aria-hidden",String(depth!==0));
        });
        const label=document.querySelector("#past-index-label");
        if(label) label.textContent=`${String(front+1).padStart(2,"0")} / ${String(pastCards.length).padStart(2,"0")}`;
      };
      const next=()=>{front=(front+1)%pastCards.length;draw();};
      const previous=()=>{front=(front-1+pastCards.length)%pastCards.length;draw();};
      document.querySelector("[data-past-prev]")?.addEventListener("click",previous);
      document.querySelector("[data-past-next]")?.addEventListener("click",next);
      clearInterval(pastEventsTimer);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        pastEventsTimer=setInterval(()=>{if(!document.hidden)next();},4800);
      }
    }
    if (window.location.hash) setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" }), 70);
  }
  audio.volume = .85;
  audio.addEventListener("timeupdate", () => {
    if (pendingSeekPercent !== null) return;
    const current = document.querySelector("#current-time");
    if (current) current.textContent = formatTime(audio.currentTime);
    setPlayerProgress(audio.duration && Number.isFinite(audio.duration) ? (audio.currentTime/audio.duration)*100 : 0);
  });
  audio.addEventListener("loadedmetadata", () => {
    applyPendingSeek();
    const total = document.querySelector("#total-time");
    if (total) total.textContent = formatTime(audio.duration);
  });
  audio.addEventListener("canplay",applyPendingSeek);
  audio.addEventListener("playing",applyPendingSeek);
  audio.addEventListener("progress",applyPendingSeek);
  audio.addEventListener("loadstart", refreshPlayButton);
  audio.addEventListener("play", refreshPlayButton);
  audio.addEventListener("seeked", () => {
    if (resumeAfterSkip && audio.paused) audio.play().catch(() => announce("No se pudo reanudar el audio."));
    resumeAfterSkip = false;
  });
  audio.addEventListener("pause", refreshPlayButton);
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.pause();
    refreshPlayButton();
  });
  audio.addEventListener("error", () => announce("No fue posible cargar este archivo de audio."));
  render();
})();
