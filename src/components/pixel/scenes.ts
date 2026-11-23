import { randInt, rng } from "./rng";

/**
 * Generated scene geometry, built as flat rectangles on an integer grid.
 *
 * Only the contact panel's skyline is generated now — the Data World islands
 * come from the supplied pixel asset pack instead.
 *
 * Fills are CSS custom properties, not hex, so the whole pixel world recolours
 * when the day/night theme flips without regenerating a single scene.
 */
export type Rect = { x: number; y: number; w: number; h: number; fill: string };

const V = (name: string) => `var(--px-${name})`;

/* ── Sky ─────────────────────────────────────────────────────────────────── */

/** Banded sky — flat bands read far more 8-bit than a smooth gradient. */
function skyBands(w: number, h: number): Rect[] {
  const bands = ["sky-1", "sky-2", "sky-3", "sky-4"];
  const band = Math.ceil(h / bands.length);

  return bands.map((name, i) => ({
    x: 0,
    y: i * band,
    w,
    h: i === bands.length - 1 ? h - i * band : band,
    fill: V(name),
  }));
}

function stars(next: () => number, w: number, h: number, count: number): Rect[] {
  const out: Rect[] = [];
  for (let i = 0; i < count; i += 1) {
    const size = next() > 0.82 ? 2 : 1;
    out.push({
      x: randInt(next, 1, w - 2),
      y: randInt(next, 1, Math.floor(h * 0.55)),
      w: size,
      h: size,
      fill: V("star"),
    });
  }
  return out;
}

/** A stepped disc — the 8-bit way to draw a circle. */
function disc(cx: number, cy: number, r: number, fill: string): Rect[] {
  const out: Rect[] = [];
  for (let dy = -r; dy <= r; dy += 1) {
    const dx = Math.floor(Math.sqrt(Math.max(0, r * r - dy * dy)));
    if (dx <= 0) continue;
    out.push({ x: cx - dx, y: cy + dy, w: dx * 2, h: 1, fill });
  }
  return out;
}

/* ── Buildings ───────────────────────────────────────────────────────────── */

type BuildingOpts = {
  x: number;
  w: number;
  h: number;
  groundY: number;
  body: string;
  windowLit: string;
  windowOff: string;
  next: () => number;
  litChance: number;
  /** Adds an aerial / water tower on the roof. */
  antenna?: boolean;
};

function building({
  x,
  w,
  h,
  groundY,
  body,
  windowLit,
  windowOff,
  next,
  litChance,
  antenna = false,
}: BuildingOpts): Rect[] {
  const top = groundY - h;
  const out: Rect[] = [{ x, y: top, w, h, fill: body }];

  if (antenna && w >= 6) {
    out.push({ x: x + Math.floor(w / 2) - 1, y: top - 5, w: 2, h: 5, fill: body });
    out.push({ x: x + Math.floor(w / 2) - 1, y: top - 7, w: 2, h: 2, fill: V("beacon") });
  }

  // Window grid: 2x2 cells on a 3px pitch, inset 2px from each edge.
  for (let wy = top + 3; wy < groundY - 3; wy += 4) {
    for (let wx = x + 2; wx < x + w - 3; wx += 4) {
      out.push({
        x: wx,
        y: wy,
        w: 2,
        h: 2,
        fill: next() < litChance ? windowLit : windowOff,
      });
    }
  }

  return out;
}

/* ── Public scenes ───────────────────────────────────────────────────────── */

export const SKYLINE_SIZE = { w: 320, h: 140 };

/**
 * A three-layer parallax city. Layer 0 is furthest and darkest; layer 2 is the
 * foreground with the brightest windows.
 */
export function skyline(seed = 7): Rect[] {
  const next = rng(seed);
  const { w, h } = SKYLINE_SIZE;
  const groundY = h;

  const out: Rect[] = [...skyBands(w, h), ...stars(next, w, h, 46)];

  // Moon, with a bite taken out of it.
  out.push(...disc(212, 30, 11, V("moon")));
  out.push(...disc(206, 25, 8, V("sky-1")));

  const layers = [
    { body: V("bldg-far"), lit: V("win-far"), off: V("bldg-far"), min: 34, max: 62, step: [14, 24], litChance: 0.18 },
    { body: V("bldg-mid"), lit: V("win-mid"), off: V("win-off"), min: 26, max: 50, step: [16, 26], litChance: 0.3 },
    { body: V("bldg-near"), lit: V("win-near"), off: V("win-off"), min: 16, max: 34, step: [18, 30], litChance: 0.42 },
  ] as const;

  layers.forEach((layer, li) => {
    let x = -6;
    while (x < w) {
      const bw = randInt(next, layer.step[0], layer.step[1]);
      const bh = randInt(next, layer.min, layer.max);
      out.push(
        ...building({
          x,
          w: bw,
          h: bh,
          groundY,
          body: layer.body,
          windowLit: layer.lit,
          windowOff: layer.off,
          next,
          litChance: layer.litChance,
          antenna: li === 2 && next() > 0.72,
        }),
      );
      x += bw + randInt(next, 1, 4);
    }
  });

  return out;
}
