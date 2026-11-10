import type { MenuCategory, MenuItem } from './types';

/**
 * Menu content lives in Sanity (menu items, categories, photos, availability, notes). Nothing here adds, hides or
 * rewrites dishes any more. The only thing left is a punctuation exception: the site strips apostrophes from
 * Sanity text, but this one product name keeps its apostrophe.
 */
const TITLES_WITH_APOSTROPHE = new Map([['tutus chicken salad wrap', "Tutu's Chicken Salad Wrap"]]);

export function normalizeMenuTitle(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, ' ');
}

function restoreApostrophe(item: MenuItem): MenuItem {
  const title = TITLES_WITH_APOSTROPHE.get(normalizeMenuTitle(item.title));
  if (!title) return item;
  return {
    ...item,
    title,
    ...(item.image ? { image: { ...item.image, alt: title, title: item.image.title || title } } : {}),
  };
}

export function applyMenuDisplayOverrides(categories: MenuCategory[]): MenuCategory[] {
  return categories.map((category) => ({ ...category, items: category.items.map(restoreApostrophe) }));
}
