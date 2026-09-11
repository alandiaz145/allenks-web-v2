import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "asset-source", "tearout", "final-wallpaper.b64.txt");
const targetDir = join(root, "preview-build", "assets");
const target = join(targetDir, "tearout-wallpaper-final.avif");

if (!existsSync(source)) {
  throw new Error("Missing Tearout wallpaper source.");
}

mkdirSync(targetDir, { recursive: true });
const base64 = readFileSync(source, "utf8").trim();
writeFileSync(target, Buffer.from(base64, "base64"));
console.log(`Rebuilt Tearout wallpaper: ${target}`);
