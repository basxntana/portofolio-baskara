"use client";

import { useCallback, useEffect } from "react";

const KEY = "dataworld.keepScroll";

/**
 * Holds the reader's scroll position across a language switch.
 *
 * `scroll={false}` on the link stops Next jumping to the top, but it is not
 * enough on its own: while the new page mounts, the document is briefly shorter
 * than it was, and the browser clamps `scrollY` to whatever still fits. Nothing
 * puts it back, so a reader near the bottom of a long page gets pulled upward
 * (measured: 6400 → 6008).
 *
 * So the position is saved on click and restored once the new page is tall
 * enough to hold it again.
 *
 * `routeKey` must change on navigation. `/en` and `/id` both match the same
 * `[locale]` route, so React reconciles the existing component instead of
 * remounting it — an effect with an empty dependency list would never run
 * again, and the restore would never happen.
 */
export function useKeepScroll(routeKey: string) {
  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(KEY);
      if (raw !== null) sessionStorage.removeItem(KEY);
    } catch {
      /* blocked storage: nothing to restore */
    }
    if (raw === null) return;

    const target = Number(raw);
    if (!Number.isFinite(target)) return;

    let settled = false;

    const restore = () => {
      if (settled) return;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      // Wait until the page can actually hold the old offset again.
      if (max < target - 1) return;
      window.scrollTo({ top: target, behavior: "instant" });
      settled = true;
      observer.disconnect();
    };

    const observer = new ResizeObserver(restore);
    observer.observe(document.documentElement);
    restore();

    /* If the new page is genuinely shorter, stop waiting. */
    const giveUp = setTimeout(() => {
      settled = true;
      observer.disconnect();
    }, 1500);

    return () => {
      clearTimeout(giveUp);
      observer.disconnect();
    };
  }, [routeKey]);

  /** Call this on the click that triggers the language navigation. */
  return useCallback(() => {
    try {
      sessionStorage.setItem(KEY, String(Math.round(window.scrollY)));
    } catch {
      /* blocked storage: the page will simply land where it lands */
    }
  }, []);
}
