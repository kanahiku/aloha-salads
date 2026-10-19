import { defineField, defineType } from 'sanity';

export const siteNavigation = defineType({
  name: 'siteNavigation',
  title: 'Header & navigation',
  type: 'document',
  // Prevent creating multiple navigation documents
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'links',
      title: 'Menu links',
      description:
        'The links in the header, in order. Each can have sub-links for a dropdown. The same links appear in the mobile menu.',
      type: 'array',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'phone',
      title: 'Header phone',
      description: 'Optional. A tap-to-call button in the header. Leave empty to hide it.',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Display number', type: 'string' }),
        defineField({ name: 'href', title: 'tel: URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'actions',
      title: 'Header buttons',
      description: 'Buttons at the right of the header, for example "order online".',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Button Label', type: 'string' }),
            defineField({ name: 'href', title: 'URL', type: 'string' }),
            defineField({
              name: 'variant',
              title: 'Style',
              type: 'string',
              options: { list: ['primary', 'secondary', 'ghost-light', 'ghost-dark'] },
              initialValue: 'primary',
            }),
          ],
          preview: { select: { title: 'text' } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Header & navigation', subtitle: 'Menu links and header buttons' };
    },
  },
});
