/*
 * Bell-time data for every school (single source of truth).
 *
 * This file has two parts inside the one `SCHOOLS` array:
 *   1. Hand-verified schools (top of the array), transcribed and double-checked,
 *      marked `verified: true` and shown with a "✓ verified" badge.
 *   2. Auto-crawled schools, between the `BELLTIME:GENERATED:START` and
 *      `BELLTIME:GENERATED:END` markers. That region is machine-managed by
 *      `node merge.js` (rebuilt from crawler output) — do not hand-edit it.
 *      To promote a crawled school, MOVE its object above the START marker.
 * (Previously these were two files, data.js + schools.generated.js.)
 *
 * Data model — designed to accommodate wildly different timetables:
 *   - Each school has a set of named `schedules` (e.g. a Monday schedule,
 *     a Wednesday sport schedule, a homeroom-day schedule).
 *   - `days` maps each weekday (mon..fri) to one of those schedule names.
 *   - A schedule is an ordered list of blocks. Each block needs a `start`
 *     time ("HH:MM", 24-hour). The block's END is the next block's start,
 *     unless an explicit `end` is given (used for gaps, e.g. an early
 *     "Period 0" that finishes before roll call begins).
 *   - The final entry is marked `terminal: true`: it is not a teaching
 *     block itself, it just supplies the end time of the last real block.
 *
 * Block type (class / break / event) is inferred from the name in app.js,
 * so adding a new school only means listing names + times here.
 */

