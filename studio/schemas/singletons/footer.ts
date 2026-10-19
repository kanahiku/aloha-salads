import { defineField, defineType } from 'sanity';

export const siteFooter = defineType({
  name: 'siteFooter',
  title: 'Footer',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'columns',
      title: 'Link columns',
      description: 'Each column has a heading and a list of links.',
      type: 'array',
      of: [{ type: 'footerColumn' }],
    }),
    defineField({
      name: 'secondaryLinks',
      title: 'Legal links',
      description: 'Privacy Policy, Terms and Accessibility always appear, even if removed here.',
      type: 'array',
      of: [{ type: 'footerLink' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social media links',
      description: 'Shown in the footer and in the header.',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'footNote',
      title: 'Copyright line',
      type: 'string',
      description: 'Use {year} for the current year, for example "© {year} Aloha Salads. All rights reserved."',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer', subtitle: 'Link columns, social and legal links' };
    },
  },
});
