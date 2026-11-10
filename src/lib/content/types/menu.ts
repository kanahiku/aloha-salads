import type { ContentImage } from './images';
import type { FaqEntry } from './pages';

export interface MenuItem {
  title: string;
  slug?: string;
  description?: string;
  badge?: string;
  note?: string;
  image?: ContentImage;
}

export interface MenuCategory {
  title: string;
  slug?: string;
  href?: string;
  description?: string;
  items: MenuItem[];
}

// ─── Shared CMS sections (blog articles) ───────────────────────────────────────

/** One dish row on a menu page. */
export interface MenuListItem {
  title: string;
  description?: string;
  badge?: string;
  note?: string;
  image?: ContentImage;
}

/** Labels shared by the Menu page and every menu sub-page. */
export interface MenuSharedContent {
  orderLabel: string;
  locationLabel: string;
  cateringLabel: string;
  faqTitle: string;
  readyTitle: string;
  exploreTitle: string;
}

/** Name + one-line description on a menu category card (homepage and menu pages). */
export interface MenuCardCopy {
  slug: string;
  label: string;
  description: string;
}

export interface MenuSourcingContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  image?: ContentImage;
}

/** Menu landing page (/menu). The dishes come from Menu categories and items. */
export interface MenuHubContent {
  meta: { title: string; description: string };
  hero: { title: string; content: string; image?: ContentImage };
  fullMenu: { title: string; subtitle: string; categoryLinkLabel: string };
  sourcing: MenuSourcingContent;
  cta: { subtitle: string };
  faqs: FaqEntry[];
}

/** One menu sub-page (/menu/<slug>). */
export interface MenuSubpageContent {
  slug: string;
  /** Name used in the Studio sidebar and as the page's internal label. */
  title: string;
  meta: { title: string; description: string };
  hero: { title: string; content: string; image?: ContentImage };
  /** Heading above the dish list. Absent on pages that show a build guide instead. */
  list?: { title: string; intro?: string };
  /** When set, replaces the category's dishes (used by Healthy Food). */
  customItems?: MenuListItem[];
  sourcing: MenuSourcingContent;
  explore: { subtitle: string };
  cta: { subtitle: string };
  faqs: FaqEntry[];
  /** "How to build" guide (Design Your Own Salad). */
  build?: {
    title: string;
    subtitle: string;
    note: string;
    ctaLabel: string;
    steps: Array<{ title: string; description: string }>;
    image?: ContentImage;
  };
}
