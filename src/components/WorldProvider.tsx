"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProjectCategory } from "@/data/projects";

export type Filter = "All" | ProjectCategory;

type World = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  /** Set the quest-log filter and scroll to it — what a class's EXPLORE does. */
  exploreClass: (category: ProjectCategory) => void;
};

const WorldContext = createContext<World | null>(null);

export function WorldProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("All");

  const exploreClass = useCallback((category: ProjectCategory) => {
    setFilter(category);
    const target = document.getElementById("projects");
    if (!target) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const value = useMemo(
    () => ({ filter, setFilter, exploreClass }),
    [filter, exploreClass],
  );

  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
}

export function useWorld(): World {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error("useWorld must be used inside <WorldProvider>");
  return ctx;
}
