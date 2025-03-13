<script setup lang="ts">
import { fetchPosts } from '@/apis/community/post'
import CommunityWriteForm from '@/components/CommunityWriteView/CommunityWriteForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 게시글 작성 후 커뮤니티 메인페이지로 이동
const handlePostCreated = async () => {
  await fetchPosts() // 게시글 목록 새로 불러오기
  router.replace({ path: '/community' })
}
</script>

<template>
  <div class="post-page">
    <section class="background">
      <img src="/images/community-write-background.png" alt="배경이미지" />
    </section>
    <div class="form-container">
      <CommunityWriteForm @postCreated="handlePostCreated" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150vh;
}

.background {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100vw;
  height: 338px;
  overflow: hidden;
  transform: translateX(-50%);
}

.background img {
  width: 100vw;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.form-container {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;

  padding: 30px;
}
</style>
