import type { NavigationContent } from '~/lib/content/types';
import { CONTACT, SOCIAL } from '~/config';

export const navigationData: NavigationContent = {
  header: {
    links: [
      { text: 'Reviews', href: '/reviews' },
      { text: 'Blog', href: '/blog' },
      { text: 'Contact', href: '/contact' },
    ],
    actions: [{ variant: 'primary', text: 'Contact Us', href: '/contact' }],
    phone: {
      text: CONTACT.phone.display,
      href: CONTACT.phone.href,
    },
  },

  footer: {
    links: [
      {
        title: 'Company',
        links: [
          { text: 'Reviews', href: '/reviews' },
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
