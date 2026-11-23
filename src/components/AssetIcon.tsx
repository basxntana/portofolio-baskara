import Image from "next/image";

/**
 * Icons from the asset pack (assets/icons, copied to public/assets/icons).
 *
 * They carry their own palette colours, so they are rendered as images rather
 * than inlined and tinted. `unoptimized` keeps them out of the image optimizer,
 * which refuses SVG by default — they are a few hundred bytes each anyway.
 *
 * Those colours assume a dark surface, so `globals.css` adapts them in daylight
 * (see `.asset-icon` / `.asset-icon-mono`).
 */
export const ASSET_ICONS = {
  "data-engineer": "/assets/icons/data-engineer.svg",
  "data-analyst": "/assets/icons/data-analyst.svg",
  "data-scientist": "/assets/icons/data-scientist.svg",
  database: "/assets/icons/database.svg",
  pipeline: "/assets/icons/pipeline.svg",
  "machine-learning": "/assets/icons/machine-learning.svg",
  python: "/assets/icons/python.svg",
  sql: "/assets/icons/sql.svg",
  cloud: "/assets/icons/cloud.svg",
  github: "/assets/icons/github.svg",
  linkedin: "/assets/icons/linkedin.svg",
  email: "/assets/icons/email.svg",
} as const;

export type AssetIconName = keyof typeof ASSET_ICONS;

/** Icons whose single colour is near-white, so daylight has to invert them. */
const MONO: AssetIconName[] = ["github"];

export function AssetIcon({
  name,
  size = 20,
  className = "",
  alt = "",
}: {
  name: AssetIconName;
  size?: number;
  className?: string;
  /** Leave empty for decoration; set it when the icon is the only label. */
  alt?: string;
}) {
  return (
    <Image
      src={ASSET_ICONS[name]}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      aria-hidden={alt ? undefined : true}
      className={`asset-icon ${MONO.includes(name) ? "asset-icon-mono" : ""} ${className}`}
    />
  );
}
