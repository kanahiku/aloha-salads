import { resolveContentImage } from '../sanity/image';
import { getMenuCategories, getMenuCategory } from './index';
import { IMAGE_PROJECTION, textOr } from './sanity';
import { clean, cleanFaqs, fetchOrNull, type FetchedImage } from './pageContent';
import { MENU_CARD_DEFAULTS, MENU_HUB_DEFAULTS, MENU_SHARED_DEFAULTS, MENU_SUBPAGE_DEFAULTS } from './menuDefaults';
import { MENU_FALLBACK_CATEGORIES, MENU_FALLBACK_ITEMS } from './menuFallbackItems';
import type {
  MenuCardCopy,
  MenuHubContent,
  MenuListItem,
  MenuSharedContent,
  MenuSourcingContent,
  MenuSubpageContent,
} from './types';

/**
 * Menu pages from Sanity: the Menu landing page (`singleton-menu`) and one document per category page
 * (`singleton-menu-<slug>`). Dishes are Menu items placed in a category (Menu → Dishes).
 *
 * Fallbacks: a missing document or an unreachable Sanity uses `menuDefaults.ts`. Required single text uses its
 * default when left empty; lists (FAQs, build steps, custom cards) and the optional intro are used as authored
 * once the document exists. Dishes fall back to `menuFallbackItems.ts` only if Sanity has none for the category.
 */

type FetchedFaqs = Array<{ question?: string | null; answer?: string | null }> | null;

type FetchedHub = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTitle?: string | null;
  heroContent?: string | null;
  heroImage?: FetchedImage | null;
  fullMenuTitle?: string | null;
  fullMenuSubtitle?: string | null;
  sourcingTitle?: string | null;
  sourcingSubtitle?: string | null;
  sourcingCtaLabel?: string | null;
  sourcingImage?: FetchedImage | null;
  ctaSubtitle?: string | null;
  faqs?: FetchedFaqs;
  sharedOrderLabel?: string | null;
  sharedLocationLabel?: string | null;
  sharedCateringLabel?: string | null;
  sharedReadyTitle?: string | null;
  sharedExploreTitle?: string | null;
  sharedFaqTitle?: string | null;
};

type FetchedSubpage = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTitle?: string | null;
  heroContent?: string | null;
  heroImage?: FetchedImage | null;
  listTitle?: string | null;
  listIntro?: string | null;
  customItems?: Array<{
    title?: string | null;
    description?: string | null;
    badge?: string | null;
    note?: string | null;
    image?: FetchedImage | null;
  }> | null;
  buildTitle?: string | null;
  buildSubtitle?: string | null;
  buildSteps?: Array<{ title?: string | null; description?: string | null }> | null;
  buildNote?: string | null;
  buildCtaLabel?: string | null;
  buildImage?: FetchedImage | null;
  sourcingTitle?: string | null;
  sourcingSubtitle?: string | null;
  sourcingCtaLabel?: string | null;
  sourcingImage?: FetchedImage | null;
  exploreSubtitle?: string | null;
  ctaSubtitle?: string | null;
  faqs?: FetchedFaqs;
};

const HUB_QUERY = /* groq */ `
  *[_type == "menuHub" && _id == "singleton-menu"][0] {
    metaTitle, metaDescription, heroTitle, heroContent,
    ${IMAGE_PROJECTION('heroImage', 'Fresh salad bowls from Aloha Salads')},
    fullMenuTitle, fullMenuSubtitle,
    sourcingTitle, sourcingSubtitle, sourcingCtaLabel,
    ${IMAGE_PROJECTION('sourcingImage', 'Fresh local ingredients at Aloha Salads')},
    ctaSubtitle,
    "faqs": faqs[]{ question, answer },
    sharedOrderLabel, sharedLocationLabel, sharedCateringLabel, sharedReadyTitle, sharedExploreTitle, sharedFaqTitle
  }
`;

const SUBPAGE_QUERY = /* groq */ `
  *[_type == "menuSubpage" && _id == $id][0] {
    metaTitle, metaDescription, heroTitle, heroContent,
    ${IMAGE_PROJECTION('heroImage', 'Aloha Salads menu')},
    listTitle, listIntro,
    "customItems": customItems[]{ title, description, badge, note, ${IMAGE_PROJECTION('image', 'Aloha Salads menu item')} },
    buildTitle, buildSubtitle,
    "buildSteps": buildSteps[]{ title, description },
    buildNote, buildCtaLabel,
    ${IMAGE_PROJECTION('buildImage', 'How to build your own salad at Aloha Salads')},
    sourcingTitle, sourcingSubtitle, sourcingCtaLabel,
    exploreSubtitle, ctaSubtitle,
    "faqs": faqs[]{ question, answer }
  }
`;

const optional = (value: string | null | undefined) => clean(value) || undefined;

function resolveShared(doc: FetchedHub | null): MenuSharedContent {
  const d = MENU_SHARED_DEFAULTS;
  if (!doc) return d;
  return {
    orderLabel: textOr(doc.sharedOrderLabel, d.orderLabel),
    locationLabel: textOr(doc.sharedLocationLabel, d.locationLabel),
    cateringLabel: textOr(doc.sharedCateringLabel, d.cateringLabel),
    faqTitle: textOr(doc.sharedFaqTitle, d.faqTitle),
    readyTitle: textOr(doc.sharedReadyTitle, d.readyTitle),
    exploreTitle: textOr(doc.sharedExploreTitle, d.exploreTitle),
  };
}

