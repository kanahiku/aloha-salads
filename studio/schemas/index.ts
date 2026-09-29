// Singletons
import { siteNavigation } from './singletons/navigation';
import { siteFooter } from './singletons/footer';
import { blogPost } from './documents/blogPost';
import { testimonial } from './documents/testimonial';
import { menuCategory } from './documents/menuCategory';
import { menuItem } from './documents/menuItem';

// Navigation objects
import { navLink, navSubLink } from './objects/navLink';
import { footerColumn, footerLink, socialLink } from './objects/footerColumn';

export const schemaTypes = [
  // Documents
  siteNavigation,
  siteFooter,
  blogPost,
  testimonial,
  menuCategory,
  menuItem,

  // Objects — nav
  navLink,
  navSubLink,

  // Objects — footer
  footerColumn,
  footerLink,
  socialLink,
];
