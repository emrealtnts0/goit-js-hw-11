import { defineConfig } from 'vite'

export default defineConfig({
  base: '/goit-js-hw-11/',
  define: {
    global: 'globalThis',
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
}) 