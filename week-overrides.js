/*
 * Manual Week A / Week B schedule mappings.
 *
 * The generated crawler data stores all bell shapes, but some schools need a
 * fortnight selector to choose which weekday map is active.
 */
(function () {
  "use strict";

  window.BELLTIME_WEEK_OVERRIDES = {
    caringbah: {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s2", thu: "s1", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s1", wed: "s2", thu: "s1", fri: "s3" } },
    },

    "castle-hill": {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s2", thu: "s4", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s1", wed: "s3", thu: "s4", fri: "s1" } },
    },

    "chester-hill": {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s2", wed: "s1", thu: "s1", fri: "s1" } },
    },

    "east-hills-boys": {
      a: { label: "Week A", days: { mon: "s1", tue: "s2", wed: "s3", thu: "s3", fri: "s3" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s2", wed: "s3", thu: "s3", fri: "s4" } },
    },

    heathcote: {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s3", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s2", wed: "s1", thu: "s3", fri: "s1" } },
    },

    "j-j-cahill-memorial": {
      a: { label: "Week A", days: { mon: "s1", tue: "s2", wed: "s3", thu: "s2", fri: "s4" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s2", wed: "s3", thu: "s2", fri: "s2" } },
    },

    "liverpool-boys": {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s2", thu: "s1", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s3", wed: "s2", thu: "s1", fri: "s1" } },
    },

    "matraville-sports": {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "s2" } },
    },

    "mount-annan": {
      a: { label: "Week A", days: { mon: "s1", tue: "s2", wed: "s3", thu: "s2", fri: "s2" } },
      b: { label: "Week B", days: { mon: "s2", tue: "s2", wed: "s3", thu: "s2", fri: "s2" } },
    },

    "port-hacking": {
      schedules: {
        phTue: [
          { name: "Period 1", start: "09:00" },
          { name: "Recess", start: "10:05" },
          { name: "Period 2", start: "10:35" },
          { name: "Period 3", start: "11:35" },
          { name: "Lunch", start: "12:35" },
          { name: "Period 4", start: "13:05" },
          { name: "Teacher Professional Learning", start: "14:05" },
          { name: "School ends", start: "15:45", terminal: true },
        ],
      },
      weeks: {
        a: { label: "Week A", days: { mon: "s1", tue: "phTue", wed: "s3", thu: "s4", fri: "s5" } },
        b: { label: "Week B", days: { mon: "s1", tue: "phTue", wed: "s3", thu: "s4", fri: "s1" } },
      },
    },

    prairiewood: {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "s2" } },
    },

    "seven-hills": {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s3", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s2", fri: "s1" } },
    },

    "st-george-girls": {
      a: { label: "Week A", days: { mon: "s1", tue: "s2", wed: "s1", thu: "s1", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "s1" } },
    },

    "st-johns-park": {
      a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s1", wed: "s2", thu: "s1", fri: "s1" } },
    },

    "sydney-secondary-college-blackwattle-bay": {
      a: { label: "Week A", days: { mon: "s1", tue: "s2", wed: "s2", thu: "s2", fri: "s3" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s3", wed: "s2", thu: "s2", fri: "s3" } },
    },

    "sydney-girls": {
      schedules: {
        sgFriA: [
          { name: "Period 1 / SRE", start: "08:55" },
          { name: "Period 2", start: "10:00" },
          { name: "Recess", start: "11:00" },
          { name: "Period 3", start: "11:20" },
          { name: "Period 4", start: "12:25" },
          { name: "Lunch", start: "13:25" },
          { name: "HIVE", start: "14:05" },
          { name: "Period 5", start: "14:20" },
          { name: "School ends", start: "15:20", terminal: true },
        ],
        sgFriB: [
          { name: "Period 1", start: "08:55" },
          { name: "Period 2 / Assembly", start: "10:00" },
          { name: "Recess", start: "11:00" },
          { name: "Period 3", start: "11:20" },
          { name: "Period 4", start: "12:25" },
          { name: "Lunch", start: "13:25" },
          { name: "HIVE", start: "14:05" },
          { name: "Period 5", start: "14:20" },
          { name: "School ends", start: "15:20", terminal: true },
        ],
      },
      weeks: {
        a: { label: "Week A", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "sgFriA" } },
        b: { label: "Week B", days: { mon: "s1", tue: "s1", wed: "s1", thu: "s1", fri: "sgFriB" } },
      },
    },

    "willoughby-girls": {
      a: { label: "Week A", days: { mon: "s1", tue: "s2", wed: "s3", thu: "s2", fri: "s1" } },
      b: { label: "Week B", days: { mon: "s1", tue: "s2", wed: "s3", thu: "s1", fri: "s1" } },
    },
  };
})();
