<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import PopularTravelCard, { type PopularTravelData } from '@/components/homeMain/atoms/PopularTravelCard.vue';

interface PopularTravelDataProps {
  data : PopularTravelData[];
}
const props = defineProps<PopularTravelDataProps>();

</script>

<template>
    <swiper class="mb-5"
    :slides-per-view="3"
    :loop="true"
    :scrollbar="{ el: '.swiper-scrollbar', draggable: true, enabled: true }"
    style="height: 500px"
  >
    <swiper-slide v-for="(item, index) in props.data" :key="index"><PopularTravelCard class="h-100" :data="item" /></swiper-slide>
    <template v-if="props.data.length < 3">
      <swiper-slide><div class="bg-gray-3 h-100 rounded-5"></div></swiper-slide>
      <swiper-slide><div class="bg-gray-3 h-100 rounded-5"></div></swiper-slide>
      <swiper-slide><div class="bg-gray-3 h-100 rounded-5"></div></swiper-slide>
      <swiper-slide><div class="bg-gray-3 h-100 rounded-5"></div></swiper-slide>
    </template>
  </swiper>
</template>

<style scoped>
.swiper-slide {
  opacity: 75%;
  transform: scale(0.9);
  transition: all 0.5s;
}
.swiper-slide-next {
  opacity: 100%;
  transform: scale(1.0);
}
</style>
