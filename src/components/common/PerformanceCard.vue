<script setup lang="ts">
import type { PerformanceCardProps } from '@/types/peformance.types.ts'
import router from '@/router'

defineProps<PerformanceCardProps>()
</script>

<template>
  <div class="card-layout" @click="() => router.push({ name: 'performance-detail', params: { id : mt20id } })">
    <img :src="poster" width="300" height="350" alt="performance-image" class="image"/>
    <div class="title">{{ cate }}</div>
    <div class="subtitle">{{ prfnm }}</div>
    <div class="date">
      <img src="/icons/main-calendar.svg" width="24" height="24" alt="calendar-icon"/>
      {{ prfpd }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-layout {
  cursor: pointer;
  display: grid;
  height: 450px;
  width: 300px;
}

.title {
  color: #ea5313;
  font-weight: bold;
  font-size: 17px;
  margin-top: 10px;
}

.subtitle {
  color: $text-color-500;
  font-weight: bold;
  font-size: 20px;
  width: 300px; /* 컨테이너 너비 지정 */
  white-space: nowrap; /* 텍스트를 한 줄로 유지 */
  overflow: hidden; /* 넘치는 부분 숨김 */
  text-overflow: ellipsis; /* 초과된 부분을 "..." 처리 */
}

.date {
  display: flex;
  gap: 8px;
  color: $text-color-500;
  background-color: $primary-color-100;
  height: 32px;
  width: 249px;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 51px;
  margin-top: 10px;
}

.image {
  border-radius: 12px;
}
</style>
