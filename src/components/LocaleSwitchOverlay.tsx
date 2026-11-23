"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { stepEase } from "@/lib/retro";
import {
  endSwitch,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "@/lib/localeSwitchStore";
import { applyTheme } from "@/lib/themeStore";

/** How long the bar takes to fill, even if the new language arrives at once. */
const COUNT_MS = 1200;
/** And how long "READY" stays up once it has. */
const HOLD_MS = 320;
/** A navigation that never lands must not leave the reader staring at this. */
const MAX_MS = 8000;
const FRAME_MS = 60;

/**
 * The loading screen shown while the site changes language.
 *
 * Mounted in the locale layout, so it covers the home page and the quest pages
 * alike, and so it is still on screen when the new language's HTML arrives.
 *
 * `locale` is the language currently rendered, which is how the overlay knows
 * the navigation landed: the store says which language was asked for, and the
 * prop says which one is on screen. Until those agree the bar is held short of
 * full, so it never reads as finished while the page is still coming.
 *
 * It deliberately does not lock body scrolling the way the start screen does.
 * `useKeepScroll` puts the reader back where they were while this is still up,
 * and a locked body makes `scrollTo` a no-op — the lock would cost the reader
 * their place on the page to stop a scroll nobody can see happening.
 */
export function LocaleSwitchOverlay({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();
  const { to, startedAt } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  /* The wall clock, sampled; the bar is a function of it and `startedAt`
     rather than a counter of its own, so a new switch needs no reset. */
  const [now, setNow] = useState(0);

  const open = to !== null;
  const arrived = to !== null && locale === to;

  /* Switching language replaces <html>, which drops the theme attribute the
     bootstrap script set. Put it back the moment the new language lands —
     while this screen is still covering it. */
  useEffect(() => {
    applyTheme();
  }, [locale]);

  /* Drive the bar, and close once the new language is up and the screen has
     been held long enough to be read rather than flashed. */
  useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      const sample = Date.now();
      setNow(sample);
      if (sample - startedAt >= MAX_MS) endSwitch();
    }, FRAME_MS);

    return () => clearInterval(timer);
  }, [open, startedAt]);

  useEffect(() => {
    if (!arrived) return;
    const left = Math.max(0, COUNT_MS + HOLD_MS - (Date.now() - startedAt));
    const timer = setTimeout(endSwitch, left);
    return () => clearTimeout(timer);
  }, [arrived, startedAt]);

  /* The bar stops at nine tenths until the new language is actually on
     screen — a full bar over a page that has not arrived is a lie. */
  const counted = Math.min(Math.max(now - startedAt, 0) / COUNT_MS, 1);
  const progress = arrived ? counted : Math.min(counted, 0.9);

  /* The reader asked for the other language, so the screen speaks it. */
  const spoken = to ?? locale;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="locale-switch"
          className="fixed inset-0 z-200"
          /* Up at once, the way a loading screen has to be — a fade-in would
             be the reader watching the thing that is meant to hide the wait.
             Only the way out is animated. */
          initial={false}
          exit={{ opacity: 0 }}
          transition={reduced ? { duration: 0.01 } : { duration: 0.2, ease: stepEase }}
          role="status"
          aria-live="polite"
          aria-label={t(ui.loading.label, spoken)}
        >
          <LoadingScreen
            locale={spoken}
            progress={progress}
            label={t(
              progress >= 1 ? ui.loading.done : ui.loading.switching,
              spoken,
            )}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
