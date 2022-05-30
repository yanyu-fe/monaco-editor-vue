import type { Ref } from 'vue'
import { isRef, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import type { MonacoEditorProps } from '../../components/props'
import { useMonacoThemes } from '../index'
import './custom-monaco'
export type MaybeRef<T> = T | Ref<T>
export type MonacoEditorCreateType = ReturnType< typeof monaco.editor.create>
export type MonacoEditorCreateDiffType = ReturnType< typeof monaco.editor.createDiffEditor>
export type IStandaloneEditorConstructionOptions = monaco.editor.IStandaloneEditorConstructionOptions

export interface MonacoLoadCallback<T=MonacoEditorCreateType> {
  editor: Ref<T | null>
}

export function useMonacoLoad(
  dom: MaybeRef<HTMLDivElement | undefined>,
  options: IStandaloneEditorConstructionOptions,
  props: MonacoEditorProps,
  isDiff?: false,
): MonacoLoadCallback

// @ts-expect-error this is reType fun
export function useMonacoLoad(
  dom: MaybeRef<HTMLDivElement | undefined>,
  options: IStandaloneEditorConstructionOptions,
  props: MonacoEditorProps,
  isDiff: true,
): MonacoLoadCallback<MonacoEditorCreateDiffType>

export function useMonacoLoad(
  dom: MaybeRef<HTMLDivElement | undefined>,
  options: IStandaloneEditorConstructionOptions,
  props: MonacoEditorProps,
  isDiff?: boolean,
): MonacoLoadCallback {
  const editor = ref()
  useMonacoThemes()
  const myOptions: IStandaloneEditorConstructionOptions = {
    theme: props.theme ?? 'mist-dark',
    language: props.language ?? 'javascript',
  }
  onMounted(() => {
    const myDom = isRef(dom) ? dom.value : dom
    // 如果有值去自动格式化
    if (myDom) {
      if (isDiff) {
        editor.value = monaco.editor.createDiffEditor(myDom, {
          ...myOptions,
          ...options,
        })
      }
      else {
        editor.value = monaco.editor.create(myDom, {
          ...myOptions,
          ...options,
        })
      }
    }
  })
  onUnmounted(() => {
    // 卸载插件
    if (editor.value)
      editor.value?.dispose()
  })
  useStandaloneOptionsForProps(props, editor)
  return {
    editor,
  }
}
function useStandaloneOptionsForProps(props: MonacoEditorProps, editor?: MonacoLoadCallback['editor']): void {
  watchEffect(() => {
    const model = editor?.value?.getModel()
    if (model) {
      if (props.language) {
        // 语言发生变化
        monaco.editor.setModelLanguage(model, props.language)
      }
      if (props.theme) {
        // 设置为只读
        monaco.editor.setTheme(props.theme ?? 'mist-dark')
      }
    }
  })
}
