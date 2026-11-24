import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CircleDot, Lock, ShieldCheck } from "lucide-react";
import { AssetIcon } from "@/components/AssetIcon";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectTabs } from "@/components/ProjectTabs";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { PixelLink, PixelDisabled } from "@/components/ui/PixelButton";
import { Chip } from "@/components/ui/Chip";
import { getProject, projects, type ProjectCategory } from "@/data/projects";
import { shareImage, siteUrl } from "@/data/profile";
import { LOCALES, t, type Locale } from "@/lib/i18n";
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

/**
 * Every quest is prerendered by generateStaticParams, so the whole page depends
 * on `params` and there is nothing meaningful to stream behind a Suspense
 * boundary. `instant = false` tells Cache Components this route may block on
 * `params` instead of warning about a non-instant shell.
 */
export const instant = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = (LOCALES.includes(raw as Locale) ? raw : "en") as Locale;
  const project = getProject(slug);

  if (!project) return { title: t(ui.notFound.title, locale) };

  const summary = t(project.summary, locale);

  return {
    title: project.title,
    description: summary,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        en: `/en/projects/${project.slug}`,
        id: `/id/projects/${project.slug}`,
        "x-default": `/en/projects/${project.slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      title: project.title,
      description: summary,
      images: project.cover ? [{ url: project.cover }] : [shareImage],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;

  const project = getProject(slug);
  if (!project) notFound();

  const tone = categoryTone[project.category];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <>
      <Navbar locale={locale} />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Header */}
        <header className="border-line relative overflow-hidden border-b-[3px] px-4 pt-10 pb-12 sm:px-6 sm:pt-14">
          <div className="bg-tilegrid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          <div className="relative mx-auto max-w-4xl">
            <PixelLink href={localePath(locale, "#projects")} variant="ghost" className="mb-8">
              <ArrowLeft size={13} strokeWidth={3} aria-hidden="true" />
              {t(ui.detail.backToLog, locale)}
            </PixelLink>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="font-pixel text-muted text-sm tracking-wider uppercase">
                {t(ui.projects.questNo, locale)} {project.quest}
              </p>
              {project.status === "completed" ? (
                <span className="font-term text-primary inline-flex items-center gap-1.5 text-base">
                  <span aria-hidden="true">&#10003;</span>{" "}
                  {t(ui.projects.completed, locale)}
                </span>
              ) : (
                <span className="font-term text-accent inline-flex items-center gap-1.5 text-base">
                  <CircleDot size={12} strokeWidth={3} aria-hidden="true" />
                  {t(ui.projects.inProgress, locale)}
                </span>
              )}
            </div>

            <h1 className="text-ink text-glow mt-5 text-2xl leading-tight sm:text-4xl">
              {project.title.toUpperCase()}
            </h1>

            <p className={`font-pixel mt-5 text-base tracking-wider uppercase ${toneText[tone]}`}>
              {t(ui.projects.classLabel, locale)}: {project.category}
            </p>

            <p className="text-muted mt-6 max-w-3xl text-sm leading-relaxed sm:text-base">
              {t(project.summary, locale)}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech}>
                  <Chip tone={tone}>{tech}</Chip>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.repoUrl ? (
                <PixelLink href={project.repoUrl} external variant={tone}>
                  <AssetIcon name="github" size={18} />
                  {t(ui.detail.viewRepository, locale)}
                </PixelLink>
              ) : (
                <PixelDisabled title={t(ui.projects.repoPrivateTitle, locale)}>
                  <Lock size={13} strokeWidth={2.5} aria-hidden="true" />
                  {t(ui.projects.repoPrivate, locale)}
                </PixelDisabled>
              )}
              {project.demoUrl ? (
                <PixelLink href={project.demoUrl} external variant="ghost">
                  {t(ui.detail.liveDemo, locale)}
                  <ArrowRight size={13} strokeWidth={3} aria-hidden="true" />
                </PixelLink>
              ) : null}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
          {/* Honesty callout */}
          {project.detail.verification ? (
            <PixelPanel tone="accent" className="mb-10" innerClassName="flex gap-4 px-5 py-5">
              <ShieldCheck
                size={20}
                strokeWidth={2.5}
                className="text-accent mt-px shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="font-pixel text-accent mb-2 text-sm tracking-wider uppercase">
                  {t(ui.detail.scopeTitle, locale)}
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  {t(project.detail.verification, locale)}
                </p>
              </div>
            </PixelPanel>
          ) : null}

          <ProjectTabs project={project} locale={locale} />

          {/* Prev / next */}
          <nav
            aria-label={t(ui.detail.otherQuests, locale)}
            className="border-line mt-14 grid gap-4 border-t-[3px] pt-10 sm:grid-cols-2"
          >
            {prev ? (
              <PixelLink
                href={localePath(locale, `projects/${prev.slug}`)}
                variant="ghost"
                className="justify-start"
              >
                <ArrowLeft size={13} strokeWidth={3} aria-hidden="true" />
                <span className="truncate">
                  {t(ui.projects.questNo, locale)} {prev.quest}
                </span>
              </PixelLink>
            ) : (
              <span />
            )}
            {next ? (
              <PixelLink
                href={localePath(locale, `projects/${next.slug}`)}
                variant="ghost"
                className="justify-end sm:col-start-2"
              >
                <span className="truncate">
                  {t(ui.projects.questNo, locale)} {next.quest}
                </span>
                <ArrowRight size={13} strokeWidth={3} aria-hidden="true" />
              </PixelLink>
            ) : null}
          </nav>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
