/* Tiny zero-dependency static file server for local dev. */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5173;
const ROOT = path.join(__dirname, ".."); // tools/ -> project root
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    const filePath = path.join(ROOT, path.normalize(urlPath));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    const send = (file, data) => {
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
      res.end(data);
    };
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Pretty URLs like /s/<id>/ (or /s/<id>) -> serve the directory's index.html.
        const indexPath = path.join(filePath, "index.html");
        fs.readFile(indexPath, (err2, data2) => {
          if (err2) {
            res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
            return;
          }
          send(indexPath, data2);
        });
        return;
      }
      send(filePath, data);
    });
  })
  .listen(PORT, () => {
    console.log(`Bell Times running at http://localhost:${PORT}`);
  });
