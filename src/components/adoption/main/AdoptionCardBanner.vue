<script setup lang="ts">
import PATH from '@/constants/path';
import ServiceInfoCard from './ServiceInfoCard.vue';

const cardInfo = [
  {
    id: 1,
    title: '반려동물 실종신고',
    subTitle: '펫트너 커뮤니티',
    imgURL: '/PNG-Image/images/speaker.png',
    alt: 'notice petner community banner image',
    navigatePath: PATH.community,
  },
  {
    id: 2,
    title: '반려동물 입양하기',
    subTitle: '입양 도우미 서비스',
    imgURL: '/PNG-Image/images/heart-hand.png',
    alt: 'notice petner adoption service banner image',
    navigatePath: PATH.adoptionForm,
  },
];
</script>

<template>
  <div class="my-5 d-flex gap-3">
    <ServiceInfoCard v-for="item of cardInfo" :key="item.id" :item="item" />
  </div>
</template>

<style></style>
