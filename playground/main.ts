import { createApp } from 'vue'
import MonacoEditor from '@yanyu-fe/monaco-editor-vue'
import App from './App.vue'
import './worker'

const app = createApp(App)

app.use(MonacoEditor)
app.mount('#app')
