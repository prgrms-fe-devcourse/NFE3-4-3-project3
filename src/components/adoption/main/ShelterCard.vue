<script setup lang="ts">
import { defineProps } from 'vue';
interface Shelter {
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

defineProps<{
  shelter: Shelter;
}>();
</script>

<template>
  <div class="card-wrapper">
    <div class="card-content d-flex flex-column gap-1">
      <div class="d-flex justify-content-between">
        <!-- 제목과 태그 -->
        <span class="fs-5 fw-semibold">{{ shelter.careNm }}</span>
        <span class="badge rounded-pill bg-primary-blue">{{ shelter.divisionNm }}</span>
      </div>
      <div class="d-flex justify-content-between detail-info">
        <!-- 위치와 전화번호 -->
        <span> 📍 {{ shelter.careAddr }} </span>
        <span> 🔗{{ shelter.careTel }} </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  border: 1px solid var(--gray-6);
  padding: 20px 57px;
  border-radius: 17px;
  margin-bottom: 1rem;
}

.card-wrapper:hover {
  background-color: var(--gray-3);
}
.badge {
  padding: 5px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
  font-weight: 400;
}

.detail-info {
  color: var(--gray-7);
  font-size: 20px;
}

.detail-info:last-child {
  font-size: 13px;
}
</style>
