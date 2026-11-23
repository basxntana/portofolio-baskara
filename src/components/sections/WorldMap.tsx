"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { dataClasses, type DataClass } from "@/data/classes";
import { projects } from "@/data/projects";
import { useWorld } from "@/components/WorldProvider";
import { PixelLink } from "@/components/ui/PixelButton";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

const toneText = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
} as const;

const toneBorder = {
  primary: "border-primary",
  secondary: "border-secondary",
  accent: "border-accent",
} as const;

/* Written out in full: Tailwind scans source text, so a class name assembled
   at runtime would never be compiled. */
const toneHover = {
  primary: "hover:border-primary focus-visible:border-primary",
  secondary: "hover:border-secondary focus-visible:border-secondary",
  accent: "hover:border-accent focus-visible:border-accent",
} as const;

const HOURS = ["night", "day"] as const;

/** The bridged row of islands, as one picture per hour of the day. */
const SCENE = {
  night: "/assets/images/world/islands-night.webp",
  day: "/assets/images/world/islands-day.webp",
} as const;

/** The name plate under an island — the one the concept art paints on. */
function Plate({
  dataClass: c,
  locale,
  className = "",
}: {
  dataClass: DataClass;
  locale: Locale;
  className?: string;
}) {
  const count = projects.filter((p) => p.category === c.category).length;

  return (
    <span className={`flex flex-col ${className}`}>
      <span
        className={`font-pixel text-xs leading-snug font-semibold tracking-wider uppercase sm:text-sm ${toneText[c.tone]}`}
      >
        {c.category}
      </span>
      <span className="font-term text-ink mt-0.5 text-sm sm:text-base">
        ({t(c.world.place, locale)})
      </span>
      <span className="font-term text-muted text-xs sm:text-sm">
        {count}{" "}
        {count === 1 ? t(ui.world.quest, locale) : t(ui.world.quests, locale)}
      </span>
    </span>
  );
}

/**
 * The Data World: the three disciplines drawn as one place.
 *
 * On a wide screen the islands are the concept art's single bridged span. The
 * three sprites were cut from panels that sat side by side on the asset sheet,
 * so butting them back together reconnects the bridges (scripts/build-art.js
 * does the cutting). Their centres land at 16 / 52 / 85 percent of that span —
 * close enough to thirds that an even three-column row of name plates sits
 * under them.
 *
 * A phone would shrink that span to about a hundred pixels tall, so there the
 * islands are taken on their own, without bridges, and stacked as cards.
 *
 * Both the sprites and the backdrop ship in a day and a night version. Which
 * one shows is decided in CSS off `data-theme`, not here: the theme is applied
 * before React hydrates, and reading it in JavaScript would show a daylight
 * visitor one frame of the night world.
 */
export function WorldMap({ locale }: { locale: Locale }) {
  const { exploreClass } = useWorld();

  return (
    <section
      id="world"
      aria-labelledby="world-heading"
      className="border-line relative overflow-hidden border-t-[3px]"
    >
      {/* The pack's ocean, stars and floating islands already — no generated
          sky needed on top of it. */}
      <div className="world-art absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--color-bg) 30%, transparent), color-mix(in srgb, var(--color-bg) 8%, transparent) 38%, color-mix(in srgb, var(--color-bg) 55%, transparent) 76%, var(--color-bg))",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2
          id="world-heading"
          className="text-accent text-glow text-center text-3xl leading-tight sm:text-5xl"
        >
          {t(ui.world.ready, locale)}
        </h2>
        <p className="font-term text-ink mt-4 text-center text-lg sm:text-xl">
          {t(ui.world.tagline, locale)}
        </p>
        <p className="text-muted mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed">
          {t(ui.world.subtitle, locale)}
        </p>

        {/* ── Wide: the bridged span ─────────────────────────────────────── */}
        <div className="mx-auto mt-12 hidden w-full max-w-4xl sm:block">
          {HOURS.map((hour) => (
            <Image
              key={hour}
              data-hour={hour}
              src={SCENE[hour]}
              alt={t(ui.world.sceneAlt, locale)}
              width={634}
              height={182}
              sizes="(min-width: 1024px) 896px, 100vw"
              className="pixelated h-auto w-full"
            />
          ))}

          {/* Pulled up under the islands, where the concept art hangs them —
              the sprites' own waterline leaves room above the plate. */}
          <ul className="-mt-6 grid grid-cols-3 gap-3 lg:-mt-8 lg:gap-6">
            {dataClasses.map((c) => (
              <li key={c.id} className="flex">
                <button
                  type="button"
                  onClick={() => exploreClass(c.category)}
                  className={`pixel-shadow pixel-lift bg-surface/90 w-full border-2 px-3 py-3 ${toneBorder[c.tone]} ${toneHover[c.tone]}`}
                >
                  <Plate dataClass={c} locale={locale} className="items-center text-center" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Narrow: one island per card ────────────────────────────────── */}
        <ul className="mt-10 grid gap-4 sm:hidden">
          {dataClasses.map((c) => (
            <li key={c.id} className="flex">
              <button
                type="button"
                onClick={() => exploreClass(c.category)}
                className={`pixel-shadow pixel-lift bg-surface/90 flex w-full items-center gap-3 border-2 py-2 pr-4 pl-2 text-left ${toneBorder[c.tone]} ${toneHover[c.tone]}`}
              >
                <span className="block w-24 shrink-0">
                  {HOURS.map((hour) => (
                    <Image
                      key={hour}
                      data-hour={hour}
                      src={c.world.art[hour]}
                      alt={t(c.world.alt, locale)}
                      width={177}
                      height={182}
                      sizes="96px"
                      className="pixelated h-auto w-full"
                    />
                  ))}
                </span>
                <Plate dataClass={c} locale={locale} />
              </button>
            </li>
          ))}
        </ul>

        {/* ── Footer: the way in, and a tip ──────────────────────────────── */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
          <PixelLink href="#projects" variant="primary" className="shrink-0">
            {t(ui.world.enter, locale)}
            <ArrowRight size={16} strokeWidth={3} aria-hidden="true" />
          </PixelLink>

          <p className="pixel-shadow-sm font-term text-ink border-line bg-surface/90 flex max-w-xs items-start gap-3 border-2 px-4 py-2.5 text-base leading-snug sm:text-lg">
            <span aria-hidden="true" className="text-accent leading-none">
              ★
            </span>
            <span>
              <span className="text-accent">{t(ui.world.tip.label, locale)}</span>{" "}
              {t(ui.world.tip.body, locale)}
            </span>
          </p>
        </div>

        <p className="font-pixel text-primary mt-8 text-center text-sm font-semibold tracking-wide uppercase sm:text-base">
          {t(ui.world.footer, locale)}
        </p>
      </div>
    </section>
  );
}
