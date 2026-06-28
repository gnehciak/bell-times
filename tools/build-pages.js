/*
 * SEO prebuild — turns the single-page app into 143 crawlable, indexable pages.
 *
 * For each school it emits  school/<id>/index.html : the same app shell as index.html
 * (so app.js hydrates it into the live countdown), but with school-specific
 * <head> metadata, pre-rendered schedule content, and a <noscript> full-week
 * fallback so non-JS crawlers still read real bell times. Also writes
 * sitemap.xml and robots.txt.
 *
 * Run:  npm run build          (or  SITE_URL=https://yourdomain npm run build)
 *
 * The school data lives in browser <script> files (data.js, logos.generated.js,
 * …) that attach to `window`; we replay them in a vm sandbox to read them here,
 * and replicate the schedule helpers from app.js so the static render matches.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, ".."); // tools/ -> project root
const SEG = "school"; // URL/dir segment for per-school pages: /school/<id>/
const OUT_DIR = path.join(ROOT, SEG);

// ----- Base URL (canonical / OG / sitemap all need an absolute origin) -----
const PLACEHOLDER = "https://belltime.example";
let SITE_URL = (process.env.SITE_URL || "").trim().replace(/\/+$/, "");
if (!SITE_URL) {
  console.warn(
    "⚠  SITE_URL not set — using placeholder " + PLACEHOLDER + ".\n" +
    "   Set it so canonical/OG/sitemap URLs are real:  SITE_URL=https://yourdomain npm run build\n"
  );
  SITE_URL = PLACEHOLDER;
}

// ----- Load the browser data files via a window shim -----
function loadData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const f of ["data.js", "logos.generated.js", "accents.generated.js", "week-overrides.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
  }
  return {
    schools: sandbox.window.SCHOOLS || [],
    logos: sandbox.window.SCHOOL_LOGOS || {},
    accents: sandbox.window.SCHOOL_ACCENTS || {},
    weekOverrides: sandbox.window.BELLTIME_WEEK_OVERRIDES || {},
  };
}

// ----- Prep schools exactly as app.js does (week overrides + accent) -----
const PALETTE = [
  "#2563eb", "#0d9488", "#9d1d2c", "#7c3aed", "#0f766e", "#b45309",
  "#be123c", "#1d4ed8", "#15803d", "#c026d3", "#0369a1", "#ca8a04",
  "#dc2626", "#4f46e5", "#059669", "#db2777", "#0891b2", "#65a30d",
];
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function prepSchools(schools, accents, weekOverrides) {
  schools.forEach((s) => {
    const wo = weekOverrides[s.id];
    if (wo) {
      if (wo.schedules) Object.assign(s.schedules, wo.schedules);
      if (!s.weeks) s.weeks = wo.weeks || wo;
    }
    // Mirror app.js: logo-derived accent wins, then any inline accent, then palette.
    s.accent = accents[s.id] || s.accent || PALETTE[hashStr(s.id || s.name) % PALETTE.length];
  });
}

// ----- Schedule helpers (mirrors app.js) -----
const WEEKDAYS = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
];
const pad = (n) => String(n).padStart(2, "0");
const timeToMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
function classify(name) {
  const n = name.toLowerCase();
  if (/(recess|lunch|break)/.test(n)) return "break";
  if (/(assembly|staff)/.test(n)) return "event";
  return "class";
}
function buildSegments(schedule) {
  const segs = [];
  for (let i = 0; i < schedule.length; i++) {
    const b = schedule[i];
    if (b.terminal) continue;
    const start = timeToMin(b.start);
    let end;
    if (b.end) end = timeToMin(b.end);
    else if (schedule[i + 1]) end = timeToMin(schedule[i + 1].start);
    else end = start;
    segs.push({ name: b.name, type: classify(b.name), start, end });
  }
  return segs;
}
function fmtClock(min) {
  let h = Math.floor(min / 60);
  const m = min % 60;
  const ap = h >= 12 ? "pm" : "am";
  h = h % 12; if (h === 0) h = 12;
  return `${h}:${pad(m)}${ap}`;
}
function getWeekCycle(school) {
  return school && school.weeks && school.weeks.a && school.weeks.b ? school.weeks : null;
}
function getWeekDays(school, weekKey) {
  const weeks = getWeekCycle(school);
  if (!weeks) return school.days || {};
  const week = weeks[weekKey] || weeks.a;
  return week.days || week;
}
function getWeekLabel(school, weekKey) {
  const weeks = getWeekCycle(school);
  const week = weeks && weeks[weekKey];
  return (week && week.label) || (weekKey === "b" ? "Week B" : "Week A");
}
// All renderable [weekKey|null, {day,label,segs}[]] groups for a school.
function weekGroups(school) {
  const cycle = getWeekCycle(school);
  const keys = cycle ? Object.keys(cycle).filter((k) => cycle[k]) : [null];
  return keys.map((wk) => {
    const days = getWeekDays(school, wk || "a");
    const rows = WEEKDAYS
      .filter((d) => days[d.key] && school.schedules[days[d.key]])
      .map((d) => ({ day: d.key, label: d.label, segs: buildSegments(school.schedules[days[d.key]]) }));
    return { weekKey: wk, weekLabel: wk ? getWeekLabel(school, wk) : null, rows };
  });
}

// ----- HTML escaping -----
const escapeHtml = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const escapeAttr = escapeHtml;

// ----- Per-school content -----
function periodsHtml(segs) {
  return segs.map((s) =>
    '<li class="period" data-type="' + s.type + '">' +
    '<span class="dot"></span>' +
    '<span class="p-name">' + escapeHtml(s.name) + '</span>' +
    '<span class="p-range">' + escapeHtml(fmtClock(s.start) + " – " + fmtClock(s.end)) + '</span>' +
    '<div class="p-bar"><span></span></div>' +
    '</li>'
  ).join("");
}
function noscriptHtml(school, groups) {
  const dayList = (rows) => rows.map((r) =>
    '<h3>' + escapeHtml(r.label) + '</h3><ul>' +
    r.segs.map((s) => '<li>' + escapeHtml(s.name) + ' — ' + escapeHtml(fmtClock(s.start) + " – " + fmtClock(s.end)) + '</li>').join("") +
    '</ul>'
  ).join("");
  let body;
  if (groups.length > 1) {
    body = groups.map((g) => '<h3 class="seo-week">' + escapeHtml(g.weekLabel) + '</h3>' + dayList(g.rows)).join("");
  } else {
    body = dayList(groups[0] ? groups[0].rows : []);
  }
  const src = school.source
    ? '<p>Source: <a href="' + escapeAttr(school.source) + '" rel="noopener noreferrer">official bell times for ' + escapeHtml(school.short || school.name) + '</a>.</p>'
    : "";
  return (
    '<noscript>' +
    '<section class="seo-fallback" style="max-width:42rem;margin:1.5rem auto;padding:0 1.25rem;line-height:1.5">' +
    '<h2>' + escapeHtml(school.name) + ' — bell times</h2>' +
    (school.note ? '<p>' + escapeHtml(school.note) + '</p>' : "") +
    body +
    src +
    '<p><strong>Unofficial.</strong> Always check against your school’s official timetable.</p>' +
    '</section>' +
    '</noscript>'
  );
}
function jsonLd(school, url) {
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bell Time", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: school.name, item: url },
    ],
  };
  const org = {
    "@context": "https://schema.org", "@type": "HighSchool",
    name: school.name, url,
    address: { "@type": "PostalAddress", addressRegion: "NSW", addressCountry: "AU" },
  };
  if (school.source) org.sameAs = school.source;
  return JSON.stringify([breadcrumb, org]);
}

// ----- Build one school page by transforming index.html -----
function schoolPage(shell, school, logos) {
  const url = SITE_URL + "/" + SEG + "/" + school.id + "/";
  const groups = weekGroups(school);
  const firstRows = (groups[0] && groups[0].rows) || [];
  const firstDay = firstRows[0] || { segs: [] };
  const logoFile = logos[school.id];
  const ogImage = logoFile ? SITE_URL + "/logos/" + logoFile : "";
  const title = school.name + " Bell Times — Live Countdown | Bell Time";
  const desc =
    "Live bell times and period countdown for " + school.name +
    ". See today’s schedule — recess, lunch, and how long until the next bell.";

  let html = shell;

  // 1) Asset paths: this page lives two levels deep (/school/<id>/index.html).
  html = html.replace(/(href|src)="(styles\.css|data\.js|schools\.generated\.js|logos\.generated\.js|accents\.generated\.js|week-overrides\.js|app\.js|favicon\.svg)"/g,
    (_m, attr, file) => `${attr}="../../${file}"`);

  // 2) Head: swap the homepage SEO block for this school's.
  const head =
    '<title>' + escapeHtml(title) + '</title>\n' +
    '  <meta name="description" content="' + escapeAttr(desc) + '">\n' +
    '  <meta name="theme-color" content="' + escapeAttr(school.accent) + '">\n' +
    '  <link rel="canonical" href="' + escapeAttr(url) + '">\n' +
    '  <link rel="icon" href="../../favicon.svg" type="image/svg+xml">\n' +
    (ogImage ? '  <link rel="apple-touch-icon" href="' + escapeAttr(ogImage) + '">\n' : '') +
    '  <meta property="og:type" content="website">\n' +
    '  <meta property="og:site_name" content="Bell Time">\n' +
    '  <meta property="og:title" content="' + escapeAttr(school.name + " Bell Times — Live Countdown") + '">\n' +
    '  <meta property="og:description" content="' + escapeAttr(desc) + '">\n' +
    '  <meta property="og:url" content="' + escapeAttr(url) + '">\n' +
    (ogImage ? '  <meta property="og:image" content="' + escapeAttr(ogImage) + '">\n' : '') +
    '  <meta name="twitter:card" content="summary">\n' +
    '  <meta name="twitter:title" content="' + escapeAttr(school.name + " Bell Times") + '">\n' +
    '  <meta name="twitter:description" content="' + escapeAttr(desc) + '">\n' +
    (ogImage ? '  <meta name="twitter:image" content="' + escapeAttr(ogImage) + '">\n' : '') +
    '  <script type="application/ld+json">' + jsonLd(school, url) + '</script>';
  // Replace everything from <title> through the website JSON-LD block.
  html = html.replace(/<title>[\s\S]*?<\/script>/, head);

  // 3) Pre-render visible content (app.js overwrites it on hydrate).
  html = html.replace(
    /<h2 id="schedule-title" class="schedule-title">[\s\S]*?<\/h2>/,
    '<h2 id="schedule-title" class="schedule-title">' + escapeHtml((school.short || school.name) + " bell times") + '</h2>'
  );
  html = html.replace(
    '<ul id="periods" class="periods"></ul>',
    '<ul id="periods" class="periods">' + periodsHtml(firstDay.segs) + '</ul>'
  );
  if (school.note) {
    html = html.replace('<div id="school-note" class="school-note"></div>',
      '<div id="school-note" class="school-note">' + escapeHtml(school.note) + '</div>');
  }
  if (school.source) {
    html = html.replace(
      /<p class="foot-source" id="foot-source" hidden>[\s\S]*?<\/p>/,
      '<p class="foot-source" id="foot-source">' +
      '<a id="source-link" href="' + escapeAttr(school.source) + '" target="_blank" rel="noopener noreferrer">' +
      'Official bell times for <span id="source-name">' + escapeHtml(school.short || school.name) + '</span> &#8599;</a></p>'
    );
  }

  // 4) noscript full-week fallback, right after the schedule section.
  html = html.replace('</section>', '</section>\n    ' + noscriptHtml(school, groups));

  // 5) Tell app.js which school this page is for, and how to reach the site root
  //    for runtime-built asset URLs (logos), before it runs.
  html = html.replace('<script src="../../app.js"></script>',
    '<script>window.BELLTIME_SCHOOL_ID=' + JSON.stringify(school.id) + ';window.BELLTIME_BASE="../../";</script>\n  ' +
    '<script src="../../app.js"></script>');

  return html;
}

// ----- Sitemap + robots -----
function sitemap(schools) {
  const urls = [SITE_URL + "/"].concat(schools.map((s) => SITE_URL + "/" + SEG + "/" + s.id + "/"));
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => '  <url><loc>' + escapeHtml(u) + '</loc></url>').join("\n") +
    '\n</urlset>\n';
}
function robots() {
  return "User-agent: *\nAllow: /\n\nSitemap: " + SITE_URL + "/sitemap.xml\n";
}

// ----- Upgrade index.html's data-abs tags to absolute SITE_URL (idempotent) -----
function patchHomepage() {
  const file = path.join(ROOT, "index.html");
  let html = fs.readFileSync(file, "utf8");
  // <link rel="canonical" data-abs="/path" href="...">  and  <meta ... data-abs="/path" content="...">
  html = html.replace(/(<(?:link|meta)\b[^>]*\bdata-abs=")([^"]*)("[^>]*\b(?:href|content)=")[^"]*(")/g,
    (_m, pre, p, mid, end) => pre + p + mid + SITE_URL + p + end);
  fs.writeFileSync(file, html);
}

// ----- Run -----
function main() {
  const { schools, logos, accents, weekOverrides } = loadData();
  prepSchools(schools, accents, weekOverrides);
  const shell = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let ok = 0;
  for (const school of schools) {
    if (!school.id || !school.schedules) continue;
    const dir = path.join(OUT_DIR, school.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), schoolPage(shell, school, logos));
    ok++;
  }

  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap(schools));
  fs.writeFileSync(path.join(ROOT, "robots.txt"), robots());
  patchHomepage();

  console.log("Built " + ok + " school pages → " + SEG + "/<id>/index.html");
  console.log("Wrote sitemap.xml (" + (schools.length + 1) + " urls), robots.txt");
  console.log("Base URL: " + SITE_URL);
}

main();
