<script setup lang="ts">
import { defineProps } from 'vue';
import type { Shelter } from '@/types/shelter';

const props = defineProps<{
  shelter: Shelter;
}>();
</script>

<template>
  <div class="container my-5" v-if="shelter">
    <h3 class="mb-4" style="font-weight: 700">
      <i class="fa-solid fa-house-chimney me-3"></i>동물 보호소 정보
    </h3>
    <table class="table table-bordered text-center shadow-sm">
      <tbody>
        <tr>
          <th scope="row" class="th-gray-3">보호소명</th>
          <td>{{ shelter.careNm }}</td>
        </tr>
        <tr>
          <th scope="row" class="th-gray-3">보호소 전화번호</th>
          <td>{{ shelter.careTel }}</td>
        </tr>
        <tr>
          <th scope="row" class="th-gray-3">보호소 장소</th>
          <td>{{ shelter.careAddr }}</td>
        </tr>
        <tr>
          <th scope="row" class="th-gray-3">관할 기관</th>
          <td>{{ shelter.orgNm }}</td>
        </tr>
        <tr>
          <th scope="row" class="th-gray-3">담당자</th>
          <td>{{ shelter.chargeNm }}</td>
        </tr>
        <tr>
          <th scope="row" class="th-gray-3">담당자 연락처</th>
          <td>{{ shelter.officetel }}</td>
        </tr>
      </tbody>
    </table>
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
