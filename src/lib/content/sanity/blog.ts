import { sanityClient } from '../../sanity/client';
import { resolveContentImage } from '../../sanity/image';
import type { BlogPost } from '../types';
import { type FetchedImage } from './shared';
import {
  type SanityBlogPost,
  authoredText,
  portableTextToContentBlocks,
  portableTextToParagraphs,
} from './portableText';

function normalizeBlogPost(post: SanityBlogPost): BlogPost {
  const contentBlocks = portableTextToContentBlocks(post.body);
  const body = portableTextToParagraphs(post.body);
  const excerpt = post.excerpt || body[0] || '';
  return {
    title: post.title,
    slug: post.slug,
    excerpt,
    publishDate: post.publishDate,
    author: post.author,
    image: resolveContentImage(post.image as FetchedImage | undefined),
    relatedPages: (post.relatedPages ?? []).map((key) => key.replace(/^\/+/, '')).filter(Boolean),
    meta: {
      title: authoredText(post.metaTitle) || post.title,
      description: authoredText(post.metaDescription) || excerpt,
    },
    heroParagraphs: body.slice(0, 2),
    sections:
      body.length > 2
        ? [
            {
              _type: 'editorialSection',
              heading: post.title,
              paragraphs: body.slice(2),
            },
          ]
        : [],
    ctaBanner: {
      title: 'Get in touch',
      subtitle: '',
      ctaText: 'Start the assessment',
      ctaHref: '/order-online',
    },
    body,
    contentBlocks,
  };
}

const BLOG_POST_CARD_PROJECTION = /* groq */ `
  title,
  "slug": slug.current,
  excerpt,
  publishDate,
  author,
  "image": {
    "src": coalesce(image.asset->url, imageUrl, ""),
    "alt": coalesce(image.alt, imageAlt, title),
    "crop": image.crop,
    "hotspot": image.hotspot,
    "asset": image.asset
  },
  relatedPages
`;

const BLOG_POST_PROJECTION = /* groq */ `
  ${BLOG_POST_CARD_PROJECTION},
  metaTitle,
  metaDescription,
  body[] {
    ...,
    _type == "image" => {
      ...,
      "src": asset->url,
      "alt": coalesce(alt, ""),
      caption,
      crop,
      hotspot,
      asset
    },
    _type == "callout" => {
      _type,
      _key,
      "calloutType": type,
      text
    },
    _type == "table" => {
      _type,
      _key,
      caption,
      headerRow,
      "rows": rows[] { _key, cells }
    },
    _type in ["imageCarousel", "imageRow"] => {
      _type,
      _key,
      "images": images[] {
        _key,
        "src": asset->url,
        "alt": coalesce(alt, ""),
        caption,
        crop,
        hotspot,
        asset
      }
    }
  }
`;

const BLOG_POSTS_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)] | order(publishDate desc) {
    ${BLOG_POST_CARD_PROJECTION}
  }
`;

const BLOG_POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${BLOG_POST_PROJECTION}
  }
`;

const BLOG_POSTS_RELATED_TO_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current) && $pageSlug in relatedPages] | order(publishDate desc) [0...3] {
    ${BLOG_POST_CARD_PROJECTION}
  }
`;

export async function getSanityBlogPosts(): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch<SanityBlogPost[]>(BLOG_POSTS_QUERY);
  return (posts ?? []).filter((post) => post?.slug && post?.title).map(normalizeBlogPost);
}

export async function getSanityBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await sanityClient.fetch<SanityBlogPost | null>(BLOG_POST_BY_SLUG_QUERY, { slug });
  if (!post?.slug || !post.title) return null;
  return normalizeBlogPost(post);
}

export async function getSanityBlogPostsRelatedTo(pageSlug: string): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch<SanityBlogPost[]>(BLOG_POSTS_RELATED_TO_QUERY, { pageSlug });
  return (posts ?? []).filter((post) => post?.slug && post?.title).map(normalizeBlogPost);
}

const BLOG_POST_SLUGS_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)].slug.current
`;

export async function getSanityBlogPostSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<string[]>(BLOG_POST_SLUGS_QUERY);
  return (slugs ?? []).filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
}

export interface SitemapContentEntry {
  path: string;
  lastmod?: string;
}

const SITEMAP_BLOG_POSTS_QUERY = /* groq */ `
  *[_type == "blogPost" && !(_id in path("drafts.**")) && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt,
    publishDate
  }
`;

export async function getSanitySitemapContent(): Promise<SitemapContentEntry[]> {
  const blogs = await sanityClient
    .fetch<Array<{ slug: string; _updatedAt?: string; publishDate?: string }>>(SITEMAP_BLOG_POSTS_QUERY)
    .catch(() => []);

  const entries: SitemapContentEntry[] = [];
  for (const post of blogs ?? []) {
    if (!post?.slug) continue;
    const cleanSlug = post.slug.replace(/^\/+/, '').replace(/^blog\//, '');
    const dateStr = post._updatedAt || post.publishDate;
    entries.push({
      path: `/blog/${cleanSlug}`,
      lastmod: dateStr ? dateStr.slice(0, 10) : undefined,
    });
  }
  return entries;
}
