import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  publicDir: 'assets',
  plugins: [react()],
  server: {
        historyApiFallback: true,
        port: process.env.PORT || 3000,
      }
  }
    // ✅ Garante que as rotas funcionem corretamente
);
