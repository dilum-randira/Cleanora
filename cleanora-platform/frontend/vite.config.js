import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }

          if (
            id.includes('node_modules/@react-three') ||
            id.includes('node_modules/maath') ||
            id.includes('node_modules/meshline') ||
            id.includes('node_modules/suspend-react')
          ) {
            return 'r3f-vendor';
          }

          return undefined;
        }
      }
    }
  },
  server: {
    port: 5173
  }
});
