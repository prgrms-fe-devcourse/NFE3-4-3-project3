<script setup lang="ts">
import { useRouter } from 'vue-router';
import PATH from '@/constants/path';

const animalCategory = [
  {
    name: '개',
    imageURL: '/PNG-Image/images/dog.png',
    imageALT: 'dog image',
    category: 'dog',
  },
  {
    name: '고양이',
    imageURL: '/PNG-Image/images/category-cat.png',
    imageALT: 'cat image',
    category: 'cat',
  },
  {
    name: '기타 동물',
    imageURL: '/PNG-Image/images/animalEtc.png',
    imageALT: 'etc animal image',
    category: 'etc',
  },
];

const router = useRouter();
const handleCategoryClick = (category: string) => {
  router.push({ path: PATH.adoptionSearch, query: { category } });
};
</script>

<template>
  <div class="category-background">
    <div class="category-wrapper">
      <div class="category-title">
        <span class="title-main">사랑이 시작되는 곳,</span><br />
        <span class="title-highlight">새로운 가족을 만나보세요!</span>
      </div>
      <div class="category-button-wrapper">
        <button
          class="category-button"
          v-for="item in animalCategory"
          :key="item.name"
          @click="handleCategoryClick(item.category)"
        >
          <img
            :src="item.imageURL"
            :alt="item.imageALT"
            :style="{ width: '330px', height: '330px' }"
          />
          <span>{{ item.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-background {
  background-color: var(--gray-2);
  padding: 40px 0;
  width: 100vw;
}

.category-wrapper {
  width: 1280px;
  min-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.category-title {
  font-family: 'Pretendard', sans-serif;
  margin-bottom: 36px;
  animation: fadeIn 1.5s ease-in-out 0.5s;
}


.title-main {
  font-size: 36px;
  font-weight: 700;
  color: var(--gray-10);
}

.title-highlight {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary-green);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-button-wrapper {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.category-button {
  border: none;
  background: none;
  border-radius: 50%;
  position: relative;
  width: 330px;
  height: 330px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}



.category-button span {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  z-index: 2;
  font-size: 32px;
  font-weight: 700;
  color: var(--gray-1);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, color 0.3s ease;
}

.category-button:hover span {
  transform: scale(1.05);
  color: var(--primary-green);
}
</style>
