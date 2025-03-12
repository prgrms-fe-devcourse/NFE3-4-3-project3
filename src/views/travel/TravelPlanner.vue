<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, reactive } from 'vue';
import draggable from 'vuedraggable';
import TravelDestCard from '@/components/travel/planner/TravelDestCard.vue';
import usePlanner, {type TravelData, type TravelDestData} from '@/hooks/usePlanner';
import { useRoute } from 'vue-router';
import PlannerMapComponent from '@/components/travel/planner/PlannerMapComponent.vue';

const params = useRoute().params;
function AddNewDay() {
  data.value.destData.push([]);
}
function ColorChangeOnHover(e : MouseEvent) {
  const elem = e.target as HTMLElement;
  elem.classList.remove('trashcan-default');
  elem.classList.add('trashcan-danger');
}
function ColorChangeOnHoverRestore(e : MouseEvent) {
  const elem = e.target as HTMLElement;
  elem.classList.remove('trashcan-danger');
  elem.classList.add('trashcan-default');
}

const data = ref<{title:string, destData:TravelDestData[][]}>({title : '', destData : [[]]});
const mapData = reactive<{
  currentPlan: TravelData,
  currentFocus: TravelDestData,
  currentFocusDay: number
}>({
  currentPlan: { createdAt:'', destData:[[]], id:'', title:'' },
  currentFocus: { contentid:'', contentTypeId:'', mapx:0, mapy:0, name:'' },
  currentFocusDay: 0
});

const isDragging = ref<boolean>(false);
const prevFocused = ref<HTMLElement>();

const planner = usePlanner();
watch(
  ()=>mapData.currentPlan,
  ()=>{
    if(mapData.currentPlan){
      data.value.title = mapData.currentPlan.title;
      data.value.destData = mapData.currentPlan.destData;
    }
  }, { immediate: true }
);
onMounted(async ()=>{
  const myPlans = await planner?.GetMyPlans();
  if(myPlans){
    mapData.currentPlan = myPlans.filter((e)=>e.id===params.plannerId)[0];
  }
});
onUnmounted(()=>{
  if(planner && mapData.currentPlan){
    planner?.UpdatePlanData({
    createdAt: mapData.currentPlan.createdAt,
    id: mapData.currentPlan.id,
    title: data.value.title,
    destData: data.value.destData,
  });
  }
});
function HandleTitleChange(e : Event) {
  const elem = e.target as HTMLInputElement;
  data.value.title = elem.value;
}
</script>

<template>
  <div class="container-fluid p-0 d-flex" style="height: calc(100vh - 75px);">
    <div class="d-flex flex-column pt-3 pb-0 px-3" style="width: 20%; min-width: 400px; flex: 0 auto;">
      <input type="text" :value="data.title" class="title-text border-0" @change="(e)=>HandleTitleChange(e)" />
      <div style="overflow-y: scroll; scrollbar-width: none;">

        <div
          v-for="(item, index2) in data.destData"
          :key="index2"
        >
          <div class="d-flex align-items-center justify-content-between">
            <p class="day-text my-2">Day {{ index2 + 1 }}</p>
            <i class="bi-trash transition trashcan-default" style="cursor: pointer;"
              @mouseenter="ColorChangeOnHover"
              @mouseleave="ColorChangeOnHoverRestore"
              @click="(e)=>{
                data.destData.splice(index2, 1);
              }">
            </i>
          </div>

          <draggable
            class="d-flex flex-column gap-2"
            v-model="data.destData[index2]" item-key="name"
            group="travel"
            v-bind="{
              animation: 200,
            }"
            @start="()=>{isDragging=true;}"
            @end="()=>{isDragging=false;}"
          >
            <template #item="{ element, index }">
              <div style="width: 100%; height: 100%; transition: all .2s;" @click="(e)=>{
                const focused = e.currentTarget as HTMLElement;
                if(prevFocused !== null){ prevFocused?.classList.remove('focused'); }
                focused.classList.add('focused');
                prevFocused = focused;
                mapData.currentFocus = element;
                mapData.currentFocusDay = index2;
              }">
                <TravelDestCard :name="element.name" :index="index" :id="parseInt(element.contentid)" :-delete-dest-callback="(id : number, index : number)=>{
                  const temp = data.destData[index2].findIndex((e)=>e.contentid===id.toString());
                  const newDestData = [...data.destData[index2]];
                  newDestData.splice(temp, 1);
                  data.destData[index2] = newDestData;
                }"/>
              </div>
            </template>
          </draggable>
        </div>

        <button type="button" class="btn rounded my-3 text-gray-7 bg-gray-3" style="width:100%; height:50px;" @click="()=>AddNewDay()">
          <div class="d-flex justify-content-center position-relative">
            <div :style="{ fontFamily:' Pretendard', fontSize: '24px', fontWeight: 500 }">+</div>
          </div>
        </button>
      </div>
    </div>
    <div class="h-100 bg-primary" style="width: 80%">
      <PlannerMapComponent :travelData="mapData.currentPlan" :currentFocused="mapData.currentFocus" :currentFocusedDay="mapData.currentFocusDay" />
    </div>
  </div>
</template>

<style scoped>
.title-text {
  color: var(--gray-10);
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 32px;
}
.day-text {
  color: var(--gray-10);
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 20px;
}
.trashcan-default {
  color: var(--gray-7);
  font-size: 1.25rem;
}
.trashcan-danger {
  color: #FF4444;
  font-size: 1.25rem;
}
.transition {
  transition: color 0.25s ease-in-out;
}
.focused {
  padding-left: 20px;
}
</style>
