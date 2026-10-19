import { BellIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/** The thin banner above the header on every page. */
export const announcementBar = defineType({
  name: 'announcementBar',
  title: 'Announcement bar',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show the announcement bar',
      description: 'Turn off to hide the bar on every page.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'text',
      title: 'Text',
      description: 'The message, for example "Try our new". The link below follows it on the same line.',
      type: 'string',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link label',
      description: 'Optional underlined link at the end of the message, for example "Mamaki mint tea".',
      type: 'string',
    }),
    defineField({
      name: 'linkHref',
      title: 'Link address',
      description: 'A page on the site (for example /menu/drinks) or a full web address.',
      type: 'string',
    }),
  ],
  preview: {
    select: { text: 'text', link: 'linkLabel', enabled: 'enabled' },
    prepare({ text, link, enabled }) {
      return {
        title: [text, link].filter(Boolean).join(' ') || 'Announcement bar',
        subtitle: enabled === false ? 'Hidden' : 'Shown on every page',
      };
    },
  },
});
