<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import { Pagination } from 'swiper/modules';
  import { ref } from 'vue'
  import type { Book } from '@/types/libraryType.ts'

  const modules = ref([Pagination]);

  defineProps<{ books: Book[] }>();
</script>

<template>
  <div class="library-new-books">
    <div class="title">가까운 도서관 대출량 TOP10</div>
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :pagination="{
      clickable: true,
    }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="book in books" :key="book.isbn13">
        <img
          :src="book.bookImageURL"
          width="80"
          height="150"
          alt="book-image"
          @error="(event) => event.target.src = '/images/no-image.png'"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
.library-new-books {
  width : 368px;
  height: 280px;
  background-color: #ECF4FE;
  border-radius: 10px;
  padding : 20px;
  display: grid;
}

.title {
  color : #3F3E3D;
  font-size: 24px;
  font-weight: bold;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  height: 150px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
