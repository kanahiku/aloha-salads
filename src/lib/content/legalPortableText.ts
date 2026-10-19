import type { LegalBlockSpec } from './legalDefaults';

/**
 * Converts the plain writing format used in `legalDefaults.ts` into Sanity rich text (Portable Text),
 * so the seed script and the offline fallback both go through the same shape the Studio produces.
 *
 *   "text with [a link](/privacy-policy) and **bold**"  →  one block with link + strong marks
 *   ["one", "two"]                                       →  two bullet-list blocks
 *
 * Pure (no config / Sanity imports) so scripts can import it.
 */

export type PortableSpan = { _type: 'span'; _key: string; text: string; marks: string[] };
export type PortableLinkDef = { _type: 'link'; _key: string; href: string };
export type PortableBlock = {
  _type: 'block';
  _key: string;
  style: 'normal';
  listItem?: 'bullet';
  level?: number;
  markDefs: PortableLinkDef[];
  children: PortableSpan[];
};

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*/g;

function inlineToSpans(text: string, keyPrefix: string): { children: PortableSpan[]; markDefs: PortableLinkDef[] } {
  const children: PortableSpan[] = [];
  const markDefs: PortableLinkDef[] = [];
  let last = 0;
  const push = (value: string, marks: string[] = []) => {
    if (!value) return;
    children.push({ _type: 'span', _key: `${keyPrefix}-s${children.length + 1}`, text: value, marks });
  };

  for (const match of text.matchAll(INLINE)) {
    push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      const key = `${keyPrefix}-l${markDefs.length + 1}`;
      markDefs.push({ _type: 'link', _key: key, href: match[2] });
      push(match[1], [key]);
    } else {
      push(match[3], ['strong']);
    }
    last = (match.index ?? 0) + match[0].length;
  }
  push(text.slice(last));
  if (!children.length) push('');
  return { children, markDefs };
}

export function specToPortableText(blocks: LegalBlockSpec[], keyPrefix: string): PortableBlock[] {
  const out: PortableBlock[] = [];
  blocks.forEach((block, blockIndex) => {
    const items = Array.isArray(block) ? block : [block];
    items.forEach((text, itemIndex) => {
      const key = `${keyPrefix}-b${blockIndex + 1}${Array.isArray(block) ? `i${itemIndex + 1}` : ''}`;
      const { children, markDefs } = inlineToSpans(text, key);
      out.push({
        _type: 'block',
        _key: key,
        style: 'normal',
        ...(Array.isArray(block) ? { listItem: 'bullet' as const, level: 1 } : {}),
        markDefs,
        children,
      });
    });
  });
  return out;
}
