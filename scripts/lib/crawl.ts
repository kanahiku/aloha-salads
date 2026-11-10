/**
 * Shared crawler for seo:check and links:check.
 *
 * The site renders on the server, so there is no HTML in dist/. Instead we read the real site:
 *   1. Base URL: `--url=https://...` argument, else CHECK_URL env, else the production URL in src/config/site.ts.
 *   2. Page list: <loc> entries of `${base}/sitemap.xml`, mapped onto the base origin
 *      (so a Vercel preview or `astro preview` can be checked with its own sitemap paths).
 *
 * Read-only: only GET/HEAD requests, a small concurrency, and a clear User-Agent.
 */
import { site } from '../../src/config/site';

export const PRODUCTION_ORIGIN = site.url.replace(/\/+$/, '');
const arg = process.argv.find((a) => a.startsWith('--url='))?.slice('--url='.length);
export const BASE = (arg || process.env.CHECK_URL || PRODUCTION_ORIGIN).replace(/\/+$/, '');
export const IS_PRODUCTION_BASE =
  new URL(BASE).hostname.replace(/^www\./, '') === new URL(PRODUCTION_ORIGIN).hostname.replace(/^www\./, '');

const UA = 'aloha-salads-site-checks/1.0';
const CONCURRENCY = 6;
const TIMEOUT_MS = 30_000;

export interface Fetched {
  url: string;
  status: number;
  headers: Headers;
  body: string;
  /** Location header for 3xx responses. */
  location?: string;
  error?: string;
}

export async function get(url: string, opts: { head?: boolean } = {}): Promise<Fetched> {
  try {
    const res = await fetch(url, {
      method: opts.head ? 'HEAD' : 'GET',
      redirect: 'manual',
      headers: { 'user-agent': UA },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const body = opts.head || res.status >= 300 ? '' : await res.text();
    return { url, status: res.status, headers: res.headers, body, location: res.headers.get('location') ?? undefined };
  } catch (error) {
    return { url, status: 0, headers: new Headers(), body: '', error: (error as Error).message };
  }
}

export async function pool<T, R>(items: T[], fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    })
  );
  return out;
}

/** Paths listed in the sitemap, e.g. `/`, `/menu/salads`. */
export async function sitemapPaths(): Promise<{ paths: string[]; sitemap: Fetched }> {
  const sitemap = await get(`${BASE}/sitemap.xml`);
  const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const paths = [
    ...new Set(
      locs.map((loc) => {
        try {
          const u = new URL(loc);
          return u.pathname + u.search;
        } catch {
          return loc;
        }
      })
    ),
  ];
  return { paths, sitemap };
}

export interface Page extends Fetched {
  path: string;
}

export async function crawlPages(): Promise<{ pages: Page[]; sitemap: Fetched }> {
  const { paths, sitemap } = await sitemapPaths();
  const pages = await pool(paths, async (path) => ({ path, ...(await get(BASE + path)) }));
  return { pages, sitemap };
}

export function describeBase(): string {
  return `${BASE}${IS_PRODUCTION_BASE ? '' : '  (not the production host: canonical/indexing checks are relaxed)'}`;
}
