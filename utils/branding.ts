/**
 * English site / project name shown as a visual lockup in the footer (and elsewhere if needed).
 * Not translated: keeps the mark consistent across locales (see footer column 1).
 *
 * Footer splits on whitespace so “for” can stay italic; if the name changes, update
 * `getFooterBrandParts()` in `core/components/Footer.tsx` if needed.
 */
export const FOOTER_BRAND_MARK = 'Stand for Ukraine'

/** Footer brand lockup color (matches utility links / mail accent). */
export const FOOTER_BRAND_COLOR = '#FFE600'
