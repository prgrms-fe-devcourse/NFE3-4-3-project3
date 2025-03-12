<script setup lang="ts">
import { defineProps } from 'vue';
interface Card {
  id: number;
  title: string;
  subTitle: string;
  imgURL: string;
  alt: string;
  navigatePath: string;
}

defineProps<{ item: Card }>();
</script>

<template>
  <router-link :to="item.navigatePath" class="card-wrapper">
    <div class="card-text">
      <span class="title"> {{ item.title }}</span>
      <span class="sub"> {{ item.subTitle }} </span>
    </div>
    <img :src="item.imgURL" :alt="item.alt" />
  </router-link>
</template>

<style scoped>
.card-wrapper {
  width: 630px;
  height: 300px;
  background-color: var(--gray-3);
  border-radius: 40px;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
}

.card-wrapper img {
  width: 235px;
  height: 235px;
  object-fit: contain;
}

.card-text {
  width: 190px;
  display: flex;
  flex-direction: column;
  font-family: 'Paperlogy';
  color: var(--gray-10);
}

.card-text span:first-child {
  text-align: start;
  width: 150px;
  font-size: 40px;
  font-weight: 800;
}

.card-text span:last-child {
  font-size: 24px;
  font-weight: 700;
}
</style>
