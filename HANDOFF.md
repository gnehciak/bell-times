# HANDOFF — finish verifying Sydney school bell times

This continues work on **Bell Time**, a static website that shows how much time is left in
the current school period for Sydney public high schools. Your job: **verify (and fix where
wrong) the bell-time data for the schools listed below, by checking each against its official
source page.**

## Current state (already done — do not redo)

- **143 schools** total, all loading and passing validation.
- **4** are hand-`verified` (in `data.js`): Baulkham Hills, Cumberland, Northmead CAPA, Muirfield. Leave these alone.
- **46** were `checked` by reading the school's actual timetable image with vision and confirming/correcting it. Leave these alone.
- **93** still need checking — that is your task.

Every school lives in **`data.js`** as a plain object. The 4 hand-verified ones are at the top; the crawled ones sit in the auto-managed block between the `BELLTIME:GENERATED:START` / `:END` markers.

## How the data is shaped (read this before editing)

Each school object:
```js
{
  id: "epping-boys",
  name: "Epping Boys High School",
  short: "Epping Boys",
  region: "Sydney",
  note: "…",                         // a short human note (special Wednesday, etc.)
  source: "https://…/bell-times",    // the official page you verify against
  checked: false,                     // set true once you verify from the source
  needsReview: true,                  // set false once verified
  confidence: "high",
  days:      { mon:"s1", tue:"s1", wed:"s2", thu:"s1", fri:"s1" },   // each weekday -> a schedule key
  schedules: {
    s1: [ {name:"Roll Call", start:"08:45"}, {name:"Period 1", start:"09:05"}, …,
          {name:"School ends", start:"15:15", terminal:true} ],     // LAST block must have terminal:true
    s2: [ … ]                                                       // a different day-type (e.g. Wednesday)
  }
}
```

