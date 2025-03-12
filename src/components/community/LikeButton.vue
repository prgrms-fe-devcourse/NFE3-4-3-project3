<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

import { type devLike } from '@/types/devcourse/devLike';
import { type CreateLikeRequest, createLike } from '@/apis/devcourse/Like/createLike';
import { type DeleteLikeRequest, deleteLike } from '@/apis/devcourse/Like/deleteLike';

interface LikeProps {
  postId: string;
  likes: devLike[];
}
const props = defineProps<LikeProps>();
const authStore = useAuthStore();
const router = useRouter();
//초기 좋아요 여부 계산
const initialLiked = computed(() => {
  return props.likes.some((like) => like.user === authStore.user?._id);
});

// 부모에서 받은 좋아요 갯수를 기반으로 로컬 상태 설정
const likeCount = ref(props.likes.length);
const liked = ref(initialLiked.value);

const toggleLike = async () => {
  if (!authStore.user) {
    alert('로그인을 해주세요.');
    router.push({ name: 'login' });
    return;
  }

  if (liked.value) {
    // 좋아요 취소: 좋아요 수 -1, liked false
    likeCount.value--;
    liked.value = false;
    //likeId 찾는 함수 (likeDelete API는 좋아요 요청 시 생기는 좋아요Id를 인자로 받음)
    const userLike = props.likes.find((like) => like.user === authStore.user?._id);
    if (userLike) {
      const request: DeleteLikeRequest = {
        id: userLike._id,
      };
      try {
        await deleteLike(request);
      } catch (error) {
        console.error('좋아요 취소 실패:', error);
        // 실패 시 원래 상태로 복원하는 로직을 추가할 수 있음
      }
    }
  } else {
    // 좋아요 추가: 좋아요 수 +1, liked true
    likeCount.value++;
    liked.value = true;
    const request: CreateLikeRequest = {
      postId: props.postId,
    };
    try {
      await createLike(request);
    } catch (error) {
      console.error('좋아요 실패:', error);
      // 실패 시 원래 상태로 복원하는 로직을 추가할 수 있음
    }
  }
};
</script>

<template>
  <i
    class="bi"
    :class="liked ? 'bi-heart-fill' : 'bi-heart'"
    :style="{ color: liked ? '#dc3644' : '#000000' }"
    @click.stop="toggleLike"
  ></i>
  <span>{{ likeCount }}</span>
</template>

<style lang="scss" scoped></style>
