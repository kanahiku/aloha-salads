import type { NavigationContent } from '~/lib/content/types';
import { CONTACT, PRIMARY_CTA_LABEL, PRIMARY_CTA_HREF, SOCIAL } from '~/config';
import { cateringPages } from '~/data/catering';

const cateringNavLinks = cateringPages.map(({ label, href }) => ({ text: label, href }));

export const navigationData: NavigationContent = {
  header: {
    links: [
      {
        text: 'menu',
        href: '/menu',
        links: [
          { text: 'Salads', href: '/menu/salads' },
          { text: 'Wraps & Subs', href: '/menu/wraps-subs' },
          { text: 'Soups', href: '/menu/soups' },
          { text: 'Keiki / Kids', href: '/menu/kids' },
          { text: 'Design Your Own Salad', href: '/menu/design-your-own-salad' },
          { text: 'Vegetarian Options', href: '/menu/vegetarian' },
          { text: 'Healthy Options', href: '/menu/healthy-options' },
          { text: 'Misc', href: '/menu/misc' },
          { text: 'Drinks', href: '/menu/drinks' },
        ],
      },
      {
        text: 'catering',
        href: '/catering',
        links: cateringNavLinks,
      },
      {
        text: 'locations',
        href: '/locations',
        links: [
          { text: 'Kailua', href: '/locations/kailua' },
          { text: 'Kahala', href: '/locations/kahala' },
          { text: 'Kaneohe', href: '/locations/kaneohe' },
          { text: 'Kapolei', href: '/locations/kapolei' },
          { text: 'Mililani', href: '/locations/mililani' },
          { text: 'Pearlridge', href: '/locations/pearlridge' },
        ],
      },
      {
        text: 'about',
        href: '/about',
        links: [
          { text: 'Our Story', href: '/about' },
          { text: 'Our Ingredients', href: '/ingredients' },
          { text: 'Blog', href: '/blog' },
          { text: 'Work With Us', href: '/careers' },
        ],
      },
    ],
    actions: [{ variant: 'primary', text: PRIMARY_CTA_LABEL, href: PRIMARY_CTA_HREF }],
  },

  footer: {
    links: [
      {
        title: 'menu',
        links: [
          { text: 'Full Menu', href: '/menu' },
          { text: 'Salads', href: '/menu/salads' },
          { text: 'Wraps & Subs', href: '/menu/wraps-subs' },
          { text: 'Soups', href: '/menu/soups' },
          { text: 'Kids Menu', href: '/menu/kids' },
          { text: 'Design Your Own Salad', href: '/menu/design-your-own-salad' },
          { text: 'Vegetarian Options', href: '/menu/vegetarian' },
          { text: 'Misc', href: '/menu/misc' },
          { text: 'Nutrition & Allergens', href: '/nutrition-allergens' },
        ],
      },
      {
        title: 'catering',
        links: [{ text: 'Catering', href: '/catering' }, ...cateringNavLinks],
      },
      {
        title: 'locations',
        links: [
          { text: 'All Locations', href: '/locations' },
          { text: 'Kailua', href: '/locations/kailua' },
          { text: 'Kahala', href: '/locations/kahala' },
          { text: 'Kaneohe', href: '/locations/kaneohe' },
          { text: 'Kapolei', href: '/locations/kapolei' },
          { text: 'Mililani', href: '/locations/mililani' },
          { text: 'Pearlridge', href: '/locations/pearlridge' },
        ],
      },
      {
        title: 'aloha salads',
        links: [
          { text: 'Our Story', href: '/about' },
          { text: 'Our Ingredients', href: '/ingredients' },
          { text: 'Order Online', href: PRIMARY_CTA_HREF },
          { text: 'Gift Cards', href: '/gift-cards' },
          { text: 'Press & Media', href: '/press' },
          { text: 'Work With Us', href: '/careers' },
          { text: 'Blog', href: '/blog' },
          { text: 'Contact', href: '/contact' },
        ],
      },
    ],
    secondaryLinks: [
      { text: 'Privacy Policy', href: '/privacy-policy' },
      { text: 'Terms', href: '/terms' },
      { text: 'Accessibility', href: '/accessibility' },
    ],
    socialLinks: SOCIAL.nav as unknown as NavigationContent['footer']['socialLinks'],
    footNote: `&copy; ${new Date().getFullYear()} ${CONTACT.businessName}. All rights reserved.`,
  },
};