Rules the data MUST follow (enforced by `node validate-all.js`):
1. Times are 24-hour `"HH:MM"`, **strictly increasing** within a schedule.
2. The **last block of every schedule has `terminal:true`** — it is the dismissal bell, not a class; it only supplies the previous block's end time.
3. Every weekday `mon..fri` maps to a schedule that exists.
4. Group weekdays with identical bells into ONE schedule key (don't duplicate).
5. A block's end time = the next block's start time, so list EVERY bell in order including breaks (Recess/Lunch) and the final dismissal.

## The verification method (what actually works)

The school pages are JS-rendered, and most bell times are **images**. WebFetch's built-in OCR
is mediocre. The reliable method is to **download the image and read it with your own vision**:

```bash
PAGE="<the school's source URL>"
curl -sL --max-time 25 "$PAGE" -o page.html
# find the timetable image filename(s):
grep -oiE "media_[a-f0-9]+\.(jpg|jpeg|png)" page.html | sort -u
# the absolute image URL = page URL with its LAST path segment removed + the filename + a big render size:
#   https://host/school-life/bell-times  +  media_ABC.jpg
#   => https://host/school-life/media_ABC.jpg?width=1600&format=jpg
curl -sL --max-time 30 "https://host/school-life/media_ABC.jpg?width=1600&format=jpg" -o tt.jpg
```
Then **Read `tt.jpg`** (it renders to your vision) and transcribe every day column.
Some pages have several images (one per day) or an absolute `https://assets.schools.nsw.gov.au/…` URL — download and read all of them. If a page is a real HTML table (not an image), `WebFetch` the page instead.

**CRITICAL am/pm rule** (images usually omit am/pm). A school day runs ~8:00am–4:30pm, so:
hour 7–11 → AM; 12 → noon (`12:xx`); hour 1–6 → PM (add 12).
e.g. `8.45`→`08:45`, `11.40`→`11:40`, `12.30`→`12:30`, `1.40`→`13:40`, `3.10`→`15:10`.
Getting this wrong is the #1 source of errors — double-check anything that ends up before 08:00 or after ~16:30.

If the image shows **year-group splits** at the same time (e.g. "Yr 7-10 Sport" vs "Yr 11-12 dismissed"), encode the **main whole-school sequence** and mention the split in `note`. Two bells at the exact same minute will fail validation — keep one.

## What to do per school

1. Open its `source` URL, get the real timetable (image → read with vision; or HTML table).
2. Rebuild that school's `days` + `schedules` in `data.js` to match the source exactly.
3. Set `checked: true`, `needsReview: false`, `confidence: "high"`, and a short `note`.
4. Move to the next. Work through the PRIORITY list first.

## After editing — ALWAYS run

```bash
node validate-all.js     # must print "✓ No structural errors"
```
Fix anything it flags (out-of-order times, missing terminal, unmapped day, weird span). Then open `index.html` (or `npm run dev`), search the school, and sanity-check the schedule renders.

---

## PRIORITY — image timetables not yet vision-checked (8)

These are the riskiest (machine-OCR from images, never confirmed). Do these first.

| School | id | confidence | source |
|---|---|---|---|
| South Sydney High School | `south-sydney` | high | https://sthsydney-h.schools.nsw.gov.au/school-life/bell-times |
| St Marys Senior High School | `st-marys-senior` | medium | https://stmaryssen-h.schools.nsw.gov.au/school-life/bell-times |
| Strathfield Girls High School | `strathfield-girls` | high | https://strathfieg-h.schools.nsw.gov.au/school-life/bell-times |
| Sydney Secondary College Blackwattle Bay Campus | `sydney-secondary-college-blackwattle-bay` | medium | https://sscbwattle-h.schools.nsw.gov.au/school-life/bell-times |
| Sydney Secondary College Leichhardt Campus | `sydney-secondary-college-leichhardt` | medium | https://leichhardt-h.schools.nsw.gov.au/school-life/bell-times |
| Sylvania High School | `sylvania` | high | https://sylvania-h.schools.nsw.gov.au/school-life/bell-times |
| Tempe High School | `tempe` | high | https://tempe-h.schools.nsw.gov.au/school-life/bell-times |
| Wiley Park Girls High School | `wiley-park-girls` | medium | https://wileyparkg-h.schools.nsw.gov.au/school-life/bell-times |

---

## SECONDARY — extracted from HTML, not yet re-verified (85)

Lower risk (read from HTML tables, generally accurate) but still unconfirmed. Verify against `source` and set `checked:true` as you confirm each.

| School | id | confidence | source |
|---|---|---|---|
| Alexandria Park Community School | `alexandria-park-community` | high | https://alexparkcs-c.schools.nsw.gov.au/school-life/bell-times |
| Arthur Phillip High School | `arthur-phillip` | medium | https://arthurphil-h.schools.nsw.gov.au/school-life/bell-times |
| Ashfield Boys High School | `ashfield-boys` | high | https://ashfieldbo-h.schools.nsw.gov.au/school-life/bell-times |
| Balgowlah Boys Campus | `balgowlah-boys` | high | https://northernbeaches-s.schools.nsw.gov.au/balgowlah-boys-campus/bell-times |
| Bankstown Girls High School | `bankstown-girls` | high | https://bankstowng-h.schools.nsw.gov.au/school-life/bell-times |
| Bankstown Senior College | `bankstown-senior` | high | https://bankstowns-h.schools.nsw.gov.au/school-life/bell-times |
| Bass High School | `bass` | medium | https://bass-h.schools.nsw.gov.au/school-life/bell-times |
| Beverly Hills Girls High School | `beverly-hills-girls` | high | https://beverlyhg-h.schools.nsw.gov.au/school-life/bell-times |
| Birrong Girls High School | `birrong-girls` | high | https://birronggir-h.schools.nsw.gov.au/school-life/bell-times |
| Blacktown Boys High School | `blacktown-boys` | high | https://blacktownb-h.schools.nsw.gov.au/school-life/bell-times |
| Blakehurst High School | `blakehurst` | medium | https://blakehurst-h.schools.nsw.gov.au/school-life/bell-times |
| Burwood Girls High School | `burwood-girls` | high | https://burwoodg-h.schools.nsw.gov.au/school-life/class-times |
| Cambridge Park High School | `cambridge-park` | medium | https://cambridge-h.schools.nsw.gov.au/school-life/bell-times |
| Cammeraygal High School | `cammeraygal` | medium | https://cammeraygal-h.schools.nsw.gov.au/school-life/bell-times |
| Campbelltown Performing Arts High School | `campbelltown-performing-arts` | medium | https://campbellto-h.schools.nsw.gov.au/school-life/bell-times |
| Canterbury Boys High School | `canterbury-boys` | high | https://canterburb-h.schools.nsw.gov.au/school-life/bell-times |
| Caringbah High School | `caringbah` | high | https://caringbah-h.schools.nsw.gov.au/school-life/bell-times |
| Carlingford High School | `carlingford` | medium | https://carlingfor-h.schools.nsw.gov.au/school-life/bell-times |
| Castle Hill High School | `castle-hill` | high | https://castlehill-h.schools.nsw.gov.au/school-life/bell-times |
| Cheltenham Girls High School | `cheltenham-girls` | high | https://cheltenham-h.schools.nsw.gov.au/school-life/bell-times |
| Chester Hill High School | `chester-hill` | high | https://chesterhil-h.schools.nsw.gov.au/school-life/bell-times |
| Colo High School | `colo` | high | https://colo-h.schools.nsw.gov.au/school-life/bell-times |
| Concord High School | `concord` | high | https://concord-h.schools.nsw.gov.au/school-life/bell-times |
| Cromer Campus | `cromer` | high | https://northernbeaches-s.schools.nsw.gov.au/cromer-campus/school-life |
| Cronulla High School | `cronulla` | high | https://cronulla-h.schools.nsw.gov.au/school-life/bell-times |
| Dulwich High School of Visual Arts and Design | `dulwich-high-school-of-visual-arts-and-design` | high | https://dulwich-h.schools.nsw.gov.au/school-life/bell-times |
| East Hills Boys High School | `east-hills-boys` | high | https://easthillsb-h.schools.nsw.gov.au/school-life/bell-times |
| Elizabeth Macarthur High School | `elizabeth-macarthur` | high | https://elizabeth-h.schools.nsw.gov.au/our-school/bell-times |
| Endeavour Sports High School | `endeavour-sports` | medium | https://endeavour-h.schools.nsw.gov.au/school-life/bell-times |
| Epping Boys High School | `epping-boys` | high | https://eppingboy-h.schools.nsw.gov.au/school-life/bell-times |
| Fairfield High School | `fairfield` | high | https://fairfield-h.schools.nsw.gov.au/school-life/bell-times |
| Fairvale High School | `fairvale` | high | https://fairvale-h.schools.nsw.gov.au/school-life/bell-times |
| Freshwater Senior Campus | `freshwater-senior` | high | https://northernbeaches-s.schools.nsw.gov.au/freshwater-senior-campus/school-life/bell-times |
| Galston High School | `galston` | medium | https://galston-h.schools.nsw.gov.au/school-life/bell-times |
| Georges River College Hurstville Boys Campus | `georges-river-college-hurstville-boys` | medium | https://hurstville-h.schools.nsw.gov.au/school-life/bell-times |
| Georges River College Oatley Senior Campus | `georges-river-college-oatley-senior` | medium | https://oatleysnr-h.schools.nsw.gov.au/school-life/bell-times |
| Georges River College Penshurst Campus | `georges-river-college-penshurst` | high | https://penshurst-h.schools.nsw.gov.au/school-life/bell-times |
| Glenmore Park High School | `glenmore-park` | medium | https://glenmorepk-h.schools.nsw.gov.au/school-life/bell-times |
| Greystanes High School | `greystanes` | high | https://greystanes-h.schools.nsw.gov.au/school-life/bell-times |
| Gymea Technology High School | `gymea-technology` | high | https://gymea-h.schools.nsw.gov.au/school-life/bell-times |
| Hills Sports High School | `hills-sports` | high | https://hillssport-h.schools.nsw.gov.au/school-life/bell-times |
| Hornsby High School | `hornsby` | high | https://hornsby-h.schools.nsw.gov.au/school-life/bell-times |
| Hunters Hill High School | `hunters-hill` | high | https://huntershd-h.schools.nsw.gov.au/school-life/bell-times |
| Hurlstone Agricultural High School | `hurlstone-agricultural` | medium | https://hurlstone-h.schools.nsw.gov.au/school-life/bell-times |
| James Ruse Agricultural High School | `james-ruse-agricultural` | high | https://jamesruse-h.schools.nsw.gov.au/school-life/bell-times |
| Jamison High School | `jamison` | high | https://jamison-h.schools.nsw.gov.au/school-life/bell-times |
| Kingsgrove North High School | `kingsgrove-north` | high | https://kingsgrovn-h.schools.nsw.gov.au/school-life/bell-times |
| Kirrawee High School | `kirrawee` | medium | https://kirrawee-h.schools.nsw.gov.au/school-life/bell-times |
| Kogarah High School | `kogarah` | high | https://kogarah-h.schools.nsw.gov.au/school-life/bell-times |
| Ku-ring-gai High School | `ku-ring-gai` | high | https://kuringgai-h.schools.nsw.gov.au/school-life/bell-times |
| Macquarie Fields High School | `macquarie-fields` | high | https://macfields-h.schools.nsw.gov.au/school-life/bell-times |
| Manly Selective Campus | `manly-selective` | high | https://northernbeaches-s.schools.nsw.gov.au/manly-campus/bell-times |
| Marrickville High School | `marrickville` | medium | https://marrickvil-h.schools.nsw.gov.au/school-life/bell-times |
| Matraville Sports High School | `matraville-sports` | medium | https://matrasport-h.schools.nsw.gov.au/school-life/bell-times |
| Menai High School | `menai` | high | https://menai-h.schools.nsw.gov.au/school-life/bell-times |
| Merrylands High School | `merrylands` | high | https://merryland-h.schools.nsw.gov.au/school-life/bell-times |
| Mitchell High School | `mitchell` | medium | https://mitchell-h.schools.nsw.gov.au/school-life/bell-times |
| Model Farms High School | `model-farms` | medium | https://modelfarms-h.schools.nsw.gov.au/school-life/bell-times |
| Moorebank High School | `moorebank` | high | https://moorebank-h.schools.nsw.gov.au/school-life/bell-times |
| Mount Annan High School | `mount-annan` | high | https://mountannan-h.schools.nsw.gov.au/school-life/bell-times |
| Narrabeen Sports High School | `narrabeen-sports` | medium | https://narrabeen-h.schools.nsw.gov.au/school-life/bell-times |
| Newtown High School of the Performing Arts | `newtown-high-school-of-the-performing-arts` | high | https://newtown-h.schools.nsw.gov.au/school-life/bell-times |
| Normanhurst Boys High School | `normanhurst-boys` | high | https://normanhurb-h.schools.nsw.gov.au/school-life/bell-times |
| North Sydney Girls High School | `north-sydney-girls` | high | https://northsydgi-h.schools.nsw.gov.au/school-life/bell-times |
| Parramatta High School | `parramatta` | high | https://parramatta-h.schools.nsw.gov.au/our-school/bell-times |
| Picnic Point High School | `picnic-point` | high | https://picnicpt-h.schools.nsw.gov.au/school-life/bell-times |
| Port Hacking High School | `port-hacking` | high | https://porthackin-h.schools.nsw.gov.au/school-life/bell-times |
| Prairiewood High School | `prairiewood` | high | https://prairiewoo-h.schools.nsw.gov.au/our-school/bell-times |
| Punchbowl Boys High School | `punchbowl-boys` | low | https://punchbowlb-h.schools.nsw.gov.au/school-life/bell-times |
| Quakers Hill High School | `quakers-hill` | high | https://quakershil-h.schools.nsw.gov.au/school-life/bell-times |
| Randwick Boys High School | `randwick-boys` | medium | https://randwickb-h.schools.nsw.gov.au/content/dam/doe/sws/schools/r/randwickb-h/news/2020/Randwick_Boys_HS_Year_7.pdf |
| Richmond High School | `richmond` | high | https://richmond-h.schools.nsw.gov.au/school-life/bell-times |
| Riverside Girls High School | `riverside-girls` | high | https://riversideg-h.schools.nsw.gov.au/school-life/bell-times |
| Rose Bay Secondary College | `rose-bay-secondary` | high | https://rosebay-h.schools.nsw.gov.au/school-life/bell-times-and-attendance |
| Ryde Secondary College | `ryde-secondary` | medium | https://rydesc-h.schools.nsw.gov.au/school-life/bell-times |
| St George Girls High School | `st-george-girls` | high | https://stgeorgegi-h.schools.nsw.gov.au/school-life/bell-times |
| St Johns Park High School | `st-johns-park` | high | https://stjohnspk-h.schools.nsw.gov.au/school-life/bell-times |
| Sydney Girls High School | `sydney-girls` | high | https://sydneygirl-h.schools.nsw.gov.au/school-life/bell-times |
| Sydney Secondary College Balmain Campus | `sydney-secondary-college-balmain` | medium | https://balmain-h.schools.nsw.gov.au/school-life/bell-times |
| Sydney Technical High School | `sydney-technical` | high | https://sydneytech-h.schools.nsw.gov.au/school-life/bell-times |
| The Forest High School | `the-forest` | medium | https://theforest-h.schools.nsw.gov.au/school-life/bell-times |
| Thomas Reddall High School | `thomas-reddall` | high | https://thomasredd-h.schools.nsw.gov.au/school-life/bell-times |
| Willoughby Girls High School | `willoughby-girls` | high | https://willoughbg-h.schools.nsw.gov.au/school-life/bell-times |
| Woolooware High School | `woolooware` | high | https://woolooware-h.schools.nsw.gov.au/school-life/bell-times |
| Wyndham College | `wyndham` | high | https://wyndhamcol-h.schools.nsw.gov.au/school-life/bell-times |

---

## Not included (no standard bell schedule — safe to ignore)

Bradfield College, Conservatorium High, NSW School of Languages (no class bells), and Sydney Boys High (uses a separate non-NSW-template website that could not be crawled). Add Sydney Boys manually if you can find its bell times.
