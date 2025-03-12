<script setup lang="ts">
import CommunityMainFindCard, { type MissingCommunityPost } from '@/components/community/CommunityMainFindCard.vue';
import { ref, onMounted } from 'vue';
import { getChannelPosts } from '@/apis/devcourse/Post/getChannelPosts';
import { MissingChannelId } from '@/constants/communityConsts';
import { type devPost } from '@/types/devcourse/devPost';

const cards = ref<MissingCommunityPost[]>([]);
const data = ref<devPost[]>([]);
onMounted(async ()=>{
  const posts = (await getChannelPosts({channelId: MissingChannelId})).posts;
  if(posts.length <= 0) return;
  data.value = posts.slice(0, 8);
  cards.value = data.value.map<MissingCommunityPost>((e)=>{
    const parsedData = JSON.parse(e.title);
    return {
      imageURL: e.image ?? '',
      age: parsedData.age,
      areaLocation: parsedData.region,
      breed: parsedData.species,
      feature: parsedData.feature,
      lostLocation: parsedData.placeFeature,
      id: e._id
    }
  });
});
</script>

<template>
  <div class="freePostSection">
    <div
      class="d-flex flex-row align-content-center justify-content-between post"
      :style="{ width: 100, marginBottom: '34px' }"
    >
      <div class="title">🚨 반려동물을 찾아주세요</div>
      <router-link to="/community/missing" style="text-decoration: none">
        <div class="postNavigation d-flex flex-row justify-content-center align-items-center gap-2">
          <span style="font-weight: 600">실종공고 게시판 </span>
          <span class="text-primary-blue" style="font-weight: 700">더보기</span>
        </div>
      </router-link>
      </div>
    <div class="d-flex flex-wrap gap-2 justify-content-between">
      <div class="freePostCard" v-for="(item, index) in cards" :key="index">
        <CommunityMainFindCard :item="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 36px;
  font-weight: 700;
  color: var(--gray-10);
}

/* 실종 게시판 */
.freePostSection {
  width: 100%;
  margin: 83px 0;
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
