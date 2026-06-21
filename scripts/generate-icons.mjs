// Genera le app-icon PNG (iOS / Android / PWA) dal logo Aegis.
// Scudo cyan + check bianco su sfondo navy con padding ("respiro" da app-icon).
// Usa la path scudo verificata (non tagliata) in coordinate 0 0 100 116.
//
//   node scripts/generate-icons.mjs
//
// Output:
//   app/apple-icon.png   180x180  (Next.js la serve come apple-touch-icon)
//   public/icon-192.png  192x192  (Android / PWA, referenziata dal manifest)
//   public/icon-512.png  512x512  (Android / PWA / splash)

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const NAVY = "#0B1424";
const CYAN = "#06B6D4";
const WHITE = "#FFFFFF";

// Costruisce l'SVG dell'app-icon per una data dimensione quadrata.
// Lo scudo occupa ~58% dell'altezza, centrato → padding uniforme attorno
// (sta nella "safe zone" delle icone maskable Android).
function appIconSVG(canvas) {
  const scale = (canvas * 0.58) / 116;
  const contentW = 100 * scale;
  const contentH = 116 * scale;
  const tx = (canvas - contentW) / 2;
  const ty = (canvas - contentH) / 2;
  return `<svg width="${canvas}" height="${canvas}" viewBox="0 0 ${canvas} ${canvas}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${canvas}" height="${canvas}" fill="${NAVY}"/>
  <g transform="translate(${tx} ${ty}) scale(${scale})">
    <path d="M50 4 L88 19 L88 53 Q88 90 50 112 Q12 90 12 53 L12 19 Z" fill="${CYAN}"/>
    <path d="M30 70 L44 84 L72 44" fill="none" stroke="${WHITE}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}

const targets = [
  { size: 180, out: join(root, "app", "apple-icon.png") },
  { size: 192, out: join(root, "public", "icon-192.png") },
  { size: 512, out: join(root, "public", "icon-512.png") },
];

for (const { size, out } of targets) {
  await sharp(Buffer.from(appIconSVG(size)), { density: 300 })
    .resize(size, size)
    .png()
    .toFile(out);
  console.log(`✓ ${out} (${size}x${size})`);
}
