"use client";

import { useEffect, useState } from "react";

/** How far below the header a section may start and still count as current. */
const TOLERANCE_PX = 72;

/**
 * Tracks which section is currently under the sticky header.
 *
 * This measures on scroll rather than using an IntersectionObserver. An
 * observer reports *which* sections overlap a band, not which one owns the top
 * of it — and picking from that set by smallest `boundingClientRect.top`
 * chooses whichever section is furthest ABOVE the viewport, so the indicator
 * lags a section behind. Walking the list and keeping the last one whose top
 * has crossed the header line says exactly what is meant.
 */
export function useActiveSection(ids: string[], offsetPx = 96): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      /* A band below the header rather than a hairline. Anchor navigation lands
         a section at the header edge, but late layout (font swap, a language
         with different copy lengths) can nudge it tens of pixels further down —
         with a hairline it would then read as the previous section. */
      const line = offsetPx + TOLERANCE_PX;
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      /* The final section is often shorter than the viewport, so its top never
         reaches the line. At the bottom of the page it is the active one. */
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && ids.length > 0) current = ids[ids.length - 1];

      setActive(current);
    };

    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);

      /* Smooth scrolling stops firing events a beat before it has finished
         settling, so the frame-synced measurement above can read the geometry
         one section early. This is the final word once movement has stopped. */
      clearTimeout(settleTimer);
      settleTimer = setTimeout(measure, 140);
    };

    /* Deferred, so the first measurement is not a setState in the effect body. */
    frame = requestAnimationFrame(measure);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);

    /* Switching language keeps the scroll position, so no scroll event fires —
       but the new copy lays out at a different height, which can move a
       different section under the header. Re-measure whenever the page resizes
       itself: language swaps, font swap, images finishing. */
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [ids, offsetPx]);

  return active;
}
