"use client";

import { useState } from "react";
import { Info, Trophy } from "lucide-react";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StatBar } from "@/components/ui/StatBar";
import {
  levelProgress,
  playerLevel,
  skillTabs,
  skills,
  totalXp,
  xpToNextLevel,
  type SkillGroup,
} from "@/data/skills";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

const XP_BLOCKS = 16;

export function Skills({ locale }: { locale: Locale }) {
  const [tab, setTab] = useState<"all" | SkillGroup>("all");

  const shown =
    tab === "all" ? skills : skills.filter((s) => s.groups.includes(tab));
  const litBlocks = Math.round(levelProgress * XP_BLOCKS);

  return (
    <Section id="skills" labelledBy="skills-heading">
      <SectionHeading
        id="skills-heading"
        index="04"
        title={t(ui.skills.title, locale)}
        tone="primary"
        subtitle={t(ui.skills.subtitle, locale)}
      />

      {/* Level + XP header */}
      <Reveal>
        <PixelPanel tone="primary" title="player_level.dat" innerClassName="px-5 py-5 sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <span className="font-pixel text-primary shrink-0 text-xs tracking-wider sm:text-sm">
                LV. {playerLevel}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className="flex gap-[3px]"
                  role="meter"
                  aria-label={t(ui.skills.levelProgress, locale)}
                  aria-valuenow={Math.round(levelProgress * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuetext={`${xpToNextLevel} ${t(ui.skills.xpToNext, locale)} ${playerLevel + 1}`}
                >
                  {Array.from({ length: XP_BLOCKS }, (_, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className={`h-3 flex-1 ${i < litBlocks ? "bg-primary" : "bg-line"}`}
                    />
                  ))}
                </div>
                <p className="font-term text-muted mt-2 text-sm">
                  {xpToNextLevel.toLocaleString(locale === "id" ? "id-ID" : "en-US")}{" "}
                  {t(ui.skills.xpToNext, locale)} {playerLevel + 1}
                </p>
              </div>
            </div>

            <div className="border-accent/55 bg-surface-2 flex items-center gap-3 border-2 px-3 py-2">
              <Trophy size={16} strokeWidth={2.5} className="text-accent" aria-hidden="true" />
              <div>
                <p className="font-pixel text-muted text-xs tracking-wider uppercase">
                  {t(ui.skills.totalXp, locale)}
                </p>
                <p className="font-term text-accent text-lg leading-tight">
                  {totalXp.toLocaleString(locale === "id" ? "id-ID" : "en-US")}
                </p>
              </div>
            </div>
          </div>
        </PixelPanel>
      </Reveal>

      {/* Tabs */}
      <div
        role="group"
        aria-label={t(ui.skills.filterLabel, locale)}
        className="mt-8 mb-2 flex flex-wrap gap-2"
      >
        {skillTabs.map((entry) => {
          const on = tab === entry.id;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setTab(entry.id)}
              aria-pressed={on}
              className={`font-pixel pixel-shadow-sm pixel-press border-2 px-3 py-2 text-sm font-semibold tracking-wide uppercase ${
                on
                  ? "bg-primary text-bg border-primary"
                  : "bg-surface text-muted border-line hover:text-ink hover:border-primary"
              }`}
            >
              {t(ui.skills.tabs[entry.id], locale)}
            </button>
          );
        })}
      </div>

      <p className="font-term text-muted mb-6 text-base" aria-live="polite">
        {shown.length}{" "}
        {shown.length === 1 ? t(ui.skills.stat, locale) : t(ui.skills.stats, locale)}{" "}
        {t(ui.skills.shown, locale)}
      </p>

      <PixelPanel tone="line" title="skill_tree.db" innerClassName="px-4 py-2 sm:px-6">
        <ul className="divide-line grid divide-y-[3px] md:grid-cols-2 md:gap-x-8 md:divide-y-0">
          {shown.map((s, i) => (
            <StatBar key={s.name} skill={s} locale={locale} delay={(i % 8) * 0.04} />
          ))}
        </ul>
      </PixelPanel>

      {/* The honest footnote the brief asks for. */}
      <Reveal delay={0.1}>
        <p className="text-muted mt-8 flex max-w-3xl items-start gap-3 text-xs leading-relaxed">
          <Info size={16} strokeWidth={2.5} className="text-accent mt-px shrink-0" aria-hidden="true" />
          <span>
            {t(ui.skills.disclaimer, locale)}
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
