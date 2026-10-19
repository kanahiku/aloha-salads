import { StarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Reviews page text. The reviews themselves are pulled live from Google and Yelp, so they are not edited here.
 * One document, fixed ID `singleton-reviews`.
 */
export const reviewsPage = defineType({
  name: 'reviewsPage',
  title: 'Reviews page',
  type: 'document',
  icon: StarIcon,
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Top of page', default: true },
    { name: 'reviews', title: 'Reviews' },
    { name: 'cta', title: 'Closing banner' },
  ],
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Page title',
      group: 'seo',
      description: 'Shown in the browser tab and search results. {business} is replaced with the business name.',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      group: 'seo',
      description: 'Search result snippet. Aim for 140–160 characters. {business} is replaced with the business name.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroTitle',
      title: 'Headline',
      group: 'hero',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Text under the headline',
      group: 'hero',
      description: '{business} is replaced with the business name. Leave empty to hide.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'listTitle',
      title: 'Reviews heading',
      group: 'reviews',
      description:
        'Heading above the review cards. The reviews themselves come live from Google and Yelp. Leave empty to hide.',
      type: 'string',
    }),
    defineField({ name: 'ctaTitle', title: 'Headline', group: 'cta', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'Text', group: 'cta', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Reviews page' }) },
});
