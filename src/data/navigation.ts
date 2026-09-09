import type { NavigationContent } from '~/lib/content/types';
import { CONTACT, PRIMARY_CTA_LABEL, SOCIAL } from '~/config';

export const navigationData: NavigationContent = {
  header: {
    links: [
      { text: 'How Aging Works', href: '/how-aging-works' },
      { text: 'Four Pillars', href: '/four-pillars' },
      { text: 'Chapters', href: '/chapters' },
      { text: 'Guidebooks', href: '/guidebooks' },
      { text: 'Books', href: '/books' },
      { text: 'Podcasts', href: '/podcast' },
      { text: 'About', href: '/about' },
    ],
    actions: [{ variant: 'primary', text: PRIMARY_CTA_LABEL, href: '/contact' }],
  },

  footer: {
    links: [
      {
        title: 'the work',
        links: [
          { text: 'How Aging Works', href: '/how-aging-works' },
          { text: 'Four Pillars', href: '/four-pillars' },
          { text: 'Guidebook Series', href: '/guidebooks' },
          { text: 'Journal Club', href: '/#journal-club' },
        ],
      },
      {
        title: 'chapters',
        links: [
          { text: 'Kailua', href: '/#kailua' },
          { text: 'Honolulu', href: '/#honolulu' },
          { text: 'Hilo • Kona', href: '/#hilo-kona' },
          { text: 'Maui', href: '/#maui' },
          { text: 'Waimea', href: '/#waimea' },
        ],
      },
      {
        title: 'Join',
        links: [
          { text: 'First Visit', href: '/#first-visit' },
          { text: 'Membership', href: '/#membership' },
          { text: 'Start a chapter', href: '/#start-a-chapter' },
          { text: 'Books', href: '/#books' },
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
