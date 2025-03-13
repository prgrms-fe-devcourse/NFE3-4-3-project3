<script setup lang="ts">
import MainSearch from './MainSearch.vue'
</script>

<template>
  <!-- "@/assets/logo.svg -->
  <div class="heroImage">
    <img src="/public/images/heroimage.svg" alt="히어로이미지" />
    <MainSearch />
  </div>
</template>

<style lang="scss" scoped>
.heroImage {
  position: relative;
  margin-top: 50px;
}

.heroImage img {
  width: 100%;
}

::v-deep .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
  border: none;
  height: 28px;
  font-size: 16px;
}

::v-deep
  .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(
    .ant-pagination-size-changer
  )
  .ant-select-selector {
  box-shadow: none;
  font-family: 'Pretendard', sans-serif;
}
</style>
