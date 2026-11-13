import type { JsonLdNode } from './types';
import { absoluteUrl, siteOrigin } from './urls';

interface BlogPostInput {
  title: string;
  slug: string;
  publishDate: string;
  author?: string;
  image?: { src: string };
  meta: { description: string };
}

/** BlogPosting + breadcrumb nodes for one article. */
export function getBlogPostingJsonLd(post: BlogPostInput): JsonLdNode[] {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const publisher = { '@id': `${siteOrigin()}/#organization` };

  const article: JsonLdNode = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.meta.description,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: post.author ? { '@type': 'Person', name: post.author } : publisher,
    publisher,
    url,
  };
  if (post.image?.src) article.image = [post.image.src];

  const breadcrumb: JsonLdNode = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return [article, breadcrumb];
}
