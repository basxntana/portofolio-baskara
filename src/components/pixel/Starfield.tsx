import { randInt, rng } from "./rng";

/**
 * A scatter of 1–2px stars that flick on and off out of sync.
 *
 * Positions come from a seeded PRNG so the server and client agree, and the
 * twinkle is a 3-frame `steps()` animation — a star in an 8-bit game blinks,
 * it does not fade.
 */
export function Starfield({
  count = 36,
  seed = 99,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const next = rng(seed);

  const stars = Array.from({ length: count }, () => ({
    top: randInt(next, 2, 72),
    left: randInt(next, 1, 99),
    size: next() > 0.78 ? 2 : 1,
    // Spread the start times so they never blink in unison.
    delay: -(randInt(next, 0, 32) / 10),
    duration: 2.4 + randInt(next, 0, 18) / 10,
  }));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="motion-safe:animate-twinkle absolute block"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size * 2,
            height: s.size * 2,
            backgroundColor: "var(--px-star)",
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
