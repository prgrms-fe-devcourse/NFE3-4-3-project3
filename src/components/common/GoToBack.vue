<template>
  <div class="goToBack" @click="goToBack">
    <img src="/icons/arrow-left.svg" alt="뒤로가기" class="goToBack-icon">
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToBack = () => {
  router.back();
}
</script>


<style lang="scss" scoped>
.goToBack {
  width: 20px;
  height: 20px;
  cursor: pointer;

  .goToBack-icon {
    width: 100%;
    height: 100%;
  }
}
</style>
