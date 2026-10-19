// Singletons
import { siteNavigation } from './singletons/navigation';
import { announcementBar } from './singletons/announcementBar';
import { siteFooter } from './singletons/footer';
import { homepageContent } from './singletons/homepage';
import { aboutContent } from './singletons/about';
import { cateringContent } from './singletons/catering';
import { cateringSubpage } from './singletons/cateringSubpage';
import { interiorPage } from './singletons/interiorPage';
import { pressPage } from './singletons/pressPage';
import { reviewsPage } from './singletons/reviewsPage';
import { legalPage } from './singletons/legalPage';
import { careersContent } from './singletons/careers';
import { locationsContent } from './singletons/locations';
import { locationPage } from './singletons/locationPage';
import { ingredientsContent } from './singletons/ingredients';
import { menuHub } from './singletons/menuHub';
import { menuSubpage } from './singletons/menuSubpage';
import { blogPost } from './documents/blogPost';
import { testimonial } from './documents/testimonial';
import { menuCategory } from './documents/menuCategory';
import { menuItem } from './documents/menuItem';
import { pressItem } from './documents/pressItem';

// Navigation objects
import { navLink, navSubLink } from './objects/navLink';
import { faqItem, occasionCard } from './objects/pageBlocks';
import { footerColumn, footerLink, socialLink } from './objects/footerColumn';

export const schemaTypes = [
  // Documents
  announcementBar,
  siteNavigation,
  siteFooter,
  homepageContent,
  aboutContent,
  cateringContent,
  cateringSubpage,
  interiorPage,
  pressPage,
  reviewsPage,
  legalPage,
  careersContent,
  locationsContent,
  locationPage,
  ingredientsContent,
  menuHub,
  menuSubpage,
  blogPost,
  testimonial,
  menuCategory,
  menuItem,
  pressItem,

  // Objects — nav
  navLink,
  navSubLink,

  // Objects — page blocks
  faqItem,
  occasionCard,

  // Objects — footer
  footerColumn,
  footerLink,
  socialLink,
];
