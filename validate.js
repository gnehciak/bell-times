/*
 * Sanity-checks the bell-time data:
 *  - every start time parses
 *  - times are strictly increasing through each schedule
 *  - every schedule ends with a terminal marker
 * Run with: node validate.js
 */
const fs = require("fs");
const path = require("path");

// Load data.js in a tiny shim (it expects a `window`).
const src = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");
const window = {};
eval(src.replace("window.SCHOOLS", "global.__OUT"));
const SCHOOLS = global.__OUT;

const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

let errors = 0;
let blocks = 0;

function getDayMaps(school) {
  const maps = [{ label: "base", days: school.days || {} }];
  if (!school.weeks) return maps;
  for (const key of ["a", "b"]) {
    if (!school.weeks[key]) continue;
    maps.push({ label: `week ${key.toUpperCase()}`, days: school.weeks[key].days || school.weeks[key] });
  }
  return maps;
}

for (const school of SCHOOLS) {
  for (const [key, schedule] of Object.entries(school.schedules)) {
    if (!schedule.length) {
      console.error(`✗ ${school.short} / ${key}: empty schedule`);
      errors++;
      continue;
    }
    if (!schedule[schedule.length - 1].terminal) {
      console.error(`✗ ${school.short} / ${key}: last entry must be terminal`);
      errors++;
    }
    let prevStart = -1;
    for (let i = 0; i < schedule.length; i++) {
      const b = schedule[i];
      blocks++;
      const start = toMin(b.start);
      if (Number.isNaN(start)) {
        console.error(`✗ ${school.short} / ${key}: bad start "${b.start}" on ${b.name}`);
        errors++;
        continue;
      }
      if (start <= prevStart) {
        console.error(
          `✗ ${school.short} / ${key}: "${b.name}" (${b.start}) not after previous (${fmt(prevStart)})`
        );
        errors++;
      }
      if (b.end) {
        const end = toMin(b.end);
        if (end <= start) {
          console.error(`✗ ${school.short} / ${key}: "${b.name}" end ${b.end} <= start ${b.start}`);
          errors++;
        }
        if (i + 1 < schedule.length && end > toMin(schedule[i + 1].start)) {
          console.error(`✗ ${school.short} / ${key}: "${b.name}" end ${b.end} overlaps next`);
          errors++;
        }
      }
      prevStart = start;
    }
  }
  // every weekday maps to a real schedule
  for (const map of getDayMaps(school)) {
    for (const [day, sched] of Object.entries(map.days)) {
      if (!school.schedules[sched]) {
        const prefix = map.label === "base" ? "" : `${map.label} `;
        console.error(`✗ ${school.short}: ${prefix}day "${day}" -> missing schedule "${sched}"`);
        errors++;
      }
    }
  }
}

if (errors === 0) {
  console.log(`✓ All good — ${SCHOOLS.length} schools, ${blocks} blocks, no problems found.`);
  process.exit(0);
} else {
  console.error(`\n${errors} problem(s) found.`);
  process.exit(1);
}
