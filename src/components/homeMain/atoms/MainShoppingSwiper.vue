<script setup lang="ts">
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';

export interface ShoppingItems {
  id: number | string;
  img: string;
  title: string;
  name: string;
  content: string;
  path?: string;
}

const props = defineProps<{
  shoppingItems: ShoppingItems[];
}>();

function handleClick() {
  alert('path로 이동');
}
</script>

<template>
  <div class="container p-0">
    <Swiper :slides-per-view="3" :space-between="5" style="width: 100%">
      <SwiperSlide v-for="item in props.shoppingItems" :key="item.id" @click="handleClick">
        <div class="card border-0 text-center text-gray-1">
          <img
            :src="item.img"
            class="card-img-top"
            alt="상품 이미지"
            style="width: 420px; height: 420px; object-fit: cover"
          />
          <div
            class="card-img-overlay d-flex flex-column justify-content-between align-items-start"
          >
            <h5
              class="card-title text-gray-1 fw-bold mt-3 ms-3"
              style="font-size: 32px; font-family: 'Paperlogy-7Bold'; font-weight: 700"
            >
              {{ item.title }}
            </h5>
            <!-- 메달 이미지 -->
            <img
              src="/forSwipers/popularMedal.png"
              alt=""
              class="position-absolute top-0 end-0 mt-4 me-4"
            />
            <p
              class="card-text text-gray-1 text-start overflow-hidden mb-1 ms-1"
              style="margin-bottom: 42px; margin-left: 42px; font-size: 20px"
            >
              {{ item.name }}<br />
              {{ item.content }}
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
