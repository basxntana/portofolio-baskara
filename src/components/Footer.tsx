import Link from "next/link";
import { copyrightYear, profile } from "@/data/profile";
import { t, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/paths";
import { ui } from "@/data/ui";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-line border-t-[3px] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href={localePath(locale)}
            className="font-pixel text-primary hover:text-ink text-base font-bold tracking-wider transition-colors"
          >
            {profile.name.toUpperCase()}
          </Link>
          <p className="font-term text-muted mt-2 text-base">
            {t(profile.title, locale)} · {profile.disciplines.join(" · ")}
          </p>
        </div>

        <div className="font-term text-muted text-base sm:text-right">
          <p>{t(profile.altTagline, locale).toUpperCase()}</p>
          <p className="mt-1">
            {t(ui.footer.builtWith, locale)} · &copy; {copyrightYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
