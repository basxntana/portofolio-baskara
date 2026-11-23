/**
 * Player stats.
 *
 * Levels and XP are a gamification device, not a calibrated assessment — the
 * disclaimer under the section says so, and it should stay there.
 *
 * TODO(baskara): these are the numbers from the brief plus conservative
 * estimates for the tools your two shipped projects actually used.
 * Adjust any that feel wrong.
 */

import type { LText } from "@/lib/i18n";

export type SkillGroup = "engineering" | "analytics" | "science" | "tools";

export type Skill = {
  name: string;
  level: number;
  /** A skill can belong to more than one tab — SQL is both. */
  groups: SkillGroup[];
  tone: "primary" | "secondary" | "accent";
  /** Lucide icon name, resolved in the Skills component. */
  icon:
    | "code"
    | "database"
    | "branch"
    | "server"
    | "workflow"
    | "container"
    | "layers"
    | "table"
    | "chart"
    | "pie"
    | "brain"
    | "sigma"
    | "cpu";
  note?: LText;
};

export const MAX_LEVEL = 10;

export const skills: Skill[] = [
  { name: "Python", level: 8, groups: ["tools", "engineering", "analytics", "science"], tone: "primary", icon: "code", note: { en: "Pipelines, analysis, modelling", id: "Pipeline, analisis, pemodelan" } },
  { name: "SQL", level: 7, groups: ["tools", "engineering", "analytics"], tone: "primary", icon: "database", note: { en: "Window functions, CTEs, modelling", id: "Window function, CTE, pemodelan" } },
  { name: "Git", level: 7, groups: ["tools"], tone: "primary", icon: "branch" },

  { name: "Data Engineering", level: 6, groups: ["engineering"], tone: "primary", icon: "workflow", note: { en: "ELT, warehousing, data quality", id: "ELT, warehousing, kualitas data" } },
  { name: "PostgreSQL", level: 7, groups: ["engineering", "tools"], tone: "primary", icon: "server" },
  { name: "Apache Airflow", level: 6, groups: ["engineering", "tools"], tone: "primary", icon: "workflow" },
  { name: "Docker", level: 6, groups: ["engineering", "tools"], tone: "primary", icon: "container" },
  { name: "dbt", level: 5, groups: ["engineering", "tools"], tone: "primary", icon: "layers" },

  { name: "Data Analytics", level: 7, groups: ["analytics"], tone: "secondary", icon: "chart", note: { en: "EDA, segmentation, reporting", id: "EDA, segmentasi, pelaporan" } },
  { name: "pandas / NumPy", level: 8, groups: ["analytics", "science", "tools"], tone: "secondary", icon: "table" },
  { name: "Matplotlib", level: 7, groups: ["analytics", "science"], tone: "secondary", icon: "pie" },
  { name: "Excel", level: 7, groups: ["analytics", "tools"], tone: "secondary", icon: "table" },
  { name: "Power BI", level: 5, groups: ["analytics", "tools"], tone: "secondary", icon: "chart" },

  { name: "Data Science", level: 6, groups: ["science"], tone: "accent", icon: "brain", note: { en: "Statistical & ML modelling", id: "Pemodelan statistik & ML" } },
  { name: "scikit-learn", level: 6, groups: ["science", "tools"], tone: "accent", icon: "cpu" },
  { name: "Statistics", level: 6, groups: ["science"], tone: "accent", icon: "sigma" },
  { name: "TensorFlow / PyTorch", level: 4, groups: ["science", "tools"], tone: "accent", icon: "brain", note: { en: "Learning in progress", id: "Sedang dipelajari" } },
];

export const skillTabs: { id: "all" | SkillGroup }[] = [
  { id: "all" },
  { id: "engineering" },
  { id: "analytics" },
  { id: "science" },
  { id: "tools" },
];

/* ── XP ───────────────────────────────────────────────────────────────────
   Derived from the levels so the two can never drift apart. Cosmetic. */

const XP_PER_LEVEL = 100;
const XP_PER_PLAYER_LEVEL = 1600;

export const totalXp = skills.reduce((sum, s) => sum + s.level * XP_PER_LEVEL, 0);
export const playerLevel = Math.floor(totalXp / XP_PER_PLAYER_LEVEL) + 1;

/** How far through the current player level we are, 0–1. */
export const levelProgress =
  (totalXp % XP_PER_PLAYER_LEVEL) / XP_PER_PLAYER_LEVEL;

export const xpToNextLevel =
  XP_PER_PLAYER_LEVEL - (totalXp % XP_PER_PLAYER_LEVEL);

/** Flat list, for the compact readout in the hero terminal. */
export const headlineSkills = ["Python", "SQL", "PostgreSQL", "Airflow", "Docker", "pandas"];
