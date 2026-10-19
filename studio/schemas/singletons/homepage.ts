import { ImageIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const textField = (
  group: string,
  name: string,
  title: string,
  options: { description?: string; multiline?: number; required?: boolean } = {}
) =>
  defineField({
    name,
    title,
    group,
    description: options.description,
    type: options.multiline ? 'text' : 'string',
    ...(options.multiline ? { rows: options.multiline } : {}),
    validation: options.required ? (r) => r.required() : undefined,
  });

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    group: 'images',
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
    group: 'images',
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
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'brandBar', title: 'Brand bar' },
    { name: 'menu', title: 'Menu' },
    { name: 'localSourcing', title: 'Local sourcing' },
    { name: 'reviews', title: 'Reviews' },
    { name: 'locations', title: 'Locations' },
    { name: 'images', title: 'Images & video' },
  ],
  fields: [
    // ── SEO ──
    textField('seo', 'metaTitle', 'Page title', {
      description: 'Shown in the browser tab and search results. Aim for under 60 characters.',
    }),
    textField('seo', 'metaDescription', 'Meta description', {
      description: 'Search result snippet. Aim for 140–160 characters.',
      multiline: 3,
    }),

    // ── Hero ──
    textField('hero', 'heroTagline', 'Tagline', { description: 'Small line above the headline.' }),
    textField('hero', 'heroTitle', 'Headline', {
      description: 'Press Enter where you want a line break.',
      multiline: 2,
    }),
    textField('hero', 'heroSubtitle', 'Subtitle', { multiline: 4 }),
    textField('hero', 'heroPrimaryCtaLabel', 'Primary button label', {
      description: 'Links to online ordering.',
    }),
    textField('hero', 'heroSecondaryCtaLabel', 'Secondary button label', {
      description: 'Links to catering.',
    }),

    // ── Brand bar ──
    defineField({
      name: 'brandBarItems',
      title: 'Scrolling words',
      group: 'brandBar',
      description:
        'The words in the scrolling strip under the hero. The icons "Healthy", "Fresh" and "Local" have their own; other words use a default icon.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'brandBarItem',
          fields: [
            defineField({ name: 'text', title: 'Word', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'tilt',
              title: 'Tilted',
              type: 'boolean',
              description: 'Slight counter-clockwise tilt.',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'tilt' },
            prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? 'Tilted' : '' }),
          },
        }),
      ],
      validation: (r) => r.min(1),
    }),

    // ── Menu ──
    textField('menu', 'menuEyebrow', 'Eyebrow'),
    textField('menu', 'menuTitle', 'Heading'),
    textField('menu', 'menuSubtitle', 'Intro text', {
      description: 'Category names and descriptions are edited under Menu → Categories.',
      multiline: 3,
    }),
    textField('menu', 'menuCtaLabel', 'Button label', { description: 'Links to the full menu.' }),

    // ── Local sourcing ──
    textField('localSourcing', 'localSourcingEyebrow', 'Eyebrow'),
    textField('localSourcing', 'localSourcingTitle', 'Heading'),
    textField('localSourcing', 'localSourcingBody', 'Body text', { multiline: 5 }),
    textField('localSourcing', 'localSourcingCtaLabel', 'Button label', { description: 'Links to Ingredients.' }),

    // ── Reviews ──
    textField('reviews', 'reviewsEyebrow', 'Eyebrow', {
      description: 'The review cards themselves are edited under Testimonials.',
    }),
    textField('reviews', 'reviewsTitle', 'Heading'),

    // ── Locations ──
    textField('locations', 'locationsEyebrow', 'Eyebrow'),
    textField('locations', 'locationsTitle', 'Heading'),
    textField('locations', 'locationsSubtitle', 'Intro text', { multiline: 3 }),
    textField('locations', 'locationsCtaLabel', 'Button label', { description: 'Links to All Locations.' }),
    textField('locations', 'locationsViewLabel', 'Store card button label', {
      description: 'Button on each store card. {name} is replaced with the store name, e.g. "View Kailua".',
    }),

    // ── Images & video ──
    defineField({
      name: 'heroMedia',
      title: 'Hero background',
      description:
        'Choose what sits behind the homepage headline. If "Looping video" is selected but the video or poster is missing, the site falls back to the hero image automatically.',
      group: 'images',
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
      group: 'images',
      description:
        'The first frame of the video, as a WebP/JPEG at 1440×760. This is what shows instantly while the page loads (and for visitors who skip the video), so keep it under about 60 KB.',
      type: 'image',
      options: { accept: 'image/webp,image/jpeg,image/png' },
      hidden: ({ document }) => document?.heroMedia !== 'video',
    }),
    imageField('localSourcingImage', 'Our Local Sourcing image', 'Not shown on the site yet — a grey placeholder stays here until the image pass.'),
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
