<script setup lang="ts">
import { defineProps, computed } from 'vue';
const BG_COLOR_MAP = {
  blue: '#4ca2cd',
  red: '#f3723f',
  green: '#5faa68',
  purple: '#a683c9',
} as const;

const TEXT_COLOR_MAP = {
  'gray-1': '#ffffff',
  'gray-2': '#fafafa',
  'gray-3': '#f5f5f5',
  'gray-6': '#bfbfbf',
  'gray-7': '#8c8c8c',
  'gray-10': ' #262626',
} as const;

const props = defineProps<{
  size: string;
  highlightColor?: keyof typeof BG_COLOR_MAP;
  weight?: string;
  color?: keyof typeof TEXT_COLOR_MAP;
}>();

const titleStyle = computed(() => {
  if (props.highlightColor !== undefined) {
    return {
      fontSize: props.size,
      backgroundColor: BG_COLOR_MAP[props.highlightColor],
      padding: '3px 5px',
      color: TEXT_COLOR_MAP['gray-1'],
      display: 'inline-block',
      fontWeight: props.weight,
    };
  }
  return {
    fontSize: props.size,
    color: props.color ? TEXT_COLOR_MAP[props.color] : TEXT_COLOR_MAP['gray-10'],
    display: 'inline-block',
    fontWeight: props.weight,
  };
});
</script>

<template>
  <h2 :style="titleStyle"><slot></slot></h2>
</template>

<style></style>