function resolveSourcing(
  doc: Pick<FetchedHub, 'sourcingTitle' | 'sourcingSubtitle' | 'sourcingCtaLabel'> & {
    sourcingImage?: FetchedImage | null;
  },
  d: MenuSourcingContent
): MenuSourcingContent {
  return {
    title: textOr(doc.sourcingTitle, d.title),
    subtitle: textOr(doc.sourcingSubtitle, d.subtitle),
    ctaLabel: textOr(doc.sourcingCtaLabel, d.ctaLabel),
    image: resolveContentImage(doc.sourcingImage),
  };
}

function resolveHub(doc: FetchedHub | null): MenuHubContent {
  const d = MENU_HUB_DEFAULTS;
  if (!doc) return d;
  return {
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    hero: {
      title: textOr(doc.heroTitle, d.hero.title),
      content: textOr(doc.heroContent, d.hero.content),
      image: resolveContentImage(doc.heroImage),
    },
    fullMenu: {
      title: textOr(doc.fullMenuTitle, d.fullMenu.title),
      subtitle: textOr(doc.fullMenuSubtitle, d.fullMenu.subtitle),
    },
    sourcing: resolveSourcing(doc, d.sourcing),
    cta: { subtitle: textOr(doc.ctaSubtitle, d.cta.subtitle) },
    faqs: cleanFaqs(doc.faqs),
  };
}

function resolveSubpage(slug: string, doc: FetchedSubpage | null): MenuSubpageContent {
  const d = MENU_SUBPAGE_DEFAULTS.find((page) => page.slug === slug);
  if (!d) throw new Error(`No menu page defaults for "${slug}"`);
  if (!doc) return d;

  const customItems: MenuListItem[] = (doc.customItems ?? [])
    .filter((item) => item.title?.trim())
    .map((item) => {
      const image = resolveContentImage(item.image);
      const description = optional(item.description);
      const badge = optional(item.badge);
      const note = optional(item.note);
      return {
        title: clean(item.title),
        ...(description ? { description } : {}),
        ...(badge ? { badge } : {}),
        ...(note ? { note } : {}),
        ...(image ? { image } : {}),
      };
    });

  const steps = (doc.buildSteps ?? [])
    .filter((step) => step.title?.trim())
    .map((step) => ({ title: clean(step.title), description: clean(step.description) }));

  return {
    slug,
    title: d.title,
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    hero: {
      title: textOr(doc.heroTitle, d.hero.title),
      content: textOr(doc.heroContent, d.hero.content),
      image: resolveContentImage(doc.heroImage),
    },
    ...(d.list ? { list: { title: textOr(doc.listTitle, d.list.title), intro: optional(doc.listIntro) } } : {}),
    ...(customItems.length > 0 ? { customItems } : {}),
    sourcing: resolveSourcing(doc, d.sourcing),
    explore: { subtitle: textOr(doc.exploreSubtitle, d.explore.subtitle) },
    cta: { subtitle: textOr(doc.ctaSubtitle, d.cta.subtitle) },
    faqs: cleanFaqs(doc.faqs),
    ...(d.build
      ? {
          build: {
            title: textOr(doc.buildTitle, d.build.title),
            subtitle: textOr(doc.buildSubtitle, d.build.subtitle),
            note: clean(doc.buildNote),
            ctaLabel: textOr(doc.buildCtaLabel, d.build.ctaLabel),
            steps,
            image: resolveContentImage(doc.buildImage),
          },
        }
      : {}),
  };
}

/** The Menu landing page: copy, shared labels, and the categories (with dishes) for the full menu. */
export async function getMenuHubData() {
  const [hubDoc, categories] = await Promise.all([fetchOrNull<FetchedHub>('menu', HUB_QUERY), getMenuCategories()]);
  return {
    hub: resolveHub(hubDoc),
    shared: resolveShared(hubDoc),
    categories: categories.length > 0 ? categories : MENU_FALLBACK_CATEGORIES,
  };
}

/** One menu category page: copy, shared labels, and the dishes to list. */
export async function getMenuPageData(slug: string) {
  const [hubDoc, pageDoc, category] = await Promise.all([
    fetchOrNull<FetchedHub>('menu', HUB_QUERY),
    fetchOrNull<FetchedSubpage>(`menu page ${slug}`, SUBPAGE_QUERY.replace('$id', `"singleton-menu-${slug}"`)),
    getMenuCategory(slug),
  ]);
  const page = resolveSubpage(slug, pageDoc);
  const items: MenuListItem[] =
    page.customItems ?? (category?.items.length ? category.items : (MENU_FALLBACK_ITEMS[slug] ?? []));

  return { page, shared: resolveShared(hubDoc), items };
}

/**
 * Names and descriptions on the menu category cards (homepage + every menu page), keyed by category slug.
 * Written under Menu → Menu page → "Category cards". A card left empty falls back to the category's own
 * description (Menu → Categories), then to the approved default.
 */
export async function getMenuCardCopy(): Promise<Map<string, MenuCardCopy>> {
  const [doc, categories] = await Promise.all([
    fetchOrNull<{ cards?: Array<{ slug?: string | null; label?: string | null; description?: string | null }> | null }>(
      'menu cards',
      `*[_type == "menuHub" && _id == "singleton-menu"][0]{ "cards": categoryCards[]{ slug, label, description } }`
    ),
    getMenuCategories(),
  ]);
  const authored = new Map((doc?.cards ?? []).map((card) => [card.slug ?? '', card]));
  const categoryDescription = new Map(categories.map((category) => [category.slug ?? '', category.description]));

  return new Map(
    MENU_CARD_DEFAULTS.map((d) => {
      const card = authored.get(d.slug);
      return [
        d.slug,
        {
          slug: d.slug,
          label: textOr(card?.label, d.label),
          description: textOr(card?.description, categoryDescription.get(d.slug) || d.description),
        },
      ];
    })
  );
}
