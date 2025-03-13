<template>
  <div class="like-container">
    <h3>좋아요 활동</h3>

    <div class="like-contents">
      <strong>{{ props.likedPosts.length }} Stars</strong>
      <span>{{ props.likedPosts.length }} 개의 글에 {{ props.likedPosts.length }}개 좋아요를 남겼어요!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserLikedPostsType } from '@/types/user';

const props = defineProps<{
  likedPosts: UserLikedPostsType[]
}>()

</script>

<style lang="scss" scoped>
.like-container {
  margin-bottom: 1rem;

  h3 {
    font-size: 14px;
    color: #222;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .like-contents {
    width: 100%;
    padding: 10px 13px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: .5rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      width: 64px;
      height: 100%;
      background-image: url("/images/stars-bg.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    strong {
      font-size: 14px;
      color: #222;
    }

    span {
      font-size: 14px;
      color: #222;
    }
  }
}
</style>
