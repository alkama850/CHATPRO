import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html'), // এটির মাধ্যমে তুমি এন্ট্রি ফাইল সঠিকভাবে সেট করছো
    },
    outDir: 'dist',  // প্রোডাকশন বিল্ডের আউটপুট ডিরেক্টরি
  },
});
