import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './playground'),
      '@yanyu-fe/monaco-editor-vue': resolve(__dirname, './src/index.ts'),
    },
  },
})
