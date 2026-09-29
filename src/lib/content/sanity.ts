import { sanityClient } from '../sanity/client';
import { resolveContentImage, type SanityImageFields } from '../sanity/image';
import type {
  BlogContentBlock,
  BlogPost,
  Testimonial,
  ContentImage,
  NavigationContent,
  NavLink,
  NavSubLink,
  MenuCategory,
  MenuItem,
} from './types';

type FetchedImage = ContentImage & SanityImageFields;

type FetchedNavSubLink = {
  text?: string;
  href?: string;
  description?: string;
  image?: FetchedImage | null;
};

type FetchedNavColumn = {
  title?: string;
  links?: FetchedNavSubLink[] | null;
};

type FetchedNavLink = FetchedNavSubLink & {
  links?: FetchedNavSubLink[] | null;
  columns?: FetchedNavColumn[] | null;
};

type FetchedNavigationContent = Omit<NavigationContent, 'header' | 'footer'> & {
  header?: {
    links?: FetchedNavLink[] | null;
    actions?: NavigationContent['header']['actions'];
    phone?: NavigationContent['header']['phone'];
  } | null;
  footer?: NavigationContent['footer'] | null;
};

const NAV_IMAGE_PROJECTION = /* groq */ `
  "image": select(defined(image.asset) => {
    "src": image.asset->url,
    "alt": coalesce(image.alt, ""),
    "crop": image.crop,
    "hotspot": image.hotspot,
    "asset": image.asset
  }, null)
`;

const NAV_SUB_LINK_PROJECTION = /* groq */ `
  text,
  href,
  description,
  ${NAV_IMAGE_PROJECTION}
`;

const NAVIGATION_QUERY = /* groq */ `
  {
    "header": *[_type == "siteNavigation" && _id == "singleton-navigation"][0] {
      "links": links[] {
        ${NAV_SUB_LINK_PROJECTION},
        "links": subLinks[] {
          ${NAV_SUB_LINK_PROJECTION}
        },
        "columns": columns[] {
          title,
          "links": links[] {
            ${NAV_SUB_LINK_PROJECTION}
          }
        }
      },
      "actions": actions[] { variant, text, href },
      phone
    },
    "footer": *[_type == "siteFooter" && _id == "singleton-footer"][0] {
      "links": columns[] {
        title,
        "links": links[] { text, href }
      },
      "secondaryLinks": secondaryLinks[] { text, href },
      "socialLinks": socialLinks[] { ariaLabel, icon, href },
      footNote
    }
  }
`;

function normalizeNavSubLink(link: FetchedNavSubLink | null | undefined): NavSubLink | null {
  if (!link?.text || !link.href) return null;
  const image = resolveContentImage(link.image);
  return {
    text: link.text,
    href: link.href,
    ...(link.description ? { description: link.description } : {}),
    ...(image ? { image } : {}),
  };
}

function normalizeNavLink(link: FetchedNavLink | null | undefined): NavLink | null {
  if (!link?.text) return null;
  const image = resolveContentImage(link.image);
  const links = (link.links ?? [])
    .map(normalizeNavSubLink)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const columns = (link.columns ?? [])
    .map((column) => ({
      title: column?.title ?? '',
      links: (column?.links ?? [])
        .map(normalizeNavSubLink)
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    }))
    .filter((column) => column.title && column.links.length);

  return {
    text: link.text,
    ...(link.href ? { href: link.href } : {}),
    ...(link.description ? { description: link.description } : {}),
    ...(image ? { image } : {}),
    ...(links.length ? { links } : {}),
    ...(columns.length ? { columns } : {}),
  };
}

export async function getSanityNavigationContent(): Promise<NavigationContent> {
  const nav = await sanityClient.fetch<FetchedNavigationContent>(NAVIGATION_QUERY);
  if (!nav.header || !nav.footer) {
    throw new Error('Sanity navigation/footer singletons are not published yet.');
  }

  return {
    header: {
      links: (nav.header?.links ?? [])
        .map(normalizeNavLink)
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
      actions: nav.header?.actions ?? [],
      ...(nav.header?.phone ? { phone: nav.header.phone } : {}),
    },
    footer: nav.footer ?? {
      links: [],
      secondaryLinks: [],
      socialLinks: [],
      footNote: '',
    },
  };
}

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
    title: item.title,
    ...(item.slug ? { slug: item.slug } : {}),
    ...(item.description ? { description: item.description } : {}),
    ...(image ? { image } : {}),
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
        title: category.title!,
        slug: category.slug,
        href: category.slug ? `/menu/${category.slug}` : undefined,
        ...(category.description ? { description: category.description } : {}),
        items: categoryItems,
      };
    })
    .filter((category) => category.items.length > 0);
}

type SanityMarkDef = {
  _type: string;
  _key: string;
  href?: string;
  blank?: boolean;
};

type SanitySpan = {
  _type: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

type SanityPortableBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: SanitySpan[];
  markDefs?: SanityMarkDef[];
  // image fields
  src?: string;
  alt?: string;
  caption?: string;
  // table fields
  headerRow?: string[];
  rows?: Array<{ _key?: string; cells?: string[] }>;
  // callout fields (projected as calloutType from the "type" Sanity field)
  calloutType?: string;
  text?: string;
} & SanityImageFields;

