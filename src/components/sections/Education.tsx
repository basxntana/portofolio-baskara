import { PixelPanel } from "@/components/ui/PixelPanel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { profile } from "@/data/profile";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { CertGacha } from "@/components/CertGacha";

export function Education({ locale }: { locale: Locale }) {
  const e = profile.education;

  const rows: { k: string; v: string }[] = [
    { k: t(ui.education.rows.university, locale), v: e.institution },
    { k: t(ui.education.rows.major, locale), v: t(e.major, locale) },
    { k: t(ui.education.rows.degree, locale), v: t(e.degree, locale) },
    { k: t(ui.education.rows.status, locale), v: t(e.status, locale) },
    {
      k: t(ui.education.rows.years, locale),
      v: `${e.startYear} — ${e.expectedGraduation} (${t(ui.education.expected, locale)})`,
    },
    ...(e.gpa ? [{ k: t(ui.education.rows.gpa, locale), v: e.gpa }] : []),
  ];

  return (
    <Section id="education" labelledBy="education-heading">
      <SectionHeading
        id="education-heading"
        index="06"
        title={t(ui.education.title, locale)}
        tone="secondary"
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <PixelPanel
            tone="secondary"
            title="education.exe"
            innerClassName="px-5 py-6 sm:px-7"
          >
            <div className="mb-6 flex items-center gap-4">
              <PixelSprite
                name="university"
                className="pixelated h-16 w-auto shrink-0"
              />
              <div>
                <h3 className="text-secondary text-xl leading-snug sm:text-2xl">
                  {t(e.major, locale).toUpperCase()}
                </h3>
                <p className="font-term text-muted mt-1 text-base">
                  {e.institution}
                </p>
              </div>
            </div>

            <dl className="border-line divide-line divide-y-[3px] border-t-[3px]">
              {rows.map((r) => (
                <div
                  key={r.k}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="font-pixel text-muted text-sm tracking-wide uppercase">
                    {r.k}
                  </dt>
                  <dd className="font-term text-ink text-right text-base">
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </PixelPanel>
        </Reveal>

        <Reveal delay={0.1}>
          <PixelPanel
            tone="line"
            title="coursework.txt"
            className="flex h-full flex-col"
            innerClassName="flex flex-1 flex-col px-5 py-6"
          >
            <p className="font-pixel text-accent mb-4 text-sm tracking-wider uppercase">
              {t(ui.education.coursework, locale)}
            </p>
            <ul className="flex flex-wrap gap-2">
              {t(e.focus, locale).map((f) => (
                <li key={f}>
                  <Chip tone="muted">{f}</Chip>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex justify-end pt-8">
              <PixelSprite
                name="terminal"
                className="pixelated h-14 w-auto opacity-60"
              />
            </div>
          </PixelPanel>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-10">
        <PixelPanel
          tone="accent"
          glow
          title={`${t(ui.education.certifications, locale)} ×${e.certifications.length}`}
          innerClassName="px-2 py-6 sm:px-6"
        >
          <CertGacha
            certs={e.certifications}
            verifyLabel={t(ui.education.verify, locale)}
          />
        </PixelPanel>
      </Reveal>
    </Section>
  );
}
