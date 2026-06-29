/*
 * Bell Times — extension background service worker.
 *
 * Keeps the toolbar in sync even while the popup is closed:
 *   • the toolbar ICON becomes the selected school's logo (composited onto a
 *     light rounded tile so it reads on any toolbar, light or dark);
 *   • the BADGE shows how many minutes are left in the current period.
 *
 * It recomputes every 30s (chrome.alarms) and the instant the chosen school
 * or week changes (the popup mirrors those to chrome.storage). The schedule math
 * mirrors app.js — the same small, stable helpers build-pages.js also copies —
 * so there's still one source of truth for the data, just two readers of it.
 */

// The data files attach to `window`; give them one in the worker scope, then load
// them into the global scope. They declare top-level globals (e.g. `const SCHOOLS`
// in data.js), so everything below runs inside an IIFE — exactly like app.js — to
// keep our own names out of that shared scope and avoid a redeclaration clash.
self.window = self;
importScripts("data.js", "logos.generated.js", "accents.generated.js", "week-overrides.js");

(function () {
  "use strict";

  const SCHOOLS = self.SCHOOLS || [];
  const LOGOS = self.SCHOOL_LOGOS || {};
  const ACCENTS = self.SCHOOL_ACCENTS || {};
  const WEEK_OVERRIDES = self.BELLTIME_WEEK_OVERRIDES || {};
  const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const DEFAULT_ICON = { 16: "icons/icon-16.png", 48: "icons/icon-48.png", 128: "icons/icon-128.png" };
  const CLASS_FALLBACK = "#2563eb"; // when a school has no usable hex accent
  const BREAK_COLOR = "#b45309";    // deep amber — white badge text stays legible
  const TILE_BG = "#eef1f4";        // matches the default icon tile

  // ----- Prep schools exactly as app.js does (week overrides + accent) -------
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
  SCHOOLS.forEach((s) => {
    const wo = WEEK_OVERRIDES[s.id];
    if (wo) {
      if (wo.schedules) Object.assign(s.schedules, wo.schedules);
      if (!s.weeks) s.weeks = wo.weeks || wo;
    }
    s.accent = ACCENTS[s.id] || s.accent || PALETTE[hashStr(s.id || s.name) % PALETTE.length];
  });

  // ----- Schedule helpers (mirror app.js) ------------------------------------
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
  function getWeekCycle(school) {
    return school && school.weeks && school.weeks.a && school.weeks.b ? school.weeks : null;
  }
  function getWeekDays(school, weekKey) {
    const weeks = getWeekCycle(school);
    if (!weeks) return school.days || {};
    const week = weeks[weekKey] || weeks.a;
    return week.days || week;
  }
  function scheduleForDay(school, weekKey, dayKey) {
    const name = getWeekDays(school, weekKey)[dayKey];
    return name ? school.schedules[name] : null;
  }
  function getStatus(segs, nowSec) {
    if (!segs.length) return { state: "none" };
    const first = segs[0];
    const last = segs[segs.length - 1];
    if (nowSec < first.start * 60) return { state: "before", next: first };
    if (nowSec >= last.end * 60) return { state: "after" };
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      if (nowSec >= s.start * 60 && nowSec < s.end * 60) {
        return { state: "active", current: s, next: segs[i + 1] || null };
      }
      const nxt = segs[i + 1];
      if (nxt && nowSec >= s.end * 60 && nowSec < nxt.start * 60) {
        return { state: "gap", next: nxt };
      }
    }
    return { state: "none" };
  }

  const isHex = (c) => /^#[0-9a-f]{6}$/i.test(c || "");
  // Round to the NEAREST minute, not up: 30:29 left → "30", 30:31 left → "31".
  // Floored at 1 so the badge never shows "0" — it clears when the period ends.
  const minsLabel = (sec) => { const m = Math.max(1, Math.round(sec / 60)); return m > 99 ? "99+" : String(m); };

  // ----- Selected school (mirrored from the popup) ---------------------------
  async function getSelection() {
    let id, week = "a";
    try {
      const o = await chrome.storage.local.get(["belltime.school", "belltime.week"]);
      id = o["belltime.school"];
      if (o["belltime.week"] === "b") week = "b";
    } catch (_) {}
    return { school: SCHOOLS.find((s) => s.id === id) || SCHOOLS[0], week };
  }

  // ----- Toolbar icon = school logo on a light tile --------------------------
  let lastIconId = null; // only redraw when the school changes

  function drawTile(bmp, size) {
    const c = new OffscreenCanvas(size, size);
    const ctx = c.getContext("2d");
    const r = size * 0.22;
    ctx.fillStyle = TILE_BG;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(0, 0, size, size, r); ctx.fill(); }
    else ctx.fillRect(0, 0, size, size);
    // Contain the logo with a little padding; never distort its aspect ratio.
    const pad = size * 0.15;
    const avail = size - pad * 2;
    const scale = Math.min(avail / bmp.width, avail / bmp.height);
    const w = bmp.width * scale, h = bmp.height * scale;
    ctx.drawImage(bmp, (size - w) / 2, (size - h) / 2, w, h);
    return ctx.getImageData(0, 0, size, size);
  }
  async function setSchoolIcon(school) {
    if (!school || school.id === lastIconId) return;
    const file = LOGOS[school.id];
    if (!file) { chrome.action.setIcon({ path: DEFAULT_ICON }); lastIconId = school.id; return; }
    try {
      const blob = await (await fetch(chrome.runtime.getURL("logos/" + file))).blob();
      const bmp = await createImageBitmap(blob);
      await chrome.action.setIcon({ imageData: { 16: drawTile(bmp, 16), 32: drawTile(bmp, 32) } });
      bmp.close();
      lastIconId = school.id;
    } catch (_) {
      chrome.action.setIcon({ path: DEFAULT_ICON });
      lastIconId = school.id;
    }
  }

  // ----- The 30-second refresh -----------------------------------------------
  async function update() {
    if (!SCHOOLS.length) return;
    const { school, week } = await getSelection();
    await setSchoolIcon(school);

    const now = new Date();
    const todayKey = DAY_KEYS[now.getDay()];
    const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const schedule = scheduleForDay(school, week, todayKey);
    const segs = schedule ? buildSegments(schedule) : [];
    const status = getStatus(segs, nowSec);

    let text = "", color = CLASS_FALLBACK;
    if (status.state === "active") {
      text = minsLabel(status.current.end * 60 - nowSec);
      color = status.current.type === "break" ? BREAK_COLOR : (isHex(school.accent) ? school.accent : CLASS_FALLBACK);
    } else if (status.state === "gap") {
      text = minsLabel(status.next.start * 60 - nowSec);
      color = BREAK_COLOR; // a transition between periods
    }
    // before school / after / weekend / no schedule → clear the badge (the logo
    // icon still shows which school you're tracking).

    chrome.action.setBadgeText({ text });
    if (text) {
      chrome.action.setBadgeBackgroundColor({ color });
      if (chrome.action.setBadgeTextColor) chrome.action.setBadgeTextColor({ color: "#ffffff" });
    }
    // Tooltip names the school so the bare logo isn't ambiguous on hover.
    chrome.action.setTitle({ title: school ? "Bell Times — " + school.name : "Bell Times" });
  }

  // ----- Wake-ups ------------------------------------------------------------
  // 0.5 = 30s, the minimum Chrome honours for a published MV3 extension. Keeps the
  // whole-minute badge flipping within 30s of the real boundary instead of lagging
  // up to a full minute behind a once-a-minute wake (and longer when a tick slips).
  function ensureAlarm() { chrome.alarms.create("tick", { periodInMinutes: 0.5 }); }

  chrome.runtime.onInstalled.addListener(() => { ensureAlarm(); update(); });
  chrome.runtime.onStartup.addListener(() => { ensureAlarm(); update(); });
  chrome.alarms.onAlarm.addListener((a) => { if (a.name === "tick") update(); });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes["belltime.school"]) lastIconId = null; // force an icon redraw
    if (changes["belltime.school"] || changes["belltime.week"]) update();
  });

  // Run once on every cold start (an alarm or click that woke the worker).
  ensureAlarm();
  update();
})();
