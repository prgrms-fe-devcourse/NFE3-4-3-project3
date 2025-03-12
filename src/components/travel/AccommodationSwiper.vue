<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from 'vue-router';

import 'swiper/css';
import 'swiper/css/navigation';

export interface Accommodation {
  id: number | string;
  img: string;
  type: string;
  location: string;
  price: string;
  path: string;
}
const router = useRouter();

const props = defineProps<{
  accommodations: Accommodation[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}>();

function handleCategoryClick(accommodation: Accommodation) {
  router.push({
    path: accommodation.path,
    query: { contenttypeid: '32' },
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
    <Swiper :slides-per-view="3" :space-between="3" style="width: 100%" class="mt-3">
      <SwiperSlide v-for="item in props.accommodations" :key="item.id">
        <div class="card border-0 text-center text-gray-1" @click="() => handleCategoryClick(item)">
          <img
            :src="item.img"
            class="card-img-top"
            alt="숙소 이미지"
            style="
              width: 400px;
              height: 400px;
              object-fit: cover;
              border-radius: 3%;
              filter: brightness(70%);
            "
          />
          <div class="card-img-overlay d-flex flex-column justify-content-end mt-3 ms-3">
            <div class="text-start" style="margin-bottom: -35px">
              <h5
                class="card-title text-gray-1 fw-bold"
                style="font-size: 40px; font-family: 'Paperlogy'; font-weight: 700"
              >
                {{ item.type }}
              </h5>
              <p style="font-size: 20px">{{ item.location }}</p>
            </div>
            <p class="text-end mb-0 me-5 fw-bold" style="font-size: 36px">
              {{ item.price }}
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
