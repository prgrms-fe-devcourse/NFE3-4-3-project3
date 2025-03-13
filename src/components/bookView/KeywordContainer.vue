<template>
  <div class="keyword_container">
    <h2>이 달의 키워드</h2>
    <small>{{ searchedMonth }} 기준</small>
    <div class="keyword_badge_container">
      <div class="badge" v-for="badge in monthKeywordList" :key="badge.keyword.word"
        :class="{ 'selected': selectedKeyword === badge.keyword.word }"
        @click="() => handleKeywordClick(badge.keyword.word)">
        <span># {{ badge.keyword.word }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMonthKeyword } from '@/apis/books';
import type { MonthKeyword } from '@/types/libraryType';
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
  (e: 'handleKeywordClick', keyword: string): void;
}>();

const handleKeywordClick = (keyword: string) => {
  if (selectedKeyword.value === keyword) {
    selectedKeyword.value = '';
  } else {
    selectedKeyword.value = keyword;
  }
  emit('handleKeywordClick', selectedKeyword.value);
}

const selectedKeyword = ref<string>('');

// const selectedKeywordStyle = computed(() => {
//   return monthKeywordList.value.some(item =>
//     selectedKeyword.value.includes(item.keyword.word)
//   );
// });

const monthKeywordList = ref<MonthKeyword[]>([]); // 이달의 키워드 리스트
const searchedMonth = ref<string>(''); // 검색 달

onMounted(async () => {
  try {
    const response = await getMonthKeyword();
    monthKeywordList.value = response.keywords.slice(0, 25);
    searchedMonth.value = response.request.month;
  } catch (error) {
    console.error(error);
    throw error;
  }
})
</script>

<style lang="scss" scoped>
.keyword_container {
  width: 100%;
  margin-bottom: 76px;

  h2 {
    font-size: $text-title-300;
    font-weight: bold;
    margin-bottom: 24px;
    display: inline-block;
  }

  small {
    display: inline-block;
    margin-left: 1rem;
    color: $text-color-300;
  }

  .keyword_badge_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .badge {
      display: inline-block;
      border-radius: 30px;
      border: 1px solid #d3d0cb;
      padding: 0.5rem 1rem;
      color: #61605d;
      cursor: pointer;

      &.selected {
        background-color: $primary-color-100;
        color: #fff;
      }
    }
  }
}
</style>
