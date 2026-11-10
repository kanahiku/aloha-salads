import type { BlogPost, NavigationContent, Testimonial, MenuCategory, MenuItem, PressItem } from './types';
import {
  getSanityBlogPost,
  getSanityBlogPosts,
  getSanityBlogPostSlugs,
  getSanitySitemapContent,
  getSanityTestimonials,
  getSanityNavigationContent,
  getSanityMenuCategories,
  getSanityPressItems,
} from './sanity';
import { blogPosts as localBlogPosts } from '../../data/pages/blogPosts';
import { navigationData } from '../../data/navigation';
import { applyMenuDisplayOverrides, normalizeMenuTitle } from './menuDisplay';


const LEGAL_FOOTER_LINKS = [
  { text: 'Privacy Policy', href: '/privacy-policy' },
  { text: 'Terms', href: '/terms' },
  { text: 'Accessibility', href: '/accessibility' },
];

const HIDDEN_NAV_HREFS = new Set(['/chapters', '/guidebooks', '/menu/vegan', '/menu/kids']);
const HIDDEN_NAV_LABELS = new Set([
  'chapters',
  'guidebooks',
  'guidebook series',
  'vegan options',
  'keiki / kids',
  'keiki / kids menu',
  'kids menu',
]);

function isHiddenNavLink(link: { text: string; href?: string }): boolean {
  return (link.href != null && HIDDEN_NAV_HREFS.has(link.href)) || HIDDEN_NAV_LABELS.has(link.text.toLowerCase());
}

function hidePagesFromUi(nav: NavigationContent): NavigationContent {
  return {
    ...nav,
    header: {
      ...nav.header,
      links: nav.header.links
        .filter((link) => !isHiddenNavLink(link))
        .map((link) => ({
          ...link,
          ...(link.links ? { links: link.links.filter((child) => !isHiddenNavLink(child)) } : {}),
          ...(link.columns
            ? {
                columns: link.columns.map((column) => ({
                  ...column,
                  links: column.links.filter((child) => !isHiddenNavLink(child)),
                })),
              }
            : {}),
        })),
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

/** `{year}` in the copyright line becomes the current year, so the line never goes stale. */
function fillFootNoteYear(nav: NavigationContent): NavigationContent {
  return {
    ...nav,
    footer: { ...nav.footer, footNote: nav.footer.footNote.replaceAll('{year}', String(new Date().getFullYear())) },
  };
}

/** Header, footer and announcement bar. Sanity first; the local data in `~/data/navigation` is the safety net. */
export async function getNavigationContent(): Promise<NavigationContent> {
  try {
    const nav = await getSanityNavigationContent();
    if (nav?.header && nav?.footer) {
      return fillFootNoteYear(hidePagesFromUi(ensureLegalFooterLinks(nav)));
    }
  } catch (error) {
    console.warn('Sanity navigation unavailable; using local fallback.', error);
  }
  return fillFootNoteYear(hidePagesFromUi(ensureLegalFooterLinks(navigationData)));
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const [sanitySlugs, localSlugs] = await Promise.all([
    getSanityBlogPostSlugs().catch(() => [] as string[]),
    Promise.resolve(localBlogPosts.map((post) => post.slug)),
  ]);
  return [...new Set([...localSlugs, ...sanitySlugs])];
}

const SITEMAP_EXCLUDED_PATHS = new Set(['/menu/vegan', '/menu/kids', '/404']);

const pageModules = import.meta.glob('/src/pages/**/*.astro');

function getDiscoveredStaticPaths(): string[] {
  const paths: string[] = [];
  for (const file of Object.keys(pageModules)) {
    if (file.includes('/[') || file.endsWith('/404.astro') || file.includes('/api/')) continue;
    let route = file
      .replace(/^.*\/src\/pages/, '')
      .replace(/\/index\.astro$/, '')
      .replace(/\.astro$/, '');
    if (route === '') route = '/';
    if (!SITEMAP_EXCLUDED_PATHS.has(route) && !HIDDEN_NAV_HREFS.has(route)) paths.push(route);
  }
  return paths;
}

export interface SitemapEntry {
  path: string;
  lastmod?: string;
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const [sanityEntries, staticPaths] = await Promise.all([
    getSanitySitemapContent().catch(() => []),
    Promise.resolve(getDiscoveredStaticPaths()),
  ]);

  const map = new Map<string, string | undefined>();
  for (const path of staticPaths) map.set(path, undefined);

  for (const entry of sanityEntries) {
    if (SITEMAP_EXCLUDED_PATHS.has(entry.path) || HIDDEN_NAV_HREFS.has(entry.path)) continue;
    map.set(entry.path, entry.lastmod);
  }

  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([path, lastmod]) => ({ path, lastmod }));
}

export async function getPublicContentPaths(): Promise<string[]> {
  const entries = await getSitemapEntries();
  return entries.map((entry) => entry.path);
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
