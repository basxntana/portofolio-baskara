import type { Locale } from "./i18n";

/**
 * The language switch in flight.
 *
 * The two translations are two routes, so switching is a navigation, not a
 * state change — and until the new page's RSC payload lands there is nothing
 * to look at. This holds which language was asked for and when, so the loading
 * screen can cover the gap.
 *
 * It lives at module scope rather than in a provider on purpose: the switch
 * starts in the navbar and ends in the layout, and `/en` and `/id` are the same
 * route, so React may reconcile or remount either of them. A module store
 * survives both, and is read through useSyncExternalStore the way the theme and
 * entered stores are.
 */

export type LocaleSwitch = {
  /** The language being navigated to, or null when nothing is in flight. */
  to: Locale | null;
  /** When it started, so the screen can be held for a readable minimum. */
  startedAt: number;
};

const IDLE: LocaleSwitch = { to: null, startedAt: 0 };

let listeners: (() => void)[] = [];
/** Must be referentially stable between reads, hence a cached object. */
let current: LocaleSwitch = IDLE;

export function subscribe(onChange: () => void): () => void {
  listeners = [...listeners, onChange];
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

export function getSnapshot(): LocaleSwitch {
  return current;
}

export function getServerSnapshot(): LocaleSwitch {
  return IDLE;
}

function emit(next: LocaleSwitch): void {
  current = next;
  listeners.forEach((l) => l());
}

export function beginSwitch(to: Locale): void {
  emit({ to, startedAt: Date.now() });
}

export function endSwitch(): void {
  if (current.to === null) return;
  emit(IDLE);
}
