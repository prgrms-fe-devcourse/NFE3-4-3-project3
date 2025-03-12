<script setup lang="ts">
import MissingForm from '@/components/community/MissingForm.vue';
</script>

<template>
  <div>
    <!-- 배너자리 -->
    <div
      class="banner d-flex justify-content-center align-items-center bg-cover"
      style="
        background-image: url('/PNG-Image/images/MissingCommunityFormBanner.png');
        height: 384px;
        background-size: cover;
        background-position: center;
        position: relative;
      "
    >
      <div class="container text-start">
        <div class="text-white px-4 py-8" style="max-width: 1280px; margin: 0 auto">
          <h2 class="fw-bold fs-1 mb-3" style="font-family: 'paperlogy'; line-height: 1.5">
            반려동물이 사라졌나요? <br />
            빠르게 <span style="color: var(--gray-10)"> 실종신고</span>를 접수해 주세요.
          </h2>
          <p style="font-family: 'paperlogy'; font-size: 20px">
            실종된 반려동물의 정보(사진, 특징, 마지막 목격 장소 등)를 입력해 주세요.
          </p>
        </div>
      </div>
    </div>
    <!-- 폼 제출 자리 -->
    <div class="w-100 d-flex justify-content-center">
      <MissingForm />
    </div>
  </div>
</template>
