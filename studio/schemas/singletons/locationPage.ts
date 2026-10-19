import { PinIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'store', title: 'Store details' },
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'about', title: 'About this store' },
  { name: 'faqs', title: 'FAQs' },
  { name: 'cta', title: 'Closing banner' },
];

const textField = (
  group: string,
  name: string,
  title: string,
  options: { description?: string; rows?: number; required?: boolean } = {}
) =>
  defineField({
    name,
    title,
    group,
    description: options.description,
    type: options.rows ? 'text' : 'string',
    ...(options.rows ? { rows: options.rows } : {}),
    ...(options.required ? { validation: (r) => r.required() } : {}),
  });

const urlField = (group: string, name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    group,
    description,
    type: 'url',
    validation: (r) => r.uri({ scheme: ['http', 'https'] }),
  });

/**
 * One document per store. The same details feed the store page, the locations list, the homepage
 * cards and Order Online, so a change here updates all of them. The document ID is fixed
 * (`singleton-location-<slug>`); a new store also needs a route in the site code.
 */
export const locationPage = defineType({
  name: 'locationPage',
  title: 'Store',
  type: 'document',
  icon: PinIcon,
  groups: GROUPS,
  fields: [
    // ── Store details ──
    defineField({
      name: 'slug',
      title: 'URL',
      group: 'store',
      description: 'Fixed — set by the site code (/locations/<this>).',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      group: 'store',
      description: 'Position in the store lists (1 = first). The homepage shows the first four.',
      type: 'number',
      validation: (r) => r.required().integer().min(1),
    }),
    textField('store', 'name', 'Store name', { description: 'For example "Kailua".', required: true }),
    textField('store', 'shopName', 'Shopping center', { description: 'For example "Kailua Shopping Center".' }),
    textField('store', 'addressLine1', 'Address line 1', { required: true }),
    textField('store', 'addressLine2', 'Address line 2', { description: 'City, state and ZIP.', required: true }),
    textField('store', 'landmark', 'Landmark', { description: 'Optional, for example "Next to Starbucks".' }),
    textField('store', 'phoneDisplay', 'Phone', {
      description: 'As shown, for example (808) 262-2016. The tap-to-call link is made from it.',
      required: true,
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      group: 'store',
      description: 'One line per entry, for example "Monday - Saturday: 10:00 AM to 8:00 PM".',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (r) => r.min(1),
    }),
    textField('store', 'intro', 'Card blurb', {
      description: "Short text on this store's card in the store list.",
      rows: 3,
    }),
    urlField('store', 'orderPickupHref', 'Pickup ordering link'),
    urlField('store', 'orderDeliveryHref', 'Delivery ordering link'),
    urlField(
      'store',
      'mapsEmbedSrc',
      'Google Maps embed link',
      'Google Maps → Share → Embed a map → copy the src="…" address. Leave empty to search by the address.'
    ),

    // ── SEO ──
    textField('seo', 'metaTitle', 'Page title', {
      description: 'Shown in the browser tab and search results. Aim for under 60 characters.',
    }),
    textField('seo', 'metaDescription', 'Meta description', {
      description: 'Search result snippet. Aim for 140–160 characters.',
      rows: 3,
    }),

    // ── Hero ──
    textField('hero', 'heroTitle', 'Headline', { description: 'Press Enter for a line break.', rows: 2 }),
    textField('hero', 'heroContent', 'Intro text', { rows: 4 }),
    textField('hero', 'heroPrimaryCtaLabel', 'Main button label (this store only)', {
      description: 'Optional. Leave empty to use the shared label from the Locations page.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      group: 'hero',
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
    }),

    // ── About ──
    textField('about', 'aboutHeading', 'Heading'),
    defineField({
      name: 'aboutParagraphs',
      title: 'Text',
      group: 'about',
      description: 'One entry per paragraph.',
      type: 'array',
      of: [defineArrayMember({ type: 'text', rows: 5 })],
    }),

    // ── FAQs ──
    defineField({
      name: 'faqs',
      title: 'Questions',
      group: 'faqs',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),

    // ── CTA ──
    textField('cta', 'ctaTitle', 'Heading'),
    textField('cta', 'ctaSubtitle', 'Text', { rows: 3 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'shopName', media: 'heroImage' },
  },
});
