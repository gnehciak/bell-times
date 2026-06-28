/*
 * Generate the Chrome Web Store graphic assets from the real extension popup.
 *
 *   node tools/extension/make-store-assets.js
 *
 * Renders extension/popup.html in a mid-class demo state (Puppeteer), then
 * composites branded images at the exact sizes the dev console asks for, into
 * store-assets/:
 *   store-icon-128.png      128x128   (Store icon)
 *   screenshot-popup.jpg    1280x800  (Screenshots — clean hero)
 *   screenshot-context.jpg  1280x800  (Screenshots — toolbar in context)
 *   small-promo-440x280.jpg 440x280   (Small promo tile)
 *   marquee-1400x560.jpg    1400x560  (Marquee promo tile)
 *
 * Requires a built extension/ (run `npm run build:extension` first).
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const ROOT = path.join(__dirname, "..", "..");
const EXT = path.join(ROOT, "extension");
const OUT = path.join(ROOT, "store-assets");

// A weekday mid-class moment so the popup shows a live countdown, not the weekend
// "Preview". Baulkham Hills (the default school) Period 3 runs 10:25–11:05.
const POPUP_URL = "file://" + path.join(EXT, "popup.html") + "?mockDay=tue&mockTime=10:30";
const BADGE = "35"; // ≈ minutes left at 10:30, to match the popup's countdown

const COBALT = "#2563eb";
const INK = "#19212e";
const MUTED = "#5b6573";
const BG = "radial-gradient(125% 90% at 78% 8%, #e7edfc 0%, #f3f6f9 42%, #eceff3 100%)";
const FONT_LINK =
  '<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">';
const CLOCK = (px, stroke) =>
  `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

const dataUrl = (file, mime) => "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");

async function shoot(page, html, w, h, file, jpeg) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  // Wait for webfonts, but never hang on them (network-idle waits are flaky here).
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 4000))]));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot(
    jpeg
      ? { path: file, type: "jpeg", quality: 92, clip: { x: 0, y: 0, width: w, height: h } }
      : { path: file, type: "png", clip: { x: 0, y: 0, width: w, height: h } }
  );
  console.log("  wrote", path.relative(ROOT, file));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  // --lang forces an English locale so the popup's date renders "Tuesday, 30 Jun"
  // rather than in the host machine's locale.
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--allow-file-access-from-files", "--lang=en-AU"],
  });
  try {
    // 1) Capture the popup itself (2x for crispness), as a data URL we can place.
    const pop = await browser.newPage();
    await pop.emulateTimezone("Australia/Sydney");
    // Force the popup's date into en-AU regardless of the host locale (Chrome's
    // --lang doesn't reliably steer V8's default Intl locale on macOS).
    await pop.evaluateOnNewDocument(() => {
      const orig = Date.prototype.toLocaleDateString;
      Date.prototype.toLocaleDateString = function (_l, opts) { return orig.call(this, "en-AU", opts); };
    });
    await pop.setViewport({ width: 400, height: 760, deviceScaleFactor: 2 });
    await pop.goto(POPUP_URL, { waitUntil: "networkidle0" });
    await pop.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 2500)); // let the ring settle on the live value
    const app = await pop.$(".app");
    // encoding:"base64" returns a string directly — screenshot() otherwise returns
    // a Uint8Array, whose .toString("base64") is NOT base64 (it's decimal csv).
    const popupB64 = await app.screenshot({ type: "png", encoding: "base64" });
    await pop.close();
    const POPUP = "data:image/png;base64," + popupB64;

    const LOGO = dataUrl(path.join(EXT, "logos", "baulkham-hills.png"), "image/png");
    const ICON = dataUrl(path.join(EXT, "icons", "icon-48.png"), "image/png");

    const head = `<meta charset="utf8">${FONT_LINK}<style>
      *{box-sizing:border-box;margin:0;padding:0}
      html,body{font-family:'Rubik',system-ui,-apple-system,sans-serif;color:${INK};-webkit-font-smoothing:antialiased}
      .card{border-radius:24px;overflow:hidden;background:#fff;
        box-shadow:0 34px 80px -34px rgba(20,30,55,.42),0 10px 26px -14px rgba(20,30,55,.22);}
      .card img{display:block;width:400px}
      .wm{display:flex;align-items:center;gap:12px}
      .wm b{font-size:30px;font-weight:600;letter-spacing:-.01em}
      h1{font-weight:600;letter-spacing:-.02em;line-height:1.04}
      .sub{color:${MUTED};font-weight:400}
      .bul{list-style:none;display:flex;flex-direction:column;gap:14px}
      .bul li{display:flex;align-items:center;gap:12px;font-size:21px;color:${INK}}
      .bul .d{width:9px;height:9px;border-radius:50%;background:${COBALT};flex:0 0 auto}
    </style>`;

    const page = await browser.newPage();

    // 2) Hero — popup + value proposition.
    const hero = `<!doctype html><html><head>${head}</head>
      <body style="width:1280px;height:800px;background:${BG};display:flex;align-items:center;gap:72px;padding:0 88px">
        <div style="flex:1">
          <div class="wm" style="margin-bottom:30px">${CLOCK(38, COBALT)}<b>Bell Times</b></div>
          <h1 style="font-size:62px;margin-bottom:20px">How long till<br>the bell?</h1>
          <p class="sub" style="font-size:23px;line-height:1.5;margin-bottom:30px;max-width:440px">A live countdown of the time left in the current school period — glanceable in a click.</p>
          <ul class="bul">
            <li><span class="d"></span>Live countdown ring for the current period</li>
            <li><span class="d"></span>Your school's logo + minutes-left badge in the toolbar</li>
            <li><span class="d"></span>140+ Sydney public high schools</li>
          </ul>
        </div>
        <div class="card"><img src="${POPUP}"></div>
      </body></html>`;
    await shoot(page, hero, 1280, 800, path.join(OUT, "screenshot-popup.jpg"), true);

    // 3) Context — a browser window mock: toolbar logo icon + badge, popup open.
    const ctx = `<!doctype html><html><head>${head}</head>
      <body style="width:1280px;height:800px;background:${BG};padding:46px">
        <div style="position:relative;width:1188px;height:708px;margin:0 auto;background:#fdfdfe;border-radius:16px;
             box-shadow:0 40px 90px -40px rgba(20,30,55,.45),0 12px 30px -16px rgba(20,30,55,.2);overflow:hidden;border:1px solid #e7eaef">
          <div style="height:42px;display:flex;align-items:center;gap:9px;padding:0 18px;background:#f1f3f6;border-bottom:1px solid #e7eaef">
            <span style="width:12px;height:12px;border-radius:50%;background:#ff5f57"></span>
            <span style="width:12px;height:12px;border-radius:50%;background:#febc2e"></span>
            <span style="width:12px;height:12px;border-radius:50%;background:#28c840"></span>
          </div>
          <div style="height:54px;display:flex;align-items:center;gap:14px;padding:0 18px;background:#fff;border-bottom:1px solid #eceff3">
            <span style="display:flex;gap:16px;color:#9aa3af">${["M9 18l-6-6 6-6","M15 18l6-6-6-6","M4 12a8 8 0 1 0 2-5.3L4 8"].map((d)=>`<svg width=20 height=20 fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="${d}"/></svg>`).join("")}</span>
            <div style="flex:1;height:34px;border-radius:18px;background:#f1f3f6;display:flex;align-items:center;gap:8px;padding:0 14px;color:#7b8493;font-size:14px">
              <svg width=13 height=13 viewBox="0 0 24 24" fill=none stroke=#7b8493 stroke-width=2><rect x=4 y=11 width=16 height=10 rx=2/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
              bell-times.vercel.app</div>
            <span style="display:flex;gap:14px;align-items:center;color:#c2c8d0">
              <svg width=20 height=20 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2><circle cx=12 cy=12 r=3/><path d="M12 5v2M12 17v2M5 12h2M17 12h2"/></svg>
              <span style="position:relative;display:inline-flex">
                <span style="width:30px;height:30px;border-radius:8px;background:#eef1f4;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 3px rgba(37,99,235,.28)">
                  <img src="${LOGO}" style="width:22px;height:22px;object-fit:contain">
                </span>
                <span style="position:absolute;top:-7px;right:-8px;min-width:18px;height:18px;padding:0 4px;border-radius:9px;background:#1e8a50;color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;border:2px solid #fff">${BADGE}</span>
              </span>
            </span>
          </div>
          <div style="position:absolute;right:40px;top:118px">
            <div style="position:absolute;right:18px;top:-7px;width:14px;height:14px;background:#fff;transform:rotate(45deg);box-shadow:-2px -2px 6px -3px rgba(20,30,55,.2)"></div>
            <div class="card" style="border-radius:18px"><img src="${POPUP}" style="width:372px"></div>
          </div>
          <div style="position:absolute;left:64px;top:150px;max-width:430px">
            <div class="wm" style="margin-bottom:22px">${CLOCK(34, COBALT)}<b>Bell Times</b></div>
            <h1 style="font-size:46px;margin-bottom:18px">Your school's logo,<br>counting down.</h1>
            <p class="sub" style="font-size:20px;line-height:1.5">The toolbar shows your school crest and the minutes left in class — one click opens the full day.</p>
          </div>
        </div>
      </body></html>`;
    await shoot(page, ctx, 1280, 800, path.join(OUT, "screenshot-context.jpg"), true);

    // 4) Small promo tile.
    const small = `<!doctype html><html><head>${head}</head>
      <body style="width:440px;height:280px;background:${BG};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:0 28px">
        <span style="width:64px;height:64px;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px -12px rgba(20,30,55,.3)">${CLOCK(36, COBALT)}</span>
        <b style="font-size:30px;font-weight:600;letter-spacing:-.01em">Bell Times</b>
        <p class="sub" style="font-size:16px;line-height:1.4">Time left in the current school period — at a glance.</p>
      </body></html>`;
    await shoot(page, small, 440, 280, path.join(OUT, "small-promo-440x280.jpg"), true);

    // 5) Marquee promo tile.
    const marquee = `<!doctype html><html><head>${head}</head>
      <body style="width:1400px;height:560px;background:${BG};display:flex;align-items:center;gap:80px;padding:0 96px;overflow:hidden">
        <div style="flex:1">
          <div class="wm" style="margin-bottom:26px">${CLOCK(40, COBALT)}<b style="font-size:34px">Bell Times</b></div>
          <h1 style="font-size:66px;margin-bottom:22px">How long till the bell?</h1>
          <p class="sub" style="font-size:25px;line-height:1.5;max-width:620px">A live countdown of the time left in the current school period — with your school's logo and minutes left right in the toolbar.</p>
        </div>
        <div class="card" style="flex:0 0 auto;align-self:center"><img src="${POPUP}" style="width:430px"></div>
      </body></html>`;
    await shoot(page, marquee, 1400, 560, path.join(OUT, "marquee-1400x560.jpg"), true);

    // 6) Store icon (reuse the built 128 icon).
    fs.copyFileSync(path.join(EXT, "icons", "icon-128.png"), path.join(OUT, "store-icon-128.png"));
    console.log("  wrote", path.relative(ROOT, path.join(OUT, "store-icon-128.png")));
  } finally {
    await browser.close();
  }
})();
