import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/profile";
import { LOCALES } from "@/lib/i18n";

/**
 * Static date: reading the clock here would make the route dynamic under
 * Cache Components. Bump it when the content changes materially.
 */
const lastModified = new Date("2026-10-08");

/** Every page exists in both languages, and each entry points at the other. */
function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${siteUrl}/${l}${path}`]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: alternates(""),
    });

    for (const p of projects) {
      entries.push({
        url: `${siteUrl}/${locale}/projects/${p.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternates(`/projects/${p.slug}`),
      });
    }
  }

  return entries;
}
