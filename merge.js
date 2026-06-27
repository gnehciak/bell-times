/*
 * Merges crawler output (scratchpad/crawl/<slug>.json) into data.js: rewrites the
 * auto-managed block between the BELLTIME:GENERATED:START / :END markers, leaving
 * the hand-verified block above START untouched.
 *
 * Each crawl file looks like:
 * {
 *   "id": "epping-boys",
 *   "name": "Epping Boys High School",
 *   "sourceUrl": "https://.../bell-times",
 *   "found": true,
 *   "method": "html" | "image" | "none",
 *   "confidence": "high" | "medium" | "low",
 *   "notes": "…",
 *   "variants": [
 *     { "appliesTo": ["mon","tue","thu","fri"],
 *       "bells": [ {"label":"Roll Call","start":"08:45"}, … last bell = dismissal ] }
 *   ]
 * }
 *
 * Output: the BELLTIME:GENERATED region of data.js, replaced with validated objects.
 * Run: node merge.js
 */
const fs = require("fs");
const path = require("path");

const SCRATCH =
  "/private/tmp/claude-501/-Users-lkc36-Claude-Projects-school-timetable/c60237d5-e88c-4140-9a25-cdf0936fa207/scratchpad";
const CRAWL_DIR = path.join(SCRATCH, "crawl");
const VERIFY_DIR = path.join(SCRATCH, "crawl-verify");
const OUT = path.join(__dirname, "data.js");
const START_MARK = "// BELLTIME:GENERATED:START";
const END_MARK = "// BELLTIME:GENERATED:END";

// Load vision-verification overlays keyed by id. A "confirmed"/"corrected" verdict
// replaces the bulk-OCR variants with the directly-read-from-image version and marks
// the school as cross-checked (badge upgrades from "review" to "checked").
function loadVerify() {
  const map = new Map();
  let files = [];
  try { files = fs.readdirSync(VERIFY_DIR).filter((f) => f.endsWith(".json")); }
  catch (e) { return map; }
  for (const f of files) {
    try {
      const v = JSON.parse(fs.readFileSync(path.join(VERIFY_DIR, f), "utf8"));
      if (v && v.id) map.set(v.id, v);
    } catch (_) {}
  }
  return map;
}

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri"];
const toMin = (t) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(t).trim());
  if (!m) return NaN;
  return (+m[1]) * 60 + (+m[2]);
};

function cleanName(name) {
  return name.replace(/\s*\((New South Wales|NSW|Sydney|Australia)\)\s*$/i, "").trim();
}
function shortName(name) {
  return cleanName(name)
    .replace(/\s+High School$/i, "")
    .replace(/\s+Secondary College$/i, "")
    .replace(/\s+Public School$/i, "")
    .trim();
}

// Validate one variant's bells: parse, must be non-decreasing.
// Out-of-order times (mins < prev) mean garbled data -> reject the school.
// Equal times (two bells the same minute, e.g. a year-group dismissal alongside a
// transition) are collapsed: keep the first, skip the duplicate. Returns array or null.
function validBells(bells) {
  if (!Array.isArray(bells) || bells.length < 2) return null;
  let prev = -1;
  const out = [];
  for (const b of bells) {
    const mins = toMin(b.start);
    if (Number.isNaN(mins)) return null;
    if (mins < prev) return null; // genuinely out of order -> garbled
    if (mins === prev) continue; // duplicate timestamp -> drop the extra bell
    out.push({ label: String(b.label || "").trim() || "Period", mins });
    prev = mins;
  }
  return out.length >= 2 ? out : null;
}

function buildSchool(rec) {
  if (!rec || !rec.found || !Array.isArray(rec.variants) || !rec.variants.length) return null;

  // Build schedule blocks per variant; key variants by their content so identical
  // day-types collapse to one schedule.
  const schedules = {};
  const days = {};
  let keyN = 0;
  const seen = new Map();

  for (const v of rec.variants) {
    const bells = validBells(v.bells);
    if (!bells) return null; // any bad variant invalidates the school (avoid wrong countdowns)
    const appliesTo = (v.appliesTo || []).filter((d) => DAY_ORDER.includes(d));
    if (!appliesTo.length) continue;

    const signature = bells.map((b) => b.label + "@" + b.mins).join("|");
    let key = seen.get(signature);
    if (!key) {
      key = "s" + ++keyN;
      seen.set(signature, key);
      const blocks = bells.map((b, i) => {
        const o = { name: b.label, start: `${String(Math.floor(b.mins / 60)).padStart(2, "0")}:${String(b.mins % 60).padStart(2, "0")}` };
        if (i === bells.length - 1) o.terminal = true;
        return o;
      });
      schedules[key] = blocks;
    }
    appliesTo.forEach((d) => (days[d] = key));
  }

  // Need at least one weekday mapped.
  if (!Object.keys(days).length) return null;
  // Fill any missing weekdays with the most common schedule (so every weekday resolves).
  const counts = {};
  Object.values(days).forEach((k) => (counts[k] = (counts[k] || 0) + 1));
  const fallback = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  DAY_ORDER.forEach((d) => { if (!days[d]) days[d] = fallback; });

  return {
    id: rec.id,
    name: cleanName(rec.name),
    short: shortName(rec.name),
    region: "Sydney",
    note: (rec.notes || "").trim() || `Source: ${rec.sourceUrl || "schools.nsw.gov.au"}`,
    source: rec.sourceUrl || "",
    checked: !!rec.checked,
    needsReview: !rec.checked,
    confidence: rec.confidence || "low",
    days,
    schedules,
  };
}

