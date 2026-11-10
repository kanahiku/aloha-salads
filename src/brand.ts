/**
 * Brand tokens — the only file to edit when a Figma file (or a new client)
 * changes colors, type, or radius.
 *
 * Flow:
 * 1. Paste values extracted from Figma (MCP `get_variable_defs`, or walk
 *    fills/text if there is no Variables / Design System frame).
 * 2. `CustomStyles.astro` and `astro.config.ts` read this file at build time.
 * 3. Components never hardcode hex — they use Tailwind tokens backed by these CSS vars.
 *
 * Do not put contact data, GTM, nav links, or page copy here.
 * Those live in `src/config/site.ts`, `src/config/contact.ts`, and siblings.
 */

export const brand = {
  fonts: {
    heading: {
      name: 'Norca',
      cssVariable: '--font-norca',
      provider: 'local' as const,
      fallbacks: ['sans-serif'] as string[],
      src: ['./src/fonts/norca/Regular/Norca.otf'] as [string, ...string[]],
    },
    body: {
      name: 'Host Grotesk',
      cssVariable: '--font-host-grotesk',
      provider: 'google' as const,
      // 600 + italic are required: font-synthesis is off, so <strong>/<em> in blog bodies need real faces.
      weights: ['400', '600'] as string[],
      styles: ['normal', 'italic'] as string[],
      subsets: ['latin'] as string[],
      fallbacks: ['sans-serif'] as string[],
    },
    /** Eyebrows, ticker, quotes — Figma Wreck Script. */
    script: {
      name: 'Wreck Script',
      cssVariable: '--font-wreck-script',
      provider: 'local' as const,
      fallbacks: ['cursive'] as string[],
      src: ['./src/fonts/wreck/Wreck-Script-Exfont0263.ttf'] as [string, ...string[]],
    },
    /** Footer labels — Figma Norca-Rough 18px. */
    rough: {
      name: 'Norca Rough',
      cssVariable: '--font-norca-rough',
      provider: 'local' as const,
      fallbacks: ['sans-serif'] as string[],
      src: ['./src/fonts/norca/Rough/Norca-Rough.otf'] as [string, ...string[]],
    },
  },

  /** Style Guide 110:2377 — named fills. Hover tints are derived. */
  colors: {
    accent: '#994321', // brand/hibiscus
    accentHover: '#B55A32',
    heading: '#3D2819', // text/default
    muted: '#3C2718', // brand/cacao
    eyebrow: '#778074', // brand/seaweed-dark
    page: '#EFE9DE', // brand/shell · text/contrast
    sectionGrey: '#B5C2B0', // brand/seaweed
    sectionDark: '#5A6A72', // brand/blueberry darkened to 4.5:1 with cream text
    card: '#FAF4E8', // background/white
    cardMist: '#B5C2B0',
    cardDark: '#8FA1AB', // brand/blueberry-light
    ctaBg: '#9B9D47', // accent/green-light
    ctaEnd: '#6A714F', // accent/green
    ctaTan: '#9B9D47',
    tanText: '#6A714F',
    tanBody: '#3C2718',
    ctaPink: '#EFE9DE',
    ctaPinkText: '#994321',
    featureCard: '#FAF4E8',
    primary: '#994321',
    secondary: '#778074',
    navy: '#3C2718',
    white: '#FAF4E8',
    cream: '#EFE9DE',
    nav: '#778074',
    black: '#3D2819',
    /** gradient/blue-green — Figma from #8CAC7F to blueberry-light. Used as page-motif band bg. */
    gradientFrom: '#8CAC7F',
    gradientTo: '#8FA1AB',
    /** Page wash — warm cream from top to bottom (sits on top of the green band). */
    pageWashFrom: '#E6E0D5',
    pageWashTo: '#FCF6EA',
  },

  type: {
    /**
     * Style Guide 110:2377 (desktop). No mobile type in the file —
     * mobile sizes are an optical scale (not a flat %), so Norca-Rough
     * still has a clear h1 > h2 > h3 step on a 390px screen.
     * Faces: h1–h3 + button = Norca-Rough; tag/accent/quote = Wreck Script;
     * body = Host Grotesk.
     */
    h1: { size: '72px', mobile: '40px', lineHeight: '1', tracking: '0' },
    h2: { size: '52px', mobile: '28px', lineHeight: '1', tracking: '0' },
    h3: { size: '26px', mobile: '22px', lineHeight: '1', tracking: '0' },
    /** Extra — not in the Style Guide. */
    h4: { size: '24px', mobile: '18px', lineHeight: '1', tracking: '0' },
    body: { size: '14px', mobile: '14px', lineHeight: '1.3', tracking: '-0.01em' },
    bodyLg: { size: '16px', mobile: '15px', lineHeight: '1.3', tracking: '-0.01em' },
    button: { size: '14px', mobile: '14px', lineHeight: '1', tracking: '0' },
    /** Figma `tag`; bumped slightly for retained cursive section labels. */
    eyebrow: { size: '19px', mobile: '19px', lineHeight: '1', tracking: '0' },
    small: { size: '12px', mobile: '12px', lineHeight: '1.3', tracking: '-0.01em' },
    caption: { size: '11px', mobile: '11px', lineHeight: '1.3', tracking: '0' },
    /** Footer column titles — extra, not in the Style Guide. */
    label: { size: '18px', mobile: '16px', lineHeight: '1', tracking: '0.06em' },
    /** Figma `accent`. */
    ticker: { size: '32px', mobile: '24px', lineHeight: '1', tracking: '0' },
    /** Figma `quote`. */
    quote: { size: '22px', mobile: '18px', lineHeight: '1.2', tracking: '0' },
  },

  radius: {
    base: '0px',
    lg: '0px',
    xl: '0px',
    hero: '0px',
    full: '9999px',
  },

  motif: {
    heroOpacity: 0,
    darkOpacity: 0,
    greyOpacity: 0,
    whiteOpacity: 0,
    ctaOpacity: 0,
    /** Page wallpaper leaf overlay — cacao on the green–blue gradient. */
    pageOpacity: 0.22,
    ctaColor: '#3D2819',
  },
} as const;

