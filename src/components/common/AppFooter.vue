<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'Footer', // 컴포넌트의 이름 정의 (옵션)
});
</script>

<template>
  <footer>
    <div class="footer-content">
      <div
        class="w-135px h-60px text-center"
        style="
          font-family: 'Paperlogy';
          font-weight: 700;
          font-size: 40px;
          line-height: 150%;
          letter-spacing: -0.022em;
          color: var(--gray-7);
        "
      >
        Petner
      </div>

      <div
        class="d-flex flex-column justify-content-center align-items-center px-4 gap-2 w-100 border-top"
        style="border-color: var(--gray-7); height: 60px"
      >
        <div
          class="w-90px h-24px text-center py-2 mt-2"
          style="color: var(--gray-7); font-size: 20px; font-weight: 500"
        >
          Members
        </div>

        <div class="text-center" style="color: var(--gray-7); font-weight: 300">
          <span class="px-2">Kim SangYup</span><span class="px-2">Shin JoongSeok</span>
          <span class="px-2">Lee SeokJoon</span><span class="px-2">Lee JeongSu</span>
          <span class="px-2">Choi YunSeo</span>
        </div>
      </div>

      <div class="text-center py-4" style="color: var(--gray-7); font-size: 16px; font-weight: 300">
        @ 2025 Petner. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--gray-3);
  z-index: 100;
}

.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
}
</style>
