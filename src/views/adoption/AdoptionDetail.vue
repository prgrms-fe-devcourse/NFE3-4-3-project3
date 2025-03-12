<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAnimalInfo, getAnimalListQuery } from '@/apis/supabase';
import FormButton from '@/components/adoption/detail/FormButton.vue';
import AdoptionWaitingList from '@/components/adoption/detail/AdoptionWaitingList.vue';
import AdoptionShelter from '@/components/adoption/detail/AdoptionShelterInfo.vue';
import AdoptionRescueInfo from '@/components/adoption/detail/AdoptionRescueInfo.vue';
import AdoptionAnimalInfo from '@/components/adoption/detail/AdoptionAnimalInfo.vue';
import type { Animal } from '@/types/animal';

// 날짜 포맷 함수: YYYYMMDD -> YYYY-MM-DD
function formatDate(dateStr: string): string {
  if (dateStr && dateStr.length === 8) {
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  }
  return dateStr;
}

const route = useRoute();
console.log('Route params:', route.params);

const animalDetail = ref<Animal | null>(null);
const rescueData = ref<{
  happenDt: string;
  happenPlace: string;
  noticeSdt: string;
  noticeEdt: string;
} | null>(null);
const shelterData = ref<{
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
} | null>(null);
const error = ref<string | null>(null);

// 동물 상세 정보 가져오기
async function fetchAnimalDetail(id: string) {
  console.log('Fetching animal detail for id:', id);
  try {
    const data = await getAnimalInfo(id);
    console.log('API response:', data);
    if (Array.isArray(data) && data.length > 0) {
      animalDetail.value = data[0];
      console.log('Animal detail:', animalDetail.value);
      rescueData.value = {
        happenDt: formatDate(data[0].happenDt || ''),
        happenPlace: data[0].happenPlace || '',
        noticeSdt: formatDate(data[0].noticeSdt || ''),
        noticeEdt: formatDate(data[0].noticeEdt || ''),
      };
      shelterData.value = {
        careNm: data[0].careNm || '-',
        careTel: data[0].careTel || '-',
        careAddr: data[0].careAddr || '-',
        orgNm: data[0].orgNm || '-',
        chargeNm: data[0].chargeNm || '-',
        officetel: data[0].officetel || '-',
      };
      console.log('Rescue data:', rescueData.value);
      console.log('Shelter data:', shelterData.value);
    } else {
      error.value = '동물 정보를 찾을 수 없습니다.';
      console.error('No animal data found.');
    }
  } catch (err: any) {
    console.error('Error fetching animal detail:', err);
    error.value = '정보를 불러오는 도중 오류가 발생했습니다.';
  }
}

onMounted(() => {
  const id = route.params.animalId as string;
  console.log('Animal ID from route:', id);
  if (id) {
    fetchAnimalDetail(id);
  } else {
    error.value = '동물 ID가 제공되지 않았습니다.';
    console.error('No animal ID provided in route params.');
  }
});

// --- 다른 입양 대기 동물 데이터 로딩 ---
const otherAnimalCards = ref<Animal[]>([]);
async function fetchOtherAnimals() {
  const params = { state: true, page: 1 };
  const data = await getAnimalListQuery(params);
  if (Array.isArray(data)) {
    // 최대 3개만 표시
    otherAnimalCards.value = data.slice(0, 3);
  } else {
    console.error('다른 동물 조회 에러:', data);
  }
}
onMounted(() => {
  fetchOtherAnimals();
});
</script>

<template>
  <div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else>
      <!-- 상단 배너 영역 -->
      <div class="container-fluid p-0">
        <div class="position-relative">
          <div class="position-absolute top-50 start-0 translate-middle-y p-5 text-white ms-5">
            <h1 class="display-4 text-start" style="font-family: 'Paperlogy'; font-weight: 600">
              유기동물 조회
            </h1>
            <p class="lead text-start" style="font-family: 'Paperlogy'">
              그들의 내일을 바꿀 수 있는 사람은 바로, 당신입니다.
            </p>
          </div>
          <img
            src="/PNG-Image/images/adoptdetailbanner.png"
            alt="Adopt Detail Banner"
            class="img-fluid"
            style="object-fit: cover; width: 100%; height: 384px"
          />
        </div>
      </div>

      <!-- 동물 상세 정보 영역 -->
      <div class="container py-5" v-if="animalDetail">
        <div class="row">
          <!-- 좌측: 동물 이미지 -->
          <div class="col-md-6 mb-4">
            <div class="d-flex flex-column align-items-center">
              <img
                :src="animalDetail.popfile"
                alt="Animal Image"
                class="img-fluid rounded mb-3 shadow-sm"
                style="width: 560px; height: 460px; object-fit: cover"
              />
              <div
                class="bg-primary-green text-gray-1 p-3 my-2 text-center rounded"
                style="width: 560px"
              >
                <div class="d-flex justify-content-center align-items-center">
                  <i class="fa-solid fa-heart me-3" style="font-size: 20px"></i>
                  <span class="fs-6">
                    당신의 사랑을 기다리는 생명들에게 새로운 시작을 선물하세요.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 동물 정보 카드 컴포넌트 -->
          <div class="col-md-6">
            <AdoptionAnimalInfo :animal="animalDetail" />
          </div>
        </div>
      </div>

      <!-- 구조 정보 섹션 -->
      <div class="container my-5" v-if="rescueData">
        <AdoptionRescueInfo :rescue="rescueData" />
      </div>

      <!-- 보호소 정보 섹션 -->
      <div class="container my-5" v-if="shelterData">
        <AdoptionShelter :shelter="shelterData" />
      </div>

      <FormButton />

      <!-- 입양 대기 동물 목록 -->
      <AdoptionWaitingList :animals="otherAnimalCards" />
    </div>
  </div>
</template>

<style scoped>
.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}
</style>
