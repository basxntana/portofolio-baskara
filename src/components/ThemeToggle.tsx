"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import {
  getServerSnapshot,
  getSnapshot,
  setTheme,
  subscribe,
} from "@/lib/themeStore";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/data/ui";

export function ThemeToggle({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDay = theme === "day";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDay ? "night" : "day")}
      aria-pressed={isDay}
      aria-label={
        isDay ? t(ui.switchToNight, locale) : t(ui.switchToDay, locale)
      }
      title={isDay ? t(ui.switchToNight, locale) : t(ui.switchToDay, locale)}
      className={`pixel-shadow-sm pixel-press text-accent border-line hover:border-accent hover:text-bg hover:bg-accent bg-surface border-2 p-2 ${className}`}
    >
      {isDay ? (
        <Moon size={18} strokeWidth={2.5} aria-hidden="true" />
      ) : (
        <Sun size={18} strokeWidth={2.5} aria-hidden="true" />
      )}
    </button>
  );
}
