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
      weights: ['400'] as string[],
      styles: ['normal'] as string[],
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
    /** Figma `tag`. */
    eyebrow: { size: '16px', mobile: '14px', lineHeight: '1', tracking: '0' },
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

/** Per-variant CTA colors — hibiscus fill, cream ghost on photos. */
function ctaButtonVars(c: Brand['colors']): string {
  const primary = `
    --aw-color-btn-primary-bg: ${rgb(c.accent)};
    --aw-color-btn-primary-text: ${rgb(c.cream)};
    --aw-color-btn-primary-border: ${rgb(c.accent)};
    --aw-color-btn-primary-bg-hover: ${rgb(c.navy)};
    --aw-color-btn-primary-text-hover: ${rgb(c.cream)};
    --aw-color-btn-primary-border-hover: ${rgb(c.navy)};`;

  const secondary = `
    --aw-color-btn-secondary-bg: ${rgb(c.ctaTan)};
    --aw-color-btn-secondary-text: ${rgb(c.cream)};
    --aw-color-btn-secondary-border: ${rgb(c.ctaTan)};
    --aw-color-btn-secondary-bg-hover: ${rgb(c.tanText)};
    --aw-color-btn-secondary-text-hover: ${rgb(c.cream)};
    --aw-color-btn-secondary-border-hover: ${rgb(c.tanText)};`;

  const ghostLight = `
    --aw-color-btn-ghost-light-bg: transparent;
    --aw-color-btn-ghost-light-text: ${rgb(c.heading)};
    --aw-color-btn-ghost-light-border: ${rgb(c.heading)};
    --aw-color-btn-ghost-light-bg-hover: ${rgb(c.accent)};
    --aw-color-btn-ghost-light-text-hover: ${rgb(c.cream)};
    --aw-color-btn-ghost-light-border-hover: ${rgb(c.accent)};`;

  const ghostDark = `
    --aw-color-btn-ghost-dark-bg: transparent;
    --aw-color-btn-ghost-dark-text: ${rgb(c.cream)};
    --aw-color-btn-ghost-dark-border: ${rgb(c.cream)};
    --aw-color-btn-ghost-dark-bg-hover: ${rgb(c.cream, 0.12)};
    --aw-color-btn-ghost-dark-text-hover: ${rgb(c.cream)};
    --aw-color-btn-ghost-dark-border-hover: ${rgb(c.cream)};`;

  return [primary, secondary, ghostLight, ghostDark].join('');
}

