import { createClient } from '@sanity/client';

import { HOMEPAGE_DEFAULTS as d } from '../src/lib/content/homepageDefaults';

/**
 * Seeds the Homepage singleton with the approved copy. Only fills fields that are still empty,
 * so it is safe to re-run and never touches images/video or anything an editor has changed.
 *
 *   npm run seed:homepage            # dry run — prints what would be written
 *   npm run seed:homepage -- --commit
 */
const commit = process.argv.includes('--commit');
const projectId = process.env.SANITY_PROJECT_ID ?? 'sys9vj6r';
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const documentId = 'singleton-homepage';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-09-15',
  useCdn: false,
  ...(token ? { token } : {}),
});

const fields: Record<string, unknown> = {
  metaTitle: d.meta.title,
  metaDescription: d.meta.description,
  heroTagline: d.hero.tagline,
  heroTitle: d.hero.title,
  heroSubtitle: d.hero.subtitle,
  heroPrimaryCtaLabel: d.hero.primaryCtaLabel,
  heroSecondaryCtaLabel: d.hero.secondaryCtaLabel,
  brandBarItems: d.brandBar.map((item, i) => ({
    _type: 'brandBarItem',
    _key: `brand-bar-${i}`,
    text: item.text,
    tilt: Boolean(item.tilt),
  })),
  menuEyebrow: d.menu.eyebrow,
  menuTitle: d.menu.title,
  menuSubtitle: d.menu.subtitle,
  menuCtaLabel: d.menu.ctaLabel,
  localSourcingEyebrow: d.localSourcing.eyebrow,
  localSourcingTitle: d.localSourcing.title,
  localSourcingBody: d.localSourcing.body,
  localSourcingCtaLabel: d.localSourcing.ctaLabel,
  reviewsEyebrow: d.reviews.eyebrow,
  reviewsTitle: d.reviews.title,
  locationsEyebrow: d.locations.eyebrow,
  locationsTitle: d.locations.title,
  locationsSubtitle: d.locations.subtitle,
  locationsCtaLabel: d.locations.ctaLabel,
  locationsViewLabel: d.locations.viewLabel,
};

async function main() {
  const existing = await client.fetch<Record<string, unknown> | null>(`*[_id == $id][0]`, { id: documentId });
  const missing = Object.entries(fields).filter(([key]) => {
    const value = existing?.[key];
    return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
  });

  console.log(existing ? `Found ${documentId}.` : `${documentId} does not exist yet — it will be created.`);
  console.log(`${missing.length} of ${Object.keys(fields).length} fields to write:`);
  for (const [key] of missing) console.log(`  + ${key}`);

  if (missing.length === 0) return;
  if (!commit) {
    console.log('\nDry run. Re-run with --commit to write.');
    return;
  }
  if (!token) throw new Error('Set SANITY_WRITE_TOKEN (Editor) in .env to write.');

  await client.createIfNotExists({ _id: documentId, _type: 'homepageContent' });
  await client.patch(documentId).set(Object.fromEntries(missing)).commit();

  console.log('\nDone. Published document updated.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
