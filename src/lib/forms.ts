import { site } from '~/config/site';

/** Public form config. Vercel env overrides these; production fallbacks keep the live site working without dashboard vars. */
export const FORM_ENDPOINT =
  import.meta.env.PUBLIC_FORM_ENDPOINT ||
  (import.meta.env.PROD
    ? 'https://massic-forms-aloha-salads.kanahiku.workers.dev/submit'
    : 'http://localhost:8787/submit');

const FORM_WORKER_ORIGIN = FORM_ENDPOINT.replace(/\/submit\/?$/, '');

/** Check-up PDF emails. Separate from contact `/submit` so answers are not stored as leads. */
export const EMAIL_SUMMARY_ENDPOINT = `${FORM_WORKER_ORIGIN}/email-summary`;

/** Careers application (multipart, resume attached). Same Worker + D1, separate route. */
export const CAREERS_ENDPOINT = `${FORM_WORKER_ORIGIN}/careers`;

export const TURNSTILE_SITE_KEY =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

/** Contact form `sites.slug` (leads table). */
export const SITE_SLUG = import.meta.env.PUBLIC_SITE_SLUG || site.formSlug;

/** Careers form `sites.slug` (applications table). Separate row so it has its own recipient + Turnstile secret. */
export const CAREERS_SITE_SLUG = import.meta.env.PUBLIC_CAREERS_SITE_SLUG || site.careersFormSlug;
