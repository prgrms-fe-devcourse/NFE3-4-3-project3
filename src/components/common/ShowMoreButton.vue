<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router';
defineProps<{
  text: string;
  linkTo: RouteLocationRaw;
}>();
</script>

<template>
  <RouterLink :to="linkTo">
    <span>{{ text }}</span> <em>더보기</em>
  </RouterLink>
</template>
<style scoped>
a {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 40px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: var(--gray-1);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

span {
  color: var(--gray-10);
}

em {
  font-style: normal;
  color: var(--primary-blue);
  font-weight: 700;
}
</style>
