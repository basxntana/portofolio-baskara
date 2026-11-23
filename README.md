# Baskara Kresna — Data Professional Portfolio

An 8-bit / pixel-art portfolio for a data professional working across
**Data Engineering**, **Data Analytics** and **Data Science** — presented as one
workflow rather than three separate job titles.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
Motion and Lucide. Deploys to Vercel.

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

---

## Where the content lives

**All copy and data is in `src/data/` — you should never need to touch a
component to change what the site says.**

| File | What it holds |
|---|---|
| `src/data/ui.ts` | Every interface string, in both languages |
| `src/data/profile.ts` | Name, title, intro, about paragraphs, contact links, education, site URL |
| `src/data/skills.ts` | Player stats — skills, levels (1–10), tabs; XP is derived from the levels |
| `src/data/classes.ts` | The three data classes and the "one chain" story |
| `src/data/projects.ts` | The quest log: cards **and** the full project detail pages |
| `src/data/experience.ts` | Quest history |
| `src/data/achievements.ts` | Achievements, locked and unlocked |

### Things still to fill in

Search the codebase for `TODO(baskara)` — each one marks something only you can
supply:

- `profile.ts` — confirm `startYear` / `expectedGraduation`; set `gpa` if you
  want it shown; set `resume` to a path in `/public` to show a resume button.
- `skills.ts` — confirm the levels.
- `experience.ts` — FestaFestum: real dates, scope, what you owned, the outcome.
- `projects.ts` — the two Data Science quests (`lstm-stock-prediction`,
  `festafestum`) are stubs marked `in-progress`.

### Linking the repositories

