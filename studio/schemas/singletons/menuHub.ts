import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'menu', title: 'Full menu' },
  { name: 'sourcing', title: 'Quality ingredients' },
  { name: 'cta', title: 'Ready to order' },
  { name: 'faqs', title: 'FAQs' },
  { name: 'cards', title: 'Category cards' },
  { name: 'shared', title: 'Shared with menu pages' },
];

const textField = (group: string, name: string, title: string, options: { description?: string; rows?: number } = {}) =>
  defineField({
    name,
    title,
    group,
    description: options.description,
    type: options.rows ? 'text' : 'string',
    ...(options.rows ? { rows: options.rows } : {}),
  });

const imageField = (group: string, name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    group,
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
 * Menu landing page (/menu). The dishes and categories in the full menu come from Menu → Categories / Items.
 * The ten category pages are separate documents (Menu → each page).
 */
export const menuHub = defineType({
  name: 'menuHub',
  title: 'Menu page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: GROUPS,
  fields: [
    textField('seo', 'metaTitle', 'Page title', {
      description: 'Shown in the browser tab and search results. Aim for under 60 characters.',
    }),
    textField('seo', 'metaDescription', 'Meta description', {
      description: 'Search result snippet. Aim for 140–160 characters.',
      rows: 3,
    }),

    textField('hero', 'heroTitle', 'Headline', { description: 'Press Enter for a line break.', rows: 2 }),
    textField('hero', 'heroContent', 'Intro text', { rows: 4 }),
    imageField('hero', 'heroImage', 'Hero image'),

    textField('menu', 'fullMenuTitle', 'Heading'),
    textField('menu', 'fullMenuSubtitle', 'Text', {
      description: 'The categories and dishes listed below come from Menu → Categories and Items.',
      rows: 2,
    }),

    textField('sourcing', 'sourcingTitle', 'Heading'),
    textField('sourcing', 'sourcingSubtitle', 'Text', { rows: 4 }),
    textField('sourcing', 'sourcingCtaLabel', 'Button label', { description: 'Links to the Ingredients page.' }),
    imageField('sourcing', 'sourcingImage', 'Photo', 'Not shown on the site yet — a grey placeholder stays here until the image pass.'),

    textField('cta', 'ctaSubtitle', 'Text', {
      description: 'The heading is shared — see "Shared with menu pages".',
      rows: 3,
    }),

    defineField({
      name: 'faqs',
      title: 'Questions',
      group: 'faqs',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),

    defineField({
      name: 'categoryCards',
      title: 'Category cards',
      group: 'cards',
      description:
        "The cards that link to each menu category — on the homepage and at the bottom of every menu page. Edit the name and the one-line description. The order, links and photos are fixed. If you clear a description, the category's own description (Menu → Categories) is used.",
      type: 'array',
      options: { sortable: false },
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuCardCopy',
          fields: [
            defineField({
              name: 'slug',
              title: 'Category',
              type: 'string',
              readOnly: true,
              description: 'Fixed — set by the site code.',
            }),
            defineField({ name: 'label', title: 'Name on the card', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'description' },
          },
        }),
      ],
    }),

    textField('shared', 'sharedOrderLabel', 'Order button label', {
      description: 'Used in the hero and closing banner of this page and every menu page.',
    }),
    textField('shared', 'sharedLocationLabel', '"Find a location" button label'),
    textField('shared', 'sharedCateringLabel', '"Order catering" button label'),
    textField('shared', 'sharedReadyTitle', '"Ready to order" heading'),
    textField('shared', 'sharedExploreTitle', '"Explore other categories" heading'),
    textField('shared', 'sharedFaqTitle', 'FAQ section heading'),
  ],
  preview: {
    select: { media: 'heroImage' },
    prepare({ media }) {
      return { title: 'Menu page', subtitle: 'Menu landing page', media };
    },
  },
});
