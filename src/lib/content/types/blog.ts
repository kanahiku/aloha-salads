import type { ContentImage } from './images';
import type { CtaBannerContent, ServiceSection } from './sections';

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  author?: string;
  image?: ContentImage;
  imagePlaceholder?: string;
  meta: {
    title: string;
    description: string;
  };
  /** Page paths (no leading slash) where this post should appear in Related blogs. */
  relatedPages: string[];
  heroParagraphs: string[];
  sections: ServiceSection[];
  ctaBanner: CtaBannerContent;
  /** Fallback plain paragraphs when a CMS post has no structured sections. */
  body: string[];
  /** Article body in document order, including inline images from Sanity. */
  contentBlocks?: BlogContentBlock[];
}

export type BlogContentBlock =
  | BlogContentParagraph
  | BlogContentHeading
  | BlogContentImage
  | BlogContentList
  | BlogContentTable
  | BlogContentCallout
  | BlogContentEmbed
  | BlogContentHtmlEmbed
  | BlogContentCarousel
  | BlogContentImageRow
  | BlogContentFaq;

export interface BlogContentParagraph {
  _type: 'paragraph';
  _key: string;
  /** Plain text — used for excerpts, lead paragraphs, and TOC. */
  text: string;
  /** HTML string with inline formatting (bold, italic, links). Use set:html to render. */
  html: string;
  quote?: boolean;
}

export interface BlogContentHeading {
  _type: 'heading';
  _key: string;
  level: 2 | 3 | 4;
  text: string;
  /** Question inside a "Frequently Asked Questions" section. */
  faq?: boolean;
}

export interface BlogContentImage {
  _type: 'image';
  _key: string;
  image: ContentImage;
  caption?: string;
}

export interface BlogContentList {
  _type: 'list';
  _key: string;
  listType: 'bullet' | 'number';
  items: BlogContentListItem[];
}

export interface BlogContentListItem {
  _key: string;
  /** HTML string with inline formatting. Use set:html to render. */
  html: string;
  level: number;
}

export interface BlogContentTable {
  _type: 'table';
  _key: string;
  caption?: string;
  headerRow: string[];
  rows: { _key: string; cells: string[] }[];
}

export interface BlogContentCallout {
  _type: 'callout';
  _key: string;
  calloutType: 'tip' | 'info' | 'warning' | 'note';
  text: string;
}

export interface BlogContentEmbed {
  _type: 'embed';
  _key: string;
  /** Only allow-listed hosts (Google Maps, YouTube, Vimeo) reach the renderer. */
  url: string;
  title: string;
  height: number;
}

/** Author-pasted HTML (Instagram embed, interactive widget). Rendered in a sandboxed iframe, never inline. */
export interface BlogContentHtmlEmbed {
  _type: 'htmlEmbed';
  _key: string;
  title: string;
  code: string;
}

export interface BlogContentCarousel {
  _type: 'imageCarousel';
  _key: string;
  images: { _key: string; image: ContentImage; caption?: string }[];
}

/** Images placed side by side in one Word paragraph, each with an optional title below. */
export interface BlogContentImageRow {
  _type: 'imageRow';
  _key: string;
  images: { _key: string; image: ContentImage; caption?: string }[];
}

export interface BlogContentFaqItem {
  _key?: string;
  question: string;
  /** Answer HTML. Several paragraphs are separate `<p>` elements. */
  answer: string;
}

/** Questions under a "Frequently Asked Questions" heading, rendered as an accordion. */
export interface BlogContentFaq {
  _type: 'faq';
  _key: string;
  items: BlogContentFaqItem[];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
