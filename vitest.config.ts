import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte({ hot: false })],
  resolve: {
    alias: {
      '$lib': path.resolve(__dirname, 'src/lib'),
    },
    conditions: ['browser'],
  },
  test: {
    include: ['src/**/*.test.ts'],
    environmentMatchGlobs: [
      ['src/**/__tests__/**', 'jsdom'],
    ],
  },
});
