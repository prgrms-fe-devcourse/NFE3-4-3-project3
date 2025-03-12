<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="container my-5 p-5 bg-cover bg-center rounded-3 adopt-form-section">
    <div class="adopt-form-content text-left text-white">
      <h3 class="fw-bold mb-4" style="font-family: 'Paperlogy'">
        입양 신청서 작성하기
        <i class="fa fa-paw" style="font-size: 2.5rem; margin-left: 10px"></i>
      </h3>
      <p style="font-weight: 300; font-size: 1.2rem; line-height: 1.8">
        사랑과 책임감을 가지고 입양을 고려해 주셔서 감사합니다.
        <br />
        반려동물은 소중한 가족입니다.
        <br />
        신중하게 결정하시고, 입양 후에도 책임감을 다해주세요.
      </p>
      <RouterLink
        to="/adoption/form"
        class="btn btn-gray-1 text-primary-green mt-3"
        style="font-size: 1.2rem"
        >바로가기</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.adopt-form-section {
  position: relative;
  background-repeat: no-repeat;
  background-image: url('/PNG-Image/images/adoptformbtn.png');
  background-size: cover;
  background-position: center;
  height: 350px;
}

.adopt-form-content {
  position: relative;
  z-index: 2;
}

.btn-gray-1 {
  background-color: var(--gray-1);
  padding: 10px 40px;
  border-radius: 30px;
  font-weight: 600;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.btn-gray-1:hover {
  background-color: var(--primary-green);
  color: var(--gray-1) !important;
}
</style>