function main() {
  let files = [];
  try { files = fs.readdirSync(CRAWL_DIR).filter((f) => f.endsWith(".json")); }
  catch (e) { console.error("No crawl dir:", CRAWL_DIR); process.exit(1); }

  const verify = loadVerify();
  const schools = [];
  const stats = { total: files.length, ok: 0, dropped: 0, notFound: 0, byMethod: {}, checked: 0 };
  const dropped = [];

  for (const f of files) {
    let rec;
    try { rec = JSON.parse(fs.readFileSync(path.join(CRAWL_DIR, f), "utf8")); }
    catch (e) { stats.dropped++; dropped.push(f + " (bad JSON)"); continue; }

    if (!rec.found) { stats.notFound++; continue; }

    // Overlay vision-verification if present and usable.
    const v = verify.get(rec.id);
    if (v && (v.verdict === "confirmed" || v.verdict === "corrected") && Array.isArray(v.variants) && v.variants.length) {
      rec.variants = v.variants;
      rec.notes = v.notes || rec.notes;
      rec.confidence = "high";
      rec.checked = true;
      if (v.verdict === "corrected") stats.checked++;
    }

    const school = buildSchool(rec);
    if (!school) { stats.dropped++; dropped.push((rec.name || f) + " (invalid times)"); continue; }
    stats.byMethod[rec.method || "?"] = (stats.byMethod[rec.method || "?"] || 0) + 1;
    schools.push(school);
    stats.ok++;
  }

  // De-dupe by id, sort alphabetically by name.
  const byId = new Map();
  for (const s of schools) if (!byId.has(s.id)) byId.set(s.id, s);
  const final = [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));

  // Splice the generated block into data.js between the BELLTIME markers, leaving
  // the hand-verified block (everything above START) untouched. Drop any crawled
  // school whose id is already verified above — the verified entry wins.
  const text = fs.readFileSync(OUT, "utf8");
  const lines = text.split("\n");
  const si = lines.findIndex((l) => l.trim() === START_MARK);
  const ei = lines.findIndex((l) => l.trim() === END_MARK);
  if (si < 0 || ei < 0 || ei < si) {
    console.error(`Markers ${START_MARK} / ${END_MARK} not found (in order) in ${OUT}.`);
    process.exit(1);
  }

  // Verified ids = ids in the hand-curated block above the START marker.
  const headBefore = lines.slice(0, si).join("\n");
  // eslint-disable-next-line no-new-func
  const verifiedSchools = new Function(headBefore + "\n];\nreturn SCHOOLS;")();
  const verifiedIds = new Set(verifiedSchools.map((s) => s.id));

  const kept = final.filter((s) => !verifiedIds.has(s.id));
  const skippedVerified = final.length - kept.length;

  const entries = kept
    .map((s) => "  " + JSON.stringify(s, null, 2).split("\n").join("\n  "))
    .join(",\n");

  const head = lines.slice(0, si + 1).join("\n"); // through the START marker line
  const tail = lines.slice(ei).join("\n"); // from the END marker line onward
  fs.writeFileSync(OUT, head + "\n" + entries + "\n" + tail);

  console.log("Crawl files:        ", stats.total);
  console.log("Generated written:  ", kept.length, skippedVerified ? `(skipped ${skippedVerified} already-verified)` : "");
  console.log("  by method:        ", JSON.stringify(stats.byMethod));
  console.log("  vision-checked:   ", final.filter((s) => s.checked).length, "(", stats.checked, "had corrections)");
  console.log("No bell times found:", stats.notFound);
  console.log("Dropped (bad data): ", stats.dropped);
  if (dropped.length) console.log("  " + dropped.slice(0, 40).join("\n  "));
  console.log("\nWrote", OUT);
}

main();
