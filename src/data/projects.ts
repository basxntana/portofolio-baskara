import type { LList, LText } from "@/lib/i18n";

/**
 * Quest log.
 *
 * Content for the two shipped projects is taken from their own repositories,
 * including the measured numbers. Where a figure describes the *design* rather
 * than a verified run, `verification` says so — do not quietly round that away.
 *
 * Every piece of prose carries both languages. Numbers, technology names and
 * column names are not translated: `fare_amount` is `fare_amount` everywhere.
 */

export type ProjectCategory = "Data Engineering" | "Data Analytics" | "Data Science";
export type ProjectStatus = "completed" | "in-progress" | "planned";

export type Stat = { label: LText; value: string; hint?: LText };

export type Project = {
  slug: string;
  quest: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** One sentence for the quest card. */
  summary: LText;
  /** 2–4 words each, shown as the card's "FOCUS" line. */
  focus: LList;
  tech: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  cover: string | null;
  stats: Stat[];
  detail: {
    overview: LList;
    problem: LList;
    dataset: {
      name: LText;
      source: LText;
      sourceUrl?: string;
      shape: Stat[];
      notes: LList;
    };
    approach: LList;
    /** Data Engineering projects. */
    architecture?: {
      intro: LText;
      /** Left-to-right pipeline diagram shown above the layer detail. */
      flow?: { label: LText; sub: LText }[];
      layers: {
        name: string;
        what: LText;
        checks?: LText;
        tone: "primary" | "secondary" | "accent" | "muted";
      }[];
      outro?: LText;
    };
    /** Data Analytics projects. */
    analysis?: { heading: LText; body: LText; evidence?: LText }[];
    /** Data Science projects. */
    model?: { heading: LText; body: LText }[];
    process: { step: LText; detail: LText }[];
    result: LList;
    highlights?: { title: LText; body: LText }[];
    images?: { src: string; alt: LText; caption: LText; width: number; height: number }[];
    limitations?: LList;
    /** Honest scope statement where design capacity ≠ what was actually run. */
    verification?: LText;
  };
};

