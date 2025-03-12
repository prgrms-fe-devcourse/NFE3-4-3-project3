<script setup lang="ts">
import { computed } from 'vue';

export interface PetTravelDetail {
  contentId: string;
  // 동반 유형
  acmpyTypeCd: string | null;
  //동반 가능 동물
  acmpyPsblCpam: string | null;
  //동반 시 필요사항
  acmpyNeedMtr: string | null;
  //기타 유의사항
  etcAcmpyInfo: string | null;
}

const props = defineProps<{
  detail: PetTravelDetail;
}>();

// 기타 유의사항 문자열을 줄바꿈 기준으로 분리
const infoList = computed(() => {
  return props.detail?.etcAcmpyInfo ? props.detail.etcAcmpyInfo.split('\n') : [];
});
</script>

<template>
  <div class="container mt-0 mb-5">
    <div class="pet-travel-card p-4 mb-3 position-relative">
      <div class="d-flex align-items-center mb-3">
        <!-- 아이콘 이미지 -->
        <img
          src="/travelDetail/pawIcon.png"
          alt="동반여행 아이콘"
          class="me-2 p-0"
          style="width: 3.5rem; height: 3.5rem"
        />
        <h2 class="mb-0" style="font-family: 'Paperlogy'; font-weight: 800">동반여행 정보</h2>
      </div>

      <!-- 동반 여행 정보 -->
      <ul class="list-unstyled fs-6">
        <li class="mb-2 fs-5 text-gray-7">
          동반 유형 :
          <span class="fs-5 text-gray-10">{{ props.detail.acmpyTypeCd }}</span>
        </li>
        <li class="mb-2 fs-5 text-gray-7">
          동반 가능 동물 : <span class="fs-5 text-gray-10">{{ props.detail.acmpyPsblCpam }}</span>
        </li>
        <li class="mb-2 fs-5 text-gray-7">
          동반 시 필요 사항 : <span class="fs-5 text-gray-10">{{ props.detail.acmpyNeedMtr }}</span>
        </li>
        <div class="d-block">
          <span class="fs-5 text-gray-7 mb-1">기타 유의사항</span>
          <ul class="list-unstyled">
            <li v-for="(item, index) in infoList" :key="index" class="fs-5 text-gray-10">
              {{ item }}
            </li>
          </ul>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pet-travel-card {
  background-color: #fdf1ff;

  background-image: url('/travelDetail/AnimatedPets.png');
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: auto;

  border-radius: 0.5rem;
  height: auto;
  min-height: 180px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
}
</style>
