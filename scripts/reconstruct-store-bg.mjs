import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const storeHtmlPath = join(root, "preview-build", "tienda", "index.html");

if (!existsSync(storeHtmlPath)) throw new Error("Missing Tienda HTML.");

let html = readFileSync(storeHtmlPath, "utf8");
const override = `<style id="store-bg-imgur-20260911h">.tearout{background-image:url('https://i.imgur.com/7dIU6wT.jpeg')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#070708!important}.tearout:before,.tearout:after{content:none!important}.side-note{display:none!important}.merch{min-height:760px!important;background-image:url('https://i.imgur.com/M709nGJ.jpeg')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#7ddcff!important}.merch:before{content:none!important}.merch-grid{min-height:760px!important}.merch-copy{background:rgba(255,255,255,.94)!important;padding:38px 42px!important;max-width:500px!important;box-shadow:0 18px 48px rgba(0,0,0,.16)!important}.merch-art img{display:none!important}.shipping{background:rgba(255,255,255,.94)!important;padding:18px 24px!important;box-shadow:0 12px 34px rgba(0,0,0,.14)!important}@media(max-width:900px){.merch{background-position:64% center!important}.merch-grid{display:block!important;padding:40px 0 360px!important}.merch-copy{margin:0!important;padding:28px!important;max-width:520px!important}.merch-art{position:absolute!important;inset:0!important;min-height:0!important;pointer-events:none!important}.shipping{display:block!important;right:18px!important;top:auto!important;bottom:28px!important}}@media(max-width:520px){.merch{background-position:68% center!important}.merch-grid{padding:24px 0 330px!important}.merch-copy{padding:22px 20px!important}.shipping{font-size:17px!important;padding:14px 16px!important}}</style>`;

html = html.replace(/<style id="tearout-bg-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<style id="tearout-bg-imgur-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<style id="store-bg-imgur-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<img src="\.\.\/assets\/store-merch\.webp[^"]*" alt="Remera Dubstep Is Life">/g, "");
html = html.replace("</head>", `${override}</head>`);

writeFileSync(storeHtmlPath, html);
console.log("Injected Imgur backgrounds for Tearout and Merch into Tienda.");
