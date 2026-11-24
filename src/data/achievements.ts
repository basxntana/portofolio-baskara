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
  icon: "database" | "chart" | "brain" | "cog" | "shield" | "layers" | "rocket" | "trophy";
  /** When set, the card opens a detail panel. Unset fields are simply not shown. */
  details?: AchievementDetails;
};

export type AchievementDetails = {
  award: LText;
  event?: LText;
  organizer?: string;
  year?: number;
  role?: LText;
  contribution?: LText;
  /** Original photos, shown unedited. Files go in public/achievements/. */
  photos: { src: string; alt: LText; width: number; height: number }[];
  link?: string;
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
    id: "first-competition",
    name: { en: "First Competition", id: "Kompetisi Pertama" },
    description: {
      en: "Entered my first competition, USB 2026, and placed Juara Harapan 2 in the ICT Business category.",
      id: "Mengikuti kompetisi pertama saya, USB 2026, dan meraih Juara Harapan 2 kategori Bisnis TIK.",
    },
    unlocked: true,
    tone: "accent",
    icon: "trophy",
    // TODO: add role and contribution once provided — real details only.
    details: {
      award: {
        en: "Juara Harapan 2 (2nd Honorable Mention) · ICT Business category",
        id: "Juara Harapan 2 · Kategori Bisnis TIK",
      },
      event: {
        en: "USB 2026 — Unlimited Software Building (Final)",
        id: "USB 2026 — Unlimited Software Building (Final)",
      },
      organizer: "Universitas Gunadarma",
      year: 2026,
      photos: [
        {
          src: "/achievements/usb-2026-team.jpeg",
          alt: {
            en: "The team of four posing with the Harapan 2 award board for the ICT Business category at USB 2026.",
            id: "Tim berempat berpose dengan papan penghargaan Harapan 2 kategori Bisnis TIK di USB 2026.",
          },
          width: 4032,
          height: 3024,
        },
        {
          src: "/achievements/usb-2026-solo.jpeg",
          alt: {
            en: "Holding the Harapan 2 award board and medal in the USB 2026 venue.",
            id: "Memegang papan penghargaan Harapan 2 dan medali di lokasi USB 2026.",
          },
          width: 3024,
          height: 4032,
        },
        {
          src: "/achievements/usb-2026-selfie.jpeg",
          alt: {
            en: "Team selfie with the Harapan 2 award board in front of the USB 2026 final stage.",
            id: "Swafoto tim dengan papan penghargaan Harapan 2 di depan panggung final USB 2026.",
          },
          width: 3024,
          height: 4032,
        },
      ],
    },
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
