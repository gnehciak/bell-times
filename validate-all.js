/*
 * Whole-dataset check: loads data.js (all schools) exactly as the browser
 * would, then runs the app's segment-building logic against every school/day to make
 * sure no school can ever render a broken countdown.
 * Run: node validate-all.js
 */
const fs = require("fs");
const path = require("path");

const window = {};
global.window = window;
eval(fs.readFileSync(path.join(__dirname, "data.js"), "utf8"));
const weekOverrides = path.join(__dirname, "week-overrides.js");
if (fs.existsSync(weekOverrides)) eval(fs.readFileSync(weekOverrides, "utf8"));
const SCHOOLS = window.SCHOOLS;
const WEEK_OVERRIDES = window.BELLTIME_WEEK_OVERRIDES || {};

for (const s of SCHOOLS) {
  const override = WEEK_OVERRIDES[s.id];
  if (override && override.schedules) Object.assign(s.schedules, override.schedules);
}

const DAYS = ["mon", "tue", "wed", "thu", "fri"];
const toMin = (t) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(t));
  return m ? +m[1] * 60 + +m[2] : NaN;
};

let errors = 0;
const ids = new Set();

function getDayMaps(s) {
  const maps = [{ label: "base", days: s.days || {} }];
  const override = WEEK_OVERRIDES[s.id];
  const weeks = s.weeks || (override && (override.weeks || override));
  if (!weeks) return maps;
  for (const key of ["a", "b"]) {
    if (!weeks[key]) continue;
    maps.push({ label: `week ${key.toUpperCase()}`, days: weeks[key].days || weeks[key] });
  }
  return maps;
}

for (const s of SCHOOLS) {
  const tag = s.name || s.id;
  if (!s.id) { console.error(`✗ ${tag}: missing id`); errors++; }
  if (ids.has(s.id)) { console.error(`✗ duplicate id: ${s.id}`); errors++; }
  ids.add(s.id);

  for (const map of getDayMaps(s)) {
    for (const day of DAYS) {
      const key = map.days && map.days[day];
      const where = map.label === "base" ? `${tag}/${day}` : `${tag}/${map.label}/${day}`;
      if (!key) { console.error(`✗ ${where}: no schedule`); errors++; continue; }
      const sched = s.schedules && s.schedules[key];
      if (!Array.isArray(sched) || sched.length < 2) {
        console.error(`✗ ${where}: schedule "${key}" missing or too short`);
        errors++; continue;
      }
      if (!sched[sched.length - 1].terminal) {
        console.error(`✗ ${where}: schedule "${key}" not terminated`);
        errors++;
      }
      // build segments, check monotonic & sane span
      let prev = -1;
      for (const b of sched) {
        const start = toMin(b.start);
        if (Number.isNaN(start)) { console.error(`✗ ${where}: bad time ${b.start}`); errors++; break; }
        if (start < prev) { console.error(`✗ ${where}: ${b.name} ${b.start} out of order`); errors++; break; }
        if (b.end) {
          const end = toMin(b.end);
          if (end <= start) { console.error(`✗ ${where}: ${b.name} end<=start`); errors++; }
        }
        prev = start;
      }
      const first = toMin(sched[0].start);
      const last = toMin(sched[sched.length - 1].start);
      if (last - first < 120 || last - first > 600) {
        console.error(`⚠ ${where}: school day spans ${last - first} min (${sched[0].start}–${sched[sched.length-1].start}) — check`);
      }
    }
  }
}

const verified = SCHOOLS.filter((s) => s.verified).length;
const review = SCHOOLS.filter((s) => s.needsReview).length;
console.log(`\nTotal schools: ${SCHOOLS.length}  (verified: ${verified}, needs-review: ${review})`);
if (errors === 0) console.log("✓ No structural errors — every school/day builds a valid timetable.");
else { console.log(`\n${errors} structural error(s).`); process.exit(1); }
