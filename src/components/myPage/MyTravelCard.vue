<script setup lang="ts">
import { type devPost } from '@/types/devcourse/devChannel';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { MissingChannelId } from '@/constants/communityConsts';

const auth = useAuthStore();
const { data } = defineProps<{ data: devPost }>();



const commentCount = computed(() => data.comments?.length || 0);
const likesCount = computed(() => data.likes?.length || 0);
const parsedTitle = computed(() => {
  try {
    return JSON.parse(data.title);
  } catch (error) {
    console.error('JSON parse error:', error);
    return {};
  }
});
</script>

<template>
  <!-- 카드 리스트 섹션 -->
  <div class="cardSection d-flex flex-column gap-4">
    <!-- 작성자 및 더보기 아이콘 컨테이너 -->
    <div class="d-flex flex-row align-items-center justify-content-between">
      <div class="d-flex flex-row align-items-center gap-3">
        <!-- 이미지 -->
        <div class="overflow-hidden" style="border-radius: 85px">
          <img :src="auth.user?.image" alt="" class="postCardImg" />
        </div>
        <!-- 내 정보 텍스 -->
        <div class="d-flex flex-column gap-2">
          <span class="postCardText">{{ auth.user?.fullName }}</span>
          <span class="dateText">{{ data.createdAt.slice(0, 10) }}</span>
        </div>
      </div>
      <i class="bi bi-three-dots" :style="{ fontSize: '30px' }"></i>
    </div>

    <div v-if="data.channel._id === MissingChannelId" class="missingInfo">
      <!-- 실종 게시글 전용 필드 -->
      <!-- 메인 이미지 -->
      <div class="mainImg overflow-hidden">
        <img :src="data.image" alt="" class="card-img-top" />
      </div>
      <p class="contentText">{{ parsedTitle.title }}</p>
      <p><span class="fw-bold">반려동물 종</span>: {{ parsedTitle.species }}</p>
      <p><span class="fw-bold">실종 장소 특징</span>: {{ parsedTitle.placeFeature }}</p>
      <p><span class="fw-bold">관할지</span>: {{ parsedTitle.region }}</p>
      <!-- 필요한 다른 필드도 추가 가능 (예: date, RFID 등) -->
      <div class="d-flex flex-row align-items-center gap-2">
        <i class="bi bi-chat-left commentIcon"></i>
        <span class="commentText"> {{ commentCount || '0' }}</span>
      </div>
    </div>

    <!--소개글 -->
    <div v-else>
      <!-- 메인 이미지 -->
      <div class="mainImg overflow-hidden">
        <img :src="data.image" alt="" class="card-img-top" />
      </div>
      <div class="contentText">{{ JSON.parse(data.title).title }}</div>
      <!-- 좋아요, 댓글 -->
      <div class="d-flex flex-row align-items-center gap-4">
        <div class="d-flex flex-row align-items-center gap-2">
          <i class="bi bi-suit-heart commentIcon"></i>
          <span class="commentText">{{ likesCount || '0' }}</span>
        </div>
        <div class="d-flex flex-row align-items-center gap-2">
          <i class="bi bi-chat-left commentIcon"></i>
          <span class="commentText"> {{ commentCount || '0' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 텍스트 */
.title {
  font-size: 30px;
  font-weight: 700;
  color: var(--gray-10);
}

.postCardText {
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-10);
}
.dateText {
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-7);
}
.contentText {
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-10);
}

.commentIcon {
  font-size: 25px;
  color: var(--primary-red);
}
.commentText {
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-7);
}

/* 카드 컴포넌트 섹션 */
.cardSection {
  padding: 30px 0;
  height: 500px;
}

/* 여행 리스트 컨테이너 여역 */
.myPostListSection {
  width: 80%;
  height: 95%;
}
.card-img-top {
  height: 300px;
  object-fit: cover;
}

/* 리스트 카드 이미지 영역 */
.postCardImg {
  width: 70px;
  height: 70px;
  object-fit: cover;
}

.mainImg {
  width: 100%;
  height: 256px;
  border-radius: 10px;
}
</style>
