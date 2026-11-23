import type { LText } from "@/lib/i18n";

/**
 * Achievements — gamification over real milestones only.
 * Locked entries are honest: they are things not done yet.
 */

export type Achievement = {
  id: string;
  name: LText;
  description: LText;
  unlocked: boolean;
  /** Which palette accent it reads in when unlocked. */
  tone: "primary" | "secondary" | "accent";
  /** Lucide icon name, resolved in the component. */
  icon: "database" | "chart" | "brain" | "cog" | "shield" | "layers" | "rocket";
};

export const achievements: Achievement[] = [
  {
    id: "first-pipeline",
    name: { en: "First Pipeline", id: "Pipeline Pertama" },
    description: {
      en: "Built an end-to-end ELT pipeline from raw files to a queryable warehouse.",
      id: "Membangun pipeline ELT end-to-end dari file mentah sampai warehouse yang bisa di-query.",
    },
    unlocked: true,
    tone: "primary",
    icon: "database",
  },
  {
    id: "data-explorer",
    name: { en: "Data Explorer", id: "Penjelajah Data" },
    description: {
      en: "Completed a full analytical project, from data quality to recommendations.",
      id: "Menyelesaikan proyek analitik penuh, dari kualitas data sampai rekomendasi.",
    },
    unlocked: true,
    tone: "secondary",
    icon: "chart",
  },
  {
    id: "quality-gate",
    name: { en: "Quality Gate", id: "Gerbang Kualitas" },
    description: {
      en: "Declared 54 layered data-quality checks and made them block a bad load.",
      id: "Mendeklarasikan 54 pemeriksaan kualitas data berlapis dan membuatnya menghentikan load yang buruk.",
    },
    unlocked: true,
    tone: "accent",
    icon: "shield",
  },
  {
    id: "scale",
    name: { en: "Eight Figures", id: "Delapan Digit" },
    description: {
      en: "Processed more than 44 million rows through a single verified pipeline run.",
      id: "Memproses lebih dari 44 juta baris dalam satu kali run pipeline terverifikasi.",
    },
    unlocked: true,
    tone: "primary",
    icon: "layers",
  },
  {
    id: "system-builder",
    name: { en: "System Builder", id: "Pembangun Sistem" },
    description: {
      en: "Shipped an orchestrated, tested, documented data system — not just a notebook.",
      id: "Merilis sistem data yang terorkestrasi, teruji, dan terdokumentasi — bukan sekadar notebook.",
    },
    unlocked: true,
    tone: "accent",
    icon: "cog",
  },
  {
    id: "model-builder",
    name: { en: "Model Builder", id: "Pembangun Model" },
    description: {
      en: "Ship a machine learning model with a baseline it genuinely beats.",
      id: "Merilis model machine learning dengan baseline yang benar-benar dikalahkannya.",
    },
    unlocked: false,
    tone: "secondary",
    icon: "brain",
  },
  {
    id: "cloud-native",
    name: { en: "Cloud Native", id: "Cloud Native" },
    description: {
      en: "Run a pipeline on managed cloud infrastructure with object storage as the landing zone.",
      id: "Menjalankan pipeline di infrastruktur cloud terkelola dengan object storage sebagai landing zone.",
    },
    unlocked: false,
    tone: "primary",
    icon: "rocket",
  },
];

export const unlockedCount = achievements.filter((a) => a.unlocked).length;
