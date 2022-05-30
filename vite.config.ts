import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from '@unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Unocss(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './playground'),
      '@yanyu-fe/monaco-editor-vue': resolve(__dirname, './src/index.ts'),
    },
  },
})
