<script setup lang="ts">
import { type devPost } from '@/types/devcourse/devPost';

interface FreeCommunityPost {
  data : devPost
}
const props = defineProps<FreeCommunityPost>();
</script>

<template>
  <RouterLink :to="`/community/free/${props.data._id}`" class="text-decoration-none">
    <div class="card">
      <div class="card-img-top overflow-hidden bg-gray-3 d-flex justify-content-center">
        <img v-if="props.data.image" :src="props.data.image" alt="card animal image" style="height:100%; width:auto;"/>
      </div>
      <div class="card-body">
        <h4 class="card-title">
          {{ JSON.parse(props.data.title).title }}
        </h4>
        <p class="card-text">{{ JSON.parse(props.data.title).content }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  width: 300px;
}

.card-img-top {
  height: 300px;
}

.card-title {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-text {
  font-size: 16px;
  color: var(--gray-7);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
