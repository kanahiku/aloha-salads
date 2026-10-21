-- Shared Cloudflare Worker form service. One row per client site.
-- from_email must be on the Resend-verified domain (alohasalads.com).
-- notify_email and careers_notify_email are who receives the form. Comma-separated is allowed.
-- Requires the careers_notify_email column (schema.sql, or migrations/0002_careers_applications.sql).
-- Two rows so contact leads and careers applications are separated by site_slug,
-- each with its own Turnstile secret (TURNSTILE_SECRET_ALOHA_CONTACT / _ALOHA_CAREERS).
INSERT OR REPLACE INTO sites (slug, name, notify_email, from_email, from_name, allowed_origins, careers_notify_email)
VALUES
  ('aloha-contact', 'Aloha Salads', 'info@alohasalads.com, kaiea@alohasalads.com, deepak@kanahiku.com', 'Aloha Salads <hello@alohasalads.com>', 'Aloha Salads',
   '["http://localhost:4321","https://*.vercel.app","https://alohasalads.com","https://www.alohasalads.com"]', 'info@alohasalads.com, kaiea@alohasalads.com, deepak@kanahiku.com'),
  ('aloha-careers', 'Aloha Salads', 'info@alohasalads.com, kaiea@alohasalads.com, deepak@kanahiku.com', 'Aloha Salads <hello@alohasalads.com>', 'Aloha Salads',
   '["http://localhost:4321","https://*.vercel.app","https://alohasalads.com","https://www.alohasalads.com"]', 'info@alohasalads.com, kaiea@alohasalads.com, deepak@kanahiku.com');
