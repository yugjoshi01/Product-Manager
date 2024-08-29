// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://node-auth-vert.vercel.app',
        changeOrigin: true,
        secure: true,  // Use true if your target server is HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
