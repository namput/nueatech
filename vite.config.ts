// vite.config.ts
// ✅ แก้เส้นใต้แดง (node:path / __dirname) แบบ ESM-safe + ตั้ง alias/dedupe ให้ React
// หมายเหตุ: ต้องมี type ของ Node ใน tsconfig: { "types": ["node"] }

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// __dirname ใน ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-markdown',
      'remark-gfm',
      'rehype-raw',
    ],
  },
  server: {
    port: 5173,
  },
  preview: { port: 4173 },
});