function rootVars(b: Brand): string {
  const { colors: c, fonts: f, radius: r, motif: m, type: t } = b;
  const accent = rgb(c.accent);
  const accentHover = rgb(c.accentHover);
  const heading = rgb(c.heading);
  const muted = rgb(c.muted);

  return `
    --aw-font-sans: var(${f.body.cssVariable});
    --aw-font-serif: var(${f.heading.cssVariable});
    --aw-font-heading: var(${f.heading.cssVariable});
    --aw-font-script: var(${f.script.cssVariable});
    --aw-font-rough: var(${f.rough.cssVariable});

    --aw-text-h1: ${t.h1.size};
    --aw-text-h1-mobile: ${t.h1.mobile};
    --aw-leading-h1: ${t.h1.lineHeight};
    --aw-text-h2: ${t.h2.size};
    --aw-text-h2-mobile: ${t.h2.mobile};
    --aw-leading-h2: ${t.h2.lineHeight};
    --aw-text-h3: ${t.h3.size};
    --aw-text-h3-mobile: ${t.h3.mobile};
    --aw-leading-h3: ${t.h3.lineHeight};
    --aw-text-h4: ${t.h4.size};
    --aw-text-h4-mobile: ${t.h4.mobile};
    --aw-leading-h4: ${t.h4.lineHeight};
    --aw-text-body: ${t.body.size};
    --aw-text-body-mobile: ${t.body.mobile};
    --aw-leading-body: ${t.body.lineHeight};
    --aw-tracking-body: ${t.body.tracking};
    --aw-text-body-lg: ${t.bodyLg.size};
    --aw-text-body-lg-mobile: ${t.bodyLg.mobile};
    --aw-tracking-body-lg: ${t.bodyLg.tracking};
    --aw-text-button: ${t.button.size};
    --aw-text-eyebrow: ${t.eyebrow.size};
    --aw-text-eyebrow-mobile: ${t.eyebrow.mobile};
    --aw-tracking-eyebrow: ${t.eyebrow.tracking};
    --aw-text-small: ${t.small.size};
    --aw-leading-small: ${t.small.lineHeight};
    --aw-text-caption: ${t.caption.size};
    --aw-text-label: ${t.label.size};
    --aw-text-label-mobile: ${t.label.mobile};
    --aw-tracking-label: ${t.label.tracking};
    --aw-text-ticker: ${t.ticker.size};
    --aw-text-ticker-mobile: ${t.ticker.mobile};
    --aw-text-quote: ${t.quote.size};
    --aw-text-quote-mobile: ${t.quote.mobile};
    --aw-leading-quote: ${t.quote.lineHeight};

    --aw-color-primary: ${rgb(c.primary)};
    --aw-color-secondary: ${rgb(c.secondary)};
    --aw-color-accent: ${accent};
    --aw-color-accent-hover: ${accentHover};

    --aw-color-text-heading: ${heading};
    --aw-color-text-default: ${heading};
    --aw-color-text-muted: ${muted};
    --aw-color-text-eyebrow: ${rgb(c.eyebrow)};
    --aw-color-text-page: ${rgb(c.page)};
    --aw-color-bg-page: ${rgb(c.page)};
    --aw-color-bg-page-end: ${rgb(c.white)};
    --aw-color-bg-section-white: ${rgb(c.page)};
    --aw-color-bg-section-grey: ${rgb(c.sectionGrey)};
    --aw-color-bg-section-dark: ${rgb(c.sectionDark)};
    --aw-color-bg-card: ${rgb(c.card)};
    --aw-color-bg-card-dark: ${rgb(c.cardDark)};
    --aw-color-bg-card-light: ${rgb(c.cardMist)};
    --aw-color-bg-feature-card: ${rgb(c.featureCard)};
    --aw-color-bg-cta: ${rgb(c.ctaBg)};
    --aw-color-bg-cta-end: ${rgb(c.ctaEnd)};
    --aw-color-text-tan: ${rgb(c.tanText)};
    --aw-color-text-tan-body: ${rgb(c.tanBody)};
    --aw-color-bg-cta-pink: ${rgb(c.ctaPink)};
    --aw-color-text-cta-pink: ${rgb(c.ctaPinkText)};
    --aw-color-gradient-from: ${rgb(c.gradientFrom)};
    --aw-color-gradient-to: ${rgb(c.gradientTo)};
    --aw-color-page-wash-from: ${rgb(c.pageWashFrom)};
    --aw-color-page-wash-to: ${rgb(c.pageWashTo)};
    --aw-opacity-motif-page: ${m.pageOpacity};
    --aw-shadow-card-mist: 4px 4px 30px rgb(0 0 0 / 5%), 3px 3px 0 ${rgb(c.cardMist)};
    --aw-shadow-card-pink: 4px 4px 30px rgb(0 0 0 / 5%), 3px 3px 0 ${rgb(c.ctaPink)};
    --aw-color-nav-glass: ${rgb(c.nav, 0.25)};

    --aw-color-card-heading-dark: ${rgb(c.white)};
    --aw-color-card-body-dark: ${rgb(c.white, 0.6)};
    --aw-color-card-link-dark: ${rgb(c.cream)};

    --aw-color-card-heading-light: var(--aw-color-text-heading);
    --aw-color-card-body-light: var(--aw-color-text-muted);
    --aw-color-card-link-light: var(--aw-color-btn-link);

    --aw-color-card-border-dark: ${rgb(c.accent, 0.6)};
    --aw-color-card-border-light: transparent;

    --aw-color-bg-card-outlined: ${rgb(c.white)};
    --aw-color-card-border-outlined: ${rgb(c.black, 0.12)};
    --aw-color-card-heading-outlined: var(--aw-color-text-heading);
    --aw-color-card-body-outlined: var(--aw-color-text-muted);
    --aw-color-card-link-outlined: var(--aw-color-btn-link);

    --aw-color-bg-card-glass: ${rgb(c.white, 0.08)};
    --aw-color-card-border-glass: ${rgb(c.white, 0.15)};
    --aw-color-card-heading-glass: ${rgb(c.white)};
    --aw-color-card-body-glass: ${rgb(c.white, 0.7)};
    --aw-color-card-link-glass: ${rgb(c.cream)};

    ${ctaButtonVars(c)}

    --aw-color-btn-link: ${rgb(c.accent)};
    --aw-color-btn-link-hover: ${accentHover};

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

    --aw-color-testimonial-card-bg-light: ${rgb(c.card)};
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

    --aw-color-faq-border-light: ${rgb(c.secondary, 0.45)};
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

    --aw-color-projects-card-bg-light: ${rgb(c.card)};
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

    --aw-shadow-card: 4px 4px 30px rgb(0 0 0 / 5%), 3px 3px 0 ${rgb(c.secondary)};
    --aw-shadow-header: 0 0.25rem 3.5rem 0 color-mix(in srgb, var(--aw-color-text-heading) 8%, transparent);
    --aw-border-card: ${rgb(c.secondary, 0.16)};

    --aw-radius: ${r.base};
    --aw-radius-lg: ${r.lg};
    --aw-radius-xl: ${r.xl};
    --aw-radius-hero: ${r.hero};
    --aw-radius-full: ${r.full};
  `.trim();
}

