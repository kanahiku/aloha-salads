import type { ContentImage } from './images';

export interface InfoCardItem {
  title: string;
  description: string;
  icon?: string;
}

export interface TimelineStep {
  title: string;
  description: string;
  icon: string;
}

// ─── Shared CMS sections ───────────────────────────────────────────────────────

export interface LinkedCardItem {
  title: string;
  description: string;
  href: string;
  linkText: string;
}

export interface CtaBannerContent {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  showAfterHoursNote?: boolean;
  extraLines?: string[];
  license?: string;
}

export interface IconPointsSection {
  _type: 'iconPointsSection';
  heading: string;
  intro?: string;
  layout?: 'auto' | 'grid' | 'band';
  items: InfoCardItem[];
}

export interface TimelineSection {
  _type: 'timelineSection';
  heading: string;
  intro?: string;
  steps: TimelineStep[];
}

export interface LinkedCardsSection {
  _type: 'linkedCardsSection';
  heading: string;
  intro?: string;
  display?: 'cards' | 'directory';
  items: LinkedCardItem[];
}

export interface InfoCardsSection {
  _type: 'infoCardsSection';
  heading: string;
  intro?: string;
  items: InfoCardItem[];
}

export interface EditorialSection {
  _type: 'editorialSection';
  heading: string;
  paragraphs: string[];
}

export interface ComparisonRow {
  feature: string;
  cell1: string;
  cell2: string;
  cell3?: string;
}

export interface ComparisonTableSection {
  _type: 'comparisonTableSection';
  heading: string;
  intro?: string;
  featureLabel: string;
  column1: string;
  column2: string;
  column3?: string;
  rows: ComparisonRow[];
}

export interface BulletCardItem {
  title: string;
  items: string[];
}

export interface BulletCardsSection {
  _type: 'bulletCardsSection';
  heading: string;
  intro?: string;
  items: BulletCardItem[];
}

export interface ChecklistSection {
  _type: 'checklistSection';
  heading: string;
  intro?: string;
  items: Array<{ text: string }>;
}

export interface YelpReviewItem {
  name: string;
  reviewId: string;
  userId: string;
}

export interface YelpReviewsSection {
  _type: 'yelpReviewsSection';
  heading: string;
  intro?: string;
  items?: YelpReviewItem[];
}

export interface LiveReviewsSection {
  _type: 'liveReviewsSection';
  heading: string;
  intro?: string;
  sources?: 'both' | 'google' | 'yelp';
}

export interface SplitContentSection {
  _type: 'splitContentSection';
  heading: string;
  paragraphs: string[];
  ctaText?: string;
  ctaHref?: string;
  linkText?: string;
  linkHref?: string;
  image?: ContentImage;
  imagePlaceholder?: string;
  isReversed?: boolean;
}

export interface QuoteCardItem {
  name: string;
  quote: string;
}

export interface QuoteCardsSection {
  _type: 'quoteCardsSection';
  heading: string;
  intro?: string;
  items: QuoteCardItem[];
}

export type ServiceSection = (
  | IconPointsSection
  | TimelineSection
  | LinkedCardsSection
  | InfoCardsSection
  | EditorialSection
  | ComparisonTableSection
  | BulletCardsSection
  | ChecklistSection
  | YelpReviewsSection
  | LiveReviewsSection
  | SplitContentSection
  | QuoteCardsSection
) & { surface?: 'white' | 'grey' | 'dark' };

// ─── Blog ─────────────────────────────────────────────────────────────────────
