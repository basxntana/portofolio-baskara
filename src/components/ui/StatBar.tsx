"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Brain,
  ChartNoAxesColumn,
  ChartPie,
  Code,
  Container,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Sigma,
  Table,
  Workflow,
} from "lucide-react";
import { MAX_LEVEL, type Skill } from "@/data/skills";
import { stepEaseChunky } from "@/lib/retro";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

const icons = {
  code: Code,
  database: Database,
  branch: GitBranch,
  server: Server,
  workflow: Workflow,
  container: Container,
  layers: Layers,
  table: Table,
  chart: ChartNoAxesColumn,
  pie: ChartPie,
  brain: Brain,
  sigma: Sigma,
  cpu: Cpu,
} as const;

const toneBg = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
} as const;

const toneText = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
} as const;

/**
 * A skill row drawn as discrete blocks, the way an 8-bit HP meter would be.
 * Blocks are decorative; the real value is exposed via role="meter".
 */
export function StatBar({
  skill,
  locale,
  delay = 0,
}: {
  skill: Skill;
  locale: Locale;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const filled = Math.max(0, Math.min(MAX_LEVEL, skill.level));
  const Icon = icons[skill.icon];

  return (
    <li className="flex items-center gap-3 py-3 sm:gap-4">
      <span
        className={`bg-surface-2 border-line ${toneText[skill.tone]} flex h-9 w-9 shrink-0 items-center justify-center border-2`}
        aria-hidden="true"
      >
        <Icon size={17} strokeWidth={2.5} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <span className="font-pixel text-ink truncate text-sm leading-relaxed tracking-wide uppercase sm:text-base">
            {skill.name}
          </span>
          <span className={`font-term shrink-0 text-base leading-none ${toneText[skill.tone]}`}>
            LV.&nbsp;{filled}
          </span>
        </div>

        <div
          className="flex gap-[3px]"
          role="meter"
          aria-label={`${skill.name} ${t(ui.skills.levelOf, locale)}`}
          aria-valuenow={filled}
          aria-valuemin={0}
          aria-valuemax={MAX_LEVEL}
          aria-valuetext={`${t(ui.skills.levelOf, locale)} ${filled} / ${MAX_LEVEL}`}
        >
          {Array.from({ length: MAX_LEVEL }, (_, i) => {
            const on = i < filled;
            return (
              <motion.span
                key={i}
                aria-hidden="true"
                className={`h-3 flex-1 ${on ? toneBg[skill.tone] : "bg-line"}`}
                initial={reduced ? false : { scaleY: 0 }}
                whileInView={reduced ? undefined : { scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.1,
                  delay: delay + i * 0.045,
                  ease: stepEaseChunky,
                }}
                style={{ transformOrigin: "bottom" }}
              />
            );
          })}
        </div>

        {skill.note ? (
          <p className="text-muted mt-2 text-xs leading-relaxed">
            {t(skill.note, locale)}
          </p>
        ) : null}
      </div>
    </li>
  );
}
