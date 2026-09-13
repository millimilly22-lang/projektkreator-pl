import { build } from 'vite';
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const demos = ['modea', 'latavola', 'novabud'];

// Each demo first builds independently. The root Vite build then copies these
// generated public assets into dist, alongside the existing main application.
for (const name of demos) {
  const app = path.join(root, 'demos', name);
  await build({ configFile: path.join(app, 'vite.config.js') });
  const destination = path.join(root, 'public', 'portfolio', name);
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  await cp(path.join(app, 'dist'), destination, { recursive: true });
}

if (!process.argv.includes('--demos-only')) {
  await build({ root, configFile: path.join(root, 'vite.config.js') });
  await import('./check-build.mjs');
}
