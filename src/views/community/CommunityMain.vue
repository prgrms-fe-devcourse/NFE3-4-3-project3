<script setup lang="ts">
import CommunityMainHero from '@/components/community/CommunityMainHero.vue';
import CommunityMainFreePost from '@/components/community/CommunityMainFreePost.vue';
import CommunityMainMissing from '@/components/community/CommunityMainMissing.vue';
</script>

<template>
  <div class="container" :style="{ minWidth: '1280px', width: '66%' }">
    <!-- 히어로 섹션 -->
    <CommunityMainHero />
    <!-- 자유 게시판 글 -->
    <CommunityMainFreePost />
    <!-- 실종 게시판 글 -->
    <CommunityMainMissing />
  </div>
</template>
