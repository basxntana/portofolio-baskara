import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate px-4 py-16 sm:px-6 sm:py-24 ${className}`}
    >
      {/* Y2K checker seam instead of a plain rule. */}
      <div aria-hidden className="bg-checker absolute inset-x-0 top-0 h-3 opacity-70" />
      {/* Tilemap underlay, faded toward the edges so text stays readable. */}
      <div
        aria-hidden
        className="bg-tilegrid absolute inset-0 -z-10 opacity-40"
        style={{ maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)" }}
      />
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
