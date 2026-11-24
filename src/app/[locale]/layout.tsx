import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { Inter, Pixelify_Sans, VT323 } from "next/font/google";
import { profile, shareImage, siteUrl } from "@/data/profile";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_HTML_LANG,
  type Locale,
  t,
} from "@/lib/i18n";
import { BOOTSTRAP } from "@/lib/bootstrap";
import { LocaleSwitchOverlay } from "@/components/LocaleSwitchOverlay";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* assets/styles/palette.css lists Pixelify Sans first for --font-pixel. It is
   proportional rather than fixed-width, so headings can sit at a readable size
   instead of the 9–11px that Press Start 2P forces. */
const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const description = {
  en: "Portfolio of Baskara Kresna, an Informatics student working across Data Engineering, Data Analytics, and Data Science.",
  id: "Portfolio Baskara Kresna, mahasiswa Informatika yang bekerja di Data Engineering, Data Analytics, dan Data Science.",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = ((await rootLocale()) ?? DEFAULT_LOCALE) as Locale;
  const desc = t(description, locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${profile.name} — ${t(profile.title, locale)}`,
      template: `%s — ${profile.name}`,
    },
    description: desc,
    applicationName: `${profile.name} Portfolio`,
    authors: [{ name: profile.name, url: profile.contact.github }],
    creator: profile.name,
    keywords: [
      "Baskara Kresna",
      "Data Professional",
      "Data Engineer",
      "Data Analyst",
      "Data Scientist",
      "Data Engineering portfolio",
      "ELT pipeline",
      "Python",
      "SQL",
      "Airflow",
      "PostgreSQL",
      "Informatics",
      "Gunadarma University",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        id: "/id",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${locale}`,
      siteName: `${profile.name} — ${t(profile.title, locale)}`,
      title: `${profile.name} — ${t(profile.title, locale)}`,
      description: desc,
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} — ${t(profile.title, locale)}`,
      description: desc,
      images: [shareImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();

  return (
    <html
      lang={LOCALE_HTML_LANG[locale as Locale]}
      data-locale={locale}
      // The bootstrap script below sets data-theme before React hydrates, so
      // that one attribute is intentionally out of sync with the server HTML.
      suppressHydrationWarning
      className={`${inter.variable} ${pixelify.variable} ${vt323.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the saved theme before first paint, so the world never
            flashes the wrong time of day. */}
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
      </head>
      <body className="text-ink flex min-h-full flex-col">
        {children}
        {/* Here rather than in the page: the quest pages switch language too,
            and the overlay has to outlive the page being replaced. */}
        <LocaleSwitchOverlay locale={locale as Locale} />
      </body>
    </html>
  );
}
