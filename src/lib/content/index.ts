import type { BlogPost, NavigationContent, Testimonial, MenuCategory, MenuItem, PressItem } from './types';
import {
  getSanityBlogPost,
  getSanityBlogPosts,
  getSanityBlogPostSlugs,
  getSanityTestimonials,
  getSanityNavigationContent,
  getSanityMenuCategories,
  getSanityPressItems,
} from './sanity';
import { blogPosts as localBlogPosts } from '../../data/pages/blogPosts';
import { navigationData } from '../../data/navigation';
import { interiorPaths } from '../../data/pages/interior';

const LEGAL_FOOTER_LINKS = [
  { text: 'Privacy Policy', href: '/privacy-policy' },
  { text: 'Terms', href: '/terms' },
  { text: 'Accessibility', href: '/accessibility' },
];

const HIDDEN_NAV_HREFS = new Set(['/chapters', '/guidebooks']);
const HIDDEN_NAV_LABELS = new Set(['chapters', 'guidebooks', 'guidebook series']);

function isHiddenNavLink(link: { text: string; href?: string }): boolean {
  return (link.href != null && HIDDEN_NAV_HREFS.has(link.href)) || HIDDEN_NAV_LABELS.has(link.text.toLowerCase());
}

function hidePagesFromUi(nav: NavigationContent): NavigationContent {
  return {
    ...nav,
    header: {
      ...nav.header,
      links: nav.header.links.filter((link) => !isHiddenNavLink(link)),
    },
    footer: {
      ...nav.footer,
      links: nav.footer.links
        .filter((column) => column.title.toLowerCase() !== 'chapters')
        .map((column) => ({
          ...column,
          links: column.links.filter((link) => !isHiddenNavLink(link)),
        })),
    },
  };
}

function ensureLegalFooterLinks(nav: NavigationContent): NavigationContent {
  const existing = nav.footer.secondaryLinks ?? [];
  const byHref = new Map(existing.map((link) => [link.href, link]));
  const merged = LEGAL_FOOTER_LINKS.map((link) => byHref.get(link.href) ?? link);

  for (const link of existing) {
    if (!merged.some((item) => item.href === link.href)) merged.push(link);
  }

  return {
    ...nav,
    footer: { ...nav.footer, secondaryLinks: merged },
  };
}

export async function getNavigationContent(): Promise<NavigationContent> {
  try {
    const nav = await getSanityNavigationContent();
    if (nav?.header && nav?.footer) {
      return hidePagesFromUi(ensureLegalFooterLinks(nav));
    }
  } catch (error) {
    console.warn('Sanity navigation unavailable; using local fallback.', error);
  }
  return hidePagesFromUi(ensureLegalFooterLinks(navigationData));
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const [sanitySlugs, localSlugs] = await Promise.all([
    getSanityBlogPostSlugs().catch(() => [] as string[]),
    Promise.resolve(localBlogPosts.map((post) => post.slug)),
  ]);
  return [...new Set([...localSlugs, ...sanitySlugs])];
}

const STATIC_PATHS = [
  '/',
  '/blog',
  '/reviews',
  '/privacy-policy',
  '/terms',
  '/accessibility',
  '/contact',
  ...interiorPaths,
];

export async function getPublicContentPaths(): Promise<string[]> {
  const postSlugs = await getBlogPostSlugs();
  return [...STATIC_PATHS, ...postSlugs.map((slug) => `/blog/${slug.replace(/^\/+/, '')}`)];
}

export function getBlogPermalink(slug: string): string {
  return `/blog/${slug}`;
}

function overlayCmsFields(local: BlogPost, sanity: BlogPost): BlogPost {
  return {
    ...local,
    title: sanity.title || local.title,
    excerpt: sanity.excerpt || local.excerpt,
    publishDate: sanity.publishDate || local.publishDate,
    author: sanity.author || local.author,
    image: sanity.image?.src ? sanity.image : local.image,
    relatedPages: sanity.relatedPages.length ? sanity.relatedPages : local.relatedPages,
    contentBlocks: sanity.contentBlocks?.length ? sanity.contentBlocks : local.contentBlocks,
  };
}

