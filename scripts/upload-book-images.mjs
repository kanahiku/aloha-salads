/**
 * upload-book-images.mjs
 * Downloads cover images from robertpetersonmd.com and uploads them to
 * the Sanity asset store, then patches each book document with the image ref.
 *
 * Usage:
 *   node --env-file=.env scripts/upload-book-images.mjs
 *   node --env-file=.env scripts/upload-book-images.mjs --dry-run
 *   node --env-file=.env scripts/upload-book-images.mjs --slug=hair
 */
import { createClient } from '@sanity/client';

const DRY_RUN = process.argv.includes('--dry-run');
const SLUG_FILTER = (process.argv.find((a) => a.startsWith('--slug=')) ?? '').replace('--slug=', '') || null;

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

/** slug → image URL from the live robertpetersonmd.com site */
const IMAGE_URLS = {
  'healthy-wealthy-wise': 'https://robertpetersonmd.com/__l5e/assets-v1/0a1201a2-b420-43a8-803e-a5c10c4d01fb/healthy-wealthy-wise-cover.webp',
  'hair':                  'https://robertpetersonmd.com/__l5e/assets-v1/cf09fa37-7d5e-4744-9ad5-172717fd147f/guide-hair.png',
  'brain':                 'https://robertpetersonmd.com/__l5e/assets-v1/fe9ab0de-edf2-4b3f-897a-6cefea3df22c/guide-brain.png',
  'eyes':                  'https://robertpetersonmd.com/__l5e/assets-v1/9b9f936d-f0c5-4b56-9a8f-c2e481a45c76/guide-eyes.png',
  'ears':                  'https://robertpetersonmd.com/__l5e/assets-v1/6161e6eb-c041-4c95-86f3-54080d421b9e/guide-ears.png',
  'throat':                'https://robertpetersonmd.com/__l5e/assets-v1/55be62bb-c01b-423b-a824-137775e9c47b/guide-throat.png',
  'nose':                  'https://robertpetersonmd.com/__l5e/assets-v1/8101b1d7-a7d5-4f96-b3de-882e76e828bc/guide-nose.png',
  'teeth-mouth':           'https://robertpetersonmd.com/__l5e/assets-v1/1ca9d6bf-8add-4ed5-9ec1-a2b292c8d533/guide-teeth.png',
  'face-neck':             'https://robertpetersonmd.com/__l5e/assets-v1/0a52e4be-a04b-4189-af82-6b33d83fb1c2/guide-face.png',
  'lungs':                 'https://robertpetersonmd.com/__l5e/assets-v1/85c5ba0d-3c8e-4990-924b-0b32f88d4be6/guide-lungs.png',
  'heart':                 'https://robertpetersonmd.com/__l5e/assets-v1/f2a8d66d-f1b6-462d-9da5-5f0bbf678028/guide-heart.png',
  'liver-gallbladder-spleen': 'https://robertpetersonmd.com/__l5e/assets-v1/5313843f-abb6-458b-b65a-a4ff8cffc383/guide-liver.png',
  'kidney-urinary':        'https://robertpetersonmd.com/__l5e/assets-v1/c666bd5c-09d0-4c76-a645-f1953db5e95c/guide-kidney.png',
  'digestive-system':      'https://robertpetersonmd.com/__l5e/assets-v1/94cf2b6f-67f1-4274-a691-9a51587429fc/guide-digestive.png',
  'fat':                   'https://robertpetersonmd.com/__l5e/assets-v1/42676d39-e0fd-4758-8d80-13108f43ffbf/guide-fat.png',
  'breasts':               'https://robertpetersonmd.com/__l5e/assets-v1/419afe3a-62e4-4872-947f-1292bb186bfd/guide-breasts.png',
  'reproductive-system-female': 'https://robertpetersonmd.com/__l5e/assets-v1/477d32b7-34d4-4783-9c47-e7ce6d5d082b/guide-reproductive-female.png',
  'reproductive-system-male':   'https://robertpetersonmd.com/__l5e/assets-v1/e0314293-cb4e-4591-8799-3beb7f117954/guide-reproductive-male.png',
  'bones-joints':          'https://robertpetersonmd.com/__l5e/assets-v1/955c7b25-9575-4260-827e-14ccd6dc8c81/guide-bones-joints.png',
  'muscle-connective-tissue': 'https://robertpetersonmd.com/__l5e/assets-v1/bba85531-a1f2-44e1-be5a-70438799a4ed/guide-muscles.png',
  'skin-nails':            'https://robertpetersonmd.com/__l5e/assets-v1/a3a2e015-1981-4346-a303-2139b55cc8fa/guide-skin-nails.png',
  'hands-feet':            'https://robertpetersonmd.com/__l5e/assets-v1/b3117f1d-226f-4f10-b5a4-4913050a31e8/guide-hands-feet.png',
  'nerves-senses-reflexes': 'https://robertpetersonmd.com/__l5e/assets-v1/ca6242bc-8d80-4be3-a8b0-a73e59cd7d49/guide-nerves.png',
  'blood':                 'https://robertpetersonmd.com/__l5e/assets-v1/0f9e3112-4bf2-4ec6-aaaf-1b9430566bf0/guide-blood.png',
  'hormones-cellular-communication': 'https://robertpetersonmd.com/__l5e/assets-v1/57616ee6-1718-46f3-99ef-4b40a976f744/guide-hormones.png',
  'immune-system':         'https://robertpetersonmd.com/__l5e/assets-v1/081dcc70-164d-4800-bef5-6956e1e4fbef/guide-immune.png',
  'extracellular-matrix':  'https://robertpetersonmd.com/__l5e/assets-v1/226deb27-4d82-4d36-8874-1b0d94fe835e/guide-extracellular.png',
  'mitochondria-metabolism': 'https://robertpetersonmd.com/__l5e/assets-v1/544e966a-04a0-4746-8c73-61e354550231/guide-mitochondria.png',
  'drugs-pharmacokinetics': 'https://robertpetersonmd.com/__l5e/assets-v1/7e08febf-760f-47e3-b36c-07d3b4ece0c7/guide-drugs.png',
  'black-swan':            'https://robertpetersonmd.com/assets/book-blackswan-BM1NCOlS.jpg',
};

