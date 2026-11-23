import { notFound } from "next/navigation";
import { StartScreen } from "@/components/StartScreen";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WorldProvider } from "@/components/WorldProvider";
import { Ticker } from "@/components/Ticker";
import { Hero } from "@/components/sections/Hero";
import { WorldMap } from "@/components/sections/WorldMap";
import { About } from "@/components/sections/About";
import { Classes } from "@/components/sections/Classes";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { profile, siteUrl } from "@/data/profile";
import { LOCALES, t, type Locale } from "@/lib/i18n";

function PersonJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t(profile.title, locale),
    description: t(profile.intro, locale),
    url: `${siteUrl}/${locale}`,
    email: `mailto:${profile.contact.email}`,
    sameAs: [profile.contact.github, profile.contact.linkedin],
    knowsAbout: [
      "Data Engineering",
      "Data Analytics",
      "Data Science",
      "Python",
      "SQL",
      "PostgreSQL",
      "Apache Airflow",
      "Docker",
      "dbt",
      "Machine Learning",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
    },
  };

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled object — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;

  return (
    <>
      <PersonJsonLd locale={locale} />
      <StartScreen locale={locale} />
      <Navbar locale={locale} />

      <WorldProvider>
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          <Hero locale={locale} />
          <WorldMap locale={locale} />
          <Ticker />
          <About locale={locale} />
          <Classes locale={locale} />
          <Projects locale={locale} />
          <Skills locale={locale} />
          <Experience locale={locale} />
          <Education locale={locale} />
          <Achievements locale={locale} />
          <Contact locale={locale} />
        </main>
      </WorldProvider>

      <Footer locale={locale} />
      {/* Whole-page CRT scanlines, faint enough not to cost legibility. */}
      <div aria-hidden className="bg-scanlines pointer-events-none fixed inset-0 z-40 opacity-30" />
    </>
  );
}
