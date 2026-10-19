import { ComposeIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'list', title: 'Dish list' },
  { name: 'build', title: 'How to build' },
  { name: 'sourcing', title: 'Quality ingredients' },
  { name: 'explore', title: 'Other categories' },
  { name: 'cta', title: 'Ready to order' },
  { name: 'faqs', title: 'FAQs' },
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

const imageField = (group: string | undefined, name: string, title: string, description?: string) =>
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

/** Only the Design Your Own Salad page has a "how to build" guide in place of a dish list. */
const isBuildPage = (document?: { slug?: string }) => document?.slug === 'design-your-own-salad';
const hideOnBuildPage = ({ document }: { document?: { slug?: string } }) => isBuildPage(document);
const showOnlyOnBuildPage = ({ document }: { document?: { slug?: string } }) => !isBuildPage(document);

/**
 * One document per menu category page (/menu/<slug>). The dishes themselves are Menu items placed in the
 * category (Menu → Items). Fixed document IDs (`singleton-menu-<slug>`) — they are listed in the sidebar.
 */
export const menuSubpage = defineType({
  name: 'menuSubpage',
  title: 'Menu category page',
  type: 'document',
  icon: ComposeIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'slug',
      title: 'URL',
      group: 'seo',
      description: 'Fixed — set by the site code (/menu/<this>).',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'title',
      title: 'Page name',
      group: 'seo',
      description: 'Internal name shown in the Studio only.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    textField('seo', 'metaTitle', 'Page title', {
      description: 'Shown in the browser tab and search results. Aim for under 60 characters.',
    }),
    textField('seo', 'metaDescription', 'Meta description', {
      description: 'Search result snippet. Aim for 140–160 characters.',
      rows: 3,
    }),

    textField('hero', 'heroTitle', 'Headline', { rows: 2 }),
    textField('hero', 'heroContent', 'Intro text', { rows: 4 }),
    imageField('hero', 'heroImage', 'Hero image'),

    defineField({
      ...textField('list', 'listTitle', 'Heading', {
        description: 'The dishes below come from Menu → Items placed in this category.',
      }),
      hidden: hideOnBuildPage,
    }),
    defineField({
      ...textField('list', 'listIntro', 'Intro text', { rows: 3 }),
      hidden: hideOnBuildPage,
    }),
    defineField({
      name: 'customItems',
      title: 'Custom list',
      group: 'list',
      description:
        "Leave empty to list the category's dishes. Fill this in only when the page should show its own cards instead (for example the Healthy Food approach cards).",
      type: 'array',
      hidden: hideOnBuildPage,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuListItem',
          title: 'Card',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'badge', title: 'Badge', type: 'string', description: 'For example "Coming soon".' }),
            defineField({ name: 'note', title: 'Note', type: 'string' }),
            imageField(undefined, 'image', 'Photo'),
          ],
          preview: { select: { title: 'title', subtitle: 'description', media: 'image' } },
        }),
      ],
    }),

    defineField({ ...textField('build', 'buildTitle', 'Heading'), hidden: showOnlyOnBuildPage }),
    defineField({ ...textField('build', 'buildSubtitle', 'Text', { rows: 2 }), hidden: showOnlyOnBuildPage }),
    defineField({
      name: 'buildSteps',
      title: 'Steps',
      group: 'build',
      description: 'Numbered in the order shown.',
      type: 'array',
      hidden: showOnlyOnBuildPage,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'buildStep',
          title: 'Step',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({ ...textField('build', 'buildNote', 'Note', { rows: 2 }), hidden: showOnlyOnBuildPage }),
    defineField({ ...textField('build', 'buildCtaLabel', 'Button label'), hidden: showOnlyOnBuildPage }),
    defineField({ ...imageField('build', 'buildImage', 'Photo'), hidden: showOnlyOnBuildPage }),

    textField('sourcing', 'sourcingTitle', 'Heading'),
    textField('sourcing', 'sourcingSubtitle', 'Text', { rows: 4 }),
    textField('sourcing', 'sourcingCtaLabel', 'Button label', { description: 'Links to the Ingredients page.' }),
    imageField('sourcing', 'sourcingImage', 'Photo', 'Not shown on the site yet — a grey placeholder stays here until the image pass.'),

    textField('explore', 'exploreSubtitle', 'Text', {
      description: 'The heading is shared — see Menu page → "Shared with menu pages".',
      rows: 2,
    }),

    textField('cta', 'ctaSubtitle', 'Text', {
      description: 'The heading is shared — see Menu page → "Shared with menu pages".',
      rows: 3,
    }),

    defineField({
      name: 'faqs',
      title: 'Questions',
      group: 'faqs',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug', media: 'heroImage' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Menu page', subtitle: subtitle ? `/menu/${subtitle}` : undefined, media };
    },
  },
});
