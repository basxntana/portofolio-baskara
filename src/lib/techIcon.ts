import {
  Binary,
  Brain,
  ChartNoAxesColumn,
  ChartPie,
  Code,
  Container,
  Cpu,
  Database,
  FileSpreadsheet,
  FileStack,
  Filter,
  GitBranch,
  Layers,
  Package,
  Server,
  Share2,
  Sigma,
  Table,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** Longest match wins, so "PostgreSQL" does not fall through to "SQL". */
const MAP: [string, LucideIcon][] = [
  ["postgresql", Server],
  ["apache airflow", Workflow],
  ["airflow", Workflow],
  ["docker", Container],
  ["dbt", Layers],
  ["python", Code],
  ["sql", Database],
  ["pandas", Table],
  ["numpy", Sigma],
  ["scikit-learn", Cpu],
  ["mlxtend", Share2],
  ["matplotlib", ChartPie],
  ["seaborn", ChartPie],
  ["power bi", ChartNoAxesColumn],
  ["excel", FileSpreadsheet],
  ["tensorflow", Brain],
  ["pytorch", Brain],
  ["keras", Brain],
  ["lstm", Brain],
  ["git", GitBranch],
  ["csv", FileStack],
  ["raw", FileStack],
  ["clean", Filter],
  ["warehouse", Database],
  ["mart", ChartNoAxesColumn],
  ["binary", Binary],
];

export function techIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  for (const [key, Icon] of MAP) {
    if (l.includes(key)) return Icon;
  }
  return Package;
}
