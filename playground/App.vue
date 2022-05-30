<script lang="ts" setup>
import { ref } from 'vue'
const language = ref('javascript')
const theme = ref('mist-dark')
const languages = ref([
  'javascript',
  'html',
  'css',
  'json',
  'xml',
])

const handleTheme = () => {
  theme.value = theme.value === 'mist-dark' ? 'mist-light' : 'mist-dark'
}
</script>

<template>
  <div>
    <div mb-3 mt-3 flex items-center justify-center gap-2>
      <button btn @click="handleTheme">
        切换主题
      </button>
      <select v-model="language">
        <option v-for="item in languages" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <monaco-editor :language="language" :theme="theme" />
  </div>
</template>
