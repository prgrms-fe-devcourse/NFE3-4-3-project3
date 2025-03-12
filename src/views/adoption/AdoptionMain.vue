<script setup lang="ts">
import AdoptionHero from '@/components/adoption/main/AdoptionHero.vue';
import AdoptionGraph from '@/components/adoption/main/AdoptionGraph.vue';
import AdoptionCategory from '@/components/adoption/main/AdoptionCategory.vue';
import AdoptionMap from '@/components/adoption/main/AdoptionMap.vue';
import AdoptionReviews from '@/components/adoption/main/AdoptionReviews.vue';
import AdoptionCardBanner from '@/components/adoption/main/AdoptionCardBanner.vue';
</script>

<template>
  <div class="main-wrapper">
    <AppHeader />
    <AdoptionHero />
    <div class="fitted-contents">
      <AdoptionGraph />
    </div>
    <AdoptionCategory />
    <div class="fitted-contents">
      <AdoptionMap />
      <AdoptionReviews />
      <AdoptionCardBanner />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.main-wrapper {
  width: 100%;
  overflow-x: hidden; /* 가로 스크롤 숨김 */
}

.fitted-contents {
  width: 1280px;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: auto;
}
</style>
