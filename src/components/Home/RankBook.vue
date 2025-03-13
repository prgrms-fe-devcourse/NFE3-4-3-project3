<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  bookname: String,
  ranking: String,
  authors: String,
  bookImageURL: String,
  isbn13: String,
})
</script>

<template>
  <RouterLink :to="`/book/detail/${isbn13}`">
    <div class="rankbookItem">
      <div class="rankbook"></div>
      <img :src="bookImageURL" alt="책사진" class="rankbook-img" />
      <div class="rankbook-text">
        <div class="title">{{ bookname }}</div>
        <div class="subtitle">{{ authors }}</div>
      </div>
      <div class="rank-num">{{ ranking }}</div>
      <div class="rank-shadow">{{ ranking }}</div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.rankbookItem {
  display: flex;
  position: relative;
  margin-bottom: 14px;
  align-items: center;
  width: 305px;
}

.rankbook-img {
  width: 72px;
  height: 101px;
  border-radius: 0 4px 4px 0;
}

.rankbook-text {
  margin-left: 17px;
}

.rankbook-text .title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 180px;
}

.rankbook-text .subtitle {
  font-size: 14px;
  color: $text-color-200;
  font-weight: 200;
}

.rank-num {
  font-size: 63px;
  font-weight: 700;
  position: absolute;
  bottom: -2px;
  left: -17px;
  color: white;
  z-index: 9;
}

.rank-shadow {
  font-size: 60px;
  font-weight: 700;
  position: absolute;
  bottom: 0;
  left: -20px;
  color: #c9c9c9;
}
</style>