async function fetchAsBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; image-importer/1.0)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ct = res.headers.get('content-type') || 'image/png';
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, ct };
}

function extensionFromUrl(url) {
  const ext = url.split('?')[0].split('.').pop().toLowerCase();
  return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'].includes(ext) ? ext : 'png';
}

// Fetch books from Sanity
const sanityBooks = await client.fetch(
  `*[_type == "book" && defined(slug.current)]{_id, "slug": slug.current, title, image}`
);
const bySlug = Object.fromEntries(sanityBooks.map((b) => [b.slug, b]));

const targets = Object.entries(IMAGE_URLS).filter(([slug]) => {
  if (SLUG_FILTER && slug !== SLUG_FILTER) return false;
  const book = bySlug[slug];
  if (!book) {
    console.warn(`  [skip] no Sanity doc found for slug="${slug}"`);
    return false;
  }
  // Skip if image already uploaded (asset ref present)
  if (book.image?.asset?._ref) {
    console.log(`  [skip] ${slug} already has image`);
    return false;
  }
  return true;
});

console.log(`\nImages to upload: ${targets.length}  (dry-run=${DRY_RUN})\n`);

let uploaded = 0;
let failed = 0;

for (const [slug, url] of targets) {
  const book = bySlug[slug];
  process.stdout.write(`  ${slug.padEnd(36)} `);

  try {
    const { buf, ct } = await fetchAsBuffer(url);
    const ext = extensionFromUrl(url);
    const filename = `${slug}.${ext}`;

    if (DRY_RUN) {
      console.log(`→ [dry-run] would upload ${filename} (${buf.length} bytes)`);
      continue;
    }

    // Upload asset to Sanity
    const asset = await client.assets.upload('image', buf, {
      filename,
      contentType: ct,
    });

    // Patch book document with image reference + alt text
    await client
      .patch(book._id)
      .set({
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: `Rebellious Aging Guidebook: ${book.title} — book cover`,
        },
      })
      .commit();

    console.log(`→ uploaded (${(buf.length / 1024).toFixed(0)} KB)`);
    uploaded++;

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 400));
  } catch (err) {
    console.log(`→ FAILED: ${err.message}`);
    failed++;
  }
}

console.log(`\nDone — uploaded=${uploaded} failed=${failed} skipped=${targets.length - uploaded - failed}`);