const SCHOOLS = [
  {
    id: "baulkham-hills",
    verified: true,
    name: "Baulkham Hills High School",
    short: "Baulkham Hills",
    accent: "#2563eb",
    note: "Period 0 is an optional early class that finishes at 8:35am.",
    source: "https://baulkham-h.schools.nsw.gov.au/school-life/bell-times",
    days: { mon: "mon", tue: "tueThu", wed: "wed", thu: "tueThu", fri: "fri" },
    schedules: {
      mon: [
        { name: "Period 0", start: "08:00", end: "08:35" },
        { name: "Roll Call", start: "08:38" },
        { name: "Period 1", start: "08:44" },
        { name: "Period 2", start: "09:23" },
        { name: "Assembly", start: "10:00" },
        { name: "Recess", start: "10:24" },
        { name: "Period 3", start: "10:43" },
        { name: "Period 4", start: "11:20" },
        { name: "Break", start: "11:57" },
        { name: "Period 5", start: "12:02" },
        { name: "Period 6", start: "12:39" },
        { name: "Lunch 1", start: "13:16" },
        { name: "Lunch 2", start: "13:34" },
        { name: "Period 7", start: "13:52" },
        { name: "Period 8", start: "14:29" },
        { name: "End of day", start: "15:06", terminal: true },
      ],
      tueThu: [
        { name: "Period 0", start: "08:00", end: "08:35" },
        { name: "Roll Call", start: "08:38" },
        { name: "Period 1", start: "08:44" },
        { name: "Period 2", start: "09:26" },
        { name: "Recess", start: "10:06" },
        { name: "Period 3", start: "10:25" },
        { name: "Period 4", start: "11:05" },
        { name: "Break", start: "11:45" },
        { name: "Period 5", start: "11:50" },
        { name: "Period 6", start: "12:30" },
        { name: "Lunch 1", start: "13:10" },
        { name: "Lunch 2", start: "13:28" },
        { name: "Period 7", start: "13:46" },
        { name: "Period 8", start: "14:26" },
        { name: "End of day", start: "15:06", terminal: true },
      ],
      wed: [
        { name: "Period 0", start: "08:00", end: "08:35" },
        { name: "Roll Call", start: "08:38" },
        { name: "Period 1", start: "08:44" },
        { name: "Period 2", start: "09:23" },
        { name: "Recess", start: "10:00" },
        { name: "Period 3", start: "10:15" },
        { name: "Period 4", start: "10:52" },
        { name: "Period 5", start: "11:29" },
        { name: "Lunch 1", start: "12:06" },
        { name: "Lunch 2", start: "12:20" },
        { name: "Period 6", start: "12:39" },
        { name: "Period 7", start: "13:16" },
        { name: "Period 8", start: "13:53" },
        { name: "End of day", start: "14:30", terminal: true },
      ],
      fri: [
        { name: "Period 0", start: "08:00", end: "08:35" },
        { name: "Roll Call", start: "08:38" },
        { name: "Period 1", start: "08:44" },
        { name: "Period 2", start: "09:26" },
        { name: "Recess", start: "10:05" },
        { name: "Period 3", start: "10:30" },
        { name: "Period 4", start: "11:09" },
        { name: "Break", start: "11:48" },
        { name: "Period 5", start: "11:53" },
        { name: "Period 6", start: "12:32" },
        { name: "Lunch 1", start: "13:11" },
        { name: "Lunch 2", start: "13:29" },
        { name: "Period 7", start: "13:47" },
        { name: "Period 8", start: "14:27" },
        { name: "End of day", start: "15:06", terminal: true },
      ],
    },
  },

  {
    id: "cumberland",
    verified: true,
    name: "Cumberland High School",
    short: "Cumberland",
    accent: "#0f172a",
    note: "Bell Times 2026. Wednesday afternoon is sport.",
    source: "https://cumberland-h.schools.nsw.gov.au/school-life/bell-times",
    days: { mon: "mtf", tue: "tue", wed: "wed", thu: "mtf", fri: "mtf" },
    schedules: {
      mtf: [
        { name: "Session 1", start: "08:40" },
        { name: "Recess", start: "10:05" },
        { name: "Session 2", start: "10:25" },
        { name: "Session 3", start: "11:45" },
        { name: "Lunch 1", start: "13:05" },
        { name: "Lunch 2", start: "13:25" },
        { name: "Session 4", start: "13:45" },
        { name: "School ends", start: "15:00", terminal: true },
      ],
      tue: [
        { name: "Homeroom", start: "08:40" },
        { name: "Session 1", start: "09:10" },
        { name: "Recess", start: "10:24" },
        { name: "Session 2", start: "10:39" },
        { name: "Session 3", start: "11:53" },
        { name: "Lunch 1", start: "13:07" },
        { name: "Lunch 2", start: "13:27" },
        { name: "Session 4", start: "13:46" },
        { name: "School ends", start: "15:00", terminal: true },
      ],
      wed: [
        { name: "Session 1", start: "09:00" },
        { name: "Recess", start: "10:20" },
        { name: "Session 2", start: "10:40" },
        { name: "Lunch 1", start: "12:00" },
        { name: "Lunch 2", start: "12:20" },
        { name: "Session 3 (Sport)", start: "12:40" },
        { name: "Session 4 (Sport)", start: "13:45" },
        { name: "School ends", start: "14:25", terminal: true },
      ],
    },
  },

  {
    id: "northmead-capa",
    verified: true,
    name: "Northmead Creative and Performing Arts High School",
    short: "Northmead CAPA",
    accent: "#9d1d2c",
    source: "https://northmead-h.schools.nsw.gov.au/school-life/bell-times",
    days: { mon: "mtf", tue: "tue", wed: "wed", thu: "mtf", fri: "mtf" },
    schedules: {
      mtf: [
        { name: "Period 1", start: "08:20" },
        { name: "Recess", start: "09:38" },
        { name: "Period 2", start: "09:58" },
        { name: "Period 3", start: "11:16" },
        { name: "Lunch 1", start: "12:34" },
        { name: "Lunch 2", start: "12:54" },
        { name: "Period 4", start: "13:14" },
        { name: "Final Bell", start: "14:32", terminal: true },
      ],
      tue: [
        { name: "Period 1", start: "08:20" },
        { name: "Homeroom", start: "09:32" },
        { name: "Recess", start: "09:59" },
        { name: "Period 2", start: "10:19" },
        { name: "Period 3", start: "11:31" },
        { name: "Lunch 1", start: "12:43" },
        { name: "Lunch 2", start: "13:02" },
        { name: "Period 4", start: "13:20" },
        { name: "Final Bell", start: "14:32", terminal: true },
      ],
      wed: [
        { name: "Period 1", start: "08:20" },
        { name: "Recess", start: "09:36" },
        { name: "Period 2", start: "09:56" },
        { name: "Period 3", start: "11:12" },
        { name: "Lunch 1", start: "11:52" },
        { name: "Lunch 2", start: "12:12" },
        { name: "Period 4", start: "12:32" },
        { name: "Period 5", start: "13:47" },
        { name: "Final Bell", start: "14:32", terminal: true },
      ],
    },
  },

  {
    id: "muirfield",
    verified: true,
    name: "Muirfield High School",
    short: "Muirfield",
    accent: "#0d9488",
    note: "Bell times are identical for Week A and Week B.",
    source: "https://muirfield-h.schools.nsw.gov.au/school-life/bell-times",
    days: { mon: "mtt", tue: "mtt", wed: "wed", thu: "mtt", fri: "fri" },
    schedules: {
      mtt: [
        { name: "Roll Call", start: "08:15" },
        { name: "Period 1", start: "08:25" },
        { name: "Recess", start: "09:45" },
        { name: "Period 2", start: "10:00" },
        { name: "Break", start: "11:20" },
        { name: "Period 3", start: "11:25" },
        { name: "Lunch 1", start: "12:45" },
        { name: "Lunch 2", start: "13:00" },
        { name: "Period 4", start: "13:15" },
        { name: "End of day", start: "14:35", terminal: true },
      ],
      wed: [
        { name: "Staff Meeting", start: "08:00", end: "08:45" },
        { name: "Roll Call", start: "08:45" },
        { name: "Period 1", start: "08:55" },
        { name: "Assembly", start: "10:15" },
        { name: "Recess", start: "10:30" },
        { name: "Period 2", start: "10:45" },
        { name: "Lunch 1", start: "12:05" },
        { name: "Lunch 2", start: "12:20" },
        { name: "Period 3", start: "12:35" },
        { name: "Period 4", start: "13:15" },
        { name: "End of day", start: "14:35", terminal: true },
      ],
      fri: [
        { name: "Roll Call", start: "08:15" },
        { name: "Period 1", start: "08:25" },
        { name: "Recess", start: "09:45" },
        { name: "Period 2", start: "10:15" },
        { name: "Break", start: "11:30" },
        { name: "Period 3", start: "11:35" },
        { name: "Lunch 1", start: "12:50" },
        { name: "Lunch 2", start: "13:05" },
        { name: "Period 4", start: "13:20" },
        { name: "End of day", start: "14:35", terminal: true },
      ],
    },
  },

  {
    "id": "asquith",
    "name": "Asquith High School",
    "short": "Asquith",
    "region": "Sydney",
    "note": "Formerly Asquith Girls High School \u2014 renamed Asquith High School and co-educational from 2026 (Asquith Boys became Hornsby High School). Tuesday has Assembly instead of a Period 1 extension and no Period 5 (staff/faculty meetings). Wed and Thu share the same schedule.",
    "source": "https://asquith-h.schools.nsw.gov.au/school-life/school-day",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s3",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Recess",
          "start": "09:48"
        },
        {
          "name": "Period 2",
          "start": "10:08"
        },
        {
          "name": "Period 3",
          "start": "11:11"
        },
        {
          "name": "Lunch 1",
          "start": "12:14"
        },
        {
          "name": "Lunch 2",
          "start": "12:34"
        },
        {
          "name": "Period 4",
          "start": "12:54"
        },
        {
          "name": "Period 5",
          "start": "13:57"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Assembly",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:22"
        },
        {
          "name": "Period 2",
          "start": "10:42"
        },
        {
          "name": "Period 3",
          "start": "11:42"
        },
        {
          "name": "Lunch 1",
          "start": "12:42"
        },
        {
          "name": "Lunch 2",
          "start": "13:02"
        },
        {
          "name": "Period 4",
          "start": "13:22"
        },
        {
          "name": "School ends",
          "start": "14:22",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:48"
        },
        {
          "name": "Recess",
          "start": "10:51"
        },
        {
          "name": "Period 3",
          "start": "11:11"
        },
        {
          "name": "Period 4",
          "start": "12:14"
        },
        {
          "name": "Lunch 1",
          "start": "13:17"
        },
        {
          "name": "Lunch 2",
          "start": "13:37"
        },
        {
          "name": "Period 5",
          "start": "13:57"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:43"
        },
        {
          "name": "Recess",
          "start": "10:46"
        },
        {
          "name": "Period 3",
          "start": "11:11"
        },
        {
          "name": "Period 4",
          "start": "12:14"
        },
        {
          "name": "Lunch 1",
          "start": "13:17"
        },
        {
          "name": "Lunch 2",
          "start": "13:37"
        },
        {
          "name": "Period 5",
          "start": "13:57"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "bayside",
    "name": "Bayside High School",
    "short": "Bayside",
    "region": "Sydney",
    "note": "Formed 2026 from the amalgamation of James Cook Boys Technology High School and Moorefield Girls High School (Years 7\u20139 on the former James Cook site, Years 10\u201312 on the former Moorefield site). Bell times from the Bayside High School 2026 schedule. Wednesday Period 1 alternates between Assembly and Year Meetings. Friday early finish for students at 14:00.",
    "source": "https://bayside-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "wed": "s2",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1 (Assembly/Year Meetings)",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "10:50"
        },
        {
          "name": "Period 4",
          "start": "11:35"
        },
        {
          "name": "Lunch 1",
          "start": "12:20"
        },
        {
          "name": "Lunch 2",
          "start": "12:40"
        },
        {
          "name": "Sport",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00"
        },
        {
          "name": "Staff PL",
          "start": "14:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "randwick-high",
    "name": "Randwick High School",
    "short": "Randwick",
    "region": "Sydney",
    "note": "Formed 2025 from the merger of Randwick Boys High School and Randwick Girls High School into one co-educational school. Bell times transcribed from the official 2026 bell-times image. Period 0 (7:50\u20138:50) is an optional early class; the standard day begins with Roll Call at 8:50. Tuesday runs Assembly + afternoon Sport (ends 2:55pm); Wednesday has SRE/DEAR and ends 2:25pm. Mon/Thu/Fri are identical.",
    "source": "https://randwick-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:50"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00",
          "end": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:25",
          "end": "12:25"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:50"
        },
        {
          "name": "Assembly",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:20",
          "end": "10:20"
        },
        {
          "name": "Period 2",
          "start": "10:25"
        },
        {
          "name": "Recess",
          "start": "11:25"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "12:45"
        },
        {
          "name": "Sport",
          "start": "13:25"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "07:50"
        },
        {
          "name": "SRE/DEAR",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:20",
          "end": "10:20"
        },
        {
          "name": "Period 2",
          "start": "10:25"
        },
        {
          "name": "Recess",
          "start": "11:25"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "12:45"
        },
        {
          "name": "Period 4",
          "start": "13:25"
        },
        {
          "name": "School ends",
          "start": "14:25",
          "terminal": true
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // Auto-crawled schools: machine-extracted from each school's schools.nsw.gov.au
  // bell-times page — NOT hand-verified (check each `source`, plus `needsReview`
  // and `confidence`). Everything between the START/END markers below is
  // auto-managed by `node merge.js` and should not be hand-edited. To promote a
  // school to verified, MOVE its object ABOVE the START marker into the
  // hand-curated block, then refine it there.
  // ---------------------------------------------------------------------------
  // BELLTIME:GENERATED:START
  {
    "id": "alexandria-park-community",
    "name": "Alexandria Park Community School",
    "short": "Alexandria Park Community School",
    "region": "Sydney",
    "note": "Two bell schedules: Primary (K-6) and High School (7-12). Both apply Mon-Fri with no day variation noted.",
    "source": "https://alexparkcs-c.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s2",
      "tue": "s2",
      "wed": "s2",
      "thu": "s2",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Playground Supervision",
          "start": "08:30"
        },
        {
          "name": "School day starts",
          "start": "09:00"
        },
        {
          "name": "Lunch",
          "start": "11:10"
        },
        {
          "name": "Classes continue",
          "start": "11:50"
        },
        {
          "name": "Afternoon tea",
          "start": "13:50"
        },
        {
          "name": "Classes continue",
          "start": "14:15"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "arthur-phillip",
    "name": "Arthur Phillip High School",
    "short": "Arthur Phillip",
    "region": "Sydney",
    "note": "Year 7-10 has early dismissal on Wed after Period 3 (13:30); Year 11-12 has early dismissal on Tue and Wed after Period 3 (13:30). No roll call listed; school day starts Period 1 at 08:45.",
    "source": "https://arthurphil-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Lunch 1",
          "start": "11:45"
        },
        {
          "name": "Period 3",
          "start": "12:15"
        },
        {
          "name": "Lunch 2",
          "start": "13:30"
        },
        {
          "name": "Period 4",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Lunch 1",
          "start": "11:45"
        },
        {
          "name": "Period 3",
          "start": "12:15"
        },
        {
          "name": "School ends",
          "start": "13:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "ashfield-boys",
    "name": "Ashfield Boys High School",
    "short": "Ashfield Boys",
    "region": "Sydney",
    "note": "Each weekday has a distinct schedule. Mon/Tue are identical. Wed is a short day ending with Meetings at 14:31. Thu has Scripture in Period 5 and ends after Roll Call 2. Fri ends after Period 8 at 15:05. Mon/Tue have Period 9 ending at 15:50.",
    "source": "https://ashfieldbo-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s2",
      "thu": "s3",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "08:10"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "08:58"
        },
        {
          "name": "Period 2",
          "start": "09:37"
        },
        {
          "name": "Recess",
          "start": "10:16"
        },
        {
          "name": "Period 3",
          "start": "10:46"
        },
        {
          "name": "Period 4",
          "start": "11:24"
        },
        {
          "name": "Period 5",
          "start": "12:02"
        },
        {
          "name": "Period 6",
          "start": "12:40"
        },
        {
          "name": "Lunch",
          "start": "13:18"
        },
        {
          "name": "Period 7",
          "start": "13:48"
        },
        {
          "name": "Period 8",
          "start": "14:26"
        },
        {
          "name": "Roll Call 2",
          "start": "15:05"
        },
        {
          "name": "Period 9",
          "start": "15:10"
        },
        {
          "name": "School ends",
          "start": "15:50",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "08:10"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "08:58"
        },
        {
          "name": "Period 2",
          "start": "09:37"
        },
        {
          "name": "Recess",
          "start": "10:16"
        },
        {
          "name": "Period 3",
          "start": "10:50"
        },
        {
          "name": "Period 4",
          "start": "11:27"
        },
        {
          "name": "Lunch",
          "start": "12:04"
        },
        {
          "name": "Sport",
          "start": "12:34"
        },
        {
          "name": "Period 6",
          "start": "13:13"
        },
        {
          "name": "Period 7",
          "start": "13:52"
        },
        {
          "name": "School ends",
          "start": "14:31",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "08:10"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "08:58"
        },
        {
          "name": "Period 2",
          "start": "09:37"
        },
        {
          "name": "Recess",
          "start": "10:16"
        },
        {
          "name": "Period 3",
          "start": "10:46"
        },
        {
          "name": "Period 4",
          "start": "11:25"
        },
        {
          "name": "Period 5",
          "start": "12:04"
        },
        {
          "name": "Lunch",
          "start": "12:43"
        },
        {
          "name": "Period 6",
          "start": "13:13"
        },
        {
          "name": "Period 7",
          "start": "13:52"
        },
        {
          "name": "Roll Call 2",
          "start": "15:05"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0",
          "start": "08:10"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "08:58"
        },
        {
          "name": "Period 2",
          "start": "09:37"
        },
        {
          "name": "Recess",
          "start": "10:16"
        },
        {
          "name": "Period 3",
          "start": "10:46"
        },
        {
          "name": "Period 4",
          "start": "11:24"
        },
        {
          "name": "Period 5",
          "start": "12:02"
        },
        {
          "name": "Period 6",
          "start": "12:40"
        },
        {
          "name": "Lunch",
          "start": "13:18"
        },
        {
          "name": "Period 7",
          "start": "13:48"
        },
        {
          "name": "Period 8",
          "start": "14:26"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "balgowlah-boys",
    "name": "Balgowlah Boys Campus",
    "short": "Balgowlah Boys Campus",
    "region": "Sydney",
    "note": "Monday has a late start (Period 1 at 09:30). Wednesday has a short day ending 14:30 with sport afternoon. Elan appears to be a form of roll call/mentor period.",
    "source": "https://northernbeaches-s.schools.nsw.gov.au/balgowlah-boys-campus/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "thu": "s2",
      "fri": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "09:30"
        },
        {
          "name": "Period 2",
          "start": "10:16"
        },
        {
          "name": "Elan",
          "start": "11:02"
        },
        {
          "name": "Recess",
          "start": "11:16"
        },
        {
          "name": "Period 3",
          "start": "11:36"
        },
        {
          "name": "Period 4",
          "start": "12:22"
        },
        {
          "name": "Lunch 1",
          "start": "13:08"
        },
        {
          "name": "Lunch 2",
          "start": "13:28"
        },
        {
          "name": "Period 5",
          "start": "13:48"
        },
        {
          "name": "Period 6",
          "start": "14:34"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:47"
        },
        {
          "name": "Elan",
          "start": "10:38"
        },
        {
          "name": "Recess",
          "start": "10:56"
        },
        {
          "name": "Period 3",
          "start": "11:16"
        },
        {
          "name": "Period 4",
          "start": "12:07"
        },
        {
          "name": "Lunch 1",
          "start": "12:58"
        },
        {
          "name": "Lunch 2",
          "start": "13:18"
        },
        {
          "name": "Period 5",
          "start": "13:38"
        },
        {
          "name": "Period 6",
          "start": "14:29"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:49"
        },
        {
          "name": "Elan",
          "start": "09:59"
        },
        {
          "name": "Recess",
          "start": "10:24"
        },
        {
          "name": "Period 3",
          "start": "10:44"
        },
        {
          "name": "Period 4",
          "start": "11:37"
        },
        {
          "name": "Lunch 1",
          "start": "12:30"
        },
        {
          "name": "Lunch 2",
          "start": "12:50"
        },
        {
          "name": "Sport",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "bankstown-girls",
    "name": "Bankstown Girls High School",
    "short": "Bankstown Girls",
    "region": "Sydney",
    "note": "2026 onwards timetable used (current year). Tuesday has early finish at 14:00. School runs on a two-week timetable.",
    "source": "https://bankstowng-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "ELP",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "ELP",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "bankstown-senior",
    "name": "Bankstown Senior College",
    "short": "Bankstown Senior College",
    "region": "Sydney",
    "note": "Source: https://bankstowns-h.schools.nsw.gov.au/school-life/bell-times",
    "source": "https://bankstowns-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "Period 6",
          "start": "14:30"
        },
        {
          "name": "School ends",
          "start": "15:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "barrenjoey",
    "name": "Barrenjoey High School",
    "short": "Barrenjoey",
    "region": "Sydney",
    "note": "Wednesday has a split schedule: Yr 7/11/12 have Period 4 then Lunch 2B; Yr 8/9/10 have Lunch 2A then Sport (1:00-2:30). Wednesday Period 2 includes Week A/B assembly/YR Meet. Monday has Outdoor Assembly 11:00-11:10 within Period 2 block.",
    "source": "https://barrenjoey-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Outdoor Assembly",
          "start": "11:00"
        },
        {
          "name": "Lunch 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Lunch 2",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "Period 6",
          "start": "15:10"
        },
        {
          "name": "School ends",
          "start": "16:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Lunch 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Lunch 2",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "Period 6",
          "start": "15:10"
        },
        {
          "name": "School ends",
          "start": "16:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2 / Assembly",
          "start": "09:55"
        },
        {
          "name": "Lunch 1",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4 (Yr 7,11,12) / Lunch 2A (Yr 8-10)",
          "start": "12:30"
        },
        {
          "name": "Lunch 2B (Yr 7,11,12) / Sport (Yr 8-10)",
          "start": "13:30"
        },
        {
          "name": "Period 5 (Yr 7,11,12)",
          "start": "14:00"
        },
        {
          "name": "Period 6",
          "start": "15:00"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Lunch 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Lunch 2",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "Period 6",
          "start": "15:10"
        },
        {
          "name": "School ends",
          "start": "16:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "bass",
    "name": "Bass High School",
    "short": "Bass",
    "region": "Sydney",
    "note": "Monday has 4 periods ending 14:00. Tuesday splits by year group: Yr 7-10 has Sport Assembly+Sport; Yr 11-12 has Period 4+5. Wed/Thu/Fri 5 periods ending 15:00.",
    "source": "https://bass-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s3",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Break 2",
          "start": "11:20"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Break 3",
          "start": "12:40"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Break 1",
          "start": "10:40"
        },
        {
          "name": "Break 2",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Break 3",
          "start": "12:10"
        },
        {
          "name": "Sport Assembly (Yr 7-10) / Period 4 (Yr 11-12)",
          "start": "12:30"
        },
        {
          "name": "Sport (Yr 7-10) / Period 5 (Yr 11-12)",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Break 2",
          "start": "11:20"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Break 3",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "beverly-hills-girls",
    "name": "Beverly Hills Girls High School",
    "short": "Beverly Hills Girls",
    "region": "Sydney",
    "note": "Source: https://beverlyhg-h.schools.nsw.gov.au/school-life/bell-times",
    "source": "https://beverlyhg-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:15"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Lunch",
          "start": "13:15"
        },
        {
          "name": "Period 4",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "birrong-girls",
    "name": "Birrong Girls High School",
    "short": "Birrong Girls",
    "region": "Sydney",
    "note": "Monday has Assembly before Period 1 and ends at 14:16. Wednesday Wellbeing replaces Period 2 but same times as Tue/Thu. Friday has longer Recess (30 min) and shorter Lunch (30 min).",
    "source": "https://birronggir-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "thu": "s2",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Assembly",
          "start": "08:44"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Recess",
          "start": "10:10"
        },
        {
          "name": "Period 3",
          "start": "10:32"
        },
        {
          "name": "Period 4",
          "start": "11:34"
        },
        {
          "name": "Lunch",
          "start": "12:34"
        },
        {
          "name": "Period 5",
          "start": "13:16"
        },
        {
          "name": "School ends",
          "start": "14:16",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:46"
        },
        {
          "name": "Period 2",
          "start": "09:46"
        },
        {
          "name": "Recess",
          "start": "10:48"
        },
        {
          "name": "Period 3",
          "start": "11:08"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:46"
        },
        {
          "name": "Period 2",
          "start": "09:46"
        },
        {
          "name": "Recess",
          "start": "10:48"
        },
        {
          "name": "Period 3",
          "start": "11:18"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "blacktown-boys",
    "name": "Blacktown Boys High School",
    "short": "Blacktown Boys",
    "region": "Sydney",
    "note": "Wednesday has Assembly replacing part of Period 2; Homework Centre (2:30-3:20) is optional and not included as a bell",
    "source": "https://blacktownb-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:10"
        },
        {
          "name": "Period 1",
          "start": "08:20"
        },
        {
          "name": "Period 2",
          "start": "09:10"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 3",
          "start": "10:30"
        },
        {
          "name": "Period 4",
          "start": "11:20"
        },
        {
          "name": "Lunch",
          "start": "12:10"
        },
        {
          "name": "Period 5",
          "start": "12:40"
        },
        {
          "name": "Period 6",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:10"
        },
        {
          "name": "Period 1",
          "start": "08:20"
        },
        {
          "name": "Period 2",
          "start": "09:10"
        },
        {
          "name": "Assembly",
          "start": "09:50"
        },
        {
          "name": "Period 3",
          "start": "10:40"
        },
        {
          "name": "Period 4",
          "start": "11:25"
        },
        {
          "name": "Lunch",
          "start": "12:10"
        },
        {
          "name": "Period 5",
          "start": "12:40"
        },
        {
          "name": "Period 6",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "blacktown-girls",
    "name": "Blacktown Girls High School",
    "short": "Blacktown Girls",
    "region": "Sydney",
    "note": "Bell times identical for all weekdays per 2026 PDF; music starts at 08:18 on all days",
    "source": "https://blacktowng-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call / Assembly",
          "start": "08:20"
        },
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:20"
        },
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "School ends",
          "start": "13:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "blakehurst",
    "name": "Blakehurst High School",
    "short": "Blakehurst",
    "region": "Sydney",
    "note": "Page shows broad structure only (no period numbers). Three day variants: Mon/Tue/Thu standard day, Wed and Fri early finish. Detailed PDF bell times returned 404.",
    "source": "https://blakehurst-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "wed": "s2",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "School starts",
          "start": "08:50"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "School starts",
          "start": "08:50"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Lunch",
          "start": "12:00"
        },
        {
          "name": "Period 5",
          "start": "12:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "School starts",
          "start": "08:50"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 3",
          "start": "10:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 5",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "bossley-park",
    "name": "Bossley Park High School",
    "short": "Bossley Park",
    "region": "Sydney",
    "note": "Monday is late start. Tuesday-Friday share same times.",
    "source": "https://bossleypk-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "thu": "s2",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning",
          "start": "09:17"
        },
        {
          "name": "Roll Call",
          "start": "09:20"
        },
        {
          "name": "Period 1",
          "start": "09:30"
        },
        {
          "name": "Recess 1",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:25"
        },
        {
          "name": "Recess 2",
          "start": "11:45"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "Lunch 1",
          "start": "13:15"
        },
        {
          "name": "Lunch 2",
          "start": "13:30"
        },
        {
          "name": "Period 4",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning",
          "start": "08:37"
        },
        {
          "name": "Roll Call",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Recess 1",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:25"
        },
        {
          "name": "Recess 2",
          "start": "11:45"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "Lunch 1",
          "start": "13:15"
        },
        {
          "name": "Lunch 2",
          "start": "13:30"
        },
        {
          "name": "Period 4",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "burwood-girls",
    "name": "Burwood Girls High School",
    "short": "Burwood Girls",
    "region": "Sydney",
    "note": "Tuesday has SRE/Private Study and Sport (Yr8-11) vs Period 3+4 (Yr7); Monday Assembly is an occasional variant. Warning bell at 08:40 daily.",
    "source": "https://burwoodg-h.schools.nsw.gov.au/school-life/class-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s3",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:50"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 4",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "SRE / Private Study",
          "start": "10:10"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 2",
          "start": "11:40"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Sport (Yr 8-11) / Period 3 (Yr 7)",
          "start": "13:00"
        },
        {
          "name": "Period 4 (Yr 7)",
          "start": "13:40"
        },
        {
          "name": "School ends (Yr 8-11)",
          "start": "14:30"
        },
        {
          "name": "School ends (Yr 7)",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Assembly",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 2",
          "start": "11:20"
        },
        {
          "name": "Period 3",
          "start": "12:25"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 4",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "cabramatta",
    "name": "Cabramatta High School",
    "short": "Cabramatta",
    "region": "Sydney",
    "note": "Two year-group schedules: Yrs 7-10 and Yrs 11-12. Monday has Assembly (later recess). Wednesday is early start for Yrs 7-10 (Period 0 at 08:25) and early finish for all (no Finish time published). Yrs 11-12 have Period 0 every day at 08:25.",
    "source": "https://cabramatta-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s4",
      "tue": "s5",
      "thu": "s5",
      "fri": "s5",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Assembly",
          "start": "10:50"
        },
        {
          "name": "Recess",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "Lunch 1",
          "start": "13:05"
        },
        {
          "name": "Lunch 2",
          "start": "13:25"
        },
        {
          "name": "Period 5",
          "start": "13:45"
        },
        {
          "name": "Period 6",
          "start": "14:30"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch 1",
          "start": "12:55"
        },
        {
          "name": "Lunch 2",
          "start": "13:15"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "Period 6",
          "start": "14:25"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch 1",
          "start": "12:55"
        },
        {
          "name": "Lunch 2",
          "start": "13:15"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "Period 6",
          "start": "14:25",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Assembly",
          "start": "10:50"
        },
        {
          "name": "Recess",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "Lunch 1",
          "start": "13:05"
        },
        {
          "name": "Lunch 2",
          "start": "13:25"
        },
        {
          "name": "Period 5",
          "start": "13:45"
        },
        {
          "name": "Period 6",
          "start": "14:30"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s5": [
        {
          "name": "Period 0",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch 1",
          "start": "12:55"
        },
        {
          "name": "Lunch 2",
          "start": "13:15"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "Period 6",
          "start": "14:25"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "cambridge-park",
    "name": "Cambridge Park High School",
    "short": "Cambridge Park",
    "region": "Sydney",
    "note": "Page shows only supervision/recess/lunch/end times without individual period labels. Tuesday has early finish at 14:20.",
    "source": "https://cambridge-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Playground Supervision",
          "start": "08:30"
        },
        {
          "name": "School starts",
          "start": "08:45"
        },
        {
          "name": "Recess",
          "start": "10:57"
        },
        {
          "name": "After Recess",
          "start": "11:27"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "After Lunch",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Playground Supervision",
          "start": "08:30"
        },
        {
          "name": "School starts",
          "start": "08:45"
        },
        {
          "name": "Recess",
          "start": "10:57"
        },
        {
          "name": "After Recess",
          "start": "11:27"
        },
        {
          "name": "Lunch",
          "start": "12:49"
        },
        {
          "name": "After Lunch",
          "start": "13:19"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "cammeraygal",
    "name": "Cammeraygal High School",
    "short": "Cammeraygal",
    "region": "Sydney",
    "note": "4 day-type variants: Monday (SRE/Period 6 ends 15:15), Tuesday (Assembly at 12:30), Wednesday (Sport 13:00-15:00), Thu/Fri standard. Period 0 for some senior classes only.",
    "source": "https://cammeraygal-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "Period 6",
          "start": "14:30"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Assembly",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "Period 6",
          "start": "15:00"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Sport",
          "start": "13:00"
        },
        {
          "name": "Period 6",
          "start": "15:00"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "Period 6",
          "start": "15:00"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "campbelltown-performing-arts",
    "name": "Campbelltown Performing Arts High School",
    "short": "Campbelltown Performing Arts",
    "region": "Sydney",
    "note": "Tuesday has Assembly at 11:00 and early finish at 14:00; Wednesday has Recess listed at same time as Period 3 (11:30); Thu/Fri identical",
    "source": "https://campbellto-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s1",
      "thu": "s3",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Assembly",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "canley-vale",
    "name": "Canley Vale High School",
    "short": "Canley Vale",
    "region": "Sydney",
    "note": "Monday has Assembly after Roll Call and only 7 periods ending 14:15; Tue-Fri has 8 periods ending 15:15",
    "source": "https://canleyvale-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "thu": "s2",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Assembly",
          "start": "08:53"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:20"
        },
        {
          "name": "Period 3",
          "start": "10:50"
        },
        {
          "name": "Period 4",
          "start": "11:25"
        },
        {
          "name": "Period 5",
          "start": "12:00"
        },
        {
          "name": "Period 6",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 7",
          "start": "13:40"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Roll Call 2",
          "start": "08:53"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:15"
        },
        {
          "name": "Period 3",
          "start": "10:45"
        },
        {
          "name": "Period 4",
          "start": "11:25"
        },
        {
          "name": "Period 5",
          "start": "12:05"
        },
        {
          "name": "Period 6",
          "start": "12:45"
        },
        {
          "name": "Lunch",
          "start": "13:25"
        },
        {
          "name": "Period 7",
          "start": "13:55"
        },
        {
          "name": "Period 8",
          "start": "14:35"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "canterbury-boys",
    "name": "Canterbury Boys High School",
    "short": "Canterbury Boys",
    "region": "Sydney",
    "note": "Each weekday has a unique schedule except Thu and Fri which are identical. Monday has Assembly after Recess 1. Tuesday and Wednesday finish at 14:35; Mon/Thu/Fri finish at 15:15.",
    "source": "https://canterburb-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:35"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Recess 1",
          "start": "09:59"
        },
        {
          "name": "Assembly",
          "start": "10:14"
        },
        {
          "name": "Period 2",
          "start": "10:29"
        },
        {
          "name": "Recess 2",
          "start": "11:48"
        },
        {
          "name": "Period 3",
          "start": "12:03"
        },
        {
          "name": "Lunch",
          "start": "13:22"
        },
        {
          "name": "Period 4",
          "start": "13:56"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:35"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Recess 1",
          "start": "09:53"
        },
        {
          "name": "Period 2",
          "start": "10:08"
        },
        {
          "name": "Recess 2",
          "start": "11:21"
        },
        {
          "name": "Period 3",
          "start": "11:36"
        },
        {
          "name": "Lunch",
          "start": "12:49"
        },
        {
          "name": "Period 4",
          "start": "13:22"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Warning Bell",
          "start": "08:35"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Recess 1",
          "start": "09:50"
        },
        {
          "name": "Period 2",
          "start": "10:03"
        },
        {
          "name": "Recess 2",
          "start": "11:13"
        },
        {
          "name": "Period 3",
          "start": "11:26"
        },
        {
          "name": "Lunch",
          "start": "12:06"
        },
        {
          "name": "Period 4",
          "start": "12:50"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Warning Bell",
          "start": "08:35"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Recess 1",
          "start": "10:01"
        },
        {
          "name": "Period 2",
          "start": "10:17"
        },
        {
          "name": "Recess 2",
          "start": "11:38"
        },
        {
          "name": "Period 3",
          "start": "11:54"
        },
        {
          "name": "Lunch",
          "start": "13:15"
        },
        {
          "name": "Period 4",
          "start": "13:54"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "caringbah",
    "name": "Caringbah High School",
    "short": "Caringbah",
    "region": "Sydney",
    "note": "School operates Week A/B fortnightly cycle. Wednesday has Assembly. Friday Week B has Sport and early finish (14:45). Period 0 is an optional early morning session.",
    "source": "https://caringbah-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s3",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Recess",
          "start": "10:08"
        },
        {
          "name": "Period 2",
          "start": "10:28"
        },
        {
          "name": "Period 3",
          "start": "11:50"
        },
        {
          "name": "Lunch",
          "start": "13:08"
        },
        {
          "name": "Period 4",
          "start": "13:48"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Recess",
          "start": "10:03"
        },
        {
          "name": "Assembly",
          "start": "10:23"
        },
        {
          "name": "Period 2",
          "start": "10:43"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:13"
        },
        {
          "name": "Period 4",
          "start": "13:53"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Recess",
          "start": "10:08"
        },
        {
          "name": "Period 2",
          "start": "10:28"
        },
        {
          "name": "Period 3",
          "start": "11:50"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4 Sport",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "carlingford",
    "name": "Carlingford High School",
    "short": "Carlingford",
    "region": "Sydney",
    "note": "4 distinct day-types: Monday, Tuesday, Wednesday+Friday, Thursday. Tuesday has early finish ~14:30. Thursday has early lunch before Period 4.",
    "source": "https://carlingfor-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "fri": "s3",
      "thu": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:52"
        },
        {
          "name": "Assembly",
          "start": "10:52"
        },
        {
          "name": "Recess",
          "start": "11:12"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:48"
        },
        {
          "name": "Recess",
          "start": "10:44"
        },
        {
          "name": "Assembly",
          "start": "10:52"
        },
        {
          "name": "Period 3",
          "start": "11:02"
        },
        {
          "name": "Period 4",
          "start": "11:58"
        },
        {
          "name": "Lunch 1",
          "start": "12:54"
        },
        {
          "name": "Lunch 2",
          "start": "13:14"
        },
        {
          "name": "Period 5",
          "start": "13:34"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:52"
        },
        {
          "name": "Assembly",
          "start": "10:52"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:18"
        },
        {
          "name": "Period 4",
          "start": "12:22"
        },
        {
          "name": "Lunch 1",
          "start": "13:26"
        },
        {
          "name": "Lunch 2",
          "start": "13:46"
        },
        {
          "name": "Period 5",
          "start": "14:06"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:52"
        },
        {
          "name": "Assembly",
          "start": "10:52"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:18"
        },
        {
          "name": "Lunch 1",
          "start": "12:22"
        },
        {
          "name": "Lunch 2",
          "start": "12:42"
        },
        {
          "name": "Period 4",
          "start": "13:02"
        },
        {
          "name": "Period 5",
          "start": "14:06"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "castle-hill",
    "name": "Castle Hill High School",
    "short": "Castle Hill",
    "region": "Sydney",
    "note": "Thursday is a late start day (no Session 1). Wednesday has two variants on a fortnight cycle: Week A has Staff Meeting during first recess; Week B has Assembly instead of Session 2 start.",
    "source": "https://castlehill-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "fri": "s1",
      "wed": "s3",
      "thu": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Movement Bell",
          "start": "08:45"
        },
        {
          "name": "Session 1",
          "start": "08:50"
        },
        {
          "name": "Session 2",
          "start": "09:40"
        },
        {
          "name": "Pastoral Care",
          "start": "10:30"
        },
        {
          "name": "Recess",
          "start": "10:48"
        },
        {
          "name": "Session 3",
          "start": "11:06"
        },
        {
          "name": "Session 4",
          "start": "11:56"
        },
        {
          "name": "Lunch 1",
          "start": "12:46"
        },
        {
          "name": "Lunch 2",
          "start": "13:07"
        },
        {
          "name": "Session 5",
          "start": "13:28"
        },
        {
          "name": "Session 6",
          "start": "14:19"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Movement Bell",
          "start": "08:45"
        },
        {
          "name": "Session 1",
          "start": "08:50"
        },
        {
          "name": "Session 2",
          "start": "09:40"
        },
        {
          "name": "Recess 1 / Staff Meeting",
          "start": "10:30"
        },
        {
          "name": "Recess 2",
          "start": "10:48"
        },
        {
          "name": "Session 3",
          "start": "11:06"
        },
        {
          "name": "Session 4",
          "start": "11:56"
        },
        {
          "name": "Lunch 1",
          "start": "12:46"
        },
        {
          "name": "Lunch 2",
          "start": "13:07"
        },
        {
          "name": "Session 5",
          "start": "13:28"
        },
        {
          "name": "Session 6",
          "start": "14:19"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Movement Bell",
          "start": "08:45"
        },
        {
          "name": "Session 1",
          "start": "08:50"
        },
        {
          "name": "Session 2",
          "start": "09:35"
        },
        {
          "name": "Assembly",
          "start": "10:20"
        },
        {
          "name": "Recess",
          "start": "10:44"
        },
        {
          "name": "Session 3",
          "start": "11:06"
        },
        {
          "name": "Session 4",
          "start": "11:56"
        },
        {
          "name": "Lunch 1",
          "start": "12:46"
        },
        {
          "name": "Lunch 2",
          "start": "13:07"
        },
        {
          "name": "Session 5",
          "start": "13:28"
        },
        {
          "name": "Session 6",
          "start": "14:19"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Movement Bell",
          "start": "09:35"
        },
        {
          "name": "Session 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Session 3",
          "start": "11:06"
        },
        {
          "name": "Session 4",
          "start": "11:56"
        },
        {
          "name": "Lunch 1",
          "start": "12:46"
        },
        {
          "name": "Lunch 2",
          "start": "13:07"
        },
        {
          "name": "Session 5",
          "start": "13:28"
        },
        {
          "name": "Session 6",
          "start": "14:19"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "central-sydney-intensive-english",
    "name": "Central Sydney Intensive English High School",
    "short": "Central Sydney Intensive English",
    "region": "Sydney",
    "note": "Bell times shown as image. All days share Period 1-2 and Recess. Mon and Wed columns blank after Recess — afternoon schedule unclear; may end at 10:50. Thu has longer Activity Session and no Period 6 (ends 14:30). Tue/Fri run full day to 15:00.",
    "source": "https://centralsydneyie-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "tue": "s1",
      "fri": "s1",
      "thu": "s2",
      "mon": "s3",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Activity Session",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "11:50"
        },
        {
          "name": "Lunch 1",
          "start": "12:40"
        },
        {
          "name": "Lunch 2",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Activity Session",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch 1",
          "start": "13:00"
        },
        {
          "name": "Lunch 2",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "13:40"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "School ends",
          "start": "10:50",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "chatswood",
    "name": "Chatswood High School",
    "short": "Chatswood",
    "region": "Sydney",
    "note": "Monday has Assembly 10:50-11:10 instead of extra period time; Thursday has early lunch and sport periods ending at 14:30; Period 0 is Senior Students Only",
    "source": "https://chatswood-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "fri": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:50"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Assembly",
          "start": "10:50"
        },
        {
          "name": "Recess",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:50"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Period 4",
          "start": "12:25"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "07:50"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Lunch 1",
          "start": "11:50"
        },
        {
          "name": "Lunch 2",
          "start": "12:10"
        },
        {
          "name": "Period 4/Sport",
          "start": "12:30"
        },
        {
          "name": "Period 5/Sport",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "cheltenham-girls",
    "name": "Cheltenham Girls High School",
    "short": "Cheltenham Girls",
    "region": "Sydney",
    "note": "Monday has early lunch; Thursday has shortened periods and ends at 14:35; Tue/Wed/Fri share the same schedule",
    "source": "https://cheltenham-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "fri": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "READ",
          "start": "10:35"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Lunch",
          "start": "12:15"
        },
        {
          "name": "Period 4",
          "start": "12:55"
        },
        {
          "name": "Period 5",
          "start": "13:55"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "READ",
          "start": "10:35"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:15"
        },
        {
          "name": "Lunch",
          "start": "13:15"
        },
        {
          "name": "Period 5",
          "start": "13:55"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:15"
        },
        {
          "name": "READ",
          "start": "10:15"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Period 4",
          "start": "11:55"
        },
        {
          "name": "Lunch",
          "start": "12:55"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "cherrybrook-technology",
    "name": "Cherrybrook Technology High School",
    "short": "Cherrybrook Technology",
    "region": "Sydney",
    "note": "Tuesday normally has Assembly; non-Assembly Tuesdays run on Monday bell times. Thursday has shorter periods due to sport/different structure. Lunch on Thursday is 57 min vs 40 min other days.",
    "source": "https://assets.schools.nsw.gov.au/content/dam/doe/sws/schools/c/cths/Stage%20information/2025-2026%20Stage%204%20Booklet%20-%2003_02_26.pdf",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "fri": "s1",
      "tue": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:34"
        },
        {
          "name": "Recess",
          "start": "10:27"
        },
        {
          "name": "Period 3",
          "start": "10:47"
        },
        {
          "name": "Period 4",
          "start": "11:40"
        },
        {
          "name": "Lunch",
          "start": "12:33"
        },
        {
          "name": "Period 5",
          "start": "13:13"
        },
        {
          "name": "Period 6",
          "start": "14:06"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:25"
        },
        {
          "name": "Assembly",
          "start": "10:13"
        },
        {
          "name": "Recess",
          "start": "10:59"
        },
        {
          "name": "Period 3",
          "start": "11:19"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "Period 6",
          "start": "14:15"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:19"
        },
        {
          "name": "Period 3",
          "start": "10:39"
        },
        {
          "name": "Period 4",
          "start": "11:28"
        },
        {
          "name": "Lunch",
          "start": "12:17"
        },
        {
          "name": "Period 5",
          "start": "13:13"
        },
        {
          "name": "Period 6",
          "start": "14:06"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "chester-hill",
    "name": "Chester Hill High School",
    "short": "Chester Hill",
    "region": "Sydney",
    "note": "School runs a 10-day cycle (Week A and Week B). Tuesday of Week B is early dismissal with no lunch or Period 5. Standard variant applies to all days except Tuesday Week B.",
    "source": "https://chesterhil-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "School ends",
          "start": "13:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "chifley-college-senior",
    "name": "Chifley College Senior Campus",
    "short": "Chifley College Senior Campus",
    "region": "Sydney",
    "note": "School runs Week A/Week B cycle; times are identical across both weeks per day. Thursday has LDI and shortened periods with Meetings from 13:25. Friday has LDI and early finish with tutorials/meetings from 12:30. No explicit end-of-day bell shown for Thu or Fri.",
    "source": "https://chifcolsnr-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s2",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Recess 2",
          "start": "13:00"
        },
        {
          "name": "Period 4",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "LDI",
          "start": "09:50"
        },
        {
          "name": "Recess 1",
          "start": "10:15"
        },
        {
          "name": "Period 3",
          "start": "10:45"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Meetings",
          "start": "13:25",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "LDI",
          "start": "09:40"
        },
        {
          "name": "Recess 1",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Tutorials/Meetings",
          "start": "12:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "colo",
    "name": "Colo High School",
    "short": "Colo",
    "region": "Sydney",
    "note": "Thursday has early lunch and Sport periods; Staff Meetings 13:30 marks end of student day",
    "source": "https://colo-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "fri": "s1",
      "thu": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:05"
        },
        {
          "name": "Period 1",
          "start": "08:23"
        },
        {
          "name": "Period 2",
          "start": "09:13"
        },
        {
          "name": "Recess",
          "start": "10:03"
        },
        {
          "name": "Period 3",
          "start": "10:22"
        },
        {
          "name": "Period 4",
          "start": "11:12"
        },
        {
          "name": "Lunch",
          "start": "12:02"
        },
        {
          "name": "Period 5",
          "start": "12:40"
        },
        {
          "name": "Period 6",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:05"
        },
        {
          "name": "Period 1",
          "start": "08:23"
        },
        {
          "name": "Period 2",
          "start": "09:13"
        },
        {
          "name": "Recess",
          "start": "10:03"
        },
        {
          "name": "Period 3",
          "start": "10:22"
        },
        {
          "name": "Lunch",
          "start": "11:12"
        },
        {
          "name": "Sport 1",
          "start": "11:50"
        },
        {
          "name": "Sport 2",
          "start": "12:40"
        },
        {
          "name": "Staff Meetings",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "concord",
    "name": "Concord High School",
    "short": "Concord",
    "region": "Sydney",
    "note": "Source: https://concord-h.schools.nsw.gov.au/school-life/bell-times",
    "source": "https://concord-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "11:55"
        },
        {
          "name": "Lunch",
          "start": "12:45"
        },
        {
          "name": "Period 5",
          "start": "13:15"
        },
        {
          "name": "Period 6",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "crestwood",
    "name": "Crestwood High School",
    "short": "Crestwood",
    "region": "Sydney",
    "note": "Wednesday has 6 periods and no Homeroom; Thursday has no Homeroom and ends at 14:30; Mon/Tue/Fri share identical schedule",
    "source": "https://crestwood-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "fri": "s1",
      "wed": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Homeroom",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:25"
        },
        {
          "name": "Recess",
          "start": "10:20"
        },
        {
          "name": "Period 3",
          "start": "10:50"
        },
        {
          "name": "Period 4",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "12:40"
        },
        {
          "name": "Period 5",
          "start": "13:10"
        },
        {
          "name": "Period 6",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "cromer",
    "name": "Cromer Campus",
    "short": "Cromer Campus",
    "region": "Sydney",
    "note": "Thursday early finish at 14:00 (staff meeting Period 5). Wednesday sport: Years 8-10 dismiss at 14:30.",
    "source": "https://northernbeaches-s.schools.nsw.gov.au/cromer-campus/school-life",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "fri": "s1",
      "wed": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Literacy",
          "start": "09:40"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Break 2",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Literacy",
          "start": "09:40"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Break 2",
          "start": "12:40"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Literacy",
          "start": "09:40"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Break 2",
          "start": "12:40"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "cronulla",
    "name": "Cronulla High School",
    "short": "Cronulla",
    "region": "Sydney",
    "note": "Tuesday has only 5 periods, ends at 14:20. Thursday is sport day with 45-min periods. STAR is a structured activity period after Recess on Mon/Tue/Wed/Fri.",
    "source": "https://cronulla-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "fri": "s1",
      "tue": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "STAR",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch 1",
          "start": "12:50"
        },
        {
          "name": "Lunch 2",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "Period 6",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "STAR",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch 1",
          "start": "12:50"
        },
        {
          "name": "Lunch 2",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:25"
        },
        {
          "name": "Period 3",
          "start": "10:45"
        },
        {
          "name": "Period 4",
          "start": "11:30"
        },
        {
          "name": "Sport Assembly",
          "start": "12:15"
        },
        {
          "name": "Lunch 1",
          "start": "12:25"
        },
        {
          "name": "Lunch 2",
          "start": "12:50"
        },
        {
          "name": "Sport",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "davidson",
    "name": "Davidson High School",
    "short": "Davidson",
    "region": "Sydney",
    "note": "Wednesday has shorter periods and Sport sessions instead of Period 4/5. Period 0 is offline only.",
    "source": "https://davidson-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (Offline Only)",
          "start": "07:25"
        },
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:15"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0 (Offline Only)",
          "start": "07:25"
        },
        {
          "name": "Period 1",
          "start": "08:30"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Lunch",
          "start": "12:00"
        },
        {
          "name": "Sport 1",
          "start": "12:30"
        },
        {
          "name": "Sport 2",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "dulwich-high-school-of-visual-arts-and-design",
    "name": "Dulwich High School of Visual Arts and Design",
    "short": "Dulwich High School of Visual Arts and Design",
    "region": "Sydney",
    "note": "Monday has later Period 1 start (09:05) vs other days (09:00). Tuesday has Assembly/Mentoring instead of Period 2 and earlier dismissal (14:20). Senior Yr11-12 leave at 12:25 on Tuesdays.",
    "source": "https://dulwich-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s3",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Recess",
          "start": "10:15"
        },
        {
          "name": "Period 2",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:52"
        },
        {
          "name": "Lunch 1",
          "start": "13:05"
        },
        {
          "name": "Lunch 2",
          "start": "13:25"
        },
        {
          "name": "Period 4",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Recess",
          "start": "10:15"
        },
        {
          "name": "Assembly/Mentoring",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:12"
        },
        {
          "name": "Lunch 1",
          "start": "12:25"
        },
        {
          "name": "Lunch 2",
          "start": "12:45"
        },
        {
          "name": "Period 4",
          "start": "13:05"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Recess",
          "start": "10:15"
        },
        {
          "name": "Period 2",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:52"
        },
        {
          "name": "Lunch 1",
          "start": "13:05"
        },
        {
          "name": "Lunch 2",
          "start": "13:25"
        },
        {
          "name": "Period 4",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "east-hills-boys",
    "name": "East Hills Boys High School",
    "short": "East Hills Boys",
    "region": "Sydney",
    "note": "Tuesday is Sport Day with abbreviated periods. Friday alternates A/B schedule; Fri-A matches Wed/Thu timetable; Fri-B starts with PBL. Monday Period 4/5 times overlap as published (13:10–14:10 and 14:00–15:00).",
    "source": "https://easthillsb-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s3",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call Assembly",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Break 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Break 2",
          "start": "12:40"
        },
        {
          "name": "Period 4",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Break 1",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Break 2",
          "start": "12:15"
        },
        {
          "name": "Sport",
          "start": "12:45"
        },
        {
          "name": "Roll Call",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Break 2",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "PBL",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:20"
        },
        {
          "name": "Period 2",
          "start": "10:15"
        },
        {
          "name": "Break 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Break 2",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "east-hills-girls",
    "name": "East Hills Girls High School",
    "short": "East Hills Girls",
    "region": "Sydney",
    "note": "Monday is Early/Assembly with shorter day ending 14:10. Wednesday is Sport day ending 14:35. Tuesday and Thursday/Friday share identical times ending 16:10.",
    "source": "https://easthillsg-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "thu": "s2",
      "fri": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Assembly",
          "start": "09:50"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Recess",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch 1",
          "start": "12:30"
        },
        {
          "name": "Lunch 2",
          "start": "12:50"
        },
        {
          "name": "Period 4",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess 1",
          "start": "11:00"
        },
        {
          "name": "Recess 2",
          "start": "11:15"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "Period 6",
          "start": "15:10"
        },
        {
          "name": "School ends",
          "start": "16:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:15"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Break",
          "start": "12:15"
        },
        {
          "name": "Sport",
          "start": "12:35"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "elderslie",
    "name": "Elderslie High School",
    "short": "Elderslie",
    "region": "Sydney",
    "note": "Monday has Wellbeing Period and Assembly instead of Period 2, and Exec Meeting (staff) at 3pm so students finish at 15:00. Wednesday has early Morning Tea, Sport periods after Lunch, and Afternoon Lesson 3-4pm. Thursday all students finish at 14:00 (Staff/Faculty Meeting is staff-only). Tuesday and Friday are identical. Early Morning Lesson 7:45-8:45 is optional/before school.",
    "source": "https://elderslie-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "fri": "s2",
      "wed": "s3",
      "thu": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Early Morning Lesson",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Wellbeing Period",
          "start": "10:00"
        },
        {
          "name": "Assembly",
          "start": "10:30"
        },
        {
          "name": "Morning Tea",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Early Morning Lesson",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Morning Tea",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "Afternoon Lesson",
          "start": "15:00"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Early Morning Lesson",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Morning Tea",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Sport",
          "start": "13:00"
        },
        {
          "name": "Sport",
          "start": "14:00"
        },
        {
          "name": "Afternoon Lesson",
          "start": "15:00"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Early Morning Lesson",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Morning Tea",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "elizabeth-macarthur",
    "name": "Elizabeth Macarthur High School",
    "short": "Elizabeth Macarthur",
    "region": "Sydney",
    "note": "Wednesday has two variants (A and B); Wednesday B has Assembly and No-Assembly sub-variants. All Wednesday variants end at 14:30.",
    "source": "https://elizabeth-h.schools.nsw.gov.au/our-school/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Lunch 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Lunch 2",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Lunch 1",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:15"
        },
        {
          "name": "Lunch 2",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Assembly/Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Lunch 1",
          "start": "11:30"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "Lunch 2",
          "start": "13:00"
        },
        {
          "name": "Period 4",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:15"
        },
        {
          "name": "Lunch 1",
          "start": "11:20"
        },
        {
          "name": "Period 3",
          "start": "11:50"
        },
        {
          "name": "Lunch 2",
          "start": "12:55"
        },
        {
          "name": "Period 4",
          "start": "13:25"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "endeavour-sports",
    "name": "Endeavour Sports High School",
    "short": "Endeavour Sports",
    "region": "Sydney",
    "note": "Each day has a distinct schedule. Period 0 (07:30-08:30) is for seniors only. Monday has Staff Meetings/Period 5 after 13:50 with no end time published; Tuesday Period 5 end time not published; school ends 14:50 inferred from Wed/Thu/Fri pattern. Thursday has Assembly instead of WellBeing and Sport/TSP in afternoon.",
    "source": "https://endeavour-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4",
      "fri": "s5"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Well Being Period",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Lunch",
          "start": "12:10"
        },
        {
          "name": "Period 4",
          "start": "12:50"
        },
        {
          "name": "Staff Meetings / Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Well Being Period",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch / TSP Begins",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Well Being Period",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Enrichment / TSP",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Assembly",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Lunch",
          "start": "12:15"
        },
        {
          "name": "Sport / TSP",
          "start": "12:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s5": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Well Being Period",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "engadine",
    "name": "Engadine High School",
    "short": "Engadine",
    "region": "Sydney",
    "note": "Monday has a late Period 1 start (09:23). Tuesday ends at 14:13 with no Period 6. Wednesday has Sport for Periods 5-6 (times inferred from pattern at 13:21) ending at 14:50. Thu/Fri share identical times.",
    "source": "https://engadine-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:43"
        },
        {
          "name": "Period 1",
          "start": "09:23"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Recess",
          "start": "10:57"
        },
        {
          "name": "Period 3",
          "start": "11:17"
        },
        {
          "name": "Period 4",
          "start": "12:04"
        },
        {
          "name": "Lunch 1",
          "start": "12:51"
        },
        {
          "name": "Lunch 2",
          "start": "13:11"
        },
        {
          "name": "Period 5",
          "start": "13:31"
        },
        {
          "name": "Period 6",
          "start": "14:18"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:43"
        },
        {
          "name": "Period 1",
          "start": "08:53"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:37"
        },
        {
          "name": "Period 3",
          "start": "10:57"
        },
        {
          "name": "Period 4",
          "start": "11:49"
        },
        {
          "name": "Lunch 1",
          "start": "12:41"
        },
        {
          "name": "Lunch 2",
          "start": "13:01"
        },
        {
          "name": "Period 5",
          "start": "13:21"
        },
        {
          "name": "School ends",
          "start": "14:13",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:43"
        },
        {
          "name": "Period 1",
          "start": "08:53"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:37"
        },
        {
          "name": "Period 3",
          "start": "10:57"
        },
        {
          "name": "Period 4",
          "start": "11:49"
        },
        {
          "name": "Lunch 1",
          "start": "12:41"
        },
        {
          "name": "Lunch 2",
          "start": "13:01"
        },
        {
          "name": "Sport",
          "start": "13:21"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Roll Call",
          "start": "08:43"
        },
        {
          "name": "Period 1",
          "start": "08:53"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:37"
        },
        {
          "name": "Period 3",
          "start": "10:57"
        },
        {
          "name": "Period 4",
          "start": "11:49"
        },
        {
          "name": "Lunch 1",
          "start": "12:41"
        },
        {
          "name": "Lunch 2",
          "start": "13:01"
        },
        {
          "name": "Period 5",
          "start": "13:21"
        },
        {
          "name": "Period 6",
          "start": "14:13"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "epping-boys",
    "name": "Epping Boys High School",
    "short": "Epping Boys",
    "region": "Sydney",
    "note": "Wednesday has special schedule with Scripture (Yrs 7-9) at start and Sport after lunch; school ends 2:15pm on Wednesday vs 3:15pm other days",
    "source": "https://eppingboy-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Recess A",
          "start": "10:20"
        },
        {
          "name": "Period 2",
          "start": "10:40"
        },
        {
          "name": "Recess B",
          "start": "11:55"
        },
        {
          "name": "Period 3",
          "start": "12:05"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 4",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Scripture (Yrs 7-9)",
          "start": "08:45"
        },
        {
          "name": "Roll Call & Sports Assembly",
          "start": "09:15"
        },
        {
          "name": "Period 1",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 2",
          "start": "10:55"
        },
        {
          "name": "Lunch",
          "start": "12:05"
        },
        {
          "name": "Sport",
          "start": "12:35"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "fairfield",
    "name": "Fairfield High School",
    "short": "Fairfield",
    "region": "Sydney",
    "note": "Monday is shorter day (ends 14:15, only 5 periods); Tue-Fri has 6 periods ending 15:00. School operates on a 10-day cycle (Week A and Week B).",
    "source": "https://fairfield-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "thu": "s2",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "11:55"
        },
        {
          "name": "Lunch",
          "start": "12:45"
        },
        {
          "name": "Period 5",
          "start": "13:25"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "11:50"
        },
        {
          "name": "Lunch",
          "start": "12:40"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "fairvale",
    "name": "Fairvale High School",
    "short": "Fairvale",
    "region": "Sydney",
    "note": "Single day-type published; two recess breaks and two lunch breaks each day",
    "source": "https://fairvale-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:56"
        },
        {
          "name": "Period 2",
          "start": "09:34"
        },
        {
          "name": "Recess 1",
          "start": "10:12"
        },
        {
          "name": "Period 3",
          "start": "10:27"
        },
        {
          "name": "Period 4",
          "start": "11:05"
        },
        {
          "name": "Recess 2",
          "start": "11:43"
        },
        {
          "name": "Period 5",
          "start": "11:58"
        },
        {
          "name": "Period 6",
          "start": "12:36"
        },
        {
          "name": "Lunch 1",
          "start": "13:14"
        },
        {
          "name": "Lunch 2",
          "start": "13:29"
        },
        {
          "name": "Period 7",
          "start": "13:44"
        },
        {
          "name": "Period 8",
          "start": "14:22"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "fort-street",
    "name": "Fort Street High School",
    "short": "Fort Street",
    "region": "Sydney",
    "note": "6 day-type columns: Monday, Tuesday, Wednesday, Thursday (Period 1 is SRE/Ethics starting 09:00), Assembly Friday, Fortunae Friday. Two alternating Friday variants.",
    "source": "https://fortstreet-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "tue": "s2",
      "thu": "s3",
      "fri": "s5"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Period 4",
          "start": "11:50"
        },
        {
          "name": "Lunch 1",
          "start": "12:45"
        },
        {
          "name": "Lunch 2",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:25"
        },
        {
          "name": "Period 6",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:25"
        },
        {
          "name": "Period 3",
          "start": "10:45"
        },
        {
          "name": "Period 4",
          "start": "11:35"
        },
        {
          "name": "Lunch 1",
          "start": "12:25"
        },
        {
          "name": "Lunch 2",
          "start": "12:45"
        },
        {
          "name": "Period 5",
          "start": "13:05"
        },
        {
          "name": "Period 6",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "SRE and Ethics",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Period 4",
          "start": "11:50"
        },
        {
          "name": "Lunch 1",
          "start": "12:45"
        },
        {
          "name": "Lunch 2",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:25"
        },
        {
          "name": "Period 6",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Assembly",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Period 4",
          "start": "11:50"
        },
        {
          "name": "Lunch 1",
          "start": "12:45"
        },
        {
          "name": "Lunch 2",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:25"
        },
        {
          "name": "Period 6",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s5": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Fortunae",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:20"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Period 4",
          "start": "11:50"
        },
        {
          "name": "Lunch 1",
          "start": "12:45"
        },
        {
          "name": "Lunch 2",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:25"
        },
        {
          "name": "Period 6",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "freshwater-senior",
    "name": "Freshwater Senior Campus",
    "short": "Freshwater Senior Campus",
    "region": "Sydney",
    "note": "Friday has shorter break, mentoring/assembly period, and earlier lunch",
    "source": "https://northernbeaches-s.schools.nsw.gov.au/freshwater-senior-campus/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Early",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Break",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:20"
        },
        {
          "name": "Break",
          "start": "11:35"
        },
        {
          "name": "Period 3",
          "start": "11:55"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 4",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Early",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Break",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:20"
        },
        {
          "name": "Mentoring/Assembly",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:00"
        },
        {
          "name": "Period 3",
          "start": "12:25"
        },
        {
          "name": "Period 4",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "galston",
    "name": "Galston High School",
    "short": "Galston",
    "region": "Sydney",
    "note": "3 distinct day-types: Mon/Wed/Fri (6 periods with mid-afternoon break), Tuesday (Assembly replaces Recess), Thursday (Recess early, different lunch). School ends 15:10 all days.",
    "source": "https://galston-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "fri": "s1",
      "tue": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "08:58"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:42"
        },
        {
          "name": "Period 3",
          "start": "11:06"
        },
        {
          "name": "Lunch",
          "start": "12:01"
        },
        {
          "name": "Period 4",
          "start": "12:31"
        },
        {
          "name": "Period 5",
          "start": "13:26"
        },
        {
          "name": "Break",
          "start": "14:15"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:41"
        },
        {
          "name": "Assembly",
          "start": "10:27"
        },
        {
          "name": "Period 3",
          "start": "11:09"
        },
        {
          "name": "Period 4",
          "start": "12:04"
        },
        {
          "name": "Lunch",
          "start": "13:08"
        },
        {
          "name": "Period 5",
          "start": "13:38"
        },
        {
          "name": "Period 6",
          "start": "14:18"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "09:47"
        },
        {
          "name": "Period 2",
          "start": "10:17"
        },
        {
          "name": "Period 3",
          "start": "11:12"
        },
        {
          "name": "Period 4",
          "start": "12:22"
        },
        {
          "name": "Lunch",
          "start": "13:23"
        },
        {
          "name": "Period 5",
          "start": "14:24"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "georges-river-college-hurstville-boys",
    "name": "Georges River College Hurstville Boys Campus",
    "short": "Georges River College Hurstville Boys Campus",
    "region": "Sydney",
    "note": "Boys campus (hurstvillb-h.schools.nsw.gov.au) redirects to hurstville-h.schools.nsw.gov.au; Wednesday has only 4 periods and ends at 14:30; Thursday also ends at 14:30; Tuesday has Assembly replacing Roll Call; Monday and Friday are identical.",
    "source": "https://hurstville-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call/HELP",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:57"
        },
        {
          "name": "Recess",
          "start": "10:54"
        },
        {
          "name": "Period 3",
          "start": "11:24"
        },
        {
          "name": "Period 4",
          "start": "12:21"
        },
        {
          "name": "Lunch",
          "start": "13:18"
        },
        {
          "name": "Period 5",
          "start": "13:48"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Assembly",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Period 2",
          "start": "10:09"
        },
        {
          "name": "Recess",
          "start": "11:03"
        },
        {
          "name": "Period 3",
          "start": "11:33"
        },
        {
          "name": "Period 4",
          "start": "12:27"
        },
        {
          "name": "Lunch",
          "start": "13:21"
        },
        {
          "name": "Period 5",
          "start": "13:51"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call/HELP",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 5",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Roll Call/HELP",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:54"
        },
        {
          "name": "Recess",
          "start": "10:48"
        },
        {
          "name": "Period 3",
          "start": "11:18"
        },
        {
          "name": "Period 4",
          "start": "12:12"
        },
        {
          "name": "Lunch",
          "start": "13:06"
        },
        {
          "name": "Period 5",
          "start": "13:36"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "georges-river-college-oatley-senior",
    "name": "Georges River College Oatley Senior Campus",
    "short": "Georges River College Oatley Senior Campus",
    "region": "Sydney",
    "note": "Senior campus (Yrs 11-12); optional Period 0 at 08:00 and extension periods after 15:00; Friday has shorter day with Mentor period at 12:30 and Period 4 ending at 14:00; Friday Period 5 not listed",
    "source": "https://oatleysnr-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Mentor Year 12",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "georges-river-college-peakhurst",
    "name": "Georges River College Peakhurst Campus",
    "short": "Georges River College Peakhurst Campus",
    "region": "Sydney",
    "note": "Wednesday is a short day (ends 14:30) with Sport period. Thursday also ends 14:30. Friday Assembly Week is a separate variant with later Period 1 start due to assembly.",
    "source": "https://peakhurst-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "fri": "s4",
      "wed": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Peak Learning / Assembly",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "Final Bell",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Peak Learning / Assembly",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:52"
        },
        {
          "name": "Recess",
          "start": "10:49"
        },
        {
          "name": "Period 3",
          "start": "11:09"
        },
        {
          "name": "Lunch",
          "start": "12:06"
        },
        {
          "name": "Sport",
          "start": "12:45"
        },
        {
          "name": "Final Bell",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Peak Learning / Assembly",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:54"
        },
        {
          "name": "Recess",
          "start": "10:48"
        },
        {
          "name": "Period 3",
          "start": "11:18"
        },
        {
          "name": "Period 4",
          "start": "12:12"
        },
        {
          "name": "Lunch",
          "start": "13:06"
        },
        {
          "name": "Period 5",
          "start": "13:36"
        },
        {
          "name": "Final Bell",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Peak Learning / Assembly",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:25"
        },
        {
          "name": "Period 2",
          "start": "10:20"
        },
        {
          "name": "Recess",
          "start": "11:15"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "Final Bell",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "georges-river-college-penshurst",
    "name": "Georges River College Penshurst Campus",
    "short": "Georges River College Penshurst Campus",
    "region": "Sydney",
    "note": "Three schedule variants: Mon/Tue/Fri, Wednesday, Thursday (sport day)",
    "source": "https://penshurst-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "fri": "s1",
      "wed": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Homeroom",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "14:58",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Homeroom",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "12:20"
        },
        {
          "name": "Period 5",
          "start": "12:50"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Homeroom",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:05"
        },
        {
          "name": "Period 5 (Sport)",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "girraween",
    "name": "Girraween High School",
    "short": "Girraween",
    "region": "Sydney",
    "note": "Monday has Assembly/Meeting 08:45-09:00 before Period 1. Wednesday is Sport day with different structure (2:1:2). Friday Week A Years 7-10 dismissed at 13:25. Wednesday sport: 2:45 bell for grade sport away/home; recreational sport roll call 13:00.",
    "source": "https://girraween-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "thu": "s2",
      "fri": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Assembly/Meeting",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4/L1",
          "start": "12:20"
        },
        {
          "name": "Lunch 1",
          "start": "13:25"
        },
        {
          "name": "Lunch 2/P4",
          "start": "13:45"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4/L1",
          "start": "12:20"
        },
        {
          "name": "Lunch 1",
          "start": "13:25"
        },
        {
          "name": "Lunch 2/P4",
          "start": "13:45"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4/L1",
          "start": "12:10"
        },
        {
          "name": "Lunch 1",
          "start": "12:35"
        },
        {
          "name": "Lunch 2/P4",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "glenmore-park",
    "name": "Glenmore Park High School",
    "short": "Glenmore Park",
    "region": "Sydney",
    "note": "Thursday has two variants (with Assembly / without Assembly). Mon-Wed includes an SP period between Period 2 and Recess. Some Thursday times appeared inconsistent in source HTML.",
    "source": "https://glenmorepk-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s2",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "08:35"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "SP",
          "start": "10:35"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:35"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "12:40"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:39"
        },
        {
          "name": "Recess",
          "start": "10:38"
        },
        {
          "name": "Period 3",
          "start": "11:08"
        },
        {
          "name": "Period 4",
          "start": "12:07"
        },
        {
          "name": "Lunch",
          "start": "13:06"
        },
        {
          "name": "Period 5",
          "start": "13:46"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "glenwood",
    "name": "Glenwood High School",
    "short": "Glenwood",
    "region": "Sydney",
    "note": "Monday early finish 13:30 (staff meeting); Wednesday has Assembly, Sport periods, early dismissal Yr 11-12 at 14:00, Period 4 Connect ends Yr 7-10 at 14:50; Tue/Thu/Fri standard day ends 14:50",
    "source": "https://glenwood-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "thu": "s2",
      "fri": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Lunch",
          "start": "11:45"
        },
        {
          "name": "Period 3",
          "start": "12:15"
        },
        {
          "name": "School ends",
          "start": "13:30",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Transition",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:20"
        },
        {
          "name": "Period 3",
          "start": "11:50"
        },
        {
          "name": "Lunch",
          "start": "13:05"
        },
        {
          "name": "Period 4",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Assembly",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 2 (Sport Yr 7 & 8)",
          "start": "11:00"
        },
        {
          "name": "Lunch",
          "start": "12:15"
        },
        {
          "name": "Period 3 (Sport Yr 9 & 10)",
          "start": "12:45"
        },
        {
          "name": "School ends Yr 11 & 12",
          "start": "14:00"
        },
        {
          "name": "Period 4 Connect",
          "start": "14:05"
        },
        {
          "name": "School ends Yr 7-10",
          "start": "14:50",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "greystanes",
    "name": "Greystanes High School",
    "short": "Greystanes",
    "region": "Sydney",
    "note": "Wednesday has late start with Assembly and Sport; no Roll Call listed",
    "source": "https://greystanes-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:25"
        },
        {
          "name": "Recess 1",
          "start": "09:50"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Recess 2",
          "start": "11:25"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 4",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Recess 1",
          "start": "10:20"
        },
        {
          "name": "Assembly",
          "start": "10:40"
        },
        {
          "name": "Period 2",
          "start": "10:55"
        },
        {
          "name": "Lunch",
          "start": "12:10"
        },
        {
          "name": "Sport",
          "start": "12:40"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "gymea-technology",
    "name": "Gymea Technology High School",
    "short": "Gymea Technology",
    "region": "Sydney",
    "note": "Monday ends after Period 5 at 14:10 (no Period 6). Tuesday and Wednesday share the same full schedule. Thursday has a Pastoral Care session. Friday has extended Recess.",
    "source": "https://gymea-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "thu": "s3",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "10:50"
        },
        {
          "name": "Period 4",
          "start": "11:45"
        },
        {
          "name": "Lunch 1",
          "start": "12:40"
        },
        {
          "name": "Lunch 2",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "14:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "10:50"
        },
        {
          "name": "Period 4",
          "start": "11:45"
        },
        {
          "name": "Lunch 1",
          "start": "12:40"
        },
        {
          "name": "Lunch 2",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Pastoral Care",
          "start": "10:20"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch 1",
          "start": "12:50"
        },
        {
          "name": "Lunch 2",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "Period 6",
          "start": "14:15"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:20"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "11:50"
        },
        {
          "name": "Lunch 1",
          "start": "12:40"
        },
        {
          "name": "Lunch 2",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "heathcote",
    "name": "Heathcote High School",
    "short": "Heathcote",
    "region": "Sydney",
    "note": "A/B week timetable. Tuesday A-week follows the same schedule as Mon/Wed/Fri. Tuesday B-week has no Period 4 before lunch and ends at 14:00. Thursday is Sport day with earlier start and no Roll Call, ending at 14:40.",
    "source": "https://heathcote-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "fri": "s1",
      "tue": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Lunch 1",
          "start": "12:10"
        },
        {
          "name": "Lunch 2",
          "start": "12:30"
        },
        {
          "name": "Sport",
          "start": "12:50"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "hills-sports",
    "name": "Hills Sports High School",
    "short": "Hills Sports",
    "region": "Sydney",
    "note": "Period 00 and Period 0 are listed as 'where applicable'; Period 7 also where applicable. Single day type for all weekdays.",
    "source": "https://hillssport-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 00",
          "start": "06:50"
        },
        {
          "name": "Period 0",
          "start": "07:40"
        },
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:30"
        },
        {
          "name": "Recess",
          "start": "10:20"
        },
        {
          "name": "Period 3",
          "start": "10:50"
        },
        {
          "name": "Period 4",
          "start": "11:40"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 5",
          "start": "13:00"
        },
        {
          "name": "Period 6",
          "start": "13:50"
        },
        {
          "name": "Period 7",
          "start": "14:40"
        },
        {
          "name": "School ends",
          "start": "15:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "holroyd",
    "name": "Holroyd High School",
    "short": "Holroyd",
    "region": "Sydney",
    "note": "Tuesday has Assembly/Year Meeting replacing Period 2 with a shorter slot; Period 4 on Tuesday runs 1.5 hours to end of day",
    "source": "https://holroyd-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Check In",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Break 2",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Check In",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Assembly / Year Meeting",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "10:30"
        },
        {
          "name": "Period 2",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "Break 2",
          "start": "13:00"
        },
        {
          "name": "Period 4",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "homebush-boys",
    "name": "Homebush Boys High School",
    "short": "Homebush Boys",
    "region": "Sydney",
    "note": "Two seasonal timetables: Summer (Term 1 & 4) and Winter (Term 2 & 3). Tuesday differs between seasons. Wednesday is Sport day (House Sport 12:40-14:40, Grade Sport 13:00-15:00). Thursday ends at 14:55.",
    "source": "https://homebushbo-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s3",
      "wed": "s4",
      "thu": "s5",
      "fri": "s6"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:45"
        },
        {
          "name": "Roll Call/Assembly",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:25"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Recess",
          "start": "11:30"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "SRE/HR",
          "start": "13:00"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 4",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Warning Bell",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Roll Call/Assembly",
          "start": "09:50"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Recess",
          "start": "11:30"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "SRE/HR",
          "start": "13:00"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 4",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Warning Bell",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Lunch",
          "start": "12:10"
        },
        {
          "name": "House Sport",
          "start": "12:40"
        },
        {
          "name": "Grade Sport",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s5": [
        {
          "name": "Warning Bell",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:15"
        },
        {
          "name": "Lunch 1",
          "start": "13:15"
        },
        {
          "name": "Lunch 2",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "13:55"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s6": [
        {
          "name": "Warning Bell",
          "start": "08:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "hornsby-girls",
    "name": "Hornsby Girls High School",
    "short": "Hornsby Girls",
    "region": "Sydney",
    "note": "Period 0 (7:30am) and Period 5 (Mon/Tue/Thu/Fri, 2:55pm-4:05pm) appear greyed out/optional. Wednesday has Assembly replacing Period 5. Lunch split into Lunch 1 and Lunch 2.",
    "source": "https://hornsbygir-h.schools.nsw.gov.au/school-life/lesson-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:20"
        },
        {
          "name": "Break",
          "start": "11:35"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Lunch 1",
          "start": "12:55"
        },
        {
          "name": "Lunch 2",
          "start": "13:15"
        },
        {
          "name": "Period 4",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:30"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Recess",
          "start": "09:50"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Break",
          "start": "11:15"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Assembly",
          "start": "12:25"
        },
        {
          "name": "Lunch 1",
          "start": "12:55"
        },
        {
          "name": "Lunch 2",
          "start": "13:15"
        },
        {
          "name": "Period 4",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "hornsby",
    "name": "Hornsby High School",
    "short": "Hornsby",
    "region": "Sydney",
    "note": "Wednesday has early lunch and sport instead of Period 4/5. Tuesday ends earlier than Mon/Thu/Fri.",
    "source": "https://hornsby-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:44"
        },
        {
          "name": "Recess",
          "start": "10:48"
        },
        {
          "name": "Period 3",
          "start": "11:08"
        },
        {
          "name": "Period 4",
          "start": "12:12"
        },
        {
          "name": "Lunch",
          "start": "13:16"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:54",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:44"
        },
        {
          "name": "Recess",
          "start": "10:48"
        },
        {
          "name": "Period 3",
          "start": "11:08"
        },
        {
          "name": "Period 4",
          "start": "11:40"
        },
        {
          "name": "Lunch",
          "start": "12:44"
        },
        {
          "name": "Period 5",
          "start": "13:18"
        },
        {
          "name": "School ends",
          "start": "14:22",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:44"
        },
        {
          "name": "Recess",
          "start": "10:48"
        },
        {
          "name": "Period 3",
          "start": "11:08"
        },
        {
          "name": "Lunch",
          "start": "11:40"
        },
        {
          "name": "Sport",
          "start": "12:20"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "hoxton-park",
    "name": "Hoxton Park High School",
    "short": "Hoxton Park",
    "region": "Sydney",
    "note": "Mon/Wed/Fri includes Assembly at 09:00; Tue/Thu shorter day ends 14:40. Year 11/12 early leave notes on Tue/Thu.",
    "source": "https://hoxtonpark-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "fri": "s1",
      "tue": "s2",
      "thu": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:48"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Assembly",
          "start": "09:00"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Break 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Break 2",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:48"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Break 2",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "hunters-hill",
    "name": "Hunters Hill High School",
    "short": "Hunters Hill",
    "region": "Sydney",
    "note": "Tuesday has Assembly and Sport instead of normal periods; Wednesday has Walanga Muru/SRE and split Period 4 end times for Yr 7-9 vs Yr 10-12",
    "source": "https://huntershd-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Assembly",
          "start": "11:55"
        },
        {
          "name": "Lunch",
          "start": "12:20"
        },
        {
          "name": "Sport",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Walanga Muru/SRE",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "hurlstone-agricultural",
    "name": "Hurlstone Agricultural High School",
    "short": "Hurlstone Agricultural",
    "region": "Sydney",
    "note": "Thursday early finish: Yr 11-12 dismissed after Period 2 (11:40), Yr 7-10 dismissed after Period 3 (13:05). Thursday variant shows earliest dismissal. No roll call listed on page.",
    "source": "https://hurlstone-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "fri": "s1",
      "thu": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:20"
        },
        {
          "name": "Transition",
          "start": "11:40"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Lunch 1",
          "start": "13:05"
        },
        {
          "name": "Lunch 2",
          "start": "13:25"
        },
        {
          "name": "Period 4",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:20"
        },
        {
          "name": "School ends (Yr 11-12)",
          "start": "11:40"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "School ends (Yr 7-10)",
          "start": "13:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "ingleburn",
    "name": "Ingleburn High School",
    "short": "Ingleburn",
    "region": "Sydney",
    "note": "Wednesday ends at Period 4/Lunch (no Period 5 or Lunch break); Wednesday finishes at 13:30",
    "source": "https://ingleburn-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "School ends",
          "start": "13:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "j-j-cahill-memorial",
    "name": "J J Cahill Memorial High School",
    "short": "J J Cahill Memorial",
    "region": "Sydney",
    "note": "Monday has Assembly and shorter day (ends 14:10). Wednesday has Sport 13:30-15:00 for years 7-10. Friday alternates Week A (Year Meeting, compressed periods) and Week B (standard). Tuesday and Thursday share identical times.",
    "source": "https://jjcahill-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "thu": "s2",
      "wed": "s3",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Assembly",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "11:40"
        },
        {
          "name": "Break 2",
          "start": "12:40"
        },
        {
          "name": "Period 5",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Break 2",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Break 2",
          "start": "13:00"
        },
        {
          "name": "Sport",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Roll Call (Year Meeting)",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:20"
        },
        {
          "name": "Period 2",
          "start": "10:15"
        },
        {
          "name": "Break 1",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:40"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Break 2",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "james-meehan",
    "name": "James Meehan High School",
    "short": "James Meehan",
    "region": "Sydney",
    "note": "Wednesday has School Assembly at 12:30 (40 min) and early finish at 14:40; Mon/Tue/Thu/Fri finish at 15:00",
    "source": "https://jamesmeeha-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "School Assembly",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 4",
          "start": "13:40"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "james-ruse-agricultural",
    "name": "James Ruse Agricultural High School",
    "short": "James Ruse Agricultural",
    "region": "Sydney",
    "note": "Wednesday has shorter day with Sport/Lunch and Scripture; no explicit roll call listed",
    "source": "https://jamesruse-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Connect @ Ruse",
          "start": "10:50"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Lunch/Sport",
          "start": "12:10"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "Scripture",
          "start": "14:30"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "jamison",
    "name": "Jamison High School",
    "short": "Jamison",
    "region": "Sydney",
    "note": "Wednesday has two separate variants: Juniors (4 periods, ends 14:00) and Seniors (4 periods, ends 13:30). Mon/Tue/Thu/Fri have 5 periods ending 14:40.",
    "source": "https://jamison-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Homeroom",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:40"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Homeroom/Umatter",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Homeroom/Umatter",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "School ends",
          "start": "13:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "killara",
    "name": "Killara High School",
    "short": "Killara",
    "region": "Sydney",
    "note": "Bell Times 2026. Monday/Tuesday share one schedule, Wednesday early finish at 14:30, Thursday has Year 7 and Year 8-10 Sport rotations, Friday same as Mon/Tue. Period 0 (07:40-08:40) is Year 12 and some Year 11 Extension only. PLTM (14:40-15:40) Wednesday is Staff Only.",
    "source": "https://killara-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s2",
      "thu": "s3",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (Yr12/Ext)",
          "start": "07:40"
        },
        {
          "name": "MG",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0 (Yr12/Ext)",
          "start": "07:40"
        },
        {
          "name": "MG",
          "start": "08:45"
        },
        {
          "name": "Period 1 / Extended MG / Assemblies",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:25"
        },
        {
          "name": "Recess",
          "start": "10:25"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0 (Yr12/Ext)",
          "start": "07:40"
        },
        {
          "name": "Period 1 (Yr7 Sport)",
          "start": "08:45"
        },
        {
          "name": "Period 2 (Yr7 Sport)",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Lunch",
          "start": "12:20"
        },
        {
          "name": "Period 4 (Yr8-10 Sport)",
          "start": "12:55"
        },
        {
          "name": "Period 5 (Yr8-10 Sport)",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "killarney-heights",
    "name": "Killarney Heights High School",
    "short": "Killarney Heights",
    "region": "Sydney",
    "note": "Tuesday has shorter periods (asterisked, likely assembly). Wednesday has extended lunch and Sport (Year 7-10 only) 1:00-2:30, school ends 14:30. Mon/Thu/Fri school ends 15:10. Tuesday school ends 14:30.",
    "source": "https://killarney-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Break 1",
          "start": "09:55"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Break 2",
          "start": "12:20"
        },
        {
          "name": "Period 4",
          "start": "12:25"
        },
        {
          "name": "Lunch 1",
          "start": "13:25"
        },
        {
          "name": "Lunch 2",
          "start": "13:45"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Break 1",
          "start": "09:55"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Break 2",
          "start": "12:00"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch 1",
          "start": "12:55"
        },
        {
          "name": "Lunch 2",
          "start": "13:15"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Break 1",
          "start": "09:55"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Lunch 1",
          "start": "12:20"
        },
        {
          "name": "Lunch 2",
          "start": "12:40"
        },
        {
          "name": "Sport",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "kingsgrove-north",
    "name": "Kingsgrove North High School",
    "short": "Kingsgrove North",
    "region": "Sydney",
    "note": "Wednesday has Assembly after Period 1 and ends at 14:30 (no Period 5). Mon/Tue/Thu/Fri end at 15:05.",
    "source": "https://kingsgrovn-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Assembly",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 2",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 4",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "kirrawee",
    "name": "Kirrawee High School",
    "short": "Kirrawee",
    "region": "Sydney",
    "note": "Monday, Wednesday, Friday are identical. Thursday has an early finish (13:58). Tuesday has Assembly and Sport. Tuesday has complex split times for Assembly/Recess, using the overall flow for the schedule.",
    "source": "https://kirrawee-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "fri": "s1",
      "tue": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:52"
        },
        {
          "name": "Period 1 + Roll Call",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:58"
        },
        {
          "name": "Recess",
          "start": "10:58"
        },
        {
          "name": "Period 3",
          "start": "11:28"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:52"
        },
        {
          "name": "Period 1 + Roll Call",
          "start": "08:52"
        },
        {
          "name": "Assembly / Recess",
          "start": "09:56"
        },
        {
          "name": "Period 3",
          "start": "10:46"
        },
        {
          "name": "Period 4",
          "start": "11:48"
        },
        {
          "name": "Lunch",
          "start": "12:48"
        },
        {
          "name": "Sport / Seniors",
          "start": "13:18"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:52"
        },
        {
          "name": "Period 1 + Roll Call",
          "start": "08:52"
        },
        {
          "name": "Recess",
          "start": "09:56"
        },
        {
          "name": "Period 2",
          "start": "10:26"
        },
        {
          "name": "Period 3",
          "start": "11:28"
        },
        {
          "name": "Lunch",
          "start": "12:28"
        },
        {
          "name": "Period 4",
          "start": "12:58"
        },
        {
          "name": "School ends",
          "start": "13:58",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "kogarah",
    "name": "Kogarah High School",
    "short": "Kogarah",
    "region": "Sydney",
    "note": "Same bell times all days; Wednesday has sport periods 3-4 (Yr10) and 5-6 (Yr9/7-8); Tuesday Week A fortnight has assembly in Period 2",
    "source": "https://kogarah-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:25"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Period 4",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "12:35"
        },
        {
          "name": "Period 5",
          "start": "13:05"
        },
        {
          "name": "Period 6",
          "start": "13:55"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "ku-ring-gai",
    "name": "Ku-ring-gai High School",
    "short": "Ku-ring-gai",
    "region": "Sydney",
    "note": "Tuesday has a different schedule (Break 1 after Period 1). Wednesday has Assembly during Period 4 but same bell times as Mon/Thu/Fri.",
    "source": "https://kuringgai-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "09:00"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Period 2",
          "start": "10:14"
        },
        {
          "name": "Break 1",
          "start": "11:18"
        },
        {
          "name": "Period 3",
          "start": "11:48"
        },
        {
          "name": "Period 4",
          "start": "12:52"
        },
        {
          "name": "Break 2",
          "start": "13:56"
        },
        {
          "name": "Period 5",
          "start": "14:26"
        },
        {
          "name": "School ends",
          "start": "15:30",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "09:00"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Break 1",
          "start": "10:14"
        },
        {
          "name": "Period 2",
          "start": "10:44"
        },
        {
          "name": "Period 3",
          "start": "11:48"
        },
        {
          "name": "Break 2",
          "start": "12:52"
        },
        {
          "name": "Period 4",
          "start": "13:22"
        },
        {
          "name": "Period 5",
          "start": "14:26"
        },
        {
          "name": "School ends",
          "start": "15:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "leumeah",
    "name": "Leumeah High School",
    "short": "Leumeah",
    "region": "Sydney",
    "note": "Tuesday has Assembly/Year Meetings instead of Home Room and finishes earlier (14:15 vs 14:55)",
    "source": "https://leumeah-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:44"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Home Room",
          "start": "10:25"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "11:55"
        },
        {
          "name": "Lunch",
          "start": "12:45"
        },
        {
          "name": "Period 5",
          "start": "13:15"
        },
        {
          "name": "Period 6",
          "start": "14:05"
        },
        {
          "name": "School Finish",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:44"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Assembly/Year Meetings",
          "start": "10:25"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch",
          "start": "12:55"
        },
        {
          "name": "Period 5",
          "start": "13:25"
        },
        {
          "name": "School Finish",
          "start": "14:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "liverpool-boys",
    "name": "Liverpool Boys High School",
    "short": "Liverpool Boys",
    "region": "Sydney",
    "note": "Wednesday ends after Period 4 at 13:35 (no Period 5 or Lunch). Tuesday Week B has Assembly 10:44-10:59. Thursday Period 4 label notes 'Thurs B CG'.",
    "source": "https://liverpoolb-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s3",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "PAT",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:28"
        },
        {
          "name": "Period 4",
          "start": "12:28"
        },
        {
          "name": "Lunch",
          "start": "13:28"
        },
        {
          "name": "Period 5",
          "start": "14:06"
        },
        {
          "name": "School ends",
          "start": "15:06",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "PAT",
          "start": "11:12"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "School ends",
          "start": "13:35",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:47"
        },
        {
          "name": "Assembly",
          "start": "10:44"
        },
        {
          "name": "Recess",
          "start": "10:59"
        },
        {
          "name": "PAT",
          "start": "11:14"
        },
        {
          "name": "Period 3",
          "start": "11:37"
        },
        {
          "name": "Period 4",
          "start": "12:34"
        },
        {
          "name": "Lunch",
          "start": "13:31"
        },
        {
          "name": "Period 5",
          "start": "14:09"
        },
        {
          "name": "School ends",
          "start": "15:06",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "liverpool-girls",
    "name": "Liverpool Girls High School",
    "short": "Liverpool Girls",
    "region": "Sydney",
    "note": "Two-week cycle (Week A odd, Week B even). Wednesday has Study period and whole school early finish at 14:05. Mon/Tue/Fri have Stage 6 early finish during lunch (Tue Week A only). Thu is standard.",
    "source": "https://liverpool-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Study",
          "start": "11:35"
        },
        {
          "name": "Period 3",
          "start": "12:05"
        },
        {
          "name": "Period 4",
          "start": "13:05"
        },
        {
          "name": "School ends",
          "start": "14:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "mackellar-girls",
    "name": "Mackellar Girls Campus",
    "short": "Mackellar Girls Campus",
    "region": "Sydney",
    "note": "Monday is a late start (Student Activities/Staff Meeting 8:44-9:30am, Warning Bell 9:30am). Tue/Thu have optional Period 0 (8:00-8:40) for some Yr 11/12. Wednesday has Sports Afternoon for Yrs 9/10 in Period 4A slot. All 5 days have distinct timetables.",
    "source": "https://northernbeaches-s.schools.nsw.gov.au/mackellar-girls-campus/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4",
      "fri": "s5"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "09:30"
        },
        {
          "name": "Period 1A",
          "start": "09:32"
        },
        {
          "name": "Period 1B",
          "start": "10:10"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 2A",
          "start": "11:05"
        },
        {
          "name": "Period 2B",
          "start": "11:40"
        },
        {
          "name": "Period 3A",
          "start": "12:15"
        },
        {
          "name": "Period 3B",
          "start": "12:50"
        },
        {
          "name": "Lunch 1st Half",
          "start": "13:25"
        },
        {
          "name": "Lunch 2nd Half",
          "start": "13:45"
        },
        {
          "name": "Period 4A",
          "start": "14:05"
        },
        {
          "name": "Period 4B",
          "start": "14:40"
        },
        {
          "name": "School ends",
          "start": "15:14",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:42"
        },
        {
          "name": "Period 1A",
          "start": "08:44"
        },
        {
          "name": "Period 1B",
          "start": "09:25"
        },
        {
          "name": "Home Group DEAR",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "10:15"
        },
        {
          "name": "Period 2A",
          "start": "10:35"
        },
        {
          "name": "Period 2B",
          "start": "11:15"
        },
        {
          "name": "Period 3A",
          "start": "11:55"
        },
        {
          "name": "Period 3B",
          "start": "12:35"
        },
        {
          "name": "Lunch 1st Half",
          "start": "13:15"
        },
        {
          "name": "Lunch 2nd Half",
          "start": "13:35"
        },
        {
          "name": "Period 4A",
          "start": "13:55"
        },
        {
          "name": "Period 4B",
          "start": "14:35"
        },
        {
          "name": "School ends",
          "start": "15:14",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Warning Bell",
          "start": "08:42"
        },
        {
          "name": "Period 1A",
          "start": "08:44"
        },
        {
          "name": "Period 1B",
          "start": "09:25"
        },
        {
          "name": "Outdoor Assembly Home Group",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "10:20"
        },
        {
          "name": "Period 2A",
          "start": "10:40"
        },
        {
          "name": "Period 2B",
          "start": "11:20"
        },
        {
          "name": "Period 3",
          "start": "11:55"
        },
        {
          "name": "Lunch 1st Half",
          "start": "12:35"
        },
        {
          "name": "Lunch 2nd Half",
          "start": "12:55"
        },
        {
          "name": "Period 4A",
          "start": "13:15"
        },
        {
          "name": "Period 4B",
          "start": "13:55"
        },
        {
          "name": "Period 4C",
          "start": "14:35"
        },
        {
          "name": "School ends",
          "start": "15:14",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Warning Bell",
          "start": "08:42"
        },
        {
          "name": "Period 1A",
          "start": "08:44"
        },
        {
          "name": "Period 1B",
          "start": "09:25"
        },
        {
          "name": "Home Group DEAR",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "10:20"
        },
        {
          "name": "Period 2A",
          "start": "10:45"
        },
        {
          "name": "Period 2B",
          "start": "11:25"
        },
        {
          "name": "Period 3A",
          "start": "12:00"
        },
        {
          "name": "Period 3B",
          "start": "12:40"
        },
        {
          "name": "Lunch 1st Half",
          "start": "13:15"
        },
        {
          "name": "Lunch 2nd Half",
          "start": "13:35"
        },
        {
          "name": "Period 4A",
          "start": "13:55"
        },
        {
          "name": "Period 4B",
          "start": "14:35"
        },
        {
          "name": "School ends",
          "start": "15:14",
          "terminal": true
        }
      ],
      "s5": [
        {
          "name": "Warning Bell",
          "start": "08:42"
        },
        {
          "name": "Period 1A",
          "start": "08:44"
        },
        {
          "name": "Period 1B",
          "start": "09:25"
        },
        {
          "name": "Assembly Home Group",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "10:25"
        },
        {
          "name": "Period 2A",
          "start": "10:45"
        },
        {
          "name": "Period 2B",
          "start": "11:25"
        },
        {
          "name": "Period 3A",
          "start": "12:00"
        },
        {
          "name": "Period 3B",
          "start": "12:40"
        },
        {
          "name": "Lunch 1st Half",
          "start": "13:15"
        },
        {
          "name": "Lunch 2nd Half",
          "start": "13:35"
        },
        {
          "name": "Period 4A",
          "start": "13:55"
        },
        {
          "name": "Period 4B",
          "start": "14:35"
        },
        {
          "name": "School ends",
          "start": "15:14",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "macquarie-fields",
    "name": "Macquarie Fields High School",
    "short": "Macquarie Fields",
    "region": "Sydney",
    "note": "Monday has Assembly 09:05-09:35 so Period 1 starts later at 09:35. Tue-Fri Period 1 starts 09:15. Period 0 and Period 5 exist for some seniors only (08:00 and 15:15 respectively).",
    "source": "https://macfields-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "thu": "s2",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (seniors)",
          "start": "08:00"
        },
        {
          "name": "Roll Call",
          "start": "08:55"
        },
        {
          "name": "Assembly",
          "start": "09:05"
        },
        {
          "name": "Period 1",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 2",
          "start": "11:15"
        },
        {
          "name": "Period 3",
          "start": "12:25"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 4",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0 (seniors)",
          "start": "08:00"
        },
        {
          "name": "Roll Call",
          "start": "09:05"
        },
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 2",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "12:15"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 4",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "manly-selective",
    "name": "Manly Selective Campus",
    "short": "Manly Selective Campus",
    "region": "Sydney",
    "note": "Wednesday is a short day ending at 14:30 with Assembly replacing Recess slot; Period 0 is optional early period. Wednesday Period 4 data appeared inconsistent and was omitted.",
    "source": "https://northernbeaches-s.schools.nsw.gov.au/manly-campus/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:55"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch 1",
          "start": "12:55"
        },
        {
          "name": "Lunch 2",
          "start": "13:15"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "Period 6",
          "start": "14:30"
        },
        {
          "name": "School ends",
          "start": "15:25",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:55"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Assembly",
          "start": "10:45"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Lunch 1",
          "start": "12:20"
        },
        {
          "name": "Lunch 2",
          "start": "12:40"
        },
        {
          "name": "Period 5",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "marrickville",
    "name": "Marrickville High School",
    "short": "Marrickville",
    "region": "Sydney",
    "note": "Monday has assembly at 08:45 with later period start (08:58) and later finish (15:04). Tuesday has sport in afternoon and early finish at 14:15. Wed/Thu/Fri share identical times with finish at 15:04. Some minor inconsistencies in raw page data.",
    "source": "https://marrickvil-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s3",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:58"
        },
        {
          "name": "Period 2",
          "start": "09:49"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:01"
        },
        {
          "name": "Lunch",
          "start": "12:52"
        },
        {
          "name": "Period 5",
          "start": "13:22"
        },
        {
          "name": "Period 6",
          "start": "14:13"
        },
        {
          "name": "School ends",
          "start": "15:04",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:44"
        },
        {
          "name": "Recess",
          "start": "10:36"
        },
        {
          "name": "Period 3",
          "start": "11:06"
        },
        {
          "name": "Period 4",
          "start": "11:58"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Sport",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:44"
        },
        {
          "name": "Recess",
          "start": "10:36"
        },
        {
          "name": "Period 3",
          "start": "11:06"
        },
        {
          "name": "Period 4",
          "start": "11:58"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:12"
        },
        {
          "name": "School ends",
          "start": "15:04",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "marsden",
    "name": "Marsden High School",
    "short": "Marsden",
    "region": "Sydney",
    "note": "Tuesday is Sport day with early lunch and sport 1:00pm-2:30pm (buses depart 12:30pm). No explicit roll call shown.",
    "source": "https://marsden-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Sport",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "matraville-sports",
    "name": "Matraville Sports High School",
    "short": "Matraville Sports",
    "region": "Sydney",
    "note": "Two-week timetable. Friday Week B has Assembly and shifted times. Friday Week A likely follows standard schedule. Period 2 start on standard day inferred as 09:50 (table had duplicate entry).",
    "source": "https://matrasport-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Assembly",
          "start": "10:25"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:15"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "Period 6",
          "start": "14:15"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "menai",
    "name": "Menai High School",
    "short": "Menai",
    "region": "Sydney",
    "note": "Thursday has Assembly and Sport instead of Periods 4-6; ends at 14:25. Mon/Wed/Fri share one schedule; Tuesday also follows this schedule.",
    "source": "https://menai-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "fri": "s1",
      "thu": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:52"
        },
        {
          "name": "Roll Call",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Warning Bell",
          "start": "11:07"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch 1",
          "start": "12:50"
        },
        {
          "name": "Lunch 2",
          "start": "13:10"
        },
        {
          "name": "Warning Bell",
          "start": "13:27"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "Period 6",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:52"
        },
        {
          "name": "Roll Call",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Warning Bell",
          "start": "10:57"
        },
        {
          "name": "Assembly",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch 1",
          "start": "12:15"
        },
        {
          "name": "Lunch 2",
          "start": "12:35"
        },
        {
          "name": "Warning Bell",
          "start": "12:52"
        },
        {
          "name": "Sport",
          "start": "12:55"
        },
        {
          "name": "School ends",
          "start": "14:25",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "merrylands",
    "name": "Merrylands High School",
    "short": "Merrylands",
    "region": "Sydney",
    "note": "Period 0 (07:45) for Year 11 Extended students only. Wed/Thu Period 3 includes Assembly for Years 7-10 but times are identical.",
    "source": "https://merryland-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (Yr 11 Ext)",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "mitchell",
    "name": "Mitchell High School",
    "short": "Mitchell",
    "region": "Sydney",
    "note": "4 distinct day-types: Mon (Assembly replaces Period 3), Tue, Wed, Thu+Fri. Wed page shows Lunch at 13:30 but Period 5 at 13:25 — likely a page error; times copied as published. Thu/Fri shows 13:50 Final Bell then 15:00 Final Bell — possibly Thu early finish with staff meetings, Fri normal finish; both grouped by page.",
    "source": "https://mitchell-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (Year 12)",
          "start": "08:00"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Assembly",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0 (Year 12)",
          "start": "08:00"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch",
          "start": "12:55"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0 (Year 12)",
          "start": "08:00"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Period 5",
          "start": "13:25"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0 (Year 12)",
          "start": "08:00"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:50"
        },
        {
          "name": "School ends",
          "start": "13:50",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "model-farms",
    "name": "Model Farms High School",
    "short": "Model Farms",
    "region": "Sydney",
    "note": "Wednesday is an early finish day (14:40). Tuesday has two sub-variants: assembly (weeks 3-8) and non-assembly; assembly Tuesday end time had inconsistency on the page so treated as 15:00. Lunch is split into Lunch 1 and Lunch 2.",
    "source": "https://modelfarms-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:42"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:28"
        },
        {
          "name": "Period 3",
          "start": "10:48"
        },
        {
          "name": "Period 4",
          "start": "11:41"
        },
        {
          "name": "Lunch 1",
          "start": "12:34"
        },
        {
          "name": "Lunch 2",
          "start": "12:54"
        },
        {
          "name": "Period 5",
          "start": "13:14"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:39"
        },
        {
          "name": "Period 2",
          "start": "09:28"
        },
        {
          "name": "Recess",
          "start": "10:17"
        },
        {
          "name": "Period 3",
          "start": "10:37"
        },
        {
          "name": "Period 4",
          "start": "11:26"
        },
        {
          "name": "Assembly",
          "start": "12:15"
        },
        {
          "name": "Lunch 1",
          "start": "12:45"
        },
        {
          "name": "Lunch 2",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:25"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:39"
        },
        {
          "name": "Period 2",
          "start": "09:34"
        },
        {
          "name": "Recess",
          "start": "10:29"
        },
        {
          "name": "Period 3",
          "start": "10:49"
        },
        {
          "name": "Period 4",
          "start": "11:44"
        },
        {
          "name": "Lunch 1",
          "start": "12:39"
        },
        {
          "name": "Lunch 2",
          "start": "12:59"
        },
        {
          "name": "Period 5",
          "start": "13:19"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "moorebank",
    "name": "Moorebank High School",
    "short": "Moorebank",
    "region": "Sydney",
    "note": "Tuesday has shorter periods and Sport period; Years 11-12 finish at 14:25 on Tuesday unless timetabled during Sport",
    "source": "https://moorebank-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:40"
        },
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:14"
        },
        {
          "name": "Period 2",
          "start": "10:34"
        },
        {
          "name": "Period 3",
          "start": "11:51"
        },
        {
          "name": "Lunch 1",
          "start": "13:08"
        },
        {
          "name": "Lunch 2",
          "start": "13:28"
        },
        {
          "name": "Period 4",
          "start": "13:48"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:40"
        },
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:06"
        },
        {
          "name": "Period 2",
          "start": "10:26"
        },
        {
          "name": "Period 3",
          "start": "11:37"
        },
        {
          "name": "Lunch",
          "start": "12:15"
        },
        {
          "name": "Period 4 (Sport)",
          "start": "12:55"
        },
        {
          "name": "School ends",
          "start": "14:25",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "mosman",
    "name": "Mosman High School",
    "short": "Mosman",
    "region": "Sydney",
    "note": "Wednesday starts later (9:30am) with 58-min periods; Mon/Tue/Thu/Fri use 65-min periods starting 8:55am. Sport on Thursday P1&P2 (Yr7-8) or P3&P4 (Yr9-10).",
    "source": "https://mosman-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:53"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Lunch",
          "start": "13:45"
        },
        {
          "name": "Period 5",
          "start": "14:15"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "09:28"
        },
        {
          "name": "Period 1",
          "start": "09:30"
        },
        {
          "name": "Period 2",
          "start": "10:28"
        },
        {
          "name": "Recess",
          "start": "11:26"
        },
        {
          "name": "Period 3",
          "start": "11:56"
        },
        {
          "name": "Period 4",
          "start": "12:54"
        },
        {
          "name": "Lunch",
          "start": "13:52"
        },
        {
          "name": "Period 5",
          "start": "14:22"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "mount-annan",
    "name": "Mount Annan High School",
    "short": "Mount Annan",
    "region": "Sydney",
    "note": "2-week cycle (Week A/B). Monday Week A has Year Assembly 09:00-09:10; Monday Week B matches Tue/Thu/Fri. Wednesday is an early finish day.",
    "source": "https://mountannan-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s2",
      "tue": "s2",
      "thu": "s2",
      "fri": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Year Assembly",
          "start": "09:00"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "14:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "narrabeen-sports",
    "name": "Narrabeen Sports High School",
    "short": "Narrabeen Sports",
    "region": "Sydney",
    "note": "Wednesday has a special schedule with In-house groups ending earlier at 14:50; Thu/Fri have Assembly at 10:50. First table labelled Mon/Tue/Wed but Wednesday variant differs significantly — interpreted as Mon/Tue standard, Wed special, Thu/Fri assembly schedule.",
    "source": "https://narrabeen-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s2",
      "thu": "s3",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:58"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "11:10"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch 1",
          "start": "13:25"
        },
        {
          "name": "Lunch 2",
          "start": "13:45"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:58"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "In-house Groups",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch 1",
          "start": "12:50"
        },
        {
          "name": "Lunch 2",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Warning Bell",
          "start": "08:58"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Assembly",
          "start": "10:50"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "Lunch 1",
          "start": "13:20"
        },
        {
          "name": "Lunch 2",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "nepean-creative-and-performing-arts",
    "name": "Nepean Creative and Performing Arts High School",
    "short": "Nepean Creative and Performing Arts",
    "region": "Sydney",
    "note": "Two term-based schedules: Summer (Term 1 & 4) and Winter (Term 2 & 3). Mon/Tue/Thu/Fri is identical across both. Wednesday differs: Summer has Year Meeting/Assembly 08:40-09:10 then Period 1 09:10; Winter has Period 1 08:40 then Year Meeting/Assembly 09:40. Ensemble/Company students 07:30 and Period 0 07:55 (Yr 11-12 only) are early optional/extra sessions.",
    "source": "https://nepean-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Ensemble/Company Students",
          "start": "07:30"
        },
        {
          "name": "Period 0 (Yr 11-12)",
          "start": "07:55"
        },
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "13:55"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Ensemble/Company Students (Term 1 & 4)",
          "start": "07:30"
        },
        {
          "name": "Roll Call",
          "start": "08:35"
        },
        {
          "name": "Year Meeting/Assembly",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:10"
        },
        {
          "name": "Recess",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Lunch",
          "start": "12:20"
        },
        {
          "name": "Period 4/Sport",
          "start": "13:00"
        },
        {
          "name": "Period 5/Sport",
          "start": "13:48"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Ensemble/Company Students (Term 2 & 3)",
          "start": "07:30"
        },
        {
          "name": "Roll Call",
          "start": "08:35"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Year Meeting/Assembly",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Lunch",
          "start": "12:20"
        },
        {
          "name": "Period 4/Sport",
          "start": "13:00"
        },
        {
          "name": "Period 5/Sport",
          "start": "13:48"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "newtown-high-school-of-the-performing-arts",
    "name": "Newtown High School of the Performing Arts",
    "short": "Newtown High School of the Performing Arts",
    "region": "Sydney",
    "note": "Thursday has two variants: Standard (with Assembly/Meeting replacing Recess slot) and Wet Weather. Three total variants.",
    "source": "https://newtown-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "fri": "s1",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:17"
        },
        {
          "name": "Period 2",
          "start": "10:37"
        },
        {
          "name": "Changeover",
          "start": "11:54"
        },
        {
          "name": "Period 3",
          "start": "11:56"
        },
        {
          "name": "Lunch 1",
          "start": "13:13"
        },
        {
          "name": "Lunch 2",
          "start": "13:33"
        },
        {
          "name": "Period 4",
          "start": "13:53"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Assembly/Meeting",
          "start": "10:17"
        },
        {
          "name": "Recess",
          "start": "10:47"
        },
        {
          "name": "Period 3",
          "start": "11:07"
        },
        {
          "name": "Lunch 1",
          "start": "12:24"
        },
        {
          "name": "Lunch 2",
          "start": "12:44"
        },
        {
          "name": "Period 4",
          "start": "13:04"
        },
        {
          "name": "School ends",
          "start": "14:21",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:25"
        },
        {
          "name": "Period 3",
          "start": "10:45"
        },
        {
          "name": "Lunch 1",
          "start": "12:10"
        },
        {
          "name": "Lunch 2",
          "start": "12:33"
        },
        {
          "name": "Period 4",
          "start": "12:56"
        },
        {
          "name": "School ends",
          "start": "14:21",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "normanhurst-boys",
    "name": "Normanhurst Boys High School",
    "short": "Normanhurst Boys",
    "region": "Sydney",
    "note": "Wednesday has shorter periods with a Wellbeing Period and Sport after lunch; no Roll Call listed",
    "source": "https://normanhurb-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:28"
        },
        {
          "name": "Period 3",
          "start": "10:48"
        },
        {
          "name": "Period 4",
          "start": "11:41"
        },
        {
          "name": "Lunch",
          "start": "12:34"
        },
        {
          "name": "Period 5",
          "start": "13:14"
        },
        {
          "name": "Period 6",
          "start": "14:07"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:28"
        },
        {
          "name": "Wellbeing Period",
          "start": "10:16"
        },
        {
          "name": "Recess",
          "start": "10:42"
        },
        {
          "name": "Period 3",
          "start": "11:02"
        },
        {
          "name": "Lunch",
          "start": "11:50"
        },
        {
          "name": "Sport",
          "start": "12:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "north-sydney-boys",
    "name": "North Sydney Boys High School",
    "short": "North Sydney Boys",
    "region": "Sydney",
    "note": "3 day-types: Mon/Thu/Fri (7 periods, ends 16:05), Tuesday (6 periods, ends 14:30), Wednesday (Sport 12:30-14:30, ends 16:05). Alternate Bells variant exists for VOR days (assembly/year meeting) but is not tied to a fixed weekday.",
    "source": "https://northsydbo-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "P0",
          "start": "08:00"
        },
        {
          "name": "P1",
          "start": "08:50"
        },
        {
          "name": "P2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "P3",
          "start": "11:00"
        },
        {
          "name": "P4",
          "start": "11:55"
        },
        {
          "name": "Lunch 1",
          "start": "12:50"
        },
        {
          "name": "Lunch 2",
          "start": "13:10"
        },
        {
          "name": "P5",
          "start": "13:30"
        },
        {
          "name": "P6",
          "start": "14:25"
        },
        {
          "name": "P7",
          "start": "15:15"
        },
        {
          "name": "School ends",
          "start": "16:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "P0",
          "start": "08:00"
        },
        {
          "name": "P1",
          "start": "08:50"
        },
        {
          "name": "P2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "P3",
          "start": "10:50"
        },
        {
          "name": "P4",
          "start": "11:35"
        },
        {
          "name": "Lunch 1",
          "start": "12:20"
        },
        {
          "name": "Lunch 2",
          "start": "12:40"
        },
        {
          "name": "P5",
          "start": "13:00"
        },
        {
          "name": "P6",
          "start": "13:45"
        },
        {
          "name": "SRE",
          "start": "14:30"
        },
        {
          "name": "P7",
          "start": "15:15"
        },
        {
          "name": "School ends",
          "start": "16:05",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "P0",
          "start": "08:00"
        },
        {
          "name": "P1",
          "start": "08:50"
        },
        {
          "name": "P2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "P3",
          "start": "10:55"
        },
        {
          "name": "Lunch 1",
          "start": "11:45"
        },
        {
          "name": "Lunch 2",
          "start": "12:10"
        },
        {
          "name": "Sport",
          "start": "12:30"
        },
        {
          "name": "P7",
          "start": "15:15"
        },
        {
          "name": "School ends",
          "start": "16:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "north-sydney-girls",
    "name": "North Sydney Girls High School",
    "short": "North Sydney Girls",
    "region": "Sydney",
    "note": "Wednesday has shorter periods and includes SRE at end of day",
    "source": "https://northsydgi-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "14:15"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Lunch",
          "start": "12:10"
        },
        {
          "name": "Period 4",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:45"
        },
        {
          "name": "SRE",
          "start": "14:40"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "parramatta",
    "name": "Parramatta High School",
    "short": "Parramatta",
    "region": "Sydney",
    "note": "Wednesday has two variants: no-hall-assembly and hall-assembly (SA/YM/WL block). Monday has 5 periods; Tue/Thu/Fri have 5 periods; Wednesday variants have 4 periods.",
    "source": "https://parramatta-h.schools.nsw.gov.au/our-school/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "thu": "s2",
      "fri": "s2",
      "wed": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:40"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "Period 5",
          "start": "13:40"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call / Assembly",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Lunch",
          "start": "12:40"
        },
        {
          "name": "Period 4",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "SA/YM/WL",
          "start": "12:05"
        },
        {
          "name": "Lunch",
          "start": "12:45"
        },
        {
          "name": "Period 4",
          "start": "13:15"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "pendle-hill",
    "name": "Pendle Hill High School",
    "short": "Pendle Hill",
    "region": "Sydney",
    "note": "Monday has Assembly after Roll Call; Wednesday early dismissal at 14:30 with only 5 periods (no Period 6)",
    "source": "https://pendlehill-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s2",
      "tue": "s3",
      "thu": "s3",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:38"
        },
        {
          "name": "Assembly",
          "start": "08:47"
        },
        {
          "name": "Period 1",
          "start": "08:57"
        },
        {
          "name": "Period 2",
          "start": "09:49"
        },
        {
          "name": "Recess",
          "start": "10:41"
        },
        {
          "name": "Recess ends",
          "start": "11:09"
        },
        {
          "name": "Period 3",
          "start": "11:11"
        },
        {
          "name": "Period 4",
          "start": "12:02"
        },
        {
          "name": "Lunch",
          "start": "12:53"
        },
        {
          "name": "Lunch ends",
          "start": "13:21"
        },
        {
          "name": "Period 5",
          "start": "13:23"
        },
        {
          "name": "Period 6",
          "start": "14:14"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:38"
        },
        {
          "name": "Period 1",
          "start": "08:47"
        },
        {
          "name": "Period 2",
          "start": "09:43"
        },
        {
          "name": "Recess",
          "start": "10:39"
        },
        {
          "name": "Recess ends",
          "start": "11:09"
        },
        {
          "name": "Period 3",
          "start": "11:11"
        },
        {
          "name": "Period 4",
          "start": "12:07"
        },
        {
          "name": "Lunch",
          "start": "13:03"
        },
        {
          "name": "Lunch ends",
          "start": "13:33"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:38"
        },
        {
          "name": "Period 1",
          "start": "08:47"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:33"
        },
        {
          "name": "Recess ends",
          "start": "11:01"
        },
        {
          "name": "Period 3",
          "start": "11:03"
        },
        {
          "name": "Period 4",
          "start": "11:56"
        },
        {
          "name": "Lunch",
          "start": "12:49"
        },
        {
          "name": "Lunch ends",
          "start": "13:17"
        },
        {
          "name": "Period 5",
          "start": "13:19"
        },
        {
          "name": "Period 6",
          "start": "14:12"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "pennant-hills",
    "name": "Pennant Hills High School",
    "short": "Pennant Hills",
    "region": "Sydney",
    "note": "Two term variants for Wednesday: Terms 1 & 4 have Assembly at start (08:55-09:15); Terms 2 & 3 have Assembly mid-morning (10:14-10:34). Thursday has split Period 3 with Sport for Years 8,9,10 (13:14-14:30). School ends 15:15 on Thursday, 15:20 all other days.",
    "source": "https://pennanthil-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "fri": "s1",
      "wed": "s3",
      "thu": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:19"
        },
        {
          "name": "Period 2",
          "start": "10:39"
        },
        {
          "name": "Transition",
          "start": "11:58"
        },
        {
          "name": "Period 3",
          "start": "12:03"
        },
        {
          "name": "Lunch 1",
          "start": "13:22"
        },
        {
          "name": "Lunch 2",
          "start": "13:42"
        },
        {
          "name": "Period 4",
          "start": "14:02"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Assembly",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Recess",
          "start": "10:34"
        },
        {
          "name": "Period 2",
          "start": "10:54"
        },
        {
          "name": "Transition",
          "start": "12:07"
        },
        {
          "name": "Period 3",
          "start": "12:12"
        },
        {
          "name": "Lunch 1",
          "start": "13:26"
        },
        {
          "name": "Lunch 2",
          "start": "13:46"
        },
        {
          "name": "Period 4",
          "start": "14:06"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Assembly",
          "start": "10:14"
        },
        {
          "name": "Recess",
          "start": "10:34"
        },
        {
          "name": "Period 2",
          "start": "10:54"
        },
        {
          "name": "Transition",
          "start": "12:07"
        },
        {
          "name": "Period 3",
          "start": "12:12"
        },
        {
          "name": "Lunch 1",
          "start": "13:26"
        },
        {
          "name": "Lunch 2",
          "start": "13:46"
        },
        {
          "name": "Period 4",
          "start": "14:06"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:35"
        },
        {
          "name": "Period 3A",
          "start": "11:50"
        },
        {
          "name": "Lunch 1",
          "start": "12:32"
        },
        {
          "name": "Lunch 2",
          "start": "12:53"
        },
        {
          "name": "Period 3B / Sport (Yrs 8-10)",
          "start": "13:14"
        },
        {
          "name": "Period 4",
          "start": "13:57"
        },
        {
          "name": "School ends",
          "start": "15:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "penrith-selective",
    "name": "Penrith Selective High School",
    "short": "Penrith Selective",
    "region": "Sydney",
    "note": "Week A and B share identical times. Wednesday is shorter with assembly periods: Period 2 for Terms 1&4 (summer), Period 4 for Terms 2&3 (winter). Thursday has year-group assemblies rotating across Week A/B.",
    "source": "https://penrith-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:58"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:12"
        },
        {
          "name": "Lunch",
          "start": "13:04"
        },
        {
          "name": "Period 5",
          "start": "13:34"
        },
        {
          "name": "Period 6",
          "start": "14:26"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 5",
          "start": "13:00"
        },
        {
          "name": "Period 6",
          "start": "13:53"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "picnic-point",
    "name": "Picnic Point High School",
    "short": "Picnic Point",
    "region": "Sydney",
    "note": "Period 0 (07:45) is senior students only. Tuesday has sport afternoon; senior students have Period 4 (12:05-13:05) while junior students have Lunch 1/2 at the same time. School ends 14:20 on Tuesday.",
    "source": "https://picnicpt-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (seniors)",
          "start": "07:45"
        },
        {
          "name": "Assembly / Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Period 4",
          "start": "12:25"
        },
        {
          "name": "Lunch 1",
          "start": "13:25"
        },
        {
          "name": "Lunch 2",
          "start": "13:45"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0 (seniors)",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Lunch 1",
          "start": "12:05"
        },
        {
          "name": "Lunch 2",
          "start": "12:25"
        },
        {
          "name": "Sport",
          "start": "12:45"
        },
        {
          "name": "School ends",
          "start": "14:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "pittwater",
    "name": "Pittwater High School",
    "short": "Pittwater",
    "region": "Sydney",
    "note": "Monday has Assembly/Year meetings in P2 slot (longer block); Friday has Roll Call then P2, and Sport for Yr 8-10 (Yr 7/11/12 have P4+P5 instead); Seniors P6 runs 14:30-15:20 all days; general student dismissal 14:30 with Learning Centre open until 15:15",
    "source": "https://pittwater-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "thu": "s2",
      "fri": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Seniors PO",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Assembly",
          "start": "09:40"
        },
        {
          "name": "Morning Tea",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Seniors PO",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Morning Tea",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Seniors PO",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Morning Tea",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Lunch",
          "start": "12:10"
        },
        {
          "name": "Sport",
          "start": "12:40"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "port-hacking",
    "name": "Port Hacking High School",
    "short": "Port Hacking",
    "region": "Sydney",
    "note": "10-day timetable (Week A/B); each weekday has a distinct schedule. Tuesday ends early at 15:45 for Teacher Professional Learning. Thursday has Sport after Period 4, ending at 14:30.",
    "source": "https://porthackin-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4",
      "fri": "s5"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Break",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Break",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Recess",
          "start": "10:05"
        },
        {
          "name": "Period 2",
          "start": "10:35"
        },
        {
          "name": "Assembly",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Lunch",
          "start": "12:35"
        },
        {
          "name": "Period 4",
          "start": "13:05"
        },
        {
          "name": "Teacher Professional Learning",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:45",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Break",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Year Meeting",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Break",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 3",
          "start": "10:55"
        },
        {
          "name": "Period 4",
          "start": "11:40"
        },
        {
          "name": "Lunch",
          "start": "12:25"
        },
        {
          "name": "Sport",
          "start": "12:55"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s5": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Break",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:15"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Period 4",
          "start": "12:40"
        },
        {
          "name": "Lunch",
          "start": "13:35"
        },
        {
          "name": "Period 5",
          "start": "14:05"
        },
        {
          "name": "School ends",
          "start": "15:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "prairiewood",
    "name": "Prairiewood High School",
    "short": "Prairiewood",
    "region": "Sydney",
    "note": "Two-week cycle: Mon-Thu and Fri Week A follow standard schedule; Fri Week B school ends at 13:05 after Period 4.",
    "source": "https://prairiewoo-h.schools.nsw.gov.au/our-school/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:20"
        },
        {
          "name": "Roll Call",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "08:35"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:20"
        },
        {
          "name": "Roll Call",
          "start": "08:25"
        },
        {
          "name": "Period 1",
          "start": "08:35"
        },
        {
          "name": "Period 2",
          "start": "09:35"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "School ends",
          "start": "13:05",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "punchbowl-boys",
    "name": "Punchbowl Boys High School",
    "short": "Punchbowl Boys",
    "region": "Sydney",
    "note": "Page only shows 4 periods per day with no afternoon sessions or final dismissal bell; schedule appears incomplete. Mon/Wed/Fri and Tue end at 13:35, Thu ends at 13:10 — likely truncated.",
    "source": "https://punchbowlb-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "low",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "fri": "s1",
      "tue": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "School ends",
          "start": "13:35",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Lunch",
          "start": "12:35"
        },
        {
          "name": "School ends",
          "start": "13:35",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Break",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:15"
        },
        {
          "name": "School ends",
          "start": "13:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "quakers-hill",
    "name": "Quakers Hill High School",
    "short": "Quakers Hill",
    "region": "Sydney",
    "note": "Monday has Assembly instead of Period 4; Wednesday has early recess and shorter periods with dismissal at 14:45",
    "source": "https://quakershil-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "mon": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Period 4",
          "start": "12:25"
        },
        {
          "name": "Lunch",
          "start": "13:25"
        },
        {
          "name": "Period 5",
          "start": "13:55"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Assembly",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Recess",
          "start": "10:05"
        },
        {
          "name": "Period 2",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:25"
        },
        {
          "name": "Period 4",
          "start": "12:55"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "richmond",
    "name": "Richmond High School",
    "short": "Richmond",
    "region": "Sydney",
    "note": "Source: https://richmond-h.schools.nsw.gov.au/school-life/bell-times",
    "source": "https://richmond-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Home Room",
          "start": "08:35"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:45"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Period 3",
          "start": "11:15"
        },
        {
          "name": "Period 4",
          "start": "12:15"
        },
        {
          "name": "Lunch",
          "start": "13:15"
        },
        {
          "name": "Period 5",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "riverside-girls",
    "name": "Riverside Girls High School",
    "short": "Riverside Girls",
    "region": "Sydney",
    "note": "Thursday early finish at 14:35; Wednesday has Assembly with slightly different period lengths; Period 0 optional early start 07:45",
    "source": "https://riversideg-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "fri": "s1",
      "wed": "s2",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Recess 1",
          "start": "10:15"
        },
        {
          "name": "Period 2",
          "start": "10:25"
        },
        {
          "name": "Recess 2",
          "start": "11:40"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:15"
        },
        {
          "name": "Period 4",
          "start": "13:55"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Recess 1",
          "start": "10:30"
        },
        {
          "name": "Period 2",
          "start": "10:40"
        },
        {
          "name": "Recess 2",
          "start": "11:50"
        },
        {
          "name": "Period 3",
          "start": "12:10"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 4",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Recess 1",
          "start": "10:15"
        },
        {
          "name": "Period 2",
          "start": "10:25"
        },
        {
          "name": "Recess 2",
          "start": "11:40"
        },
        {
          "name": "Period 3",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "13:15"
        },
        {
          "name": "Period 4",
          "start": "13:55"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "riverstone",
    "name": "Riverstone High School",
    "short": "Riverstone",
    "region": "Sydney",
    "note": "Tuesday has no Period 4 and early finish at 1:55pm; all other days finish at 2:55pm",
    "source": "https://riverstone-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "13:55"
        },
        {
          "name": "Final Bell",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 5",
          "start": "12:55"
        },
        {
          "name": "Final Bell",
          "start": "13:55",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "rose-bay-secondary",
    "name": "Rose Bay Secondary College",
    "short": "Rose Bay",
    "region": "Sydney",
    "note": "Tuesday is a shorter day ending ~14:00 with sport; Mon/Wed/Thu/Fri have 5 periods ending 15:00",
    "source": "https://rosebay-h.schools.nsw.gov.au/school-life/bell-times-and-attendance",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Break 2",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Break 1",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Break 2",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "ryde-secondary",
    "name": "Ryde Secondary College",
    "short": "Ryde",
    "region": "Sydney",
    "note": "Tuesday starts earlier (8:35am) than other days (8:45am); Tuesday afternoon periods may be incomplete in source page extraction (gap between 12:45 and 15:00). Mon/Wed/Thu/Fri share identical schedule.",
    "source": "https://rydesc-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "First Bell",
          "start": "08:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "Lunch 1",
          "start": "13:20"
        },
        {
          "name": "Lunch 2",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "First Bell",
          "start": "08:35"
        },
        {
          "name": "Roll Call",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Lunch 1",
          "start": "12:10"
        },
        {
          "name": "Lunch 2/Sport",
          "start": "12:30"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "sefton",
    "name": "Sefton High School",
    "short": "Sefton",
    "region": "Sydney",
    "note": "3 variants: Mon/Tue (students end 14:30, Period 5 is staff meeting), Wed/Thu/Fri (ends 16:00), and Assembly day (occasional, not tied to fixed weekdays). Period 0 is optional early session.",
    "source": "https://sefton-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s2",
      "thu": "s2",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Break 1",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:25"
        },
        {
          "name": "Break 2a",
          "start": "11:45"
        },
        {
          "name": "Break 2b",
          "start": "12:00"
        },
        {
          "name": "Period 3",
          "start": "12:15"
        },
        {
          "name": "Break 3",
          "start": "12:55"
        },
        {
          "name": "Period 4",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Break 1",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:25"
        },
        {
          "name": "Break 2a",
          "start": "11:45"
        },
        {
          "name": "Break 2b",
          "start": "12:00"
        },
        {
          "name": "Period 3",
          "start": "12:15"
        },
        {
          "name": "Break 3",
          "start": "13:35"
        },
        {
          "name": "Period 4",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "15:10"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "seven-hills",
    "name": "Seven Hills High School",
    "short": "Seven Hills",
    "region": "Sydney",
    "note": "Week A/Week B same schedule. Thursday is early finish (2:00pm) with no Period 4. Alternate Assembly Thursday (Thu A) has different structure with Assembly at 9:50am.",
    "source": "https://sevenhills-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "fri": "s1",
      "thu": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Connect",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "Final Bell",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Connect",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 5",
          "start": "13:00"
        },
        {
          "name": "Final Bell",
          "start": "14:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Connect",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Assembly",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:30"
        },
        {
          "name": "Period 2",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:50"
        },
        {
          "name": "Lunch",
          "start": "12:40"
        },
        {
          "name": "Period 4",
          "start": "13:10"
        },
        {
          "name": "Final Bell",
          "start": "14:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "south-sydney",
    "name": "South Sydney High School",
    "short": "South Sydney",
    "region": "Sydney",
    "note": "Mon/Wed/Thu/Fri identical across all terms. Tuesday differs by term: Term1&4 has Assembly at 09:03 before Period 1; Term2&3 has Assembly at 10:49 after Period 2. Finish on Mon/Wed/Thu/Fri shown as 3:00/3:15. Wet weather Tuesday variant exists (no assembly, slightly shifted times, finish 14:38).",
    "source": "https://sthsydney-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Homeroom",
          "start": "08:55"
        },
        {
          "name": "Period 1",
          "start": "09:03"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:47"
        },
        {
          "name": "Period 3",
          "start": "11:07"
        },
        {
          "name": "Period 4",
          "start": "11:59"
        },
        {
          "name": "Lunch 1",
          "start": "12:51"
        },
        {
          "name": "Lunch 2",
          "start": "13:11"
        },
        {
          "name": "Period 5",
          "start": "13:31"
        },
        {
          "name": "Period 6",
          "start": "14:23"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Homeroom",
          "start": "08:55"
        },
        {
          "name": "Assembly",
          "start": "09:03"
        },
        {
          "name": "Period 1",
          "start": "09:13"
        },
        {
          "name": "Period 2",
          "start": "10:06"
        },
        {
          "name": "Recess",
          "start": "10:59"
        },
        {
          "name": "Period 3",
          "start": "11:19"
        },
        {
          "name": "Period 4",
          "start": "12:12"
        },
        {
          "name": "Lunch 1",
          "start": "13:05"
        },
        {
          "name": "Lunch 2",
          "start": "13:25"
        },
        {
          "name": "Period 5",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "14:38",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "st-george-girls",
    "name": "St George Girls High School",
    "short": "St George Girls",
    "region": "Sydney",
    "note": "Tuesday has two variants: Week A students dismissed at 13:20 (staff meeting 14:00-15:00); Week B has Period 5 then staff meeting. Mon/Wed/Thu/Fri Period 6 is Offline (not student-attended). Period 0 is optional early period.",
    "source": "https://stgeorgegi-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:20"
        },
        {
          "name": "School ends",
          "start": "13:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "st-johns-park",
    "name": "St Johns Park High School",
    "short": "St Johns Park",
    "region": "Sydney",
    "note": "Wednesday (Week B) is an early finish day with only 3 periods; senior students have non-school day, junior students have early leave; staff PL 13:50-14:50.",
    "source": "https://stjohnspk-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Transition",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Break 1",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Transition",
          "start": "11:45"
        },
        {
          "name": "Period 3",
          "start": "11:50"
        },
        {
          "name": "Break 2",
          "start": "13:05"
        },
        {
          "name": "Period 4",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:50",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:30"
        },
        {
          "name": "Transition",
          "start": "08:40"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Break 1",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Break 2",
          "start": "11:45"
        },
        {
          "name": "Period 3",
          "start": "12:15"
        },
        {
          "name": "School ends",
          "start": "13:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "st-marys-senior",
    "name": "St Marys Senior High School",
    "short": "St Marys Senior",
    "region": "Sydney",
    "note": "Tue has Period 5 (14:40-16:00); Mon/Wed/Thu/Fri end at 14:40. A separate 'Period 0 Bell Times' schedule also published (Period 0: 08:20-09:30, then shifted periods) for days with Period 0 — day of week unknown.",
    "source": "https://stmaryssen-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:20"
        },
        {
          "name": "Recess",
          "start": "09:40"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 4",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "14:40",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:20"
        },
        {
          "name": "Recess",
          "start": "09:40"
        },
        {
          "name": "Period 2",
          "start": "10:10"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 4",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "14:40"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "strathfield-girls",
    "name": "Strathfield Girls High School",
    "short": "Strathfield Girls",
    "region": "Sydney",
    "note": "Wednesday has DEAR and SRE at start; Tuesday has Assembly during Period 3 and earlier lunch/period 4-5. Mon/Thu/Fri share identical schedule.",
    "source": "https://strathfieg-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Warning Bell",
          "start": "08:42"
        },
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:05"
        },
        {
          "name": "Period 3",
          "start": "11:25"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Warning Bell",
          "start": "08:42"
        },
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:05"
        },
        {
          "name": "Recess",
          "start": "10:00"
        },
        {
          "name": "Period 2",
          "start": "10:20"
        },
        {
          "name": "Period 3 / Assembly",
          "start": "11:25"
        },
        {
          "name": "Lunch 1",
          "start": "12:00"
        },
        {
          "name": "Lunch 2",
          "start": "12:20"
        },
        {
          "name": "Period 4",
          "start": "12:45"
        },
        {
          "name": "Period 5",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "14:45",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Warning Bell",
          "start": "08:42"
        },
        {
          "name": "DEAR and SRE",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:15"
        },
        {
          "name": "Period 2",
          "start": "10:15"
        },
        {
          "name": "Recess",
          "start": "11:15"
        },
        {
          "name": "Period 3",
          "start": "11:35"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch 1",
          "start": "13:30"
        },
        {
          "name": "Lunch 2",
          "start": "13:50"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "sydney-girls",
    "name": "Sydney Girls High School",
    "short": "Sydney Girls",
    "region": "Sydney",
    "note": "2-week cycle (Week A/B). All days share identical bell times. Fri Week A has SRE during Period 1; Fri Week B has Assembly during Period 2. HIVE/Sport applies to specific year groups on Tue (Yr 7/8) and Thu (Yr 9/10).",
    "source": "https://sydneygirl-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Period 4",
          "start": "12:25"
        },
        {
          "name": "Lunch",
          "start": "13:25"
        },
        {
          "name": "HIVE",
          "start": "14:05"
        },
        {
          "name": "Period 5",
          "start": "14:20"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "sydney-secondary-college-balmain",
    "name": "Sydney Secondary College Balmain Campus",
    "short": "Sydney Secondary College Balmain Campus",
    "region": "Sydney",
    "note": "Tuesday ends early with Sport; Wednesday has SWELL session and early finish; Thursday includes SRE overlapping Period 3",
    "source": "https://balmain-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3",
      "thu": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Lunch",
          "start": "12:15"
        },
        {
          "name": "Sport",
          "start": "12:45"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "SWELL",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:05"
        },
        {
          "name": "Period 4",
          "start": "12:05"
        },
        {
          "name": "Lunch",
          "start": "13:05"
        },
        {
          "name": "Period 5",
          "start": "13:35"
        },
        {
          "name": "School ends",
          "start": "14:34",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "SRE",
          "start": "11:45"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "sydney-secondary-college-blackwattle-bay",
    "name": "Sydney Secondary College Blackwattle Bay Campus",
    "short": "Sydney Secondary College Blackwattle Bay Campus",
    "region": "Sydney",
    "note": "Fortnightly Week A/B rotation. Monday has 5 periods (ends 16:13). Fridays (and Tuesday in Week B) have a 25-min Mentoring block replacing the short break after Period 2, shifting Period 3 start to 12:15 and school ends 15:23. Tue/Wed/Thu (Week A) and Wed/Thu (Week B) follow the standard 4-period schedule ending 14:53.",
    "source": "https://sscbwattle-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "thu": "s2",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:08"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Break",
          "start": "11:43"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "12:58"
        },
        {
          "name": "Period 4",
          "start": "13:40"
        },
        {
          "name": "Break",
          "start": "14:53"
        },
        {
          "name": "Period 5",
          "start": "15:00"
        },
        {
          "name": "School ends",
          "start": "16:13",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:08"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Break",
          "start": "11:43"
        },
        {
          "name": "Period 3",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "12:58"
        },
        {
          "name": "Period 4",
          "start": "13:40"
        },
        {
          "name": "School ends",
          "start": "14:53",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Recess",
          "start": "10:08"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Mentoring",
          "start": "11:43"
        },
        {
          "name": "Break",
          "start": "12:08"
        },
        {
          "name": "Period 3",
          "start": "12:15"
        },
        {
          "name": "Lunch",
          "start": "13:28"
        },
        {
          "name": "Period 4",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:23",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "sydney-secondary-college-leichhardt",
    "name": "Sydney Secondary College Leichhardt Campus",
    "short": "Sydney Secondary College Leichhardt Campus",
    "region": "Sydney",
    "note": "Week A and Week B share the same schedule. Tuesday has shorter periods and Sport in the afternoon. Wednesday has Pastoral Activities/Assembly in Period 3 slot.",
    "source": "https://leichhardt-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:35"
        },
        {
          "name": "Lunch",
          "start": "13:40"
        },
        {
          "name": "Period 5",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Period 3",
          "start": "11:20"
        },
        {
          "name": "Lunch",
          "start": "12:15"
        },
        {
          "name": "Sport",
          "start": "12:45"
        },
        {
          "name": "School ends",
          "start": "14:25",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 1",
          "start": "08:50"
        },
        {
          "name": "Period 2",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Assembly/Moomba",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:15"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 5",
          "start": "13:50"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "sydney-technical",
    "name": "Sydney Technical High School",
    "short": "Sydney Technical",
    "region": "Sydney",
    "note": "Wednesday is Sports Day with early finish at 14:25. Assembly days (approx 50% of Mon/Tue/Thu/Fri) use a different 60-min class schedule; regular Mon/Tue/Thu/Fri use 75-min classes finishing at 15:00.",
    "source": "https://sydneytech-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Break",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:15"
        },
        {
          "name": "Recess",
          "start": "11:30"
        },
        {
          "name": "Period 3",
          "start": "11:50"
        },
        {
          "name": "Lunch",
          "start": "13:05"
        },
        {
          "name": "Period 4",
          "start": "13:45"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Break",
          "start": "10:10"
        },
        {
          "name": "Period 2",
          "start": "10:30"
        },
        {
          "name": "Lunch+",
          "start": "11:45"
        },
        {
          "name": "Lunch",
          "start": "12:05"
        },
        {
          "name": "Sport",
          "start": "12:45"
        },
        {
          "name": "School ends",
          "start": "14:25",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:55"
        },
        {
          "name": "Assembly",
          "start": "09:55"
        },
        {
          "name": "Recess",
          "start": "10:55"
        },
        {
          "name": "Period 2",
          "start": "11:15"
        },
        {
          "name": "Break",
          "start": "12:15"
        },
        {
          "name": "Period 3",
          "start": "12:20"
        },
        {
          "name": "Lunch",
          "start": "13:20"
        },
        {
          "name": "Period 4",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "sylvania",
    "name": "Sylvania High School",
    "short": "Sylvania",
    "region": "Sydney",
    "note": "Tuesday ends after Period 5 at 14:08. Thursday has no Assembly; Period 1 includes Roll Call; afternoon is Sport ending 14:30. Wednesday and Friday share identical schedule.",
    "source": "https://sylvania-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s3",
      "fri": "s3",
      "thu": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "07:54"
        },
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:50"
        },
        {
          "name": "Recess",
          "start": "10:40"
        },
        {
          "name": "Period 3",
          "start": "11:10"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "07:54"
        },
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:44"
        },
        {
          "name": "Recess",
          "start": "10:36"
        },
        {
          "name": "Period 3",
          "start": "11:06"
        },
        {
          "name": "Period 4",
          "start": "11:58"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "14:08",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "07:54"
        },
        {
          "name": "Assembly",
          "start": "08:45"
        },
        {
          "name": "Period 1",
          "start": "08:52"
        },
        {
          "name": "Period 2",
          "start": "09:44"
        },
        {
          "name": "Recess",
          "start": "10:36"
        },
        {
          "name": "Period 3",
          "start": "11:06"
        },
        {
          "name": "Period 4",
          "start": "11:58"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:10"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0",
          "start": "07:54"
        },
        {
          "name": "Period 1 (inc. Roll Call)",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:34"
        },
        {
          "name": "Recess",
          "start": "10:23"
        },
        {
          "name": "Period 3",
          "start": "10:53"
        },
        {
          "name": "Period 4",
          "start": "11:42"
        },
        {
          "name": "Lunch",
          "start": "12:31"
        },
        {
          "name": "Sport",
          "start": "13:01"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "tempe",
    "name": "Tempe High School",
    "short": "Tempe",
    "region": "Sydney",
    "note": "Week A/B schedule (2024). Wednesday has Assembly for Period 2. Tuesday has Sport (Yr 7-10) with early Period 4 end and students dismissed at 14:15 (teachers meetings). Period 0 and Period 7 are seniors only.",
    "source": "https://tempe-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "fri": "s1",
      "wed": "s2",
      "tue": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:50"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "11:55"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:15"
        },
        {
          "name": "Period 7 (Seniors)",
          "start": "15:05"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:50"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Assembly",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4",
          "start": "11:55"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Period 5",
          "start": "13:20"
        },
        {
          "name": "Period 6",
          "start": "14:15"
        },
        {
          "name": "Period 7 (Seniors)",
          "start": "15:05"
        },
        {
          "name": "School ends",
          "start": "16:00",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0 (Seniors)",
          "start": "07:50"
        },
        {
          "name": "Period 1",
          "start": "08:45"
        },
        {
          "name": "Period 2",
          "start": "09:40"
        },
        {
          "name": "Recess",
          "start": "10:35"
        },
        {
          "name": "Period 3",
          "start": "11:00"
        },
        {
          "name": "Period 4 (Sport 7-10)",
          "start": "11:55"
        },
        {
          "name": "Lunch (Sport 7-10)",
          "start": "12:25"
        },
        {
          "name": "Period 5 (Sport 7-10)",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "the-forest",
    "name": "The Forest High School",
    "short": "The Forest",
    "region": "Sydney",
    "note": "Individual period times not listed on page; recess varies by day. Wednesday has sport for Years 8-10 (12:55-14:30); Years 7, 11, 12 have normal classes. No period-by-period breakdown available (PDF 404).",
    "source": "https://theforest-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "medium",
    "days": {
      "mon": "s1",
      "thu": "s1",
      "tue": "s2",
      "wed": "s3",
      "fri": "s4"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:40"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:40"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Roll Call",
          "start": "08:40"
        },
        {
          "name": "Recess",
          "start": "10:50"
        },
        {
          "name": "Lunch",
          "start": "12:05"
        },
        {
          "name": "Sport",
          "start": "12:55"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Roll Call",
          "start": "08:40"
        },
        {
          "name": "Recess",
          "start": "10:45"
        },
        {
          "name": "Lunch",
          "start": "13:10"
        },
        {
          "name": "School ends",
          "start": "14:55",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "thomas-reddall",
    "name": "Thomas Reddall High School",
    "short": "Thomas Reddall",
    "region": "Sydney",
    "note": "Tuesday has Assembly 10:26-10:41 shifting subsequent periods; Tuesday afternoon (Break 2, Period 5) not shown on page but Period 4 ends 13:17",
    "source": "https://thomasredd-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "wed": "s1",
      "thu": "s1",
      "fri": "s1",
      "tue": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 1",
          "start": "08:20"
        },
        {
          "name": "Period 2",
          "start": "09:23"
        },
        {
          "name": "Break 1",
          "start": "10:26"
        },
        {
          "name": "Period 3",
          "start": "10:56"
        },
        {
          "name": "Period 4",
          "start": "11:59"
        },
        {
          "name": "Break 2",
          "start": "13:02"
        },
        {
          "name": "Period 5",
          "start": "13:32"
        },
        {
          "name": "School ends",
          "start": "14:35",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 1",
          "start": "08:20"
        },
        {
          "name": "Period 2",
          "start": "09:23"
        },
        {
          "name": "Assembly",
          "start": "10:26"
        },
        {
          "name": "Break 1",
          "start": "10:41"
        },
        {
          "name": "Period 3",
          "start": "11:11"
        },
        {
          "name": "Period 4",
          "start": "12:14"
        },
        {
          "name": "School ends",
          "start": "13:17",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "wiley-park-girls",
    "name": "Wiley Park Girls High School",
    "short": "Wiley Park Girls",
    "region": "Sydney",
    "note": "Monday is a 4-period day ending at 14:15; Tuesday-Friday is a 5-period day ending at 15:10",
    "source": "https://wileyparkg-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s2",
      "wed": "s2",
      "thu": "s2",
      "fri": "s2"
    },
    "schedules": {
      "s1": [
        {
          "name": "Start",
          "start": "08:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:02"
        },
        {
          "name": "Period 2",
          "start": "10:05"
        },
        {
          "name": "Recess",
          "start": "11:07"
        },
        {
          "name": "Period 3",
          "start": "11:37"
        },
        {
          "name": "Lunch",
          "start": "12:41"
        },
        {
          "name": "Period 4",
          "start": "13:11"
        },
        {
          "name": "School ends",
          "start": "14:15",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Start",
          "start": "08:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:02"
        },
        {
          "name": "Recess",
          "start": "11:04"
        },
        {
          "name": "Period 3",
          "start": "11:34"
        },
        {
          "name": "Period 4",
          "start": "12:36"
        },
        {
          "name": "Lunch",
          "start": "13:38"
        },
        {
          "name": "Period 5",
          "start": "14:08"
        },
        {
          "name": "School ends",
          "start": "15:10",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "willoughby-girls",
    "name": "Willoughby Girls High School",
    "short": "Willoughby Girls",
    "region": "Sydney",
    "note": "Fortnightly Week A/B timetable. Thu Week A follows Tue/Assembly schedule (variant 2); Thu Week B follows Mon/Fri standard schedule (variant 1). Period 0 (08:00) is optional early start; Periods 7-8 (15:20-17:00) are optional extension for senior students.",
    "source": "https://willoughbg-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "fri": "s1",
      "tue": "s2",
      "thu": "s2",
      "wed": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:53"
        },
        {
          "name": "Recess",
          "start": "10:46"
        },
        {
          "name": "Period 3",
          "start": "11:06"
        },
        {
          "name": "Period 4",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "12:53"
        },
        {
          "name": "Period 5",
          "start": "13:33"
        },
        {
          "name": "Period 6",
          "start": "14:27"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:48"
        },
        {
          "name": "Assembly/SRE",
          "start": "10:36"
        },
        {
          "name": "Recess",
          "start": "11:08"
        },
        {
          "name": "Period 3",
          "start": "11:28"
        },
        {
          "name": "Period 4",
          "start": "12:16"
        },
        {
          "name": "Lunch",
          "start": "13:04"
        },
        {
          "name": "Period 5",
          "start": "13:44"
        },
        {
          "name": "Period 6",
          "start": "14:32"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "08:00"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "09:49"
        },
        {
          "name": "Recess",
          "start": "10:38"
        },
        {
          "name": "Period 3",
          "start": "10:58"
        },
        {
          "name": "Period 4",
          "start": "11:47"
        },
        {
          "name": "Wrap-Up",
          "start": "12:36"
        },
        {
          "name": "Lunch",
          "start": "13:02"
        },
        {
          "name": "Period 5",
          "start": "13:42"
        },
        {
          "name": "Period 6",
          "start": "14:31"
        },
        {
          "name": "School ends",
          "start": "15:20",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "woolooware",
    "name": "Woolooware High School",
    "short": "Woolooware",
    "region": "Sydney",
    "note": "Separate schedules for Years 7-10 and Years 11-12. Tue and Thu have Sport instead of afternoon periods for Yrs 7-10. Years 11-12 finish earlier most days with Period 0 from 7:45am.",
    "source": "https://woolooware-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s3",
      "wed": "s3",
      "fri": "s3",
      "tue": "s4",
      "thu": "s5"
    },
    "schedules": {
      "s1": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "Period 5",
          "start": "14:00"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Sport",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:30",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Period 4",
          "start": "12:30"
        },
        {
          "name": "School ends",
          "start": "13:30",
          "terminal": true
        }
      ],
      "s4": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "12:30"
        },
        {
          "name": "Period 4",
          "start": "13:00"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ],
      "s5": [
        {
          "name": "Period 0",
          "start": "07:45"
        },
        {
          "name": "Roll Call",
          "start": "08:50"
        },
        {
          "name": "Period 1",
          "start": "09:00"
        },
        {
          "name": "Period 2",
          "start": "10:00"
        },
        {
          "name": "Recess",
          "start": "11:00"
        },
        {
          "name": "Period 3",
          "start": "11:30"
        },
        {
          "name": "Lunch",
          "start": "13:30"
        },
        {
          "name": "School ends",
          "start": "14:00",
          "terminal": true
        }
      ]
    }
  },
  {
    "id": "wyndham",
    "name": "Wyndham College",
    "short": "Wyndham College",
    "region": "Sydney",
    "note": "Friday ends at 12:50 (no lunch/afternoon sessions); Wednesday has early finish at 14:10 with different afternoon structure",
    "source": "https://wyndhamcol-h.schools.nsw.gov.au/school-life/bell-times",
    "checked": true,
    "needsReview": false,
    "confidence": "high",
    "days": {
      "mon": "s1",
      "tue": "s1",
      "thu": "s1",
      "wed": "s2",
      "fri": "s3"
    },
    "schedules": {
      "s1": [
        {
          "name": "Sessions 1 & 2",
          "start": "08:00"
        },
        {
          "name": "Recess",
          "start": "09:40"
        },
        {
          "name": "CONNECT",
          "start": "10:10"
        },
        {
          "name": "Sessions 3 & 4",
          "start": "10:20"
        },
        {
          "name": "Session 5",
          "start": "12:00"
        },
        {
          "name": "Lunch",
          "start": "12:50"
        },
        {
          "name": "Sessions 6 & 7",
          "start": "13:20"
        },
        {
          "name": "School ends",
          "start": "15:00",
          "terminal": true
        }
      ],
      "s2": [
        {
          "name": "Sessions 1 & 2",
          "start": "08:00"
        },
        {
          "name": "Recess",
          "start": "09:40"
        },
        {
          "name": "CONNECT",
          "start": "10:10"
        },
        {
          "name": "Sessions 3 & 4",
          "start": "10:20"
        },
        {
          "name": "Lunch",
          "start": "12:00"
        },
        {
          "name": "Sessions 5, 6 & 7",
          "start": "12:30"
        },
        {
          "name": "School ends",
          "start": "14:10",
          "terminal": true
        }
      ],
      "s3": [
        {
          "name": "Sessions 1 & 2",
          "start": "08:00"
        },
        {
          "name": "Recess",
          "start": "09:40"
        },
        {
          "name": "CONNECT",
          "start": "10:10"
        },
        {
          "name": "Sessions 3 & 4",
          "start": "10:20"
        },
        {
          "name": "Session 5",
          "start": "12:00"
        },
        {
          "name": "School ends",
          "start": "12:50",
          "terminal": true
        }
      ]
    }
  }
  // BELLTIME:GENERATED:END
];

// Expose for the app (loaded as a plain <script>, so attach to window).
window.SCHOOLS = SCHOOLS;
