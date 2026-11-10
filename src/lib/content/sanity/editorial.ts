import { sanityClient } from '../../sanity/client';
import { resolveContentImage } from '../../sanity/image';
import type { Testimonial, PressItem } from '../types';
import { type FetchedImage } from './shared';

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial" && defined(quote) && defined(name)] | order(order asc, name asc) {
    _id,
    quote,
    name,
    age,
    location,
    tenure,
    order
  }
`;

type SanityTestimonial = {
  _id: string;
  quote?: string;
  name?: string;
  age?: number;
  location?: string;
  tenure?: string;
  order?: number;
};

function normalizeTestimonial(doc: SanityTestimonial): Testimonial | null {
  if (!doc?._id || !doc.quote?.trim() || !doc.name?.trim() || !doc.tenure?.trim()) return null;
  return {
    _id: doc._id,
    quote: doc.quote.trim(),
    name: doc.name.trim(),
    age: typeof doc.age === 'number' ? doc.age : undefined,
    location: doc.location?.trim() || undefined,
    tenure: doc.tenure.trim(),
    order: typeof doc.order === 'number' ? doc.order : 0,
  };
}

export async function getSanityTestimonials(): Promise<Testimonial[]> {
  const docs = await sanityClient.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY);
  return (docs ?? []).map(normalizeTestimonial).filter((item): item is Testimonial => Boolean(item));
}

// ─── Press ────────────────────────────────────────────────────────────────────

type SanityPressItem = {
  _id: string;
  outlet?: string;
  displayDate?: string;
  headline?: string;
  quote?: string;
  ctaText?: string;
  url?: string;
  photo?: FetchedImage | null;
};

const PRESS_ITEMS_QUERY = /* groq */ `
  *[_type == "pressItem" && defined(headline) && defined(url)] | order(coalesce(order, 0) asc, _createdAt desc) {
    _id,
    outlet,
    displayDate,
    headline,
    quote,
    ctaText,
    url,
    "photo": select(defined(photo.asset) => {
      "src": photo.asset->url,
      "alt": coalesce(photo.alt, headline),
      "crop": photo.crop,
      "hotspot": photo.hotspot,
      "asset": photo.asset
    }, null)
  }
`;

// Press copy is verbatim from the publication (headlines, quotes), so it is not
// run through normalizeWebsiteCopy like menu text.
function normalizePressItem(doc: SanityPressItem): PressItem | null {
  const headline = doc.headline?.trim();
  const href = doc.url?.trim();
  if (!doc._id || !headline || !href) return null;

  const image = resolveContentImage(doc.photo);
  const date = doc.displayDate?.trim();
  const quote = doc.quote?.trim();

  return {
    _id: doc._id,
    outlet: doc.outlet?.trim() ?? '',
    headline,
    ctaText: doc.ctaText?.trim() || 'Read more',
    href,
    ...(date ? { date } : {}),
    ...(quote ? { quote } : {}),
    ...(image?.src ? { image } : {}),
  };
}

export async function getSanityPressItems(): Promise<PressItem[]> {
  const docs = await sanityClient.fetch<SanityPressItem[]>(PRESS_ITEMS_QUERY);
  return (docs ?? []).map(normalizePressItem).filter((item): item is PressItem => Boolean(item));
}
