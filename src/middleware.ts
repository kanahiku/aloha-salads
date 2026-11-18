import { defineMiddleware } from 'astro:middleware';
import { isIndexableHost } from '~/lib/indexing';

/**
 * Old paths that moved. Matched with or without a trailing slash so
 * /work-with-us/ reaches /careers in one hop.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  '/index.html': '/',
  '/work-with-us': '/careers',
  '/our-locations': '/locations',
  '/terms-of-service': '/terms',
  '/manifest.webmanifest': '/',
};

const ASSET_EXT = /\.(?:avif|css|eot|gif|ico|jpeg|jpg|js|map|mjs|pdf|png|svg|ttf|txt|webp|woff2?|xml)$/i;

function withoutTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function redirectTo(location: string, host: string): Response {
  const response = new Response(null, {
    status: 301,
    headers: { Location: location },
  });
  if (!isIndexableHost(host)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search, host } = context.url;
  const path = withoutTrailingSlash(pathname);

  if (context.request.method === 'GET' || context.request.method === 'HEAD') {
    if (path === '/page-data' || path.startsWith('/page-data/')) {
      return redirectTo(`/${search}`, host);
    }

    const legacy = LEGACY_REDIRECTS[path];
    if (legacy) {
      return redirectTo(`${legacy}${search}`, host);
    }
  }

  const response = await next();

  if (isIndexableHost(host)) {
    response.headers.delete('X-Robots-Tag');
  } else {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  if (response.status !== 404) return response;
  if (context.request.method !== 'GET' && context.request.method !== 'HEAD') return response;
  if (path.startsWith('/api/') || path.startsWith('/_astro/') || path.startsWith('/_image')) return response;
  if (ASSET_EXT.test(path)) return response;
  if (path === '/' || path === '/blog') return response;

  if (path.startsWith('/blog/')) {
    return redirectTo(`/blog${search}`, host);
  }

  return redirectTo(`/${search}`, host);
});
