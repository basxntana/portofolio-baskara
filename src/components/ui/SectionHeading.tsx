import type { ReactNode } from "react";

const toneText = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
} as const;

const toneBg = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
} as const;

export function SectionHeading({
  index,
  title,
  subtitle,
  tone = "primary",
  id,
}: {
  /** Game-menu style ordinal, e.g. "02". */
  index?: string;
  title: string;
  subtitle?: ReactNode;
  tone?: keyof typeof toneText;
  id?: string;
}) {
  return (
    <header className="mb-10 sm:mb-14">
      <div className="mb-4 flex items-center gap-3">
        {index ? (
          <span
            className={`${toneBg[tone]} font-pixel text-bg pixel-shadow-sm px-2 py-1 text-xs leading-none tracking-widest`}
          >
            STAGE {index}
          </span>
        ) : null}
        <span
          className={`${toneBg[tone]} motion-safe:animate-blink-block block h-3 w-3`}
          aria-hidden="true"
        />
        <span className={`${toneBg[tone]} block h-3 w-3 opacity-60`} aria-hidden="true" />
        <span className={`${toneBg[tone]} block h-3 w-3 opacity-30`} aria-hidden="true" />
        <span className={`${toneBg[tone]} block h-[3px] w-10 sm:w-16`} aria-hidden="true" />
      </div>

      <h2
        id={id}
        className={`${toneText[tone]} text-arcade relative inline-block text-3xl leading-tight sm:text-5xl`}
      >
        {title}
        {/* Y2K sparkles, out of phase so they never flash together. */}
        <span
          aria-hidden="true"
          className="motion-safe:animate-twinkle text-ink absolute -top-3 -right-6 text-base sm:-right-8 sm:text-xl"
        >
          ✦
        </span>
        <span
          aria-hidden="true"
          className="motion-safe:animate-twinkle text-ink absolute -right-10 bottom-0 text-xs [animation-delay:1.3s] sm:-right-14 sm:text-sm"
        >
          ✦
        </span>
      </h2>

      {subtitle ? (
        <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
