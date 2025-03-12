<script setup lang="ts">
import { travelListEffect } from '@/constants/travel/motion';
import { ref, onMounted, watch, computed } from 'vue';
import TravelListCard from './TravelListCard.vue';
import { fetchAreaBasedData } from '@/apis/tour/getAreaBased';
import { searchKeyword } from '@/apis/tour/searchKeyword';
import { useFacilitiesStore } from '@/stores/facilitiesStore';
import type { TourData } from '@/types/travelList/tourData';

const facilitiesStore = useFacilitiesStore(); // 숙소 옵션 Pinia

const stayData = ref<TourData[]>([]); // API에서 불러온 데이터를 저장할 변수
const isLoading = ref(false); // 로딩 상태
const pageNo = ref(1); // 페이지 번호
const observerTarget = ref<HTMLElement | null>(null); // Intersection Observer 감지 대상

// 카테고리에 따른 제목을 반환하는 computed
const currentTitle = computed(() => {
  switch (facilitiesStore.contentTypeId) {
    // 숙소
    case '32':
      return '숙소';
    // 레스토랑
    case '39':
      return '레스토랑';
    // 문화 & 쇼핑
    case '38':
      return '문화 & 쇼핑';
    // 관광 & 체험
    case '28':
      return '관광 & 체험';
    // 기본값 (예시로 '문화 & 쇼핑'에 대한 데이터가 있다면 추가)
    default:
      return { title: '기본', category: '', options: [] };
  }
});

// 함수 사용모드
const currentSearchMode = ref<'default' | 'search'>('default');

// API 호출 함수
const loadStayData = async () => {
  try {
    isLoading.value = true;
    // 새 모드 결정: keyword가 공백이 아니라면 'search', 아니면 'default'
    const newMode: 'default' | 'search' =
      facilitiesStore.keyword && facilitiesStore.keyword.trim() !== '' ? 'search' : 'default';

    // 만약 이전에 사용한 모드와 달라졌다면 기존 데이터를 초기화
    if (newMode !== currentSearchMode.value) {
      stayData.value = [];
      pageNo.value = 1;
      currentSearchMode.value = newMode;
    }
    const commonParams = {
      contentTypeId: facilitiesStore.queryData.contentTypeId,
      areaCode: facilitiesStore.queryData.areaCode,
      pageNo: pageNo.value,
    };

    let data;
    if (newMode === 'search') {
      data = await searchKeyword({
        ...commonParams,
        keyword: facilitiesStore.keyword,
      });
      console.log(data);
    } else {
      data = await fetchAreaBasedData({
        ...commonParams,
        cat3: facilitiesStore.queryData.typeCode,
      });
    }
    // 받아온 데이터를 기존 데이터에 추가 (만약 초기화한 경우엔 push가 새로 추가된 데이터만 담음)
    stayData.value.push(...data);
    pageNo.value++; // 다음 페이지 증가
  } catch (error) {
    console.error('데이터 로드 실패:', error);
  } finally {
    isLoading.value = false; // 로딩 완료
  }
};

// **Intersection Observer 설정**
const setupIntersectionObserver = () => {
  if (!observerTarget.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadStayData(); // ✅ 추가 데이터 로드
      }
    },
    { threshold: 1.0 },
  );

  observer.observe(observerTarget.value);
};
// Pinia 스토어의 queryData 값이 변경되면 데이터를 초기화하고 다시 로드
watch(
  () => facilitiesStore.queryData,
  () => {
    stayData.value = [];
    pageNo.value = 1;
    loadStayData();
  },
  { deep: true },
);

// 컴포넌트가 마운트될 때 데이터 로드 및 옵저버 설정
onMounted(() => {
  loadStayData();
  // setupIntersectionObserver();
});
</script>

<template>
  <!-- Top 검색창, 검색 결과 -->
  <!-- 조회 리스트 -->
  <div v-motion="travelListEffect" class="mainRight">
    <div class="searchResult title" :style="{}">{{ currentTitle }}</div>
    <!-- 카드 컴포넌트 -->
    <div
      v-motion="travelListEffect"
      v-for="(item, index) in stayData"
      :key="index"
      :style="{ width: '100%' }"
    >
      <TravelListCard :data="item" />
    </div>
    <!-- 감지용 div -->
    <div ref="observerTarget" style="height: 10px"></div>
  </div>
</template>

<style scoped>
/* 제목 폰트 */
.title {
  font-size: 36px;
  font-weight: 700;
}

.subTitle {
  font-size: 24px;
  font-weight: 500;
}
.mainRight {
  display: flex;
  width: 75%;
  flex-direction: column;
  align-items: start;
}
</style>
