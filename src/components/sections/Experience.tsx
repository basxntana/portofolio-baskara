import { PixelPanel } from "@/components/ui/PixelPanel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { experiences } from "@/data/experience";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

export function Experience({ locale }: { locale: Locale }) {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        index="05"
        title={t(ui.experience.title, locale)}
        tone="accent"
        subtitle={t(ui.experience.subtitle, locale)}
      />

      <ol className="space-y-6">
        {experiences.map((exp, i) => (
          <li key={exp.id}>
            <Reveal delay={i * 0.08}>
              <PixelPanel
                tone={exp.status === "ongoing" ? "accent" : "primary"}
                title={`${exp.id}.log`}
                innerClassName="px-5 py-6 sm:px-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                  <p
                    className={`font-pixel text-sm tracking-wider uppercase ${
                      exp.status === "ongoing" ? "text-accent" : "text-primary"
                    }`}
                  >
                    {exp.status === "ongoing"
                      ? t(ui.experience.questActive, locale)
                      : t(ui.experience.questCompleted, locale)}
                  </p>
                  <p className="font-term text-muted text-base">
                    {t(exp.period, locale)}
                  </p>
                </div>

                <div className="mt-4 flex items-start gap-5">
                  <PixelSprite
                    name="office"
                    className="pixelated hidden h-20 w-auto shrink-0 sm:block"
                  />
                  <div className="min-w-0">
                    <h3 className="text-ink text-xl leading-snug sm:text-2xl">
                      {exp.org.toUpperCase()}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Chip
                        tone={exp.status === "ongoing" ? "accent" : "primary"}
                      >
                        {t(exp.role, locale)}
                      </Chip>
                      <Chip tone="muted">{t(exp.kind, locale)}</Chip>
                    </div>
                  </div>
                </div>

                <p className="text-muted mt-5 text-sm leading-relaxed">
                  {t(exp.summary, locale)}
                </p>

                {/* Unwritten lists are left out rather than shown as placeholders. */}
                {t(exp.responsibilities, locale).length +
                  t(exp.contribution, locale).length >
                0 ? (
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {t(exp.responsibilities, locale).length > 0 ? (
                      <div>
                        <p className="font-pixel text-muted mb-3 text-xs tracking-wider uppercase">
                          {t(ui.experience.responsibilities, locale)}
                        </p>
                        <ul className="space-y-2.5">
                          {t(exp.responsibilities, locale).map((r) => (
                            <li
                              key={r}
                              className="text-muted flex gap-2.5 text-xs leading-relaxed"
                            >
                              <span
                                className="bg-line mt-1.5 block h-2 w-2 shrink-0"
                                aria-hidden="true"
                              />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {t(exp.contribution, locale).length > 0 ? (
                      <div>
                        <p className="font-pixel text-muted mb-3 text-xs tracking-wider uppercase">
                          {t(ui.experience.contribution, locale)}
                        </p>
                        <ul className="space-y-2.5">
                          {t(exp.contribution, locale).map((c) => (
                            <li
                              key={c}
                              className="text-muted flex gap-2.5 text-xs leading-relaxed"
                            >
                              <span
                                className="bg-secondary mt-1.5 block h-2 w-2 shrink-0"
                                aria-hidden="true"
                              />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {t(exp.result, locale).length > 0 ? (
                  <div className="border-line mt-6 border-t-[3px] pt-5">
                    <p className="font-pixel text-accent mb-3 text-xs tracking-wider uppercase">
                      {t(ui.experience.result, locale)}
                    </p>
                    <ul className="space-y-2.5">
                      {t(exp.result, locale).map((r) => (
                        <li
                          key={r}
                          className="text-ink flex gap-2.5 text-xs leading-relaxed"
                        >
                          <span
                            className="bg-accent mt-1.5 block h-2 w-2 shrink-0"
                            aria-hidden="true"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6">
                  <p className="font-pixel text-muted mb-2 text-xs tracking-wider uppercase">
                    {t(ui.experience.stack, locale)}
                  </p>
                  <p className="font-term text-muted text-base leading-snug">
                    {exp.tech.join(" · ")}
                  </p>
                </div>
              </PixelPanel>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
