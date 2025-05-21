import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  build: {
    commonjsOptions: {
      include: [/lucide-react/, /node_modules/],
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});