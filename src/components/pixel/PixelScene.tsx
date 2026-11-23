import type { Rect } from "./scenes";

/**
 * Renders a generated scene as flat SVG rectangles.
 *
 * `preserveAspectRatio="xMidYMax slice"` lets a skyline fill a banner of any
 * shape while keeping the ground line pinned to the bottom edge.
 */
export function PixelScene({
  rects,
  width,
  height,
  className = "",
  title,
  fill = false,
}: {
  rects: Rect[];
  width: number;
  height: number;
  className?: string;
  /** Omit for decorative scenery; the SVG is then aria-hidden. */
  title?: string;
  /** Stretch to the container and crop, instead of scaling to fit. */
  fill?: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={fill ? "xMidYMax slice" : "xMidYMid meet"}
      shapeRendering="crispEdges"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} />
      ))}
    </svg>
  );
}
