import { defineField, defineType } from 'sanity';
import { BookIcon } from '@sanity/icons';

/**
 * One card on the /press page. Every field the card shows lives here, so the
 * content team can add, edit, reorder, or remove cards without a deploy.
 */
export const pressItem = defineType({
  name: 'pressItem',
  title: 'Press card',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'outlet',
      title: 'Outlet',
      type: 'string',
      description: 'Publication or broadcaster shown above the headline, e.g. "KHON2" or "HONOLULU Magazine".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'displayDate',
      title: 'Date',
      type: 'string',
      description: 'Shown exactly as typed, e.g. "Jul 30, 2026" or "2024". Leave empty to hide.',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Pull quote',
      type: 'text',
      rows: 4,
      description:
        'Short quote or summary. Include the quotation marks yourself if you want them. Leave empty to hide.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Button label',
      type: 'string',
      description: 'e.g. "Watch Feature", "Read Coverage", "View Event".',
      initialValue: 'Read Feature',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      description: 'Where the whole card links to. Opens in a new tab.',
      validation: (r) => r.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown at the top of the card (16:10). If empty, a grey placeholder is shown.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (r) => r.required().warning('Describe the photo for accessibility and SEO.'),
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first. Cards with the same number show newest first.',
      initialValue: 0,
      validation: (r) => r.required().integer(),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: { title: 'headline', outlet: 'outlet', date: 'displayDate', media: 'photo' },
    prepare({ title, outlet, date, media }) {
      return {
        title: title || 'Untitled press card',
        subtitle: [outlet, date].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
