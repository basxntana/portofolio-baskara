"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { useActiveSection } from "@/lib/useActiveSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleToggle } from "@/components/LocaleToggle";
import { t, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/paths";
import { ui } from "@/data/ui";

const ids = navItems.map((n) => n.id);

export function Navbar({ locale }: { locale: Locale }) {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  /* Close the drawer on Escape, and lock scroll while it is open. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="bg-primary text-bg font-pixel sr-only px-4 py-2 text-sm uppercase focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-200"
      >
        {t(ui.skipToContent, locale)}
      </a>

      <header className="bg-bg/92 border-line sticky top-0 z-50 border-b-[3px] backdrop-blur-sm">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6"
        >
          <Link
            href={localePath(locale)}
            className="font-pixel text-primary hover:text-ink shrink-0 text-lg font-bold tracking-wider transition-colors sm:text-xl"
          >
            <span className="text-muted" aria-hidden="true">
              [
            </span>
            <span className="px-1">BASKARA</span>
            <span className="text-muted" aria-hidden="true">
              ]
            </span>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`font-pixel relative block px-3 py-2 text-base tracking-wider uppercase transition-colors ${
                      isActive ? "text-primary" : "text-muted hover:text-ink"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-1/2 left-0 -mt-[3px] block h-[6px] w-[6px] ${
                        isActive
                          ? "bg-primary motion-safe:animate-blink-block"
                          : "bg-transparent"
                      }`}
                    />
                    <span className="pl-2">{t(item.label, locale)}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LocaleToggle locale={locale} />
            <ThemeToggle locale={locale} />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={
                open ? t(ui.closeMenu, locale) : t(ui.openMenu, locale)
              }
              className="pixel-shadow-sm pixel-press text-primary border-line hover:border-primary bg-surface border-2 p-2 lg:hidden"
            >
              {open ? (
                <X size={20} strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={2.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div id="mobile-menu" hidden={!open} className="bg-bg fixed inset-0 z-40 lg:hidden">
        <div className="bg-tilegrid absolute inset-0 opacity-40" aria-hidden="true" />
        <ul className="relative flex h-full flex-col justify-center gap-2 px-6 pb-20">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`font-pixel flex items-baseline gap-4 px-2 py-4 text-xl tracking-wider uppercase transition-colors ${
                  active === item.id ? "text-primary" : "text-ink hover:text-primary"
                }`}
              >
                <span className="font-term text-muted text-lg" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t(item.label, locale)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
