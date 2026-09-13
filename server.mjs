import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dist = path.join(__dirname, 'dist');
const port = Number(process.env.PORT || 10000);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function sendFile(res, file) {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}

http.createServer((req, res) => {
  const rawPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const requested = rawPath === '/' ? '/index.html' : rawPath;
  const safePath = path.normalize(requested).replace(/^([.][.][/\\])+/, '');
  const target = path.join(dist, safePath);

  fs.stat(target, (err, stat) => {
    if (!err && stat.isFile()) {
      sendFile(res, target);
      return;
    }
    // SPA fallback for React routes / hashes.
    sendFile(res, path.join(dist, 'index.html'));
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`ProjektKreator.pl running on port ${port}`);
});
