import { defineConfig } from 'vite'

export default defineConfig({
  base: '/goit-js-hw-11/',
  define: {
    global: 'globalThis',
    'import.meta.env.VITE_PIXABAY_API_KEY': JSON.stringify(process.env.VITE_PIXABAY_API_KEY || 'your_api_key_here'),
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