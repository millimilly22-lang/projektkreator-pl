import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const domain = 'https://projektkreator.pl';
const pages = ['', 'portfolio/modea/', 'portfolio/latavola/', 'portfolio/novabud/'];
for (const page of pages) {
  const html = await readFile(path.join(dist, page, 'index.html'), 'utf8');
  assert(html.includes(`rel="canonical" href="${domain}/${page}"`), `Incorrect canonical for /${page}`);
  assert(!html.includes('.onrender.com'), `Temporary domain in /${page}`);
  const files = [...html.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:js|css|webp|svg))"/g)].map(m => m[1]);
  assert(files.some(file => file.endsWith('.js')), `No compiled JavaScript in /${page}`);
  for (const file of files) {
    if (page && /\.(js|css)$/.test(file)) assert(file.startsWith(`/${page}`), `Incorrect Vite base: ${file}`);
    await access(path.join(dist, file));
  }
  if (page) {
    const images = await readdir(path.join(dist, page, 'images'));
    assert(images.length >= 4, `Missing photographs in /${page}`);
  }
}
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
for (const page of pages) assert(sitemap.includes(`<loc>${domain}/${page}</loc>`), `Missing sitemap entry /${page}`);
const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
assert(robots.includes(`Sitemap: ${domain}/sitemap.xml`), 'Incorrect sitemap URL in robots.txt');
const portfolio = await readdir(path.join(dist, 'portfolio'));
assert.deepEqual(portfolio.sort(), ['latavola', 'modea', 'novabud'], 'Unexpected legacy portfolio output');
console.log('Verified all four built pages, demo base paths, linked assets, photographs, sitemap and robots.txt.');
