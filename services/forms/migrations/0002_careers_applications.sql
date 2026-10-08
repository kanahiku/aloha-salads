-- Careers applications (POST /careers).
-- Additive only: safe to run against the shared `massic-forms` D1 database that
-- other client sites also use. Run ONCE (SQLite has no ADD COLUMN IF NOT EXISTS).
--
--   npx wrangler d1 execute massic-forms --remote --file=./migrations/0002_careers_applications.sql

-- Where careers applications are emailed. NULL falls back to sites.notify_email.
ALTER TABLE sites ADD COLUMN careers_notify_email TEXT;

-- One row per application. The resume file is NOT stored here; it is attached to the
-- notification email. Only its filename / size / type are kept for reference.
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  site_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  locations TEXT NOT NULL,
  notes TEXT,
  resume_filename TEXT NOT NULL,
  resume_size INTEGER NOT NULL,
  resume_type TEXT,
  created_at TEXT NOT NULL,
  email_sent_at TEXT,
  FOREIGN KEY (site_slug) REFERENCES sites(slug)
);

CREATE INDEX IF NOT EXISTS applications_site_created ON applications (site_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS applications_site_email_sent ON applications (site_slug, email_sent_at);
