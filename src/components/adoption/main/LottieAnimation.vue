<!-- LottieAnimation.vue -->
<template>
    <div ref="lottieContainer" style="width: 300px; height: 300px;"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import lottie from 'lottie-web';
  
  const lottieContainer = ref<HTMLElement | null>(null);
  
  onMounted(() => {
    if (lottieContainer.value) {
      lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animation/loading.json', // 원하는 애니메이션 JSON 파일 경로로 변경하세요.
      });
    }
  });
  </script>
  