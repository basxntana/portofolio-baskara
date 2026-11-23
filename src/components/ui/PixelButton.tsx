import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";

/* Filled, square-cornered, sitting on a hard shadow it presses into on hover —
   the button style from assets/styles/pixel-ui.css. */
const variants: Record<Variant, string> = {
  primary: "bg-primary text-bg border-primary",
  secondary: "bg-secondary text-bg border-secondary",
  accent: "bg-accent text-bg border-accent",
  ghost: "bg-surface text-ink border-line hover:border-primary hover:text-primary",
};

const base =
  "pixel-shadow pixel-press font-pixel inline-flex items-center justify-center gap-2 border-2 px-4 py-2.5 text-sm leading-none font-semibold tracking-wide uppercase select-none sm:text-base";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function PixelLink({
  href,
  external = false,
  children,
  variant = "primary",
  className = "",
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function PixelButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** A dead control that explains itself, used where a repo is not public yet. */
export function PixelDisabled({
  children,
  title,
  className = "",
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <span
      title={title}
      aria-label={title}
      className={`pixel-shadow font-pixel text-muted border-line bg-surface inline-flex cursor-not-allowed items-center justify-center gap-2 border-2 px-4 py-2.5 text-sm leading-none font-semibold tracking-wide uppercase select-none sm:text-base ${className}`}
    >
      {children}
    </span>
  );
}
