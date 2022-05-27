import * as monaco from 'monaco-editor'
import dark from './dark.json'
import light from './light.json'

export default function() {
  monaco.editor.defineTheme('mist-dark', dark as any)
  monaco.editor.defineTheme('mist-light', light as any)
}
