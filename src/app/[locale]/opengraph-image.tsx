import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { DEFAULT_LOCALE, LOCALES, t, type Locale } from "@/lib/i18n";

export const alt = `${profile.name} — ${profile.title.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Prerender one card per language instead of rendering on demand. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * `next/root-params` is not available in Route Handlers, and a metadata image
 * is one — so the locale comes from params here.
 */
export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (LOCALES.includes(raw as Locale) ? raw : DEFAULT_LOCALE) as Locale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0d1117",
          color: "#e6edf3",
          fontFamily: "monospace",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Frame */}
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "6px solid #39ff88",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#7d8590", letterSpacing: 6 }}>
            DATA WORLD INITIALIZED
          </div>
          <div style={{ display: "flex", fontSize: 76, color: "#39ff88", letterSpacing: 2 }}>
            {profile.name.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 38, letterSpacing: 8 }}>
            {t(profile.title, locale).toUpperCase()}
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 27, marginTop: 10 }}>
            <span style={{ color: "#39ff88" }}>Data Engineering</span>
            <span style={{ color: "#243041" }}>/</span>
            <span style={{ color: "#5b8cff" }}>Data Analytics</span>
            <span style={{ color: "#243041" }}>/</span>
            <span style={{ color: "#ffd166" }}>Data Science</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
