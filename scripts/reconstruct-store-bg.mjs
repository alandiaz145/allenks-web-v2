import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const storeHtmlPath = join(root, "preview-build", "tienda", "index.html");

if (!existsSync(storeHtmlPath)) throw new Error("Missing Tienda HTML.");

let html = readFileSync(storeHtmlPath, "utf8");
const override = `<style id="store-bg-imgur-20260911h">.tearout{background-image:url('https://i.imgur.com/7dIU6wT.jpeg')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#070708!important}.tearout:before,.tearout:after{content:none!important}.side-note{display:none!important}.merch{min-height:760px!important;background-image:url('https://i.imgur.com/M709nGJ.jpeg')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#7ddcff!important}.merch:before{content:none!important}.merch-grid{min-height:760px!important}</style>`;

html = html.replace(/<style id="tearout-bg-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<style id="tearout-bg-imgur-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<style id="store-bg-imgur-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace("</head>", `${override}</head>`);

writeFileSync(storeHtmlPath, html);
console.log("Injected Imgur backgrounds for Tearout and Merch into Tienda.");
