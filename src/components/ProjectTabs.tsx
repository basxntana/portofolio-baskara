"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AlertTriangle, ArrowRight, ChevronRight, Lock } from "lucide-react";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { PixelLink, PixelDisabled } from "@/components/ui/PixelButton";
import { Chip } from "@/components/ui/Chip";
import { AssetIcon } from "@/components/AssetIcon";
import { techIcon } from "@/lib/techIcon";
import { techAsset } from "@/lib/techAsset";
import type { Project, ProjectCategory } from "@/data/projects";
import { t, type Locale } from "@/lib/i18n";
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
  muted: "text-muted",
} as const;

const toneBg = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  muted: "bg-muted",
} as const;

const toneActive = {
  primary: "bg-primary text-bg ring-primary",
  secondary: "bg-secondary text-bg ring-secondary",
  accent: "bg-accent text-bg ring-accent",
} as const;

const toneHover = {
  primary: "hover:ring-primary",
  secondary: "hover:ring-secondary",
  accent: "hover:ring-accent",
} as const;

/* ── Small shared pieces ─────────────────────────────────────────────────── */

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-muted max-w-3xl text-sm leading-relaxed sm:text-base">
          {p}
        </p>
      ))}
    </div>
  );
}

function Bullets({ items, tone = "primary" }: { items: string[]; tone?: keyof typeof toneBg }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((it, i) => (
        <li key={i} className="text-muted flex gap-3 text-sm leading-relaxed">
          <span className={`${toneBg[tone]} mt-[7px] block h-2 w-2 shrink-0`} aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function Subheading({ children, tone }: { children: string; tone: keyof typeof toneText }) {
  return (
    <h3 className={`${toneText[tone]} mb-5 text-base leading-relaxed sm:text-lg`}>
      {children.toUpperCase()}
    </h3>
  );
}

/** The left-to-right pipeline diagram. Wraps to a column on narrow screens. */
function FlowDiagram({
  steps,
  tone,
  locale,
}: {
  steps: NonNullable<NonNullable<Project["detail"]["architecture"]>["flow"]>;
  tone: keyof typeof toneText;
  locale: Locale;
}) {
  return (
    <ol className="mb-10 flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch lg:gap-0">
      {steps.map((step, i) => {
        const label = t(step.label, locale);
        const sub = t(step.sub, locale);
        const asset = techAsset(sub);
        const Icon = techIcon(label);
        return (
          <li
            key={label}
            className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row lg:gap-2"
          >
            <PixelPanel tone="line" className="w-full" innerClassName="h-full px-3 py-4 text-center">
              <span
                className={`bg-surface-2 border-line ${toneText[tone]} mx-auto mb-3 flex h-10 w-10 items-center justify-center border-2`}
                aria-hidden="true"
              >
                {asset ? (
                  <AssetIcon name={asset} size={22} />
                ) : (
                  <Icon size={19} strokeWidth={2.5} />
                )}
              </span>
              <p className="font-pixel text-ink text-xs leading-relaxed">{label}</p>
              <p className="font-term text-muted mt-2 text-sm leading-tight">{sub}</p>
            </PixelPanel>

            {i < steps.length - 1 ? (
              <span className={`${toneText[tone]} shrink-0`} aria-hidden="true">
                {/* Points down while the steps stack, right once they sit in a row. */}
                <ChevronRight size={18} strokeWidth={3} className="rotate-90 lg:rotate-0" />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function StatGrid({ stats, locale }: { stats: Project["stats"]; locale: Locale }) {
  return (
    <dl className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map((s) => (
        <PixelPanel key={t(s.label, locale)} tone="line" innerClassName="px-4 py-4">
          <dt className="font-pixel text-muted text-xs leading-relaxed tracking-wider uppercase">
            {t(s.label, locale)}
          </dt>
          <dd className="font-pixel text-ink mt-3 text-lg leading-relaxed">{s.value}</dd>
          {s.hint ? (
            <dd className="font-term text-muted mt-1.5 text-sm leading-tight">
              {t(s.hint, locale)}
            </dd>
          ) : null}
        </PixelPanel>
      ))}
    </dl>
  );
}

/* ── Tabs ────────────────────────────────────────────────────────────────── */

export function ProjectTabs({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const tone = categoryTone[project.category];
  const d = project.detail;
  const listRef = useRef<HTMLDivElement>(null);

  /** Only tabs with something in them. */
  const tabs = useMemo(() => {
    const out: { id: string; label: string }[] = [
      { id: "overview", label: t(ui.detail.tabs.overview, locale) },
    ];
    if (d.dataset.shape.length > 0 || t(d.dataset.notes, locale).length > 0) {
      out.push({ id: "dataset", label: t(ui.detail.tabs.dataset, locale) });
    }
    if (t(d.approach, locale).length > 0)
      out.push({ id: "approach", label: t(ui.detail.tabs.approach, locale) });
    if (d.architecture)
      out.push({ id: "architecture", label: t(ui.detail.tabs.architecture, locale) });
    if (d.analysis?.length)
      out.push({ id: "analysis", label: t(ui.detail.tabs.analysis, locale) });
    if (d.model?.length)
      out.push({ id: "model", label: t(ui.detail.tabs.model, locale) });
    if (d.process.length > 0)
      out.push({ id: "process", label: t(ui.detail.tabs.process, locale) });
    if (t(d.result, locale).length > 0)
      out.push({ id: "result", label: t(ui.detail.tabs.result, locale) });
    out.push({ id: "repo", label: t(ui.detail.tabs.repo, locale) });
    return out;
  }, [d, locale]);

  const [active, setActive] = useState(tabs[0].id);

  /* Left/Right arrows move between tabs, as a tablist should. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = tabs.findIndex((t) => t.id === active);
    const nextIndex = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    const next = tabs[nextIndex];
    setActive(next.id);
    listRef.current
      ?.querySelector<HTMLButtonElement>(`#tab-${next.id}`)
      ?.focus();
  };

  /**
   * Every panel stays in the DOM and is hidden with `hidden`, so the whole
   * write-up is still there for crawlers and for in-page search.
   */
  const panel = (id: string, children: React.ReactNode) => (
    <div
      key={id}
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      hidden={active !== id}
      tabIndex={0}
      className="focus:outline-none"
    >
      {children}
    </div>
  );

  return (
    <div>
      {/* Tab bar */}
      <div
        ref={listRef}
        role="tablist"
        aria-label={t(ui.detail.sections, locale)}
        onKeyDown={onKeyDown}
        className="border-line mb-10 flex flex-wrap gap-2 border-b-[3px] pb-4"
      >
        {tabs.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={`font-pixel pixel-shadow-sm pixel-press border-2 px-3 py-2 text-sm font-semibold tracking-wide uppercase ${
                on ? toneActive[tone] : `bg-surface text-muted border-line hover:text-ink ${toneHover[tone]}`
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {panel(
        "overview",
        <>
          {project.stats.length > 1 ? (
            <StatGrid stats={project.stats} locale={locale} />
          ) : null}
          <Subheading tone={tone}>{t(ui.detail.headings.overview, locale)}</Subheading>
          <Prose paragraphs={t(d.overview, locale)} />
          {t(d.problem, locale).length > 0 ? (
            <div className="border-line mt-10 border-t-[3px] pt-8">
              <Subheading tone="secondary">{t(ui.detail.headings.problem, locale)}</Subheading>
              <Prose paragraphs={t(d.problem, locale)} />
            </div>
          ) : null}
        </>,
      )}

      {/* Dataset */}
      {panel(
        "dataset",
        <>
          <Subheading tone="accent">{t(ui.detail.headings.dataset, locale)}</Subheading>
          <p className="font-term text-ink text-lg">{t(d.dataset.name, locale)}</p>
          <p className="font-term text-muted mt-1 mb-6 text-base">
            {t(ui.detail.source, locale)}:{" "}
            {d.dataset.sourceUrl ? (
              <a
                href={d.dataset.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-ink underline decoration-2 underline-offset-4"
              >
                {t(d.dataset.source, locale)}
              </a>
            ) : (
              t(d.dataset.source, locale)
            )}
          </p>

          {d.dataset.shape.length > 0 ? (
            <PixelPanel tone="line" className="mb-7" innerClassName="px-5 py-4">
              <dl className="divide-line divide-y-[3px]">
                {d.dataset.shape.map((s) => (
                  <div
                    key={t(s.label, locale)}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5"
                  >
                    <dt className="font-term text-muted text-base">{t(s.label, locale)}</dt>
                    <dd className="font-term text-ink text-base">
                      {s.value}
                      {s.hint ? (
                        <span className="text-muted ml-2 text-sm">
                          ({t(s.hint, locale)})
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </PixelPanel>
          ) : null}

          {t(d.dataset.notes, locale).length > 0 ? (
            <Bullets items={t(d.dataset.notes, locale)} tone="accent" />
          ) : null}
        </>,
      )}

      {/* Approach */}
      {panel(
        "approach",
        <>
          <Subheading tone={tone}>{t(ui.detail.headings.approach, locale)}</Subheading>
          <Prose paragraphs={t(d.approach, locale)} />

          {d.highlights?.length ? (
            <div className="border-line mt-10 border-t-[3px] pt-8">
              <Subheading tone="accent">{t(ui.detail.headings.decisions, locale)}</Subheading>
              <div className="space-y-4">
                {d.highlights.map((h) => (
                  <PixelPanel key={t(h.title, locale)} tone="accent" innerClassName="px-5 py-5">
                    <h4 className="text-accent text-base leading-relaxed">
                      {t(h.title, locale).toUpperCase()}
                    </h4>
                    <p className="text-muted mt-3 text-sm leading-relaxed">{t(h.body, locale)}</p>
                  </PixelPanel>
                ))}
              </div>
            </div>
          ) : null}
        </>,
      )}

      {/* Architecture */}
      {d.architecture
        ? panel(
            "architecture",
            <>
              <Subheading tone="primary">{t(ui.detail.headings.architecture, locale)}</Subheading>
              {d.architecture.flow ? (
                <FlowDiagram steps={d.architecture.flow} tone="primary" locale={locale} />
              ) : null}

              <p className="text-muted mb-7 max-w-3xl text-sm leading-relaxed sm:text-base">
                {t(d.architecture.intro, locale)}
              </p>

              <ol className="space-y-3">
                {d.architecture.layers.map((layer, i) => (
                  <li key={layer.name}>
                    <PixelPanel tone={layer.tone} innerClassName="px-5 py-4">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="font-term text-muted text-base" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className={`text-base leading-relaxed ${toneText[layer.tone]}`}>
                          {layer.name.toUpperCase()}
                        </h4>
                      </div>
                      <p className="text-muted mt-3 text-sm leading-relaxed">{t(layer.what, locale)}</p>
                      {layer.checks ? (
                        <p className="border-line font-term text-accent mt-3 border-t-[3px] pt-3 text-base leading-snug">
                          {t(layer.checks, locale)}
                        </p>
                      ) : null}
                    </PixelPanel>
                  </li>
                ))}
              </ol>

              {d.architecture.outro ? (
                <p className="text-muted mt-7 max-w-3xl text-sm leading-relaxed">
                  {t(d.architecture.outro, locale)}
                </p>
              ) : null}
            </>,
          )
        : null}

      {/* Analysis */}
      {d.analysis?.length
        ? panel(
            "analysis",
            <>
              <Subheading tone="secondary">{t(ui.detail.headings.analysis, locale)}</Subheading>
              <ol className="space-y-4">
                {d.analysis.map((item) => (
                  <li key={t(item.heading, locale)}>
                    <PixelPanel tone="line" innerClassName="px-5 py-5">
                      <h4 className="text-secondary text-base leading-relaxed">
                        {t(item.heading, locale).toUpperCase()}
                      </h4>
                      <p className="text-muted mt-3 text-sm leading-relaxed">{t(item.body, locale)}</p>
                      {item.evidence ? (
                        <p className="font-term text-muted border-line mt-3 border-l-[3px] pl-3 text-base leading-snug">
                          {t(ui.detail.evidence, locale)}: {t(item.evidence, locale)}
                        </p>
                      ) : null}
                    </PixelPanel>
                  </li>
                ))}
              </ol>

              {d.images?.length ? (
                <div className="border-line mt-10 border-t-[3px] pt-8">
                  <Subheading tone="secondary">{t(ui.detail.headings.figures, locale)}</Subheading>
                  <div className="space-y-8">
                    {d.images.map((img, i) => (
                      <figure key={img.src}>
                        <PixelPanel tone="line" innerClassName="p-2">
                          <Image
                            src={img.src}
                            alt={t(img.alt, locale)}
                            width={img.width}
                            height={img.height}
                            sizes="(min-width: 896px) 860px, 100vw"
                            className="h-auto w-full bg-white"
                            loading={i === 0 ? undefined : "lazy"}
                          />
                        </PixelPanel>
                        <figcaption className="text-muted mt-3 text-xs leading-relaxed">
                          {t(img.caption, locale)}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </>,
          )
        : null}

      {/* Model */}
      {d.model?.length
        ? panel(
            "model",
            <>
              <Subheading tone="accent">{t(ui.detail.headings.model, locale)}</Subheading>
              <div className="space-y-5">
                {d.model.map((m) => (
                  <PixelPanel key={t(m.heading, locale)} tone="line" innerClassName="px-5 py-5">
                    <h4 className="text-accent text-base leading-relaxed">
                      {t(m.heading, locale).toUpperCase()}
                    </h4>
                    <p className="text-muted mt-3 text-sm leading-relaxed">{t(m.body, locale)}</p>
                  </PixelPanel>
                ))}
              </div>
            </>,
          )
        : null}

      {/* Process */}
      {panel(
        "process",
        <>
          <Subheading tone={tone}>{t(ui.detail.headings.process, locale)}</Subheading>
          <ol className="space-y-5">
            {d.process.map((p, i) => (
              <li key={t(p.step, locale)} className="flex gap-4">
                <span
                  className={`font-pixel ${toneBg[tone]} text-bg flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="font-pixel text-ink text-base leading-relaxed">{t(p.step, locale)}</h4>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{t(p.detail, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
        </>,
      )}

      {/* Result */}
      {panel(
        "result",
        <>
          <Subheading tone="primary">{t(ui.detail.headings.result, locale)}</Subheading>
          <Bullets items={t(d.result, locale)} tone="primary" />

          {d.limitations && t(d.limitations, locale).length > 0 ? (
            <div className="border-line mt-10 border-t-[3px] pt-8">
              <Subheading tone="muted">{t(ui.detail.headings.limitations, locale)}</Subheading>
              <p className="text-muted mb-5 flex max-w-3xl items-start gap-3 text-sm leading-relaxed">
                <AlertTriangle
                  size={17}
                  strokeWidth={2.5}
                  className="text-accent mt-px shrink-0"
                  aria-hidden="true"
                />
                <span>{t(ui.detail.limitsNote, locale)}</span>
              </p>
              <Bullets items={t(d.limitations, locale)} tone="muted" />
            </div>
          ) : null}
        </>,
      )}

      {/* Repo */}
      {panel(
        "repo",
        <>
          <Subheading tone={tone}>{t(ui.detail.headings.technology, locale)}</Subheading>
          <ul className="mb-10 flex flex-wrap gap-2">
            {project.tech.map((t) => {
              const asset = techAsset(t);
              const Icon = techIcon(t);
              return (
                <li key={t}>
                  <Chip tone={tone}>
                    <span className="inline-flex items-center gap-2">
                      {asset ? (
                        <AssetIcon name={asset} size={15} />
                      ) : (
                        <Icon size={13} strokeWidth={2.5} aria-hidden="true" />
                      )}
                      {t}
                    </span>
                  </Chip>
                </li>
              );
            })}
          </ul>

          <Subheading tone={tone}>{t(ui.detail.headings.repository, locale)}</Subheading>
          {project.repoUrl ? (
            <div className="flex flex-wrap gap-3">
              <PixelLink href={project.repoUrl} external variant={tone}>
                <AssetIcon name="github" size={18} />
                {t(ui.detail.viewOnGithub, locale)}
              </PixelLink>
              {project.demoUrl ? (
                <PixelLink href={project.demoUrl} external variant="ghost">
                  {t(ui.detail.liveDemo, locale)}
                  <ArrowRight size={13} strokeWidth={3} aria-hidden="true" />
                </PixelLink>
              ) : null}
            </div>
          ) : (
            <div>
              <PixelDisabled title={t(ui.projects.repoPrivateTitle, locale)}>
                <Lock size={13} strokeWidth={2.5} aria-hidden="true" />
                {t(ui.projects.repoPrivate, locale)}
              </PixelDisabled>
              <p className="text-muted mt-5 max-w-3xl text-sm leading-relaxed">
                {t(ui.detail.repoPrivateBody, locale)}
              </p>
            </div>
          )}
        </>,
      )}
    </div>
  );
}
