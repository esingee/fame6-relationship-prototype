import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// HashRouter is used, so a relative base works on GitHub Pages and Cloudflare Pages.
export default defineConfig({
  base: './',
  // A new id per build: saved demo state from an older build is discarded on first load.
  define: { __BUILD_ID__: JSON.stringify(String(Date.now())) },
  plugins: [react()],
});
