import {
  Brain,
  ChartNoAxesColumn,
  Cog,
  Database,
  Layers,
  Lock,
  Rocket,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { PixelPanel } from "@/components/ui/PixelPanel";
import Image from "next/image";
import { AchievementDialog, PixelTrophy } from "@/components/AchievementDialog";
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
  trophy: Trophy,
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

/** Wide banner for achievements with details, so a real award is not lost among the milestones. */
function FeaturedCard({ a, locale }: { a: Achievement; locale: Locale }) {
  const d = a.details!;
  const cover = d.photos[0];

  return (
    <PixelPanel
      tone="accent"
      glow
      title={`${a.id}.exe`}
      innerClassName="grid items-center gap-6 p-5 sm:p-6 md:grid-cols-[1fr_1.1fr]"
    >
      {cover ? (
        <div className="border-line border-2">
          <Image
            src={cover.src}
            alt={t(cover.alt, locale)}
            width={cover.width}
            height={cover.height}
            sizes="(min-width: 768px) 32rem, 100vw"
            className="h-auto w-full"
          />
        </div>
      ) : null}

      <div className="min-w-0">
        <p className="font-term text-secondary text-base tracking-widest">
          ★ {t(ui.achievements.unlocked, locale)} ★
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="motion-safe:animate-hop shrink-0">
            <PixelTrophy size={56} />
          </span>
          <div className="min-w-0">
            <p className="font-term text-muted text-sm tracking-widest">
              {t(ui.achievements.featured, locale)} · {d.year}
            </p>
            <h3 className="text-accent text-glow mt-1 text-lg leading-relaxed sm:text-xl">
              {t(a.name, locale).toUpperCase()}
            </h3>
          </div>
        </div>
        <p className="font-pixel text-ink mt-5 text-lg font-semibold sm:text-xl">
          {t(d.award, locale)}
        </p>
        {d.event ? (
          <p className="text-muted mt-2 text-sm leading-relaxed">
            {t(d.event, locale)}
            {d.organizer ? ` — ${d.organizer}` : ""}
          </p>
        ) : null}
        <p
          aria-hidden="true"
          className="font-pixel bg-accent text-bg pixel-shadow mt-6 inline-block px-4 py-2 text-sm font-semibold tracking-widest"
        >
          {t(ui.achievements.viewDetails, locale)} ▸
        </p>
      </div>
    </PixelPanel>
  );
}

export function Achievements({ locale }: { locale: Locale }) {
  const featured = achievements.filter((a) => a.details);
  const rest = achievements.filter((a) => !a.details);

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

      {featured.map((a) => (
        <Reveal key={a.id} className="relative mb-8">
          <FeaturedCard a={a} locale={locale} />
          <AchievementDialog a={a} locale={locale} />
        </Reveal>
      ))}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a, i) => (
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
