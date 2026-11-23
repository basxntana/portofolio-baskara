/**
 * Cuts the site's pixel art out of the two supplied master asset sheets.
 *
 * Both packs ship "separated" folders, but those crops are taken straight from
 * the sheet, so they still carry its captions ("LOADING BOX – DARK MODE",
 * "ISLAND LABEL FRAMES (DARK)") and the islands come with the sheet's fake
 * checkerboard baked in rather than real transparency. This script goes back to
 * the sheets and cuts the art only.
 *
 * The label plates, the loading box and the tip box are deliberately NOT
 * exported: every one of them has English copy painted into it, and this site
 * is bilingual. They are rebuilt as real HTML in the same style instead.
 *
 * Run: node scripts/build-art.js
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const LOADING_SHEET = "assets/loading-screen-assets-dark-light/master_asset_sheet.png";
const WORLD_SHEET =
  "assets/data-world-pixel-assets/data-world-separated-assets/master_asset_sheet.png";

const OUT_LOADING = "public/assets/images/loading";
const OUT_WORLD = "public/assets/images/world";

/* ── Sheet coordinates ────────────────────────────────────────────────────
   Measured off the sheets: the art inside each panel, clear of the panel
   frame and of the caption above it. */

/** Loading sheet (2172×724): the two full-bleed backgrounds along the top. */
const LOADING_SKY = { top: 34, width: 1063, height: 309 };
const LOADING_SKY_X = { night: 11, day: 1097 };

/** World sheet (1536×1024): the two backgrounds, then the island row. */
const WORLD_BG = { top: 36, width: 745, height: 194 };
const WORLD_BG_X = { night: 13, day: 779 };

const ISLAND_BAND = [270, 465];
const ISLAND_X = {
  night: { engineer: [17, 257], analyst: [275, 522], scientist: [543, 756] },
  day: { engineer: [780, 1022], analyst: [1040, 1287], scientist: [1308, 1525] },
};

/** Panel frame thickness. Cut inside it rather than trying to key it out: it
 *  is a dark line under a cyan highlight, and no colour rule separates the
 *  highlight from the artwork. The bridges run right up to the frame, so the
 *  row below butts the cuts back together with this much overlap. */
const FRAME = 7;

const THEMES = ["night", "day"];
const ISLANDS = ["engineer", "analyst", "scientist"];

/* ── Cutting the islands out of their panel ───────────────────────────────
   Each island sits on a grey checkerboard inside a framed panel. A flood fill
   inward from the panel edge is what separates them: keying on colour alone
   would punch holes in the white buildings and the pale bridge decks, while
   the fill only ever reaches what is connected to the outside.

   Two rules are needed, and they must stay apart. The panel frame is near
   black; the checkerboard is light grey, tinted green where the night
   islands' glow falls on it. Allow that tint into one rule and the islands'
   own black outline qualifies too — once the fill touches it, it runs the
   whole outline and hollows the island out. So the dark rule and the light
   rule take turns, each picking up where the other stopped, and neither can
   step through the other's pixels. */

/** The checkerboard, including the greenish cast the night glow gives it. */
function isBoard(r, g, b) {
  const mx = Math.max(r, g, b);
  const spread = mx - Math.min(r, g, b);
  if (mx <= 60 || mx > 236) return false;
  return spread <= 26 || (spread <= 44 && g === mx);
}

/** The panel's black frame — and nothing the fill can reach from inside it. */
function isFrame(r, g, b) {
  const mx = Math.max(r, g, b);
  return mx <= 60 && mx - Math.min(r, g, b) <= 26;
}

async function cutIsland(sheet, rect) {
  const { data, info } = await sharp(sheet)
    .extract(rect)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const seen = new Uint8Array(w * h);

  /** Floods from the panel edge and from the rim of whatever is already cut. */
  const fill = (match) => {
    const stack = [];
    for (let x = 0; x < w; x++) stack.push([x, 0], [x, h - 1]);
    for (let y = 0; y < h; y++) stack.push([0, y], [w - 1, y]);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!seen[y * w + x]) continue;
        stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
    }

    let filled = 0;
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      const k = y * w + x;
      if (seen[k]) continue;
      const i = k * 4;
      if (!match(data[i], data[i + 1], data[i + 2])) continue;
      seen[k] = 1;
      filled++;
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    return filled;
  };

  for (let pass = 0; pass < 6; pass++) {
    if (fill(pass % 2 === 0 ? isFrame : isBoard) === 0 && pass > 1) break;
  }

  /* The sheet carries an alpha channel of its own, but a useless one: the
     checkerboard is at ~95 rather than 0, and a soft glow ramps up to the
     island over a dozen pixels — with checkerboard grey still in the colour
     channels underneath. Left alone it composites as a grey halo. The art is
     pixel art, which has no soft edges to preserve, so alpha is taken as the
     hard mask it should have been. */
  for (let k = 0; k < w * h; k++) {
    data[k * 4 + 3] = seen[k] || data[k * 4 + 3] < 210 ? 0 : 255;
  }
  return { data, width: w, height: h };
}

