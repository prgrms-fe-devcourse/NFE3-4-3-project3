<script setup lang="ts">
import { ref, onMounted, watch, useTemplateRef } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import usePlanner, { type TravelData } from '@/hooks/usePlanner';
import { useRouter } from 'vue-router';

const planner = usePlanner();
const myPlans = ref<TravelData[]>();
const router = useRouter();
const colorBox = useTemplateRef<HTMLElement[]>('colorBox');
const planCards = useTemplateRef<HTMLElement[]>('planCards');

onMounted(async ()=>{
  myPlans.value = await planner?.GetMyPlans();
});
watch(
  ()=>myPlans.value,
  ()=>{
    const formattedData = myPlans.value?.map((e)=>{
      const _date = new Date(e.createdAt);
      return {
        title: e.title,
        date: _date.getFullYear() + '.' + _date.getMonth() + '.' + _date.getDay(),
        id: e.id
      }
    });
    if(formattedData){
      travelPlans.value = formattedData;
    }
  }, { deep: true }
);
const travelPlans = ref<{title: string, date: string, id: string}[]>([]);
function HandleDeletePlan(id : string){
  const index = myPlans.value?.findIndex((e)=>e.id === id);
  if(index !== undefined && index !== -1) {
    if(colorBox.value){
      colorBox.value[index].classList.remove('color-box');
      colorBox.value[index].classList.add('color-box-expand');
      colorBox.value[index].addEventListener('transitionend', (e)=>{
        if(e.propertyName === 'width'){
          planCards.value?.[index].classList.add('slideOutLeft');
          planCards.value?.[index].addEventListener('transitionend', (e)=>{
            if(e.propertyName === 'transform'){
              myPlans.value?.splice(index, 1);
              planner?.DeletePlan(id);
            }
          });
        }
      });
    }
  }
}
</script>

<template>
  <div class="myTravelSection">
    <div class="myContentText myTravelTitleSection position-relative">
      <span class="position-absolute" :style="{ left: '58px', top: '34px' }"> 나의여행 </span>
    </div>
    <!-- 리스트 전체 영역 -->
    <div class="myTravelContent w-100 d-flex align-items-center">
      <!--  여행 리스트 -->
      <Swiper
        :direction="'vertical'"
        :slides-per-view="5"
        :space-between="10"
        style="height: 650px; width:80%"
      >
        <SwiperSlide
          v-for="(plan, index) in travelPlans"
          :key="index"
          class="d-flex flex-row align-items-center myTravelList position-relative"
          @click="()=>{router.push(`/travel/planner/${plan.id}`)}"
          style="cursor: pointer;"
        >
        <div class="w-100 h-100 d-flex align-items-center" ref="planCards">
          <div class="d-flex align-items-center justify-content-between w-100 overflow-hidden">
            <div class="d-flex align-items-center gap-2">
              <img src="/public/myPage/myPlanImg.png" width="68px" height="68px" alt="" />
              <div>{{ plan.title }}</div>
            </div>
            <i class="bi-trash trashcan" style="font-size: 1.1rem;" @click="(e)=>{
              e.stopPropagation();
              HandleDeletePlan(plan.id);
            }"></i>
            <div class="position-absolute listText" :style="{ bottom: '5px', right: '10px' }">
              {{ plan.date }}
            </div>
          </div>
          <div ref="colorBox" class="color-box bg-primary-red h-100 position-absolute" style="right: 0; top: 0"></div>
        </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
/* 텍스트 */
.title {
  font-size: 30px;
  font-weight: 700;
  color: var(--gray-10);
}
.myContentText {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-10);
}
/* 나의 여행 섹션 */
.myTravelSection {
  width: 35%;
  height: 787px;
  border-radius: 10px;
  box-shadow: 2px 6px 20px var(--gray-3);
  background-color: var(--gray-1);
}
/* 여행 리스트 컨테이너 여역 */
.myTravelContent {
  width: 80%;
  height: 650px;
}
/* 나의 여행 제목 섹션 */
.myTravelTitleSection {
  height: 85px;
  border-bottom: 1px solid #e6e6ea;
}
/* 여행 리스트 섹션  */
.myTravelList {
  height: 145px;
  border-bottom: 1px solid #e6e6ea;
}
.listText {
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-7);
}
.cursorPointer:hover {
  cursor: pointer;
}

.trashcan{
  transition: color 0.25s ease-in-out;
}
.trashcan:hover {
  color: #FF4444;
}
.color-box {
  width: 0%;
  height: 100%;
}
.color-box-expand {
  width: 100%;
  transition: all .5s;
}
.slideOutLeft {
  transform: translateX(100%);
  transition: all .5s;
}
</style>
