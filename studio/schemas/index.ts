// Singletons
import { siteNavigation } from './singletons/navigation';
import { siteFooter } from './singletons/footer';
import { homePage } from './singletons/homePage';
import { contactPage } from './singletons/contactPage';
import { reviewsPage } from './singletons/reviewsPage';
import { lead } from './documents/lead';
import { servicePage } from './documents/servicePage';
import { blogPost } from './documents/blogPost';
import { book } from './documents/book';
import { podcastEpisode } from './documents/podcastEpisode';
import { testimonial } from './documents/testimonial';

// Navigation objects
import { navLink, navSubLink } from './objects/navLink';
import { footerColumn, footerLink, socialLink } from './objects/footerColumn';

// Shared item objects
import {
  statItem,
  infoCardItem,
  serviceItem,
  timelineStep,
  faqItem,
} from './objects/homeObjects';

// Shared section objects (reused across page templates)
import {
  linkedCard,
  pageHero,
  ctaBanner,
  iconPointsSection,
  timelineSection,
  linkedCardsSection,
  infoCardsSection,
  editorialSection,
  comparisonRow,
  comparisonTableSection,
  bulletCardItem,
  bulletCardsSection,
  checklistItem,
  checklistSection,
  yelpReviewItem,
  yelpReviewsSection,
  liveReviewsSection,
  splitContentSection,
  quoteCardItem,
  quoteCardsSection,
  faqsSection,
  formHelpOption,
  contactLink,
  reviewPlatformItem,
  previewImageItem,
} from './objects/sectionObjects';

export const schemaTypes = [
  // Documents
  siteNavigation,
  siteFooter,
  homePage,
  contactPage,
  reviewsPage,
  servicePage,
  blogPost,
  book,
  podcastEpisode,
  testimonial,
  lead,

  // Objects — nav
  navLink,
  navSubLink,

  // Objects — footer
  footerColumn,
  footerLink,
  socialLink,

  // Objects — items
  statItem,
  infoCardItem,
  serviceItem,
  timelineStep,
  faqItem,
  linkedCard,
  quoteCardItem,

  // Objects — page sections
  pageHero,
  ctaBanner,
  iconPointsSection,
  timelineSection,
  linkedCardsSection,
  infoCardsSection,
  editorialSection,
  comparisonRow,
  comparisonTableSection,
  bulletCardItem,
  bulletCardsSection,
  checklistItem,
  checklistSection,
  yelpReviewItem,
  yelpReviewsSection,
  liveReviewsSection,
  splitContentSection,
  quoteCardsSection,
  faqsSection,
  formHelpOption,
  contactLink,
  reviewPlatformItem,
  previewImageItem,
];
