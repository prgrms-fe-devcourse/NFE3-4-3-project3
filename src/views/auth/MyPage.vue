<script setup lang="ts">
import HeroSection from '@/components/myPage/HeroSection.vue';
import MyPlan from '@/components/myPage/MyPlan.vue';
import MyPost from '@/components/myPage/MyPost.vue';
</script>

<template>
  <div class="myPageSection" :style="{ paddingTop: '97px', paddingBottom: '97px' }">
    <div class="container" :style="{ minWidth: '1280px', width: '66%' }">
      <HeroSection style="" />
      <div class="contentSection d-flex flex-row gap-4 mb-5" :style="{ marginTop: '20px' }">
        <MyPlan />
        <MyPost />
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

.currentContentText {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-10);
}
.myContentText {
  font-size: 20px;
  font-weight: 400;
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
/* 하단 내용 섹션 */
.myPageSection {
  background-color: var(--gray-2);
}
/* 나의 게시글 섹션 */
.myPost {
  width: 65%;
  height: 1089px;
  border-radius: 10px;
  box-shadow: 2px 6px 10px var(--gray-3);
  background-color: var(--gray-1);
}

/* 여행 리스트 컨테이너 여역 */
.myPostListSection {
  width: 85%;
  height: 90%;
}

/* 나의 여행 제목 섹션 */
.myPostTitleSection {
  height: 85px;
  border-bottom: 1px solid var(--gray-6);
}

/* 리스트 카드 이미지 영역 */
.postCardImg {
  width: 80px;
  height: 80px;
}
</style>
