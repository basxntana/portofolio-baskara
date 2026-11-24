"use client";

import { ArrowRight } from "lucide-react";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PixelButton } from "@/components/ui/PixelButton";
import { AssetIcon, type AssetIconName } from "@/components/AssetIcon";
import { dataClasses, dataChain, type DataClass } from "@/data/classes";
import { projects } from "@/data/projects";
import { useWorld } from "@/components/WorldProvider";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

const iconFor: Record<DataClass["id"], AssetIconName> = {
  engineer: "data-engineer",
  analyst: "data-analyst",
  scientist: "data-scientist",
};

const toneText = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
} as const;

const toneBg = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
} as const;

const chainTone = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  muted: "text-muted",
} as const;

export function Classes({ locale }: { locale: Locale }) {
  const { exploreClass } = useWorld();

  return (
    <Section id="classes" labelledBy="classes-heading">
      <SectionHeading
        id="classes-heading"
        index="02"
        title={t(ui.classes.title, locale)}
        tone="accent"
        subtitle={t(ui.classes.subtitle, locale)}
      />

      <ul className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
        {dataClasses.map((c, i) => {
          const count = projects.filter((p) => p.category === c.category).length;

          return (
            <li key={c.id}>
              <Reveal delay={i * 0.1} className="h-full">
                <PixelPanel
                  tone={c.tone}
                  title={`${c.id}.cls`}
                  className="pixel-lift h-full"
                  innerClassName="flex h-full flex-col px-5 py-6"
                >
                  <AssetIcon name={iconFor[c.id]} size={44} className="mb-5" />

                  <p className="font-term text-muted text-base">
                    {t(c.role, locale)}
                  </p>
                  <h3
                    className={`${toneText[c.tone]} mt-1 text-xl leading-snug tracking-wide sm:text-2xl`}
                  >
                    {t(c.name, locale).toUpperCase()}
                  </h3>

                  <p className="text-ink mt-4 text-sm leading-relaxed">{t(c.blurb, locale)}</p>

                  {/* Chain step */}
                  <div className="border-line mt-5 border-t-[3px] pt-4">
                    <p className="font-term text-muted text-sm leading-snug">
                      <span className="text-muted">{t(c.chainStep.input, locale)}</span>
                      <span className={`${toneText[c.tone]} px-2`} aria-hidden="true">
                        &rarr;
                      </span>
                      <span className="text-ink">{t(c.chainStep.output, locale)}</span>
                    </p>
                  </div>

                  {/* Focus */}
                  <div className="mt-5">
                    <p className="font-pixel text-muted mb-3 text-xs tracking-wider uppercase">
                      {t(ui.classes.focus, locale)}
                    </p>
                    <ul className="space-y-1.5">
                      {t(c.focus, locale).slice(0, 5).map((f) => (
                        <li
                          key={f}
                          className="text-muted flex items-start gap-2 text-xs leading-relaxed"
                        >
                          <span
                            className={`${toneBg[c.tone]} mt-1.5 block h-[6px] w-[6px] shrink-0`}
                            aria-hidden="true"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech */}
                  <div className="mt-5">
                    <p className="font-pixel text-muted mb-3 text-xs tracking-wider uppercase">
                      {t(ui.classes.stack, locale)}
                    </p>
                    <p className="font-term text-ink text-base leading-snug">
                      {c.tech.join(" · ")}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <PixelButton
                      variant={c.tone}
                      onClick={() => exploreClass(c.category)}
                      className="w-full"
                    >
                      {t(ui.classes.explore, locale)}
                      <span className="font-term text-sm">({count})</span>
                      <ArrowRight size={13} strokeWidth={3} aria-hidden="true" />
                    </PixelButton>
                  </div>
                </PixelPanel>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* The one-workflow story */}
      <Reveal delay={0.1}>
        <div className="mt-14">
          <PixelPanel tone="line" title="the_chain.log" innerClassName="px-5 py-7 sm:px-8">
            <p className="font-pixel text-accent mb-6 text-base tracking-wider uppercase">
              {t(ui.classes.chainTitle, locale)}
            </p>
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-3">
              {dataChain.map((step, i) => (
                <li key={t(step.label, locale)} className="flex items-center gap-3">
                  <span
                    className={`font-term text-base sm:text-lg ${chainTone[step.tone]} ${
                      step.tone === "muted" ? "" : "font-bold"
                    }`}
                  >
                    {t(step.label, locale)}
                  </span>
                  {i < dataChain.length - 1 ? (
                    <span className="text-line" aria-hidden="true">
                      &rarr;
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="text-muted mt-6 max-w-3xl text-sm leading-relaxed">
              {t(ui.classes.chainBody, locale)}
            </p>
          </PixelPanel>
        </div>
      </Reveal>
    </Section>
  );
}
