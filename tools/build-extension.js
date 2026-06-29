/*
 * Build the Chrome (MV3) extension from the website — one source, two surfaces.
 *
 *   npm run build:extension          (or  SITE_URL=https://your-domain npm run build:extension)
 *
 * The extension is the SAME app: it reuses app.js / styles.css / data.js / the
 * generated data files / logos/ verbatim. This script just assembles a loadable
 * extension/ folder so you never maintain two codebases:
 *
 *   1. copy the shared runtime assets into extension/
 *   2. add the extension-only bits from tools/extension/ (popup.css, icons)
 *   3. transform the per-school app shell (tools/school-shell.html, the same
 *      file the SEO build renders into /school/<id>/) -> extension/popup.html:
 *      strip the SEO/social head, mark <body class="extension">, link popup.css,
 *      and point the brand link at the live website (the popup has no home page)
 *   4. write extension/manifest.json (version synced from package.json)
 *
 * The popup is the countdown itself, not the search landing — glanceable on
 * click. It opens to the last-picked school (localStorage) and its built-in
 * "Change School" switcher swaps schools in place.
 *
 * app.js detects the popup (chrome-extension://… or body.extension) and switches
 * schools in place instead of navigating to per-school URLs, which a packaged
 * extension doesn't have. Re-run this after any change to the website.
 *
 * The whole extension/ folder is generated — load it in chrome://extensions via
 * "Load unpacked". It's git/vercel-ignored; tools/extension/ holds the sources.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, ".."); // tools/ -> project root
const SRC = path.join(__dirname, "extension"); // extension-only sources
const OUT = path.join(ROOT, "extension"); // generated, loadable extension

const SITE_URL = (process.env.SITE_URL || "https://bell-times.vercel.app").trim().replace(/\/+$/, "");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

// Everything the browser loads at runtime, copied verbatim from the site root.
const RUNTIME_FILES = [
  "app.js",
  "styles.css",
  "data.js",
  "logos.generated.js",
  "accents.generated.js",
  "week-overrides.js",
  "favicon.svg",
];
const RUNTIME_DIRS = ["logos"];

// ----- school-shell.html -> popup.html -------------------------------------
function buildPopupHtml() {
  let html = fs.readFileSync(path.join(ROOT, "tools", "school-shell.html"), "utf8");

  // 1) Replace the whole SEO/social head block (<title> … website JSON-LD
  //    </script>) with a minimal popup head. The styles.css + fonts <link>s
  //    that follow this block in the shell are kept as-is.
  const head =
    "<title>Bell Times</title>\n" +
    '  <meta name="theme-color" content="#eef1f4">\n' +
    '  <link rel="icon" href="favicon.svg" type="image/svg+xml">';
  html = html.replace(/<title>[\s\S]*?<\/script>/, head);

  // 2) Load the popup form-factor overrides right after the shared stylesheet.
  html = html.replace(
    '<link rel="stylesheet" href="styles.css">',
    '<link rel="stylesheet" href="styles.css">\n  <link rel="stylesheet" href="popup.css">'
  );

  // 2b) The website loads Rubik async (preload + an inline onload that swaps
  //     rel="preload"→"stylesheet"), which keeps the font off the render path.
  //     The popup runs under MV3's CSP (script-src 'self'), which blocks inline
  //     event handlers — so that onload never fires and Rubik silently falls back
  //     to a system font. Load it as a plain stylesheet here (the <noscript>
  //     duplicate is then redundant); the website build keeps the async pattern.
  html = html.replace(
    /<link rel="preload" as="style" href="([^"]+)"[^>]*>\s*<noscript><link[^>]*><\/noscript>/,
    '<link rel="stylesheet" href="$1">'
  );

  // 3) Mark the body so app.js + popup.css switch into extension mode.
  html = html.replace("<body>", '<body class="extension">');

  // 4) The brand link goes "home" (/) on the website, but the packaged popup has
  //    no home page — point it at the live site (new tab) instead.
  html = html.replace(
    '<a href="/" class="brand-home" aria-label="Bell Times home">',
    '<a href="' + SITE_URL + '" class="brand-home" target="_blank" ' +
      'rel="noopener noreferrer" aria-label="Open the Bell Times website">'
  );

  // 5) Drop the website's analytics tag — its /_vercel/insights/script.js path
  //    doesn't exist inside the packaged extension, so it just 404s on every
  //    popup open (and would do nothing if it loaded).
  html = html.replace(/\s*<script defer src="\/_vercel\/insights\/script\.js"><\/script>/, "");

  return html;
}

// ----- manifest.json (MV3) -------------------------------------------------
function buildManifest() {
  // Permissions: `alarms` drives the 30-second badge refresh; `storage` lets
  // the background worker read which school the popup picked. No host permissions
  // and no remote code. No custom CSP: MV3's default (script-src 'self') already
  // allows our local scripts, inline style attributes, and the Google Fonts <link>.
  return {
    manifest_version: 3,
    name: "Bell Times",
    version: pkg.version || "1.0.0",
    description:
      "Live countdown of how much time is left in the current school period, for Sydney public high schools.",
    permissions: ["alarms", "storage"],
    background: { service_worker: "sw.js" },
    action: {
      default_popup: "popup.html",
      default_title: "Bell Times",
      default_icon: { 16: "icons/icon-16.png", 48: "icons/icon-48.png", 128: "icons/icon-128.png" },
    },
    icons: { 16: "icons/icon-16.png", 48: "icons/icon-48.png", 128: "icons/icon-128.png" },
  };
}

// ----- helpers -------------------------------------------------------------
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else fs.copyFileSync(src, dst);
  }
}

// ----- run -----------------------------------------------------------------
function main() {
  const icons = path.join(SRC, "icons");
  if (!fs.existsSync(path.join(icons, "icon-128.png"))) {
    throw new Error(
      "Missing extension icons. Run `node tools/extension/make-icons.js` first."
    );
  }

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  for (const f of RUNTIME_FILES) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
  for (const d of RUNTIME_DIRS) copyDir(path.join(ROOT, d), path.join(OUT, d));

  fs.copyFileSync(path.join(SRC, "popup.css"), path.join(OUT, "popup.css"));
  fs.copyFileSync(path.join(SRC, "sw.js"), path.join(OUT, "sw.js"));
  copyDir(icons, path.join(OUT, "icons"));

  fs.writeFileSync(path.join(OUT, "popup.html"), buildPopupHtml());
  fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(buildManifest(), null, 2) + "\n");

  const logoCount = fs.readdirSync(path.join(OUT, "logos")).filter((f) => f !== ".DS_Store").length;
  console.log("Built extension/  →  load it via chrome://extensions ▸ Load unpacked");
  console.log("  manifest v" + (pkg.version || "1.0.0") + ", popup.html + sw.js, " + RUNTIME_FILES.length +
    " runtime files, " + logoCount + " logos");
  console.log("  Toolbar: school-logo icon + minutes-left badge (background worker)");
  console.log("  Open full site → " + SITE_URL);
}

main();
