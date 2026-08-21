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

writeFileSync(join(out, ".nojekyll"), "");

// Keep the artifact portable: relative internal URLs work both at the
// temporary GitHub Pages project path (/allenks-web-v2/) and later at the
// custom-domain root (allenks.com.ar) without another code change.
const htmlFiles = [
  { file: join(out, "index.html"), prefix: "./" },
  { file: join(out, "musica", "index.html"), prefix: "../" },
  { file: join(out, "tienda", "index.html"), prefix: "../" },
  { file: join(out, "proyectos", "index.html"), prefix: "../" },
];

function portableUrl(path, prefix) {
  if (path === "/") return prefix;

  const match = path.match(/^\/([^?#]*)([?#].*)?$/);
  if (!match) return path;

  let pathname = match[1];
  const suffix = match[2] ?? "";

  if (!pathname) return `${prefix}${suffix}`;
  if (!pathname.includes(".") && !pathname.endsWith("/")) pathname += "/";

  return `${prefix}${pathname}${suffix}`;
}

for (const { file, prefix } of htmlFiles) {
  if (!existsSync(file)) continue;

  let html = readFileSync(file, "utf8");
  html = html.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g, (_match, attr, path) => {
    return `${attr}="${portableUrl(`/${path}`, prefix)}"`;
  });
  writeFileSync(file, html);
}

console.log(`Static site built at ${out}`);
