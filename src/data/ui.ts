import type { LText } from "@/lib/i18n";

/**
 * Interface strings, in both languages.
 *
 * Content (projects, skills, about…) lives in its own data files; this is the
 * chrome around it — labels, buttons, headings and helper text.
 *
 * Game-UI words are deliberately kept in English in the Indonesian copy where
 * the retro convention is stronger than the translation: QUEST, PLAYER STATS,
 * LV., START. An Indonesian player of an 8-bit game reads those as-is.
 */
export const ui = {
  /* ── Chrome ──────────────────────────────────────────────────────────── */
  skipToContent: { en: "Skip to content", id: "Lewati ke konten" },
  openMenu: { en: "Open menu", id: "Buka menu" },
  closeMenu: { en: "Close menu", id: "Tutup menu" },
  switchToDay: { en: "Switch to day", id: "Ganti ke siang" },
  switchToNight: { en: "Switch to night", id: "Ganti ke malam" },
  switchLanguage: { en: "Ganti ke Bahasa Indonesia", id: "Switch to English" },

  nav: {
    about: { en: "About", id: "Profil" },
    classes: { en: "Classes", id: "Kelas" },
    projects: { en: "Projects", id: "Proyek" },
    skills: { en: "Skills", id: "Skill" },
    experience: { en: "Experience", id: "Pengalaman" },
    contact: { en: "Contact", id: "Kontak" },
  } satisfies Record<string, LText>,

  /* ── Start screen ────────────────────────────────────────────────────── */
  start: {
    dialogLabel: { en: "Start screen", id: "Layar mulai" },
    menuLabel: { en: "Start menu", id: "Menu mulai" },
    initializing: { en: "INITIALIZING...", id: "MEMUAT..." },
    loading: { en: "Loading", id: "Memuat" },
    worldAwaits: { en: "Data World Awaits", id: "Dunia Data Menanti" },
    hint: {
      en: "Arrow keys to choose · Enter to select · Esc to skip",
      id: "Panah untuk memilih · Enter untuk masuk · Esc untuk lewati",
    },
    menu: {
      start: { en: "Start", id: "Mulai" },
      about: { en: "About", id: "Profil" },
      projects: { en: "Projects", id: "Proyek" },
      skills: { en: "Skills", id: "Skill" },
      contact: { en: "Contact", id: "Kontak" },
    } satisfies Record<string, LText>,
  },

  /* ── Loading screen ──────────────────────────────────────────────────── */
  loading: {
    /* Announced to a screen reader; the pixel art says nothing to it. */
    label: { en: "Loading", id: "Memuat" },
    switching: { en: "SWITCHING LANGUAGE...", id: "MENGGANTI BAHASA..." },
    done: { en: "READY", id: "SIAP" },
    classes: {
      engineer: { en: "ENGINEER", id: "ENGINEER" },
      analyst: { en: "ANALYST", id: "ANALYST" },
      scientist: { en: "SCIENTIST", id: "SCIENTIST" },
    } satisfies Record<string, LText>,
    tip: {
      label: { en: "TIP #1", id: "TIP #1" },
      body: {
        en: "Good data leads to better decisions.",
        id: "Data yang baik menghasilkan keputusan yang lebih baik.",
      },
    },
  },

  /* ── Hero ────────────────────────────────────────────────────────────── */
  hero: {
    exploreProjects: { en: "Explore Projects", id: "Lihat Proyek" },
    disciplines: { en: "Disciplines", id: "Bidang" },
    statusCmd: { en: "status --short", id: "status --short" },
    questsCleared: { en: "quests cleared", id: "quest selesai" },
    rowsProcessed: { en: "rows processed", id: "baris diproses" },
    statusLabel: { en: "status", id: "status" },
  },

  /* ── World map ───────────────────────────────────────────────────────── */
  world: {
    title: { en: "THE DATA WORLD", id: "DUNIA DATA" },
    subtitle: {
      en: "Three regions, one journey. Pick a region to filter the quest log to the work done there.",
      id: "Tiga wilayah, satu perjalanan. Pilih wilayah untuk menyaring quest log ke pekerjaan di sana.",
    },
    ready: { en: "DATA WORLD READY!", id: "DUNIA DATA SIAP!" },
    tagline: {
      en: "Let's build, analyze, and predict together.",
      id: "Mari bangun, analisis, dan prediksi bersama.",
    },
    enter: { en: "Enter the Data World", id: "Masuki Dunia Data" },
    sceneAlt: {
      en: "Pixel art of three floating islands joined by bridges: a data tower, a chart city and a model lab",
      id: "Pixel art tiga pulau melayang yang dihubungkan jembatan: menara data, kota diagram dan lab model",
    },
    footer: {
      en: "Your data journey starts here",
      id: "Perjalanan datamu dimulai di sini",
    },
    tip: {
      label: { en: "TIP #2", id: "TIP #2" },
      body: {
        en: "From raw data to real impact.",
        id: "Dari data mentah ke dampak nyata.",
      },
    },
    quest: { en: "quest", id: "quest" },
    quests: { en: "quests", id: "quest" },
  },

  /* ── About ───────────────────────────────────────────────────────────── */
  about: {
    title: { en: "PLAYER PROFILE", id: "PROFIL PEMAIN" },
    subtitle: {
      en: "Who is behind the save file.",
      id: "Siapa di balik save file ini.",
    },
    cardTitle: { en: "Player Profile", id: "Profil Pemain" },
    portraitAlt: {
      en: "Pixel art portrait of",
      id: "Potret pixel art dari",
    },
    rows: {
      name: { en: "Name", id: "Nama" },
      class: { en: "Class", id: "Kelas" },
      field: { en: "Field", id: "Bidang" },
      status: { en: "Status", id: "Status" },
      location: { en: "Location", id: "Lokasi" },
    } satisfies Record<string, LText>,
    training: { en: "Currently Training", id: "Sedang Dipelajari" },
    tagFooter: {
      en: "Three disciplines, one workflow — not three job titles.",
      id: "Tiga bidang, satu alur kerja — bukan tiga jabatan.",
    },
  },

  /* ── Classes ─────────────────────────────────────────────────────────── */
  classes: {
    title: { en: "SELECT YOUR CLASS", id: "PILIH KELASMU" },
    subtitle: {
      en: "Three classes, one character. Each one owns a different stage of the same data workflow — pick one to filter the quest log.",
      id: "Tiga kelas, satu karakter. Masing-masing memegang tahap berbeda dari alur data yang sama — pilih satu untuk menyaring quest log.",
    },
    focus: { en: "Focus", id: "Fokus" },
    stack: { en: "Stack", id: "Stack" },
    explore: { en: "Explore", id: "Jelajahi" },
    chainTitle: { en: "The chain", id: "Rantainya" },
    chainBody: {
      en: "This is the point of the portfolio. Not “I can do Data Engineering, Data Analytics and Data Science” as three separate claims, but one pipeline where each stage makes the next one possible.",
      id: "Ini inti portfolio-nya. Bukan “saya bisa Data Engineering, Data Analytics dan Data Science” sebagai tiga klaim terpisah, tapi satu pipeline di mana tiap tahap memungkinkan tahap berikutnya.",
    },
  },

  /* ── Quest log ───────────────────────────────────────────────────────── */
  projects: {
    title: { en: "QUEST LOG", id: "QUEST LOG" },
    subtitle: {
      en: "Every project written up with its problem, its data, its process and its limits — including the numbers that did not come out clean.",
      id: "Tiap proyek ditulis lengkap dengan masalah, data, proses dan batasannya — termasuk angka yang hasilnya tidak bersih.",
    },
    filterLabel: {
      en: "Filter projects by discipline",
      id: "Saring proyek berdasarkan bidang",
    },
    all: { en: "All", id: "Semua" },
    shown: { en: "shown", id: "ditampilkan" },
    quest: { en: "quest", id: "quest" },
    quests: { en: "quests", id: "quest" },
    questNo: { en: "Quest", id: "Quest" },
    classLabel: { en: "CLASS", id: "KELAS" },
    focus: { en: "Focus", id: "Fokus" },
    stack: { en: "Stack", id: "Stack" },
    viewQuest: { en: "View Quest", id: "Buka Quest" },
    repo: { en: "Repo", id: "Repo" },
    repoPrivate: { en: "Repo Private", id: "Repo Privat" },
    coverAlt: {
      en: "Preview chart from",
      id: "Pratinjau grafik dari",
    },
    repoPrivateTitle: {
      en: "This repository is not public yet",
      id: "Repository ini belum publik",
    },
    completed: { en: "COMPLETED", id: "SELESAI" },
    inProgress: { en: "IN PROGRESS", id: "BERJALAN" },
    planned: { en: "PLANNED", id: "DIRENCANAKAN" },
    empty: {
      en: "No quests in this class yet.",
      id: "Belum ada quest di kelas ini.",
    },
  },

  /* ── Skills ──────────────────────────────────────────────────────────── */
  skills: {
    title: { en: "PLAYER STATS", id: "PLAYER STATS" },
    subtitle: {
      en: "Grouped by where each one actually gets used.",
      id: "Dikelompokkan berdasarkan di mana masing-masing benar-benar dipakai.",
    },
    filterLabel: { en: "Filter skills", id: "Saring skill" },
    totalXp: { en: "Total XP", id: "Total XP" },
    xpToNext: { en: "XP to LV.", id: "XP ke LV." },
    levelProgress: {
      en: "Progress to next level",
      id: "Progres ke level berikutnya",
    },
    stat: { en: "stat", id: "stat" },
    stats: { en: "stats", id: "stat" },
    shown: { en: "shown", id: "ditampilkan" },
    tabs: {
      all: { en: "All", id: "Semua" },
      engineering: { en: "Engineering", id: "Engineering" },
      analytics: { en: "Analytics", id: "Analytics" },
      science: { en: "Science", id: "Science" },
      tools: { en: "Tools", id: "Tools" },
    } satisfies Record<string, LText>,
    disclaimer: {
      en: "Levels and XP are a visual gamification device, not a calibrated measure of professional ability. XP is derived from the levels, so the two can never disagree. The projects are the actual evidence.",
      id: "Level dan XP adalah elemen gamifikasi visual, bukan ukuran kemampuan profesional yang terkalibrasi. XP diturunkan dari level, jadi keduanya tidak mungkin bertentangan. Proyeklah bukti sebenarnya.",
    },
    levelOf: { en: "level", id: "level" },
  },

  /* ── Experience ──────────────────────────────────────────────────────── */
  experience: {
    title: { en: "QUEST HISTORY", id: "RIWAYAT QUEST" },
    subtitle: {
      en: "Where the work happened, and what I owned in it.",
      id: "Di mana pekerjaannya berlangsung, dan bagian mana yang saya pegang.",
    },
    questCompleted: { en: "Quest Completed", id: "Quest Selesai" },
    questActive: { en: "Quest Active", id: "Quest Berjalan" },
    responsibilities: { en: "Responsibilities", id: "Tanggung Jawab" },
    contribution: { en: "Contribution", id: "Kontribusi" },
    result: { en: "Result", id: "Hasil" },
    stack: { en: "Stack", id: "Stack" },
  },

  /* ── Education ───────────────────────────────────────────────────────── */
  education: {
    title: { en: "PLAYER EDUCATION", id: "PENDIDIKAN PEMAIN" },
    rows: {
      university: { en: "University", id: "Universitas" },
      major: { en: "Major", id: "Jurusan" },
      degree: { en: "Degree", id: "Gelar" },
      status: { en: "Status", id: "Status" },
      years: { en: "Years", id: "Tahun" },
      gpa: { en: "GPA", id: "IPK" },
    } satisfies Record<string, LText>,
    expected: { en: "expected", id: "perkiraan" },
    coursework: { en: "Coursework Focus", id: "Fokus Perkuliahan" },
    certifications: { en: "Certifications · Dicoding", id: "Sertifikasi · Dicoding" },
    verify: { en: "verify", id: "verifikasi" },  },

  /* ── Achievements ────────────────────────────────────────────────────── */
  achievements: {
    title: { en: "ACHIEVEMENTS", id: "ACHIEVEMENT" },
    locked: { en: "LOCKED", id: "TERKUNCI" },
    viewDetails: { en: "VIEW DETAILS", id: "LIHAT DETAIL" },
    featured: { en: "COMPETITION", id: "KOMPETISI" },
    unlocked: { en: "ACHIEVEMENT UNLOCKED", id: "ACHIEVEMENT TERBUKA" },
    close: { en: "Close", id: "Tutup" },
    award: { en: "Award", id: "Penghargaan" },
    event: { en: "Competition", id: "Kompetisi" },
    organizer: { en: "Organizer", id: "Penyelenggara" },
    year: { en: "Year", id: "Tahun" },
    role: { en: "Role", id: "Peran" },
    contribution: { en: "Contribution", id: "Kontribusi" },
    documentation: { en: "Documentation", id: "Dokumentasi" },
    noPhotos: { en: "Photos coming soon.", id: "Foto segera menyusul." },
    link: { en: "More info", id: "Info lengkap" },
  },

  /* ── Contact ─────────────────────────────────────────────────────────── */
  contact: {
    title: { en: "READY FOR NEXT QUEST?", id: "SIAP UNTUK QUEST BERIKUTNYA?" },
    subtitle: { en: "Let's connect.", id: "Mari terhubung." },
    body: {
      en: "Open to internships and junior roles across data engineering, analytics and data science. If you want the long version of any project above, ask me — the write-ups go deeper than the cards do.",
      id: "Terbuka untuk magang dan posisi junior di data engineering, analytics dan data science. Kalau mau versi panjang dari proyek mana pun di atas, tanya saja — tulisannya jauh lebih dalam daripada kartunya.",
    },
    email: { en: "Email", id: "Email" },
    resume: { en: "Resume", id: "CV" },
  },

  /* ── Footer ──────────────────────────────────────────────────────────── */
  footer: {
    builtWith: {
      en: "Built with Next.js & Tailwind",
      id: "Dibuat dengan Next.js & Tailwind",
    },
  },

  /* ── Project detail ──────────────────────────────────────────────────── */
  detail: {
    backToLog: { en: "Quest Log", id: "Quest Log" },
    sections: { en: "Project sections", id: "Bagian proyek" },
    otherQuests: { en: "Other quests", id: "Quest lainnya" },
    viewRepository: { en: "View Repository", id: "Buka Repository" },
    viewOnGithub: { en: "View on GitHub", id: "Buka di GitHub" },
    liveDemo: { en: "Live Demo", id: "Demo Langsung" },
    scopeTitle: { en: "Scope & verification", id: "Cakupan & verifikasi" },
    tabs: {
      overview: { en: "Overview", id: "Ringkasan" },
      dataset: { en: "Dataset", id: "Dataset" },
      approach: { en: "Approach", id: "Pendekatan" },
      architecture: { en: "Architecture", id: "Arsitektur" },
      analysis: { en: "Analysis", id: "Analisis" },
      model: { en: "Model", id: "Model" },
      process: { en: "Process", id: "Proses" },
      result: { en: "Result", id: "Hasil" },
      repo: { en: "Repo", id: "Repo" },
    } satisfies Record<string, LText>,
    headings: {
      overview: { en: "Overview", id: "Ringkasan" },
      problem: { en: "Problem", id: "Masalah" },
      dataset: { en: "Dataset", id: "Dataset" },
      approach: { en: "Approach", id: "Pendekatan" },
      decisions: {
        en: "Decisions worth flagging",
        id: "Keputusan yang perlu disorot",
      },
      architecture: { en: "Architecture", id: "Arsitektur" },
      analysis: { en: "Analysis", id: "Analisis" },
      figures: { en: "Figures", id: "Gambar" },
      model: { en: "Model", id: "Model" },
      process: { en: "Process", id: "Proses" },
      result: { en: "Result", id: "Hasil" },
      limitations: { en: "Limitations", id: "Batasan" },
      technology: { en: "Technology", id: "Teknologi" },
      repository: { en: "Repository", id: "Repository" },
    } satisfies Record<string, LText>,
    source: { en: "Source", id: "Sumber" },
    evidence: { en: "Evidence", id: "Bukti" },
    limitsNote: {
      en: "Stated plainly, because knowing the boundaries is part of the deliverable.",
      id: "Ditulis apa adanya, karena mengetahui batasannya adalah bagian dari hasil kerjanya.",
    },
    repoPrivateBody: {
      en: "This repository is not public yet. Ask me for access and I will walk you through the code.",
      id: "Repository ini belum publik. Minta akses ke saya dan akan saya pandu lewat kodenya.",
    },
  },

  /* ── 404 ─────────────────────────────────────────────────────────────── */
  notFound: {
    title: { en: "Quest not found", id: "Quest tidak ditemukan" },
    body: {
      en: "This area of the data world does not exist. The path may have changed, or the quest was never written.",
      id: "Area dunia data ini tidak ada. Jalurnya mungkin berubah, atau quest-nya memang belum pernah ditulis.",
    },
    returnHome: { en: "Return to World", id: "Kembali ke Dunia" },
  },
} as const;
