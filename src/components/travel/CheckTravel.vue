<script setup lang="ts">
import FacilitiesCategory from './FacilitiesCategory.vue';
import RadioCategory from './RadioCategory.vue';
import { computed, ref, watch } from 'vue';
import { travelCategoryEffect } from '@/constants/travel/motion';
import { useRoute, useRouter } from 'vue-router';
import { useFacilitiesStore } from '@/stores/facilitiesStore';
const facilitiesStore = useFacilitiesStore();

// 쿼리스트링
const route = useRoute();
const router = useRouter();

// 현재 페이지 ContentTypeId
const categoryParam = route.params.category;
const currentContentTypeId = ref<string>(
  Array.isArray(categoryParam) ? categoryParam[0] : categoryParam || '',
);

// 키워드 값
const keyword = ref('');
const onSearch = () => {
  facilitiesStore.setKeywordCode(keyword.value);
};

// 초기 렌더링 시 currentContentTypeId의 값을 할당
facilitiesStore.setContentTypeIdCode(currentContentTypeId.value);

// URL 업데이트 + 부모에게 contentTypeId 전달
watch(currentContentTypeId, (newValue) => {
  router.push({ params: { category: newValue } }); // URL 동기화
  facilitiesStore.setContentTypeIdCode(newValue);
});

// 현재 페이지
const pageCategoryData = ref({
  title: '카테고리',
  options: [
    { category: '문화 & 쇼핑', contentTypeId: '38' },
    { category: '숙소', contentTypeId: '32' },
    { category: '레스토랑', contentTypeId: '39' },
    { category: '관광 & 체험', contentTypeId: '28' },
  ],
});

// 지역 정보
const areaInfo = ref([
  { area: '전체', areaCode: '' },
  { area: '서울', areaCode: '1' },
  { area: '인천', areaCode: '2' },
  { area: '대전', areaCode: '3' },
  { area: '대구', areaCode: '4' },
  { area: '광주', areaCode: '5' },
  { area: '부산', areaCode: '6' },
  { area: '울산', areaCode: '7' },
  { area: '세종', areaCode: '8' },
  { area: '경기', areaCode: '31' },
  { area: '강원', areaCode: '32' },
  { area: '충북', areaCode: '33' },
  { area: '충남', areaCode: '34' },
  { area: '경북', areaCode: '35' },
  { area: '경남', areaCode: '36' },
  { area: '전북', areaCode: '37' },
  { area: '전남', areaCode: '38' },
  { area: '제주', areaCode: '39' },
]);

// 유형 정보
// 숙소 옵션

const stayCategoryData = ref({
  title: '숙소 유형',
  options: [
    { category: '전체', code: '' },
    { category: '콘도미니엄', code: 'B02010500' },
    { category: '유스호스텔', code: 'B02010600' },
    { category: '펜션', code: 'B02010700' },
    { category: '모텔', code: 'B02010900' },
    { category: '민박', code: 'B02011000' },
    { category: '게스트하우스', code: 'B02011100' },
    { category: '홈스테이', code: 'B02011200' },
    { category: '한옥', code: 'B02011600' },
  ],
});

// 식당 옵션
const restaurantCategoryData = ref({
  title: '음식 유형',
  options: [
    { category: '전체', code: '' },
    { category: '한식', code: 'A05020100' },
    { category: '양식', code: 'A05020200' },
    { category: '일식', code: 'A05020300' },
    { category: '중식', code: 'A05020400' },
    { category: '이색', code: 'A05020700' },
    { category: '카페', code: 'A05020900' },
  ],
});
// 쇼핑 옵션
const shoppingCategoryData = ref({
  title: '쇼핑 유형',
  options: [
    { category: '전체', code: '' },
    { category: '5일장', code: 'A04010100' },
    { category: '시장', code: 'A04010200' },
    { category: '백화점', code: 'A04010300' },
    { category: '면세점', code: 'A04010400' },
    { category: '대형마트', code: 'A04010500' },
    { category: '전문매장', code: 'A04010600' },
    { category: '공예 / 공방', code: 'A04010700' },
    { category: '특산물 판매점', code: 'A04010900' },
    { category: '사후 면세점', code: 'A04011000' },
  ],
});
// 레포츠
const reportsCategoryData = ref({
  title: '레포츠 유형',
  options: [
    { category: '전체', code: '' },
    { category: '육상', code: 'A0302' },
    { category: '수상', code: 'A0303' },
    { category: '항공', code: 'A0304' },
  ],
});

