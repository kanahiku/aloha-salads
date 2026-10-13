import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        validation: (r) => r.required().warning('Describe the image for accessibility and SEO.'),
      }),
    ],
  });

/**
 * Sanity serves a video exactly as uploaded (no transcoding), so a raw 80 MB master would be
 * shipped to every visitor. Reject oversized files at publish time instead of trusting editors.
 */
const maxVideoSize =
  (maxMb: number) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (value: any, context: any) => {
    const ref: string | undefined = value?.asset?._ref;
    if (!ref) return true;
    const size: number | undefined = await context
      .getClient({ apiVersion: '2026-09-15' })
      .fetch('*[_id == $id][0].size', { id: ref });
    if (typeof size === 'number' && size > maxMb * 1024 * 1024) {
      return `This file is ${(size / 1024 / 1024).toFixed(1)} MB. Upload the compressed hero loop (max ${maxMb} MB) — a larger file slows down the homepage for every visitor.`;
    }
    return true;
  };

const videoFile = (name: string, title: string, description: string, maxMb: number) =>
  defineField({
    name,
    title,
    description,
    type: 'file',
    options: { accept: 'video/mp4' },
    hidden: ({ document }) => document?.heroMedia !== 'video',
    validation: (r) => r.custom(maxVideoSize(maxMb)),
  });

export const homepageContent = defineType({
  name: 'homepageContent',
  title: 'Homepage',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heroMedia',
      title: 'Hero background',
      description:
        'Choose what sits behind the homepage headline. If "Looping video" is selected but the video or poster is missing, the site falls back to the hero image automatically.',
      type: 'string',
      options: {
        list: [
          { title: 'Photo (hero image)', value: 'image' },
          { title: 'Looping video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    imageField(
      'heroImage',
      'Hero image',
      'Homepage hero background image. Used when "Hero background" is Photo, and as the fallback.'
    ),
    videoFile(
      'heroVideo',
      'Hero video — desktop / tablet',
      'Muted looping MP4 (H.264), 1440×760, about 8 seconds, under 1.5 MB. Must be the compressed loop, not the original footage.',
      1.5
    ),
    videoFile(
      'heroVideoMobile',
      'Hero video — phones',
      'Optional smaller MP4 for phones (about 480×600, under 0.6 MB). If empty, phones use the desktop video.',
      0.6
    ),
    defineField({
      name: 'heroVideoPoster',
      title: 'Hero video poster',
      description:
        'The first frame of the video, as a WebP/JPEG at 1440×760. This is what shows instantly while the page loads (and for visitors who skip the video), so keep it under about 60 KB.',
      type: 'image',
      options: { accept: 'image/webp,image/jpeg,image/png' },
      hidden: ({ document }) => document?.heroMedia !== 'video',
    }),
    imageField('localSourcingImage', 'Our Local Sourcing image', 'Image beside the local sourcing section.'),
    imageField('locationsImage', 'Visit a Store Near You image', 'Image beside the homepage locations section.'),
  ],
  preview: {
    select: { media: 'heroImage', heroMedia: 'heroMedia' },
    prepare({ media, heroMedia }) {
      return {
        title: 'Homepage',
        subtitle: heroMedia === 'video' ? 'Hero: looping video' : 'Hero: photo',
        media,
      };
    },
  },
});
