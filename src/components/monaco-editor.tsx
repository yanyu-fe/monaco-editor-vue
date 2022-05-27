import { computed, defineComponent, ref } from 'vue'
import classNames from 'classnames'
import { useMonacoLoad } from '../composables'
import { monacoEditorProps } from './props'
export default defineComponent({
  name: 'MonacoEditor',
  inheritAttrs: false,
  props: monacoEditorProps,
  setup(_props, { attrs }) {
    const editorRef = ref<HTMLDivElement>()
    const { editor } = useMonacoLoad(editorRef, {}, _props)
    // eslint-disable-next-line no-console
    console.log(editor.value)
    const monacoClass = computed(() => classNames(((attrs as any)?.class || {}), {
      [`${_props.prefixCls}-monaco-editor`]: true,
    }))
    return () => {
      const styleData: any = attrs?.style
      return (
        <div ref={editorRef} class={monacoClass.value} style={styleData}/>
      )
    }
  },
})
