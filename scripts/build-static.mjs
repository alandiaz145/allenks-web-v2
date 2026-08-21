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

if (process.env.MIGRATION_PREVIEW === "1") {
  const previewRoot = "https://raw.githack.com/alandiaz145/allenks-web-v2/migration/current-public-20260821/preview-build";
  const htmlFiles = [
    join(out, "index.html"),
    join(out, "musica", "index.html"),
    join(out, "tienda", "index.html"),
    join(out, "proyectos", "index.html"),
  ];

  for (const file of htmlFiles) {
    if (!existsSync(file)) continue;
    let html = readFileSync(file, "utf8");
    html = html.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g, (_match, attr, path) => `${attr}="${previewRoot}/${path}"`);
    writeFileSync(file, html);
  }
}

console.log(`Static site built at ${out}`);
