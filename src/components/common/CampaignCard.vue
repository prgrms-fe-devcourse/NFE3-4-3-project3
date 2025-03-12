<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

// Props 정의
const props = withDefaults(
  defineProps<{
    width: string;
    height: string;
    imageUrl: string;
    linkTo: string; // ? 캠페인 카드는 반드시 Link를 가져야 할까요
    hasFilter?: boolean;
  }>(),
  {
    hasFilter: false,
  },
);
</script>

<template>
  <a
    class="overflow-hidden"
    :style="{ width: props.width, height: props.height, borderRadius: '16px' }"
    :href="props.linkTo"
    target="_blank"
    rel="external noopener noreferrer"
  >
    <div class="position-relative z-0 filter">
      <img
        :src="props.imageUrl"
        alt="강아지"
        :width="props.width"
        :height="props.height"
        :class="{ shade: props.hasFilter }"
      />
      <div
        class="z-1 text-white position-absolute d-flex flex-column card-text"
        :style="{ bottom: '20px', marginLeft: '20px' }"
      >
        <div class="" :style="{ fontSize: '2rem', fontWeight: '700' }">
          <slot name="title"></slot>
        </div>
        <slot name="subTitle"></slot>
      </div>
    </div>
  </a>
</template>

<style scoped>
.card-text {
  font-family: 'Paperlogy';
}
a {
  cursor: pointer;
}

.shade {
  filter: brightness(0.7);
}
</style>
