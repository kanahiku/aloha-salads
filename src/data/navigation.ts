import type { NavigationContent } from '~/lib/content/types';
import { CONTACT, PRIMARY_CTA_LABEL, PRIMARY_CTA_HREF, SOCIAL } from '~/config';

export const navigationData: NavigationContent = {
  header: {
    links: [
      { text: 'menu', href: '/menu' },
      { text: 'catering', href: '/catering' },
      { text: 'locations', href: '/locations' },
      { text: 'about', href: '/about' },
      { text: 'blog', href: '/blog' },
    ],
    actions: [{ variant: 'primary', text: PRIMARY_CTA_LABEL, href: PRIMARY_CTA_HREF }],
  },

  footer: {
    links: [
      {
        title: 'menu',
        links: [
          { text: 'Full Menu', href: '/menu' },
          { text: 'Salads', href: '/menu' },
          { text: 'Wraps & Subs', href: '/menu' },
          { text: 'Soups', href: '/menu' },
          { text: 'Kids Menu', href: '/menu' },
          { text: 'Design Your Own Salad', href: '/menu' },
          { text: 'Vegan Options', href: '/menu' },
          { text: 'Vegetarian Options', href: '/menu' },
          { text: 'Nutrition & Allergens', href: '/menu' },
        ],
      },
      {
        title: 'catering',
        links: [
          { text: 'Catering', href: '/catering' },
          { text: 'Corporate', href: '/catering' },
          { text: 'Office Lunch', href: '/catering' },
          { text: 'Meeting', href: '/catering' },
          { text: 'Event', href: '/catering' },
          { text: 'Party', href: '/catering' },
          { text: 'School', href: '/catering' },
          { text: 'Large Group', href: '/catering' },
        ],
      },
      {
        title: 'locations',
        links: [
          { text: 'All Locations', href: '/locations' },
          { text: 'Kailua', href: '/locations' },
          { text: 'Kahala', href: '/locations' },
          { text: 'Kaneohe', href: '/locations' },
          { text: 'Kapolei', href: '/locations' },
          { text: 'Mililani', href: '/locations' },
          { text: 'Pearlridge', href: '/locations' },
        ],
      },
      {
        title: 'about',
        links: [
          { text: 'Our Story', href: '/about' },
          { text: 'Our Ingredients', href: '/about' },
          { text: 'Order Online', href: PRIMARY_CTA_HREF },
          { text: 'Gift Cards', href: '/about' },
          { text: 'Press & Media', href: '/about' },
          { text: 'Careers', href: '/about' },
          { text: 'Blog', href: '/blog' },
          { text: 'Contact', href: '/contact' },
        ],
      },
    ],
    secondaryLinks: [
      { text: 'Privacy Policy', href: '/privacy-policy' },
      { text: 'Terms of Service', href: '/terms-of-service' },
      { text: 'Accessibility', href: '/accessibility' },
    ],
    socialLinks: SOCIAL.nav as unknown as NavigationContent['footer']['socialLinks'],
    footNote: `&copy; ${new Date().getFullYear()} ${CONTACT.businessName}. All rights reserved.`,
  },
};
