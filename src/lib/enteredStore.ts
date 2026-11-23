/**
 * Whether the visitor has already passed the start screen in this tab.
 *
 * sessionStorage is an external store, so it is read through
 * useSyncExternalStore rather than copied into state from an effect.
 */

const KEY = "dataworld.entered";

let listeners: (() => void)[] = [];
let cached = false;
let primed = false;

function read(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    // Private mode or blocked storage: treat as a first visit.
    return false;
  }
}

export function subscribe(onChange: () => void): () => void {
  listeners = [...listeners, onChange];
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

/** Must be referentially stable between calls, hence the cache. */
export function getSnapshot(): boolean {
  if (!primed) {
    cached = read();
    primed = true;
  }
  return cached;
}

export function getServerSnapshot(): boolean {
  return false;
}

export function markEntered(): void {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
  cached = true;
  primed = true;
  listeners.forEach((l) => l());
}
