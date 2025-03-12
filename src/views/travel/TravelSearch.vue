<script setup lang="ts">
import CheckTraveList from '@/components/travel/CheckTraveList.vue';
import CheckTravel from '@/components/travel/CheckTravel.vue';
</script>

<template>
  <div class="container" :style="{ minWidth: '1280px', width: '66%', paddingBottom: '50px' }">
    <div class="main d-flex flex-row" :style="{ marginTop: '200px' }">
      <!-- 카테고리 -->
      <CheckTravel />
      <!-- 리스트렌더링 -->
      <CheckTraveList />
    </div>
  </div>
</template>

<style scoped></style>
