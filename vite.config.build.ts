import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts(),
  ],
  build: {
    rollupOptions: {
      external: [
        /^monaco-editor/,
      ],
      output: {
        exports: 'named',
      },
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      name: 'monacoEditor',
    },
  },
})
