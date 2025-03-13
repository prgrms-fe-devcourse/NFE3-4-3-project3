<script setup lang="ts">
import router from '@/router'

defineProps({
  title: String,
  authors: String,
  bookimage: String,
  isbn13: String,
})
</script>

<template>
  <div @click="() => router.push({ name: 'book-detail', params: { id : isbn13 } })" class="bookItem">
    <img :src="bookimage" alt="책사진" class="bookItem-img" />
    <!-- <div style="width: 195px; height: 260px; background: gray; border-radius: 12px"></div> -->
    <div class="bookItem-title">{{ title }}</div>
    <div class="bookItem-subtitle">{{ authors }}</div>
  </div>
</template>

<style lang="scss" scoped>
.bookItem {
  margin-right: 10px;
  cursor: pointer;
}

.bookItem:last-child {
  margin-right: 0px;
}

.bookItem-img {
  width: 145px;
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.5);
  transition: transform 0.5s;
}

.bookItem-img:hover {
  transform: translateY(-10px);
}
.bookItem-title {
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  margin-top: 27px;
  width: 145px;
}

.bookItem-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: $text-color-400;
  margin-top: 10px;
  width: 145px;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}
</style>
