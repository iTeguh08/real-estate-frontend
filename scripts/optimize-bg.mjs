import sharp from 'sharp';
import { existsSync, mkdirSync, copyFileSync, statSync, readdirSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bgDir = path.resolve(__dirname, '../public/bg');
const backupDir = path.join(bgDir, '_original');

/** Atmosphere/decor photos are rendered at low opacity behind masks and
 * scrims (see SectionAtmosphere), so downscaling them is visually
 * unnoticeable but cuts decoded-image memory (and scroll raster cost)
 * roughly in half to a quarter. */
const MAX_WIDTH = 1024;

if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true });

function backupOnce(file) {
  const dest = path.join(backupDir, path.basename(file));
  if (!existsSync(dest)) copyFileSync(file, dest);
}

async function resizeWebpInPlace(file) {
  const meta = await sharp(file).metadata();
  if (!meta.width || meta.width <= MAX_WIDTH) return { skipped: true };

  backupOnce(file);
  const before = statSync(file).size;
  const buffer = await sharp(backupDir + '/' + path.basename(file))
    .resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  await sharp(buffer).toFile(file);
  const after = statSync(file).size;
  return { skipped: false, before, after };
}

async function convertRasterToWebp(rasterFile) {
  const webpFile = rasterFile.replace(/\.(png|jpe?g)$/i, '.webp');
  if (existsSync(webpFile)) return { skipped: true };

  backupOnce(rasterFile);
  const before = statSync(rasterFile).size;
  await sharp(rasterFile).webp({ quality: 82, effort: 6 }).toFile(webpFile);
  const after = statSync(webpFile).size;
  // Original stays backed up in _original/; remove the legacy raster from
  // public/bg so it isn't accidentally served.
  unlinkSync(rasterFile);
  return { skipped: false, before, after, renamedTo: path.basename(webpFile) };
}

const entries = readdirSync(bgDir, { withFileTypes: true }).filter((e) => e.isFile());

let totalBefore = 0;
let totalAfter = 0;

for (const entry of entries) {
  const file = path.join(bgDir, entry.name);

  if (/\.(png|jpe?g)$/i.test(entry.name)) {
    const result = await convertRasterToWebp(file);
    if (!result.skipped) {
      totalBefore += result.before;
      totalAfter += result.after;
      console.log(
        `${entry.name} -> ${result.renamedTo}: ${(result.after / 1024).toFixed(1)} KB (was ${(result.before / 1024).toFixed(1)} KB)`
      );
    }
    continue;
  }

  if (entry.name.toLowerCase().endsWith('.webp')) {
    const result = await resizeWebpInPlace(file);
    if (!result.skipped) {
      totalBefore += result.before;
      totalAfter += result.after;
      console.log(
        `${entry.name}: ${(result.after / 1024).toFixed(1)} KB (was ${(result.before / 1024).toFixed(1)} KB)`
      );
    }
  }
}

if (totalBefore > 0) {
  console.log(
    `\nbg assets optimized: ${(totalAfter / 1024).toFixed(1)} KB total (was ${(totalBefore / 1024).toFixed(1)} KB)`
  );
} else {
  console.log('bg assets: nothing to optimize (already within size budget).');
}
