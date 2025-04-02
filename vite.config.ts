import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root:'.',
  css: {
    postcss: './postcss.config.cjs'
  },
  
  server: {
    port: 3000,
    open: true
  },
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
