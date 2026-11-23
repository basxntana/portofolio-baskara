import { ArrowDown } from "lucide-react";
import { AssetIcon } from "@/components/AssetIcon";
import { Starfield } from "@/components/pixel/Starfield";
import { PixelLink } from "@/components/ui/PixelButton";
import { Typewriter } from "@/components/ui/Typewriter";
import { profile } from "@/data/profile";
import { headlineSkills } from "@/data/skills";
import { completedProjects, projects } from "@/data/projects";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[86vh] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* The scene, as a background so the theme can swap night for day
          without the browser fetching both. */}
      <div className="scene-art absolute inset-0" aria-hidden="true" />
      <Starfield seed={17} count={34} />

      {/* One bright line crawling down the panel, like a CRT refresh. */}
      <div
        aria-hidden="true"
        className="motion-safe:animate-scan-sweep pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-25"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      {/* Scrim: a wash on small screens where text sits over the art, and a
          left-weighted fade once there is room for a text column. */}
      <div className="bg-bg/82 absolute inset-0 lg:hidden" aria-hidden="true" />
      <div
        className="absolute inset-0 hidden lg:block"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, var(--color-bg) 6%, color-mix(in srgb, var(--color-bg) 86%, transparent) 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-xl">
          <p className="font-term text-primary mb-5 text-lg sm:text-xl">
            <span aria-hidden="true">&gt; </span>
            <Typewriter text="player_one.init()" speed={55} />
          </p>

          <h1
            id="hero-heading"
            className="text-primary text-glow text-4xl leading-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name.toUpperCase()}
          </h1>

          <p className="font-pixel text-ink mt-5 text-xl font-semibold tracking-widest uppercase sm:text-2xl">
            {t(profile.title, locale)}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2" aria-label={t(ui.hero.disciplines, locale)}>
            {profile.disciplines.map((d, i) => (
              <li key={d} className="font-term flex items-center gap-3 text-lg">
                <span
                  className={
                    i === 0 ? "text-primary" : i === 1 ? "text-secondary" : "text-accent"
                  }
                >
                  {d}
                </span>
                {i < profile.disciplines.length - 1 ? (
                  <span className="text-muted" aria-hidden="true">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="text-muted mt-7 text-sm leading-relaxed sm:text-base">
            {t(profile.intro, locale)}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <PixelLink href="#projects" variant="primary">
              {t(ui.hero.exploreProjects, locale)}
              <ArrowDown size={16} strokeWidth={3} aria-hidden="true" />
            </PixelLink>
            <PixelLink href={profile.contact.github} external variant="ghost">
              <AssetIcon name="github" size={18} />
              GitHub
            </PixelLink>
            <PixelLink href={profile.contact.linkedin} external variant="ghost">
              <AssetIcon name="linkedin" size={18} />
              LinkedIn
            </PixelLink>
            <PixelLink href={`mailto:${profile.contact.email}`} external variant="ghost">
              <AssetIcon name="email" size={18} />
              {t(ui.contact.email, locale)}
            </PixelLink>
          </div>

          {/* Status readout */}
          <div className="pixel-shadow border-line bg-surface/92 mt-10 w-full max-w-sm border-2">
            <div className="px-4 py-4">
              <p className="font-term text-muted mb-3 text-base">
                <span className="text-primary" aria-hidden="true">
                  $
                </span>{" "}
                {t(ui.hero.statusCmd, locale)}
              </p>
              <dl className="font-term space-y-1.5 text-base">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{t(ui.hero.questsCleared, locale)}</dt>
                  <dd className="text-primary">
                    {completedProjects.length} / {projects.length}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{t(ui.hero.rowsProcessed, locale)}</dt>
                  <dd className="text-accent">44,697,129</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{t(ui.hero.statusLabel, locale)}</dt>
                  <dd className="text-secondary">{t(profile.card.status, locale)}</dd>
                </div>
              </dl>
              <p className="border-line mt-4 border-t-2 pt-3">
                <span className="font-term text-muted text-sm tracking-wide">
                  {headlineSkills.join(" · ")}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Tagline plate, in the clear sky above the character. */}
        <div className="pixel-shadow border-accent bg-surface/92 absolute top-0 right-0 hidden border-2 lg:block">
          <p className="font-pixel text-accent px-4 py-3 text-base leading-[1.8] font-semibold tracking-wide">
            BUILD.
            <br />
            ANALYZE.
            <br />
            PREDICT.
          </p>
        </div>
      </div>
    </section>
  );
}
