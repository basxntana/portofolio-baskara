import { profile } from "@/data/profile";

const items = [profile.tagline, ...profile.disciplines, "Enter the Data World"];

/**
 * Y2K scrolling banner. Decorative: the run is drawn twice so the -50% loop
 * is seamless, and the whole strip is hidden from assistive tech.
 */
export function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="bg-primary text-bg overflow-hidden border-y-[3px] border-[var(--px-shadow)] py-2"
    >
      <div className="animate-marquee font-pixel flex w-max text-sm tracking-widest whitespace-nowrap uppercase sm:text-base">
        {[0, 1].flatMap((copy) =>
          items.map((t) => (
            <span key={`${copy}-${t}`} className="px-6">
              ★ {t}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
