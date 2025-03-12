<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AdoptionAnimalCard from '@/components/adoption/AdoptionAnimalCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import {
  getAnimalListQuery,
  fetchRegionOptions,
  fetchSexOptions,
  fetchStateOptions,
  fetchBreedAllList,
} from '@/apis/supabase';
import type { Animal } from '@/types/animal';

const router = useRouter();
const route = useRoute();

// 카테고리 매핑: 내부 한글 → URL 영어
const categoryMapping: Record<string, string> = {
  전체: 'all',
  개: 'dog',
  고양이: 'cat',
  기타동물: 'etc',
};
// URL 영어 → 내부 한글
const reverseCategoryMapping: Record<string, string> = {
  all: '전체',
  dog: '개',
  cat: '고양이',
  etc: '기타동물',
};

// 1) 카테고리
const categories = ref<string[]>(['전체', '개', '고양이', '기타동물']);
const activeCategory = ref<string>('전체');

// 2) 검색 조건
const region = ref<string>('');
const sex = ref<string>('');
const status = ref<string>('');
const startDate = ref<string>('');
const endDate = ref<string>('');
const breed = ref<string>('');

// 3) 옵션 배열
const regionOptions = ref<string[]>([]);
const sexOptions = ref<string[]>([]);
const stateOptions = ref<string[]>([]);
const breedAllList = ref<string[]>([]);

// 3-1) 품종 옵션은 category에 따라 필터링
const breedOptions = computed<string[]>(() => {
  let prefix = '';
  if (activeCategory.value === '개') prefix = '[개]';
  else if (activeCategory.value === '고양이') prefix = '[고양이]';
  else if (activeCategory.value === '기타동물') prefix = '[기타축종]';
  else return [];
  return breedAllList.value
    .filter((item) => item.startsWith(prefix))
    .map((item) => item.replace(prefix, '').trim());
});

// activeCategory 바뀌면 품종 초기화
watch(activeCategory, () => {
  breed.value = '';
});

// 날짜 유효성 검사
function updateEndDate() {
  if (endDate.value && endDate.value < startDate.value) {
    endDate.value = startDate.value;
  }
}

// 4) 동물 카드 & 페이징
const animalCards = ref<Animal[]>([]);
const currentPage = ref<number>(1);
const itemsPerPage = 9;
const totalPages = ref<number>(1);

// 4-1) 조회 함수
const fixedPagesCount = 5; // 한 그룹에 보여줄 페이지 수

async function fetchAnimals() {
  let kindCdParam: '개' | '고양이' | '기타축종' | undefined;
  if (activeCategory.value === '전체') {
    kindCdParam = undefined;
  } else if (activeCategory.value === '개') {
    kindCdParam = '개';
  } else if (activeCategory.value === '고양이') {
    kindCdParam = '고양이';
  } else {
    kindCdParam = '기타축종';
  }

  let stateParam: boolean | undefined;
  if (status.value === '보호중') {
    stateParam = true;
  } else if (status.value && status.value !== '보호중') {
    stateParam = false;
  }

  const queryStartParam = startDate.value ? startDate.value.replace(/-/g, '') : undefined;
  const queryEndParam = endDate.value ? endDate.value.replace(/-/g, '') : undefined;

  let speciesParam: string | undefined;
  if (breed.value) {
    let prefix = '';
    if (activeCategory.value === '개') prefix = '[개] ';
    else if (activeCategory.value === '고양이') prefix = '[고양이] ';
    else if (activeCategory.value === '기타동물') prefix = '[기타축종] ';
    speciesParam = prefix + breed.value;
  }

  const params = {
    kindCd: kindCdParam,
    orgName: region.value || undefined,
    sexCd: sex.value || undefined,
    state: stateParam,
    species: speciesParam,
    page: currentPage.value,
    queryStart: queryStartParam,
    queryEnd: queryEndParam,
  };

  const data = await getAnimalListQuery(params);
  if (Array.isArray(data)) {
    animalCards.value = data;
    if (data.length < itemsPerPage) {
      // 마지막 페이지: 데이터가 itemsPerPage 미만이면 실제 페이지 수로 설정
      totalPages.value = currentPage.value;
    } else {
      // full page인 경우: 현재 그룹을 계산하여 totalPages를 고정
      // 예: currentPage가 1~4이면 그룹 1 → totalPages = 5
      //     currentPage가 5(그룹 마지막 페이지)라면 group을 2로 가정하여 totalPages = 10
      let group = Math.floor((currentPage.value - 1) / fixedPagesCount) + 1;
      if (currentPage.value % fixedPagesCount === 0) {
        group++; // 현재 페이지가 그룹의 마지막 페이지이면 다음 그룹 존재 가정
      }
      totalPages.value = group * fixedPagesCount;
    }
  } else {
    console.error('동물 조회 에러:', data);
  }
}



