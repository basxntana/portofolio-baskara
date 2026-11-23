import { AssetIcon, type AssetIconName } from "@/components/AssetIcon";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";

/** Twenty is enough to read as a bar and few enough to read as blocks. */
const BLOCKS = 20;

/* The three the concept art draws across the loading box: a store, a chart and
   a model. The class icons proper — a gear, a chart and a bulb — are the roles;
   these are what the roles work on, which is what the art shows. */
const CLASSES: { icon: AssetIconName; label: { en: string; id: string } }[] = [
  { icon: "database", label: ui.loading.classes.engineer },
  { icon: "data-analyst", label: ui.loading.classes.analyst },
  { icon: "machine-learning", label: ui.loading.classes.scientist },
];

/**
 * The 8-bit loading screen from the supplied concept art.
 *
 * The art pack ships this as one flat image with "INITIALIZING DATA WORLD...",
 * "32%" and the three class names painted into it. None of that could be
 * translated, so only the sky is used as a picture; the box, the bar and the
 * labels are rebuilt here as text in the reader's language.
 */
export function LoadingScreen({
  locale,
  /** 0 → 1. */
  progress,
  label,
}: {
  locale: Locale;
  progress: number;
  label: string;
}) {
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  const filled = Math.round((percent / 100) * BLOCKS);

  return (
    <div className="loading-sky absolute inset-0 overflow-hidden">
      {/* The panorama sits along the bottom at its own proportions so neither
          the boy on the left nor the city on the right is cropped away. */}
      <div className="loading-art absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, color-mix(in srgb, var(--color-bg) 72%, transparent), color-mix(in srgb, var(--color-bg) 30%, transparent) 70%, transparent)",
        }}
      />
      <div
        className="bg-scanlines pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
      />

      <div className="relative flex h-full w-full flex-col items-center justify-center px-5 py-12 sm:px-8">
        <h2 className="text-primary text-glow text-center text-3xl leading-tight sm:text-5xl lg:text-6xl">
          {profile.name.toUpperCase()}
        </h2>
        <p className="font-pixel text-ink mt-3 text-center text-sm font-semibold tracking-[0.3em] uppercase sm:text-lg">
          {t(profile.title, locale)}
        </p>
        <p className="font-term text-secondary mt-1 text-center text-base sm:text-xl">
          {profile.disciplines.join(" · ")}
        </p>

        <div className="pixel-shadow border-secondary bg-surface/92 mt-8 w-full max-w-md border-2 px-5 py-5 backdrop-blur-[2px] sm:px-7 sm:py-6">
          <p className="font-term text-accent text-center text-lg tracking-wider sm:text-xl">
            {label}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div
              className="border-line flex flex-1 gap-[2px] border-2 p-[2px]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              aria-label={t(ui.loading.label, locale)}
            >
              {Array.from({ length: BLOCKS }, (_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`h-3 flex-1 ${i < filled ? "bg-primary" : "bg-surface-2"}`}
                />
              ))}
            </div>
            {/* Fixed width: the readout must not shove the bar about as it
                counts from 0% to 100%. */}
            <span className="font-term text-ink w-12 shrink-0 text-right text-lg sm:text-xl">
              {percent}%
            </span>
          </div>

          <ul className="mt-5 flex items-start justify-between gap-2">
            {CLASSES.map((c) => (
              <li key={c.icon} className="flex flex-1 flex-col items-center gap-2">
                <AssetIcon name={c.icon} size={28} className="pixelated" />
                <span className="font-pixel text-muted text-center text-[0.65rem] font-semibold tracking-wider uppercase sm:text-xs">
                  {t(c.label, locale)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pixel-shadow-sm border-line bg-surface/92 mt-6 flex max-w-xs items-start gap-3 border-2 px-4 py-3 backdrop-blur-[2px]">
          <span aria-hidden="true" className="text-accent text-base leading-none">
            ★
          </span>
          <p className="font-term text-ink text-base leading-snug sm:text-lg">
            <span className="text-accent">{t(ui.loading.tip.label, locale)}</span>{" "}
            {t(ui.loading.tip.body, locale)}
          </p>
        </div>
      </div>
    </div>
  );
}
