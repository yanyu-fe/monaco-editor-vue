import type { Ref } from 'vue'
import { isRef, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import type { MonacoEditorProps } from '../../components/props'
import { useMonacoThemes } from '../index'
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
        monaco.editor.createDiffEditor(myDom, {
          ...myOptions,
          ...options,
        })
      }
      else {
        monaco.editor.create(myDom, {
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
    const options: IStandaloneEditorConstructionOptions = {
      theme: props.theme ?? 'mist-dark',
      language: props.language ?? 'javascript',
    }
    editor?.value?.updateOptions(options)
  })
}
