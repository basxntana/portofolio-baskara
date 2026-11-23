/**
 * Two-language support: English and Indonesian.
 *
 * Content lives as `{ en, id }` pairs beside each other in the data files
 * rather than in parallel per-language files — a missing translation then
 * fails to type-check instead of silently falling back.
 */

export const LOCALES = ["en", "id"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type L<T> = Record<Locale, T>;
/** A translated string. */
export type LText = L<string>;
/** A translated list of strings. */
export type LList = L<string[]>;

/** Pick the active language out of a localized value. */
export function t<T>(value: L<T>, locale: Locale): T {
  return value[locale];
}

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  id: "ID",
};

export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

/** The `lang` attribute each locale maps to. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en",
  id: "id",
};
