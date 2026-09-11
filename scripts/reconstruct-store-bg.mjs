import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const storeHtmlPath = join(root, "preview-build", "tienda", "index.html");

if (!existsSync(storeHtmlPath)) throw new Error("Missing Tienda HTML.");

let html = readFileSync(storeHtmlPath, "utf8");
const override = `<style id="store-bg-imgur-20260911j">.tearout{background-image:url('https://i.imgur.com/7dIU6wT.jpeg')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#070708!important}.tearout:before,.tearout:after{content:none!important}.side-note{display:none!important}@media(min-width:901px){.product-visual img{width:100%!important;max-width:none!important}.product-visual{overflow:visible!important}}.merch{min-height:760px!important;background-image:url('https://i.imgur.com/M709nGJ.jpeg')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#7ddcff!important}.merch:before{content:none!important}.merch-grid{min-height:760px!important}.merch-copy{background:rgba(255,255,255,.94)!important;padding:38px 42px!important;max-width:500px!important;box-shadow:0 18px 48px rgba(0,0,0,.16)!important}.merch-copy h2{font-size:clamp(66px,5.9vw,96px)!important;line-height:.82!important;letter-spacing:-4px!important;white-space:nowrap!important}.merch-art img{display:none!important}.shipping{background:rgba(255,255,255,.94)!important;padding:18px 24px!important;box-shadow:0 12px 34px rgba(0,0,0,.14)!important}@media(max-width:900px){.merch{min-height:900px!important;background-size:auto 100%!important;background-position:67% top!important}.merch-grid{display:block!important;min-height:900px!important;padding:470px 0 32px!important}.merch-copy{margin:0 auto!important;padding:28px!important;max-width:520px!important}.merch-copy h2{font-size:64px!important;letter-spacing:-3px!important;white-space:normal!important}.merch-art{position:absolute!important;inset:0!important;min-height:0!important;pointer-events:none!important}.shipping{display:none!important}}@media(max-width:520px){.merch{min-height:860px!important;background-size:auto 100%!important;background-position:67% top!important}.merch-grid{min-height:860px!important;padding:430px 0 24px!important}.merch-copy{width:calc(100% - 28px)!important;padding:22px 20px!important}.merch-copy h2{font-size:56px!important;line-height:.86!important;letter-spacing:-2.5px!important}.merch-copy h3{font-size:26px!important}}</style>`;

html = html.replace(/<style id="tearout-bg-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<style id="tearout-bg-imgur-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<style id="store-bg-imgur-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace(/<img src="\.\.\/assets\/store-merch\.webp[^"]*" alt="Remera Dubstep Is Life">/g, "");
html = html.replace(/src="\.\.\/assets\/tearout-box\.avif[^"]*"/g, 'src="https://i.imgur.com/UZfjjCC.png"');
html = html.replace("</head>", `${override}</head>`);

writeFileSync(storeHtmlPath, html);
console.log("Injected Imgur backgrounds, full-width Tearout product and responsive Merch fixes into Tienda.");
