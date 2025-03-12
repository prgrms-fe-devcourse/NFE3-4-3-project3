<script setup lang="ts">
import { ref, computed } from 'vue';

const image = defineModel<File | null>();
const initialImagePreview = computed(() => {
  if (image.value) {
    return image.value;
  } else {
    return '';
  }
});
const imagePreviews = ref<string | null>(initialImagePreview.value); // 이미지 미리보기 배열
// 이미지 삭제
const removeImage = () => {
  image.value = null;
  imagePreviews.value = null;
  console.log('image 삭제', image.value);
};
const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  image.value = null;
  if (input?.files) {
    const file = input.files[0];
    console.log('file', file);
    // 미리보기 배열 업데이트
    imagePreviews.value = URL.createObjectURL(file);
    console.log('image preview', imagePreviews.value);
    image.value = file;
    console.log('새로 업데이트된 이미지', image.value);
  }
};
</script>

<template></template>
