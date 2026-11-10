import { sanityClient } from '../sanity/client';
import type { SanityImageFields } from '../sanity/image';
import { normalizeWebsiteCopy } from './sanity';
import type { ContentImage, FaqEntry } from './types';

export type FetchedImage = ContentImage & SanityImageFields;

export const clean = (value: string | null | undefined) => normalizeWebsiteCopy((value ?? '').trim());

/** Authored list → cleaned strings, dropping blanks. */
export const cleanList = (values: Array<string | null> | null | undefined) =>
  (values ?? []).map((value) => clean(value)).filter(Boolean);

export const cleanFaqs = (
  faqs: Array<{ question?: string | null; answer?: string | null }> | null | undefined
): FaqEntry[] =>
  (faqs ?? [])
    .filter((faq) => faq.question?.trim() && faq.answer?.trim())
    .map((faq) => ({ question: clean(faq.question), answer: clean(faq.answer) }));

export async function fetchOrNull<T>(label: string, query: string): Promise<T | null> {
  try {
    return (await sanityClient.fetch<T | null>(query)) ?? null;
  } catch (error) {
    console.warn(`[${label}] Sanity text fetch failed, using defaults:`, (error as Error).message);
    return null;
  }
}
