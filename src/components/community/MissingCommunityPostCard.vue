<script setup lang="ts">
import useFetchUser from '@/composibles/tanstack-query/useFetchUser';
import type { devPost } from '@/types/devcourse/devPost';
import dateGap from '@/utils/dateGap';
import { defineProp, computed } from 'vue';
import { useRouter } from 'vue-router';
// Props 정의
const props = defineProps<{
  card: devPost;
}>();
console.log('card', props.card);
const AVATAR_WIDTH = '40px';
const AVATART_HEIGHT = '40px';
const data = computed(() => JSON.parse(props.card.title));
const { fullName, _id: userId, image } = props.card.author; // 사용자 정보 가져오기
const userData = useFetchUser(userId);
const profileImgUrl =
  image === undefined ? '/PNG-Image/images/default-profile1.png' : image;
const router = useRouter();
const handleClick = () => {
  router.push(`/community/missing/${props.card._id}`);
};
</script>
<template>
  <div
    class="border border-gray-7 card-wrapper"
    :style="{ width: '100%', borderRadius: '10px' }"
    @click="handleClick"
  >
    <!-- 이미지 영역 -->
    <div class="position-relative z-0 filter">
      <div class="overflow-hidden" style="max-height: 442px;">
        <img
          :src="card.image"
          alt="강아지"
          width="100%"
          class="card-image"
          :style="{ filter: 'brightness(0.7)', borderRadius: '10px 10px 0px 0px' }"
        />
      </div>
      <div
        class="position-absolute bg-white text-center"
        :style="{
          width: '70px',
          height: '30px',
          fontSize: '1.25rem',
          top: '20px',
          marginLeft: '20px',
          borderRadius: '40px',
          boxShadow: '2px 4px 0px #333333',
          fontFamily: 'Paperlogy-7Bold',
          fontWeight: '400',
        }"
      >
        {{ dateGap(data.date) }}
      </div>
      <div
        class="z-1 text-white position-absolute d-flex flex-column"
        :style="{ bottom: '20px', marginLeft: '20px' }"
      >
        <span class="" :style="{ fontSize: '36px', fontWeight: '700' }">{{
          data.placeFeature
        }}</span>
      </div>
    </div>
    <!-- 텍스트 영역 -->
    <div class="d-flex flex-column mt-3 ms-3 gap-3">
      <!-- 프로필 영역 -->
      <div class="d-flex flex-row align-items-center gap-3">
        <div
          class="overflow-hidden"
          :style="{ width: AVATAR_WIDTH, height: AVATART_HEIGHT, borderRadius: '40px' }"
        >
          <img
            :src="profileImgUrl"
            alt="프로필 사진"
            :width="AVATAR_WIDTH"
            :height="AVATART_HEIGHT"
          />
        </div>
        <span class="text-gray-7 fw-medium" :style="{ fontSize: '24px', fontWeight: '500' }">{{
          fullName
        }}</span>
      </div>
      <div class="fw-bold" :style="{ fontSize: '20px' }">
        {{ data.region }} / {{ data.age }}/ {{ data.species }}
      </div>
      <div class="text-gray-7" :style="{ fontSize: '16px' }">
        {{ data.feature }}
      </div>
      <!-- Chip 영역 -->
      <div class="d-flex flex-lg-row flex-column flex-wrap gap-3 pb-3">
        <div
          class="bg-gray-3 d-flex flex-row align-items-center justify-content-center gap-2 text-primary-blue"
          :style="{ width: '73px', height: '30px', borderRadius: '30px', fontSize: '16px' }"
        >
          <i class="bi bi-pencil" :style="{ fontSize: '20px' }"></i>
          <span>{{ card.comments.length }}</span>
        </div>
        <div
          class="bg-gray-3 d-flex flex-row align-items-center justify-content-center gap-3 text-primary-blue"
          :style="{ width: '180px', height: '30px', borderRadius: '30px', fontSize: '16px' }"
        >
          <i class="bi bi-calendar-check" :style="{ fontSize: '20px' }"></i>
          <span>{{ data.date }}</span>
        </div>
        <div
          class="bg-gray-3 d-flex flex-row align-items-center justify-content-center gap-3 text-primary-blue"
          :style="{ width: '192px', height: '30px', borderRadius: '30px', fontSize: '16px' }"
        >
          <i class="bi bi-telephone-fill" :style="{ fontSize: '20px' }"></i>
          <span>{{ data.phone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  cursor: pointer;
  transition: transform 0.3s ease; /* 이미지 확대 효과 */
}
.card-image {
  overflow: hidden;
}
.card-wrapper:hover {
  transform: scale(1.01); /* hover 시 이미지를 10% 확대 */
}
</style>
