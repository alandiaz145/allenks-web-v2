import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sourceDir = join(root, "asset-source", "tearout", "bg45");
const assetDir = join(root, "preview-build", "assets");
const assetPath = join(assetDir, "tearout-bg.avif");
const storeHtmlPath = join(root, "preview-build", "tienda", "index.html");

if (!existsSync(sourceDir)) throw new Error("Missing Tearout background source chunks.");
const parts = readdirSync(sourceDir).filter((name) => name.endsWith(".txt")).sort();
if (!parts.length) throw new Error("No Tearout background chunks found.");
const base64 = parts.map((name) => readFileSync(join(sourceDir, name), "utf8").trim()).join("");
mkdirSync(assetDir, { recursive: true });
writeFileSync(assetPath, Buffer.from(base64, "base64"));

if (!existsSync(storeHtmlPath)) throw new Error("Missing Tienda HTML.");
let html = readFileSync(storeHtmlPath, "utf8");
const override = `<style id="tearout-bg-20260911e">.tearout{background-image:url('../assets/tearout-bg.avif?v=20260911e')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#070708!important}.tearout:before,.tearout:after{content:none!important}.side-note{display:none!important}</style>`;
html = html.replace(/<style id="tearout-bg-[^"]+">[\s\S]*?<\/style>/g, "");
html = html.replace("</head>", `${override}</head>`);
writeFileSync(storeHtmlPath, html);
console.log("Rebuilt Tearout background and injected Tienda override.");
