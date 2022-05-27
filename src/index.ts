import type { App, Plugin } from 'vue'
import MonacoEditor from './components/monaco-editor'
import './style/index.css'
MonacoEditor.install = (app: App) => {
  app.component(MonacoEditor.name, MonacoEditor)
}

export default MonacoEditor as typeof MonacoEditor & Plugin

export {
  MonacoEditor,
}
