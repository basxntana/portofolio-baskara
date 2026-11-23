"use client";

import { useMemo } from "react";
import { FileText } from "lucide-react";
import { AssetIcon } from "@/components/AssetIcon";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PixelLink } from "@/components/ui/PixelButton";
import { PixelScene } from "@/components/pixel/PixelScene";
import { SKYLINE_SIZE, skyline } from "@/components/pixel/scenes";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { Starfield } from "@/components/pixel/Starfield";
import { profile } from "@/data/profile";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

export function Contact({ locale }: { locale: Locale }) {
  const city = useMemo(() => skyline(777), []);

  return (
    <Section id="contact" labelledBy="contact-heading" className="relative overflow-hidden">
      <Starfield seed={88} count={22} className="opacity-60" />
      <PixelScene
        rects={city}
        width={SKYLINE_SIZE.w}
        height={SKYLINE_SIZE.h}
        fill
        className="pixelated pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full opacity-55"
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg) 12%, color-mix(in srgb, var(--color-bg) 65%, transparent) 60%, var(--color-bg))",
        }}
      />

      <Reveal className="relative">
        <PixelPanel tone="primary" glow title="new_quest.exe" innerClassName="px-5 py-12 text-center sm:px-10 sm:py-16">
          <PixelSprite
            name="pipe"
            className="pixelated mx-auto mb-8 h-6 w-auto max-w-[300px] opacity-80"
          />

          <h2
            id="contact-heading"
            className="text-primary text-glow text-3xl leading-tight sm:text-5xl"
          >
            {t(ui.contact.title, locale)}
          </h2>

          <p className="font-pixel text-ink mt-5 text-lg font-semibold tracking-widest uppercase sm:text-xl">
            {t(ui.contact.subtitle, locale)}
          </p>

          <p className="text-muted mx-auto mt-6 max-w-lg text-sm leading-relaxed">
            {t(ui.contact.body, locale)}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PixelLink href={`mailto:${profile.contact.email}`} external variant="primary">
              <AssetIcon name="email" size={18} />
              {t(ui.contact.email, locale)}
            </PixelLink>
            <PixelLink href={profile.contact.github} external variant="ghost">
              <AssetIcon name="github" size={18} />
              GitHub
            </PixelLink>
            <PixelLink href={profile.contact.linkedin} external variant="ghost">
              <AssetIcon name="linkedin" size={18} />
              LinkedIn
            </PixelLink>
            {profile.contact.resume ? (
              <PixelLink href={profile.contact.resume} external variant="accent">
                <FileText size={14} strokeWidth={2.5} aria-hidden="true" />
                {t(ui.contact.resume, locale)}
              </PixelLink>
            ) : null}
          </div>

          <p className="font-term text-muted mt-10 text-base break-all">
            {profile.contact.email}
          </p>
        </PixelPanel>
      </Reveal>
    </Section>
  );
}
