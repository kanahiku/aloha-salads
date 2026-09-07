import { site } from '~/config/site';

/** Public form config. Vercel env overrides these; production fallbacks keep the live site working without dashboard vars. */
export const FORM_ENDPOINT =
  import.meta.env.PUBLIC_FORM_ENDPOINT ||
  (import.meta.env.PROD
    ? 'https://massic-forms.kanahiku.workers.dev/submit'
    : 'http://localhost:8787/submit');

export const TURNSTILE_SITE_KEY =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

export const SITE_SLUG = import.meta.env.PUBLIC_SITE_SLUG || site.formSlug;
