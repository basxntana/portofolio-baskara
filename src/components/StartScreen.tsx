"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Starfield } from "@/components/pixel/Starfield";
import { profile } from "@/data/profile";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { stepEase, swap } from "@/lib/retro";
import {
  getServerSnapshot,
  getSnapshot,
  markEntered,
  subscribe,
} from "@/lib/enteredStore";

const BLOCKS = 20;

/** The first item is "exit the title card"; the others jump into the world. */
const MENU = [
  { label: ui.start.menu.start, target: null },
  { label: ui.start.menu.about, target: "about" },
  { label: ui.start.menu.projects, target: "projects" },
  { label: ui.start.menu.skills, target: "skills" },
  { label: ui.start.menu.contact, target: "contact" },
] as const;

export function StartScreen({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();
  const entered = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [loaded, setLoaded] = useState(0);
  const [cursor, setCursor] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const open = !entered;
  const ready = reduced || loaded >= BLOCKS;

  useEffect(() => {
    if (!open || reduced) return;
    const tick = setInterval(() => {
      setLoaded((n) => {
        if (n >= BLOCKS) {
          clearInterval(tick);
          return n;
        }
        return n + 1;
      });
    }, 50);
    return () => clearInterval(tick);
  }, [open, reduced]);

  useEffect(() => {
    if (open && ready) itemRefs.current[cursor]?.focus();
  }, [open, ready, cursor]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const enter = useCallback((target: string | null) => {
    markEntered();
    requestAnimationFrame(() => {
      if (target) {
        document.getElementById(target)?.scrollIntoView({ block: "start" });
      }
      document.getElementById("main")?.focus();
    });
  }, []);

  /* Arrow keys move the selector, the way a title menu should. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        enter(null);
        return;
      }
      if (!ready) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => {
          const step = e.key === "ArrowDown" ? 1 : -1;
          return (c + step + MENU.length) % MENU.length;
        });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, ready, enter]);

  const filled = reduced ? BLOCKS : loaded;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="bg-bg fixed inset-0 z-100 overflow-y-auto"
          initial={false}
          exit={
            reduced
              ? { opacity: 0 }
              : { clipPath: "inset(50% 0% 50% 0%)", opacity: 0 }
          }
          transition={reduced ? { duration: 0.01 } : { duration: 0.3, ease: stepEase }}
          role="dialog"
          aria-modal="true"
          aria-label={t(ui.start.dialogLabel, locale)}
        >
          {/* The same world the page opens into, so the title card dissolves
              straight into the hero rather than cutting to a different scene. */}
          <div className="scene-art absolute inset-0" aria-hidden="true" />
          <Starfield seed={5} count={30} />
          <div className="bg-bg/80 absolute inset-0 lg:hidden" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to right, var(--color-bg) 6%, color-mix(in srgb, var(--color-bg) 84%, transparent) 42%, transparent 72%)",
            }}
          />
          <div className="bg-scanlines pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

          {/* Version tag */}
          <p className="font-term text-muted absolute top-4 right-5 text-base sm:top-6 sm:right-8">
            v1.0.0
          </p>

          <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col items-center justify-center px-5 py-14 sm:px-8 lg:items-start">
            {/* Title */}
            <div className="text-center lg:text-left">
              <h1 className="text-primary text-glow text-4xl leading-tight sm:text-6xl lg:text-7xl">
                {profile.name.toUpperCase()}
              </h1>
              <p className="font-pixel text-ink mt-5 text-lg font-semibold tracking-[0.3em] uppercase sm:text-2xl">
                {t(profile.title, locale)}
              </p>
              <p className="font-term text-secondary mt-3 text-lg sm:text-xl">
                {profile.disciplines.join(" · ")}
              </p>
            </div>

            {/* Menu */}
            <div className="mt-10 flex w-full flex-col items-center gap-8 sm:mt-12 lg:items-start">
              {ready ? (
                <motion.nav
                  aria-label={t(ui.start.menuLabel, locale)}
                  initial={reduced ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={swap}
                  className="pixel-shadow border-primary bg-surface w-full max-w-[16rem] border-2"
                >
                  <ul className="px-3 py-4">
                    {MENU.map((item, i) => {
                      const active = cursor === i;
                      return (
                        <li key={item.label.en}>
                          <button
                            ref={(el) => {
                              itemRefs.current[i] = el;
                            }}
                            type="button"
                            onClick={() => enter(item.target)}
                            onMouseEnter={() => setCursor(i)}
                            onFocus={() => setCursor(i)}
                            className={`font-pixel flex w-full items-center gap-3 px-2 py-3 text-left text-lg font-semibold tracking-widest uppercase transition-colors sm:text-xl ${
                              active ? "text-primary" : "text-muted hover:text-ink"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`w-3 shrink-0 ${
                                active
                                  ? "text-primary motion-safe:animate-blink-block"
                                  : "text-transparent"
                              }`}
                            >
                              &gt;
                            </span>
                            {t(item.label, locale)}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.nav>
              ) : (
                <div className="w-full max-w-[16rem]">
                  <p className="font-term text-accent mb-3 text-center text-lg">
                    {t(ui.start.initializing, locale)}
                  </p>
                  <div
                    className="flex gap-[3px]"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={BLOCKS}
                    aria-valuenow={filled}
                    aria-label={t(ui.start.loading, locale)}
                  >
                    {Array.from({ length: BLOCKS }, (_, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className={`h-2 flex-1 ${i < filled ? "bg-primary" : "bg-line"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer badge */}
            <div className="mt-12 text-center lg:text-left">
              <p className="pixel-shadow font-pixel text-accent border-accent/60 bg-surface inline-block border-2 px-4 py-2.5 text-sm font-semibold tracking-wide uppercase sm:text-base">
                {t(ui.start.worldAwaits, locale)}
              </p>
              <p className="text-muted mt-5 text-xs">
                {ready ? t(ui.start.hint, locale) : " "}
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
