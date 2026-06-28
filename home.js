/* Bell Times — home screen: find your school, then go to /school/<id>/. */

(function () {
  "use strict";

  const SCHOOLS = (window.SCHOOLS || []).slice().sort((a, b) =>
    (a.name || "").localeCompare(b.name || ""));
  const LOGOS = window.SCHOOL_LOGOS || {};
  const ACCENTS = window.SCHOOL_ACCENTS || {};

  // Stable fallback accent for the few schools without a logo-derived one (mirrors app.js).
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
  const accentOf = (s) => ACCENTS[s.id] || s.accent || PALETTE[hashStr(s.id || s.name) % PALETTE.length];

  const el = (id) => document.getElementById(id);
  const input = el("home-input");
  const list = el("home-list");
  const recentWrap = el("home-recent");
  const recentLabel = el("home-recent-label");
  const recentChips = el("home-recent-chips");
  const clockEl = el("home-clock");

  const escapeHtml = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  // Wrap the matched span of `name` in <mark> for the highlight; case-insensitive.
  function highlight(name, q) {
    if (!q) return escapeHtml(name);
    const i = name.toLowerCase().indexOf(q);
    if (i < 0) return escapeHtml(name);
    return escapeHtml(name.slice(0, i)) +
      '<mark class="combo-hl">' + escapeHtml(name.slice(i, i + q.length)) + "</mark>" +
      escapeHtml(name.slice(i + q.length));
  }

  function logoSwatch(s) {
    const f = LOGOS[s.id];
    const accent = ' style="--logo-accent:' + escapeHtml(accentOf(s)) + '"';
    if (f) {
      return '<span class="school-logo"' + accent + '><img src="logos/' +
        escapeHtml(f) + '" alt="" loading="lazy"></span>';
    }
    const initial = escapeHtml((s.short || s.name).trim().charAt(0).toUpperCase());
    return '<span class="school-logo is-initial"' + accent + '>' + initial + "</span>";
  }

  function go(id) { window.location.href = "school/" + encodeURIComponent(id) + "/"; }

  // ----- Combobox -----
  let matches = [];
  let active = -1;

  function close() {
    list.hidden = true;
    list.innerHTML = "";
    matches = [];
    active = -1;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }

  function render() {
    const q = input.value.trim().toLowerCase();
    if (!q) { close(); return; }
    matches = SCHOOLS.filter((s) =>
      (s.name || "").toLowerCase().includes(q) ||
      (s.short || "").toLowerCase().includes(q));

    if (!matches.length) {
      list.innerHTML = '<li class="combo-empty" role="status">No schools match “' + escapeHtml(input.value.trim()) + '”.</li>';
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      input.removeAttribute("aria-activedescendant");
      active = -1;
      return;
    }

    active = 0;
    list.innerHTML = matches.map((s, i) =>
      '<li class="combo-opt" role="option" id="home-opt-' + i + '"' +
      (i === 0 ? ' aria-selected="true"' : "") +
      ' data-id="' + escapeHtml(s.id) + '">' +
      logoSwatch(s) +
      '<span class="opt-name">' + highlight(s.name, q) + "</span>" +
      "</li>"
    ).join("");
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    syncActive();
  }

  function syncActive() {
    const opts = list.querySelectorAll(".combo-opt");
    opts.forEach((o, i) => {
      const on = i === active;
      o.classList.toggle("is-active", on);
      o.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (active >= 0 && opts[active]) {
      input.setAttribute("aria-activedescendant", "home-opt-" + active);
      opts[active].scrollIntoView({ block: "nearest" });
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  }

  function move(delta) {
    if (list.hidden || !matches.length) { render(); return; }
    active = (active + delta + matches.length) % matches.length;
    syncActive();
  }

  input.addEventListener("input", render);

  input.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); move(1); break;
      case "ArrowUp": e.preventDefault(); move(-1); break;
      case "Enter":
        if (matches.length) { e.preventDefault(); go(matches[active >= 0 ? active : 0].id); }
        break;
      case "Escape":
        if (!list.hidden) { e.preventDefault(); close(); }
        else if (input.value) { input.value = ""; close(); }
        break;
    }
  });

  list.addEventListener("mousedown", (e) => {
    // mousedown (not click) so it fires before the input blur closes the list
    const li = e.target.closest(".combo-opt");
    if (li && li.dataset.id) { e.preventDefault(); go(li.dataset.id); }
  });

  list.addEventListener("mousemove", (e) => {
    const li = e.target.closest(".combo-opt");
    if (!li) return;
    const i = [].indexOf.call(list.querySelectorAll(".combo-opt"), li);
    if (i >= 0 && i !== active) { active = i; syncActive(); }
  });

  // Close when focus leaves the search region.
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#home-search")) close();
  });

  // ----- Your schools (favourites + last viewed) -----
  function loadRecent() {
    let favs = [], last = null;
    try { favs = JSON.parse(localStorage.getItem("belltime.favourites") || "[]"); } catch (_) {}
    try { last = localStorage.getItem("belltime.school"); } catch (_) {}
    if (!Array.isArray(favs)) favs = [];

    const ids = [];
    if (last) ids.push(last);                       // last viewed leads
    favs.forEach((id) => { if (!ids.includes(id)) ids.push(id); });

    const picks = ids
      .map((id) => SCHOOLS.find((s) => s.id === id))
      .filter(Boolean)
      .slice(0, 6);

    if (!picks.length) { recentWrap.hidden = true; return; }

    recentLabel.textContent = picks.length === 1 ? "Your school" : "Your schools";
    recentChips.innerHTML = picks.map((s) =>
      '<a class="home-chip" href="school/' + encodeURIComponent(s.id) + '/">' +
      logoSwatch(s) +
      '<span class="home-chip-name">' + escapeHtml(s.short || s.name) + "</span>" +
      "</a>"
    ).join("");
    recentWrap.hidden = false;
  }

  // ----- Live clock (calm: "3:42 pm · Mon 30 Jun") -----
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let lastClock = "";
  function tickClock() {
    const d = new Date();
    let h = d.getHours();
    const ap = h >= 12 ? "pm" : "am";
    h = h % 12; if (h === 0) h = 12;
    const text = h + ":" + String(d.getMinutes()).padStart(2, "0") + " " + ap +
      " · " + DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()];
    if (text !== lastClock) { clockEl.textContent = text; lastClock = text; }
  }

  // ----- Init -----
  if (!SCHOOLS.length) return;
  loadRecent();
  tickClock();
  setInterval(tickClock, 1000);
  // Autofocus only with a precise pointer (mouse) so we don't pop the keyboard on phones.
  if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
    input.focus();
  }
})();
