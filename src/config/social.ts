/**
 * Social and directory profile links.
 * Replace every URL when setting up a new site.
 */
export const SOCIAL = {
  nav: [
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/AlohaSalads',
    },
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/alohasalads/',
    },
    {
      ariaLabel: 'Twitter / X',
      icon: 'tabler:brand-x',
      href: 'https://twitter.com/AlohaSalads',
    },
  ],

  sameAs: [
    'https://www.facebook.com/AlohaSalads',
    'https://www.instagram.com/alohasalads/',
    'https://twitter.com/AlohaSalads',
  ],
} as const;
