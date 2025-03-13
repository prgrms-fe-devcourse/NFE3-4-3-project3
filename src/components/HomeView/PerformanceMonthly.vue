<script setup lang="ts">
import PerformanceCard from '@/components/common/PerformanceCard.vue'
import { getMonthlyPerformances } from '@/apis/kopis.ts'
import { onMounted, ref } from 'vue'
import type { PerformanceCardProps } from '@/types/peformance.types.ts'
import RoundCategoryTab from '@/components/Home/RoundCategoryTab.vue'
import { getBookToHome } from '@/apis/books.ts'

const awardPerformances = ref<PerformanceCardProps[]>([]);
const performanceCategories = ref<string[]>([
  '연극',
  '뮤지컬',
  '대중음악',
  '서양음악(클래식)',
]);

const activeTab = ref('연극')

const filterTab = async (categoryName : string) => {
  activeTab.value = categoryName
}

onMounted(async () => {
  try {
    const data = await getMonthlyPerformances();
    awardPerformances.value = data.boxofs.boxof; // TODO 카테고리별로 정리 필요
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
});
</script>

<template>
  <div class="monthly-container">
    <div class="title">이달의 예매율 TOP4 공연</div>
    <div class="category-wrapper">
      <RoundCategoryTab
        v-for="(item, index) in performanceCategories"
        :key="index+'category'"
        :name="item"
        @click="filterTab(item)"
        :class="['categorybtn', { active: activeTab === item }]"
      />
    </div>
    <div class="performance-wrapper">
      <PerformanceCard
        v-for="item in awardPerformances.filter(item => item.cate === activeTab).slice(0, 4)"
        :key="item.mt20id"
        :cate="item.cate"
        :mt20id="item.mt20id"
        :poster="item.poster"
        :prfnm="item.prfnm"
        :prfpd="item.prfpd"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.monthly-container {
  margin-top: 40px;
}

.title {
  color : $text-color-500;
  font-size: 24px;
  font-weight: bold;
  margin-bottom : 20px;
}

.performance-wrapper {
  display: flex;
  width: 1246px;
  margin-top: 30px;
  height: 450px;
  justify-content: space-around;
}

.category-wrapper {
  display: flex;
}

.categorybtn.active {
  background: $secondary-color-300;
  color: white;
  border: none;
}
</style>
