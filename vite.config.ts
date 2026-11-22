import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// HashRouter is used, so a relative base works on GitHub Pages and Cloudflare Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
});
