import { PALETTE, SPRITES, type SpriteName } from "./sprites";

type Run = { x: number; y: number; w: number; fill: string };

/**
 * Collapses each row into horizontal runs of one colour, so a 14×16 sprite
 * emits ~40 rects instead of 224.
 */
function toRuns(rows: readonly string[]): Run[] {
  const runs: Run[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === ".") {
        x += 1;
        continue;
      }
      let w = 1;
      while (x + w < row.length && row[x + w] === ch) w += 1;
      const fill = PALETTE[ch];
      if (fill === undefined) {
        if (process.env.NODE_ENV !== "production") {
          throw new Error(
            `Sprite pixel "${ch}" has no PALETTE entry (row ${y}, column ${x}).`,
          );
        }
        // Production: a loud colour beats a blank hole.
        runs.push({ x, y, w, fill: "#ff00ff" });
        x += w;
        continue;
      }
      runs.push({ x, y, w, fill });
      x += w;
    }
  });

  return runs;
}

function assertRect(name: string, rows: readonly string[]) {
  if (process.env.NODE_ENV === "production") return;
  const width = rows[0]?.length ?? 0;
  const bad = rows.findIndex((r) => r.length !== width);
  if (bad !== -1) {
    throw new Error(
      `Sprite "${name}" row ${bad} is ${rows[bad].length} px wide, expected ${width}.`,
    );
  }
}

export function PixelSprite({
  name,
  className = "",
  title,
  scale = 1,
}: {
  name: SpriteName;
  className?: string;
  /** Omit for purely decorative art; the SVG is then aria-hidden. */
  title?: string;
  /** Multiplies the intrinsic pixel size; the SVG still scales with CSS. */
  scale?: number;
}) {
  const rows = SPRITES[name];
  assertRect(name, rows);

  const cols = rows[0].length;
  const runs = toRuns(rows);

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows.length}`}
      width={cols * scale}
      height={rows.length * scale}
      shapeRendering="crispEdges"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {runs.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}
