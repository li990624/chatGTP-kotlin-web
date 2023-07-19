<template>
 <pre>
    <code ref="codeElement" :class="`language-${language}`">{{ code }}</code>
  </pre>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

let language = "javascript"

 let code = "<template>\n" +
     "  <pre>\n" +
     "    <code ref=\"codeElement\" :class=\"`language-${language}`\">{{ code }}</code>\n" +
     "  </pre>\n" +
     "</template>"

const codeElement = ref<HTMLElement | null>(null as HTMLElement | null);

    onMounted(() => {
        Prism.highlightElement(codeElement.value);
    });
</script>

<style>
/* 在样式中引入 Prism.js 的样式文件，确保它在自定义样式之前被加载 */

/* 自定义样式 */
pre code .token {
    background-color: black;
    color: white;
}
</style>
