import type { ElementType, ReactNode } from "react";

export type Tone = "primary" | "secondary" | "accent" | "muted" | "line";

/* Square corners, 2px solid border, hard offset shadow — the panel style from
   assets/styles/pixel-ui.css. */
const borderTone: Record<Tone, string> = {
  primary: "border-primary",
  secondary: "border-secondary",
  accent: "border-accent",
  muted: "border-muted",
  line: "border-line",
};

const glowTone: Record<Tone, string> = {
  primary: "0 0 28px -8px var(--color-primary)",
  secondary: "0 0 28px -8px var(--color-secondary)",
  accent: "0 0 28px -8px var(--color-accent)",
  muted: "",
  line: "",
};

const barTone: Record<Tone, string> = {
  primary: "bg-primary text-bg",
  secondary: "bg-secondary text-bg",
  accent: "bg-accent text-bg",
  muted: "bg-muted text-bg",
  line: "bg-line text-ink",
};

export function PixelPanel({
  children,
  tone = "line",
  className = "",
  innerClassName = "",
  as: Tag = "div",
  glow = false,
  title,
}: {
  /** When set, the panel gets a Y2K window title bar with this filename. */
  title?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Padding and layout for the content; the border lives on the wrapper. */
  innerClassName?: string;
  as?: ElementType;
  glow?: boolean;
}) {
  /* Only the glowing variant needs an inline style; keeping the default on the
     `pixel-shadow` class means a hover utility can still override it. */
  const glowing = glow && glowTone[tone];

  return (
    <Tag
      className={`bg-surface border-2 ${borderTone[tone]} ${glowing ? "" : "pixel-shadow"} ${className}`}
      style={
        glowing
          ? { boxShadow: `4px 4px 0 var(--px-shadow), ${glowTone[tone]}` }
          : undefined
      }
    >
      {title ? (
        <div
          aria-hidden="true"
          className={`${barTone[tone]} font-pixel flex items-center justify-between gap-3 px-2 py-1 text-xs tracking-wider`}
        >
          <span className="truncate">▣ {title}</span>
          <span className="flex shrink-0 gap-1">
            {["_", "□", "×"].map((b) => (
              <span
                key={b}
                className="bg-surface text-ink grid h-4 w-4 place-items-center border border-current text-[10px] leading-none"
              >
                {b}
              </span>
            ))}
          </span>
        </div>
      ) : null}
      <div className={innerClassName}>{children}</div>
    </Tag>
  );
}
