<script setup lang="ts">
import TextBlock, { type TextBlockDescriptor } from '@/components/common/TextBlock.vue'

interface GalleryItemProps {
  bgImage: string,
  title: TextBlockDescriptor[][],
  linkTo: string
}
const props = defineProps<GalleryItemProps>();
</script>

<template>
  <div class="grid-menu-item w-100 h-100 p-4 d-flex flex-column justify-content-between" :style="{ backgroundImage: `url(${props.bgImage})` }">
    <div>
      <div v-for="(line, index) in props.title" :key="index" class="d-flex" >
        <TextBlock v-for="(block, index2) in line" :key="index + '_' + index2" :text-block="block"/>
      </div>
    </div>

    <a :href="linkTo !== '#' ? ('//' + linkTo) : '#'" class="text-decoration-none align-self-end">
      <div class="rounded-5 d-flex align-items-center justify-content-around" style="cursor: pointer; height: 50px; width:150px; background-color: #FFFFFF80; backdrop-filter: blur(5px); ">
        <div class="d-flex gap-2 align-items-center" style="user-select: none;">
          <p class="p-0 m-0 text-gray-1 button-font">자세히</p>
          <i class="bi-arrow-right p-0 m-0 text-gray-1" style="font-size: 1.2rem;"></i>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.grid-menu-item {
  background-color: #00000060;
  background-size: cover;
  background-blend-mode: multiply;
  background-position-x: center;
  background-position-y: center;
}
.button-font {
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: bold;
}
</style>