// 현재 페이지에 따른 카테고리 데이터를 반환하는 computed
const currentCategoryData = computed(() => {
  switch (currentContentTypeId.value) {
    // 숙소
    case '32':
      return stayCategoryData.value;
    // 레스토랑
    case '39':
      return restaurantCategoryData.value;
    // 문화 & 쇼핑
    case '38':
      return shoppingCategoryData.value;
    // 관광 & 체험
    case '28':
      return reportsCategoryData.value;
    // 기본값 (예시로 '문화 & 쇼핑'에 대한 데이터가 있다면 추가)
    default:
      return { title: '기본', category: '', options: [] };
  }
});
</script>

<template>
  <!-- Top 검색창, 검색 결과 -->
  <div v-motion="travelCategoryEffect" class="mainLeft container position-sticky-top">
    <!-- search -->
    <div class="searchSection position-relative">
      <div class="searchSection position-relative">
        <input
          class="searchInput"
          type="text"
          placeholder="키워드 검색"
          v-model="keyword"
          @keyup.enter="onSearch"
        />
        <i class="bi bi-search position-absolute searchIcon" @click="onSearch"></i>
      </div>
    </div>
    <!-- 페이지 카테고리 -->
    <div class="title" :style="{ marginTop: '70px' }">카테고리</div>
    <div class="PageCategorySection mt-4 gap-5">
      <div v-for="(item, index) in pageCategoryData.options" :key="index">
        <input
          class="me-2"
          type="radio"
          name="category"
          :id="`category-${index}`"
          v-model="currentContentTypeId"
          :value="item.contentTypeId"
        />
        <label :for="`category-${index}`">{{ item.category }}</label>
      </div>
    </div>

    <!-- 지역 -->
    <div class="title" :style="{ marginTop: '70px' }">지역</div>
    <div class="areaContainer mt-4">
      <div
        class="areaButton"
        v-for="(item, index) in areaInfo"
        :key="index"
        :class="{ selectedButton: facilitiesStore.areaCode === item.areaCode }"
        @click="facilitiesStore.setAreaCode(item.areaCode)"
      >
        <span>{{ item.area }}</span>
      </div>
    </div>

    <!-- 시설 정보 및 유형 -->
    <div :key="`checkTravel-${currentContentTypeId}`" v-motion-pop>
      <RadioCategory v-model="currentCategoryData" />
      <div v-if="currentContentTypeId === '32'">
        <!-- <FacilitiesCategory @update:selectedFacilities="handleFacilitiesUpdate" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainLeft {
  display: flex;
  width: 25%;
  min-width: 250px;
  flex-direction: column;
  align-items: start;
}

/* 제목 폰트 */
.title {
  font-size: 36px;
  font-weight: 700;
}

/* 검색 바 */

.searchSection {
  width: 95%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.searchInput {
  width: 100%;
  height: 29px;
  padding: 30px;
  border: none;
  border-radius: 20px;
  color: var(--gray-6);
  font-size: 24px;
  font-weight: 400;
  background-color: var(--gray-3);
}

.searchIcon {
  right: 10%;
  font-size: 24px;
  color: var(--gray-7);
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

/* 지역 버튼 */
.areaContainer {
  display: block;
  width: 100%;
}

/* 지역 버튼 */
.areaButton {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px; /* 버튼 간격 */
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
