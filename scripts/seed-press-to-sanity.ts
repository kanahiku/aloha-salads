/**
 * Seed the first /press card (KHON2) into Sanity so the page isn't empty.
 *
 * Dry-run by default; pass --commit to write. Uses createIfNotExists, so
 * re-running never overwrites edits made in Studio. The photo is intentionally
 * left empty — upload it in Studio → Press cards.
 *
 *   npm run seed:press            # dry-run
 *   npm run seed:press -- --commit
 */
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID ?? 'sys9vj6r';
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const commit = process.argv.includes('--commit');

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-09-15',
  useCdn: false,
  ...(token ? { token } : {}),
});

const doc = {
  _id: 'pressItem-khon2-aloha-salads-celebrates-20-years',
  _type: 'pressItem',
  outlet: 'KHON2',
  displayDate: 'Jul 30, 2026',
  headline: 'Aloha Salads Celebrates 20 Years',
  quote:
    '“What started as a vision from founders Sara and Chris has grown into a longtime local business built around fresh food, community and family.”',
  ctaText: 'Watch Feature',
  url: 'https://www.khon2.com/living-808/aloha-salads-celebrates-20-years/',
  order: 0,
};

async function main() {
  console.log(commit ? 'Seeding Sanity press card with --commit.' : 'Running Sanity press seed dry-run.');
  console.log(`Sanity: ${projectId}/${dataset}`);
  console.log(`Card: ${doc.outlet} — ${doc.headline}`);

  if (!commit) {
    console.log('\nDry-run only. Re-run with --commit to seed Sanity.');
    return;
  }
  if (!token) throw new Error('SANITY_WRITE_TOKEN (or SANITY_API_TOKEN) is required with --commit.');

  await client.createIfNotExists(doc);
  console.log('Done. Publish state: created as published (no draft). Add the photo in Studio → Press cards.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
