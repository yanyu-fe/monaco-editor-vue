import type { ExtractPropTypes, PropType } from 'vue'
export const monacoEditorProps = {
  // 双向绑定数据
  value: {
    type: String as PropType<string>,
    default: '',
  },
  // 是否可写
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // 当前使用的语言
  language: {
    type: String as PropType<string>,
    default: 'javascript',
  },
  // 是否是一个diff对比查看器
  diffEditor: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  theme: {
    type: String as PropType<'mist-dark' | 'mist-light'>,
    default: 'mist-dark',
  },
  prefixCls: {
    type: String as PropType<string>,
    default: 'mist',
  },
}

export type MonacoEditorProps = Partial<ExtractPropTypes<typeof monacoEditorProps>>
