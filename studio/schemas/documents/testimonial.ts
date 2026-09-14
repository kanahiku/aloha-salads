import { defineField, defineType } from 'sanity';
import { CommentIcon } from '@sanity/icons';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'number',
      validation: (r) => r.integer().min(1).max(120),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Optional. Shown between age and tenure, e.g. Kailua.',
    }),
    defineField({
      name: 'tenure',
      title: 'Tenure',
      type: 'string',
      description: 'How long they have been in, e.g. "Two years in" or "Eighteen months".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first in the carousel.',
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
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      age: 'age',
      tenure: 'tenure',
      quote: 'quote',
    },
    prepare({ title, age, tenure, quote }) {
      const attribution = [title, age, tenure].filter(Boolean).join(', ');
      return {
        title: attribution || 'Untitled testimonial',
        subtitle: quote,
      };
    },
  },
});
