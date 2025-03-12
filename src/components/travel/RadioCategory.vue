<script setup lang="ts">
import { defineModel } from 'vue';
import { useFacilitiesStore } from '@/stores/facilitiesStore';
const facilitiesStore = useFacilitiesStore();

// defineModel()을 사용하여 부모에서 전달된 `currentCategoryData` 받기
const model = defineModel<{ title?: string; options: { category: string; code: string }[] }>();
</script>

<template>
  <!-- 옵션 카테고리 -->
  <div class="title" :style="{ marginTop: '70px' }">{{ model?.title }}</div>
  <div class="PageCategorySection mt-4 gap-5">
    <div
      v-for="(item, index) in model?.options"
      :key="index"
      @click="facilitiesStore.setTypeCode(item.code)"
    >
      <input
        class="me-2"
        type="radio"
        name="option"
        :id="`option-${index}`"
        :checked="'' === item.code"
      />
      <label :for="`option-${index}`">{{ item.category }}</label>
    </div>
  </div>
</template>

<style scoped>
/* 제목 폰트 */
.title {
  font-size: 36px;
  font-weight: 700;
}

/* 카테고리 섹션 */

.PageCategorySection {
  margin-left: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

label {
  color: var(--gray-7);
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
</style>
