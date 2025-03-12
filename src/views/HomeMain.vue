<script setup lang="ts">
import MainHero from '@/components/homeMain/MainHero.vue';
import PopularTravelSwiperComponent from '@/components/homeMain/PopularTravelSwiperComponent.vue';
import PlannerBanner from '@/components/homeMain/PlannerBanner.vue';
import AbandonedBanner from '@/components/homeMain/AbandonedBanner.vue';
import GridMenu from '@/components/homeMain/GridMenu.vue';
import { ref, onMounted } from 'vue';
import { type PopularTravelData } from '@/components/homeMain/atoms/PopularTravelCard.vue';
import { detailCommon } from '@/apis/tour/detailCommon';

const popularIds = [
  ['39', '2603467'],
  ['12', '2564158'],
  ['14', '127951'],
  ['28', '2606232'],
  ['38', '1238580'],
];
const popularTravelData = ref<PopularTravelData[]>([]);
onMounted(async ()=>{
  try{
    const promises = popularIds.map((e)=>detailCommon({contentId: (e[1]), contentTypeId: (e[0])}));
    const responses = (await Promise.allSettled(promises)).filter((e)=>e.status==='fulfilled');
    popularTravelData.value = responses.map<PopularTravelData>((e, index)=>{
      const item = e.value[0];
      return {
        title: item.title,
        content: item.overview,
        image: item.firstimage,
        location: item.addr1,
        contentId: popularIds[index][1],
        contentTypeId: popularIds[index][0]
      }
    });
  }
  catch(e){
    console.log(e);
  }
});
</script>

<template>
  <MainHero />
  <PopularTravelSwiperComponent :data="popularTravelData" />
  <PlannerBanner />
  <AbandonedBanner />
  <GridMenu />
</template>
