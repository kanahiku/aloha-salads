/**
 * Upload new-images/Menu Photos/ to Sanity and patch the matching menuItem documents.
 * Run: node --env-file=.env scripts/upload-menu-photos.mjs
 */

import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'fs';
import { resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Sanity client ────────────────────────────────────────────────────────────
const TOKEN = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
if (!TOKEN) {
  throw new Error('Set SANITY_WRITE_TOKEN (or SANITY_API_TOKEN) in .env, then run: node --env-file=.env scripts/upload-menu-photos.mjs');
}

const client = createClient({
  projectId: 'sys9vj6r',
  dataset: 'production',
  apiVersion: '2026-09-15',
  useCdn: false,
  token: TOKEN,
});

// ─── Photo → Sanity document ID mapping ──────────────────────────────────────
// key: exact filename (without extension), value: Sanity menuItem _id
const PHOTO_MAP = {
  // Drinks
  'Guava Lemonade (Edit)':              'menuItem-guava-lemonade',
  'Hibiscus Mamaki Tea (Edit)':         'menuItem-big-island-mamaki-mint-tea',

  // Salads
  'Aloha Caesar 02 (Edit)':             'menuItem-aloha-caesar',
  'Aloha Mediterranean 04 (Edit)':      'menuItem-aloha-mediterranean',
  'Aloha Passion 02 (Edit)':            'menuItem-aloha-passion',
  'Kamuela Cobb 02 (Edit)':             'menuItem-kamuela-cobb',
  'Mandarin Ginger 02 (Edit)':          'menuItem-mandarin-ginger',
  'Ono Island Ahi 05 (Edit)':           'menuItem-ono-island-ahi',
  'The Paniolo 03 (Edit)':              'menuItem-the-paniolo',

  // Soups
  'Tomato Bisque 03':                   'menuItem-tomato-bisque',

  // Wraps & Subs
  'Aloha Gyro Wrap 01 (Edit)':          'menuItem-aloha-gyro-wrap',
  'Chicken Pesto Sandwich 01 (Edit)':   'menuItem-chicken-pesto-sandwich',
  'Club Sub 02 (Edit)':                 'menuItem-club-sub',
  'Curried Chicken Wrap 01 (Edit)':     'menuItem-curried-chicken-wrap',
  'Fresh Island Ahi Wrap 02 (Edit)':    'menuItem-fresh-island-ahi-wrap',
  'Grilled Cheese Combo 01':            'menuItem-grilled-cheese-soup-combo',
  'Grilled Steak Wrap 01 (Edit)':       'menuItem-grilled-steak-wrap',
  'Hummus Pita Wrap 01 (Edit)':         'menuItem-hummus-pita-wrap',
  "Tutu_s Chicken Salad Tortilla Wrap 01 (Edit)": 'menuItem-tutu-s-chicken-salad-tortilla-wrap',
};

// ─── Alt text per item ────────────────────────────────────────────────────────
const ALT_MAP = {
  'menuItem-guava-lemonade':                    'Guava lemonade at Aloha Salads',
  'menuItem-big-island-mamaki-mint-tea':        'Hibiscus Mamaki mint tea at Aloha Salads',
  'menuItem-aloha-caesar':                      'Aloha Caesar salad at Aloha Salads',
  'menuItem-aloha-mediterranean':               'Aloha Mediterranean salad at Aloha Salads',
  'menuItem-aloha-passion':                     'Aloha Passion salad at Aloha Salads',
  'menuItem-kamuela-cobb':                      'Kamuela Cobb salad at Aloha Salads',
  'menuItem-mandarin-ginger':                   'Mandarin Ginger salad at Aloha Salads',
  'menuItem-ono-island-ahi':                    'Ono Island Ahi salad at Aloha Salads',
  'menuItem-the-paniolo':                       'The Paniolo salad at Aloha Salads',
  'menuItem-tomato-bisque':                     'Tomato bisque soup at Aloha Salads',
  'menuItem-aloha-gyro-wrap':                   'Aloha Gyro Wrap at Aloha Salads',
  'menuItem-chicken-pesto-sandwich':            'Chicken Pesto Sandwich at Aloha Salads',
  'menuItem-club-sub':                          'Club Sub sandwich at Aloha Salads',
  'menuItem-curried-chicken-wrap':              'Curried Chicken Wrap at Aloha Salads',
  'menuItem-fresh-island-ahi-wrap':             'Fresh Island Ahi Wrap at Aloha Salads',
  'menuItem-grilled-cheese-soup-combo':         'Grilled Cheese Soup Combo at Aloha Salads',
  'menuItem-grilled-steak-wrap':                'Grilled Steak Wrap at Aloha Salads',
  'menuItem-hummus-pita-wrap':                  'Hummus Pita Wrap at Aloha Salads',
  'menuItem-tutu-s-chicken-salad-tortilla-wrap': "Tutu's Chicken Salad Tortilla Wrap at Aloha Salads",
};

// ─── Find the actual file path for a stem ────────────────────────────────────
function findFile(stem) {
  const exts = ['.jpg', '.jpeg', '.png', '.webp'];
  const dirs = [
    'new-images/Menu Photos/Drinks',
    'new-images/Menu Photos/Salads',
    'new-images/Menu Photos/Soups',
    'new-images/Menu Photos/Wraps & Subs',
  ];
  for (const dir of dirs) {
    for (const ext of exts) {
      const candidate = join(ROOT, dir, stem + ext);
      if (existsSync(candidate)) return candidate;
    }
  }
  return null;
}

// ─── Upload + patch ───────────────────────────────────────────────────────────
async function uploadAndPatch(stem, docId) {
  const filePath = findFile(stem);
  if (!filePath) {
    console.warn(`  ⚠  File not found for "${stem}" — skipped`);
    return false;
  }

  console.log(`  ↑  Uploading ${basename(filePath)} …`);
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: basename(filePath),
    contentType: 'image/jpeg',
  });

  const alt = ALT_MAP[docId] || stem;
  await client
    .patch(docId)
    .set({
      photo: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt,
      },
    })
    .commit();

  console.log(`  ✓  Patched ${docId} → ${asset._id}`);
  return true;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌺  Aloha Salads — Menu photo upload\n');

  let ok = 0;
  let fail = 0;

  for (const [stem, docId] of Object.entries(PHOTO_MAP)) {
    try {
      const success = await uploadAndPatch(stem, docId);
      if (success) ok++; else fail++;
    } catch (err) {
      console.error(`  ✗  Error for "${stem}":`, err.message);
      fail++;
    }
  }

  console.log(`\n✅  Done — ${ok} uploaded, ${fail} skipped/failed`);
}

main().catch((err) => { console.error(err); process.exit(1); });
