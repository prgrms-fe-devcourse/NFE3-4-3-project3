<script setup lang="ts">
defineProps({
  area: String,
  prfnm: String,
  prfpdfrom: String,
  prfpdto: String,
  poster: String,
  fcltynm: String,
})
</script>

<template>
  <div class="prf-recommend-container">
    <img :src="poster" alt="포스터 그림" class="prf-recommend-img" />
    <div class="prf-recommend-dsc">
      <div class="prf-recommend-title">{{ prfnm }}</div>
      <div class="prf-recommend-time">
        <div class="">{{ prfpdfrom }} ~</div>
        <div class="">{{ prfpdto }}</div>
      </div>
      <div class="prf-recommend-sub area">{{ area }}</div>
      <div class="prf-recommend-sub">{{ fcltynm }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prf-recommend-container {
  width: 50%;
  display: flex;
  margin-bottom: 80px;
}
.prf-recommend-img {
  width: 230px;
  height: 303px;
}

.prf-recommend-dsc {
  margin-left: 30px;
}

.prf-recommend-title {
  font-size: 20px;
  margin-bottom: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  margin-top: 40px;
  font-weight: 700;
}

.prf-recommend-time {
  font-size: 16px;
  color: #606060;
  margin-bottom: 20px;
  font-weight: 600;
}

.prf-recommend-sub {
  font-size: 14px;
  color: #adadad;
  font-weight: 600;
  width: 200px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 두 줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* ... 생략 표시 */
}

.prf-recommend-sub.area {
  margin-bottom: 5px;
  font-size: 16px;
}

.prf-recommend-container:nth-child(7),
.prf-recommend-container:nth-child(8) {
  margin-bottom: 0;
}
</style>
