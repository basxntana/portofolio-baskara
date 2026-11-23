"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CircleDot, Lock } from "lucide-react";
import { AssetIcon } from "@/components/AssetIcon";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PixelLink, PixelDisabled } from "@/components/ui/PixelButton";
import { useWorld } from "@/components/WorldProvider";
import { swap } from "@/lib/retro";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { t, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/paths";
import { ui } from "@/data/ui";

const categoryTone: Record<ProjectCategory, "primary" | "secondary" | "accent"> = {
  "Data Engineering": "primary",
  "Data Analytics": "secondary",
  "Data Science": "accent",
};

const toneText = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
} as const;

function StatusBadge({
  status,
  locale,
}: {
  status: Project["status"];
  locale: Locale;
}) {
  if (status === "completed") {
    return (
      <span className="font-term text-primary inline-flex items-center gap-1.5 text-base">
        <span aria-hidden="true">&#10003;</span> {t(ui.projects.completed, locale)}
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="font-term text-accent inline-flex items-center gap-1.5 text-base">
        <CircleDot size={12} strokeWidth={3} aria-hidden="true" className="motion-safe:animate-pulse-dot" />
        {t(ui.projects.inProgress, locale)}
      </span>
    );
  }
  return (
    <span className="font-term text-muted inline-flex items-center gap-1.5 text-base">
      {t(ui.projects.planned, locale)}
    </span>
  );
}

function QuestCard({ project, locale }: { project: Project; locale: Locale }) {
  const tone = categoryTone[project.category];

  return (
    <PixelPanel
      tone={tone}
      className="pixel-lift h-full"
      innerClassName="flex h-full flex-col"
    >
      {project.cover ? (
        <div className="border-line relative aspect-[16/7] w-full overflow-hidden border-b-[3px]">
          <Image
            src={project.cover}
            alt={`${t(ui.projects.coverAlt, locale)} ${project.title}`}
            fill
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw"
            className="bg-surface-2 object-cover object-top"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col px-5 py-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <p className="font-pixel text-muted text-sm tracking-wider uppercase">
            {t(ui.projects.questNo, locale)} {project.quest}
          </p>
          <StatusBadge status={project.status} locale={locale} />
        </div>

        <h3 className="text-ink text-xl leading-snug sm:text-2xl">
          {project.title.toUpperCase()}
        </h3>

        <p className={`font-term mt-3 text-base ${toneText[tone]}`}>
          {t(ui.projects.classLabel, locale)}: {project.category.toUpperCase()}
        </p>

        <p className="text-muted mt-4 text-sm leading-relaxed">
          {t(project.summary, locale)}
        </p>

        <div className="mt-5">
          <p className="font-pixel text-muted mb-2 text-xs tracking-wider uppercase">
            {t(ui.projects.focus, locale)}
          </p>
          <p className="font-term text-ink text-base leading-snug">
            {t(project.focus, locale).join(" · ")}
          </p>
        </div>

        <div className="mt-4">
          <p className="font-pixel text-muted mb-2 text-xs tracking-wider uppercase">
            {t(ui.projects.stack, locale)}
          </p>
          <p className="font-term text-muted text-base leading-snug">
            {project.tech.join(" · ")}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <PixelLink href={localePath(locale, `projects/${project.slug}`)} variant={tone}>
            {t(ui.projects.viewQuest, locale)}
            <ArrowRight size={13} strokeWidth={3} aria-hidden="true" />
          </PixelLink>

          {project.repoUrl ? (
            <PixelLink href={project.repoUrl} external variant="ghost">
              <AssetIcon name="github" size={16} />
              {t(ui.projects.repo, locale)}
            </PixelLink>
          ) : (
            <PixelDisabled title={t(ui.projects.repoPrivateTitle, locale)}>
              <Lock size={13} strokeWidth={2.5} aria-hidden="true" />
              {t(ui.projects.repoPrivate, locale)}
            </PixelDisabled>
          )}
        </div>
      </div>
    </PixelPanel>
  );
}

export function Projects({ locale }: { locale: Locale }) {
  const { filter, setFilter } = useWorld();
  const reduced = useReducedMotion();

  const shown =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="projects" labelledBy="projects-heading">
      <SectionHeading
        id="projects-heading"
        index="03"
        title={t(ui.projects.title, locale)}
        tone="secondary"
        subtitle={t(ui.projects.subtitle, locale)}
      />

      {/* Filters */}
      <div
        role="group"
        aria-label={t(ui.projects.filterLabel, locale)}
        className="mb-4 flex flex-wrap gap-2"
      >
        {projectCategories.map((cat) => {
          const on = filter === cat;
          const count =
            cat === "All"
              ? projects.length
              : projects.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={on}
              className={`font-pixel pixel-shadow-sm pixel-press border-2 px-3 py-2 text-sm font-semibold tracking-wide uppercase ${
                on
                  ? "bg-secondary text-bg border-secondary"
                  : "bg-surface text-muted border-line hover:text-ink hover:border-secondary"
              }`}
            >
              {cat === "All" ? t(ui.projects.all, locale) : cat}
              <span className="font-term ml-2 text-sm">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="font-term text-muted mb-8 text-base" aria-live="polite">
        {shown.length}{" "}
        {shown.length === 1
          ? t(ui.projects.quest, locale)
          : t(ui.projects.quests, locale)}{" "}
        {t(ui.projects.shown, locale)}
        {filter === "All" ? "" : ` · ${filter}`}
      </p>

      <motion.ul layout={!reduced} className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={reduced ? { duration: 0.01 } : swap}
            >
              <QuestCard project={project} locale={locale} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {shown.length === 0 ? (
        <p className="text-muted font-term py-10 text-lg">
          {t(ui.projects.empty, locale)}
        </p>
      ) : null}
    </Section>
  );
}
