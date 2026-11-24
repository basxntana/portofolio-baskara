"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PixelPanel } from "@/components/ui/PixelPanel";
import type { Achievement } from "@/data/achievements";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { reveal, stepEase } from "@/lib/retro";

/* 12×12 sprite: X = gold body, o = chrome highlight. */
const TROPHY = [
  "..XXXXXXXX..",
  "XXXXXXXXXXXX",
  "X.XoXXXXXX.X",
  "X.XoXXXXXX.X",
  ".XXoXXXXXXX.",
  "..XXXXXXXX..",
  "...XXXXXX...",
  ".....XX.....",
  ".....XX.....",
  "....XXXX....",
  "...XXXXXX...",
  "...XXXXXX...",
];

function PixelTrophy({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="text-accent drop-shadow-[0_0_8px_var(--color-accent)]"
    >
      {TROPHY.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={c === "o" ? "var(--color-ink)" : "currentColor"}
            />
          ),
        ),
      )}
    </svg>
  );
}

/**
 * Invisible button over an achievement card that opens its detail panel.
 * Native <dialog> gives focus trapping, Esc to close and the top layer for free.
 */
export function AchievementDialog({ a, locale }: { a: Achievement; locale: Locale }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const d = a.details;
  if (!d) return null;

  const name = t(a.name, locale);
  const label = ui.achievements;

  const rows: [string, string | undefined][] = [
    [t(label.award, locale), t(d.award, locale)],
    [t(label.event, locale), d.event && t(d.event, locale)],
    [t(label.organizer, locale), d.organizer],
    [t(label.year, locale), d.year?.toString()],
    [t(label.role, locale), d.role && t(d.role, locale)],
    [t(label.contribution, locale), d.contribution && t(d.contribution, locale)],
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          ref.current?.showModal();
        }}
        aria-haspopup="dialog"
        aria-label={`${name} — ${t(label.viewDetails, locale)}`}
        className="hover:bg-accent/5 absolute inset-0 cursor-pointer"
      />

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        // A click on the backdrop lands on the dialog element itself.
        onClick={(e) => e.target === ref.current && ref.current.close()}
        aria-label={name}
        className="text-ink backdrop:bg-bg/85 m-auto max-h-[calc(100dvh-2rem)] w-[min(40rem,calc(100%-2rem))] overflow-y-auto bg-transparent p-0"
      >
        {open ? (
          <PixelPanel tone="accent" glow title={`${a.id}.exe`} innerClassName="px-5 py-6 sm:px-7">
            <div className="flex items-start gap-4">
              <motion.div
                initial={reduced ? false : { scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, ease: stepEase }}
              >
                <PixelTrophy />
              </motion.div>
              <div className="min-w-0 flex-1">
                <motion.p
                  className="font-term text-secondary text-base tracking-widest"
                  initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ ...reveal, delay: 0.2 }}
                >
                  ★ {t(label.unlocked, locale)} ★
                </motion.p>
                <h3 className="text-accent text-glow mt-2 text-lg leading-relaxed">
                  {name.toUpperCase()}
                </h3>
                <p className="text-muted mt-2 text-xs leading-relaxed">
                  {t(a.description, locale)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => ref.current?.close()}
                aria-label={t(label.close, locale)}
                className="font-pixel border-line hover:border-accent hover:text-accent grid h-8 w-8 shrink-0 place-items-center border-2 text-sm"
              >
                ×
              </button>
            </div>

            <dl className="border-line mt-6 grid gap-x-6 gap-y-3 border-t-2 pt-5 sm:grid-cols-[auto_1fr]">
              {rows
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-term text-muted text-sm uppercase">{k}</dt>
                    <dd className="text-sm leading-relaxed">{v}</dd>
                  </div>
                ))}
            </dl>

            <h4 className="font-term text-secondary mt-6 text-sm tracking-widest uppercase">
              {t(label.documentation, locale)}
            </h4>
            {d.photos.length ? (
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {d.photos.map((p) => (
                  <li key={p.src} className="border-line border-2">
                    {/* Shown whole and uncropped: these are the original photos. */}
                    <Image
                      src={p.src}
                      alt={t(p.alt, locale)}
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 640px) 20rem, 100vw"
                      className="h-auto w-full"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted mt-2 text-xs">{t(label.noPhotos, locale)}</p>
            )}

            {d.link ? (
              <a
                href={d.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-term text-accent mt-5 inline-block text-sm underline"
              >
                {t(label.link, locale)} ↗
              </a>
            ) : null}
          </PixelPanel>
        ) : null}
      </dialog>
    </>
  );
}
