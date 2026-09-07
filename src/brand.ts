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
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      weights: ['400'] as string[],
      styles: ['normal'] as string[],
      subsets: ['latin'] as string[],
    },
    body: {
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: ['200 800'] as string[],
      styles: ['normal'] as string[],
      subsets: ['latin'] as string[],
    },
  },

  colors: {
    accent: '#EDD974',
    accentHover: '#D4BC57',
    heading: '#222222',
    muted: '#444444',
    page: '#FFFFFF',
    sectionGrey: '#FAFAFA',
    sectionDark: '#000000',
    cardDark: '#222222',
    ctaBg: '#F5ECBD',
    primary: '#4F5E65',
    secondary: '#A2AFB5',
    navy: '#082244',
    white: '#FFFFFF',
    black: '#000000',
  },

  radius: {
    base: '0px',
    full: '0px',
  },

  motif: {
    heroOpacity: 0.1,
    darkOpacity: 0.12,
    greyOpacity: 0.08,
    whiteOpacity: 0.08,
    ctaOpacity: 0.02,
    ctaColor: '#000000',
  },
} as const;

export type Brand = typeof brand;

/** Strip # and expand 3-digit hex. */
export function hexToChannels(hex: string): string {
  const raw = hex.replace('#', '').trim();
  const h =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  const n = Number.parseInt(h, 16);
  if (Number.isNaN(n)) return '0 0 0';
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** `rgb(237 217 116)` or `rgb(237 217 116 / 50%)`. */
export function rgb(hex: string, alpha?: number): string {
  const channels = hexToChannels(hex);
  if (alpha === undefined) return `rgb(${channels})`;
  const a = alpha <= 1 ? `${Math.round(alpha * 100)}%` : String(alpha);
  return `rgb(${channels} / ${a})`;
}

function rootVars(b: Brand): string {
  const { colors: c, fonts: f, radius: r, motif: m } = b;
  const accent = rgb(c.accent);
  const accentHover = rgb(c.accentHover);
  const heading = rgb(c.heading);
  const muted = rgb(c.muted);

  return `
    --aw-font-sans: var(${f.body.cssVariable});
    --aw-font-serif: var(${f.body.cssVariable});
    --aw-font-heading: var(${f.heading.cssVariable});

    --aw-color-primary: ${rgb(c.primary)};
    --aw-color-secondary: ${rgb(c.secondary)};
    --aw-color-accent: ${accent};
    --aw-color-accent-hover: ${accentHover};

    --aw-color-text-heading: ${heading};
    --aw-color-text-default: ${muted};
    --aw-color-text-muted: ${muted};
    --aw-color-bg-page: ${rgb(c.page)};
    --aw-color-bg-section-white: ${rgb(c.page)};
    --aw-color-bg-section-grey: ${rgb(c.sectionGrey)};
    --aw-color-bg-section-dark: ${rgb(c.sectionDark)};
    --aw-color-bg-card-dark: ${rgb(c.cardDark)};
    --aw-color-bg-card-light: ${rgb(c.accent, 0.5)};
    --aw-color-bg-cta: ${rgb(c.ctaBg)};

    --aw-color-card-heading-dark: ${rgb(c.white)};
    --aw-color-card-body-dark: ${rgb(c.white, 0.6)};
    --aw-color-card-link-dark: var(--aw-color-accent);

    --aw-color-card-heading-light: var(--aw-color-text-heading);
    --aw-color-card-body-light: var(--aw-color-text-muted);
    --aw-color-card-link-light: var(--aw-color-text-heading);

    --aw-color-card-border-dark: ${rgb(c.accent, 0.6)};
    --aw-color-card-border-light: transparent;

    --aw-color-bg-card-outlined: ${rgb(c.white)};
    --aw-color-card-border-outlined: ${rgb(c.black, 0.12)};
    --aw-color-card-heading-outlined: var(--aw-color-text-heading);
    --aw-color-card-body-outlined: var(--aw-color-text-muted);
    --aw-color-card-link-outlined: var(--aw-color-text-heading);

    --aw-color-bg-card-glass: ${rgb(c.white, 0.08)};
    --aw-color-card-border-glass: ${rgb(c.white, 0.15)};
    --aw-color-card-heading-glass: ${rgb(c.white)};
    --aw-color-card-body-glass: ${rgb(c.white, 0.7)};
    --aw-color-card-link-glass: var(--aw-color-accent);

    --aw-color-btn-primary-bg: var(--aw-color-accent);
    --aw-color-btn-primary-text: ${rgb(c.black)};
    --aw-color-btn-primary-border: var(--aw-color-accent);
    --aw-color-btn-primary-bg-hover: var(--aw-color-accent-hover);
    --aw-color-btn-primary-text-hover: ${rgb(c.black)};
    --aw-color-btn-primary-border-hover: var(--aw-color-accent-hover);

    --aw-color-btn-secondary-bg: transparent;
    --aw-color-btn-secondary-text: ${rgb(c.black)};
    --aw-color-btn-secondary-border: ${rgb(c.black)};
    --aw-color-btn-secondary-bg-hover: ${rgb(c.black)};
    --aw-color-btn-secondary-text-hover: ${rgb(c.white)};
    --aw-color-btn-secondary-border-hover: ${rgb(c.black)};

    --aw-color-btn-ghost-light-bg: transparent;
    --aw-color-btn-ghost-light-text: ${rgb(c.black)};
    --aw-color-btn-ghost-light-border: ${rgb(c.black)};
    --aw-color-btn-ghost-light-bg-hover: ${rgb(c.black)};
    --aw-color-btn-ghost-light-text-hover: ${rgb(c.white)};
    --aw-color-btn-ghost-light-border-hover: ${rgb(c.black)};

    --aw-color-btn-ghost-dark-bg: transparent;
    --aw-color-btn-ghost-dark-text: ${rgb(c.white)};
    --aw-color-btn-ghost-dark-border: var(--aw-color-accent);
    --aw-color-btn-ghost-dark-bg-hover: var(--aw-color-accent);
    --aw-color-btn-ghost-dark-text-hover: ${rgb(c.black)};
    --aw-color-btn-ghost-dark-border-hover: var(--aw-color-accent);

    --aw-color-btn-link: var(--aw-color-accent);
    --aw-color-btn-link-hover: var(--aw-color-accent-hover);

    --aw-color-headline-light: var(--aw-color-text-heading);
    --aw-color-headline-dark: ${rgb(c.white)};
    --aw-color-headline-subtitle-light: var(--aw-color-text-muted);
    --aw-color-headline-subtitle-dark: ${rgb(c.white, 0.7)};

    --aw-color-timeline-icon-light: var(--aw-color-text-heading);
    --aw-color-timeline-icon-border-light: transparent;
    --aw-color-timeline-icon-bg-light: var(--aw-color-bg-cta);
    --aw-color-timeline-step-light: var(--aw-color-text-muted);
    --aw-color-timeline-title-light: var(--aw-color-text-heading);
    --aw-color-timeline-desc-light: var(--aw-color-text-muted);

    --aw-color-timeline-icon-dark: var(--aw-color-text-heading);
    --aw-color-timeline-icon-border-dark: transparent;
    --aw-color-timeline-icon-bg-dark: var(--aw-color-bg-cta);
    --aw-color-timeline-title-dark: ${rgb(c.white)};
    --aw-color-timeline-desc-dark: ${rgb(c.white, 0.6)};

    --aw-color-testimonial-card-bg-light: ${rgb(c.accent, 0.5)};
    --aw-color-testimonial-card-border-light: transparent;
    --aw-color-testimonial-text-light: var(--aw-color-text-muted);
    --aw-color-testimonial-name-light: var(--aw-color-text-heading);
    --aw-color-testimonial-job-light: var(--aw-color-text-muted);
    --aw-color-testimonial-hr-light: rgb(226 232 240);

    --aw-color-testimonial-card-bg-dark: ${rgb(c.white, 0.05)};
    --aw-color-testimonial-card-border-dark: ${rgb(c.white, 0.15)};
    --aw-color-testimonial-text-dark: ${rgb(c.white, 0.7)};
    --aw-color-testimonial-name-dark: ${rgb(c.white)};
    --aw-color-testimonial-job-dark: ${rgb(c.white, 0.5)};
    --aw-color-testimonial-hr-dark: ${rgb(c.white, 0.1)};

    --aw-color-faq-border-light: ${rgb(c.accent, 0.45)};
    --aw-color-faq-question-light: var(--aw-color-text-heading);
    --aw-color-faq-answer-light: var(--aw-color-text-muted);
    --aw-color-faq-toggle-border-light: rgb(209 213 219);
    --aw-color-faq-toggle-text-light: rgb(107 114 128);
    --aw-color-faq-toggle-active-light: var(--aw-color-accent);

    --aw-color-faq-border-dark: ${rgb(c.white, 0.2)};
    --aw-color-faq-question-dark: ${rgb(c.white)};
    --aw-color-faq-answer-dark: var(--aw-color-accent);
    --aw-color-faq-toggle-border-dark: ${rgb(c.white, 0.3)};
    --aw-color-faq-toggle-text-dark: ${rgb(c.white, 0.5)};
    --aw-color-faq-toggle-active-dark: var(--aw-color-accent);

    --aw-color-projects-card-bg-light: ${rgb(c.accent, 0.5)};
    --aw-color-projects-card-border-light: transparent;
    --aw-color-projects-title-light: var(--aw-color-text-heading);
    --aw-color-projects-desc-light: var(--aw-color-text-muted);

    --aw-color-projects-card-bg-dark: ${rgb(c.cardDark)};
    --aw-color-projects-card-border-dark: ${rgb(c.accent, 0.6)};
    --aw-color-projects-title-dark: ${rgb(c.white)};
    --aw-color-projects-desc-dark: ${rgb(c.white, 0.6)};

    --aw-color-bg-page-dark: ${rgb(c.navy)};

    --aw-color-motif-hero: var(--aw-color-accent);
    --aw-color-motif-dark: var(--aw-color-accent);
    --aw-color-motif-grey: var(--aw-color-accent);
    --aw-color-motif-white: var(--aw-color-accent);
    --aw-color-motif-cta: ${rgb(m.ctaColor)};

    --aw-opacity-motif-hero: ${m.heroOpacity};
    --aw-opacity-motif-dark: ${m.darkOpacity};
    --aw-opacity-motif-grey: ${m.greyOpacity};
    --aw-opacity-motif-white: ${m.whiteOpacity};
    --aw-opacity-motif-cta: ${m.ctaOpacity};

    --aw-shadow-card: none;
    --aw-shadow-header: 0 0.25rem 3.5rem 0 color-mix(in srgb, var(--aw-color-accent) 16%, transparent);
    --aw-border-card: rgba(255, 255, 255, 0.16);

    --aw-radius: ${r.base};
    --aw-radius-full: ${r.full};
  `.trim();
}

function darkVars(b: Brand): string {
  const { colors: c, fonts: f, motif: m } = b;
  const accent = rgb(c.accent);

  return `
    --aw-font-sans: var(${f.body.cssVariable});
    --aw-font-serif: var(${f.body.cssVariable});
    --aw-font-heading: var(${f.heading.cssVariable});

    --aw-color-primary: ${accent};
    --aw-color-secondary: ${rgb(c.accentHover)};
    --aw-color-accent: ${accent};
    --aw-color-accent-hover: ${rgb(c.accentHover)};

    --aw-color-text-heading: rgb(247 250 252);
    --aw-color-text-default: rgb(226 232 240);
    --aw-color-text-muted: ${rgb(c.secondary)};
    --aw-color-bg-page: ${rgb(c.navy)};
    --aw-color-bg-section-white: ${rgb(c.navy)};
    --aw-color-bg-section-grey: rgb(12 45 90);
    --aw-color-bg-section-dark: ${rgb(c.black)};
    --aw-color-bg-card-dark: ${rgb(c.cardDark)};
    --aw-color-bg-card-light: rgb(12 45 90);
    --aw-color-bg-cta: ${rgb(c.ctaBg)};

    --aw-color-card-heading-dark: ${rgb(c.white)};
    --aw-color-card-body-dark: ${rgb(c.white, 0.6)};
    --aw-color-card-link-dark: var(--aw-color-accent);

    --aw-color-card-heading-light: rgb(247 250 252);
    --aw-color-card-body-light: ${rgb(c.secondary)};
    --aw-color-card-link-light: var(--aw-color-accent);

    --aw-color-card-border-dark: ${rgb(c.accent, 0.6)};
    --aw-color-card-border-light: ${rgb(c.accent, 0.5)};

    --aw-color-btn-primary-bg: var(--aw-color-accent);
    --aw-color-btn-primary-text: ${rgb(c.black)};
    --aw-color-btn-primary-border: var(--aw-color-accent);
    --aw-color-btn-primary-bg-hover: var(--aw-color-accent-hover);
    --aw-color-btn-primary-text-hover: ${rgb(c.black)};
    --aw-color-btn-primary-border-hover: var(--aw-color-accent-hover);

    --aw-color-btn-secondary-bg: transparent;
    --aw-color-btn-secondary-text: ${rgb(c.white)};
    --aw-color-btn-secondary-border: ${rgb(c.white)};
    --aw-color-btn-secondary-bg-hover: ${rgb(c.white)};
    --aw-color-btn-secondary-text-hover: ${rgb(c.black)};
    --aw-color-btn-secondary-border-hover: ${rgb(c.white)};

    --aw-color-btn-ghost-light-bg: transparent;
    --aw-color-btn-ghost-light-text: ${rgb(c.black)};
    --aw-color-btn-ghost-light-border: ${rgb(c.black)};
    --aw-color-btn-ghost-light-bg-hover: ${rgb(c.black)};
    --aw-color-btn-ghost-light-text-hover: ${rgb(c.white)};
    --aw-color-btn-ghost-light-border-hover: ${rgb(c.black)};

    --aw-color-btn-ghost-dark-bg: transparent;
    --aw-color-btn-ghost-dark-text: ${rgb(c.white)};
    --aw-color-btn-ghost-dark-border: var(--aw-color-accent);
    --aw-color-btn-ghost-dark-bg-hover: var(--aw-color-accent);
    --aw-color-btn-ghost-dark-text-hover: ${rgb(c.black)};
    --aw-color-btn-ghost-dark-border-hover: var(--aw-color-accent);

    --aw-color-btn-link: var(--aw-color-accent);
    --aw-color-btn-link-hover: var(--aw-color-accent-hover);

    --aw-color-motif-hero: var(--aw-color-accent);
    --aw-color-motif-dark: var(--aw-color-accent);
    --aw-color-motif-grey: var(--aw-color-accent);
    --aw-color-motif-white: var(--aw-color-accent);
    --aw-color-motif-cta: ${rgb(m.ctaColor)};

    --aw-opacity-motif-hero: ${m.heroOpacity};
    --aw-opacity-motif-dark: ${m.darkOpacity};
    --aw-opacity-motif-grey: ${m.greyOpacity};
    --aw-opacity-motif-white: ${m.whiteOpacity};
    --aw-opacity-motif-cta: ${m.ctaOpacity};
  `.trim();
}

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

/** Astro Fonts API entries — used by astro.config.ts. */
export function brandFontConfig() {
  return [brand.fonts.heading, brand.fonts.body].map((font) => ({
    name: font.name,
    cssVariable: font.cssVariable,
    weights: font.weights,
    styles: font.styles,
    subsets: font.subsets,
    fallbacks: ['sans-serif'] as string[],
  }));
}
