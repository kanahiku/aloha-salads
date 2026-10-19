/**
 * Helpers for rendering plain Sanity text into components that accept HTML (`set:html` / `html=`).
 * Editors write plain text; we escape it first so a stray `<` or `&` can never break the page.
 */

export function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/** Plain text → safe HTML, with Enter rendered as a line break. */
export function textToHtml(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br/>');
}

/** Same as `textToHtml`, plus `**bold**` → <strong>. The only inline formatting editors get. */
export function inlineToHtml(value: string): string {
  return textToHtml(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Multi-paragraph plain text → HTML. A blank line starts a new paragraph (each wrapped in <p>);
 * text with no blank line stays inline. `**bold**` is supported. Used where a widget takes an HTML string.
 */
export function paragraphsToHtml(value: string): string {
  const parts = value
    .split(/\r?\n\s*\r?\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length <= 1) return inlineToHtml(value.trim());
  return parts.map((part) => `<p>${inlineToHtml(part)}</p>`).join('');
}