function mergeBlogPosts(sanityPosts: BlogPost[], localPosts: BlogPost[]): BlogPost[] {
  const localBySlug = new Map(localPosts.map((post) => [post.slug, post]));
  const sanityBySlug = new Map(sanityPosts.map((post) => [post.slug, post]));
  const slugs = new Set([...localBySlug.keys(), ...sanityBySlug.keys()]);

  return [...slugs]
    .map((slug) => {
      const sanity = sanityBySlug.get(slug);
      const local = localBySlug.get(slug);
      if (sanity && local) return overlayCmsFields(local, sanity);
      return (sanity ?? local)!;
    })
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getSanityBlogPosts();
    if (posts.length) return mergeBlogPosts(posts, localBlogPosts);
  } catch (error) {
    console.warn('Sanity blog posts unavailable; using local articles.', error);
  }
  return [...localBlogPosts].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const local = localBlogPosts.find((post) => post.slug === slug);
  let sanity: BlogPost | undefined;
  try {
    sanity = (await getSanityBlogPost(slug)) ?? undefined;
  } catch (error) {
    console.warn(`Sanity blog post "${slug}" unavailable; checking local articles.`, error);
  }

  if (sanity && local) return overlayCmsFields(local, sanity);
  return sanity ?? local;
}

export async function getBlogPostsRelatedTo(pageSlug: string): Promise<BlogPost[]> {
  const key = pageSlug.replace(/^\/+/, '');
  const posts = await getBlogPosts();
  return posts.filter((post) => post.relatedPages.includes(key)).slice(0, 3);
}

export async function getRelatedBlogPosts(post: BlogPost, max = 3): Promise<BlogPost[]> {
  const keys = new Set(post.relatedPages);
  if (!keys.size) return [];

  const posts = await getBlogPosts();
  return posts
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      item,
      score: item.relatedPages.filter((key) => keys.has(key)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.item.publishDate.localeCompare(a.item.publishDate))
    .slice(0, max)
    .map(({ item }) => item);
}

export type { BlogPost, NavigationContent, Testimonial };

export function formatTestimonialAttribution(item: Testimonial): string {
  const identity = typeof item.age === 'number' ? `${item.name}, ${item.age}` : item.name;
  return [identity, item.location, item.tenure].filter(Boolean).join(' · ');
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await getSanityTestimonials();
  } catch (error) {
    console.warn('Sanity testimonials unavailable.', error);
    return [];
  }
}

const HIDDEN_MENU_ITEM_TITLES = new Set(['red bull']);
const MENU_PHOTO_DONOR_TO_BASE_TITLE = new Map([
  ['aloha caesar (with shrimp)', 'aloha caesar'],
  ['the paniolo (with gyro meat)', 'the paniolo'],
  ['spicy ahi poke bowl', 'poke bowl'],
  ['spicy ahi poke wrap', 'poke wrap'],
  ['spicy ahi salad (styling a)', 'poke salad'],
  ['spicy ahi salad (styling b)', 'poke salad'],
]);

const MENU_TITLE_RENAMES = new Map([['maui mozzarella salad', 'Maui Mozzarella']]);
const MENU_IMAGE_ALT_RENAMES = new Map([
  ['hummis pita wrap', 'Hummus Pita Wrap'],
  ['grilled cheese combo', 'Grilled Cheese Soup Combo'],
  ['maui mozzarella salad', 'Maui Mozzarella'],
]);

function normalizeMenuTitle(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, ' ');
}

function applyMenuItemTextCorrections(item: MenuItem): MenuItem {
  const title = MENU_TITLE_RENAMES.get(normalizeMenuTitle(item.title)) ?? item.title;
  const image = item.image
    ? {
        ...item.image,
        alt: MENU_IMAGE_ALT_RENAMES.get(normalizeMenuTitle(item.image.alt)) ?? item.image.alt,
      }
    : undefined;

  return { ...item, title, ...(image ? { image } : {}) };
}