export const projects: Project[] = [
  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "nyc-taxi-data-pipeline",
    quest: "01",
    title: "NYC Taxi Data Pipeline",
    category: "Data Engineering",
    status: "completed",
    summary: {
      en: "An end-to-end ELT pipeline that turns 8.7 GB of raw NYC yellow-taxi CSVs into a validated, documented star schema in PostgreSQL — orchestrated by Airflow and guarded by 54 automated data-quality checks.",
      id: "Pipeline ELT end-to-end yang mengubah 8,7 GB CSV mentah taksi kuning NYC menjadi star schema tervalidasi dan terdokumentasi di PostgreSQL — diorkestrasi Airflow dan dijaga 54 pemeriksaan kualitas data otomatis.",
    },
    focus: {
      en: ["ELT", "Pipeline", "Data Warehouse", "Data Quality"],
      id: ["ELT", "Pipeline", "Data Warehouse", "Kualitas Data"],
    },
    tech: ["Python", "PostgreSQL", "Apache Airflow", "Docker", "dbt", "SQL"],
    repoUrl: null,
    demoUrl: null,
    cover: null,
    stats: [
      {
        label: { en: "Source data", id: "Data sumber" },
        value: "8.7 GB",
        hint: { en: "18 monthly CSV files", id: "18 berkas CSV bulanan" },
      },
      {
        label: { en: "Rows in dataset", id: "Baris dalam dataset" },
        value: "115.2M",
        hint: { en: "115,246,997 rows", id: "115.246.997 baris" },
      },
      {
        label: { en: "Verified load", id: "Load terverifikasi" },
        value: "44.7M",
        hint: { en: "7 months, end to end", id: "7 bulan, end-to-end" },
      },
      {
        label: { en: "Quality checks", id: "Pemeriksaan kualitas" },
        value: "54",
        hint: { en: "across 4 layers", id: "di 4 lapisan" },
      },
      {
        label: { en: "Ingest rate", id: "Laju ingest" },
        value: "670K rows/s",
        hint: {
          en: "measured, COPY FROM STDIN",
          id: "terukur, COPY FROM STDIN",
        },
      },
      {
        label: { en: "Test suite", id: "Suite tes" },
        value: "85 tests",
      },
    ],
    detail: {
      overview: {
        en: [
          "This project is about the pipeline, not the insights. The deliverable is not “the busiest taxi zone is Midtown” — it is a system that takes raw, partly-corrupt source files and produces data a downstream analyst can trust, repeatedly and verifiably.",
          "Raw NYC taxi data cannot be queried honestly as it arrives. The pipeline makes it trustworthy without pretending the problems do not exist: every record is either loaded, or quarantined with its reasons recorded.",
        ],
        id: [
          "Proyek ini tentang pipeline-nya, bukan insight-nya. Hasil kerjanya bukan “zona taksi tersibuk adalah Midtown” — melainkan sistem yang mengambil file sumber mentah dan sebagian rusak, lalu menghasilkan data yang bisa dipercaya analis di hilir, berulang kali dan bisa diverifikasi.",
          "Data taksi NYC mentah tidak bisa di-query secara jujur apa adanya. Pipeline ini membuatnya layak dipercaya tanpa berpura-pura masalahnya tidak ada: setiap record entah dimuat, atau dikarantina dengan alasannya tercatat.",
        ],
      },
      problem: {
        en: [
          "The source files contain pickup timestamps dated 2001 through 2090, trip distances of −37,264 miles and 269,804 miles, fares of −$1,856 and $943,275, and a block of five columns that goes blank from July 2019 onward.",
          "Worse, there is no trip identifier at all — so duplicates cannot even be detected without first inventing a key.",
          "A naive loader produces a warehouse that looks fine and is quietly wrong. The engineering problem is making the badness visible and accounted for, rather than silently dropping it.",
        ],
        id: [
          "File sumbernya memuat timestamp penjemputan bertanggal 2001 sampai 2090, jarak perjalanan −37.264 mil dan 269.804 mil, tarif −$1.856 dan $943.275, serta satu blok lima kolom yang kosong sejak Juli 2019.",
          "Lebih buruk lagi, sama sekali tidak ada pengenal perjalanan — jadi duplikat bahkan tidak bisa dideteksi tanpa lebih dulu menciptakan kuncinya.",
          "Loader naif menghasilkan warehouse yang tampak baik-baik saja padahal diam-diam salah. Masalah tekniknya adalah membuat keburukan itu terlihat dan terhitung, bukan membuangnya diam-diam.",
        ],
      },
      dataset: {
        name: {
          en: "NYC TLC Yellow Taxi Trip Records (2019-01 → 2020-06)",
          id: "Catatan Perjalanan Taksi Kuning NYC TLC (2019-01 → 2020-06)",
        },
        source: {
          en: "NYC Taxi & Limousine Commission, via Kaggle",
          id: "NYC Taxi & Limousine Commission, lewat Kaggle",
        },
        sourceUrl: "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page",
        shape: [
          {
            label: { en: "Files", id: "Berkas" },
            value: "18 monthly CSVs + 1 zone lookup",
          },
          { label: { en: "Rows", id: "Baris" }, value: "115,246,997" },
          { label: { en: "Size", id: "Ukuran" }, value: "8.7 GB" },
          {
            label: { en: "Columns", id: "Kolom" },
            value: "18, identical across all files",
          },
          { label: { en: "Zone lookup", id: "Tabel zona" }, value: "265 rows" },
        ],
        notes: {
          en: [
            "Structurally pristine: the header is identical across all 18 files, every one of the 115,246,997 rows has exactly 18 fields, and there is no quoting — which is precisely why ingestion can stream raw bytes straight into COPY.",
            "Semantically messy: out-of-window timestamps, negative fares and distances, extreme meter-failure outliers, dropoff-before-pickup rows, and ~2.5% zero-duration / zero-distance / zero-passenger trips.",
            "The COVID cliff is real and dominates any trend: trips collapse from 3,007,292 in March 2020 to 237,993 in April 2020.",
          ],
          id: [
            "Secara struktur bersih sempurna: header-nya identik di seluruh 18 berkas, setiap satu dari 115.246.997 baris punya tepat 18 field, dan tidak ada tanda kutip — justru itulah sebabnya ingest bisa mengalirkan byte mentah langsung ke COPY.",
            "Secara makna berantakan: timestamp di luar rentang, tarif dan jarak negatif, outlier ekstrem akibat argo rusak, baris dengan pengantaran sebelum penjemputan, dan ~2,5% perjalanan berdurasi / berjarak / berpenumpang nol.",
            "Jurang COVID itu nyata dan mendominasi tren apa pun: perjalanan anjlok dari 3.007.292 di Maret 2020 menjadi 237.993 di April 2020.",
          ],
        },
      },
      approach: {
        en: [
          "ELT, not ETL. Transformation happens after loading, in SQL, inside PostgreSQL. Moving 115 million rows into Python to do work the database is built for would be slower by an order of magnitude. Python handles what Python is good at: streaming files, orchestration, lineage and error handling.",
          "All 18 files were profiled before a single line of pipeline code was written. That order mattered — several of the findings would otherwise have produced a working pipeline that was quietly wrong.",
          "The 54 quality checks are declared as data in a YAML file, not hard-coded, and every result is written to a control-plane table so the pipeline's own history is queryable.",
        ],
        id: [
          "ELT, bukan ETL. Transformasi terjadi setelah pemuatan, dalam SQL, di dalam PostgreSQL. Memindahkan 115 juta baris ke Python untuk pekerjaan yang memang dirancang untuk basis data akan jauh lebih lambat. Python menangani yang memang kuat di Python: mengalirkan berkas, orkestrasi, lineage, dan penanganan error.",
          "Seluruh 18 berkas diprofil sebelum satu baris kode pipeline ditulis. Urutan itu penting — beberapa temuannya kalau tidak akan menghasilkan pipeline yang jalan tapi diam-diam salah.",
          "54 pemeriksaan kualitas dideklarasikan sebagai data di berkas YAML, bukan di-hardcode, dan setiap hasilnya ditulis ke tabel control plane sehingga riwayat pipeline-nya sendiri bisa di-query.",
        ],
      },
      architecture: {
        intro: {
          en: "Four data layers plus a control plane. Each layer asserts something different, and the gate between layers is a set of blocking checks.",
          id: "Empat lapisan data plus satu control plane. Tiap lapisan menegaskan hal yang berbeda, dan gerbang antar lapisan adalah sekumpulan pemeriksaan yang memblokir.",
        },
        flow: [
          {
            label: { en: "Raw CSVs", id: "CSV Mentah" },
            sub: { en: "18 files · 8.7 GB", id: "18 berkas · 8,7 GB" },
          },
          {
            label: { en: "Ingestion", id: "Ingest" },
            sub: {
              en: "Python · COPY stream",
              id: "Python · aliran COPY",
            },
          },
          {
            label: { en: "Staging", id: "Staging" },
            sub: {
              en: "SQL · clean + quarantine",
              id: "SQL · bersih + karantina",
            },
          },
          {
            label: { en: "Warehouse", id: "Warehouse" },
            sub: {
              en: "PostgreSQL · star schema",
              id: "PostgreSQL · star schema",
            },
          },
          {
            label: { en: "Marts", id: "Mart" },
            sub: { en: "analytics-ready", id: "siap dianalisis" },
          },
        ],
        layers: [
          {
            name: "raw",
            what: {
              en: "Verbatim. Values are never modified. LIST-partitioned by month. Python streams bytes straight into COPY FROM STDIN, computing the SHA-256 and an independent row count in the same pass.",
              id: "Apa adanya. Nilainya tidak pernah diubah. Dipartisi LIST per bulan. Python mengalirkan byte langsung ke COPY FROM STDIN, sambil menghitung SHA-256 dan jumlah baris independen dalam sekali lintasan.",
            },
            checks: {
              en: "13 checks — ingestion fidelity: did the database get what the file held?",
              id: "13 pemeriksaan — kesetiaan ingest: apakah basis data menerima persis isi berkasnya?",
            },
            tone: "muted",
          },
          {
            name: "staging",
            what: {
              en: "Clean rows and quarantined rows, split by a single SQL statement so the split is atomic.",
              id: "Baris bersih dan baris terkarantina, dipisahkan oleh satu pernyataan SQL sehingga pemisahannya atomik.",
            },
            checks: {
              en: "16 checks — the cleaned-data contract, including the central invariant raw = clean + rejected",
              id: "16 pemeriksaan — kontrak data bersih, termasuk invarian utama raw = clean + rejected",
            },
            tone: "secondary",
          },
          {
            name: "warehouse",
            what: {
              en: "Star schema: 1 fact table (115.2M-row capacity) and 6 dimensions, with 8 enforced foreign keys. RANGE-partitioned monthly on pickup_date so the planner prunes before reading a row.",
              id: "Star schema: 1 tabel fakta (kapasitas 115,2 juta baris) dan 6 dimensi, dengan 8 foreign key yang ditegakkan. Dipartisi RANGE bulanan pada pickup_date agar planner memangkas sebelum membaca satu baris pun.",
            },
            checks: {
              en: "19 checks — star-schema integrity: PK uniqueness, all FKs resolve, no NULL keys",
              id: "19 pemeriksaan — integritas star schema: keunikan PK, semua FK terselesaikan, tidak ada kunci NULL",
            },
            tone: "primary",
          },
          {
            name: "marts",
            what: {
              en: "4 pre-aggregated tables, refreshed for exactly the months a load actually touched.",
              id: "4 tabel pra-agregasi, disegarkan tepat untuk bulan-bulan yang benar-benar tersentuh suatu load.",
            },
            checks: {
              en: "6 checks — every aggregate still equals the fact table it came from",
              id: "6 pemeriksaan — setiap agregat masih sama dengan tabel fakta asalnya",
            },
            tone: "accent",
          },
        ],
        outro: {
          en: "The control plane (ingestion_log, pipeline_run, dq_result, pipeline_config) is written at every step, so lineage and quality history are queryable rather than buried in logs.",
          id: "Control plane (ingestion_log, pipeline_run, dq_result, pipeline_config) ditulis di setiap langkah, sehingga lineage dan riwayat kualitas bisa di-query, bukan terkubur di log.",
        },
      },
      process: [
        {
          step: { en: "Profile first", id: "Profil dulu" },
          detail: {
            en: "All 18 files scanned before any pipeline code existed, producing a column-by-column data dictionary and the list of defects the transformation would have to handle.",
            id: "Seluruh 18 berkas dipindai sebelum ada kode pipeline, menghasilkan kamus data per kolom dan daftar cacat yang harus ditangani transformasinya.",
          },
        },
        {
          step: { en: "Stream into COPY", id: "Alirkan ke COPY" },
          detail: {
            en: "One read of each file yields three results at once — data loaded, SHA-256 recorded, row count known. No row is constructed in Python, which is why a 655 MB file loads in 11 seconds.",
            id: "Sekali baca tiap berkas menghasilkan tiga hal sekaligus — data termuat, SHA-256 tercatat, jumlah baris diketahui. Tidak ada baris yang dibentuk di Python, itulah sebabnya berkas 655 MB termuat dalam 11 detik.",
          },
        },
        {
          step: { en: "Transform in SQL", id: "Transformasi di SQL" },
          detail: {
            en: "raw → staging in a single statement that writes clean rows and rejected rows simultaneously, so the row-count invariant can be asserted rather than hoped for.",
            id: "raw → staging dalam satu pernyataan yang menulis baris bersih dan baris ditolak secara bersamaan, sehingga invarian jumlah baris bisa ditegaskan, bukan sekadar diharapkan.",
          },
        },
        {
          step: { en: "Build the star schema", id: "Bangun star schema" },
          detail: {
            en: "6 dimensions rebuilt in parallel, then the fact table loaded per month with date and time keys computed arithmetically instead of joined — minutes instead of hours at this volume.",
            id: "6 dimensi dibangun ulang paralel, lalu tabel fakta dimuat per bulan dengan kunci tanggal dan waktu dihitung secara aritmetika, bukan di-join — hitungan menit, bukan jam, pada volume ini.",
          },
        },
        {
          step: { en: "Gate on quality", id: "Gerbang kualitas" },
          detail: {
            en: "54 checks run per period and write to meta.dq_result. Blocking failures stop the DAG; warnings profile the data instead of halting it.",
            id: "54 pemeriksaan berjalan per periode dan menulis ke meta.dq_result. Kegagalan yang memblokir menghentikan DAG; peringatan memprofil data alih-alih menghentikannya.",
          },
        },
        {
          step: { en: "Orchestrate", id: "Orkestrasi" },
          detail: {
            en: "An Airflow DAG runs one execution per data month, idempotent end to end — re-running a month produces identical row counts at every layer.",
            id: "DAG Airflow menjalankan satu eksekusi per bulan data, idempoten end-to-end — menjalankan ulang satu bulan menghasilkan jumlah baris identik di setiap lapisan.",
          },
        },
      ],
      highlights: [
        {
          title: {
            en: "The finding that changed the code",
            id: "Temuan yang mengubah kodenya",
          },
          body: {
            en: "Fare components should sum to total_amount, and often do not — because the $2.50 congestion surcharge is counted two different ways within a single month. For April 2020: 103,985 rows treat it as a separate component, 77,593 rows have it already inside extra, and 3,560 balance under neither reading. Testing one identity flags a third of all trips and is useless. The rule accepts either convention and flags only genuinely unexplained differences — 1.5% is a signal, 34% is noise.",
            id: "Komponen tarif seharusnya berjumlah total_amount, dan sering tidak — karena biaya kemacetan $2,50 dihitung dengan dua cara berbeda dalam satu bulan yang sama. Untuk April 2020: 103.985 baris memperlakukannya sebagai komponen terpisah, 77.593 baris sudah memasukkannya ke dalam extra, dan 3.560 tidak seimbang di bawah kedua pembacaan. Menguji satu identitas saja menandai sepertiga seluruh perjalanan dan tidak berguna. Aturannya menerima kedua konvensi dan hanya menandai selisih yang benar-benar tak terjelaskan — 1,5% itu sinyal, 34% itu derau.",
          },
        },
        {
          title: {
            en: "The raw layer is checked for fidelity, never for cleanliness",
            id: "Lapisan raw diperiksa kesetiaannya, bukan kebersihannya",
          },
          body: {
            en: "Raw data is supposed to contain negative fares and timestamps from 2088. A blocking fare >= 0 check at that layer would mean the pipeline refusing to ingest its own source. From staging onward the same rules become blocking — the transformation has had its chance to quarantine bad records, so a violation is now a bug in the pipeline rather than a feature of the source. A dedicated test enforces this layering so it cannot quietly erode.",
            id: "Data mentah memang semestinya memuat tarif negatif dan timestamp dari 2088. Pemeriksaan fare >= 0 yang memblokir di lapisan itu berarti pipeline menolak meng-ingest sumbernya sendiri. Mulai staging, aturan yang sama menjadi memblokir — transformasi sudah mendapat kesempatan mengarantina record buruk, jadi pelanggaran kini adalah bug di pipeline, bukan sifat sumbernya. Sebuah tes khusus menegakkan pelapisan ini agar tidak terkikis diam-diam.",
          },
        },
        {
          title: {
            en: "Ratios do not belong in a fact table",
            id: "Rasio tidak pantas ada di tabel fakta",
          },
          body: {
            en: "avg_speed_mph and tip_percentage were deliberately removed. A ratio stored on a fact row eventually gets AVG()'d, which weights a 0.3-mile crawl the same as a 30-mile airport run. Both are recoverable exactly from the additive measures that are stored.",
            id: "avg_speed_mph dan tip_percentage sengaja dihapus. Rasio yang disimpan di baris fakta cepat atau lambat akan di-AVG(), yang membobot perjalanan merayap 0,3 mil sama dengan perjalanan bandara 30 mil. Keduanya bisa dihitung ulang persis dari ukuran aditif yang disimpan.",
          },
        },
        {
          title: {
            en: "Cutting the fact table by 67%",
            id: "Memangkas tabel fakta 67%",
          },
          body: {
            en: "It started at 640 bytes/row and ended at 212. Changing trip_id from char(32) to uuid saved 17 bytes plus a third of every index containing it — an md5 digest is 128 bits, and char(32) was storing it as text. Dropping source_file saved 28 more; it was 1:1 with source_period and already in the ingestion log.",
            id: "Awalnya 640 byte/baris dan berakhir di 212. Mengubah trip_id dari char(32) menjadi uuid menghemat 17 byte plus sepertiga dari setiap indeks yang memuatnya — digest md5 itu 128 bit, dan char(32) menyimpannya sebagai teks. Menghapus source_file menghemat 28 byte lagi; isinya 1:1 dengan source_period dan sudah ada di log ingest.",
          },
        },
        {
          title: {
            en: "Every dimension has an Unknown member",
            id: "Setiap dimensi punya anggota Unknown",
          },
          body: {
            en: "About 0.5% of trips have blank vendor, payment and rate codes. With NULL foreign keys the obvious analyst query silently loses half a million trips to an inner join. With a −1 key they show up as “Not Provided”, which is the truth.",
            id: "Sekitar 0,5% perjalanan punya kode vendor, pembayaran dan tarif yang kosong. Dengan foreign key NULL, query analis yang paling wajar diam-diam kehilangan setengah juta perjalanan karena inner join. Dengan kunci −1, mereka muncul sebagai “Not Provided”, dan itulah kenyataannya.",
          },
        },
      ],
      result: {
        en: [
          "A reproducible pipeline that loads a month of taxi data into an analytics-ready star schema with every row accounted for — either in the fact table or in quarantine with its rejection reasons recorded.",
          "54/54 quality checks passing on every loaded period, with the verdicts stored in the database rather than scrolled past in a log.",
          "13 example analytical queries covering window functions, top-N-per-group, role-playing dimension joins, histogram bucketing and year-on-year self-joins — each demonstrating a different SQL technique against the finished warehouse.",
          "An optional dbt phase that rebuilds the mart layer independently and cross-checks it against the Python-built warehouse: two routes to the same numbers, so a mistake in either is visible.",
          "85 automated tests, including structural tests on the Airflow DAG and a regression test for a psycopg parameter-binding bug that a SQL comment had triggered.",
        ],
        id: [
          "Pipeline yang bisa direproduksi, memuat satu bulan data taksi ke star schema siap analisis dengan setiap baris terhitung — entah di tabel fakta atau di karantina beserta alasan penolakannya.",
          "54/54 pemeriksaan kualitas lolos di setiap periode yang dimuat, dengan putusannya tersimpan di basis data, bukan lewat begitu saja di log.",
          "13 contoh query analitik yang mencakup window function, top-N per grup, join dimensi role-playing, bucketing histogram, dan self-join tahun-ke-tahun — masing-masing memperagakan teknik SQL berbeda pada warehouse yang sudah jadi.",
          "Fase dbt opsional yang membangun ulang lapisan mart secara independen dan memeriksanya silang terhadap warehouse bikinan Python: dua jalur menuju angka yang sama, jadi kesalahan di salah satunya terlihat.",
          "85 tes otomatis, termasuk tes struktural pada DAG Airflow dan tes regresi untuk bug parameter binding psycopg yang dipicu oleh sebuah komentar SQL.",
        ],
      },
      verification: {
        en: "The pipeline is designed and partitioned for all 18 months (115,246,997 rows). What has been executed and verified end to end is 7 months — 2019-01 through 2019-06 plus 2020-04 — totalling 44,697,129 rows loaded, with 54/54 checks passing on each. The remaining 11 months are a matter of runtime, not of code.",
        id: "Pipeline ini dirancang dan dipartisi untuk seluruh 18 bulan (115.246.997 baris). Yang sudah dijalankan dan diverifikasi end-to-end adalah 7 bulan — 2019-01 sampai 2019-06 ditambah 2020-04 — totalnya 44.697.129 baris termuat, dengan 54/54 pemeriksaan lolos di masing-masing. Sebelas bulan sisanya soal waktu jalan, bukan soal kode.",
      },
      limitations: {
        en: [
          "No schema migrations. Objects are created with IF NOT EXISTS; a column type change means rebuilding the derived schemas. A real deployment would use Alembic or Flyway.",
          "Yellow taxi only. Green, FHV and high-volume FHV have different schemas and would need per-service ingestion contracts.",
          "Single-node PostgreSQL. Fine at this volume; at 10× the data, columnar storage would serve the analytical queries far better.",
          "Refunds are excluded from the warehouse, so SUM(total_amount) is gross revenue, not net.",
          "Cash tips are structurally missing — tip_amount is ~0 for every cash trip because cash tips never reach the meter. No pipeline can fix this; it is documented so the payment mart is not misread as a finding about passenger behaviour.",
          "The Docker stack was not executed on the build machine (Docker was unavailable), so the pipeline was verified against a local PostgreSQL 16 instead. The Compose file parses and every pinned version matches Airflow's own constraints file, but the containers themselves remain unrun.",
          "The Airflow DAG is validated by 13 structural tests rather than by an observed scheduler run.",
        ],
        id: [
          "Tidak ada migrasi skema. Objek dibuat dengan IF NOT EXISTS; mengubah tipe kolom berarti membangun ulang skema turunannya. Deployment sungguhan akan memakai Alembic atau Flyway.",
          "Hanya taksi kuning. Green, FHV dan FHV volume tinggi punya skema berbeda dan butuh kontrak ingest per layanan.",
          "PostgreSQL satu node. Memadai pada volume ini; pada data 10× lipat, penyimpanan kolumnar akan jauh lebih baik melayani query analitiknya.",
          "Pengembalian dana dikeluarkan dari warehouse, jadi SUM(total_amount) adalah pendapatan kotor, bukan bersih.",
          "Tip tunai hilang secara struktural — tip_amount ~0 untuk setiap perjalanan tunai karena tip tunai tidak pernah sampai ke argo. Tidak ada pipeline yang bisa memperbaiki ini; didokumentasikan agar mart pembayaran tidak disalahbaca sebagai temuan tentang perilaku penumpang.",
          "Stack Docker tidak dijalankan di mesin pembuatnya (Docker tidak tersedia), jadi pipeline diverifikasi terhadap PostgreSQL 16 lokal. Berkas Compose-nya terparse dan setiap versi yang dipatok cocok dengan berkas constraints Airflow sendiri, tapi kontainernya sendiri belum pernah dijalankan.",
          "DAG Airflow divalidasi oleh 13 tes struktural, bukan oleh run scheduler yang teramati.",
        ],
      },
    },
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "instacart-market-basket-analysis",
    quest: "02",
    title: "Instacart Customer & Market Basket Analysis",
    category: "Data Analytics",
    status: "completed",
    summary: {
      en: "End-to-end analysis of 3.4 million grocery orders from 206,209 customers — from data quality and integration through segmentation, reorder analysis and association rule mining, to a dashboard and six evidence-backed recommendations.",
      id: "Analisis end-to-end atas 3,4 juta pesanan bahan makanan dari 206.209 pelanggan — dari kualitas data dan integrasi, lewat segmentasi, analisis pembelian ulang dan penambangan aturan asosiasi, sampai dashboard dan enam rekomendasi berbasis bukti.",
    },
    focus: {
      en: ["EDA", "Segmentation", "Association Rules", "Dashboard"],
      id: ["EDA", "Segmentasi", "Aturan Asosiasi", "Dashboard"],
    },
    tech: [
      "Python",
      "pandas",
      "scikit-learn",
      "MLxtend",
      "Matplotlib",
      "Excel",
      "Power BI",
    ],
    repoUrl: null,
    demoUrl: null,
    cover: "/projects/instacart/03_reorder_headline.png",
    stats: [
      {
        label: { en: "Orders", id: "Pesanan" },
        value: "3.42M",
        hint: { en: "3,421,083 orders", id: "3.421.083 pesanan" },
      },
      { label: { en: "Customers", id: "Pelanggan" }, value: "206,209" },
      {
        label: { en: "Order lines", id: "Baris pesanan" },
        value: "33.8M",
        hint: { en: "product × order", id: "produk × pesanan" },
      },
      {
        label: { en: "Reorder share", id: "Porsi pembelian ulang" },
        value: "59.0%",
        hint: { en: "of all items sold", id: "dari seluruh item terjual" },
      },
      {
        label: { en: "Charts", id: "Grafik" },
        value: "23",
        hint: {
          en: "plus a 12-chart dashboard",
          id: "plus dashboard 12 grafik",
        },
      },
      {
        label: { en: "Rows deleted", id: "Baris dihapus" },
        value: "0",
        hint: { en: "nothing imputed either", id: "tidak ada yang diimputasi" },
      },
    ],
    detail: {
      overview: {
        en: [
          "Instacart is a grocery delivery platform. This project takes its public transaction data and answers one commercial question: how do customers behave, which products matter most to them, and which products should be marketed or recommended together?",
          "The headline: 59.0% of every item Instacart sells is something that customer has bought before. This is a replenishment business, not a discovery business — and the repeat habit is built between a customer's 2nd and 6th order.",
          "The analysis is deliberately written as business reasoning supported by data, not as a tour of techniques. Every chart answers a stated question, every insight cites its evidence, and every recommendation names both the finding it rests on and the risk of acting on it.",
        ],
        id: [
          "Instacart adalah platform pengantaran bahan makanan. Proyek ini mengambil data transaksi publiknya dan menjawab satu pertanyaan komersial: bagaimana perilaku pelanggan, produk mana yang paling penting bagi mereka, dan produk mana yang sebaiknya dipasarkan atau direkomendasikan bersama?",
          "Intinya: 59,0% dari setiap item yang dijual Instacart adalah barang yang pernah dibeli pelanggan itu sebelumnya. Ini bisnis pengisian ulang, bukan bisnis penemuan — dan kebiasaan membeli ulang terbentuk antara pesanan ke-2 dan ke-6.",
          "Analisisnya sengaja ditulis sebagai penalaran bisnis yang didukung data, bukan pameran teknik. Tiap grafik menjawab pertanyaan yang dinyatakan, tiap insight menyebut buktinya, dan tiap rekomendasi menyebut temuan yang mendasarinya sekaligus risiko kalau dijalankan.",
        ],
      },
      problem: {
        en: [
          "A grocery platform with no price, margin, date or demographic data still has to decide where to spend retention budget, what to recommend, and which products to protect on service levels.",
          "Those decisions are usually made from intuition about what customers “probably” do. The problem here is to replace that intuition with measured behaviour — and to be explicit about which questions this dataset genuinely cannot answer.",
        ],
        id: [
          "Platform bahan makanan tanpa data harga, margin, tanggal atau demografi tetap harus memutuskan ke mana anggaran retensi dibelanjakan, apa yang direkomendasikan, dan produk mana yang dijaga tingkat layanannya.",
          "Keputusan itu biasanya diambil dari intuisi tentang apa yang “mungkin” dilakukan pelanggan. Masalahnya di sini adalah mengganti intuisi itu dengan perilaku terukur — dan menyatakan dengan tegas pertanyaan mana yang sungguh tidak bisa dijawab dataset ini.",
        ],
      },
      dataset: {
        name: {
          en: "Instacart Online Grocery Shopping Dataset 2017",
          id: "Instacart Online Grocery Shopping Dataset 2017",
        },
        source: {
          en: "Instacart, released under a non-commercial research licence",
          id: "Instacart, dirilis di bawah lisensi riset non-komersial",
        },
        shape: [
          {
            label: { en: "orders", id: "orders" },
            value: "3,421,083",
            hint: { en: "one row per order", id: "satu baris per pesanan" },
          },
          {
            label: { en: "order_products (prior)", id: "order_products (prior)" },
            value: "32,434,489",
            hint: { en: "product × order", id: "produk × pesanan" },
          },
          {
            label: { en: "order_products (train)", id: "order_products (train)" },
            value: "1,384,617",
          },
          { label: { en: "products", id: "products" }, value: "49,688" },
          { label: { en: "aisles", id: "aisles" }, value: "134" },
          { label: { en: "departments", id: "departments" }, value: "21" },
          {
            label: { en: "Total size", id: "Ukuran total" },
            value: "~700 MB",
            hint: { en: "6 CSV files", id: "6 berkas CSV" },
          },
        ],
        notes: {
          en: [
            "There is no customer table. Every customer attribute — order count, basket size, reorder rate, interval, segment — is derived from order history. Demographic segmentation was never an option.",
            "75,000 orders have no contents (the withheld test split). They are excluded from item-level analysis and kept for order-timing analysis, so every table in the project names its base: 3,421,083 orders for timing, 3,346,083 for anything item-level.",
            "The 206,209 nulls in days_since_prior_order all sit on first orders and mean “no previous order exists”. They were flagged, never imputed.",
            "Day-of-week names are an assumption — the source does not document the 0–6 mapping — and no conclusion depends on them.",
          ],
          id: [
            "Tidak ada tabel pelanggan. Setiap atribut pelanggan — jumlah pesanan, ukuran keranjang, tingkat pembelian ulang, interval, segmen — diturunkan dari riwayat pesanan. Segmentasi demografis tidak pernah jadi pilihan.",
            "75.000 pesanan tidak punya isi (bagian test yang ditahan). Mereka dikeluarkan dari analisis tingkat item dan dipertahankan untuk analisis waktu pemesanan, jadi setiap tabel di proyek ini menyebut basisnya: 3.421.083 pesanan untuk waktu, 3.346.083 untuk apa pun di tingkat item.",
            "206.209 nilai null di days_since_prior_order semuanya ada di pesanan pertama dan berarti “tidak ada pesanan sebelumnya”. Mereka ditandai, tidak pernah diimputasi.",
            "Nama hari adalah asumsi — sumbernya tidak mendokumentasikan pemetaan 0–6 — dan tidak ada kesimpulan yang bergantung padanya.",
          ],
        },
      },
      approach: {
        en: [
          "Twelve phases: data understanding, cleaning, integration, KPIs, customer analysis, time analysis, product and category analysis, reorder analysis, market basket mining, then insight and recommendation.",
          "Nothing was deleted and nothing was imputed. The dataset has zero orphan foreign keys, zero duplicate rows and zero invalid codes — what it needed was interpretation, not surgery. Every cleaning decision is recorded in an audit log.",
          "Every join was verified by row count, and aggregation happened before joining wherever possible to keep a 33.8M-row fact table tractable in memory.",
          "A verification script re-checks all 40 headline figures quoted in the report and README against the data, and exits non-zero on drift.",
        ],
        id: [
          "Dua belas fase: pemahaman data, pembersihan, integrasi, KPI, analisis pelanggan, analisis waktu, analisis produk dan kategori, analisis pembelian ulang, penambangan market basket, lalu insight dan rekomendasi.",
          "Tidak ada yang dihapus dan tidak ada yang diimputasi. Dataset ini punya nol foreign key yatim, nol baris duplikat dan nol kode tidak valid — yang dibutuhkannya adalah penafsiran, bukan operasi. Setiap keputusan pembersihan tercatat di log audit.",
          "Setiap join diverifikasi lewat jumlah baris, dan agregasi dilakukan sebelum join bila memungkinkan agar tabel fakta 33,8 juta baris tetap bisa ditangani di memori.",
          "Skrip verifikasi memeriksa ulang seluruh 40 angka utama yang dikutip di laporan dan README terhadap datanya, dan keluar dengan kode non-nol bila ada penyimpangan.",
        ],
      },
      analysis: [
        {
          heading: {
            en: "Reorders dominate, and the habit forms early",
            id: "Pembelian ulang mendominasi, dan kebiasaannya terbentuk awal",
          },
          body: {
            en: "59.0% of all items sold are reorders — 62.9% excluding first orders, which structurally cannot contain one. The rate climbs from 27.2% at order 2 to 54.1% by order 6, then flattens, reaching 81.9% by order 50. Retention spend after order 10 is largely redundant.",
            id: "59,0% dari seluruh item terjual adalah pembelian ulang — 62,9% bila pesanan pertama dikecualikan, yang secara struktur tidak mungkin memuatnya. Angkanya naik dari 27,2% di pesanan ke-2 menjadi 54,1% di pesanan ke-6, lalu mendatar, mencapai 81,9% di pesanan ke-50. Belanja retensi setelah pesanan ke-10 sebagian besar mubazir.",
          },
          evidence: {
            en: "Reorder rate by order number, all orders with contents (3,346,083)",
            id: "Tingkat pembelian ulang per nomor pesanan, seluruh pesanan berisi (3.346.083)",
          },
        },
        {
          heading: {
            en: "Frequency and basket size are independent levers",
            id: "Frekuensi dan ukuran keranjang adalah dua tuas terpisah",
          },
          body: {
            en: "Order frequency and basket size are essentially uncorrelated (ρ = 0.06). What actually tracks loyalty is reorder rate (ρ = 0.73) and inter-order interval (ρ = −0.60). Two customers with the same order count can differ by 7.0 versus 19.4 items per basket — and need entirely different interventions.",
            id: "Frekuensi pesanan dan ukuran keranjang praktis tidak berkorelasi (ρ = 0,06). Yang benar-benar mengikuti loyalitas adalah tingkat pembelian ulang (ρ = 0,73) dan jarak antar pesanan (ρ = −0,60). Dua pelanggan dengan jumlah pesanan sama bisa berbeda 7,0 lawan 19,4 item per keranjang — dan butuh intervensi yang sama sekali berbeda.",
          },
          evidence: {
            en: "Pearson correlation across 206,209 derived customer profiles",
            id: "Korelasi Pearson atas 206.209 profil pelanggan turunan",
          },
        },
        {
          heading: {
            en: "Customers run on a weekly clock",
            id: "Pelanggan berjalan pada jam mingguan",
          },
          body: {
            en: "50.9% of repeat orders land within 7 days, with a visible spike at exactly day 7. Weekend days 0–1 carry 34.7% of the week's orders, but the two peaks are differently shaped: 13:00–15:00 on one, 09:00–11:00 on the other.",
            id: "50,9% pesanan berulang jatuh dalam 7 hari, dengan lonjakan jelas tepat di hari ke-7. Akhir pekan hari 0–1 memikul 34,7% pesanan sepekan, tapi kedua puncaknya berbeda bentuk: 13.00–15.00 di satu hari, 09.00–11.00 di hari lainnya.",
          },
          evidence: {
            en: "Inter-order interval distribution and day × hour heatmap, all 3,421,083 orders",
            id: "Distribusi jarak antar pesanan dan heatmap hari × jam, seluruh 3.421.083 pesanan",
          },
        },
        {
          heading: {
            en: "Produce drives traffic; dairy drives return",
            id: "Sayur-buah menarik kunjungan; susu menarik kembalinya",
          },
          body: {
            en: "Produce accounts for 29.2% of units and appears in 74.9% of baskets. Dairy has the highest reorder rate of any department at 67.0%. They are two different jobs and should not share a strategy.",
            id: "Sayur-buah menyumbang 29,2% unit dan muncul di 74,9% keranjang. Produk susu punya tingkat pembelian ulang tertinggi di antara semua departemen, 67,0%. Keduanya dua tugas berbeda dan tidak seharusnya memakai strategi yang sama.",
          },
          evidence: {
            en: "Department-level volume and reorder rate, 33.8M order lines",
            id: "Volume dan tingkat pembelian ulang tingkat departemen, 33,8 juta baris pesanan",
          },
        },
        {
          heading: {
            en: "Reorder rate is a cadence meter, not a satisfaction score",
            id: "Tingkat pembelian ulang itu pengukur irama, bukan skor kepuasan",
          },
          body: {
            en: "Aisle alone explains 56.3% of the variance in reorder rate. Spices at 15.3% is not a failing product — nobody rebuys cumin weekly. Any reorder-rate ranking has to be benchmarked within category, never against the 59% average, and always with a minimum-volume threshold attached.",
            id: "Lorong rak saja menjelaskan 56,3% variasi tingkat pembelian ulang. Rempah di 15,3% bukan produk gagal — tidak ada yang membeli jintan tiap pekan. Peringkat tingkat pembelian ulang apa pun harus dibandingkan di dalam kategorinya, tidak pernah terhadap rata-rata 59%, dan selalu disertai ambang volume minimum.",
          },
          evidence: {
            en: "Variance decomposition of reorder rate by aisle (134 aisles)",
            id: "Dekomposisi variansi tingkat pembelian ulang per lorong (134 lorong)",
          },
        },
        {
          heading: {
            en: "The real cross-sell signals are culinary, not popular",
            id: "Sinyal cross-sell sesungguhnya bersifat kuliner, bukan populer",
          },
          body: {
            en: "FP-Growth surfaces garlic↔onion at lift 5.64, pasta↔pasta sauce at 4.41, lime↔lemon at 4.08. Meanwhile bananas appear in 14.7% of baskets and predict nothing — yet they are the consequent of 21.5% of all mined rules. A popularity-ranked recommender would mostly recommend bananas.",
            id: "FP-Growth memunculkan bawang putih↔bawang bombai dengan lift 5,64, pasta↔saus pasta 4,41, jeruk nipis↔lemon 4,08. Sementara pisang muncul di 14,7% keranjang dan tidak memprediksi apa pun — padahal ia menjadi konsekuen dari 21,5% seluruh aturan yang ditambang. Perekomendasi berbasis popularitas akan kebanyakan merekomendasikan pisang.",
          },
          evidence: {
            en: "FP-Growth association rules at product and aisle level, justified thresholds",
            id: "Aturan asosiasi FP-Growth di tingkat produk dan lorong, dengan ambang yang dijustifikasi",
          },
        },
        {
          heading: {
            en: "Small baskets are top-ups, not a problem",
            id: "Keranjang kecil itu pelengkap, bukan masalah",
          },
          body: {
            en: "17.1% of orders hold 3 items or fewer but only 3.5% of units — and they have the highest reorder rate of any basket size at 65.0%. These are forgotten-essentials top-ups. Suppressing them would suppress the most habitual behaviour on the platform.",
            id: "17,1% pesanan berisi 3 item atau kurang tapi hanya 3,5% unit — dan mereka punya tingkat pembelian ulang tertinggi di antara semua ukuran keranjang, 65,0%. Ini pembelian pelengkap untuk kebutuhan yang terlupa. Menekannya berarti menekan perilaku paling kebiasaan di platform ini.",
          },
          evidence: {
            en: "Basket size distribution cross-tabbed with reorder rate",
            id: "Distribusi ukuran keranjang disilangkan dengan tingkat pembelian ulang",
          },
        },
        {
          heading: {
            en: "Four segments, presented as a judgement",
            id: "Empat segmen, disajikan sebagai pertimbangan",
          },
          body: {
            en: "K-Means on three behavioural dimensions. Silhouette peaks at k = 2 (0.365) and never exceeds 0.37 — this customer base is a continuum, not four natural clusters. k = 4 was chosen because it separates two independent growth levers into actionable groups, and that reasoning is stated rather than hidden. Loyal Regulars are 21.6% of customers but 53.4% of items; Occasional / At-Risk are 31.9% of customers and 8.9% of items.",
            id: "K-Means pada tiga dimensi perilaku. Silhouette memuncak di k = 2 (0,365) dan tidak pernah melewati 0,37 — basis pelanggan ini sebuah kontinum, bukan empat klaster alami. k = 4 dipilih karena memisahkan dua tuas pertumbuhan independen menjadi kelompok yang bisa ditindaklanjuti, dan alasan itu dinyatakan, bukan disembunyikan. Loyal Regulars adalah 21,6% pelanggan tapi 53,4% item; Occasional / At-Risk adalah 31,9% pelanggan dan 8,9% item.",
          },
          evidence: {
            en: "K-Means with StandardScaler, silhouette scan k = 2–8",
            id: "K-Means dengan StandardScaler, pemindaian silhouette k = 2–8",
          },
        },
      ],
      process: [
        {
          step: { en: "Data understanding", id: "Pemahaman data" },
          detail: {
            en: "Data dictionary, data model, key and referential-integrity checks, and a quality report — before any analysis.",
            id: "Kamus data, model data, pemeriksaan kunci dan integritas referensial, serta laporan kualitas — sebelum analisis apa pun.",
          },
        },
        {
          step: { en: "Cleaning", id: "Pembersihan" },
          detail: {
            en: "Four reasoned decisions, zero rows deleted, zero values imputed. Every decision written to an audit log.",
            id: "Empat keputusan beralasan, nol baris dihapus, nol nilai diimputasi. Setiap keputusan ditulis ke log audit.",
          },
        },
        {
          step: { en: "Integration", id: "Integrasi" },
          detail: {
            en: "Customer → Order → Order Product → Product → Aisle → Department, aggregating before joining and verifying row counts on every join.",
            id: "Customer → Order → Order Product → Product → Aisle → Department, mengagregasi sebelum join dan memverifikasi jumlah baris di setiap join.",
          },
        },
        {
          step: { en: "KPIs and time analysis", id: "KPI dan analisis waktu" },
          detail: {
            en: "Overall, product, department and aisle KPIs; hour, day-of-week, day × hour and inter-order interval profiles.",
            id: "KPI keseluruhan, produk, departemen dan lorong; profil jam, hari, hari × jam dan jarak antar pesanan.",
          },
        },
        {
          step: { en: "Customer analysis", id: "Analisis pelanggan" },
          detail: {
            en: "Frequency, basket size and K-Means segmentation on three behavioural dimensions, with the silhouette scan reported rather than hidden.",
            id: "Frekuensi, ukuran keranjang dan segmentasi K-Means pada tiga dimensi perilaku, dengan pemindaian silhouette dilaporkan, bukan disembunyikan.",
          },
        },
        {
          step: {
            en: "Product and reorder analysis",
            id: "Analisis produk dan pembelian ulang",
          },
          detail: {
            en: "Volume × loyalty quadrants, department and aisle performance, reorder behaviour by order number, tenure, cart position and category, plus variance decomposition.",
            id: "Kuadran volume × loyalitas, kinerja departemen dan lorong, perilaku pembelian ulang per nomor pesanan, lama berlangganan, posisi di keranjang dan kategori, plus dekomposisi variansi.",
          },
        },
        {
          step: { en: "Market basket mining", id: "Penambangan market basket" },
          detail: {
            en: "FP-Growth at both product and aisle level over a sparse 33.8M-line matrix, with thresholds justified rather than defaulted.",
            id: "FP-Growth di tingkat produk dan lorong atas matriks jarang 33,8 juta baris, dengan ambang yang dijustifikasi, bukan sekadar nilai bawaan.",
          },
        },
        {
          step: { en: "Reporting", id: "Pelaporan" },
          detail: {
            en: "A bilingual written report (English and Indonesian), a 12-chart Excel dashboard with seven filterable explorer tabs, and a Power BI dimensional model.",
            id: "Laporan tertulis dwibahasa (Inggris dan Indonesia), dashboard Excel 12 grafik dengan tujuh tab penjelajah yang bisa disaring, dan model dimensional Power BI.",
          },
        },
      ],
      images: [
        {
          src: "/projects/instacart/03_reorder_headline.png",
          alt: {
            en: "Chart showing 59.0% of all items sold are reorders, and the reorder rate climbing from 27.2% at order 2 to 54.1% at order 6 before flattening",
            id: "Grafik yang menunjukkan 59,0% seluruh item terjual adalah pembelian ulang, dan tingkatnya naik dari 27,2% di pesanan ke-2 menjadi 54,1% di pesanan ke-6 sebelum mendatar",
          },
          caption: {
            en: "The headline and the habit curve: 59.0% of items are reorders, and the rate is won between orders 2 and 6.",
            id: "Angka utama dan kurva kebiasaan: 59,0% item adalah pembelian ulang, dan angkanya direbut antara pesanan ke-2 dan ke-6.",
          },
          width: 1600,
          height: 435,
        },
        {
          src: "/projects/instacart/04_segment_profiles.png",
          alt: {
            en: "Profiles of four customer segments across order count, basket size, reorder rate and inter-order interval",
            id: "Profil empat segmen pelanggan berdasarkan jumlah pesanan, ukuran keranjang, tingkat pembelian ulang dan jarak antar pesanan",
          },
          caption: {
            en: "Four segments. Loyal Regulars are 21.6% of customers and 53.4% of items sold.",
            id: "Empat segmen. Loyal Regulars adalah 21,6% pelanggan dan 53,4% item terjual.",
          },
          width: 1600,
          height: 433,
        },
        {
          src: "/projects/instacart/03_dow_hour_heatmap.png",
          alt: {
            en: "Heatmap of order volume by day of week and hour of day, showing two differently shaped weekend peaks",
            id: "Heatmap volume pesanan per hari dan jam, memperlihatkan dua puncak akhir pekan dengan bentuk berbeda",
          },
          caption: {
            en: "Days 0–1 carry 34.7% of the week, but peak at different hours — so one campaign time does not fit both.",
            id: "Hari 0–1 memikul 34,7% pekan, tapi memuncak di jam berbeda — jadi satu waktu kampanye tidak cocok untuk keduanya.",
          },
          width: 1600,
          height: 539,
        },
        {
          src: "/projects/instacart/05_volume_vs_reorder.png",
          alt: {
            en: "Scatter plot of product volume against reorder rate, dividing products into four quadrants",
            id: "Diagram sebar volume produk terhadap tingkat pembelian ulang, membagi produk ke empat kuadran",
          },
          caption: {
            en: "Volume × loyalty quadrants. 2,537 core staples account for 67.5% of all units sold.",
            id: "Kuadran volume × loyalitas. 2.537 kebutuhan pokok menyumbang 67,5% seluruh unit terjual.",
          },
          width: 1600,
          height: 982,
        },
        {
          src: "/projects/instacart/06_pair_lift_heatmap.png",
          alt: {
            en: "Heatmap of association rule lift between product pairs, with culinary pairs scoring highest",
            id: "Heatmap lift aturan asosiasi antar pasangan produk, dengan pasangan kuliner mencetak nilai tertinggi",
          },
          caption: {
            en: "Lift between pairs. The strong signals are recipe-shaped — garlic↔onion 5.64, pasta↔sauce 4.41.",
            id: "Lift antar pasangan. Sinyal kuatnya berbentuk resep — bawang putih↔bawang bombai 5,64, pasta↔saus 4,41.",
          },
          width: 1600,
          height: 1501,
        },
      ],
      result: {
        en: [
          "Six recommendations, each naming the finding it rests on, how to measure it, and the risk of acting on it: replenishment subscriptions seeded from the milk & yogurt cluster; retention spend concentrated on orders 2–6; the two middle segments treated as two different problems; basket-completion prompts built on recipe pairs rather than popularity; service levels set by quadrant; and campaigns timed to the two differently-shaped weekend peaks.",
          "A one-page Excel dashboard with 12 charts and written insight callouts, backed by seven filterable explorer tabs and a data-index tab documenting measurement bases and known limits.",
          "A Power BI-ready dimensional model (dim_* / fact_* CSVs) of the same data.",
          "A full written report in English and Indonesian, 23 charts, 23 supporting tables, and a cleaning audit trail.",
          "A verification script that re-checks all 40 headline figures against the data and fails on drift — so the written documents cannot silently fall out of sync with the analysis.",
        ],
        id: [
          "Enam rekomendasi, masing-masing menyebut temuan yang mendasarinya, cara mengukurnya, dan risiko kalau dijalankan: langganan pengisian ulang yang disemai dari klaster susu & yoghurt; belanja retensi dipusatkan di pesanan 2–6; dua segmen tengah diperlakukan sebagai dua masalah berbeda; pengingat pelengkap keranjang dibangun dari pasangan resep, bukan popularitas; tingkat layanan ditetapkan per kuadran; dan kampanye diwaktukan pada dua puncak akhir pekan yang berbeda bentuk.",
          "Dashboard Excel satu halaman dengan 12 grafik dan kotak insight tertulis, didukung tujuh tab penjelajah yang bisa disaring dan tab indeks data yang mendokumentasikan basis pengukuran dan batasan yang diketahui.",
          "Model dimensional siap Power BI (CSV dim_* / fact_*) atas data yang sama.",
          "Laporan tertulis lengkap dalam bahasa Inggris dan Indonesia, 23 grafik, 23 tabel pendukung, dan jejak audit pembersihan.",
          "Skrip verifikasi yang memeriksa ulang seluruh 40 angka utama terhadap datanya dan gagal bila ada penyimpangan — sehingga dokumen tertulisnya tidak bisa diam-diam melenceng dari analisisnya.",
        ],
      },
      limitations: {
        en: [
          "There are no prices, margins, dates or demographics in this dataset. No revenue figure appears anywhere in the project, seasonality cannot be measured, and every bundle recommendation is explicitly conditional on a margin check this data cannot perform.",
          "The segmentation is a judgement call, not a discovery — silhouette never exceeds 0.37, so the customer base is a continuum that has been cut into four actionable groups.",
          "Day-of-week labels are assumed; the source does not document the 0–6 mapping.",
          "75,000 orders have withheld contents and are excluded from every item-level figure.",
        ],
        id: [
          "Tidak ada harga, margin, tanggal atau demografi di dataset ini. Tidak ada angka pendapatan di mana pun dalam proyek ini, musiman tidak bisa diukur, dan setiap rekomendasi paket secara eksplisit bersyarat pada pemeriksaan margin yang tidak bisa dilakukan data ini.",
          "Segmentasinya adalah pertimbangan, bukan penemuan — silhouette tidak pernah melewati 0,37, jadi basis pelanggannya sebuah kontinum yang dipotong menjadi empat kelompok yang bisa ditindaklanjuti.",
          "Label hari diasumsikan; sumbernya tidak mendokumentasikan pemetaan 0–6.",
          "75.000 pesanan isinya ditahan dan dikeluarkan dari setiap angka tingkat item.",
        ],
      },
    },
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "lstm-stock-prediction",
    quest: "03",
    title: "LSTM Stock Price Prediction",
    category: "Data Science",
    status: "in-progress",
    summary: {
      en: "A deep-learning approach to time-series forecasting on equity price data, using LSTM networks with walk-forward validation.",
      id: "Pendekatan deep learning untuk peramalan time-series pada data harga saham, memakai jaringan LSTM dengan validasi walk-forward.",
    },
    focus: {
      en: ["Deep Learning", "Time Series", "Forecasting"],
      id: ["Deep Learning", "Time Series", "Peramalan"],
    },
    tech: [
      "Python",
      "TensorFlow / Keras",
      "pandas",
      "NumPy",
      "scikit-learn",
      "Matplotlib",
    ],
    repoUrl: null,
    demoUrl: null,
    cover: null,
    stats: [
      { label: { en: "Status", id: "Status" }, value: "In progress" },
    ],
    detail: {
      // TODO(baskara): fill this in from the repo on your other laptop.
      overview: {
        en: [
          "This quest is still in progress. The write-up below will be replaced with the real dataset, approach, model architecture and evaluation once the project is finished.",
        ],
        id: [
          "Quest ini masih berjalan. Tulisan di bawah akan diganti dengan dataset, pendekatan, arsitektur model dan evaluasi yang sebenarnya setelah proyeknya selesai.",
        ],
      },
      problem: {
        en: [
          "Equity price series are noisy, non-stationary and close to a random walk at short horizons — which makes them an honest test of whether a sequence model is learning structure or memorising noise.",
        ],
        id: [
          "Deret harga saham itu berisik, non-stasioner dan mendekati random walk pada horizon pendek — yang membuatnya ujian jujur apakah model sekuensial sedang mempelajari struktur atau menghafal derau.",
        ],
      },
      dataset: {
        name: { en: "To be documented", id: "Belum didokumentasikan" },
        source: { en: "To be documented", id: "Belum didokumentasikan" },
        shape: [],
        notes: { en: [], id: [] },
      },
      approach: {
        en: [
          "Planned: windowed sequence framing, walk-forward (not random) validation so no future information leaks backwards, and a naive persistence baseline reported alongside the model — because a forecast that cannot beat “tomorrow equals today” is not a forecast.",
        ],
        id: [
          "Rencana: pembingkaian sekuens berjendela, validasi walk-forward (bukan acak) agar informasi masa depan tidak bocor ke belakang, dan baseline persistensi naif dilaporkan berdampingan dengan modelnya — karena ramalan yang tidak bisa mengalahkan “besok sama dengan hari ini” bukanlah ramalan.",
        ],
      },
      process: [],
      result: { en: [], id: [] },
    },
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "festafestum",
    quest: "04",
    title: "FestaFestum",
    category: "Data Science",
    status: "in-progress",
    summary: {
      en: "Data Scientist role on the FestaFestum project — write-up in progress.",
      id: "Peran Data Scientist di proyek FestaFestum — tulisannya sedang disusun.",
    },
    focus: {
      en: ["Data Science", "Team Project"],
      id: ["Data Science", "Proyek Tim"],
    },
    tech: ["Python", "pandas", "scikit-learn"],
    repoUrl: null,
    demoUrl: null,
    cover: null,
    stats: [{ label: { en: "Role", id: "Peran" }, value: "Data Scientist" }],
    detail: {
      // TODO(baskara): fill in duration, the team, the problem, your specific
      // contribution and the outcome. This is the one a recruiter will ask about.
      overview: {
        en: [
          "This write-up is still in progress. It will cover the problem FestaFestum set out to solve, the data available, the modelling work I owned as Data Scientist, and what the project delivered.",
        ],
        id: [
          "Tulisan ini masih disusun. Nantinya akan mencakup masalah yang ingin dipecahkan FestaFestum, data yang tersedia, pekerjaan pemodelan yang saya pegang sebagai Data Scientist, dan apa yang dihasilkan proyeknya.",
        ],
      },
      problem: { en: [], id: [] },
      dataset: {
        name: { en: "To be documented", id: "Belum didokumentasikan" },
        source: { en: "To be documented", id: "Belum didokumentasikan" },
        shape: [],
        notes: { en: [], id: [] },
      },
      approach: { en: [], id: [] },
      process: [],
      result: { en: [], id: [] },
    },
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Data Engineering",
  "Data Analytics",
  "Data Science",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const completedProjects = projects.filter((p) => p.status === "completed");
