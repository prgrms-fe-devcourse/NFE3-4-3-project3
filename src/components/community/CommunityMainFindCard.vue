<script setup lang="ts">
import { defineProps } from 'vue';
export interface MissingCommunityPost {
  imageURL: string;
  lostLocation: string;
  areaLocation: string;
  breed: string;
  age: string;
  feature: string;
  id: string;
}

const props = defineProps<{
  item: MissingCommunityPost;
}>();
</script>

<template>
  <RouterLink :to="`/community/missing/${props.item.id}`" class="text-decoration-none">
    <div class="card">
      <div class="card-img-top overflow-hidden d-flex position-relative">
        <img :src="item.imageURL" alt="card animal image" style="height:100%; width:auto;"/>
        <div class="titleSection position-absolute bottom-0 left-0 p-2">
          <span class="title">#{{ props.item.breed }} 찾습니다</span>
          <div>{{ item.lostLocation }}</div>
        </div>
      </div>
      <div class="card-body">
        <h4 v-if="item.lostLocation" class="card-title">
          {{ item.areaLocation }} / {{ item.age }} / {{ item.breed }}
        </h4>
        <p class="card-text">{{ item.feature }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  min-width: 300px;
}

.card-img-top {
  height: 300px;
}

.card-title {
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden;
}

.card-text {
  font-size: 16px;
  color: var(--gray-7);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden;
}

.titleSection {
  font-size: 26px;
  font-weight: 700;
  color: var(--gray-1);
}

.title {
  background-color: var(--primary-red);
}
</style>
