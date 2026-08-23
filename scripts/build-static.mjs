import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "site");
const out = join(root, "out");

if (!existsSync(source)) {
  throw new Error("Missing site/ source. Run the migration source sync first.");
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(source, out, { recursive: true });

const publicAssets = join(root, "public", "assets");
if (existsSync(publicAssets)) {
  mkdirSync(join(out, "assets"), { recursive: true });
  cpSync(publicAssets, join(out, "assets"), { recursive: true });
}

const coverUrl = "https://i.imgur.com/ytvxq1B.jpeg";
const coverResponse = await fetch(coverUrl);
if (!coverResponse.ok) {
  throw new Error(`Could not fetch V3 cover artwork: ${coverResponse.status}`);
}
writeFileSync(
  join(out, "assets", "allen-ks-v3-cover.jpg"),
  Buffer.from(await coverResponse.arrayBuffer()),
);

writeFileSync(join(out, ".nojekyll"), "");

const socials = [
  ["Instagram", "https://www.instagram.com/dubstepwacho/", "instagram", "@DUBSTEPWACHO"],
  ["SoundCloud", "https://soundcloud.com/allenksmusic", "soundcloud", "ALLENKSMUSIC"],
  ["YouTube", "https://www.youtube.com/@allenksmusic", "youtube", "@ALLENKSMUSIC"],
  ["Spotify", "https://open.spotify.com/artist/2Qutt1ypoIqkTMZEELO8TZ", "spotify", "ALLEN KS"],
];

const navItems = [
  ["MÚSICA", "/musica/", "musica"],
  ["EN VIVO", "/#en-vivo", "live"],
  ["TIENDA", "/tienda/", "tienda"],
  ["PROYECTOS", "/proyectos/", "proyectos"],
];

const liveVideos = [
  ["https://www.youtube.com/embed/gj2hWnohCco?controls=1&modestbranding=1&playsinline=1&rel=0&start=3522", "IKI B2B ALLEN KS", "OTRA NOCHE"],
  ["https://www.youtube.com/embed/fo5r5zwix6A?controls=1&modestbranding=1&playsinline=1&rel=0&start=913", "ALLEN KS EN VIVO", "SET 02"],
  ["https://www.youtube.com/embed/t1Ax3fmWiYE?controls=1&modestbranding=1&playsinline=1&rel=0&start=548", "ALLEN KS EN VIVO", "SET 03"],
  ["https://www.youtube.com/embed/kwbqAT45G00?controls=1&modestbranding=1&playsinline=1&rel=0&start=491", "ALLEN KS EN VIVO", "SET 04"],
];

const releaseVideos = [
  ["https://www.youtube.com/embed/ki1cUmKv_5Y?rel=0&modestbranding=1&playsinline=1", "NUEVO VIDEO", "BUST IT", "ALLEN KS · OFFICIAL VIDEO"],
  ["https://www.youtube.com/embed/3u6WUPHy0fI?rel=0&modestbranding=1&playsinline=1&start=19", "MÁS MÚSICA", "ALLEN KS", "VIDEO 02 · CATÁLOGO"],
];

function renderHeader(active) {
  const desktopNav = navItems
    .map(([label, href, key]) => `<a${active === key ? ' class="is-active" aria-current="page"' : ""} href="${href}">${label}</a>`)
    .join("");

  const headerSocials = socials
    .map(([label, href, icon]) => `<a href="${href}" target="_blank" rel="noreferrer" aria-label="${label}"><img src="https://cdn.simpleicons.org/${icon}/ffffff" alt="" width="18" height="18"></a>`)
    .join("");

  const mobileSocials = socials
    .map(([label, href, icon]) => `<a href="${href}" target="_blank" rel="noreferrer" aria-label="${label}"><img src="https://cdn.simpleicons.org/${icon}/090606" alt="" width="19" height="19"></a>`)
    .join("");

  return `<header class="site-header v3-site-header"><a class="v3-brand" href="/" aria-label="ALLEN KS — Inicio">ALLEN KS</a><nav class="v3-nav" aria-label="Navegación principal">${desktopNav}</nav><div class="v3-header-socials" aria-label="Redes de ALLEN KS">${headerSocials}</div><details class="v3-mobile-nav"><summary aria-label="Abrir menú"><span></span><span></span></summary><nav class="v3-mobile-panel" aria-label="Navegación móvil">${desktopNav}<div class="v3-mobile-socials">${mobileSocials}</div></nav></details></header>`;
}

function renderHero() {
  return `<section class="v3-hero" aria-labelledby="v3-hero-title"><div class="v3-hero-copy"><h1 id="v3-hero-title">ALLEN KS</h1><p class="v3-hero-aka">AKA DUBSTEP WACHO</p><p class="v3-hero-lead">Productor Argentino, Dj, creador de Otra Noche y fundador de Spartans Label. Descubrí su música, próximas fechas y proyectos.</p><div class="v3-hero-actions"><a href="#lanzamientos">ESCUCHAR AHORA ↘</a><a href="#en-vivo">VER EN VIVO ↘</a></div></div></section>`;
}

function renderMarquee() {
  const item = '<span>NUEVA MÚSICA</span><i>✦</i><span>SETS</span><i>✦</i><span>REMIXES</span><i>✦</i><span>COLABORACIONES</span><i>✦</i>';
  return `<div class="ak-marquee" aria-hidden="true"><div>${item.repeat(6)}</div></div>`;
}

function iframe(src, title) {
  return `<iframe title="${title}" data-src="${src.replaceAll("&", "&amp;")}" width="100%" height="100%" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>`;
}

function renderReleases() {
  const slides = releaseVideos.map(([src, eyebrow, title, meta], index) => `
    <article class="v10-static-slide${index === 0 ? " is-active" : ""}" data-v10-slide${index === 0 ? "" : " hidden"}>
      <div class="v10-static-release-slide">
        <div class="v10-static-release-copy">
          <span>${eyebrow}</span>
          <h3>${title}</h3>
          <strong>${meta}</strong>
          <p>VIDEO · ALLEN KS</p>
          <div class="v10-static-counter">${String(index + 1).padStart(2, "0")} / ${String(releaseVideos.length).padStart(2, "0")}</div>
        </div>
        <div class="v10-static-frame">${iframe(src, `${title} — ALLEN KS`)}</div>
      </div>
    </article>`).join("");

  return `<section class="v10-static-releases" id="lanzamientos" aria-labelledby="v10-releases-title"><header class="v10-static-heading"><span>MÚSICA NUEVA · ALLEN KS</span><h2 id="v10-releases-title">LANZAMIENTOS</h2></header><div class="v10-static-carousel" data-v10-carousel><button class="v10-static-arrow" type="button" data-prev aria-label="Video anterior">←</button><div class="v10-static-stage">${slides}</div><button class="v10-static-arrow" type="button" data-next aria-label="Video siguiente">→</button></div><a class="v10-static-catalog" href="/musica/">VER TODAS LAS CANCIONES →</a></section>`;
}

function renderLive() {
  const slides = liveVideos.map(([src, eyebrow, title], index) => `
    <article class="v10-static-slide${index === 0 ? " is-active" : ""}" data-v10-slide${index === 0 ? "" : " hidden"}>
      <div class="v10-static-live-slide">
        <div class="v10-static-live-frame">${iframe(src, `ALLEN KS en vivo — ${index + 1}`)}</div>
        <div class="v10-static-live-caption"><div><span>${eyebrow}</span><strong>${title}</strong></div><b>${String(index + 1).padStart(2, "0")} / ${String(liveVideos.length).padStart(2, "0")}</b></div>
      </div>
    </article>`).join("");

  return `<section class="v10-static-live" id="en-vivo" aria-labelledby="v10-live-title"><header class="v10-static-heading"><span>SETS · SHOWS · MOMENTOS</span><h2 id="v10-live-title">EN VIVO</h2></header><div class="v10-static-carousel" data-v10-carousel><button class="v10-static-arrow" type="button" data-prev aria-label="Set anterior">←</button><div class="v10-static-stage">${slides}</div><button class="v10-static-arrow" type="button" data-next aria-label="Set siguiente">→</button></div><div class="v10-static-next"><span>PRÓXIMAS FECHAS</span><div><strong>05 SEPTIEMBRE</strong><small>FREE PARTY · MULTIGÉNERO</small></div></div></section>`;
}

function renderProjects() {
  const productionVideo = "https://www.youtube.com/embed/3u6WUPHy0fI?controls=1&modestbranding=1&playsinline=1&rel=0&start=19";
  return `<section class="v10-static-projects" id="proyectos" aria-labelledby="v10-projects-title"><header class="v10-static-heading"><span>PRODUCCIÓN · RECURSOS · CONTENIDO</span><h2 id="v10-projects-title">PROYECTOS</h2></header><div class="v10-static-project-layout"><div class="v10-static-project-video"><div class="v10-static-project-video-frame">${iframe(productionVideo, "ALLEN KS — contenido de estudio")}</div><div class="v10-static-project-video-label"><span>PRODUCTION CONTENT</span><strong>ALLEN KS / FL STUDIO</strong></div></div><div class="v10-static-project-copy"><span>ABRIR EL PROYECTO</span><h3>MENOS SECRETO.<br>MÁS PROCESO.</h3><p>Explicaciones de producción, proyectos de FL Studio, breakdowns y contenido pensado para mostrar cómo construyo mis tracks desde adentro.</p><div class="v10-static-tags"><span>FLPs</span><span>PRODUCCIÓN</span><span>CONTENIDO EDUCATIVO</span><span>DESCARGAS GRATIS</span></div><p class="v10-static-note">Próximamente también voy a ir liberando recursos y descargas gratuitas para productores.</p><a href="/proyectos/">VER PROYECTOS →</a></div></div></section>`;
}

function renderFooter() {
  const links = socials.map(([label, href, _icon, handle]) => `<a href="${href}" target="_blank" rel="noreferrer"><span>${label}</span><strong>${handle}</strong><b>↗</b></a>`).join("");
  return `<footer class="v10-static-footer"><div class="v10-static-footer-main"><div class="v10-static-footer-brand"><img src="/assets/allen-ks-logo.png" alt="ALLEN KS"><div><strong>ALLEN KS</strong><span>DJ · PRODUCER · DUBSTEP WACHO</span></div></div><div class="v10-static-footer-cta"><small>BOOKINGS · COLABS · PRODUCCIÓN</small><h2>¿HACEMOS<br>ALGO RUIDOSO?</h2><a href="https://wa.me/5491136133976?text=Hola+Allen+KS%2C+quiero+hacerte+una+consulta." target="_blank" rel="noreferrer">HABLEMOS →</a></div></div><nav class="v10-static-socials" aria-label="Redes sociales">${links}</nav><div class="v10-static-footer-bottom"><span>© 2026 ALLEN KS · BUENOS AIRES, ARGENTINA</span><a href="#inicio">VOLVER ARRIBA ↑</a></div></footer>`;
}

const htmlTargets = [
  { route: "inicio", file: join(out, "index.html") },
  { route: "musica", file: join(out, "musica", "index.html") },
  { route: "tienda", file: join(out, "tienda", "index.html") },
  { route: "proyectos", file: join(out, "proyectos", "index.html") },
];

for (const { route, file } of htmlTargets) {
  if (!existsSync(file)) continue;

  let html = readFileSync(file, "utf8");
  html = html.replace(/<div class="ak-topline"[^>]*>.*?<\/div>/s, "");
  html = html.replace(/<header class="site-header[^"]*">.*?<\/header>/s, renderHeader(route));
  html = html.replace(/<img[^>]+allen-ks-logo\.png[^>]*\/?>(?!<)/g, "");

  if (route === "inicio") {
    html = html.replace(/<section class="ak-hero"[^>]*>.*?<\/section>/s, renderHero());
    html = html.replace(/<div class="ak-marquee"[^>]*>.*?<\/div><\/div>/s, renderMarquee());
    html = html.replace(/<section class="ak-releases"[^>]*>.*?<\/section>/s, renderReleases());
    html = html.replace(/<section class="v4-releases"[^>]*>.*?<\/section>/s, renderReleases());
    html = html.replace(/<section class="ak-live"[^>]*>.*?<\/section>/s, renderLive());
    html = html.replace(/<section class="ak-projects"[^>]*>.*?<\/section>/s, renderProjects());
    html = html.replace(/<footer class="ak-footer"[^>]*>.*?<\/footer>/s, renderFooter());
    html = html.replace(/<footer class="v10-static-footer"[^>]*>.*?<\/footer>/s, renderFooter());
  }

  if (!html.includes("/assets/v3-static.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="/assets/v3-static.css"></head>');
  }
  if (!html.includes("/assets/v4-home.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="/assets/v4-home.css"></head>');
  }
  if (!html.includes("/assets/v10-static.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="/assets/v10-static.css"></head>');
  }
  if (!html.includes("/assets/v4-runtime.js")) {
    html = html.replace("</body>", '<script src="/assets/v4-runtime.js" defer></script></body>');
  }
  if (!html.includes("/assets/v10-runtime.js")) {
    html = html.replace("</body>", '<script src="/assets/v10-runtime.js" defer></script></body>');
  }

  writeFileSync(file, html);
}

if (process.env.MIGRATION_PREVIEW === "1") {
  const previewRoot = "https://raw.githack.com/alandiaz145/allenks-web-v2/migration/current-public-20260821/preview-build";

  for (const { file } of htmlTargets) {
    if (!existsSync(file)) continue;
    let html = readFileSync(file, "utf8");
    html = html.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g, (_match, attr, path) => `${attr}="${previewRoot}/${path}"`);
    writeFileSync(file, html);
  }
}

console.log(`Static site built at ${out}`);
