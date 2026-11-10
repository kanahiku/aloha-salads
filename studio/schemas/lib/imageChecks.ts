import { defineField, type CustomValidator, type ValidationContext } from 'sanity';

/**
 * Shared image rules (Astro-Sanity site standards).
 *
 * - Alt text is REQUIRED whenever an image is set (blocks publish).
 * - Heavy files get a WARNING (never blocks publish): the site serves resized WebP/AVIF through the Sanity CDN,
 *   but small uploads keep the CDN and Studio fast. Target: under 100 KB, hero under 250 KB, max ~2000 px wide.
 */

const WARN_BYTES = 250 * 1024;
const WARN_WIDTH = 2400;

type ImageValue = { asset?: { _ref?: string } } | undefined;

export const altField = (title = 'Alt text') =>
  defineField({
    name: 'alt',
    title,
    type: 'string',
    description: 'Describe what the image shows, in one short sentence. Used by screen readers and image search.',
    validation: (rule) =>
      rule.custom((value, context: ValidationContext) => {
        const parent = context.parent as { asset?: unknown } | undefined;
        if (!parent?.asset) return true; // no image yet, nothing to describe
        return typeof value === 'string' && value.trim() ? true : 'Alt text is required for every image.';
      }),
  });

const weightCheck: CustomValidator<ImageValue> = async (value, context) => {
  const ref = value?.asset?._ref;
  if (!ref) return true;
  try {
    const asset = await context
      .getClient({ apiVersion: '2024-01-01' })
      .fetch<{ size?: number; w?: number } | null>('*[_id==$id][0]{size, "w": metadata.dimensions.width}', {
        id: ref,
      });
    if (!asset) return true;
    if ((asset.size ?? 0) > WARN_BYTES) {
      return {
        message: `This image is ${Math.round((asset.size ?? 0) / 1024)} KB. Compress it before upload (aim for under 100 KB, hero under 250 KB).`,
        level: 'warning',
      };
    }
    if ((asset.w ?? 0) > WARN_WIDTH) {
      return {
        message: `This image is ${asset.w}px wide. Resize to about 2000px wide before upload.`,
        level: 'warning',
      };
    }
  } catch {
    // never block editing because the check failed
  }
  return true;
};

/** Add as `validation: imageWeightWarning` on an image field. */
export const imageWeightWarning = (rule: { custom: (fn: CustomValidator<any>) => any }) => rule.custom(weightCheck);
