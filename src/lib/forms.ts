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

/** Resume uploads. Same Worker as the contact form (`/careers` route), so one env var moves both. */
export const CAREERS_ENDPOINT = `${FORM_WORKER_ORIGIN}/careers`;

/**
 * Public Turnstile site key (safe to expose). Production falls back to the real Aloha widget key so a
 * missing Vercel var cannot swap in Cloudflare's always-pass test key, which the Worker's real secret
 * would reject on every submit. Local dev uses the test key.
 */
export const TURNSTILE_SITE_KEY =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ||
  (import.meta.env.PROD ? '0x4AAAAAAFZIQO8In7u0d_Zk' : '1x00000000000000000000AA');

/** Contact form `sites.slug` (leads table). */
export const SITE_SLUG = import.meta.env.PUBLIC_SITE_SLUG || site.formSlug;

/** Careers form `sites.slug` (applications table). Separate row so it has its own recipient + Turnstile secret. */
export const CAREERS_SITE_SLUG = import.meta.env.PUBLIC_CAREERS_SITE_SLUG || site.careersFormSlug;
