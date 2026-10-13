import { createClient } from '@sanity/client';
import { createReadStream, promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Uploads the compressed homepage hero loop to Sanity and switches the hero to it.
 *
 *   npm run import:homepage-video -- --dir ~/Downloads/aloha-hero-video            (dry run)
 *   npm run import:homepage-video -- --dir ~/Downloads/aloha-hero-video --commit
 *
 * Expects three files in --dir (default ./site-videos/hero, git-ignored; produce them with
 * scripts/encode-hero-video.sh):
 *   hero.mp4          desktop / tablet loop   (max 1.5 MB)
 *   hero-mobile.mp4   optional phone loop     (max 0.6 MB)
 *   hero-poster.webp  first frame of the loop (max 120 KB)
 *
 * Sanity serves files exactly as uploaded, so the size limits here mirror the Studio validation:
 * never upload the original 80 MB master.
 *
 * Patches the published `singleton-homepage` document: heroVideo, heroVideoMobile,
 * heroVideoPoster and heroMedia = 'video' (pass --keep-media to leave heroMedia untouched).
 * To go back to the photo: set "Hero background" to Photo in the Studio — or run with --image.
 */

type Slot = {
  field: 'heroVideo' | 'heroVideoMobile' | 'heroVideoPoster';
  file: string;
  kind: 'file' | 'image';
  contentType: string;
  maxBytes: number;
  required: boolean;
};

const args = process.argv.slice(2);
const commit = args.includes('--commit');
const keepMedia = args.includes('--keep-media');
const backToImage = args.includes('--image');
const dirArgIndex = args.indexOf('--dir');
const dir = path.resolve(
  dirArgIndex >= 0 && args[dirArgIndex + 1]
    ? args[dirArgIndex + 1].replace(/^~(?=$|\/)/, process.env.HOME ?? '~')
    : fileURLToPath(new URL('../site-videos/hero', import.meta.url))
);

const projectId = process.env.SANITY_PROJECT_ID ?? 'sys9vj6r';
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const homepageDocumentId = 'singleton-homepage';

const slots: Slot[] = [
  {
    field: 'heroVideo',
    file: 'hero.mp4',
    kind: 'file',
    contentType: 'video/mp4',
    maxBytes: 1.5 * 1024 * 1024,
    required: true,
  },
  {
    field: 'heroVideoMobile',
    file: 'hero-mobile.mp4',
    kind: 'file',
    contentType: 'video/mp4',
    maxBytes: 0.6 * 1024 * 1024,
    required: false,
  },
  {
    field: 'heroVideoPoster',
    file: 'hero-poster.webp',
    kind: 'image',
    contentType: 'image/webp',
    maxBytes: 120 * 1024,
    required: true,
  },
];

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-09-15',
  useCdn: false,
  ...(token ? { token } : {}),
});

const kb = (bytes: number) => `${(bytes / 1024).toFixed(0)} KB`;

async function main() {
  if (backToImage) {
    console.log(
      commit ? 'Switching hero back to the photo (--commit).' : 'Dry run: would switch hero back to the photo.'
    );
    if (!commit) return;
    if (!token) throw new Error('SANITY_WRITE_TOKEN or SANITY_API_TOKEN is required with --commit.');
    await client
      .transaction()
      .createIfNotExists({ _id: homepageDocumentId, _type: 'homepageContent' })
      .patch(homepageDocumentId, (patch) => patch.set({ heroMedia: 'image' }))
      .commit();
    console.log('Done. Hero is now the photo. Video fields were left in place.');
    return;
  }

  console.log(commit ? 'Importing homepage hero video with --commit.' : 'Running homepage hero video dry-run.');
  console.log(`Sanity: ${projectId}/${dataset}`);
  console.log(`Source: ${dir}\n`);

  const ready: Array<Slot & { filePath: string; size: number }> = [];
  const problems: string[] = [];

  for (const slot of slots) {
    const filePath = path.join(dir, slot.file);
    try {
      const { size } = await fs.stat(filePath);
      if (size > slot.maxBytes) {
        problems.push(`${slot.file} is ${kb(size)} — over the ${kb(slot.maxBytes)} limit. Re-encode it smaller.`);
        continue;
      }
      ready.push({ ...slot, filePath, size });
      console.log(`Ready:   ${slot.field.padEnd(16)} <- ${slot.file} (${kb(size)})`);
    } catch {
      if (slot.required) problems.push(`${slot.file} is missing (required).`);
      else console.log(`Skipped: ${slot.field.padEnd(16)} (${slot.file} not found, optional)`);
    }
  }

  if (problems.length) {
    console.log('');
    problems.forEach((problem) => console.log(`- ${problem}`));
    throw new Error('Homepage hero video import has problems (see above).');
  }

  if (!commit) {
    console.log('\nDry-run only. Re-run with --commit to upload and patch Sanity.');
    return;
  }

  if (!token) throw new Error('SANITY_WRITE_TOKEN or SANITY_API_TOKEN is required when running with --commit.');

  const patchSet: Record<string, unknown> = {};

  for (const slot of ready) {
    const asset = await client.assets.upload(slot.kind, createReadStream(slot.filePath), {
      filename: slot.file,
      contentType: slot.contentType,
    });
    console.log(`Uploaded ${slot.file} -> ${asset._id}`);
    patchSet[slot.field] = { _type: slot.kind, asset: { _type: 'reference', _ref: asset._id } };
  }

  if (!keepMedia) patchSet.heroMedia = 'video';

  await client
    .transaction()
    .createIfNotExists({ _id: homepageDocumentId, _type: 'homepageContent' })
    .patch(homepageDocumentId, (patch) => patch.set(patchSet))
    .commit();

  console.log(`\nDone. Patched ${Object.keys(patchSet).join(', ')} on ${homepageDocumentId}.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