const REQUESTED_MENU_ITEMS: Array<{
  categorySlug: string;
  categoryTitle: string;
  categoryDescription: string;
  title: string;
  description?: string;
  badge?: string;
  note?: string;
  insertAfter?: string;
}> = [
  {
    categorySlug: 'salads',
    categoryTitle: 'Signature Salads',
    categoryDescription: 'Fresh bowls built with crisp greens, local ahi, and house-made dressings.',
    title: 'Big Island Beet',
    description: 'Mixed greens, roasted beets, mangoes, craisins, candied walnuts, goat cheese, balsamic glaze, and passion orange vinaigrette.',
    note: 'Not available at Kaneohe',
  },
  {
    categorySlug: 'salads',
    categoryTitle: 'Signature Salads',
    categoryDescription: 'Fresh bowls built with crisp greens, local ahi, and house-made dressings.',
    title: 'Poke Bowl',
    badge: 'Coming soon',
  },
  {
    categorySlug: 'salads',
    categoryTitle: 'Signature Salads',
    categoryDescription: 'Fresh bowls built with crisp greens, local ahi, and house-made dressings.',
    title: 'Poke Salad',
    description: 'Romaine, carrots, cucumbers, avocado, wonton strips, green onion, crispy onion, spicy ahi, and unagi sauce.',
    badge: 'Coming soon',
  },
  {
    categorySlug: 'wraps-subs',
    categoryTitle: 'Wraps & Subs',
    categoryDescription: 'Hearty wraps and sandwiches made with the same fresh components as our bowls.',
    title: 'Pastrami Melt',
    description: 'Grilled pastrami, provolone cheese, and spicy slaw on grilled sourdough.',
  },
  {
    categorySlug: 'wraps-subs',
    categoryTitle: 'Wraps & Subs',
    categoryDescription: 'Hearty wraps and sandwiches made with the same fresh components as our bowls.',
    title: 'Poke Wrap',
    insertAfter: 'Hummus Pita Wrap',
    description: 'Bean sprouts, avocado, cucumber, crispy onion, spicy ahi, and unagi sauce, served on warmed pita.',
    badge: 'Coming soon',
  },
  {
    categorySlug: 'misc',
    categoryTitle: 'Misc',
    categoryDescription: 'Additional favorites and cafe-style selections.',
    title: 'Avocado Toast',
    description: 'Toasted sourdough, avocado, tomatoes, basil, balsamic glaze, sea salt, and black pepper.',
  },
  {
    categorySlug: 'misc',
    categoryTitle: 'Misc',
    categoryDescription: 'Additional favorites and cafe-style selections.',
    title: 'Dessert Toast',
    description: 'Toasted sourdough, your choice of Nutella or peanut butter, strawberry, banana, blueberry, and honey.',
  },
  {
    categorySlug: 'misc',
    categoryTitle: 'Misc',
    categoryDescription: 'Additional favorites and cafe-style selections.',
    title: 'Acai Bowl',
    description: 'Acai, granola, strawberry, banana, blueberry, and honey.',
  },
  {
    categorySlug: 'drinks',
    categoryTitle: 'Drinks',
    categoryDescription: 'Chilled beverages, including our Big Island mamaki mint tea.',
    title: 'Kona Cold Brew Coffee',
    description: 'Kona coffee and condensed milk.',
  },
];

