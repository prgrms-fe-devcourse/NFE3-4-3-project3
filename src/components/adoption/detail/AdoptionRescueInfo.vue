<script setup lang="ts">
import { defineProps } from 'vue';
import type { RescueInfo } from '@/types/rescue';

const props = defineProps<{
  rescue: RescueInfo;
}>();
</script>

<template>
  <div class="container my-2" v-if="rescue">
    <h3 class="mb-4" style="font-weight: 700">
      <i class="fa-solid fa-truck-medical me-3"></i>구조 정보
    </h3>
    <table class="table table-bordered text-center shadow-sm">
      <tbody>
        <tr>
          <th scope="row" class="th-gray-3">구조 접수일</th>
          <td>{{ rescue.happenDt }}</td>
        </tr>
        <tr>
          <th scope="row" class="th-gray-3">구조 장소</th>
          <td>{{ rescue.happenPlace }}</td>
        </tr>
        <tr>
          <th scope="row" class="th-gray-3">공고 기간</th>
          <td>{{ rescue.noticeSdt }} - {{ rescue.noticeEdt }}</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex align-items-center text-muted">
      <i class="bi bi-exclamation-circle-fill me-2" style="font-size: 1.5rem"></i>
      유기동물 문의는 보호센터에 연락하시기 바랍니다.
    </div>
  </div>
</template>

<style scoped>
.th-gray-3 {
  background-color: var(--gray-3);
  padding: 10px;
  font-weight: 600;
  font-size: 18px;
}
.table td,
.table th {
  vertical-align: middle;
  padding: 1rem;
  font-size: 18px;
}
.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
