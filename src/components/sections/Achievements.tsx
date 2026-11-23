import {
  Brain,
  ChartNoAxesColumn,
  Cog,
  Database,
  Layers,
  Lock,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { achievements, unlockedCount, type Achievement } from "@/data/achievements";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

const icons = {
  database: Database,
  chart: ChartNoAxesColumn,
  brain: Brain,
  cog: Cog,
  shield: ShieldCheck,
  layers: Layers,
  rocket: Rocket,
} as const;

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

function Card({
  a,
  index,
  locale,
}: {
  a: Achievement;
  index: number;
  locale: Locale;
}) {
  const Icon = a.unlocked ? icons[a.icon] : Lock;

  return (
    <PixelPanel
      tone={a.unlocked ? a.tone : "line"}
      className="h-full"
      innerClassName={`flex h-full gap-4 px-4 py-4 ${a.unlocked ? "" : "opacity-55"}`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 ${
          a.unlocked
            ? `${toneBg[a.tone]} motion-safe:animate-hop border-transparent text-bg`
            : "bg-surface-2 border-line text-muted"
        }`}
        style={a.unlocked ? { animationDelay: `${(index % 5) * 0.45}s` } : undefined}
        aria-hidden="true"
      >
        <Icon size={19} strokeWidth={2.5} />
      </span>

      <div className="min-w-0">
        <h3
          className={`text-sm leading-relaxed ${
            a.unlocked ? toneText[a.tone] : "text-muted"
          }`}
        >
          {t(a.name, locale).toUpperCase()}
        </h3>
        <p className="text-muted mt-2 text-xs leading-relaxed">
          {t(a.description, locale)}
        </p>
        {!a.unlocked ? (
          <p className="font-term text-muted mt-2 text-sm">{t(ui.achievements.locked, locale)}</p>
        ) : null}
      </div>
    </PixelPanel>
  );
}

export function Achievements({ locale }: { locale: Locale }) {
  return (
    <Section id="achievements" labelledBy="achievements-heading">
      <SectionHeading
        id="achievements-heading"
        index="07"
        title={t(ui.achievements.title, locale)}
        tone="accent"
        subtitle={
          locale === "id"
            ? `${unlockedCount} dari ${achievements.length} terbuka. Yang terkunci adalah hal yang belum saya lakukan — ada di daftar, bukan di CV.`
            : `${unlockedCount} of ${achievements.length} unlocked. Locked ones are things I have not done yet — they are on the list, not on the CV.`
        }
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <li key={a.id}>
            <Reveal delay={i * 0.05} className="h-full">
              <Card a={a} index={i} locale={locale} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
