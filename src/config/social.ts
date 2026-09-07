/**
 * Social and directory profile links.
 * Replace every URL when setting up a new site.
 */
export const SOCIAL = {
  nav: [
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/',
    },
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/',
    },
  ],

  sameAs: ['https://www.facebook.com/', 'https://www.instagram.com/'],
} as const;
