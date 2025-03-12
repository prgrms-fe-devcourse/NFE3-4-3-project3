<script setup lang="ts">
import { defineProps } from 'vue';
import AdoptionAnimalCard from '@/components/adoption/AdoptionAnimalCard.vue';
import type { Animal } from '@/types/animal';

const props = defineProps<{
  animals: Animal[];
}>();
</script>

<template>
  <div class="container my-5 px-4" :style="{ marginTop: '100px !important' }">
    <h5 class="text-start mb-2" style="font-weight: 700; color: #003459">
      다른 입양 대기 중인 동물들도 여러분을 기다리고 있어요<br />
    </h5>
    <h4 class="text-start text-gray-7 mb-4">입양 가능한 친구들을 만나보세요 🐾</h4>
    <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
      <div class="col" v-for="card in animals" :key="card.desertionNo">
        <router-link
          :to="{ name: 'adoptionDetail', params: { animalId: card.desertionNo } }"
          style="text-decoration: none; color: inherit"
        >
          <AdoptionAnimalCard :animal="card" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
