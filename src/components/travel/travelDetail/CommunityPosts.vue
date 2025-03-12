<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import CommunityPostSlide, { type CommunityPostsSlideData } from './CommunityPostSlide.vue';

interface CommunityPostsProps {
  name: string;
  data: CommunityPostsSlideData[];
}
const props = defineProps<CommunityPostsProps>();

const dummyData: CommunityPostsSlideData = {
  avatarImgUrl: '',
  content: '부산에 있는 캠핑장 다녀왔는데 기대했던것 이상이에요. 꼭 한번 가보시는걸 추천드려요',
  createdAt: new Date(),
  numComments: 3,
  numLikes: 3,
  mainImgUrl: '/forSwipers/homeMainSwiper.png',
  postBy: 'kylekim95',
  title: '저희 집 댕댕이와 캠핑 다녀왔어요.',
};

</script>

<template>
  <div class="d-flex flex-column bg-gray-3 p-3 rounded">
    <!-- 헤더 & 후기 작성 버튼 -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <p class="m-0 p-0 name-text text-gray-10">{{ '#' + props.name }}</p>
      <button class="btn border-secondary-green rounded bg-white" style="height: 40px">
        <p class="m-0 p-0 text-secondary-green">후기 작성</p>
      </button>
    </div>
    <!-- 스와이퍼 -->
    <swiper class="w-100" :slides-per-view="4" space-between="10" style="height: fit-content">
      <swiper-slide><CommunityPostSlide :data="dummyData" /></swiper-slide>
      <swiper-slide><CommunityPostSlide :data="dummyData" /></swiper-slide>
      <swiper-slide><CommunityPostSlide :data="dummyData" /></swiper-slide>
      <swiper-slide><CommunityPostSlide :data="dummyData" /></swiper-slide>
      <swiper-slide><CommunityPostSlide :data="dummyData" /></swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.name-text {
  font-family: 'Pretendard';
  font-size: 36px;
  font-weight: bold;
}
</style>
