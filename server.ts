import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const rootDir = process.cwd();
const distServerPath = path.resolve(rootDir, 'dist', 'server.mjs');

if (fs.existsSync(distServerPath)) {
  const fileUrl = pathToFileURL(distServerPath).href;
  await import(fileUrl);
} else {
  console.error(`Production server bundle not found at ${distServerPath}. Please run "npm run build" first.`);
  process.exit(1);
}
