import { site } from '~/config/site';

const FALLBACK_ORIGIN = 'https://www.alohasalads.com';

function hostnameOf(value: string): string | null {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isTemporaryHost(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.vercel.app') ||
    hostname.endsWith('.localhost')
  );
}

function isPlaceholderHost(hostname: string): boolean {
  return hostname === 'example.com' || hostname.endsWith('.example.com');
}

/**
 * Canonical public origin. Production URLs use www.
 * Preview hosts and the example.com placeholder never appear in sitemaps or canonicals.
 */
export function canonicalSiteOrigin(): string {
  const candidates = [site.url, import.meta.env.SITE_URL ?? '', FALLBACK_ORIGIN];

  for (const raw of candidates) {
    const origin = raw.replace(/\/+$/, '');
    if (!origin) continue;
    const hostname = hostnameOf(origin);
    if (!hostname || isTemporaryHost(hostname) || isPlaceholderHost(hostname)) continue;
    return origin;
  }

  return FALLBACK_ORIGIN;
}

export function indexableHosts(): Set<string> {
  const hosts = new Set<string>();
  const hostname = hostnameOf(canonicalSiteOrigin());
  if (!hostname) return hosts;
  hosts.add(hostname);
  if (hostname.startsWith('www.')) {
    hosts.add(hostname.slice(4));
  } else {
    hosts.add(`www.${hostname}`);
  }
  return hosts;
}

/**
 * Indexing is allowed only on the real domain. Temp hosts (*.vercel.app, localhost)
 * stay noindex/disallow.
 */
export function isIndexableHost(hostHeader: string | null | undefined): boolean {
  if (!hostHeader) return false;
  const hostname = hostHeader.split(':')[0]?.toLowerCase();
  if (!hostname || isTemporaryHost(hostname)) return false;
  return indexableHosts().has(hostname);
}
