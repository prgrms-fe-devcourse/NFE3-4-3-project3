<template>
  <div class="user-posts-container">
    <h3>작성한 게시글</h3>
    <div class="user-posts-contents">
      <div class="wrap">
        <div class="user-posts-content" v-for="post in parsedPosts" :key="post.id">
          <div class="posts-header">
            <strong>{{ post.title }}</strong>
            <span>{{ post.category }}</span>
          </div>
          <p>{{ post.content }}</p>
        </div>
        <NotFound v-if="parsedPosts.length === 0" title="작성한 게시글이 없습니다." />
      </div>
      <div class="user-posts-more" v-if="postCount > 4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15V9Z"
            stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 7V11" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/types/community/communityType';
import { usePostParser } from '@/utils/usePostParser';
import { computed } from 'vue';
import NotFound from '../common/NotFound.vue';

const props = defineProps<{
  postData: Post[]
}>()

const { parsedPosts } = usePostParser(props.postData)

const postCount = computed(() => {
  return parsedPosts.value.length
});
</script>

<style lang="scss" scoped>
.user-posts-container {
  h3 {
    font-size: 14px;
    color: #222;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .user-posts-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .wrap {
      width: 100%;
      height: 480px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;

      .user-posts-content {
        width: 100%;
        padding: 10px 13px;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);

        .posts-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;

          strong {
            color: #413B89;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 80%;
          }

          span {
            font-size: 14px;
          }
        }

        p {
          font-size: 14px;
          color: #49454F;
          line-height: 18px;
          letter-spacing: 0.1px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

      }
    }

    .user-posts-more {
      width: 26px;
      height: 26px;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

}
</style>
