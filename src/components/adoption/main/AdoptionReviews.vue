<script setup lang="ts">
import { getAllSearchQuery } from '@/apis/devcourse/Search/getAllSearchQuery';
import FreeCommunityPostCard from '@/components/common/FreeCommunityPostCard.vue';
import { devPost } from '@/types/devcourse/devPost';
import { ref, onMounted } from 'vue';

const CardListData = ref<devPost[]>();
onMounted(async ()=>{
  const posts = (await getAllSearchQuery({searchQuery: '입양후기'})).resultsPosts;
  if(posts.length <= 0) return;
  CardListData.value = posts;
});
</script>

<template>
  <div>
    <div class="mb-4">
      <span class="title">입양후기</span>
      <span class="sub-title"># 새로운 삶을 시작한 반려동물들의 이야기를 들려주세요</span>
    </div>
    <div class="cardlist-wrapper" style="overflow-x: scroll; overflow-y: hidden;">
      <FreeCommunityPostCard v-for="(item, index) of CardListData" :key="index" :data="item" />
    </div>
  </div>
</template>

<style scoped>
.title {
  color: var(--gray-10);
  font-size: 36px;
  font-weight: 700;
  margin-right: 70px;
}

.sub-title {
  color: var(--gray-7);
  font-size: 24px;
}

.cardlist-wrapper {
  display: flex;
  gap: 20px;
  overflow: scroll;
  width: 100%;
}
</style>