export type Brand = typeof brand;

import { darkVars, rgb, rootVars } from './lib/brandCss';

export { hexToChannels, rgb } from './lib/brandCss';

/** Full stylesheet injected by CustomStyles.astro. */
export function brandStylesheet(b: Brand = brand): string {
  const accent = rgb(b.colors.accent, 0.3);
  return `:root {
  ${rootVars(b)}

  ::selection {
    background-color: ${accent};
  }
}

.dark {
  ${darkVars(b)}

  ::selection {
    background-color: ${accent};
    color: snow;
  }
}`;
}

/** Astro Fonts API entries — used by astro.config.ts and Layout.astro. */
export function brandFontConfig() {
  const { heading, body, script, rough } = brand.fonts;
  return [
    {
      name: heading.name,
      cssVariable: heading.cssVariable,
      provider: heading.provider,
      fallbacks: heading.fallbacks,
      preload: false,
      options: { variants: [{ weight: 400, style: 'normal' as const, src: heading.src }] },
    },
    {
      name: body.name,
      cssVariable: body.cssVariable,
      provider: body.provider,
      weights: body.weights,
      styles: body.styles,
      subsets: body.subsets,
      fallbacks: body.fallbacks,
      preload: true,
    },
    {
      name: script.name,
      cssVariable: script.cssVariable,
      provider: script.provider,
      fallbacks: script.fallbacks,
      preload: true,
      options: { variants: [{ weight: 400, style: 'normal' as const, src: script.src }] },
    },
    {
      name: rough.name,
      cssVariable: rough.cssVariable,
      provider: rough.provider,
      fallbacks: rough.fallbacks,
      preload: true,
      options: { variants: [{ weight: 400, style: 'normal' as const, src: rough.src }] },
    },
  ];
}
