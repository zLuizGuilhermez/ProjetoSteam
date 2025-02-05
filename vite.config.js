import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  publicDir: 'public',
  plugins: [react()],
  server: {
    historyApiFallback: true,
    port: process.env.PORT || 3000,
  },
  root: './',
  build: {
    outDir: 'dist',
  },
});