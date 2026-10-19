import { BookIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Press & Media page text. The cards themselves are separate "Press card" documents (listed next to this page
 * in the Studio sidebar). One document, fixed ID `singleton-press`.
 */
export const pressPage = defineType({
  name: 'pressPage',
  title: 'Press & Media page',
  type: 'document',
  icon: BookIcon,
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'content', title: 'Content', default: true },
  ],
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Page title',
      group: 'seo',
      description: 'Shown in the browser tab and search results. Aim for under 60 characters.',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      group: 'seo',
      description: 'Search result snippet. Aim for 140–160 characters.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heading',
      title: 'Headline',
      group: 'content',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'lede',
      title: 'Intro text',
      group: 'content',
      description: 'Shown under the headline. Leave empty to hide.',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: 'Press & Media page' }) },
});
