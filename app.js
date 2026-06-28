/* Bell Time — live "how long is left in the period" engine. */

(function () {
  "use strict";

  const SCHOOLS = window.SCHOOLS || [];
  const WEEK_OVERRIDES = window.BELLTIME_WEEK_OVERRIDES || {};
  const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const WEEKDAYS = [
    { key: "mon", label: "Mon" },
    { key: "tue", label: "Tue" },
    { key: "wed", label: "Wed" },
    { key: "thu", label: "Thu" },
    { key: "fri", label: "Fri" },
  ];
  const WEEK_OPTIONS = [
    { key: "a", label: "Week A" },
    { key: "b", label: "Week B" },
  ];
  const RING_CIRCUMFERENCE = 2 * Math.PI * 100;
  const QUERY = new URLSearchParams(window.location.search);
  const DEMO_DAY_INDEX = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  const demoClock = createDemoClock();

  // ----- DOM -----
  const el = (id) => document.getElementById(id);
  // Stand-in for removed nodes so their (now dead) text assignments are harmless.
  const NOOP_EL = { set textContent(_) {}, get textContent() { return ""; } };
  const dom = {
    body: document.body,
    schoolSwitch: el("school-switch"),
    switchBtn: el("switch-btn"),
    switchPop: el("switch-pop"),
    brandLogo: el("brand-logo"),
    brandSchool: el("brand-school"),
    comboInput: el("school-input"),
    comboList: el("school-list"),
    clockTime: el("clock-time"),
    clockDate: el("clock-date"),
    statusChip: el("status-chip"),
    statusSub: el("status-sub"),
    ringWrap: document.querySelector(".ring-wrap"),
    ringProgress: el("ring-progress"),
    countdownLabel: el("countdown-label"),
    countdown: el("countdown"),
    countdownEnds: el("countdown-ends"),
    nowName: el("now-name") || NOOP_EL,
    nowTime: el("now-time") || NOOP_EL,
    nextName: el("next-name") || NOOP_EL,
    nextTime: el("next-time") || NOOP_EL,
    weekTabs: el("week-tabs"),
    dayTabs: el("day-tabs"),
    scheduleTitle: el("schedule-title"),
    scheduleMeta: el("schedule-meta"),
    periods: el("periods"),
    schoolNote: el("school-note"),
    dsSegs: el("ds-segs"),
    dsNow: el("ds-now"),
    dsTip: el("ds-tip"),
    daystripSec: document.querySelector(".daystrip-sec"),
    daystripSpan: el("daystrip-span"),
    daystripTicks: el("daystrip-ticks"),
    footSource: el("foot-source"),
    sourceLink: el("source-link"),
    sourceName: el("source-name"),
  };

  // ----- State -----
  let currentSchool = SCHOOLS[0];
  let selectedWeek = "a"; // fortnight cycle key for schools that publish Week A/B bells
  let selectedDay = null; // weekday key the user is viewing
  let renderedSignature = ""; // so we only rebuild the list when needed
  let comboOpen = false;
  let comboActiveIdx = -1;
  let comboMatches = []; // current filtered list
  let lastCountdownText = "";
  let lastVoiceText = "";   // last status-voice string, so we only fade on real changes
  let comboEntering = false; // true during the open render, so options stagger in once
  let tickTimer = null;     // self-correcting second-boundary scheduler handle
  let popHideTimer = null;  // defers unmounting the popover until its exit transition ends
  let smooth = null;        // live geometry the rAF loop sweeps between ticks (or null)
  const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");

  const LOGOS = window.SCHOOL_LOGOS || {}; // school id -> logo filename in logos/
  const ACCENTS = window.SCHOOL_ACCENTS || {}; // school id -> logo-derived accent colour
  const FAV_KEY = "belltime.favourites";
  let favourites = new Set(); // school ids the user has starred

  // Give every school an accent colour: prefer the one derived from its logo
  // (see derive-accents.js), then any hand-set accent, then a stable fallback.
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
    const weekOverride = WEEK_OVERRIDES[s.id];
    if (weekOverride) {
      if (weekOverride.schedules) Object.assign(s.schedules, weekOverride.schedules);
      if (!s.weeks) s.weeks = weekOverride.weeks || weekOverride;
    }
    s.accent = ACCENTS[s.id] || s.accent || PALETTE[hashStr(s.id || s.name) % PALETTE.length];
  });

  // ----- Helpers -----
  const pad = (n) => String(n).padStart(2, "0");

  function createDemoClock() {
    const hasDemoShortcut = QUERY.get("demo") === "schoolday";
    const dayKey = (QUERY.get("mockDay") || (hasDemoShortcut ? "mon" : "")).toLowerCase();
    const timeText = QUERY.get("mockTime") || (hasDemoShortcut ? "12:10" : "");
    if (!dayKey && !timeText) return null;

    const startRealMs = Date.now();
    const startFake = new Date();
    if (dayKey && DEMO_DAY_INDEX[dayKey] !== undefined) {
      const delta = (DEMO_DAY_INDEX[dayKey] - startFake.getDay() + 7) % 7;
      startFake.setDate(startFake.getDate() + delta);
    }
    if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(timeText)) {
      const [h, m, s = "0"] = timeText.split(":").map(Number);
      startFake.setHours(h, m, s, 0);
    }
    return { startRealMs, startFakeMs: startFake.getTime() };
  }

  function nowDate() {
    if (!demoClock) return new Date();
    return new Date(demoClock.startFakeMs + (Date.now() - demoClock.startRealMs));
  }

  function timeToMin(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  function classify(name) {
    const n = name.toLowerCase();
    if (/(recess|lunch|break)/.test(n)) return "break";
    if (/(assembly|staff)/.test(n)) return "event";
    return "class";
  }

  // Build normalized segments {name, type, start(min), end(min)} for a schedule.
  function buildSegments(schedule) {
    const segs = [];
    for (let i = 0; i < schedule.length; i++) {
      const b = schedule[i];
      if (b.terminal) continue;
      const start = timeToMin(b.start);
      let end;
      if (b.end) end = timeToMin(b.end);
      else if (schedule[i + 1]) end = timeToMin(schedule[i + 1].start);
      else end = start; // shouldn't happen — schedules end with a terminal
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

  function getWeekLabel(school, weekKey) {
    const weeks = getWeekCycle(school);
    const week = weeks && weeks[weekKey];
    return (week && week.label) || (weekKey === "b" ? "Week B" : "Week A");
  }

  function getFirstAvailableDay(school) {
    const weekDays = getWeekDays(school, selectedWeek);
    const first = WEEKDAYS.find((d) => weekDays[d.key]);
    return first ? first.key : "mon";
  }

  function scheduleForDay(school, dayKey) {
    const name = getWeekDays(school, selectedWeek)[dayKey];
    return name ? school.schedules[name] : null;
  }

  // Format minutes-from-midnight as "8:25am" / "1:15pm".
  function fmtClock(min) {
    let h = Math.floor(min / 60);
    const m = min % 60;
    const ap = h >= 12 ? "pm" : "am";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${pad(m)}${ap}`;
  }

  // Format a duration in seconds as M:SS or H:MM:SS.
  function fmtDuration(totalSec) {
    totalSec = Math.max(0, Math.floor(totalSec));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
    return `${m}:${pad(s)}`;
  }

  // Short hour label for day-strip ticks: "9am", "12pm", "3pm".
  function fmtHour(min) {
    let h = Math.floor(min / 60);
    const ap = h >= 12 ? "pm" : "am";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}${ap}`;
  }

  // Friendly "in 12 min" / "in 1 hr 5 min".
  function fmtUntil(totalSec) {
    const min = Math.round(totalSec / 60);
    if (min < 1) return "in under a minute";
    if (min < 60) return `in ${min} min`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `in ${h} hr ${m} min` : `in ${h} hr`;
  }

  function fmtUntilMinutes(totalSec) {
    const min = Math.round(totalSec / 60);
    if (min < 1) return "in under a minute";
    return `in ${min} min`;
  }

  function setCountdownText(text) {
    const value = String(text);
    dom.countdown.classList.toggle("is-long", (value.match(/:/g) || []).length >= 2);
    if (value === lastCountdownText) return;

    const previous = lastCountdownText;
    const firstRender = !previous;
    lastCountdownText = value;
    dom.countdown.dataset.value = value;
    dom.countdown.setAttribute("aria-label", value);
    dom.countdown.textContent = "";

    [...value].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "count-char";
      span.dataset.char = char;
      span.setAttribute("aria-hidden", "true");

      const prevChar = previous[i] || "";
      if (!firstRender && prevChar && prevChar !== char) {
        // Two independent layers so the old digit can rotate down and out
        // on its own while the new digit rotates down and in — like a drum.
        span.classList.add("is-changing");
        const out = document.createElement("span");
        out.className = "cc-layer cc-out";
        out.textContent = prevChar;
        const incoming = document.createElement("span");
        incoming.className = "cc-layer cc-in";
        incoming.textContent = char;
        span.append(out, incoming);
      } else {
        span.textContent = char;
      }
      dom.countdown.appendChild(span);
    });
  }

  // The status voice (the human sentence above the ring). On a genuine state
  // change — class→break, a day/school switch — it crossfades up instead of
  // hard-cutting; on every same-text tick it just sets the class, no motion.
  function setStatusVoice(text, stateClass) {
    const base = "status-chip " + (stateClass || "");
    const changed = lastVoiceText !== "" && text !== lastVoiceText && !REDUCE_MOTION.matches;
    lastVoiceText = text;
    dom.statusChip.textContent = text;
    dom.statusChip.className = base; // resets any prior is-swapping
    if (changed) {
      void dom.statusChip.offsetWidth; // reflow so the animation restarts cleanly
      dom.statusChip.classList.add("is-swapping");
    }
  }

  // ----- Live status for "today" -----
  // Returns the current state given seconds-from-midnight `nowSec`.
  function getStatus(segs, nowSec) {
    if (!segs.length) return { state: "none" };
    const first = segs[0];
    const last = segs[segs.length - 1];

    if (nowSec < first.start * 60) {
      return { state: "before", next: first, nextIdx: 0 };
    }
    if (nowSec >= last.end * 60) {
      return { state: "after" };
    }
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      if (nowSec >= s.start * 60 && nowSec < s.end * 60) {
        return { state: "active", current: s, idx: i, next: segs[i + 1] || null };
      }
      // gap between this segment's end and the next's start
      const nxt = segs[i + 1];
      if (nxt && nowSec >= s.end * 60 && nowSec < nxt.start * 60) {
        return { state: "gap", prev: s, next: nxt, nextIdx: i + 1 };
      }
    }
    return { state: "none" };
  }

  // ----- Searchable combobox -----
  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }
  function highlight(name, query) {
    const safe = escapeHtml(name);
    if (!query) return safe;
    const i = name.toLowerCase().indexOf(query.toLowerCase());
    if (i < 0) return safe;
    return (
      escapeHtml(name.slice(0, i)) +
      '<mark class="combo-hl">' +
      escapeHtml(name.slice(i, i + query.length)) +
      "</mark>" +
      escapeHtml(name.slice(i + query.length))
    );
  }

  // ----- Logos & favourites -----
  function logoSrc(school) {
    const f = LOGOS[school.id];
    // BELLTIME_BASE points back to the site root from deeper pages
    // (e.g. "../../" on /school/<id>/); empty on the home page.
    return f ? (window.BELLTIME_BASE || "") + "logos/" + f : null;
  }
  function fillLogo(elem, school) {
    elem.style.setProperty("--logo-accent", school.accent);
    const src = logoSrc(school);
    if (src) {
      elem.classList.remove("is-initial");
      elem.innerHTML = '<img src="' + escapeHtml(src) + '" alt="" loading="lazy">';
    } else {
      elem.classList.add("is-initial");
      elem.textContent = (school.short || school.name).trim().charAt(0).toUpperCase();
    }
  }
  function logoMarkup(school) {
    const accent = ' style="--logo-accent:' + escapeHtml(school.accent) + '"';
    const src = logoSrc(school);
    if (src) {
      return '<span class="school-logo"' + accent + '><img src="' +
        escapeHtml(src) + '" alt="" loading="lazy"></span>';
    }
    const initial = escapeHtml((school.short || school.name).trim().charAt(0).toUpperCase());
    return '<span class="school-logo is-initial"' + accent + '>' + initial + "</span>";
  }

  const STAR_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 ' +
    '5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';

  function loadFavourites() {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) favourites = new Set(JSON.parse(raw));
    } catch (_) {}
  }
  function saveFavourites() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify([...favourites])); } catch (_) {}
  }
  function toggleFavourite(id) {
    if (favourites.has(id)) favourites.delete(id);
    else favourites.add(id);
    saveFavourites();
  }

  // Favourites first, then alphabetical by name.
  function sortSchools(list) {
    return list.slice().sort((a, b) => {
      const fa = favourites.has(a.id), fb = favourites.has(b.id);
      if (fa !== fb) return fa ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }

  function filterSchools(query) {
    const q = query.trim().toLowerCase();
    if (!q) return sortSchools(SCHOOLS);
    const tokens = q.split(/\s+/);
    const matches = SCHOOLS.filter((s) => {
      const hay = (s.name + " " + (s.short || "") + " " + (s.region || "")).toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
    return sortSchools(matches);
  }

  function renderComboList(query) {
    comboMatches = filterSchools(query);
    dom.comboList.innerHTML = "";

    if (!comboMatches.length) {
      dom.comboList.innerHTML = '<li class="combo-empty">No schools match “' + escapeHtml(query) + "”.</li>";
      return;
    }

    const count = document.createElement("li");
    count.className = "combo-count";
    count.textContent =
      comboMatches.length === SCHOOLS.length
        ? SCHOOLS.length + " schools"
        : comboMatches.length + " of " + SCHOOLS.length;
    dom.comboList.appendChild(count);

    const addGroup = (label) => {
      const g = document.createElement("li");
      g.className = "combo-group";
      g.setAttribute("aria-hidden", "true");
      g.textContent = label;
      dom.comboList.appendChild(g);
    };

    let prevFav;
    comboMatches.forEach((s, i) => {
      const isFav = favourites.has(s.id);
      // Headers separate the favourites (pinned on top) from the rest.
      if (i === 0 && isFav) addGroup("Favourites");
      if (prevFav === true && !isFav) addGroup("All schools");
      prevFav = isFav;

      const li = document.createElement("li");
      li.className = "combo-opt";
      li.setAttribute("role", "option");
      li.dataset.idx = String(i);
      if (s.id === currentSchool.id) {
        li.classList.add("is-selected");
        li.setAttribute("aria-selected", "true");
      }
      if (i === comboActiveIdx) li.classList.add("is-active");
      if (comboEntering) {
        // Stagger the first screenful in on open; later (typed) re-renders don't.
        li.classList.add("combo-in");
        li.style.setProperty("--i", String(Math.min(i, 12)));
      }

      li.innerHTML =
        logoMarkup(s) +
        '<span class="opt-name">' + highlight(s.name, query) + "</span>" +
        '<button type="button" class="opt-fav' + (isFav ? " is-fav" : "") +
        '" aria-pressed="' + (isFav ? "true" : "false") +
        '" aria-label="' + (isFav ? "Remove " : "Add ") + escapeHtml(s.name) +
        (isFav ? " from favourites" : " to favourites") + '">' + STAR_SVG + "</button>";

      li.addEventListener("click", () => {
        selectSchoolById(s.id);
        closeCombo();
      });
      li.querySelector(".opt-fav").addEventListener("click", (e) => {
        e.stopPropagation(); // star toggles a favourite, it does not pick the school
        toggleFavourite(s.id);
        comboActiveIdx = -1;
        renderComboList(dom.comboInput.value);
      });
      dom.comboList.appendChild(li);
    });
  }

  function openCombo() {
    comboOpen = true;
    comboActiveIdx = -1;
    clearTimeout(popHideTimer);
    dom.switchPop.hidden = false;
    dom.switchBtn.setAttribute("aria-expanded", "true");
    dom.comboInput.value = "";
    comboEntering = true; // bakes the one-time stagger into the option rows below
    renderComboList("");
    comboEntering = false;
    // Mount in the resting (collapsed) state, then flip to open on the next
    // frame so the scale/fade transition actually runs.
    requestAnimationFrame(() => dom.switchPop.classList.add("is-open"));
    dom.comboInput.focus();
  }
  function closeCombo() {
    if (!comboOpen) return;
    comboOpen = false;
    comboActiveIdx = -1;
    dom.switchBtn.setAttribute("aria-expanded", "false");
    dom.switchPop.classList.remove("is-open");
    // Keep it mounted until the exit transition finishes, then unmount so it
    // leaves the a11y tree.
    clearTimeout(popHideTimer);
    popHideTimer = setTimeout(() => {
      if (!comboOpen) dom.switchPop.hidden = true;
    }, 180);
  }
  function moveActive(delta) {
    if (!comboOpen) { openCombo(); return; }
    if (!comboMatches.length) return;
    comboActiveIdx = (comboActiveIdx + delta + comboMatches.length) % comboMatches.length;
    const opts = dom.comboList.querySelectorAll(".combo-opt");
    opts.forEach((o, i) => o.classList.toggle("is-active", i === comboActiveIdx));
    const active = opts[comboActiveIdx];
    if (active) active.scrollIntoView({ block: "nearest" });
  }
  function selectSchoolById(id) {
    // Picking a school always lands you on that school's own URL (/school/<id>/),
    // so the address bar, title and canonical reflect the choice. From a school
    // page we hop to a sibling (../<id>/); from the home page we go into school/.
    const pinned = window.BELLTIME_SCHOOL_ID;
    if (id !== pinned) {
      const base = pinned ? "../" : "school/";
      window.location.href = base + encodeURIComponent(id) + "/";
      return;
    }
    const s = SCHOOLS.find((x) => x.id === id);
    if (s) applySchool(s);
  }

  function buildWeekTabs() {
    const weeks = getWeekCycle(currentSchool);
    dom.weekTabs.innerHTML = "";

    if (!weeks) {
      dom.weekTabs.hidden = true;
      return;
    }

    dom.weekTabs.hidden = false;
    WEEK_OPTIONS.forEach((w) => {
      if (!weeks[w.key]) return;
      const btn = document.createElement("button");
      btn.className = "week-seg";
      btn.type = "button";
      btn.dataset.week = w.key;
      btn.textContent = getWeekLabel(currentSchool, w.key);
      btn.setAttribute("aria-pressed", w.key === selectedWeek ? "true" : "false");
      if (w.key === selectedWeek) btn.classList.add("is-active");
      btn.addEventListener("click", () => {
        selectedWeek = w.key;
        renderedSignature = "";
        try { localStorage.setItem("belltime.week", selectedWeek); } catch (_) {}
        const todayKey = DAY_KEYS[nowDate().getDay()];
        if (!getWeekDays(currentSchool, selectedWeek)[selectedDay]) {
          selectedDay = getWeekDays(currentSchool, selectedWeek)[todayKey] ? todayKey : getFirstAvailableDay(currentSchool);
        }
        buildWeekTabs();
        buildDayTabs(todayKey);
        tick();
      });
      dom.weekTabs.appendChild(btn);
    });
  }

  function buildDayTabs(todayKey) {
    dom.dayTabs.innerHTML = "";
    const weekDays = getWeekDays(currentSchool, selectedWeek);
    WEEKDAYS.forEach((d) => {
      const btn = document.createElement("button");
      btn.className = "day-tab";
      btn.type = "button";
      btn.dataset.day = d.key;
      btn.innerHTML =
        d.label + (d.key === todayKey ? '<span class="today-dot" title="Today"></span>' : "");
      if (d.key === selectedDay) btn.classList.add("is-active");
      const hasSchedule = !!weekDays[d.key];
      if (!hasSchedule) {
        btn.disabled = true;
        btn.style.opacity = "0.4";
        btn.style.cursor = "not-allowed";
      }
      btn.addEventListener("click", () => {
        selectedDay = d.key;
        renderedSignature = "";
        buildDayTabs(todayKey);
        tick();
      });
      dom.dayTabs.appendChild(btn);
    });
  }

  // Rebuild the schedule list (only when school/day changes).
  function renderScheduleList(segs) {
    dom.scheduleTitle.textContent = currentSchool.short;
    const span = segs.length ? `${fmtClock(segs[0].start)} – ${fmtClock(segs[segs.length - 1].end)}` : "";
    dom.scheduleMeta.textContent = span;

    dom.periods.innerHTML = "";
    segs.forEach((s, i) => {
      const li = document.createElement("li");
      li.className = "period";
      li.dataset.type = s.type;
      li.dataset.idx = String(i);
      li.style.setProperty("--i", String(Math.min(i, 14))); // cap the entrance stagger
      li.innerHTML =
        '<span class="dot"></span>' +
        `<span class="p-name">${s.name}</span>` +
        `<span class="p-range">${fmtClock(s.start)} – ${fmtClock(s.end)}</span>` +
        '<div class="p-bar"><span></span></div>';
      dom.periods.appendChild(li);
    });

    dom.schoolNote.textContent = currentSchool.note || "";
  }

  // Build the day-strip: every period (and gap) as a block scaled to its real
  // duration, plus hour ticks. Rebuilt only when the school/day changes.
  function renderDayStrip(segs) {
    dom.dsSegs.innerHTML = "";
    dom.daystripTicks.innerHTML = "";
    if (!segs.length) {
      dom.daystripSpan.textContent = "";
      return;
    }
    const dayStart = segs[0].start;
    const dayEnd = segs[segs.length - 1].end;
    const span = dayEnd - dayStart || 1;
    dom.daystripSpan.textContent = `${fmtClock(dayStart)} – ${fmtClock(dayEnd)}`;

    // Each block carries its own real start/end and a fill child; the live
    // update scales that fill so the elapsed slice wears the period's colour.
    const addFill = (seg, start, end) => {
      seg.dataset.start = String(start);
      seg.dataset.end = String(end);
      const fill = document.createElement("span");
      fill.className = "ds-seg-fill";
      seg.appendChild(fill);
    };

    let prevEnd = dayStart;
    let stripOrder = 0; // left-to-right entrance index across gaps + blocks
    segs.forEach((s, i) => {
      if (s.start > prevEnd) {
        const gap = document.createElement("div");
        gap.className = "ds-seg";
        gap.dataset.type = "gap";
        gap.style.flexGrow = String(s.start - prevEnd);
        gap.style.setProperty("--i", String(Math.min(stripOrder++, 16)));
        addFill(gap, prevEnd, s.start);
        dom.dsSegs.appendChild(gap);
      }
      const seg = document.createElement("div");
      seg.className = "ds-seg";
      seg.dataset.type = s.type;
      seg.dataset.segIdx = String(i);
      seg.dataset.label = s.name;
      seg.dataset.range = `${fmtClock(s.start)} – ${fmtClock(s.end)}`;
      seg.style.flexGrow = String(Math.max(1, s.end - s.start));
      seg.style.setProperty("--i", String(Math.min(stripOrder++, 16)));
      addFill(seg, s.start, s.end);
      dom.dsSegs.appendChild(seg);
      prevEnd = s.end;
    });

    for (let h = Math.ceil(dayStart / 60); h <= Math.floor(dayEnd / 60); h++) {
      const min = h * 60;
      const tick = document.createElement("span");
      tick.className = "ds-tick";
      tick.style.left = (((min - dayStart) / span) * 100).toFixed(2) + "%";
      tick.textContent = fmtHour(min);
      dom.daystripTicks.appendChild(tick);
    }
  }

  // Hover tooltip: name the block under the cursor, floated above the strip and
  // tinted to its type. Delegated so it survives every day-strip rebuild.
  function initDayStripTip() {
    const tip = dom.dsTip, segs = dom.dsSegs, sec = dom.daystripSec;
    if (!tip || !segs || !sec) return;
    const nameEl = tip.querySelector(".ds-tip-name");
    const timeEl = tip.querySelector(".ds-tip-time");
    const hide = () => { tip.classList.remove("is-visible"); tip.setAttribute("aria-hidden", "true"); };

    segs.addEventListener("mouseover", (e) => {
      const seg = e.target.closest(".ds-seg");
      if (!seg || seg.dataset.type === "gap" || !seg.dataset.label) { hide(); return; }
      nameEl.textContent = seg.dataset.label;
      timeEl.textContent = seg.dataset.range || "";
      tip.dataset.type = seg.dataset.type || "class";

      const secRect = sec.getBoundingClientRect();
      const segRect = seg.getBoundingClientRect();
      const half = tip.offsetWidth / 2;
      let x = segRect.left + segRect.width / 2 - secRect.left;
      x = Math.min(secRect.width - half - 2, Math.max(half + 2, x));
      tip.style.left = x.toFixed(1) + "px";
      tip.style.top = (segRect.top - secRect.top) + "px";
      tip.classList.add("is-visible");
      tip.setAttribute("aria-hidden", "false");
    });
    segs.addEventListener("mouseleave", hide);
  }

  // Update the live overlay on the day-strip: elapsed scrim, now marker, current block.
  function updateDayStripLive(segs, nowMin, status) {
    if (!segs.length) { setDayStripIdle(); return; }
    const dayStart = segs[0].start;
    const dayEnd = segs[segs.length - 1].end;
    const span = dayEnd - dayStart || 1;
    let frac = (nowMin - dayStart) / span;
    const within = frac >= 0 && frac <= 1;
    frac = Math.min(1, Math.max(0, frac));

    dom.dsNow.hidden = !within;
    if (within) dom.dsNow.style.left = (frac * 100).toFixed(3) + "%";

    const curIdx = status && status.state === "active" ? status.idx : -1;
    dom.dsSegs.querySelectorAll(".ds-seg").forEach((sg) => {
      sg.classList.toggle("is-current", sg.dataset.segIdx !== undefined && Number(sg.dataset.segIdx) === curIdx);
      const fill = sg.firstElementChild;
      if (!fill) return;
      const segStart = Number(sg.dataset.start);
      const segSpan = Number(sg.dataset.end) - segStart || 1;
      const f = Math.min(1, Math.max(0, (nowMin - segStart) / segSpan));
      fill.style.transform = `scaleX(${f})`;
    });
  }

  // Day-strip with no live position (previewing another day, or weekend).
  function setDayStripIdle() {
    dom.dsNow.hidden = true;
    dom.dsSegs.querySelectorAll(".ds-seg-fill").forEach((f) => { f.style.transform = "scaleX(0)"; });
    dom.dsSegs.querySelectorAll(".ds-seg.is-current").forEach((sg) => sg.classList.remove("is-current"));
  }

  // Reset the hero to an "idle" (not in a period) look.
  function setIdleHero(chipText, chipClass, sub, bigText, bigLabel) {
    setStatusVoice(chipText, chipClass || "is-idle");
    dom.statusSub.textContent = sub || "";
    dom.ringWrap.classList.remove("is-break");
    dom.ringProgress.style.strokeDashoffset = RING_CIRCUMFERENCE; // empty ring
    dom.ringProgress.style.opacity = "0";
    dom.countdownLabel.textContent = bigLabel || "";
    setCountdownText(bigText);
    dom.countdownEnds.textContent = "";
  }

  function setRingProgress(fraction) {
    const f = Math.min(1, Math.max(0, fraction));
    dom.ringProgress.style.strokeDasharray = RING_CIRCUMFERENCE;
    dom.ringProgress.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - f);
    dom.ringProgress.style.opacity = "1";
  }

  // The live layer sweeps continuously: rather than CSS-tweening between the
  // per-second snapshots tick() writes (which stutters — the tween restarts each
  // second and never quite finishes), we recompute the exact elapsed fraction
  // from real time every animation frame and drive the ring arc, the day-strip
  // marker + current fill, and the active row's progress bar straight from it.
  // tick() still writes the same values once a second, so reduced-motion users
  // (for whom this loop no-ops) and the first paint stay correct.
  function frame() {
    requestAnimationFrame(frame);
    if (REDUCE_MOTION.matches || !smooth) return;

    const now = nowDate();
    const nowSec =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds() / 1000;

    const span = smooth.dayEnd - smooth.dayStart || 1;
    const dayFrac = (nowSec - smooth.dayStart) / span;
    if (dayFrac >= 0 && dayFrac <= 1) {
      dom.dsNow.hidden = false;
      dom.dsNow.style.left = (dayFrac * 100).toFixed(3) + "%";
    }

    const a = smooth.active;
    if (a) {
      let ef = (nowSec - a.startSec) / ((a.endSec - a.startSec) || 1);
      ef = ef < 0 ? 0 : ef > 1 ? 1 : ef;
      // Ring shows time remaining, so the drawn-away arc grows with elapsed time.
      dom.ringProgress.style.strokeDashoffset = (RING_CIRCUMFERENCE * ef).toFixed(2);
      const sx = "scaleX(" + ef.toFixed(4) + ")";
      if (a.fillEl) a.fillEl.style.transform = sx;
      if (a.barEl) a.barEl.style.transform = sx;
    }
  }

  // Clear active/past classes from the list.
  function clearListStates() {
    dom.periods.querySelectorAll(".period").forEach((li) => {
      li.classList.remove("is-active", "is-past");
      const bar = li.querySelector(".p-bar > span");
      if (bar) bar.style.transform = ""; // let CSS drive empty/full
    });
  }

  function markList(status, segs) {
    clearListStates();
    const items = dom.periods.querySelectorAll(".period");
    if (status.state === "active") {
      items.forEach((li, i) => {
        if (i < status.idx) li.classList.add("is-past");
      });
      const li = items[status.idx];
      if (li) {
        li.classList.add("is-active");
        const span = li.querySelector(".p-bar > span");
        if (span) span.style.transform = "scaleX(" + Math.min(1, Math.max(0, status._fraction)).toFixed(4) + ")";
      }
    } else if (status.state === "after") {
      items.forEach((li) => li.classList.add("is-past"));
    } else if (status.state === "gap" || status.state === "before") {
      const upcomingIdx = status.nextIdx;
      items.forEach((li, i) => {
        if (i < upcomingIdx) li.classList.add("is-past");
      });
    }
  }

  // ----- Main tick -----
  function tick() {
    const now = nowDate();
    const todayKey = DAY_KEYS[now.getDay()];

    // Clock
    dom.clockTime.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    dom.clockDate.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "short",
    });

    if (selectedDay === null) {
      selectedDay = getWeekDays(currentSchool, selectedWeek)[todayKey] ? todayKey : getFirstAvailableDay(currentSchool);
    } else if (!getWeekDays(currentSchool, selectedWeek)[selectedDay]) {
      selectedDay = getFirstAvailableDay(currentSchool);
    }

    const dayLabelFull = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday" }[selectedDay];
    const weekLabel = getWeekCycle(currentSchool) ? getWeekLabel(currentSchool, selectedWeek) : "";
    const previewLabel = weekLabel ? `${weekLabel} ${dayLabelFull}` : dayLabelFull;
    const schedule = scheduleForDay(currentSchool, selectedDay);
    const segs = schedule ? buildSegments(schedule) : [];

    // Rebuild the list only when the school/day actually changed.
    const sig = currentSchool.id + "|" + selectedWeek + "|" + selectedDay;
    if (sig !== renderedSignature) {
      renderScheduleList(segs);
      renderDayStrip(segs);
      renderedSignature = sig;
    }

    const isToday = selectedDay === todayKey;

    if (!isToday) {
      // Previewing another day — show a static summary, no live countdown.
      const weekendNote = todayKey === "sat" || todayKey === "sun";
      setIdleHero(
        "Preview",
        "is-idle",
        weekendNote
          ? `It's the weekend — here's ${previewLabel}'s schedule.`
          : `Previewing ${previewLabel} (not today).`,
        segs.length ? `${segs.length}` : "—",
        "Periods"
      );
      dom.countdownEnds.textContent = segs.length
        ? `${fmtClock(segs[0].start)} – ${fmtClock(segs[segs.length - 1].end)}`
        : "";
      dom.nowName.textContent = weekendNote ? "Weekend" : "Not today";
      dom.nowTime.textContent = "";
      dom.nextName.textContent = segs.length ? segs[0].name : "—";
      dom.nextTime.textContent = segs.length ? "starts " + fmtClock(segs[0].start) : "";
      clearListStates();
      setDayStripIdle();
      smooth = null; // previewing another day — nothing sweeps
      document.title = "Bell Time";
      return;
    }

    // Live mode for today.
    const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const status = getStatus(segs, nowSec);
    updateDayStripLive(segs, nowSec / 60, status);

    if (status.state === "active") {
      const s = status.current;
      const endSec = s.end * 60;
      const startSec = s.start * 60;
      const remain = endSec - nowSec;
      const fraction = (nowSec - startSec) / (endSec - startSec);
      status._fraction = fraction;

      const isBreak = s.type === "break";
      setStatusVoice(s.name, isBreak ? "is-break" : "");
      dom.statusSub.textContent = isBreak ? "On break" : "In class";

      dom.ringWrap.classList.toggle("is-break", isBreak);
      // Ring shows time REMAINING (drains as the period progresses).
      setRingProgress(1 - fraction);

      dom.countdownLabel.textContent = "Time left";
      setCountdownText(fmtDuration(remain));
      dom.countdownEnds.textContent = `ends ${fmtClock(s.end)}`;
      document.title = `${fmtDuration(remain)} · ${s.name}`;

      dom.nowName.textContent = s.name;
      dom.nowTime.textContent = `${fmtClock(s.start)} – ${fmtClock(s.end)}`;
      if (status.next) {
        dom.nextName.textContent = status.next.name;
        dom.nextTime.textContent = `starts ${fmtUntilMinutes(status.next.start * 60 - nowSec)}`;
      } else {
        dom.nextName.textContent = "End of day";
        dom.nextTime.textContent = "last period";
      }
    } else if (status.state === "gap") {
      const remain = status.next.start * 60 - nowSec;
      status._fraction = 0;
      setIdleHero(
        "Between bells",
        "is-idle",
        "Short transition between periods.",
        fmtDuration(remain),
        `${status.next.name} starts in`
      );
      dom.countdownEnds.textContent = `at ${fmtClock(status.next.start)}`;
      document.title = `${fmtDuration(remain)} → ${status.next.name}`;
      dom.nowName.textContent = "Transition";
      dom.nowTime.textContent = `until ${fmtClock(status.next.start)}`;
      dom.nextName.textContent = status.next.name;
      dom.nextTime.textContent = `starts ${fmtUntilMinutes(remain)}`;
    } else if (status.state === "before") {
      const remain = status.next.start * 60 - nowSec;
      setIdleHero(
        "Before school",
        "is-idle",
        `School starts ${fmtUntil(remain)}.`,
        fmtDuration(remain),
        `${status.next.name} starts in`
      );
      dom.countdownEnds.textContent = `at ${fmtClock(status.next.start)}`;
      document.title = `${fmtDuration(remain)} → ${status.next.name}`;
      dom.nowName.textContent = "Not started";
      dom.nowTime.textContent = "";
      dom.nextName.textContent = status.next.name;
      dom.nextTime.textContent = `starts ${fmtUntilMinutes(remain)}`;
    } else if (status.state === "after") {
      setIdleHero("School's out", "is-idle", "All periods are done for today.", "Done", "Today");
      document.title = "School's out · Bell Time";
      dom.nowName.textContent = "Finished";
      dom.nowTime.textContent = "";
      dom.nextName.textContent = "—";
      dom.nextTime.textContent = "See you tomorrow";
    } else {
      setIdleHero("No schedule", "is-idle", "No bell times for today.", "—", "");
      document.title = "Bell Time";
      dom.nowName.textContent = "—";
      dom.nextName.textContent = "—";
    }

    markList(status, segs);

    // Publish what the rAF loop should sweep this second. Only states with
    // genuinely moving geometry qualify: an active period (ring + marker + fill +
    // bar) or a transition gap (just the marker crossing the day).
    if (segs.length && status.state === "active") {
      smooth = {
        dayStart: segs[0].start * 60,
        dayEnd: segs[segs.length - 1].end * 60,
        active: {
          startSec: status.current.start * 60,
          endSec: status.current.end * 60,
          fillEl: dom.dsSegs.querySelector(".ds-seg.is-current > .ds-seg-fill"),
          barEl: dom.periods.querySelector(".period.is-active .p-bar > span"),
        },
      };
    } else if (segs.length && status.state === "gap") {
      smooth = {
        dayStart: segs[0].start * 60,
        dayEnd: segs[segs.length - 1].end * 60,
        active: null,
      };
    } else {
      smooth = null;
    }
  }

  // ----- School switching -----
  function applySchool(school) {
    currentSchool = school;
    document.documentElement.style.setProperty("--accent", school.accent);
    dom.body.dataset.school = school.id;
    dom.brandSchool.textContent = school.name;
    fillLogo(dom.brandLogo, school);
    // Link to the school's official bell-times page when we have one on record.
    if (school.source) {
      dom.sourceLink.href = school.source;
      dom.sourceName.textContent = school.short || school.name;
      dom.footSource.hidden = false;
    } else {
      dom.footSource.hidden = true;
    }
    try { localStorage.setItem("belltime.school", school.id); } catch (_) {}
    // Reset to today's view for the new school.
    const todayKey = DAY_KEYS[nowDate().getDay()];
    selectedDay = getWeekDays(school, selectedWeek)[todayKey] ? todayKey : getFirstAvailableDay(school);
    renderedSignature = "";
    buildWeekTabs();
    buildDayTabs(todayKey);
    tick();
  }

  // ----- Init -----
  function wireSwitch() {
    dom.switchBtn.addEventListener("click", () => {
      if (comboOpen) closeCombo();
      else openCombo();
    });
    dom.comboInput.addEventListener("input", () => {
      comboActiveIdx = -1;
      renderComboList(dom.comboInput.value);
    });
    dom.comboInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const pick = comboMatches[comboActiveIdx] || comboMatches[0];
        if (pick) { selectSchoolById(pick.id); closeCombo(); dom.switchBtn.focus(); }
      }
    });
    // Close on click outside the switch control.
    document.addEventListener("mousedown", (e) => {
      if (comboOpen && !dom.schoolSwitch.contains(e.target)) closeCombo();
    });
    // Close on Escape from anywhere inside the popover.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && comboOpen) { closeCombo(); dom.switchBtn.focus(); }
    });
  }

  function init() {
    if (!SCHOOLS.length) return;

    let saved = null;
    try {
      saved = localStorage.getItem("belltime.school");
      const savedWeek = localStorage.getItem("belltime.week");
      if (savedWeek === "a" || savedWeek === "b") selectedWeek = savedWeek;
    } catch (_) {}
    // A per-school page pins its school via window.BELLTIME_SCHOOL_ID; otherwise
    // restore the last-viewed school, else default to the first.
    const pinned = window.BELLTIME_SCHOOL_ID;
    const start =
      (pinned && SCHOOLS.find((s) => s.id === pinned)) ||
      SCHOOLS.find((s) => s.id === saved) ||
      SCHOOLS[0];

    loadFavourites();
    wireSwitch();
    initDayStripTip();
    applySchool(start);

    // Self-correcting clock: re-aim at each real second boundary so the
    // countdown never skips or double-ticks if a timer fires late.
    const loop = () => {
      tick();
      const delay = 1000 - nowDate().getMilliseconds();
      tickTimer = setTimeout(loop, delay);
    };
    loop();

    // Continuous sweep for the live layer (ring, day-strip marker/fill, bar).
    frame();

    // The first render lands instantly (no load choreography); only *after* it
    // do schedule/day-strip swaps earn their staggered entrance.
    requestAnimationFrame(() => document.body.classList.add("anim-ready"));
  }

  init();
})();
