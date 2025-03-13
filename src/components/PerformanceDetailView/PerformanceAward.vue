<script setup lang="ts">
defineProps({
  prfnm: String,
  fcltynm: String,
  awards: String,
  poster: String,
})
</script>

<template>
  <div class="">
    <!-- <div class="prf-work"></div> -->
    <img :src="poster" alt="포스터" class="prf-work" />
    <div class="prf-work-title">{{ prfnm }}</div>
    <div class="prf-work-subtitle">{{ fcltynm }}</div>
    <div class="prf-work-subtitle">{{ awards }}</div>
  </div>
</template>

<style lang="scss" scoped>
.prf-related-container {
  margin-top: 40px;
}

.prf-related-card {
  width: 100%;
  padding: 45px;
  box-sizing: border-box;
  border-radius: 8px;
  background: $text-color-100;
  border: 1px solid $text-color-100;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.prf-work {
  width: 188px;
  height: 288px;
}

.prf-work-title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 18px;
}

.prf-work-subtitle {
  color: $text-color-400;
  font-size: 14px;
  font-weight: 600;
  width: 188px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