Every project has `repoUrl: null`, which renders a disabled **REPO PRIVATE**
chip instead of a dead link. Set it to a GitHub URL once a repo is public and
the button turns into a real link automatically.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              fonts, metadata, Open Graph
│   ├── page.tsx                the single-page world + JSON-LD
│   ├── globals.css             design tokens, pixel utilities, animations
│   ├── icon.svg                pixel favicon
│   ├── opengraph-image.tsx     generated social card
│   ├── not-found.tsx           8-bit 404
│   ├── robots.ts / sitemap.ts
│   └── projects/[slug]/        project detail pages
├── components/
│   ├── StartScreen.tsx         title card: scene, arrow-key menu, iris wipe
│   ├── Navbar.tsx              sticky game menu + mobile drawer + theme toggle
│   ├── ThemeToggle.tsx         day / night
│   ├── ProjectTabs.tsx         the tabbed project write-up
│   ├── WorldProvider.tsx       shares the quest-log filter with the map + cards
│   ├── sections/               Hero, WorldMap, About, Classes, Projects, …
│   ├── pixel/                  sprites, generated scenes, renderers
│   └── ui/                     PixelPanel, PixelButton, StatBar, Typewriter, …
├── data/                       ← all content
└── lib/                        i18n, nav config, hooks, stores, icon map, easings
scripts/
├── build-sprites.py            authors + validates the large sprite grids
└── build-art.js                re-cuts the loading sky and the Data World islands
```

### Pixel art

There are two kinds, and both render as plain SVG rectangles with
`shape-rendering: crispEdges` — no image files, no canvas.

**Sprites** are character grids: one character per pixel, `.` for transparent.
Small ones (the terminal, the pipe) live in `src/components/pixel/sprites.ts`.
The larger structures (the university, the office block) are in `characters.ts`,
which is **generated**:

```bash
python3 scripts/build-sprites.py
```

That script authors each row as `(char, count)` segments so a row's width is
computed rather than counted by hand, and asserts every row matches before
writing the file. Edit the segment lists there and re-run it — do not hand-edit
`characters.ts`. `PixelSprite` additionally throws in development if any grid is
ragged, or if a grid uses a character with no `PALETTE` entry.

**Scenes** are generated geometry in `src/components/pixel/scenes.ts`: the city
skyline, the floating islands and the clouds are built by code from a seeded
PRNG (`rng.ts`), so they render identically on the server and the client while
staying varied. `PixelScene` renders the resulting rectangles.

Every colour in both is a CSS custom property (`--px-*`), never a hex literal,
which is what lets the whole world switch between night and day.

### Day / night

The toggle in the navbar flips `data-theme` on `<html>` between unset (night,
the default) and `day`. Both the UI tokens (`--color-*`) and the pixel-world
palette (`--px-*`) are redefined under `:root[data-theme="day"]` in
`globals.css`, so every Tailwind utility and every sprite follows along with no
per-component work.

An inline script in `layout.tsx` applies the saved choice before first paint, so
there is no flash — which is why `<html>` carries `suppressHydrationWarning`.

---

---

## The asset pack

`assets/` holds the supplied 8-bit asset pack. What is wired in, and from where:

| From the pack | Used for |
|---|---|
| `styles/palette.css` | `--panel` and `--border` are the source of `--color-surface` / `--color-line`; `--font-pixel` is why the display face is **Pixelify Sans** |
| `styles/pixel-ui.css` | The whole UI edge style: square corners, 2px solid border, `4px 4px 0` hard shadow, press-into-the-shadow on hover (`pixel-shadow` / `pixel-press` in `globals.css`) |
| `icons/*.svg` | Class cards, contact and hero buttons, technology chips, architecture flow — copied to `public/assets/icons`, rendered by `AssetIcon` |
| `images/avatar.png` | The portrait in the About player card — copied to `public/assets/images` |
| `images/Malam Cyberpunk di Tepi Kota.png` | The night scene behind the start screen and the hero |
| `images/Kota Pixel Cerah di Tepi Sungai.png` | The **same scene at midday**, used in light mode |
| `reference/portfolio-mockup.png` | Visual reference only |

**Not used as-is:** `images/hero-city.png`, `data-world.png`, `contact-bg.png`,
`nyc-taxi.png`, `instacart.png` and `lstm.png` are crops of the mockup that have
UI baked into them — navbars, buttons, body copy, even section numbers. Dropping
them in as backgrounds would print a second navbar under the real one and set
text on top of text, and at 500px wide they would be blurry across a full-width
section. The pack's own README says the same thing: *"the image crops are visual
reference assets… for production, replace them with final-purpose pixel art."*

The two riverside scenes are the exception: clean illustrations with no UI baked
in, used directly and full-bleed behind both the start screen and the hero. They
are the **same composition at two times of day**, so the theme toggle genuinely
moves the world from night to midday rather than just dimming it — the character
does not shift a pixel.

They are converted to WebP on the way into `public/assets/images`
(1.5 MB / 1.9 MB PNG → 96 KB / 198 KB), and the active one is chosen by CSS:

```css
:root                   { --scene-url: url("…/scene-night.webp"); }
:root[data-theme="day"] { --scene-url: url("…/scene-day.webp"); }
.scene-art              { background-image: var(--scene-url); }
```

A background rather than `next/image` on purpose — a browser only fetches the
background it actually paints, so the inactive scene never downloads. The theme
bootstrap script preloads the right one before CSS is even parsed. The character
sits right of centre, which is why the background is anchored at `78% bottom`:
the crop keeps them in frame at every width while the text column sits over the
empty sky and water on the left, carried by a left-weighted scrim on wide
screens and a flat wash on narrow ones.

The pack's icons hardcode the night palette, so daylight deepens them
(`.asset-icon`) and inverts the near-white GitHub mark (`.asset-icon-mono`),
which would otherwise vanish into a white button.

### The Data World and loading-screen packs

Two packs ship a day and a night version of everything:
`assets/data-world-pixel-assets/data-world-separated-assets/` for the world map
and `assets/loading-screen-assets-dark-light/` for the language-switch loading
screen. Neither pack's pre-separated folder is usable as shipped. The crops
still carry the sheet's own captions ("ISLAND LABEL FRAMES (DARK)"), the
islands come with the sheet's fake checkerboard in the colour channels, and
the sheet's alpha puts that checkerboard at ~95 rather than 0 with a soft glow
ramping into the artwork — which composites as a grey halo. So the art is
re-cut from the two master sheets:

```bash
node scripts/build-art.js
```

Islands are separated by flooding inward from the panel edge rather than by
keying on colour, which would punch holes in the white buildings and the pale
bridge decks. Two rules take turns — the near-black frame, then the grey
checkerboard — because a single rule wide enough for the glow-tinted
checkerboard also matches the islands' own black outline, and the fill would
then run that outline and hollow the island out. Alpha is finally taken as a
hard mask: it is pixel art, with no soft edges to preserve.

Output lands in `public/assets/images/` (two skies, two backdrops, three
islands per theme, plus the bridged row, ~340 KB of WebP). Nothing with text
painted on it is exported — the label plates, the loading box and the tip boxes
are all rebuilt as HTML, because the pack paints them in English and this site
is bilingual. The backdrops are CSS backgrounds driven by `--world-url` and
`--loading-url`; the islands are `next/image`, with both prints in the markup
and `data-hour` letting CSS pick one off `data-theme` — the theme is applied
before React hydrates, so reading it in JavaScript would show a daylight
visitor one frame of the night world.

The only scenery still **generated** (`src/components/pixel/scenes.ts`) is the
skyline behind the contact panel.

---

## Two languages

The site ships in English and Indonesian at `/en` and `/id`. The language lives
in the URL, not in client state, so each one is **server-rendered and statically
prerendered** — both are indexable, and reading the page costs no JavaScript.

- `src/app/[locale]/layout.tsx` is the root layout. It reads the segment through
  `next/root-params`, which means any Server Component can call `locale()`
  without prop drilling; only the handful of Client Components take it as a prop.
- Content carries both languages side by side as `{ en, id }` pairs
  (`src/lib/i18n.ts` defines `LText` / `LList` and the `t()` accessor). A missing
  translation fails to type-check instead of silently falling back to English.
- `src/data/ui.ts` holds the interface strings; the content files hold the rest.
- `next.config.ts` redirects `/` by `Accept-Language`: Indonesian as the reader's
  *first* preference goes to `/id`, everything else to `/en`. Next compiles that
  header pattern with JavaScript `RegExp`, which has no inline `(?i)` flag —
  hence the explicit character classes in the pattern.
- `hreflang` alternates, per-locale canonicals and a bilingual sitemap are
  generated from the same `LOCALES` list.

- The language switch is a **slide toggle** of two real links, and the page does
  not move when you use it. That takes three things: `scroll={false}` so Next
  does not jump to the top, `useKeepScroll` to put the offset back (the document
  is briefly shorter while the new page mounts, which makes the browser clamp
  the scroll), and a `routeKey` on that hook — `/en` and `/id` match the same
  `[locale]` route, so React reconciles the toggle rather than remounting it and
  an effect with an empty dependency list would never run again.
  Anchoring to the current section instead would jump to its heading, which
  reads as a scroll; holding the offset is safe because the two translations are
  within ~1% of each other in height.
- The switch runs behind an **8-bit loading screen** (`LoadingScreen`, raised by
  `LocaleSwitchOverlay` from the locale layout, so the quest pages get it too).
  The click is taken over in JavaScript so the screen can go up before the
  navigation starts; the `href` underneath stays real, so a crawler, a middle
  click and a reader without JavaScript all still get the plain navigation.
  The bar is held at nine tenths until the requested language is the one
  actually rendered — a full bar over a page that has not arrived is a lie —
  and a cap closes the screen if the navigation never lands.
  It deliberately does **not** lock body scrolling: `useKeepScroll` restores the
  reader's offset while the screen is still up, and `scrollTo` is a no-op on a
  locked body, so the lock would cost the reader their place to stop a scroll
  nobody can see happening.
- Changing the language changes `data-locale` on `<html>`, which makes React
  replace the element — and `data-theme` goes with it, because the bootstrap
  script put it there and React has no record of it to restore. Without
  `applyTheme()` running as the new language lands, a daylight reader switching
  language would drop back into night. Ordinary route changes within one
  language do not do this; only the locale swap.
- The navbar's active-section indicator measures on scroll rather than using an
  IntersectionObserver. An observer reports *which* sections overlap a band, not
  which one owns the top of it — picking from that set by smallest
  `boundingClientRect.top` selects whichever section is furthest above the
  viewport, which makes the indicator lag a section behind.

**Game-UI words stay English in the Indonesian copy** where the retro convention
is stronger than the translation — QUEST, PLAYER STATS, LV., XP. So do
technology names, column names and the three discipline names: translating
"Data Engineering" would make the portfolio harder to find, not easier.

To add a third language, add it to `LOCALES` and TypeScript will list every
string that still needs translating.

## Motion: everything runs on frames

A retro UI stops convincing the moment something eases. Sprite animation has
frames; it does not interpolate. So nothing in this site uses a cubic-bezier:

- **Tailwind's default easing is redefined** in `globals.css`
  (`--default-transition-timing-function: steps(4, end)`), which puts every
  `transition-colors`, `transition-transform` and hover state on discrete frames
  without touching a single component.
- **Motion transitions** come from `src/lib/retro.ts` — `reveal`, `swap` and
  `snap`, all built on Motion's `steps()`. Section reveals, filter swaps and the
  start-screen wipe share those three.
- **Keyframes** all carry `steps()` too: stars flick on and off rather than
  fading, the avatar bobs in 4 frames, buttons press into their shadow in 2, and
  the start card leaves on a stepped iris wipe.
- Buttons sit on a hard offset shadow and **press into it** (`pixel-press`);
  cards **lift off it** (`pixel-lift`). Both in two frames.
- The caret is a solid blinking block, the nav's active marker blinks, and a
  single bright scanline crawls down the hero like a CRT refresh.

## Accessibility & motion

- Every animation is behind `prefers-reduced-motion`, including the start
  screen's loading bar and the typewriter.
- The typewriter keeps the full string in the accessibility tree at all times.
- Skill bars expose `role="meter"` with real values; the blocks are decorative.
- The start screen is a dialog, navigable with arrow keys, dismissible with
  Escape, and hands focus to `<main>` on entry.
- The project write-up is a real tablist (arrow keys move between tabs), and
  every panel stays in the DOM — hidden, not unmounted — so the full text is
  still available to crawlers and to in-page search.
- There is a skip link, and the nav indicates the active section with
  `aria-current`.

## Notes

- `cacheComponents` is enabled in `next.config.ts`, which forbids reading the
  clock during prerender — hence the static `copyrightYear` in `profile.ts` and
  the fixed `lastModified` in `sitemap.ts`.
- `src/data/profile.ts` exports `siteUrl`; update it to the real domain before
  deploying so Open Graph, canonical URLs and the sitemap point at the right
  place.
