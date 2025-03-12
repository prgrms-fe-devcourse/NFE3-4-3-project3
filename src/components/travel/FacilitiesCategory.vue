<script setup lang="ts">
import { useFacilitiesStore } from '@/stores/facilitiesStore';
const facilitiesStore = useFacilitiesStore();
</script>

<template>
  <!-- 제목 -->
  <div class="title" :style="{ marginTop: '70px' }">시설</div>

  <!-- 공용시설 -->
  <div class="facilitiesContainer ms-1">
    <div class="mb-1 mt-4" :style="{ fontSize: '16px' }">공용시설</div>
    <div
      class="facilities"
      v-for="(item, index) in facilitiesStore.facilities"
      :key="index"
      :class="{ selectedButton: item.selected }"
      @click="facilitiesStore.toggleFacility(item)"
    >
      <span>{{ item.option }}</span>
    </div>
  </div>

  <!-- 객실 시설 -->
  <div class="facilitiesContainer mt-4 ms-1">
    <div class="mb-1 mt-4" :style="{ fontSize: '16px' }">객실 시설</div>
    <span
      class="facilities"
      v-for="(item, index) in facilitiesStore.roomFacilities"
      :key="index"
      :class="{ selectedButton: item.selected }"
      @click="facilitiesStore.toggleFacility(item)"
    >
      {{ item.option }}
    </span>
  </div>
</template>

<style scoped>
/* 제목 폰트 */
.title {
  font-size: 36px;
  font-weight: 700;
}

input[type='radio'] {
  appearance: none;
  width: 15px;
  height: 15px;
  border: 2px solid #ccc; /* 기본 테두리 */
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  color: var(--gray-6);
}

/* radio check 색상 */
input[type='radio']:checked {
  background-color: var(--secondary-red); /* 체크된 배경색 변경 */
  border-color: var(--gray-6); /* 체크된 테두리 색 변경 */
}

/* 카테고리 섹션 */

.staySection {
  margin-left: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
label {
  color: var(--gray-7);
}

/* 시설 버튼 */
.facilitiesContainer {
  display: block;
  width: 100%;
}

/* 지역 버튼 */
.facilities {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px 10px 10px 0px; /* 버튼 간격 */
  color: var(--gray-7);
  border: 1px solid var(--gray-6);
  border-radius: 25px;
  cursor: pointer;
}

.selectedButton {
  background-color: var(--secondary-red);
  color: white;
}
</style>
