/**
 * Regenerates favicon.ico, apple-touch-icon.png, and og-image.jpg
 * from public/favicon.svg (Figma node 1:226) and Aloha Salads brand colors.
 *
 *   node scripts/gen-icons.mjs
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';

const BRAND_DARK = '#3C2718'; // brand.colors.navy / cacao
const BRAND_ACCENT = '#994321'; // brand.colors.accent / hibiscus
const BRAND_CREAM = '#FAF4E8'; // brand.colors.white / card
const BRAND_SEAWEED = '#778074'; // brand.colors.eyebrow

const faviconSvg = readFileSync('public/favicon.svg');

const ogBase = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${BRAND_DARK}"/>
  <rect x="308" y="90" width="3" height="200" fill="${BRAND_SEAWEED}" opacity="0.5"/>
  <text x="340" y="160" font-family="Georgia,serif" font-size="72" fill="${BRAND_CREAM}">Aloha Salads</text>
  <text x="342" y="220" font-family="Arial,sans-serif" font-size="28" fill="${BRAND_SEAWEED}">Island-grown produce. Never-frozen local ahi. Six spots on O‘ahu.</text>
  <rect x="0" y="610" width="1200" height="4" fill="${BRAND_ACCENT}" opacity="0.35"/>
</svg>`);

const mark = await sharp(faviconSvg).resize(200, 200).png().toBuffer();

await Promise.all([
  sharp(faviconSvg).resize(180, 180).png().toFile('public/apple-touch-icon.png'),
  sharp(faviconSvg).resize(32, 32).png().toFile('public/favicon.ico'),
  sharp(ogBase)
    .composite([{ input: mark, left: 70, top: 90 }])
    .jpeg({ quality: 92 })
    .toFile('src/assets/images/og-image.jpg'),
]);
console.log('✓ apple-touch-icon.png ✓ favicon.ico ✓ og-image.jpg');
