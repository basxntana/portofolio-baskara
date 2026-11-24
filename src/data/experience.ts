import type { LList, LText } from "@/lib/i18n";

/**
 * Quest history.
 *
 * Only real engagements belong here. An entry with a TODO has not been
 * verified yet — fill it in or remove it before sharing the site.
 */

export type Experience = {
  id: string;
  org: string;
  role: LText;
  /** e.g. "2025 — 2026" or "Mar 2025 — Aug 2025" */
  period: LText;
  status: "completed" | "ongoing";
  kind: LText;
  summary: LText;
  responsibilities: LList;
  contribution: LList;
  tech: string[];
  result: LList;
};

export const experiences: Experience[] = [
  {
    id: "festafestum",
    org: "FestaFestum",
    role: { en: "Data Scientist", id: "Data Scientist" },
    // TODO(baskara): real dates, what kind of project/organisation this was,
    // what you actually owned, and what it produced.
    period: { en: "To be confirmed", id: "Belum dikonfirmasi" },
    status: "completed",
    kind: { en: "Team project", id: "Proyek tim" },
    summary: {
      en: "Served as Data Scientist on the FestaFestum project. Details of the scope, dataset and outcome are being written up.",
      id: "Berperan sebagai Data Scientist di proyek FestaFestum. Detail cakupan, dataset dan hasilnya sedang ditulis.",
    },
    responsibilities: {
      // TODO(baskara): the specific work you owned on this project.
      en: [],
      id: [],
    },
    contribution: {
      // TODO(baskara): what existed because you were on the team.
      en: [],
      id: [],
    },
    tech: ["Python", "pandas", "scikit-learn"],
    result: {
      // TODO(baskara): what the project delivered, ideally with a number.
      en: [],
      id: [],
    },
  },
  {
    id: "independent-data-practice",
    org: "Independent Projects",
    role: { en: "Data Engineer / Analyst", id: "Data Engineer / Analyst" },
    period: { en: "2025 — present", id: "2025 — sekarang" },
    status: "ongoing",
    kind: { en: "Self-directed", id: "Mandiri" },
    summary: {
      en: "Two full-scale data projects built end to end as deliberate practice, each scoped and documented as if it were production work rather than a tutorial exercise.",
      id: "Dua proyek data skala penuh yang dibangun end-to-end sebagai latihan terarah, masing-masing dicakup dan didokumentasikan seolah pekerjaan produksi, bukan latihan tutorial.",
    },
    responsibilities: {
      en: [
        "Designed and built an ELT pipeline over 8.7 GB of NYC taxi trip records, landing in a partitioned PostgreSQL star schema orchestrated by Airflow.",
        "Specified and implemented 54 layered data-quality checks with a control plane that records every run and verdict in the database.",
        "Ran a complete customer and market-basket analysis over 3.4 million grocery orders and 33.8 million order lines, from data quality through to recommendations.",
        "Produced the reporting layer each project needed: SQL analysis queries, a 12-chart Excel dashboard, a Power BI model and a bilingual written report.",
      ],
      id: [
        "Merancang dan membangun pipeline ELT atas 8,7 GB catatan perjalanan taksi NYC, bermuara di star schema PostgreSQL terpartisi yang diorkestrasi Airflow.",
        "Menetapkan dan mengimplementasikan 54 pemeriksaan kualitas data berlapis dengan control plane yang mencatat setiap run dan putusannya di basis data.",
        "Menjalankan analisis pelanggan dan market basket lengkap atas 3,4 juta pesanan bahan makanan dan 33,8 juta baris pesanan, dari kualitas data sampai rekomendasi.",
        "Membuat lapisan pelaporan yang dibutuhkan tiap proyek: query analisis SQL, dashboard Excel 12 grafik, model Power BI, dan laporan tertulis dwibahasa.",
      ],
    },
    contribution: {
      en: [
        "Treated data quality as the deliverable rather than an afterthought — 44.7 million rows loaded with every row either in the warehouse or in quarantine with its reasons recorded.",
        "Wrote verification into both projects: 85 automated tests on the pipeline, and a script that re-checks all 40 headline figures in the analysis report and fails on drift.",
        "Documented the limits of each project as explicitly as the findings, including what the data cannot support.",
      ],
      id: [
        "Memperlakukan kualitas data sebagai hasil kerja, bukan tambahan belakangan — 44,7 juta baris dimuat dengan setiap baris ada di warehouse atau di karantina beserta alasannya.",
        "Menulis verifikasi ke dalam kedua proyek: 85 tes otomatis pada pipeline, dan skrip yang memeriksa ulang 40 angka utama di laporan analisis dan gagal bila ada penyimpangan.",
        "Mendokumentasikan batasan tiap proyek seeksplisit temuannya, termasuk apa yang tidak bisa didukung datanya.",
      ],
    },
    tech: [
      "Python",
      "SQL",
      "PostgreSQL",
      "Apache Airflow",
      "Docker",
      "dbt",
      "pandas",
      "scikit-learn",
      "MLxtend",
      "Power BI",
    ],
    result: {
      en: [
        "44,697,129 rows loaded end to end with 54/54 quality checks passing on every period.",
        "Six evidence-backed business recommendations, each traced to a specific measured finding.",
        "Both projects fully documented — architecture, data dictionary, data model, transformation rules and stated limitations.",
      ],
      id: [
        "44.697.129 baris dimuat end-to-end dengan 54/54 pemeriksaan kualitas lolos di setiap periode.",
        "Enam rekomendasi bisnis berbasis bukti, masing-masing tertelusur ke temuan terukur yang spesifik.",
        "Kedua proyek terdokumentasi penuh — arsitektur, kamus data, model data, aturan transformasi, dan batasan yang dinyatakan.",
      ],
    },
  },
];
