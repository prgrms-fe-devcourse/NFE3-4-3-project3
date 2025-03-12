<script setup lang="ts">
import MOCK_TRAVEL_REVIEW from '@/constants/mock/travelReview';
</script>

<template>
  <div class="card">
    <img :src="MOCK_TRAVEL_REVIEW.imageURL" alt="travel review image" class="card-img-top" />
    <div class="card-body">
      <p class="card-text">{{ MOCK_TRAVEL_REVIEW.content.slice(0, 20) }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 303px;
}

.card-img-top {
  height: 260px;
  object-fit: cover;
}

.card-text {
  font-size: 16px;
  color: var(--gray-10);
}
</style>
