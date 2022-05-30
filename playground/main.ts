import { createApp } from 'vue'
import MonacoEditor from '@yanyu-fe/monaco-editor-vue'
import App from './App.vue'
import './worker'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)

app.use(MonacoEditor)
app.mount('#app')
