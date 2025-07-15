import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // Set application type to SPA to enable history API fallback
  appType: 'spa',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Ensure server handles SPA routing correctly
    host: true,
    port: 5173,
    strictPort: false,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});