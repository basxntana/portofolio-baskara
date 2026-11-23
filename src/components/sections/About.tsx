import Image from "next/image";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { playerLevel } from "@/data/skills";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

export function About({ locale }: { locale: Locale }) {
  const rows = [
    { k: ui.about.rows.name, v: t(profile.card.name, locale), tone: "text-ink" },
    { k: ui.about.rows.class, v: t(profile.card.class, locale), tone: "text-primary" },
    { k: ui.about.rows.field, v: t(profile.card.field, locale), tone: "text-secondary" },
    { k: ui.about.rows.status, v: t(profile.card.status, locale), tone: "text-accent" },
    { k: ui.about.rows.location, v: t(profile.card.location, locale), tone: "text-ink" },
  ];

  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeading
        id="about-heading"
        index="01"
        title={t(ui.about.title, locale)}
        tone="primary"
        subtitle={t(ui.about.subtitle, locale)}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        {/* Player card */}
        <Reveal>
          <PixelPanel tone="primary" title="player_one.sav" innerClassName="px-5 py-6 sm:px-6">
            <div className="mb-6 flex items-center gap-4">
              <Image
                src="/assets/images/avatar.png"
                alt={`${t(ui.about.portraitAlt, locale)} ${profile.name}`}
                width={135}
                height={129}
                className="pixelated border-primary h-20 w-20 shrink-0 border-2 object-cover"
              />
              <div>
                <p className="font-pixel text-primary text-sm font-semibold tracking-wider uppercase">
                  {t(ui.about.cardTitle, locale)}
                </p>
                <p className="font-term text-muted mt-1 text-base">
                  LV. {playerLevel} &middot; {t(profile.education.status, locale)}
                </p>
              </div>
            </div>

            <dl className="border-line divide-line divide-y-[3px] border-t-[3px]">
              {rows.map((r) => (
                <div
                  key={t(r.k, locale)}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="font-pixel text-muted text-sm tracking-wide uppercase">
                    {t(r.k, locale)}
                  </dt>
                  <dd className={`font-term text-right text-base ${r.tone}`}>{r.v}</dd>
                </div>
              ))}
            </dl>

            <div className="border-line mt-6 border-t-[3px] pt-5">
              <p className="font-pixel text-accent mb-3 text-sm tracking-wide uppercase">
                {t(ui.about.training, locale)}
              </p>
              <ul className="space-y-2">
                {t(profile.learningFocus, locale).map((f) => (
                  <li key={f} className="text-muted flex gap-2.5 text-xs leading-relaxed">
                    <span className="bg-accent mt-1.5 block h-2 w-2 shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </PixelPanel>
        </Reveal>

        {/* Narrative */}
        <div>
          {t(profile.about, locale).map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p
                className={`text-sm leading-relaxed sm:text-base ${
                  i === 0 ? "text-ink" : "text-muted"
                } ${i > 0 ? "mt-5" : ""}`}
              >
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <div className="border-line mt-8 border-l-[3px] pl-5">
              <p className="font-term text-primary text-lg">
                &quot;{profile.tagline}&quot;
              </p>
              <p className="text-muted mt-2 text-xs">{t(ui.about.tagFooter, locale)}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
