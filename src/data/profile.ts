import type { LList, LText } from "@/lib/i18n";

/**
 * Core identity, contact and education.
 * Everything a recruiter reads first lives here.
 *
 * Proper nouns stay as they are in both languages: the name, the three
 * discipline names, and the personal branding line. Translating "Data
 * Engineering" would make the portfolio harder to search for, not easier.
 */

export const profile = {
  name: "Baskara Kresna",
  title: { en: "Data Professional", id: "Data Professional" } satisfies LText,
  disciplines: ["Data Engineering", "Data Analytics", "Data Science"] as const,
  tagline: "Build. Analyze. Predict.",
  altTagline: {
    en: "Enter the data world.",
    id: "Masuki dunia data.",
  } satisfies LText,

  /** Hero paragraph — short on purpose. */
  intro: {
    en: "I work with data from raw pipelines to insights and intelligent models — building the infrastructure that makes data trustworthy, then asking it the questions that matter.",
    id: "Saya bekerja dengan data dari pipeline mentah sampai insight dan model cerdas — membangun infrastruktur yang membuat data layak dipercaya, lalu menanyakan pertanyaan yang benar-benar penting.",
  } satisfies LText,

  /** Player-card fields for the About section. */
  card: {
    name: { en: "Baskara Kresna", id: "Baskara Kresna" } satisfies LText,
    class: { en: "Data Professional", id: "Data Professional" } satisfies LText,
    field: { en: "Data", id: "Data" } satisfies LText,
    status: {
      en: "Learning & Building",
      id: "Belajar & Membangun",
    } satisfies LText,
    location: { en: "Indonesia", id: "Indonesia" } satisfies LText,
  },

  about: {
    en: [
      "I am an Informatics undergraduate who ended up spending most of my time on data rather than on application code. What pulled me in was not the modelling — it was realising how much of a data problem is actually a trust problem. A model is only as honest as the table underneath it.",
      "So I work across the whole chain. I build pipelines that turn messy source files into data an analyst can rely on, I run the analysis that turns that data into a decision, and I build the models that turn it into a prediction. Those are not three careers to me; they are three stages of the same job.",
      "In practice that means I care about the unglamorous parts: reconciling row counts, quarantining bad records instead of dropping them, stating the base of every number I report, and writing down the limits of what the data can actually support.",
    ],
    id: [
      "Saya mahasiswa Informatika yang akhirnya menghabiskan sebagian besar waktu di data, bukan di kode aplikasi. Yang menarik saya bukan pemodelannya — tapi kesadaran bahwa sebagian besar masalah data sebenarnya masalah kepercayaan. Sebuah model hanya sejujur tabel di bawahnya.",
      "Jadi saya bekerja di sepanjang rantainya. Saya membangun pipeline yang mengubah file sumber berantakan menjadi data yang bisa diandalkan analis, menjalankan analisis yang mengubah data itu menjadi keputusan, dan membangun model yang mengubahnya menjadi prediksi. Bagi saya itu bukan tiga karier; itu tiga tahap dari pekerjaan yang sama.",
      "Praktiknya, saya peduli pada bagian yang tidak menarik: merekonsiliasi jumlah baris, mengarantina record buruk alih-alih membuangnya, menyebutkan basis dari setiap angka yang saya laporkan, dan menuliskan batas dari apa yang sebenarnya bisa didukung data itu.",
    ],
  } satisfies LList,

  contact: {
    email: "baskarakresna05@gmail.com",
    github: "https://github.com/basxntana",
    githubHandle: "basxntana",
    linkedin:
      "https://www.linkedin.com/in/baskara-kresna-juniarto-1a18ab428/",
    linkedinHandle: "baskara-kresna-juniarto",
    /** Set to a path in /public once a CV exists, e.g. "/baskara-kresna-cv.pdf" */
    resume: null as string | null,
  },

  education: {
    institution: "Gunadarma University",
    major: { en: "Informatics", id: "Teknik Informatika" } satisfies LText,
    degree: {
      en: "Bachelor of Computer Science (S.Kom.)",
      id: "Sarjana Komputer (S.Kom.)",
    } satisfies LText,
    status: { en: "Semester 7", id: "Semester 7" } satisfies LText,
    // TODO(baskara): confirm these two — currently inferred from "semester 7" in Oct 2026.
    startYear: 2023,
    expectedGraduation: 2027,
    /** Set to a string like "3.52 / 4.00" to display it; null hides the row. */
    gpa: null as string | null,
    focus: {
      en: [
        "Data Engineering",
        "Data Analytics",
        "Machine Learning",
        "Database Systems",
      ],
      id: [
        "Data Engineering",
        "Data Analytics",
        "Machine Learning",
        "Sistem Basis Data",
      ],
    } satisfies LList,
    /** Dicoding certificates, data-related only. Titles are official course names, so not translated. */
    certifications: [
      // Image per cert lives at /public/certificates/<id>.jpg (rendered from the PDF).
      { title: "Belajar Machine Learning untuk Pemula", id: "JMZVL33LQXN9" },
      { title: "Belajar Matematika untuk Data Science", id: "QLZ9N3139Z5D" },
      { title: "Belajar Analisis Data untuk Pemula", id: "EYX4OV0RJXDL" },
      { title: "Belajar Dasar Data Science", id: "KEXLM18ERZG2" },
      { title: "Belajar Dasar Structured Query Language (SQL)", id: "JLX1K721GP72" },
      { title: "Belajar Dasar Visualisasi Data", id: "72ZDMVY2QZYW" },
      { title: "Memulai Pemrograman dengan Python", id: "MRZMVE8GLZYQ" },
    ],
  },

  /** Shown in the About section as the current grind. */
  learningFocus: {
    en: [
      "Orchestration patterns in Airflow beyond a single linear DAG",
      "dbt as a modelling layer, not just a SQL runner",
      "Time-series forecasting and sequence models",
      "Cloud data warehousing (BigQuery, Snowflake)",
    ],
    id: [
      "Pola orkestrasi Airflow di luar DAG linear tunggal",
      "dbt sebagai lapisan pemodelan, bukan sekadar runner SQL",
      "Peramalan time-series dan model sekuensial",
      "Cloud data warehousing (BigQuery, Snowflake)",
    ],
  } satisfies LList,
} as const;

export const siteUrl = "https://baskarakresna.vercel.app";

/**
 * Static on purpose: Cache Components rejects `new Date()` during prerender,
 * and a footer year is not worth making the page dynamic for.
 */
export const copyrightYear = 2026;
