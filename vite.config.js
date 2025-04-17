import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html'),
    },
    outDir: 'dist',
  },
  css: {
    postcss: './postcss.config.js', // postcss config ফাইল যদি থাকে
  },
});
