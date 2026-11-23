import type { AssetIconName } from "@/components/AssetIcon";

/**
 * Where the asset pack ships a real icon for a technology, prefer it over the
 * generic Lucide glyph. Longest match wins, so "PostgreSQL" does not fall
 * through to "SQL".
 */
const MAP: [string, AssetIconName][] = [
  ["postgresql", "database"],
  ["python", "python"],
  ["sql", "sql"],
  ["airflow", "pipeline"],
  ["dbt", "pipeline"],
  ["aws", "cloud"],
  ["docker", "cloud"],
  ["scikit-learn", "machine-learning"],
  ["tensorflow", "machine-learning"],
  ["pytorch", "machine-learning"],
  ["keras", "machine-learning"],
  ["lstm", "machine-learning"],
];

export function techAsset(label: string): AssetIconName | null {
  const l = label.toLowerCase();
  for (const [key, name] of MAP) {
    if (l.includes(key)) return name;
  }
  return null;
}
