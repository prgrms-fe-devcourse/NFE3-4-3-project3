<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const mainImages = ref<string[]>([
  '/images/main-slide1.png',
  '/images/main-slide2.png',
  '/images/main-slide3.png',
  '/images/main-slide4.png',
  '/images/main-slide5.png',
  '/images/main-slide6.png',
  '/images/main-slide7.png',
  '/images/main-slide8.png',
  '/images/main-slide9.png',
])
const modules = ref([Autoplay, Pagination]);
</script>

<template>
  <div class="hero-layout">
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
      delay: 4000,
      disableOnInteraction: false,
    }"
      :pagination="{
      clickable: true,
    }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(item,index) in mainImages" :key="index+'img'">
        <img :src="item" alt="hero-image" height="260" width="1246" class="hero-image"/>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
.hero-layout {
  height: 300px;
  width: 1246px;
}

.hero-image {
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
