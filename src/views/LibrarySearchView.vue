<script setup lang="ts">
import LibrarySearchHeroImage from '@/components/LibrarySearchView/LibrarySearchHeroImage.vue'
import LibrarySearchResult from '@/components/LibrarySearchView/LibrarySearchResult.vue'
import { provide, ref } from 'vue'
import MapFilter from '@/components/LibrarySearchView/MapFilter.vue'
const regionCode = ref(11);

const updateRegion = (code : number) => {
  if (regionCode.value === code) {
    return
  }
  regionCode.value = code
}

provide('region',{
  regionCode,
  updateRegion
})
</script>

<template>
  <LibrarySearchHeroImage/>
  <div class="library-content-wrapper">
    <MapFilter/>
    <LibrarySearchResult/>
  </div>
</template>

<style scoped lang="scss">
.library-content-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
</style>
