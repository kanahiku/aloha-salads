import { CONTACT } from '~/config/contact';
import { siteHost } from '~/config/site';
import { escapeHtml } from './richText';

/**
 * Placeholders editors can type in legal / page text. They are replaced with the live business details from
 * `src/config`, so a phone or address change is made once and every page follows.
 *
 *   {business}  {host}  {email}  {phone}  {street}  {cityLine}
 */
export const CONTENT_TOKENS = ['{business}', '{host}', '{email}', '{phone}', '{street}', '{cityLine}'] as const;

const plainValues = () => ({
  '{business}': CONTACT.businessName,
  '{host}': siteHost(),
  '{email}': CONTACT.email,
  '{phone}': CONTACT.phone.display,
  '{street}': CONTACT.address.street,
  '{cityLine}': CONTACT.address.cityLine,
});

/** Tokens → plain text (titles, meta tags, headings). */
export function fillTokens(text: string): string {
  let out = text;
  for (const [token, value] of Object.entries(plainValues())) out = out.replaceAll(token, value);
  return out;
}

/** Tokens → HTML for text that is already escaped. `{email}` and `{phone}` become links. */
export function fillTokensHtml(escapedHtml: string, linkClass = 'btn-link'): string {
  const values = plainValues();
  return escapedHtml
    .replaceAll(
      '{email}',
      `<a class="${linkClass}" href="mailto:${escapeHtml(CONTACT.email)}">${escapeHtml(values['{email}'])}</a>`
    )
    .replaceAll(
      '{phone}',
      `<a class="${linkClass}" href="${escapeHtml(CONTACT.phone.href)}">${escapeHtml(values['{phone}'])}</a>`
    )
    .replaceAll('{business}', escapeHtml(values['{business}']))
    .replaceAll('{host}', escapeHtml(values['{host}']))
    .replaceAll('{street}', escapeHtml(values['{street}']))
    .replaceAll('{cityLine}', escapeHtml(values['{cityLine}']));
}
