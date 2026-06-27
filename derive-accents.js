/*
 * derive-accents.js — analyse each school logo and assign a themed accent colour.
 *
 * For every logos/<id>.png it finds the dominant *brand* colour (ignoring the
 * white/transparent background, near-black ink and grey), then normalises that
 * colour through OKLCH into the design system's lightness/chroma band so all
 * accents stay harmonious on the frost-white canvas and keep WCAG AA contrast.
 *
 * Output: accents.generated.js  ->  window.SCHOOL_ACCENTS = { id: "#hex", ... }
 *
 * Run:  node derive-accents.js     (requires macOS `sips`, no npm deps)
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const LOGO_DIR = "logos";
const TMP_DIR = path.join(
  process.env.TMPDIR || "/tmp",
  "belltime-accents"
);
const OUT = "accents.generated.js";
const SAMPLE = 48; // downscaled logo size for sampling

// ---------- colour-space helpers (sRGB <-> OKLCH) ----------
const srgbToLin = (c) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const linToSrgb = (c) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

function rgbToOklch(r, g, b) {
  const lr = srgbToLin(r), lg = srgbToLin(g), lb = srgbToLin(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(a, bb), h: Math.atan2(bb, a) };
}
function oklchToRgb(L, C, h) {
  const a = C * Math.cos(h), bb = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bb;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bb;
  const s_ = L - 0.0894841775 * a - 1.291485548 * bb;
  const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const to8 = (v) =>
    Math.max(0, Math.min(255, Math.round(linToSrgb(Math.max(0, Math.min(1, v))) * 255)));
  return [to8(lr), to8(lg), to8(lb)];
}
const hex = (r, g, b) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

// ---------- BMP decoder (sips emits 32bpp BGRA; transparency is flattened
// to white, which the colour filters drop — so no interlace/palette cases). ----------
function decodeBmp(buf) {
  if (buf.toString("ascii", 0, 2) !== "BM") throw new Error("not a BMP");
  const off = buf.readUInt32LE(10);
  const w = buf.readInt32LE(18);
  const hRaw = buf.readInt32LE(22);
  const bpp = buf.readUInt16LE(28);
  if (bpp !== 32 && bpp !== 24) throw new Error("unsupported bpp " + bpp);
  const h = Math.abs(hRaw);
  const topDown = hRaw < 0;
  const bytesPP = bpp / 8;
  const rowSize = Math.floor((bpp * w + 31) / 32) * 4; // rows padded to 4 bytes
  const px = [];
  for (let row = 0; row < h; row++) {
    const y = topDown ? row : h - 1 - row;
    const base = off + y * rowSize;
    for (let x = 0; x < w; x++) {
      const o = base + x * bytesPP;
      px.push([buf[o + 2], buf[o + 1], buf[o], bpp === 32 ? buf[o + 3] : 255]);
    }
  }
  return px;
}

// How well a hue survives as a lone dark accent on white. Gold/yellow/orange
// turn muddy and are almost always a *secondary* crest colour, so they're
// penalised — a green/navy/maroon present in the same logo will win instead.
function hueSuit(hue) {
  if (hue >= 40 && hue < 95) return 0.2;    // gold / yellow
  if (hue >= 28 && hue < 40) return 0.5;    // orange
  if (hue >= 95 && hue < 112) return 0.6;   // yellow-green
  return 1.0;                               // red, green, teal, blue, violet, magenta
}

// ---------- dominant brand colour from sampled pixels ----------
function dominantColour(pixels) {
  // accumulate chroma-weighted RGB into hue buckets. We weight by raw chroma
  // (max-min), NOT HSL saturation: near-white pixels have a vanishing
  // saturation *denominator* that inflates noise into a fake strong hue, which
  // would let a white background outvote the real logo. Chroma is well-behaved.
  const BUCKETS = 36;
  const bins = Array.from({ length: BUCKETS }, () => ({ w: 0, r: 0, g: 0, b: 0 }));
  let neutralW = 0, nr = 0, ng = 0, nb = 0; // fallback for grey/black logos
  for (const [r8, g8, b8, a] of pixels) {
    if (a < 128) continue;
    const r = r8 / 255, g = g8 / 255, b = b8 / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const L = (max + min) / 2;
    const d = max - min; // chroma
    if (max < 0.1) continue;                   // pure black ink
    // track a neutral fallback (mid-tone) for monochrome logos
    if (L > 0.12 && L < 0.9) { neutralW++; nr += r; ng += g; nb += b; }
    if (d < 0.13) continue;                     // white / grey / compression noise
    let hue;
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue = ((hue * 60) + 360) % 360;
    const bi = Math.floor(hue / (360 / BUCKETS)) % BUCKETS;
    // weight by AREA among genuinely-coloured pixels (chroma is only the gate
    // above): the colour with the largest visual presence wins, so a small
    // vivid heraldic detail can't beat a big primary field. Hue suitability
    // discounts gold/yellow as trim; a mild bias favours mid lightness.
    // Muddiness is fixed downstream by the chroma floor in normalise().
    const wgt = hueSuit(hue) * (1 - Math.abs(L - 0.5) * 0.6);
    bins[bi].w += wgt; bins[bi].r += r * wgt; bins[bi].g += g * wgt; bins[bi].b += b * wgt;
  }
  let best = null;
  for (const bin of bins) if (bin.w > 0 && (!best || bin.w > best.w)) best = bin;
  const totalColour = bins.reduce((s, x) => s + x.w, 0);
  if (best && totalColour > 0.5) {
    return { rgb: [best.r / best.w, best.g / best.w, best.b / best.w], colourful: true };
  }
  if (neutralW > 0) {
    return { rgb: [nr / neutralW, ng / neutralW, nb / neutralW], colourful: false };
  }
  return null;
}

function hslHue(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (d === 0) return 0;
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return ((h * 60) + 360) % 360;
}

// ---------- normalise into the design system's band ----------
function normalise(rgb, colourful) {
  const { L: srcL, C: srcC, h } = rgbToOklch(rgb[0], rgb[1], rgb[2]);
  const goldHue = hslHue(rgb[0], rgb[1], rgb[2]);
  let L, C, hue = h;
  if (!colourful) {
    // grey / black logo -> calm cool slate that matches the ink palette
    L = 0.34; C = 0.02; hue = (264 * Math.PI) / 180;
  } else if (goldHue >= 40 && goldHue < 100) {
    // genuinely gold/amber logo -> render as a warm amber (like --break),
    // never the muddy olive a mid-lightness gold collapses to
    L = 0.62; C = clamp(srcC, 0.12, 0.15);
  } else {
    // hold a firm chroma floor so muted maroons/reds read as colour, not mud
    L = clamp(srcL, 0.45, 0.56); C = clamp(srcC, 0.13, 0.17);
  }
  const [r, g, b] = oklchToRgb(L, C, hue);
  return hex(r, g, b);
}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ---------- run ----------
fs.mkdirSync(TMP_DIR, { recursive: true });
const files = fs
  .readdirSync(LOGO_DIR)
  .filter((f) => f.toLowerCase().endsWith(".png"))
  .sort();

const accents = {};
const report = [];
for (const file of files) {
  const id = file.replace(/\.png$/i, "");
  const out = path.join(TMP_DIR, id + ".bmp");
  try {
    execFileSync("sips", ["-s", "format", "bmp", "-Z", String(SAMPLE),
      path.join(LOGO_DIR, file), "--out", out], { stdio: "ignore" });
    const px = decodeBmp(fs.readFileSync(out));
    const dom = dominantColour(px);
    if (!dom) { report.push([id, "—", "no colour"]); continue; }
    const accent = normalise(dom.rgb, dom.colourful);
    accents[id] = accent;
    report.push([id, accent, dom.colourful ? "brand" : "neutral"]);
  } catch (e) {
    report.push([id, "—", "ERR " + e.message]);
  }
}

const body =
  "/* Auto-generated by derive-accents.js: school id -> logo-derived accent.\n" +
  " * Dominant brand colour of each logo, normalised into the design system's\n" +
  " * OKLCH lightness/chroma band. Regenerate with `node derive-accents.js`. */\n" +
  "(function () {\n  window.SCHOOL_ACCENTS = {\n" +
  Object.keys(accents).sort().map((id) => `    ${JSON.stringify(id)}: ${JSON.stringify(accents[id])},`).join("\n") +
  "\n  };\n})();\n";
fs.writeFileSync(OUT, body);

console.log(report.map((r) => `${r[1].padEnd(8)} ${r[2].padEnd(8)} ${r[0]}`).join("\n"));
console.log(`\n${Object.keys(accents).length}/${files.length} logos -> ${OUT}`);
