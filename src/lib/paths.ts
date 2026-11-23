import type { Locale } from "./i18n";

/** Build an in-site href under the given language. */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/** Swap the language prefix on the path the reader is currently on. */
export function swapLocale(pathname: string, next: Locale): string {
  const rest = pathname.replace(/^\/(en|id)(?=\/|$)/, "");
  return `/${next}${rest}`;
}