/** Opaque pixels per column — used to find both the art and the bridge stubs. */
function columnWeights({ data, width, height }) {
  const weights = new Array(width).fill(0);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) if (data[(y * width + x) * 4 + 3] > 8) weights[x]++;
  }
  return weights;
}

/** The longest run of columns carrying at least `min` opaque pixels. */
function longestRun(weights, min) {
  let best = [0, weights.length - 1];
  let bestLen = -1;
  let start = null;
  for (let x = 0; x <= weights.length; x++) {
    const on = x < weights.length && weights[x] >= min;
    if (on && start === null) start = x;
    if (!on && start !== null) {
      if (x - start > bestLen) {
        bestLen = x - start;
        best = [start, x - 1];
      }
      start = null;
    }
  }
  return best;
}

function raw({ data, width, height }) {
  return sharp(Buffer.from(data), { raw: { width, height, channels: 4 } });
}

function crop(island, [x0, x1]) {
  const width = x1 - x0 + 1;
  const out = Buffer.alloc(width * island.height * 4);
  for (let y = 0; y < island.height; y++) {
    island.data.copy(
      out,
      y * width * 4,
      (y * island.width + x0) * 4,
      (y * island.width + x1 + 1) * 4,
    );
  }
  return { data: out, width, height: island.height };
}

async function webp(image, file, quality = 88) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await image.webp({ quality, effort: 6, alphaQuality: 100 }).toFile(file);
  const m = await sharp(file).metadata();
  console.log(`${path.relative("public", file).padEnd(38)} ${m.width}×${m.height}`);
}

(async () => {
  /* Loading screen backgrounds. */
  for (const theme of THEMES) {
    await webp(
      sharp(LOADING_SHEET).extract({ left: LOADING_SKY_X[theme], ...LOADING_SKY }),
      path.join(OUT_LOADING, `sky-${theme}.webp`),
      84,
    );
  }

  /* Data World backgrounds. */
  for (const theme of THEMES) {
    await webp(
      sharp(WORLD_SHEET).extract({ left: WORLD_BG_X[theme], ...WORLD_BG }),
      path.join(OUT_WORLD, `bg-${theme}.webp`),
      84,
    );
  }

  /* The three islands, per theme: once on their own and once joined into the
     bridged row the concept art shows. */
  for (const theme of THEMES) {
    const pieces = [];

    for (const name of ISLANDS) {
      const [x0, x1] = ISLAND_X[theme][name];
      const island = await cutIsland(WORLD_SHEET, {
        left: x0 + FRAME,
        top: ISLAND_BAND[0] + FRAME,
        width: x1 - x0 + 1 - FRAME * 2,
        height: ISLAND_BAND[1] - ISLAND_BAND[0] + 1 - FRAME * 2,
      });

      const weights = columnWeights(island);
      /* Everything the fill left standing — bridge stubs included. */
      const joined = crop(island, longestRun(weights, 1));
      pieces.push(joined);

      /* The island on its own. A bridge is a thin bar roughly an eighth of the
         frame tall, so a third of the height cleanly separates the two. */
      const body = crop(island, longestRun(weights, Math.round(island.height / 3)));
      await webp(raw(body), path.join(OUT_WORLD, `island-${name}-${theme}.webp`));
    }

    /* The panels sat side by side on the sheet with their bridges reaching the
       frame, so laying the cuts back out — closing the gap the frame inset
       opened — reconnects them into one span. */
    const overlap = FRAME * 2;
    const width = pieces.reduce((n, p) => n + p.width, 0) - overlap * (pieces.length - 1);
    const height = pieces[0].height;

    let left = 0;
    const layers = [];
    for (const piece of pieces) {
      layers.push({ input: await raw(piece).png().toBuffer(), left, top: 0 });
      left += piece.width - overlap;
    }

    await webp(
      sharp({
        create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
      }).composite(layers),
      path.join(OUT_WORLD, `islands-${theme}.webp`),
    );
  }
})();
