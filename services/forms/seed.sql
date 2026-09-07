-- Shared Cloudflare Worker form service. One row per client site.
-- from_email uses Resend's test sender until the client domain is verified.
-- After DNS is verified, update from_email to: noreply@client-domain.com
INSERT OR REPLACE INTO sites (slug, name, notify_email, from_email, from_name, allowed_origins)
VALUES (
  'your-company',
  'Your Company',
  'hello@example.com',
  'Your Company <onboarding@resend.dev>',
  'Your Company',
  '["http://localhost:4321","https://*.vercel.app","https://example.com","https://www.example.com"]'
);
