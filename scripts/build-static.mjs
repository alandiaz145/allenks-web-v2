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
  ["Instagram", "https://www.instagram.com/dubstepwacho/", "instagram"],
  ["SoundCloud", "https://soundcloud.com/allenksmusic", "soundcloud"],
  ["YouTube", "https://www.youtube.com/@allenksmusic", "youtube"],
  ["Spotify", "https://open.spotify.com/artist/2Qutt1ypoIqkTMZEELO8TZ", "spotify"],
];

const navItems = [
  ["MUSIC", "/musica/", "musica"],
  ["LIVE", "/#en-vivo", "live"],
  ["STORE", "/tienda/", "tienda"],
  ["PROJECTS", "/proyectos/", "proyectos"],
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
  return `<section class="v3-hero" aria-labelledby="v3-hero-title"><div class="v3-hero-copy"><h1 id="v3-hero-title">ALLEN KS</h1><p class="v3-hero-aka">AKA DUBSTEP WACHO</p><p class="v3-hero-lead">Artista argentino, creador de Otra Noche y fundador de Spartans Label. Descubrí su música, próximas fechas y proyectos.</p><div class="v3-hero-actions"><a href="#lanzamientos">ESCUCHAR AHORA ↘</a><a href="#en-vivo">VER EN VIVO ↘</a></div></div></section>`;
}

function renderFooterSocials() {
  return `<nav class="v3-footer-socials" aria-label="Redes de ALLEN KS">${socials
    .map(([label, href, icon]) => `<a href="${href}" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/${icon}/090606" alt="" width="22" height="22"><span>${label}</span><strong>${label === "Instagram" ? "@DUBSTEPWACHO" : label === "SoundCloud" ? "ALLENKSMUSIC" : label === "YouTube" ? "@ALLENKSMUSIC" : "ALLEN KS"}</strong><b aria-hidden="true">↗</b></a>`)
    .join("")}</nav>`;
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
    html = html.replace(/<div class="ak-footer-brand">.*?<\/div>/s, '<div class="ak-footer-brand"><strong class="v3-footer-wordmark">ALLEN KS</strong></div>');
    html = html.replace(/<nav class="ak-socials"[^>]*>.*?<\/nav>/s, renderFooterSocials());
  }

  if (!html.includes("/assets/v3-static.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="/assets/v3-static.css"></head>');
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
