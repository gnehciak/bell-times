/*
 * Build the extension and zip it for the Chrome Web Store, in one step:
 *
 *   npm run pack:extension     →  bell-times.zip  (manifest.json at the zip root)
 *
 * Upload that zip in the Web Store developer console. The zip is git/vercel-
 * ignored; re-run any time to repackage the latest build.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "extension");
const ZIP = path.join(ROOT, "bell-times.zip");

// Build first (build-extension.js runs its work on require).
require("./build-extension.js");

// Chrome Web Store wants manifest.json at the archive root, so zip the *contents*
// of extension/ (cwd: OUT), not the folder itself.
fs.rmSync(ZIP, { force: true });
try {
  execSync('zip -r -X "' + ZIP + '" . -x "*.DS_Store"', { cwd: OUT, stdio: "ignore" });
} catch (e) {
  console.error("\nCould not run `zip`. Install it, or zip the extension/ folder's");
  console.error("contents manually (manifest.json must be at the zip root).");
  process.exit(1);
}

const mb = (fs.statSync(ZIP).size / 1024 / 1024).toFixed(2);
console.log("\nPacked → " + path.basename(ZIP) + " (" + mb + " MB)");
console.log("  Upload it at chrome.google.com/webstore/devconsole, then set Visibility: Unlisted.");
