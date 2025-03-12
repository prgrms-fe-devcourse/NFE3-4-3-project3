<script setup lang="ts">
import TextBlock, { type TextBlockDescriptor } from '@/components/common/TextBlock.vue';
import MainShoppingSwiper from './atoms/MainShoppingSwiper.vue';

const shoppingText : TextBlockDescriptor[] = [
  {
    content: '반려동물도 즐거운',
    bgColor:'', color:'var(--gray-10)', font: 'Pretendard', size:'32px', weight:700, margin: 'mb-3'
  },
  {
    content: ' 쇼핑',
    bgColor:'', color:'var(--primary-red)', font: 'Pretendard', size:'32px', weight:700, margin: 'mb-3'
  },
  {
    content: ', 펫트너에서 시작하세요.',
    bgColor:'', color:'var(--gray-10)', font: 'Pretendard', size:'32px', weight:700, margin: 'mb-3'
  },
];
const shoppingItems = [
  {
    id: 1,
    img: '/forSwipers/homeMainSwiper.png',
    title: '의류',
    name: '바잇미 캠핑클럽 후리스',
    content: '[20% 할인행사중🚀]',
  },
  {
    id: 2,
    img: '/forSwipers/homeMainSwiper2.png',
    title: '하우스',
    name: '바잇미 폼폼쿠션',
    content: '[연간 판매량 1위🥇]',
  },
  {
    id: 3,
    img: '/forSwipers/homeMainSwiper3.png',
    title: '장난감',
    name: '런치박스 플레이북',
    content: '[20% 할인 행사중]',
  },
  {
    id: 4,
    img: '/forSwipers/homeMainSwiper.png',
    title: '의류2',
    name: '가을 신상 의류',
    content: '[10% 할인]',
  },
  {
    id: 5,
    img: '/forSwipers/homeMainSwiper2.png',
    title: '의류2',
    name: '가을 신상 의류',
    content: '[10% 할인]',
  },
];
</script>

<template>
  <div class="container mb-5 d-flex flex-column" style="height: 500px">
    <div class="d-flex align-self-center">
      <TextBlock v-for="(item, index) in shoppingText" :key="index" :text-block="item"/>
    </div>
    <MainShoppingSwiper :shopping-items="shoppingItems"/>
  </div>
</template>
