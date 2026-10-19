import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const TOKENS_HELP =
  'Tokens are replaced with the live business details: {business}  {host}  {email}  {phone}  {street}  {cityLine}.';

/**
 * A legal page (Accessibility, Privacy Policy, Terms): headline, text under it, then numbered/titled sections
 * written as rich text. One document per page with a fixed ID (`singleton-legal-<slug>`); a new legal page also
 * needs a route in the site code.
 */
export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'content', title: 'Content', default: true },
    { name: 'cta', title: 'Closing banner' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'URL',
      group: 'seo',
      description: 'Fixed — set by the site code.',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'metaTitle',
      title: 'Page title',
      group: 'seo',
      description: `Shown in the browser tab and search results. ${TOKENS_HELP}`,
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      group: 'seo',
      description: `Search result snippet. Aim for 140–160 characters. ${TOKENS_HELP}`,
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
      name: 'subtitle',
      title: 'Text under the headline',
      group: 'content',
      description: `For example "Last updated: September 8, 2026", or a short introduction. ${TOKENS_HELP} Leave empty to hide.`,
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      group: 'content',
      description: 'Shown in this order. Drag to reorder, or remove a section to hide it.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'legalSection',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'For example "1. Acceptance of these terms".',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'body',
              title: 'Text',
              type: 'array',
              description: `Press Enter for a new paragraph, Shift+Enter for a line break. Use the list button for bullets, and the link button to link text. ${TOKENS_HELP}`,
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [{ title: 'Paragraph', value: 'normal' }],
                  lists: [{ title: 'Bullet list', value: 'bullet' }],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          defineField({
                            name: 'href',
                            title: 'Link',
                            type: 'string',
                            description: 'A page on this site (/privacy-policy) or a full web address.',
                            validation: (r) => r.required(),
                          }),
                        ],
                      },
                    ],
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'heading', blocks: 'body' },
            prepare: ({ title, blocks }) => {
              const first = (blocks ?? []).find((block: { _type?: string }) => block._type === 'block') as
                { children?: Array<{ text?: string }> } | undefined;
              return { title: title || 'Section', subtitle: first?.children?.map((c) => c.text).join('') ?? '' };
            },
          },
        }),
      ],
    }),
    defineField({ name: 'ctaTitle', title: 'Headline', group: 'cta', type: 'string' }),
    defineField({
      name: 'ctaSubtitle',
      title: 'Text',
      group: 'cta',
      description: TOKENS_HELP,
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'slug' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `/${subtitle}` : '' }),
  },
});
