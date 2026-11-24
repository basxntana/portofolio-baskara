/**
 * Whether the visitor has already passed the start screen.
 *
 * Kept in module memory, not storage: it survives client-side navigation
 * (language switch, project pages) but a reload starts at the title menu again.
 * Read through useSyncExternalStore so every subscriber sees the change.
 */

let listeners: (() => void)[] = [];
let entered = false;

export function subscribe(onChange: () => void): () => void {
  listeners = [...listeners, onChange];
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

export function getSnapshot(): boolean {
  return entered;
}

export function getServerSnapshot(): boolean {
  return false;
}

export function markEntered(): void {
  entered = true;
  listeners.forEach((l) => l());
}
