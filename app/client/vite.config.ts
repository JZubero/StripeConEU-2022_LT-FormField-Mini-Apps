import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Config vite in library mode: https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/fields/gifField/index.ts',
      name: 'GifField',
      fileName: () => 'gif-field.js',
      formats: ['iife']
    }
  },
  define: {
    'process.env': {}
  }
})
