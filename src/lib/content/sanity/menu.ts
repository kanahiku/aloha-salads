import { sanityClient } from '../../sanity/client';
import { resolveContentImage } from '../../sanity/image';
import type { MenuCategory, MenuItem } from '../types';
import { type FetchedImage, normalizeWebsiteCopy } from './shared';

// ─── Menu ────────────────────────────────────────────────────────────────────

type FetchedMenuCategory = {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
  order?: number;
};

type FetchedMenuItem = {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
  note?: string;
  image?: FetchedImage | null;
  placements?: Array<{ categoryId?: string; order?: number }> | null;
};

type FetchedMenuContent = {
  categories?: FetchedMenuCategory[] | null;
  items?: FetchedMenuItem[] | null;
};

const MENU_QUERY = /* groq */ `
  {
    "categories": *[_type == "menuCategory" && showOnFullMenu != false && defined(slug.current)] | order(coalesce(order, 0) asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "order": coalesce(order, 0)
    },
    "items": *[_type == "menuItem" && isAvailable != false && defined(title)] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      note,
      "image": select(defined(photo.asset) => {
        "src": photo.asset->url,
        "alt": coalesce(photo.alt, title),
        "crop": photo.crop,
        "hotspot": photo.hotspot,
        "asset": photo.asset
      }, null),
      "placements": categoryPlacements[defined(category._ref)][] {
        "categoryId": category._ref,
        "order": coalesce(order, 0)
      }
    }
  }
`;

function normalizeMenuItem(item: FetchedMenuItem): MenuItem | null {
  if (!item.title) return null;
  const image = resolveContentImage(item.image);
  return {
    title: normalizeWebsiteCopy(item.title),
    ...(item.slug ? { slug: item.slug } : {}),
    ...(item.description ? { description: normalizeWebsiteCopy(item.description) } : {}),
    ...(item.note?.trim() ? { note: normalizeWebsiteCopy(item.note.trim()) } : {}),
    ...(image ? { image: { ...image, alt: normalizeWebsiteCopy(image.alt) } } : {}),
  };
}

export async function getSanityMenuCategories(): Promise<MenuCategory[]> {
  const content = await sanityClient.fetch<FetchedMenuContent>(MENU_QUERY);
  const categories = (content.categories ?? []).filter((category) => category._id && category.title);
  const items = content.items ?? [];

  return categories
    .map((category) => {
      const categoryItems = items
        .flatMap((item) =>
          (item.placements ?? [])
            .filter((placement) => placement.categoryId === category._id)
            .map((placement) => ({ item, order: placement.order ?? 0 }))
        )
        .map(({ item, order }) => {
          const normalized = normalizeMenuItem(item);
          return normalized ? { ...normalized, order } : null;
        })
        .filter((item): item is MenuItem & { order: number } => Boolean(item))
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
        .map(({ order: _order, ...item }) => item);

      return {
        title: normalizeWebsiteCopy(category.title!),
        slug: category.slug,
        href: category.slug ? `/menu/${category.slug}` : undefined,
        ...(category.description ? { description: normalizeWebsiteCopy(category.description) } : {}),
        items: categoryItems,
      };
    })
    .filter((category) => category.items.length > 0);
}
