import sharp from 'sharp';
import { statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPng = path.resolve(__dirname, '../src/assets/hero.png');
const outWebp = path.resolve(__dirname, '../src/assets/hero.webp');

await sharp(srcPng)
  .resize(1280, null, { withoutEnlargement: true, fit: 'inside' })
  .webp({ quality: 82, effort: 6 })
  .toFile(outWebp);

const before = statSync(srcPng).size;
const after = statSync(outWebp).size;
console.log(`hero.webp: ${(after / 1024).toFixed(1)} KB (was PNG ${(before / 1024).toFixed(1)} KB)`);
