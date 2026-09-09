import type { ChapterLocation } from '~/components/widgets/ChaptersList.astro';

/** Shared chapter rows for homepage + /chapters (Figma 2:323 / 64:1032). */
export const chapterLocations: ChapterLocation[] = [
  { name: 'Kailua ʻohana', memberCount: 142, href: '/chapters/kailua' },
  { name: 'Honolulu ʻohana', memberCount: 142, href: '/chapters/honolulu' },
  { name: 'Hilo · Maui · Kauaʻi · Kona', memberCount: 142, href: '/chapters/hilo' },
  { name: 'Waimea starting ʻohana', memberCount: 142, href: '/chapters/waimea' },
];
