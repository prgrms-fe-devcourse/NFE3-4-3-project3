<script setup lang="ts">
import { formatOperatingHours } from '@/utils/timeFormat';
interface Shelter {
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

defineProps<{ shelter: Shelter; isSelected: boolean }>();
</script>

<template>
  <div class="card-wrapper" :class="{ selected: isSelected }">
    <div class="title">{{ shelter.careNm }}</div>
    <div class="info">
      <i class="bi bi-brightness-high"></i>
      <span>{{ formatOperatingHours(shelter.weekOprStime, shelter.weekOprEtime) }}</span>
    </div>
    <div class="info">
      <i class="bi bi-telephone"></i>
      <span>{{ shelter.careTel }}</span>
    </div>
    <span class="tag">{{ shelter.closeDay.replace('+', ',') }} 휴무</span>
  </div>
</template>

<style scoped>
.card-wrapper {
  width: 100%;
  padding: 12px 14px;
  border-radius: 5px;
  border: 1px solid var(--gray-6);
  display: flex;
  flex-direction: column;
  gap: 7px;
  cursor: pointer;
}
.card-wrapper:hover {
  background-color: var(--gray-2);
}

.selected {
  border: 2px solid var(--secondary-green);
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-10);
}

.info {
  display: flex;
  gap: 10px;
  align-items: center;
}

.info span {
  color: var(--gray-7);
  font-size: 16px;
  font-weight: 500;
}
.tag {
  display: inline;
  max-width: 130px;
  text-align: center;
  background-color: var(--gray-3);
  padding: 5px 16px;
  color: var(--gray-7);
  font-size: 12px;
  border-radius: 16px;
}
</style>
