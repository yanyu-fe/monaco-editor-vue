import type { App, Plugin } from 'vue-demi'
import MonacoEditor from './components/MonacoEditor.vue'

MonacoEditor.install = (app: App) => {
  app.component(MonacoEditor.name, MonacoEditor)
}

export default MonacoEditor as typeof MonacoEditor & Plugin

export {
  MonacoEditor,
}
