/**
 * mulberry32 — a tiny deterministic PRNG.
 *
 * Scenes are generated, not hand-drawn, so they must render identically on the
 * server and the client. Math.random() would hydrate differently every time.
 */
export function rng(seed: number) {
  let a = seed >>> 0;
  return function next(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Integer in [min, max]. */
export function randInt(next: () => number, min: number, max: number): number {
  return min + Math.floor(next() * (max - min + 1));
}
