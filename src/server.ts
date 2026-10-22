import path from 'path';
import express, { Request, Response } from 'express';
import { apiApp } from './apiHandler';

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist');
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Serve static assets from Vite build
apiApp.use(express.static(distDir));

// Fallback to index.html for SPA client-side routing
apiApp.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(distDir, 'index.html'));
});

const server = apiApp.listen(PORT, '0.0.0.0', () => {
  console.log(`KONEX Finder production server running on http://0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
