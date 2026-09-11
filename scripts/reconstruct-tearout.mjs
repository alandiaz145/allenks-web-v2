import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sourceDir = join(root, "asset-source", "tearout", "bg45");
const targetDir = join(root, "preview-build", "assets");
const target = join(targetDir, "tearout-wallpaper.avif");

if (!existsSync(sourceDir)) {
  throw new Error("Missing Tearout wallpaper source chunks.");
}

const chunks = readdirSync(sourceDir)
  .filter((name) => name.endsWith(".txt"))
  .sort()
  .map((name) => readFileSync(join(sourceDir, name), "utf8").trim())
  .join("");

mkdirSync(targetDir, { recursive: true });
writeFileSync(target, Buffer.from(chunks, "base64"));
console.log(`Rebuilt Tearout wallpaper: ${target}`);
