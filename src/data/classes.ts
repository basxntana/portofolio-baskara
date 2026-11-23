import type { LList, LText } from "@/lib/i18n";

/**
 * The three data "classes". Each maps to one discipline and one project filter.
 */

export type ClassId = "engineer" | "analyst" | "scientist";

export type DataClass = {
  id: ClassId;
  /** Matches Project.category so "EXPLORE" can filter the quest log. */
  category: "Data Engineering" | "Data Analytics" | "Data Science";
  name: LText;
  role: LText;
  blurb: LText;
  tone: "primary" | "secondary" | "accent";
  focus: LList;
  tech: string[];
  /** One-line statement of what this class is responsible for in the chain. */
  chainStep: { input: LText; output: LText };
  /** How this class appears on the world map. */
  world: {
    place: LText;
    /** The island sprite, cut per theme — see scripts/build-art.js. */
    art: { night: string; day: string };
    alt: LText;
  };
};

export const dataClasses: DataClass[] = [
  {
    id: "engineer",
    category: "Data Engineering",
    name: { en: "Data Engineer", id: "Data Engineer" },
    role: { en: "The Builder", id: "Sang Pembangun" },
    blurb: {
      en: "Build the infrastructure behind data.",
      id: "Membangun infrastruktur di balik data.",
    },
    tone: "primary",
    focus: {
      en: [
        "ETL / ELT",
        "Data Pipeline",
        "Data Processing",
        "Database Design",
        "Data Warehouse",
        "Data Quality",
        "Orchestration",
      ],
      id: [
        "ETL / ELT",
        "Data Pipeline",
        "Pemrosesan Data",
        "Desain Basis Data",
        "Data Warehouse",
        "Kualitas Data",
        "Orkestrasi",
      ],
    },
    tech: ["Python", "SQL", "PostgreSQL", "Airflow", "Docker", "dbt", "Git"],
    chainStep: {
      input: {
        en: "Raw, messy source files",
        id: "File sumber mentah dan berantakan",
      },
      output: {
        en: "Clean, reliable, documented tables",
        id: "Tabel bersih, andal, terdokumentasi",
      },
    },
    world: {
      place: { en: "Data Pipeline City", id: "Kota Data Pipeline" },
      art: {
        night: "/assets/images/world/island-engineer-night.webp",
        day: "/assets/images/world/island-engineer-day.webp",
      },
      alt: {
        en: "Pixel art island with a tall data tower, trees and clouds",
        id: "Pulau pixel art dengan menara data tinggi, pepohonan dan awan",
      },
    },
  },
  {
    id: "analyst",
    category: "Data Analytics",
    name: { en: "Data Analyst", id: "Data Analyst" },
    role: { en: "The Interpreter", id: "Sang Penafsir" },
    blurb: {
      en: "Turn data into useful insights.",
      id: "Mengubah data menjadi insight yang berguna.",
    },
    tone: "secondary",
    focus: {
      en: [
        "Data Cleaning",
        "Exploratory Data Analysis",
        "SQL",
        "Data Visualization",
        "Statistical Analysis",
        "Segmentation",
        "Business Insight",
      ],
      id: [
        "Pembersihan Data",
        "Analisis Data Eksploratif",
        "SQL",
        "Visualisasi Data",
        "Analisis Statistik",
        "Segmentasi",
        "Insight Bisnis",
      ],
    },
    tech: ["Python", "pandas", "SQL", "Excel", "Matplotlib", "Power BI"],
    chainStep: {
      input: { en: "Clean, reliable data", id: "Data bersih dan andal" },
      output: {
        en: "Decisions backed by evidence",
        id: "Keputusan yang didukung bukti",
      },
    },
    world: {
      place: { en: "Insight Town", id: "Kota Insight" },
      art: {
        night: "/assets/images/world/island-analyst-night.webp",
        day: "/assets/images/world/island-analyst-day.webp",
      },
      alt: {
        en: "Pixel art island with a low building and bar-chart towers",
        id: "Pulau pixel art dengan bangunan rendah dan menara berbentuk diagram batang",
      },
    },
  },
  {
    id: "scientist",
    category: "Data Science",
    name: { en: "Data Scientist", id: "Data Scientist" },
    role: { en: "The Forecaster", id: "Sang Peramal" },
    blurb: {
      en: "Build models from data.",
      id: "Membangun model dari data.",
    },
    tone: "accent",
    focus: {
      en: [
        "Statistical Modeling",
        "Machine Learning",
        "Feature Engineering",
        "Predictive Modeling",
        "Deep Learning",
        "Model Evaluation",
      ],
      id: [
        "Pemodelan Statistik",
        "Machine Learning",
        "Feature Engineering",
        "Pemodelan Prediktif",
        "Deep Learning",
        "Evaluasi Model",
      ],
    },
    tech: [
      "Python",
      "scikit-learn",
      "pandas",
      "NumPy",
      "TensorFlow / PyTorch",
      "Matplotlib",
    ],
    chainStep: {
      input: { en: "Insight and features", id: "Insight dan fitur" },
      output: { en: "Predictions and models", id: "Prediksi dan model" },
    },
    world: {
      place: { en: "Model Lab", id: "Lab Model" },
      art: {
        night: "/assets/images/world/island-scientist-night.webp",
        day: "/assets/images/world/island-scientist-day.webp",
      },
      alt: {
        en: "Pixel art island with a lab under a glowing neural orb",
        id: "Pulau pixel art dengan laboratorium di bawah bola neural bercahaya",
      },
    },
  },
];

/** The "these three are one workflow" story, used in About and the Classes footer. */
export const dataChain: { label: LText; tone: "muted" | "primary" | "secondary" | "accent" }[] = [
  { label: { en: "Raw Data", id: "Data Mentah" }, tone: "muted" },
  { label: { en: "Data Engineering", id: "Data Engineering" }, tone: "primary" },
  {
    label: { en: "Clean & Reliable Data", id: "Data Bersih & Andal" },
    tone: "muted",
  },
  { label: { en: "Data Analytics", id: "Data Analytics" }, tone: "secondary" },
  { label: { en: "Insights", id: "Insight" }, tone: "muted" },
  { label: { en: "Data Science", id: "Data Science" }, tone: "accent" },
  {
    label: { en: "Predictions / Models", id: "Prediksi / Model" },
    tone: "muted",
  },
];
