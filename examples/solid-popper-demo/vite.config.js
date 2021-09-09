import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  optimizeDeps: {
    exclude: [
      '@popperjs/core'
    ],
  },
  plugins: [solidPlugin()],
});