function upsertRequestedMenuItem(items: MenuItem[], requested: (typeof REQUESTED_MENU_ITEMS)[number], image?: MenuItem['image']) {
  const requestedTitle = normalizeMenuTitle(requested.title);
  const existingIndex = items.findIndex((item) => normalizeMenuTitle(item.title) === requestedTitle);
  const requestedFields = {
    ...(requested.description ? { description: requested.description } : {}),
    ...(requested.badge ? { badge: requested.badge } : {}),
    ...(requested.note ? { note: requested.note } : {}),
    ...(image?.src ? { image: { ...image, alt: requested.title } } : {}),
  };

  if (existingIndex === -1) {
    const newItem = { title: requested.title, ...requestedFields };
    const afterIndex = requested.insertAfter
      ? items.findIndex((item) => normalizeMenuTitle(item.title) === normalizeMenuTitle(requested.insertAfter!))
      : -1;
    if (afterIndex === -1) return [...items, newItem];
    return [...items.slice(0, afterIndex + 1), newItem, ...items.slice(afterIndex + 1)];
  }

  return items.map((item, index) =>
    index === existingIndex
      ? {
          ...item,
          ...requestedFields,
          description: requested.description ?? item.description,
          badge: requested.badge ?? item.badge,
          note: requested.note ?? item.note,
          image: image?.src ? { ...image, alt: requested.title } : item.image,
        }
      : item
  );
}

function applyMenuDisplayOverrides(categories: MenuCategory[]): MenuCategory[] {
  const variantImages = new Map<string, MenuItem['image']>();

  for (const category of categories) {
    for (const item of category.items) {
      const baseTitle = MENU_PHOTO_DONOR_TO_BASE_TITLE.get(normalizeMenuTitle(item.title));
      if (baseTitle && item.image?.src) variantImages.set(baseTitle, { ...item.image, alt: baseTitle });
    }
  }

  const nextCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.flatMap((item) => {
        const title = normalizeMenuTitle(item.title);

        if (HIDDEN_MENU_ITEM_TITLES.has(title) || MENU_PHOTO_DONOR_TO_BASE_TITLE.has(title)) return [];

        const variantImage = variantImages.get(title);
        return [{ ...item, ...(variantImage?.src ? { image: { ...variantImage, alt: item.title } } : {}) }];
      }),
    }))
    .filter((category) => category.items.length > 0);

  for (const requested of REQUESTED_MENU_ITEMS) {
    const href = `/menu/${requested.categorySlug}`;
    const existingIndex = nextCategories.findIndex(
      (category) => category.slug === requested.categorySlug || category.href === href
    );
    const image = variantImages.get(normalizeMenuTitle(requested.title));

    if (existingIndex === -1) {
      nextCategories.push({
        title: requested.categoryTitle,
        slug: requested.categorySlug,
        href,
        description: requested.categoryDescription,
        items: upsertRequestedMenuItem([], requested, image),
      });
      continue;
    }

    const category = nextCategories[existingIndex];
    nextCategories[existingIndex] = {
      ...category,
      items: upsertRequestedMenuItem(category.items, requested, image),
    };
  }

  return nextCategories.map((category) => ({
    ...category,
    items: category.items.map(applyMenuItemTextCorrections),
  }));
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    return applyMenuDisplayOverrides(await getSanityMenuCategories());
  } catch (error) {
    console.warn('Sanity menu unavailable.', error);
    return [];
  }
}

export async function getMenuCategory(slug: string): Promise<MenuCategory | undefined> {
  const normalized = slug.replace(/^\/+|\/+$/g, '');
  const categories = await getMenuCategories();
  return categories.find((category) => category.slug === normalized || category.href === `/menu/${normalized}`);
}

/** First photo found for a menu item title, across all categories (used for cards that reuse a dish photo). */
export async function getMenuItemImage(title: string): Promise<MenuItem['image'] | undefined> {
  const target = normalizeMenuTitle(title);
  const categories = await getMenuCategories();
  for (const category of categories) {
    const match = category.items.find((item) => normalizeMenuTitle(item.title) === target && item.image?.src);
    if (match?.image) return match.image;
  }
  return undefined;
}

export type { MenuCategory };

export async function getPressItems(): Promise<PressItem[]> {
  try {
    return await getSanityPressItems();
  } catch (error) {
    console.warn('Sanity press cards unavailable.', error);
    return [];
  }
}

export type { PressItem };
