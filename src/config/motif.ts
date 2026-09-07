/**
 * Per-site motif (background pattern).
 *
 * This is the brand layer that makes sites look non-identical.
 * Pages keep `<SectionBg variant="hero" />` — they do not import SVGs.
 *
 * To restyle a new website:
 * 1. Drop a new SVG in `src/assets/images/patterns/` (black shape, white ground).
 * 2. Point `pattern` at that file.
 * 3. Toggle which sections show it, plus fade / tile size / repeat.
 * 4. Colors and opacity stay in `src/brand.ts`
 *    (`--aw-color-motif-*`, `--aw-opacity-motif-*`).
 */
import type { ImageMetadata } from 'astro';
import patternSrc from '~/assets/images/patterns/simple.svg';

export type MotifFade = 'top-to-bottom' | 'bottom-to-top' | 'none';
export type MotifSection = 'hero' | 'dark' | 'grey' | 'white' | 'cta';

export const MOTIF = {
  /** Black-on-white SVG used as a CSS mask. Swap this file per client. */
  pattern: patternSrc as ImageMetadata,

  /** Where the motif appears. Off by default — enable from Figma / brand. */
  sections: {
    hero: false,
    dark: false,
    grey: false,
    white: false,
    cta: false,
  } satisfies Record<MotifSection, boolean>,

  fade: 'top-to-bottom' as MotifFade,

  /**
   * CSS mask-size. `cover` = one large field.
   * Use `400px` (or `320px 320px`) with `repeat: 'repeat'` for a tighter tile.
   */
  size: 'cover',

  /** CSS mask-repeat. Pair with a pixel `size` for wallpaper tiling. */
  repeat: 'no-repeat',
};

export const MOTIF_COLOR_VARS: Record<Exclude<MotifSection, 'cta'> | 'cta', string> = {
  hero: 'var(--aw-color-motif-hero)',
  dark: 'var(--aw-color-motif-dark)',
  grey: 'var(--aw-color-motif-grey)',
  white: 'var(--aw-color-motif-white)',
  cta: 'var(--aw-color-motif-cta)',
};

export const MOTIF_OPACITY_VARS: Record<MotifSection, string> = {
  hero: 'var(--aw-opacity-motif-hero)',
  dark: 'var(--aw-opacity-motif-dark)',
  grey: 'var(--aw-opacity-motif-grey)',
  white: 'var(--aw-opacity-motif-white)',
  cta: 'var(--aw-opacity-motif-cta)',
};

export function motifFadeMask(fade: MotifFade = MOTIF.fade): string | undefined {
  if (fade === 'none') return undefined;
  if (fade === 'bottom-to-top') return 'linear-gradient(to top, black 0%, transparent 100%)';
  return 'linear-gradient(to bottom, black 0%, transparent 100%)';
}

/** Accept a number (0.15), a percent string ("15%"), or pass through a CSS value. */
export function parseMotifOpacity(value: number | string | undefined, fallbackCss: string): string {
  if (value === undefined || value === '') return fallbackCss;
  if (typeof value === 'number') return String(value);
  const trimmed = value.trim();
  if (trimmed.endsWith('%')) return String(Number.parseFloat(trimmed) / 100);
  return trimmed;
}
