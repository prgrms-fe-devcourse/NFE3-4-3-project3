<script setup lang="ts">
export interface TextBlockDescriptor {
  content: string;
  font: string;
  weight: number;
  color: string;
  bgColor: string;
  size: string;
  rounded?: string;
  padding?: string;
  margin?: string;
}
interface TextBlockProps {
  textBlock : TextBlockDescriptor
}
const props = defineProps<TextBlockProps>();
</script>

<template>
  <pre
    :class="[props.textBlock.rounded ?? '', props.textBlock.padding ?? '', props.textBlock.margin ?? '']"
    :style="{
      color: props.textBlock.color,
      backgroundColor: props.textBlock.bgColor,
      fontFamily: props.textBlock.font,
      fontWeight: props.textBlock.weight,
      fontSize: props.textBlock.size,
    }"
  >{{props.textBlock.content}}</pre>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
