import type { JsonLdNode } from './types';
import customSchemasJson from './customOverrides.json';

const customMap = customSchemasJson as Record<string, JsonLdNode | JsonLdNode[]>;

/**
 * Pages the schema document says must not output JSON-LD:
 * legal pages, the nutrition placeholder, and the three sitemap URLs that are not live pages.
 */
export const SCHEMA_FREE_PATHS = [
  '/privacy-policy',
  '/terms',
  '/accessibility',
  '/nutrition-allergens',
  '/menu/kids',
  '/menu/vegan',
  '/reviews',
] as const;

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const path = pathname.split('?')[0].split('#')[0];
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Authored schema from Aloha_Salads_Schema_Markup.docx, one block per path.
 * A block is either the document's array or its single object, unchanged.
 * Trailing slashes are stripped so `/contact/` matches `/contact`.
 * `/blog/some-post` does not match the `/blog` block.
 */
export function getCustomSchema(pathname: string): JsonLdNode | JsonLdNode[] | null {
  return customMap[normalizePath(pathname)] ?? null;
}

export function isSchemaFreePath(pathname: string): boolean {
  return (SCHEMA_FREE_PATHS as readonly string[]).includes(normalizePath(pathname));
}
