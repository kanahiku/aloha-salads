-- Shared Cloudflare Worker form service. One row per client site.
-- from_email uses Resend's test sender until the client domain is verified.
-- After DNS is verified, update from_email to: hello@client-domain.com
-- Requires the careers_notify_email column (schema.sql, or migrations/0002_careers_applications.sql).
-- Two rows so contact leads and careers applications are separated by site_slug,
-- each with its own recipient, Turnstile secret (TURNSTILE_SECRET_ALOHA_CONTACT / _ALOHA_CAREERS).
INSERT OR REPLACE INTO sites (slug, name, notify_email, from_email, from_name, allowed_origins, careers_notify_email)
VALUES
  ('aloha-contact', 'Aloha Salads', 'info@alohasalads.com', 'Aloha Salads <onboarding@resend.dev>', 'Aloha Salads',
   '["http://localhost:4321","https://*.vercel.app","https://alohasalads.com","https://www.alohasalads.com"]', 'info@alohasalads.com'),
  ('aloha-careers', 'Aloha Salads', 'info@alohasalads.com', 'Aloha Salads <onboarding@resend.dev>', 'Aloha Salads',
   '["http://localhost:4321","https://*.vercel.app","https://alohasalads.com","https://www.alohasalads.com"]', 'info@alohasalads.com');
