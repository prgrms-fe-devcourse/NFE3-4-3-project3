<script setup lang="ts">
import { defineProps } from 'vue';
import type { Animal } from '@/types/animal';

const props = defineProps<{
  animal: Animal;
}>();
</script>

<template>
  <div class="card shadow-sm custom-card">
    <div class="card-header bg-primary-green text-white">
      <h4 class="mb-0" style="font-family: 'Paperlogy'; font-weight: 600">
        <i class="fa-solid fa-paw me-2"></i>동물 정보
      </h4>
    </div>
    <div class="card-body p-4">
      <div class="info-row">
        <div class="info-label">유기번호</div>
        <div class="info-value">{{ animal.desertionNo }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">공고번호</div>
        <div class="info-value">{{ animal.noticeNo }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">품종</div>
        <div class="info-value">{{ animal.kindCd }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">털색</div>
        <div class="info-value">{{ animal.colorCd }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">나이</div>
        <div class="info-value">{{ animal.age }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">체중</div>
        <div class="info-value">{{ animal.weight }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">상태</div>
        <div class="info-value">{{ animal.processState }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">성별</div>
        <div class="info-value">
          <span
            class="gender-badge"
            :style="{
              color:
                animal.sexCd === 'M'
                  ? 'var(--primary-blue)'
                  : animal.sexCd === 'F'
                    ? 'var(--primary-red)'
                    : 'var(--gray-1)',
              backgroundColor:
                animal.sexCd === 'M'
                  ? 'var(--secondary-blue)'
                  : animal.sexCd === 'F'
                    ? 'var(--secondary-red)'
                    : 'var(--secondary-green)',
            }"
          >
            {{ animal.sexCd === 'M' ? '수컷' : animal.sexCd === 'F' ? '암컷' : '미상' }}
          </span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-label">중성화</div>
        <div class="info-value">{{ animal.neuterYn === 'Y' ? 'O' : 'X' }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">특징</div>
        <div class="info-value">{{ animal.specialMark }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-card {
  border-radius: 12px !important;
  border: none !important;
}
.card-header {
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 1.2rem;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px dashed #ddd;
  font-size: 1.15rem;
}
.info-label {
  flex: 0 0 120px;
  font-weight: 600;
  color: #555;
  display: flex;
  align-items: center;
}
.info-value {
  flex: 1;
  text-align: right;
  font-weight: 500;
  color: #333;
}
.gender-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 5px;
  text-align: center;
}
</style>
