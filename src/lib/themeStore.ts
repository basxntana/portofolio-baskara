/**
 * Day / night for the pixel world.
 *
 * The document element is the source of truth (an inline script sets it before
 * first paint, so there is no flash), and this module reads and writes it
 * through useSyncExternalStore rather than mirroring it into React state.
 */

export type Theme = "night" | "day";

export const THEME_KEY = "dataworld.theme";

let listeners: (() => void)[] = [];
let cached: Theme = "night";
let primed = false;

function read(): Theme {
  if (typeof document === "undefined") return "night";
  if (document.documentElement.dataset.theme === "day") return "day";
  /* The attribute can be missing because the reader chose night — or because
     a language switch just replaced <html> and took it with it. Storage is the
     tie-breaker. */
  try {
    return localStorage.getItem(THEME_KEY) === "day" ? "day" : "night";
  } catch {
    return "night";
  }
}

export function subscribe(onChange: () => void): () => void {
  listeners = [...listeners, onChange];
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

export function getSnapshot(): Theme {
  if (!primed) {
    cached = read();
    primed = true;
  }
  return cached;
}

export function getServerSnapshot(): Theme {
  return "night";
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* blocked storage: the choice just will not persist */
  }
  cached = theme;
  primed = true;
  listeners.forEach((l) => l());
}

/**
 * Write the chosen theme back onto <html>.
 *
 * Changing the language changes `data-locale` on <html>, which makes React
 * replace the element — and `data-theme` goes with it, because an inline
 * script put it there and React has no record of it to restore. Everything
 * else about the page survives the switch; without this, the world would flip
 * back to night.
 */
export function applyTheme(): void {
  if (getSnapshot() === "day") {
    document.documentElement.dataset.theme = "day";
  } else {
    delete document.documentElement.dataset.theme;
  }
}
