import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const previewDir = join(root, "preview-build");
const storeHtmlPath = join(previewDir, "tienda", "index.html");
const homeHtmlPath = join(previewDir, "index.html");

if (!existsSync(storeHtmlPath)) throw new Error("Missing Tienda HTML.");
if (!existsSync(homeHtmlPath)) throw new Error("Missing home HTML.");

let html = readFileSync(storeHtmlPath, "utf8");
const override = `<style id="store-bg-imgur-20260911k">.tearout{background-image:url('https://i.imgur.com/7dIU6wT.jpeg')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#070708!important}.tearout:before,.tearout:after{content:none!important}.side-note{display:none!important}@media(min-width:901px){.product-visual{overflow:visible!important}.product-visual img{width:155%!important;max-width:none!important;transform:translateX(-2%)!important}}.merch{min-height:760px!important;background-image:url('https://i.imgur.com/M709nGJ.jpeg')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#7ddcff!important}.merch:before{content:none!important}.merch-grid{min-height:760px!important}.merch-copy{background:rgba(255,255,255,.94)!important;padding:38px 42px!important;max-width:500px!important;box-shadow:0 18px 48px rgba(0,0,0,.16)!important}.merch-copy h2{font-size:clamp(66px,5.9vw,96px)!important;line-height:.82!important;letter-spacing:-4px!important;white-space:nowrap!important}.merch-art img{display:none!important}.shipping{background:rgba(255,255,255,.94)!important;padding:18px 24px!important;box-shadow:0 12px 34px rgba(0,0,0,.14)!important}@media(max-width:900px){.merch{min-height:900px!important;background-size:auto 100%!important;background-position:67% top!important}.merch-grid{display:block!important;min-height:900px!important;padding:470px 0 32px!important}.merch-copy{margin:0 auto!important;padding:28px!important;max-width:520px!important}.merch-copy h2{font-size:64px!important;letter-spacing:-3px!important;white-space:normal!important}.merch-art{position:absolute!important;inset:0!important;min-height:0!important;pointer-events:none!important}.shipping{display:none!important}}@media(max-width:520px){.merch{min-height:860px!important;background-size:auto 100%!important;background-position:67% top!important}.merch-grid{min-height:860px!important;padding:430px 0 24px!important}.merch-copy{width:calc(100% - 28px)!important;padding:22px 20px!important}.merch-copy h2{font-size:56px!important;line-height:.86!important;letter-spacing:-2.5px!important}.merch-copy h3{font-size:26px!important}}</style>`;

html = html.replace(/<style id="tearout-bg-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<style id="tearout-bg-imgur-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<style id="store-bg-imgur-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<img src="\.\.\/assets\/store-merch\.webp[^"]*" alt="Remera Dubstep Is Life">/g, "");
html = html.replace(/src="\.\.\/assets\/tearout-box\.avif[^"]*"/g, 'src="https://i.imgur.com/UZfjjCC.png"');
html = html.replace("</head>", `${override}</head>`);
writeFileSync(storeHtmlPath, html);

let home = readFileSync(homeHtmlPath, "utf8");
const homeOverride = `<style id="homepage-wallpaper-fix-20260911">.v3-hero{background:#080606 url('./assets/allen-ks-v3-cover.jpg') center center/cover no-repeat!important}</style>`;
home = home.replace(/<style id="homepage-wallpaper-fix-[^"]+">[\s\S]*?<\/style>/g, "");
home = home.replace("</head>", `${homeOverride}</head>`);
writeFileSync(homeHtmlPath, home);

const sharedTopbarLink = '<link rel="stylesheet" href="/assets/shared-topbar.css">';
function injectSharedTopbar(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      injectSharedTopbar(path);
      continue;
    }
    if (!name.endsWith('.html')) continue;
    let page = readFileSync(path, 'utf8');
    if (!page.includes('site-header')) continue;
    page = page.replace(/<link rel="stylesheet" href="\/assets\/shared-topbar\.css">/g, '');
    page = page.replace(/>PROYECTOS<\/a>/g, '>CONTENIDO</a>');
    page = page.replace('</head>', `${sharedTopbarLink}</head>`);
    writeFileSync(path, page);
  }
}

injectSharedTopbar(previewDir);
console.log("Applied Tienda fixes, restored homepage wallpaper, and enforced one canonical topbar on every page.");
