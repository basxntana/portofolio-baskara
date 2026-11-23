"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_NAME,
  t,
  type Locale,
} from "@/lib/i18n";
import { swapLocale } from "@/lib/paths";
import { useKeepScroll } from "@/lib/useKeepScroll";
import { beginSwitch } from "@/lib/localeSwitchStore";
import { ui } from "@/data/ui";

/**
 * Language switch, drawn as a two-position slide switch.
 *
 * The language lives in the URL, so each side is a real link to the same page
 * in the other locale rather than client state — the server renders each
 * language directly, which keeps both indexable and costs no JavaScript to
 * read.
 *
 * The page does not move: `scroll={false}` stops Next jumping to the top, and
 * `useKeepScroll` puts the offset back after the swap (the document is briefly
 * shorter while the new page mounts, which clamps the scroll). The two
 * translations are within ~1% of each other in height — 11,386px vs 11,520px,
 * section tops differing by 9–135px, most under 40 — so holding the offset
 * leaves the reader on the same paragraph.
 *
 * The click is taken over and routed in JavaScript so the loading screen can go
 * up first. The href underneath stays a real one, so a crawler, a middle click
 * and a reader without JavaScript all still get the plain navigation.
 *
 * The knob slides on `steps()`, so it snaps between the two halves the way an
 * 8-bit toggle would rather than gliding.
 */
export function LocaleToggle({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const rememberScroll = useKeepScroll(pathname);
  const activeIndex = LOCALES.indexOf(locale);

  const go = (event: MouseEvent<HTMLAnchorElement>, next: Locale, href: string) => {
    rememberScroll();
    if (next === locale) return;

    /* Leave anything the browser has its own meaning for alone: a new tab, a
       new window, a download. */
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    beginSwitch(next);
    router.push(href, { scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={LOCALE_NAME[locale]}
      title={t(ui.switchLanguage, locale)}
      className={`pixel-shadow-sm border-line bg-surface relative flex border-2 ${className}`}
    >
      {/* The knob. Decorative: the links underneath carry the meaning. */}
      <span
        aria-hidden="true"
        className="bg-secondary absolute inset-y-0 left-0 w-1/2 transition-transform"
        style={{
          transform: `translateX(${activeIndex * 100}%)`,
          transitionDuration: "140ms",
          transitionTimingFunction: "steps(3, end)",
        }}
      />

      {LOCALES.map((l) => {
        const isActive = l === locale;
        const href = swapLocale(pathname, l);
        return (
          <Link
            key={l}
            href={href}
            scroll={false}
            onClick={(event) => go(event, l, href)}
            hrefLang={l}
            aria-current={isActive ? "true" : undefined}
            aria-label={LOCALE_NAME[l]}
            className={`font-pixel relative z-10 w-9 py-1.5 text-center text-sm leading-none font-semibold transition-colors ${
              isActive ? "text-bg" : "text-muted hover:text-ink"
            }`}
          >
            {LOCALE_LABEL[l]}
          </Link>
        );
      })}
    </div>
  );
}