// 4-2) 페이지 이동 함수
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchAnimals();
  }
}

function sexLabel(code: string): string {
  if (code === 'F') return '암컷';
  else if (code === 'M') return '수컷';
  else return '미상';
}

// 5) 마운트 시 옵션과 데이터 조회
onMounted(async () => {
  // URL에 category 쿼리 파라미터가 있으면 영어 값을 한글로 변환하여 초기 activeCategory에 반영
  if (route.query.category) {
    const queryCategory = route.query.category as string;
    activeCategory.value = reverseCategoryMapping[queryCategory] || activeCategory.value;
  }
  fetchAnimals();
  regionOptions.value = await fetchRegionOptions();
  sexOptions.value = await fetchSexOptions();
  stateOptions.value = await fetchStateOptions();
  breedAllList.value = await fetchBreedAllList();
});

// activeCategory가 바뀔 때마다 URL 쿼리 파라미터를 업데이트
watch(activeCategory, (newVal) => {
  router.replace({ query: { ...route.query, category: categoryMapping[newVal] } });
});
</script>

<template>
  <div>
    <!-- 배너 -->
    <div
      class="banner d-flex justify-content-end align-items-center bg-cover"
      style="
        background-image: url('/PNG-Image/images/adoptionSearch.jpg');
        height: 575px;
        background-size: cover;
        background-position: center;
        position: relative;
      "
    >
      <div>
        <div
          class="text-end text-white px-4 py-8 position-absolute top-50 end-0 translate-middle-y pr-6"
        >
          <h2 class="fw-bold fs-1 mb-3" style="font-family: 'paperlogy'; line-height: 1.5">
            당신의 새로운 가족이 여기 있습니다! <br />
            사랑을 기다리는 반려동물들을 만나보세요.
          </h2>
          <p style="font-family: 'paperlogy'; font-size: 20px">
            지금, 그들의 미래를 바꿀 수 있는 기회가 당신에게 있습니다. 함께 할 준비가 되셨나요?
          </p>
        </div>
      </div>
    </div>

    <!-- 카테고리 메뉴 -->
    <div
      class="category-menu d-flex justify-content-between mt-5 mb-8"
      style="max-width: 1280px; margin: 0 auto; position: relative; width: 90%"
    >
      <div
        v-for="category in categories"
        :key="category"
        :class="['category-item', { active: activeCategory === category }]"
        @click="
          () => {
            activeCategory = category;
            currentPage = 1;
            fetchAnimals();
          }
        "
        class="category-item py-3 px-6 rounded-full fs-6 transition-all flex flex-col items-center"
        style="flex: 1; text-align: center; margin: 0 5px"
      >
        <i
          :class="{
            'fa-solid fa-paw': category === '전체',
            'fa-solid fa-dog': category === '개',
            'fa-solid fa-cat': category === '고양이',
            'fa-solid fa-crow': category === '기타동물',
          }"
          :style="{
            color: activeCategory === category ? 'white' : 'var(--gray-)',
            backgroundColor: activeCategory === category ? 'var(--primary-green)' : 'transparent',
            padding: '15px',
            borderRadius: '50%',
            fontSize: activeCategory === category ? '40px' : '32px',
            border: activeCategory === category ? 'none' : '2px solid var(--gray-1)',
            display: 'inline-block',
            boxShadow: activeCategory === category ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
            transition:
              'background-color 0.3s ease, color 0.3s ease, border 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
            transform: activeCategory === category ? 'scale(1.1)' : 'scale(1)',
          }"
        />
        <span
          :style="{ fontWeight: activeCategory === category ? '700' : '400', fontSize: '20px' }"
        >
          {{ category }}
        </span>
      </div>
    </div>

    <!-- 검색창 섹션 -->
    <div class="search-bar d-flex justify-content-center mt-4 mb-12">
      <div
        class="search-container d-flex flex-column gap-4 bg-light rounded shadow-sm"
        style="max-width: 1280px; width: 100%; padding: 30px; margin-bottom: 40px"
      >
        <div class="d-flex justify-content-center gap-5">
          <!-- 지역 (시/도) -->
          <div class="d-flex align-items-center gap-2 py-2">
            <div class="form-label" style="font-size: 1.2rem">지역</div>
            <select class="form-select w-auto" v-model="region">
              <option value="">지역을 선택하세요</option>
              <option v-for="opt in regionOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <!-- 품종: category+breed 형태로 쿼리 -->
          <div class="d-flex align-items-center gap-2">
            <div class="form-label" style="font-size: 1.2rem">품종</div>
            <select class="form-select w-auto" v-model="breed">
              <option value="">품종을 선택하세요</option>
              <option v-for="opt in breedOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </div>
          <!-- 성별 -->
          <div class="d-flex align-items-center gap-2">
            <div class="form-label" style="font-size: 1.2rem">성별</div>
            <select class="form-select w-auto" v-model="sex">
              <option value="">성별을 선택하세요</option>
              <option v-for="opt in sexOptions" :key="opt" :value="opt">
                {{ sexLabel(opt) }}
              </option>
            </select>
          </div>
          <!-- 상태 -->
          <div class="d-flex align-items-center gap-2">
            <div class="form-label" style="font-size: 1.2rem">상태</div>
            <select class="form-select w-auto" v-model="status">
              <option value="">상태를 선택하세요</option>
              <option v-for="opt in stateOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </div>
        </div>

        <!-- 공고기간 -->
        <div class="d-flex justify-content-center gap-3 py-3">
          <div class="form-label" style="font-size: 1.2rem">공고기간</div>
          <input
            class="form-control w-auto"
            type="date"
            placeholder="공고 시작일"
            v-model="startDate"
            @change="updateEndDate"
          />
          <span style="font-size: 1.5rem">~</span>
          <input
            class="form-control w-auto"
            type="date"
            placeholder="공고 종료일"
            v-model="endDate"
            :min="startDate"
          />
          <button
            class="btn bg-primary-green text-gray-1 px-4"
            @click="
              () => {
                currentPage = 1;
                fetchAnimals();
              }
            "
          >
            조회
          </button>
        </div>
      </div>
    </div>

    <!-- 카드 리스트 -->
    <div
      class="card-list d-grid gap-4 mb-5 px-5 py-4"
      style="
        max-width: 1280px;
        margin: 0 auto;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
      "
    >
      <AdoptionAnimalCard v-for="card in animalCards" :key="card.desertionNo" :animal="card" />
    </div>

    <!-- 페이지네이션 -->
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :goToPage="goToPage" />
  </div>
</template>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 575px;
  z-index: 1;
}

.category-item {
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.category-item i {
  margin-bottom: 16px;
  background-color: transparent;
}

.category-item:hover {
  background-color: transparent;
  transform: scale(1.05);
}

.category-item:hover i {
  background-color: var(--primary-green);
  color: white;
}

.category-item.active i {
  background-color: var(--primary-green);
}

.category-item.active span {
  font-weight: bold;
}
</style>
