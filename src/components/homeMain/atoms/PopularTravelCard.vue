<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PATH from '@/constants/path';

export interface PopularTravelData {
  image: string;
  location: string;
  title: string;
  content: string;
  contentTypeId : string;
  contentId: string;
}
interface PopularTravelCardProps {
  data: PopularTravelData;
}
const props = defineProps<PopularTravelCardProps>();
</script>

<template>
  <RouterLink :to="`/travel/detail/${props.data.contentId}?contenttypeid=${props.data.contentTypeId}`" class="text-decoration-none">
      <div
        class="rounded-top-5 align-content-end"
        style="height: 70%;"
        :style="{
          backgroundColor : '#00000060',
          backgroundImage : `url(${props.data.image})`,
          backgroundBlendMode : 'multiply',
          backgroundPositionX : 'center',
          backgroundSize : 'cover',
        }">
        <p class="px-4 my-3 overflow-hidden location-text text-gray-1">{{ props.data.location }}</p>
      </div>
      <div class="pb-4 bg-gray-3 w-100 rounded-bottom-5">
        <p class="px-4 my-1 overflow-hidden title-text">{{ props.data.title }}</p>
        <p class="px-4 my-1 overflow-hidden content-text">{{ props.data.content }}</p>
      </div>
  </RouterLink>
</template>

<style scoped>
.location-text {
  font-family: 'Paperlogy';
  font-weight: 700;
  font-size: 20px;
}
.title-text {
  font-family: 'Paperlogy';
  font-weight: 700;
  font-size: 36px;
  color: #78563E;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-text {
  font-family: 'Paperlogy';
  font-weight: 700;
  font-size: 20px;
  color: #BC8661;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
