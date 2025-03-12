<script setup lang="ts">
import CampaignSection from '@/components/adoption/shelter/CampaignSection.vue';
import ShelterSearchSection from '@/components/adoption/shelter/ShelterSearchSection.vue';
import { useFetchShelters } from '@/composibles/tanstack-query/useFetchShelters';

// const { shelterDetails, isLoadingShelterDetails } = useFetchShelters('6110000', '3220000');
// console.log('loding?', isLoadingShelterDetails.value);
</script>

<template>
  <!-- <div v-if="!isLoadingShelterDetails">
    {{ shelterDetails }}
  </div> -->

  <div>
    <!-- 사이드바 / 지도 컨텐츠 -->
    <ShelterSearchSection />
    <!-- 하단 배너 -->
    <CampaignSection />
  </div>
</template>

<style scoped></style>
