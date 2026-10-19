import { defineField, defineType } from 'sanity';

/** One FAQ accordion row. Reused by every page that has FAQs. */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'question', subtitle: 'answer' } },
});

/** Numbered card (01, 02…) — the number is automatic, based on position. */
export const occasionCard = defineType({
  name: 'occasionCard',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Text', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});
