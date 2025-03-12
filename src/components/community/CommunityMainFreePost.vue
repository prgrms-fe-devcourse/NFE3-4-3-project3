<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FreeCommunityPostCard from '../common/FreeCommunityPostCard.vue';
import { getChannelPosts } from '@/apis/devcourse/Post/getChannelPosts';
import { FreeChannelId } from '@/constants/communityConsts';
import { type devPost } from '@/types/devcourse/devPost';

const data = ref<devPost[]>([]);
onMounted(async ()=>{
  const posts = (await getChannelPosts({channelId: FreeChannelId})).posts;
  console.log(posts);
  if(posts.length <= 0) return;
  data.value = posts.slice(0, 8);
});
</script>

<template>
  <!-- 자유 게시판 글 -->
  <div class="freePostSection">
    <div
      class="d-flex flex-row align-content-center justify-content-between post"
      :style="{ width: '100%', marginBottom: '34px' }"
    >
      <div class="title">💫 자유게시판</div>
      <router-link to="/community/free" style="text-decoration: none;">
        <div class="postNavigation d-flex flex-row justify-content-center align-items-center gap-2">
          <span style="font-weight: 600">자유게시판</span>
          <span class="text-primary-blue" style="font-weight: 700">더보기</span>
        </div>
      </router-link>
    </div>
    <div class="d-flex flex-wrap gap-2">
      <div class="freePostCard" v-for="(item, index) in data" :key="index">
        <FreeCommunityPostCard :data="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 자유게시판 */

.title {
  font-size: 36px;
  font-weight: 700;
  color: var(--gray-10);
}

.freePostSection {
  width: 100%;
  margin-top: 83px;
}

.postNavigation {
  width: 250px;
  height: 65px;
  border: 1px solid var(--gray-3);
  border-radius: 100px;
  font-size: 20px;
  color: var(--gray-10);
  box-shadow: 2px 6px 6px #f3f3f3;
}

.freePostCard {
  width: 305px;
}
</style>
