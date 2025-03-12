<script setup lang="ts">
import ShowMoreButton from '@/components/common/ShowMoreButton.vue';
import TitleText from '@/components/common/TitleText.vue';
import PATH from '@/constants/path';
import { formatOperatingHours } from '@/utils/timeFormat';

import { computed } from 'vue';
interface ShelterWithRegNo {
  careRegNo: string;
  careNm: string;
  orgNm: string;
  divisionNm: string;
  saveTrgtAnimal: string;
  careAddr: string;
  jibunAddr: string;
  lat: number;
  lng: number;
  dsignationDate: string;
  weekOprStime: string;
  weekOprEtime: string;
  weekCellStime: string;
  weekCellEtime: string;
  weekendOprStime: string;
  weekendOprEtime: string;
  weekendCellStime: string;
  weekendCellEtime: string;
  closeDay: string;
  vetPersonCnt: number;
  specsPersonCnt: number;
  medicalCnt: number;
  breedCnt: number;
  quarabtineCnt: number;
  feedCnt: number;
  careTel: string;
  dataStdDt: string;
}

interface AnimalBadge {
  [key: string]: {
    name: string;
    bgColor: string;
    textColor: string;
  };
}

const ANIMAL_BADGE: AnimalBadge = {
  개: {
    name: '개',
    bgColor: '#CFF4FC',
    textColor: '#055160',
  },
  고양이: {
    name: '고양이',
    bgColor: '#FFF3CD',
    textColor: '#664D03',
  },
  기타: {
    name: '기타',
    bgColor: '#D1E7DD',
    textColor: '#146C43',
  },
};
const { item, careRegNo, onClose } = defineProps<{
  item: ShelterWithRegNo;
  careRegNo: string;
  onClose: () => void;
}>();
const animalCategoryArray = computed(() =>
  item.saveTrgtAnimal.split('+').map((e) => ANIMAL_BADGE[e]),
);
</script>

<template>
  <div class="modal-wrapper">
    <div class="text-end">
      <button class="close-button" @click="onClose()"><i class="bi bi-x-lg"></i></button>
    </div>
    <div class="d-flex flex-column gap-2">
      <div class="d-flex gap-1 align-items-center">
        <TitleText size="24px" weight="700" color="gray-10">{{ item.careNm }}</TitleText>
        <TitleText size="16px" weight="600" color="gray-7">{{ item.divisionNm }}</TitleText>
      </div>
      <div class="text-gray-7 fs-6">{{ item.jibunAddr }}</div>
      <div class="d-flex gap-2 align-items-center">
        <i class="bi bi-sun"></i>
        <span class="text-gray-7">{{
          formatOperatingHours(item.weekOprStime, item.weekOprEtime)
        }}</span>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <i class="bi bi-telephone"></i>
        <span class="text-gray-7">{{ item.careTel }}</span>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <i class="bi bi-person"></i>
        <span class="text-gray-7"> 수의사 {{ item.medicalCnt }}명</span>
      </div>
      <div class="d-flex gap-2">
        <span
          v-for="(animal, index) of animalCategoryArray"
          :key="index"
          class="badge"
          :style="{ backgroundColor: animal.bgColor, color: animal.textColor }"
          >{{ animal.name }}</span
        >
      </div>
      <div class="d-flex justify-content-end mb-2">
        <ShowMoreButton
          text="보호소 유기동물"
          :linkTo="{ path: PATH.adoptionSearch, query: { shelterId: careRegNo } }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  position: absolute;
  right: 5%;
  top: 5%;

  width: 400px;
  /* height: 340px; */
  background-color: var(--gray-1);
  border-radius: 26px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  z-index: 3;
  box-shadow:
    95px 141px 48px 0px rgba(0, 0, 0, 0),
    61px 90px 44px 0px rgba(0, 0, 0, 0.01),
    34px 51px 37px 0px rgba(0, 0, 0, 0.05),
    15px 23px 27px 0px rgba(0, 0, 0, 0.09),
    4px 6px 15px 0px rgba(0, 0, 0, 0.1);
}
.close-button {
  width: 35px;
  background-color: transparent;
  border: none;
}

.bi-x-lg {
  width: 32px;
  height: 32px;
  color: var(--gray-10);
}

.bi-person,
.bi-telephone,
.bi-sun {
  color: var(--primary-green);
}

span {
  font-size: 14px;
  font-weight: 500;
}

.badge {
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  font-weight: 600;
}
</style>
