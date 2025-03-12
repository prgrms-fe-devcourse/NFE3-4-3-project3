<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from 'vue-router';

import 'swiper/css';
import 'swiper/css/navigation';

export interface ShoppingAndCulture {
  id: number | string;
  img: string;
  path: string;
  customQuery?: Record<string, string>;
}

const router = useRouter();

const props = defineProps<{
  shopping: ShoppingAndCulture[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}>();

function handleCategoryClick(shopping: ShoppingAndCulture) {
  const query = shopping.customQuery ? shopping.customQuery : { contenttypeid: '38' };
  router.push({
    path: shopping.path,
    query,
  });
}
</script>

<template>
  <div class="container mt-4">
    <div class="gray-10 fw-bold mt-5" style="font-size: 36px; align-self: flex-start">
      {{ sectionTitle }}
    </div>
    <div class="gray-10 text-gray-7" style="font-size: 24px; align-self: flex-start">
      {{ sectionSubtitle }}
    </div>
    <Swiper :slides-per-view="5" :space-between="3" style="width: 100%" class="mt-3">
      <SwiperSlide v-for="item in props.shopping" :key="item.id">
        <div
          class="card border-0 text-center text-gray-1 card-img-top"
          @click="() => handleCategoryClick(item)"
        >
          <img
            :src="item.img"
            class="card-img-top"
            alt="이미지"
            style="width: 240px; height: 240px; object-fit: cover; border-radius: 50%"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>