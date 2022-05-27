import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// @ts-expect-error is not a valid type
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json')
    // eslint-disable-next-line new-cap
      return new jsonWorker()

    if (label === 'typescript' || label === 'javascript')
    // eslint-disable-next-line new-cap
      return new tsWorker()
    // eslint-disable-next-line new-cap
    return new editorWorker()
  },
}

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
