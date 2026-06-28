/*
 * One-off: rasterise the Bell Times clock mark into the PNG toolbar icons the
 * Chrome extension needs (16 / 48 / 128 px). Run once after changing the mark:
 *
 *   node tools/extension/make-icons.js
 *
 * The committed PNGs live alongside this file in icons/; build-extension.js just
 * copies them. Uses puppeteer (already a devDependency) so there's no new tool.
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const OUT = path.join(__dirname, "icons");
const SIZES = [16, 48, 128];
const ACCENT = "#2563eb"; // matches favicon.svg / the default cobalt accent
const TILE = "#eef1f4";   // a touch deeper than the frost canvas so it reads on any toolbar

// A rounded tile with the same clock glyph as favicon.svg, padded to ~62% so it
// stays legible at 16px. Stroke width scales with the tile so edges stay crisp.
function tileSvg(size) {
  const r = Math.round(size * 0.22);          // corner radius
  const pad = size * 0.19;                     // glyph inset
  const scale = (size - pad * 2) / 24;         // clock viewBox is 24
  const sw = Math.max(1.6, 2 * (size / 48));   // visual stroke, in px
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="${TILE}"/>
  <g transform="translate(${pad} ${pad}) scale(${scale})" fill="none" stroke="${ACCENT}"
     stroke-width="${sw / scale}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </g>
</svg>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  try {
    const page = await browser.newPage();
    for (const size of SIZES) {
      const svg = tileSvg(size);
      await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
      await page.setContent(
        `<!doctype html><html><body style="margin:0">${svg}</body></html>`,
        { waitUntil: "load" }
      );
      const el = await page.$("svg");
      const file = path.join(OUT, `icon-${size}.png`);
      await el.screenshot({ path: file, omitBackground: true });
      console.log("wrote", path.relative(process.cwd(), file));
    }
  } finally {
    await browser.close();
  }
})();
