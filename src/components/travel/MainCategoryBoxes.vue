<script setup lang="ts">
import { useRouter } from 'vue-router';

export interface Category {
  img: string;
  content: string;
  path: string;
}

const router = useRouter();

const props = defineProps<{
  categories: Category[];
}>();

function handleCategoryClick(category: Category) {
  router.push(category.path);
}
</script>

<template>
  <div class="d-flex gap-4 justify-content-center mt-4">
    <div
      v-for="(item, idx) in props.categories"
      :key="idx"
      class="position-relative card-img-top"
      @click="() => handleCategoryClick(item)"
    >
      <img
        :src="item.img"
        alt=""
        class="box-card-img rounded-4 img-fluid"
        style="width: 300px; height: 300px; filter: brightness(85%)"
      />
      <div
        class="box-card-text position-absolute bottom-0 start-0 p-2 text-gray-1 mb-2 ms-2"
        style="font-family: 'Paperlogy'; font-weight: 700; font-size: 36px"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
