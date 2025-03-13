<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/common/FooterSection.vue'
import HeaderSection from './components/common/HeaderSection.vue';
</script>

<template>
  <div class="body-layout">
    <div class="header-wrapper">
      <HeaderSection />
    </div>
    <div class="content-wrapper">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  border-bottom: #eaeaea solid 1px;
  width: 100%;
}

.body-layout {
  width: 100%;
}

.content-wrapper {
  max-width: 1246px;
  display: grid;
  margin: 0 auto;
}
</style>
