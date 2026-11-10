/**
 * Links check: 404s, redirect chains, staging/localhost links, non-HTTPS links.
 *
 * Reads the REAL site (the site renders on the server, so there is nothing to read from dist/).
 * Crawls every page in the sitemap, collects each internal link/asset once, and requests it.
 *
 * Usage:
 *   npm run links:check                       # production (src/config/site.ts url)
 *   npm run links:check -- --url=https://xyz.vercel.app
 *   npm run links:check -- --external         # also check external links (slower, can be flaky)
 */
import { BASE, IS_PRODUCTION_BASE, crawlPages, describeBase, get, pool } from './lib/crawl';

interface LinkIssue {
  file: string;
  link: string;
  issue: string;
  severity: 'error' | 'warning';
}

const issues: LinkIssue[] = [];
const CHECK_EXTERNAL = process.argv.includes('--external');
const STAGING_PATTERNS = [
  /localhost/i,
  /127\.0\.0\.1/i,
  /\.vercel\.app/i,
  /\/\/staging\./i,
  /\/\/preview\./i,
  /\/\/dev\./i,
];
const SKIP_PREFIXES = ['#', 'mailto:', 'tel:', 'sms:', 'javascript:', 'data:', 'blob:'];
const baseOrigin = new URL(BASE).origin;

/** link → pages that use it */
const internal = new Map<string, Set<string>>();
const external = new Map<string, Set<string>>();

function note(map: Map<string, Set<string>>, link: string, page: string) {
  if (!map.has(link)) map.set(link, new Set());
  map.get(link)!.add(page);
}

function collect(page: string, html: string) {
  const urls = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)].map((m) => m[1].replace(/&amp;/g, '&'));
  for (const raw of urls) {
    if (SKIP_PREFIXES.some((p) => raw.startsWith(p))) continue;
    let url: URL;
    try {
      url = new URL(raw, BASE + page);
    } catch {
      continue;
    }
    url.hash = '';
    if (url.pathname.startsWith('/cdn-cgi/')) continue;

    const isBaseHost = url.origin === baseOrigin;
    if (STAGING_PATTERNS.some((p) => p.test(url.href)) && !(isBaseHost && !IS_PRODUCTION_BASE)) {
      issues.push({ file: page, link: raw, issue: 'Link contains staging/development URL', severity: 'error' });
      continue;
    }
    if (url.protocol === 'http:' && !isBaseHost) {
      issues.push({ file: page, link: raw, issue: 'Non-HTTPS external link', severity: 'warning' });
    }
    if (isBaseHost) note(internal, url.pathname + url.search, page);
    else if (url.protocol.startsWith('http')) note(external, url.href, page);
  }
}

/** Follows redirects by hand so chains can be reported. */
async function resolve(url: string, head: boolean) {
  const hops: string[] = [];
  let current = url;
  for (let i = 0; i < 6; i++) {
    const res = await get(current, { head });
    if (res.status >= 300 && res.status < 400 && res.location) {
      hops.push(`${res.status} ${current}`);
      current = new URL(res.location, current).href;
      continue;
    }
    return { res, hops, final: current };
  }
  return { res: { status: 310, error: 'Too many redirects' } as Awaited<ReturnType<typeof get>>, hops, final: current };
}

async function main() {
  console.log(`🔗 Running link checks on ${describeBase()}\n`);
  const { pages, sitemap } = await crawlPages();
  if (sitemap.status !== 200 || pages.length === 0) {
    console.error(`Could not read ${BASE}/sitemap.xml (status ${sitemap.status || sitemap.error}).`);
    process.exit(1);
  }
  console.log(`Crawled ${pages.length} pages from the sitemap`);

  for (const page of pages) {
    if (page.status !== 200) {
      issues.push({
        file: page.path,
        link: page.path,
        issue: `Sitemap page returned ${page.status || page.error}`,
        severity: 'error',
      });
      continue;
    }
    collect(page.path, page.body);
  }
  console.log(
    `Checking ${internal.size} internal links/assets${CHECK_EXTERNAL ? ` and ${external.size} external links` : ''}...\n`
  );

  await pool([...internal.entries()], async ([path, usedOn]) => {
    const { res, hops, final } = await resolve(BASE + path, true);
    const file = [...usedOn][0] + (usedOn.size > 1 ? ` (+${usedOn.size - 1} more pages)` : '');
    if (res.status === 405 || res.status === 501) return; // HEAD not supported; skip
    if (res.status === 0) issues.push({ file, link: path, issue: `Request failed: ${res.error}`, severity: 'error' });
    else if (res.status >= 400)
      issues.push({ file, link: path, issue: `Broken link (${res.status})`, severity: 'error' });
    else if (hops.length > 1) {
      issues.push({ file, link: path, issue: `Redirect chain (${hops.length} hops) → ${final}`, severity: 'warning' });
    } else if (hops.length === 1) {
      issues.push({
        file,
        link: path,
        issue: `Redirects (${hops[0].split(' ')[0]}) → ${final}. Link to the final URL`,
        severity: 'warning',
      });
    }
  });

  if (CHECK_EXTERNAL) {
    await pool([...external.entries()], async ([url, usedOn]) => {
      let { res } = await resolve(url, true);
      if (res.status >= 400 || res.status === 0) res = (await resolve(url, false)).res; // some hosts reject HEAD
      const file = [...usedOn][0] + (usedOn.size > 1 ? ` (+${usedOn.size - 1} more pages)` : '');
      // 401/403/429 usually mean "bot blocked", not "broken"
      if ([401, 403, 429, 999].includes(res.status)) {
        issues.push({
          file,
          link: url,
          issue: `External link blocked automated check (${res.status})`,
          severity: 'warning',
        });
      } else if (res.status === 0 || res.status >= 400) {
        issues.push({ file, link: url, issue: `Broken external link (${res.status || res.error})`, severity: 'error' });
      }
    });
  }

  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  const print = (list: LinkIssue[]) => {
    for (const i of list) console.log(`  ${i.file}\n    → ${i.link}\n    ${i.issue}\n`);
  };
  if (errors.length) {
    console.log('❌ ERRORS:\n');
    print(errors);
  }
  if (warnings.length) {
    console.log('⚠️  WARNINGS:\n');
    print(warnings);
  }
  console.log(`📊 Summary: ${errors.length} errors, ${warnings.length} warnings\n`);
  if (errors.length > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
