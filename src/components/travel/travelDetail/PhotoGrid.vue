<script setup lang="ts">
import { computed } from 'vue';

interface PhotoGridProps {
  firstimage: string | null;
  images: string[];
}

const { firstimage, images } = defineProps<PhotoGridProps>();

const subImages = computed<(string | null)[]>(() => {
  const result: (string | null)[] = [];
  for (let i = 0; i < 4; i++) {
    result.push(images[i] ? images[i] : null);
  }
  return result;
});
</script>

<template>
  <div class="container">
    <div class="row g-2">
      <!-- 메인 이미지 영역 -->
      <div class="col-6 mb-3 mb-md-0">
        <img
          v-if="firstimage"
          :src="firstimage"
          class="main-image rounded-4"
          alt="Main lodging photo"
        />
        <div
          v-else
          class="placeholderMain bg-light d-flex align-items-center justify-content-center rounded-4"
        >
          <span class="text-muted">No Image</span>
        </div>
      </div>
      <!-- 서브 이미지(썸네일) 영역: 2x2 그리드 -->
      <div class="col-6">
        <div class="row g-2">
          <div v-for="(img, index) in subImages" :key="index" class="col-6">
            <img
              v-if="img"
              :src="img"
              class="img-fluid rounded-4 thumbnail"
              alt="Sub lodging photo"
            />
            <div
              v-else
              class="placeholder rounded-4 bg-light d-flex align-items-center justify-content-center thumbnail"
            >
              <span class="text-muted">No Image</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.thumbnail {
  width: 100%;
  height: 245px;
  object-fit: cover;
}

.placeholderMain {
  width: 100%;
  height: 500px;
  min-height: 200px;
  border: 1px dashed #ccc;
}
.placeholder {
  width: 100%;
  height: 245px;
  min-height: 200px;
  border: 1px dashed #ccc;
}
</style>
