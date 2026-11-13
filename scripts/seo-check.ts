/**
 * SEO check: titles, descriptions, H1s, canonicals, alt text, Open Graph, schema, status codes, sitemap, robots.
 *
 * Reads the REAL site (the site renders on the server, so there is nothing to read from dist/).
 *
 * Usage:
 *   npm run seo:check                         # production (src/config/site.ts url)
 *   npm run seo:check -- --url=https://xyz.vercel.app
 *   CHECK_URL=http://localhost:4321 npm run seo:check
 */
import { SCHEMA_FREE_PATHS } from '../src/config/schema/customOverrides';
import { BASE, IS_PRODUCTION_BASE, PRODUCTION_ORIGIN, crawlPages, describeBase, get, type Page } from './lib/crawl';

const schemaFreePaths = new Set<string>(SCHEMA_FREE_PATHS);

interface SEOIssue {
  file: string;
  issue: string;
  severity: 'error' | 'warning';
}

const issues: SEOIssue[] = [];
const add = (file: string, issue: string, severity: SEOIssue['severity']) => issues.push({ file, issue, severity });

/** Attribute value of a tag, whatever the attribute order (the HTML is minified, so order varies). */
function attr(tag: string, name: string): string | undefined {
  return tag
    .match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))
    ?.slice(1)
    .find((v) => v !== undefined);
}

/** First <tag> whose attribute `name` equals `value`. */
function findTag(html: string, tag: 'meta' | 'link', name: string, value: string): string | undefined {
  return (html.match(new RegExp(`<${tag}\\s[^>]*>`, 'gi')) ?? []).find((t) => attr(t, name)?.toLowerCase() === value);
}

function checkPage(page: Page) {
  const file = page.path;
  if (page.status === 0) return add(file, `Request failed: ${page.error}`, 'error');
  if (page.status >= 300 && page.status < 400) {
    return add(
      file,
      `Sitemap URL redirects (${page.status} → ${page.location}). List the final URL instead`,
      'warning'
    );
  }
  if (page.status !== 200) return add(file, `Bad status code ${page.status}`, 'error');

  // Sandboxed embeds (blog HTML embeds) live in srcdoc="…"; their markup is not part of this page.
  const html = page.body.replace(/\ssrcdoc="[^"]*"/gi, '');

  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  if (!title) add(file, 'Missing or empty <title> tag', 'error');
  else if (title.length > 70) add(file, `Title too long (${title.length} chars, max 70)`, 'warning');

  const descTag = findTag(html, 'meta', 'name', 'description');
  const description = descTag ? (attr(descTag, 'content') ?? '') : '';
  if (!description.trim()) add(file, 'Missing or empty meta description', 'error');
  else if (description.length > 160)
    add(file, `Description too long (${description.length} chars, max 160)`, 'warning');

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count === 0) add(file, 'Missing <h1> tag', 'error');
  else if (h1Count > 1) add(file, `Multiple H1 tags found (${h1Count})`, 'warning');

  const canonicalTag = findTag(html, 'link', 'rel', 'canonical');
  const canonical = canonicalTag ? (attr(canonicalTag, 'href') ?? '') : '';
  if (!canonical) add(file, 'Missing canonical link', 'warning');
  else if (IS_PRODUCTION_BASE && !canonical.startsWith(PRODUCTION_ORIGIN)) {
    add(file, `Canonical is not on the production origin: ${canonical}`, 'error');
  }

  if (IS_PRODUCTION_BASE) {
    const robotsMeta = attr(findTag(html, 'meta', 'name', 'robots') ?? '', 'content') ?? '';
    const robotsHeader = page.headers.get('x-robots-tag') ?? '';
    if (/noindex/i.test(robotsMeta) || /noindex/i.test(robotsHeader)) {
      add(file, 'Page is set to noindex on the production host', 'error');
    }
  }

  for (const img of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\salt=/i.test(img)) {
      const src = (attr(img, 'src') ?? 'unknown').slice(-50);
      add(file, `Image missing alt attribute: ...${src}`, 'error');
    }
  }

  if (!findTag(html, 'meta', 'property', 'og:title') || !findTag(html, 'meta', 'property', 'og:description')) {
    add(file, 'Missing Open Graph title or description', 'warning');
  }
  if (!findTag(html, 'meta', 'property', 'og:image')) add(file, 'Missing Open Graph image', 'warning');
  if (!findTag(html, 'meta', 'name', 'twitter:card')) add(file, 'Missing twitter:card', 'warning');

  const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaPath = file.split('?')[0].replace(/\/+$/, '') || '/';
  if (schemaFreePaths.has(schemaPath)) {
    if (schemas.length > 0) add(file, 'JSON-LD should be omitted on this page', 'warning');
  } else if (schemas.length === 0) add(file, 'Missing JSON-LD schema', 'warning');
  for (const s of schemas) {
    try {
      JSON.parse(s[1]);
    } catch {
      add(file, 'JSON-LD block is not valid JSON', 'error');
    }
  }

  const bad = (html.match(/href=["'][^"']*(localhost|\.vercel\.app|staging\.)[^"']*["']/gi) ?? []).filter(
    (h) => IS_PRODUCTION_BASE || !h.includes(BASE)
  );
  if (bad.length) add(file, `Found staging/localhost links: ${bad.length} occurrences`, 'error');
}

async function checkRobots() {
  const robots = await get(`${BASE}/robots.txt`);
  if (robots.status !== 200) return add('robots.txt', `robots.txt returned ${robots.status}`, 'error');
  if (!robots.body.includes('Sitemap:')) add('robots.txt', 'robots.txt missing Sitemap reference', 'warning');
  if (IS_PRODUCTION_BASE && /^Disallow:\s*\/\s*$/m.test(robots.body)) {
    add('robots.txt', 'robots.txt blocks the whole site on the production host', 'error');
  }
}

async function main() {
  console.log(`🔍 Running SEO checks on ${describeBase()}\n`);
  const { pages, sitemap } = await crawlPages();

  if (sitemap.status !== 200) add('sitemap.xml', `Sitemap returned ${sitemap.status || sitemap.error}`, 'error');
  else if (pages.length === 0) add('sitemap.xml', 'Sitemap is empty', 'error');
  else {
    console.log(`Sitemap contains ${pages.length} URLs`);
    if (/localhost|vercel\.app/.test(sitemap.body)) add('sitemap.xml', 'Sitemap contains non-production URLs', 'error');
  }

  pages.forEach(checkPage);
  await checkRobots();

  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  if (errors.length) {
    console.log('\n❌ ERRORS:\n');
    for (const i of errors) console.log(`  ${i.file}: ${i.issue}`);
  }
  if (warnings.length) {
    console.log('\n⚠️  WARNINGS:\n');
    for (const i of warnings) console.log(`  ${i.file}: ${i.issue}`);
  }
  console.log(`\n📊 Checked ${pages.length} pages: ${errors.length} errors, ${warnings.length} warnings\n`);
  if (errors.length > 0 || pages.length === 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
