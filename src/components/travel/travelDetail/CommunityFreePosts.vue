<script setup lang="ts">
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import PostCard from '@/components/community/PostCard.vue';
import { useRouter } from 'vue-router';
import { type devPost } from '@/types/devcourse/devPost';
import { type devUser } from '@/types/devcourse/devUser';

const { data, users, title } = defineProps<{ data: devPost[], users: devUser[], title: string }>();

const router = useRouter();

function handleClick() {
  router.push({ name: 'freeCommunityForm' });
}
</script>

<template>
  <div v-if="data" class="d-flex flex-column bg-gray-3 p-3 rounded">
    <!-- 헤더 & 후기 작성 버튼 -->
    <div class="d-flex justify-content-between align-items-center mb-0">
      <p class="ms-4 mt-3 p-0 name-text text-gray-10 fs-2 fw-bold">{{ title }}</p>
      <button
        class="btn border-secondary-green rounded bg-white"
        @click="handleClick"
        style="height: 40px"
      >
        <p class="m-0 p-0 text-secondary-green">글 작성</p>
      </button>
    </div>
    <!-- 스와이퍼 -->
    <swiper
      class="my-swiper w-100"
      :slides-per-view="4"
      space-between="10"
      style="height: fit-content"
    >
      <swiper-slide v-for="(post, index) in data.slice(0, 8)" :key="post._id"
        ><PostCard
          :postId="post._id"
          :imageUrl="post.image ?? ''"
          :authorImage="users[index].image"
          :authorName="users[index].fullName"
          :authorEmail="users[index].email"
          :title="post.title"
          :createdAt="post.createdAt"
          :likes="post.likes"
          :comments="post.comments"
      /></swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
/* Swiper Slide 자체를 flex 컨테이너로 사용 */
.my-swiper >>> .swiper-slide {
  /* >>> 는 Vue SFC에서 Scoped CSS를 우회하기 위한 깊은 선택자 */
  display: flex;
  align-items: stretch; /* 내부 콘텐츠(PostCard)를 슬라이드 높이에 맞게 늘림 */
}

/* PostCard가 슬라이드 높이를 꽉 채우도록 */
.my-swiper >>> .post-card {
  flex: 1;
  /* 필요하면 min-height, max-height 지정 가능 */
}
</style>
