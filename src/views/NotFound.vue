<script setup lang="ts">
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';

const animationContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (animationContainer.value) {
    lottie.loadAnimation({
      container: animationContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animation/404animation.json',
    });
  }
});
</script>

<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center text-center"
    style="height: 100vh; transform: translateY(-30px); overflow: hidden"
  >
    <!-- Lottie 애니메이션 컨테이너 -->
    <div ref="animationContainer" style="width: 300px; height: 300px"></div>
    <h2 class="mb-4" style="font-family: 'paperlogy'; font-size: 2.5rem; color: var(--primary-red)">
      Page not found
    </h2>
    <p
      class="lead mb-4"
      style="font-family: 'paperlogy'; font-size: 1.5rem; color: var(--primary-red)"
    >
      이 페이지는 잠시 산책을 떠났어요. <br />
      반려동물과 함께 돌아올 수 있는 다른 길을 찾아보세요!
    </p>
    <a
      href="/"
      class="btn custom-btn text-white"
      style="
        background-color: var(--primary-red);
        border-radius: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-family: 'paperlogy';
        font-size: 1.25rem;
        text-decoration: none;
      "
    >
      홈으로 가기
    </a>
  </div>
</template>

<style scoped>
.custom-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.custom-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
