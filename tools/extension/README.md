# Bell Times — browser extension

A Chrome (MV3) extension that puts the live period countdown one click away in the
toolbar. **It is the same app as the website** — there is no second codebase to
maintain. A build script assembles the same `app.js` / `styles.css` / `data.js`
(and the generated data files + `logos/`) into a loadable extension, and turns the
per-school app shell (`tools/school-shell.html`) into the popup.

## Build it

```bash
npm run build:extension        # → extension/ (generated, git/vercel-ignored)
```

Then load it once: open `chrome://extensions`, enable **Developer mode**, click
**Load unpacked**, and pick the `extension/` folder.

To pick up website changes later, just re-run `npm run build:extension` and hit the
**↻ reload** on the extension card. (Data, styles, and logic all come from the site
files, so this is the only step.)

## How "one codebase" works

`tools/build-extension.js`:

1. copies the runtime files the browser loads (`app.js`, `styles.css`, `data.js`,
   `logos.generated.js`, `accents.generated.js`, `week-overrides.js`, `favicon.svg`,
   `logos/`) into `extension/` verbatim;
2. adds the extension-only sources from this folder — `popup.css` (the popup form
   factor), `sw.js` (the background worker), and `icons/` (the default PNGs);
3. transforms `tools/school-shell.html` → `extension/popup.html`: drops the SEO/
   social `<head>`, marks `<body class="extension">`, links `popup.css`, and points
   the brand link at the live site (the popup has no home page);
4. writes `extension/manifest.json` (version synced from `package.json`).

**Extension mode** lives in `app.js` behind one flag, `IS_EXTENSION` (true on
`chrome-extension://…` or `body.extension`): the only behavioural difference is that
picking a school switches **in place** instead of navigating to `/school/<id>/`,
which a packaged extension doesn't have. Everything else — the countdown engine,
the school switcher, favourites, localStorage — is identical to the website.

The popup opens to your last-picked school (remembered in `localStorage`) and its
built-in **Change School** switcher swaps schools instantly.

## Toolbar icon & badge (the background worker)

`sw.js` keeps the toolbar live even while the popup is closed:

- the **icon** becomes the selected school's logo (drawn onto a light rounded tile
  via `OffscreenCanvas` so it reads on light or dark toolbars, without distorting
  the logo's aspect);
- the **badge** shows the minutes left in the current period — the school's accent
  while in class, amber during a break or transition, and clear before/after school.

It recomputes once a minute (`chrome.alarms`) and the moment you change school or
week. To do that with the popup closed it needs the schedule data and a little of
the period math, so `sw.js` re-derives the current period the same way `app.js`
does (and `build-pages.js` already does) — `data.js` stays the one source of truth.
The popup mirrors your chosen school/week into `chrome.storage` (via `extStore()`
in `app.js`) so the worker knows what to show; `localStorage` isn't reachable from
a service worker. This is why the manifest asks for the `alarms` and `storage`
permissions (still no host permissions and no remote code).

## Icons

`icons/icon-{16,48,128}.png` are committed. Regenerate them from the clock mark
after a brand change with:

```bash
node tools/extension/make-icons.js
```

## Notes

- **No permissions** are requested and **no remote code** is loaded — every script
  is a local file (`script-src 'self'`, MV3's default). The Rubik font loads from
  Google Fonts and degrades to the system sans stack offline.
- The generated `extension/` folder is ignored by git and excluded from the Vercel
  deploy; only these sources under `tools/extension/` are tracked.
- Firefox uses the same MV3 manifest; `IS_EXTENSION` already covers `moz-extension://`.
