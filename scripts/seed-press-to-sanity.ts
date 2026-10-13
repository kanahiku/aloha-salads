/**
 * Seed the /press cards (KHON2 coverage) into Sanity.
 *
 * Dry-run by default; pass --commit to write. Uses createIfNotExists, so
 * re-running never overwrites edits made in Studio. Photos are intentionally
 * left empty — upload them in Studio → Press cards.
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

const KHON = 'https://www.khon2.com';

/** Fields the Studio shows as required; `order` keeps newest first, undated last. */
const docs = [
  {
    _id: 'pressItem-khon2-aloha-salads-celebrates-20-years',
    outlet: 'KHON2',
    displayDate: 'Jul 30, 2026',
    headline: 'Aloha Salads Celebrates 20 Years',
    quote:
      '“What started as a vision from founders Sara and Chris has grown into a longtime local business built around fresh food, community and family.”',
    ctaText: 'Watch Feature',
    url: `${KHON}/living-808/aloha-salads-celebrates-20-years/`,
  },
  {
    _id: 'pressItem-khon2-avocado-toast-kona-cold-brew',
    outlet: 'KHON2',
    displayDate: 'Apr 8, 2026',
    headline: 'Aloha Salads introduces avocado toast and Kona cold brew',
    ctaText: 'Read Coverage',
    url: `${KHON}/living-808/aloha-salads-new-menu-kapolei/`,
  },
  {
    _id: 'pressItem-khon2-fresh-flavors-kapolei-commons',
    outlet: 'KHON2',
    displayDate: 'Sep 16, 2025',
    headline: 'Aloha Salads Unveils Fresh Flavors at Kapolei Commons',
    ctaText: 'Read Coverage',
    url: `${KHON}/living-808/aloha-salads-unveils-fresh-flavors-at-kapolei-commons/`,
  },
  {
    _id: 'pressItem-khon2-whats-new-pearlridge-center',
    outlet: 'KHON2',
    displayDate: 'Jun 19, 2025',
    headline: 'What’s New at Aloha Salads Pearlridge Center?',
    ctaText: 'Read Coverage',
    url: `${KHON}/living-808/whats-new-at-aloha-salads-pearlridge-center/`,
  },
  {
    _id: 'pressItem-khon2-healthy-eating-made-easy',
    outlet: 'KHON2',
    displayDate: 'Jan 3, 2025',
    headline: 'Healthy Eating Made Easy with Aloha Salads',
    ctaText: 'Read Coverage',
    url: `${KHON}/living-808/healthy-eating-made-easy-with-aloha-salads/`,
  },
  {
    _id: 'pressItem-khon2-returns-to-mililani',
    outlet: 'KHON2',
    displayDate: 'Sep 4, 2024',
    headline: 'Aloha Salads returns to Mililani with new location at Town Center of Mililani',
    ctaText: 'Read Coverage',
    url: `${KHON}/living-808/aloha-salads-returns-to-mililani-with-new-location-at-mililani-town-center/`,
  },
  {
    _id: 'pressItem-khon2-ahi-season-kicks-off',
    outlet: 'KHON2',
    displayDate: 'Jun 28, 2024',
    headline: 'Ahi Season Kicks off at Aloha Salads for Summer',
    ctaText: 'Read Coverage',
    url: `${KHON}/living-808/ahi-season-kicks-off-at-aloha-salads-for-summer/`,
  },
  {
    _id: 'pressItem-khon2-hawaiis-kitchen-aloha-salads',
    outlet: 'KHON2',
    headline: 'Hawaii’s Kitchen: Aloha Salads',
    ctaText: 'Watch Feature',
    url: `${KHON}/video/hawaiis-kitchen-aloha-salads/8417617/`,
  },
  {
    _id: 'pressItem-khon2-hawaiis-kitchen-kapolei-commons',
    outlet: 'KHON2',
    headline: 'Hawaii’s Kitchen: Kapolei Commons, Aloha Salads',
    ctaText: 'Watch Feature',
    url: `${KHON}/video/hawaiis-kitchen-kapolei-commons-aloha-salads/8539751/`,
  },
].map((d, order) => ({ _type: 'pressItem', order, ...d }));

async function main() {
  console.log(commit ? 'Seeding Sanity press cards with --commit.' : 'Running Sanity press seed dry-run.');
  console.log(`Sanity: ${projectId}/${dataset}`);
  for (const d of docs) console.log(`  ${d.order}. ${d.outlet} — ${d.displayDate ?? 'undated'} — ${d.headline}`);

  if (!commit) {
    console.log('\nDry-run only. Re-run with --commit to seed Sanity.');
    return;
  }
  if (!token) throw new Error('SANITY_WRITE_TOKEN (or SANITY_API_TOKEN) is required with --commit.');

  const tx = client.transaction();
  for (const d of docs) tx.createIfNotExists(d);
  await tx.commit();
  console.log('Done. Cards created as published (no draft); existing cards untouched. Add photos in Studio → Press cards.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