type SanityBlogPost = Omit<BlogPost, 'image' | 'relatedPages' | 'body' | 'contentBlocks'> & {
  image?: ContentImage;
  relatedPages?: string[] | null;
  body?: SanityPortableBlock[] | null;
};

function portableBlockText(block: SanityPortableBlock): string {
  return Array.isArray(block.children) ? block.children.map((child) => child.text ?? '').join('') : '';
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function spansToHtml(children: SanitySpan[] | undefined, markDefs: SanityMarkDef[] | undefined): string {
  if (!Array.isArray(children)) return '';
  const defsMap = new Map((markDefs ?? []).map((d) => [d._key, d]));

  return children
    .map((span) => {
      if (span._type !== 'span') return '';
      let html = escapeHtml(span.text ?? '');
      for (const mark of span.marks ?? []) {
        const def = defsMap.get(mark);
        if (def?._type === 'link') {
          const targetAttr = def.blank !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
          html = `<a href="${escapeHtml(def.href ?? '')}"${targetAttr}>${html}</a>`;
        } else if (mark === 'strong') {
          html = `<strong>${html}</strong>`;
        } else if (mark === 'em') {
          html = `<em>${html}</em>`;
        } else if (mark === 'underline') {
          html = `<u>${html}</u>`;
        } else if (mark === 'strike-through') {
          html = `<s>${html}</s>`;
        } else if (mark === 'code') {
          html = `<code>${html}</code>`;
        }
      }
      return html;
    })
    .join('');
}

function portableTextToContentBlocks(body: SanityPortableBlock[] | null | undefined): BlogContentBlock[] {
  if (!Array.isArray(body)) return [];

  const result: BlogContentBlock[] = [];

  // Buffer for consecutive list items of the same type
  let listBuffer: { _key: string; html: string; level: number }[] = [];
  let listType: 'bullet' | 'number' | null = null;
  let listStartKey = '';

  function flushList() {
    if (!listBuffer.length || !listType) return;
    result.push({ _type: 'list', _key: `list-${listStartKey}`, listType, items: listBuffer });
    listBuffer = [];
    listType = null;
    listStartKey = '';
  }

  body.forEach((block, index) => {
    const key = block._key || `block-${index}`;

    // ── Image ─────────────────────────────────────────────────────────────────
    if (block._type === 'image') {
      flushList();
      const image = resolveContentImage({
        src: block.src,
        alt: block.alt,
        crop: block.crop,
        hotspot: block.hotspot,
        asset: block.asset,
      });
      if (!image?.src) return;
      const caption = typeof block.caption === 'string' ? block.caption.trim() : '';
      result.push({ _type: 'image', _key: key, image, ...(caption ? { caption } : {}) });
      return;
    }

    // ── Table ─────────────────────────────────────────────────────────────────
    if (block._type === 'table') {
      flushList();
      const headerRow = (block.headerRow ?? []).filter(Boolean);
      if (headerRow.length < 2) return;
      result.push({
        _type: 'table',
        _key: key,
        ...(block.caption ? { caption: block.caption } : {}),
        headerRow,
        rows: (block.rows ?? []).map((row, ri) => ({
          _key: row._key || `row-${ri}`,
          cells: row.cells ?? [],
        })),
      });
      return;
    }

    // ── Callout ───────────────────────────────────────────────────────────────
    if (block._type === 'callout') {
      flushList();
      if (!block.text?.trim()) return;
      const calloutType = (['tip', 'info', 'warning', 'note'] as const).includes(
        block.calloutType as 'tip' | 'info' | 'warning' | 'note'
      )
        ? (block.calloutType as 'tip' | 'info' | 'warning' | 'note')
        : 'note';
      result.push({ _type: 'callout', _key: key, calloutType, text: block.text.trim() });
      return;
    }

    // ── Standard block ────────────────────────────────────────────────────────
    if (block._type !== 'block') return;

    const text = portableBlockText(block).trim();
    if (!text) return;

    const html = spansToHtml(block.children, block.markDefs) || escapeHtml(text);

    // Headings
    if (block.style === 'h1' || block.style === 'h2') {
      flushList();
      result.push({ _type: 'heading', _key: key, level: 2, text });
      return;
    }
    if (block.style === 'h3' || block.style === 'h4') {
      flushList();
      result.push({ _type: 'heading', _key: key, level: 3, text });
      return;
    }

    // List items
    if (block.listItem === 'bullet' || block.listItem === 'number') {
      if (listType !== block.listItem) {
        flushList();
        listType = block.listItem;
        listStartKey = key;
      }
      listBuffer.push({ _key: key, html, level: block.level ?? 1 });
      return;
    }

    // Paragraph / blockquote
    flushList();
    result.push({
      _type: 'paragraph',
      _key: key,
      text,
      html,
      ...(block.style === 'blockquote' ? { quote: true } : {}),
    });
  });

  flushList();
  return result;
}

function portableTextToParagraphs(body: SanityPortableBlock[] | null | undefined): string[] {
  return portableTextToContentBlocks(body)
    .filter((block): block is Extract<BlogContentBlock, { _type: 'paragraph' }> => block._type === 'paragraph')
    .map((block) => block.text); // plain text only — used for excerpts and lead paragraphs
}

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
      title: post.title,
      description: excerpt,
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
      subtitle: 'Replace this banner copy from the Figma file.',
      ctaText: 'Start the assessment',
      ctaHref: '/form',
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
