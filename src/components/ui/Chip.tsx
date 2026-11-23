const toneCls = {
  primary: "text-primary border-primary/55",
  secondary: "text-secondary border-secondary/55",
  accent: "text-accent border-accent/55",
  muted: "text-muted border-line",
} as const;

export function Chip({
  children,
  tone = "muted",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneCls;
  className?: string;
}) {
  return (
    <span
      className={`font-term bg-surface inline-block border-2 px-2 py-[2px] text-base leading-tight ${toneCls[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
