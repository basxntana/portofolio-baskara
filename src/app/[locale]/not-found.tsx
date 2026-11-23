import { locale as rootLocale } from "next/root-params";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { PixelLink } from "@/components/ui/PixelButton";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { DEFAULT_LOCALE, t, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/paths";
import { ui } from "@/data/ui";

export default async function NotFound() {
  const locale = ((await rootLocale()) ?? DEFAULT_LOCALE) as Locale;

  return (
    <>
      <Navbar locale={locale} />
      <main id="main" className="flex flex-1 items-center justify-center px-4 py-24 sm:px-6">
        <PixelPanel
          tone="accent"
          className="w-full max-w-lg"
          innerClassName="px-6 py-12 text-center sm:px-10"
        >
          <PixelSprite name="terminal" className="pixelated mx-auto mb-8 h-20 w-auto" />
          <h1 className="text-accent text-glow text-5xl leading-tight sm:text-7xl">404</h1>
          <p className="font-pixel text-ink mt-5 text-lg font-semibold tracking-widest uppercase">
            {t(ui.notFound.title, locale)}
          </p>
          <p className="text-muted mt-5 text-sm leading-relaxed">
            {t(ui.notFound.body, locale)}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PixelLink href={localePath(locale)} variant="accent">
              {t(ui.notFound.returnHome, locale)}
            </PixelLink>
            <PixelLink href={localePath(locale, "#projects")} variant="ghost">
              {t(ui.detail.backToLog, locale)}
            </PixelLink>
          </div>
        </PixelPanel>
      </main>
      <Footer locale={locale} />
    </>
  );
}