function darkVars(b: Brand): string {
  const { colors: c, fonts: f, motif: m } = b;
  const accent = rgb(c.accent);

  return `
    --aw-font-sans: var(${f.body.cssVariable});
    --aw-font-serif: var(${f.heading.cssVariable});
    --aw-font-heading: var(${f.heading.cssVariable});
    --aw-font-script: var(${f.script.cssVariable});
    --aw-font-rough: var(${f.rough.cssVariable});

    --aw-color-primary: ${accent};
    --aw-color-secondary: ${rgb(c.accentHover)};
    --aw-color-accent: ${accent};
    --aw-color-accent-hover: ${rgb(c.accentHover)};

    --aw-color-text-heading: rgb(247 250 252);
    --aw-color-text-default: rgb(226 232 240);
    --aw-color-text-muted: ${rgb(c.secondary)};
    --aw-color-text-page: ${rgb(c.page)};
    --aw-color-bg-page: ${rgb(c.navy)};
    --aw-color-bg-page-end: ${rgb(c.navy)};
    --aw-color-bg-section-white: ${rgb(c.navy)};
    --aw-color-bg-section-grey: rgb(12 45 90);
    --aw-color-bg-section-dark: ${rgb(c.black)};
    --aw-color-bg-card-dark: ${rgb(c.cardDark)};
    --aw-color-bg-card-light: rgb(12 45 90);
    --aw-color-bg-cta: ${rgb(c.ctaBg)};

    --aw-color-card-heading-dark: ${rgb(c.white)};
    --aw-color-card-body-dark: ${rgb(c.white, 0.6)};
    --aw-color-card-link-dark: ${rgb(c.cream)};

    --aw-color-card-heading-light: rgb(247 250 252);
    --aw-color-card-body-light: ${rgb(c.secondary)};
    --aw-color-card-link-light: var(--aw-color-accent);

    --aw-color-card-border-dark: ${rgb(c.accent, 0.6)};
    --aw-color-card-border-light: ${rgb(c.accent, 0.5)};

    ${ctaButtonVars(c)}
    --aw-color-btn-link: ${rgb(c.accent)};
    --aw-color-btn-link-hover: ${rgb(c.accentHover)};

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
