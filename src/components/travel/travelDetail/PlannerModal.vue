<script setup lang="ts">
import { watch, reactive, ref } from 'vue';
import usePlanner, { type TravelData, type TravelDestData } from '@/hooks/usePlanner';

interface PlannerModalProps {
  visible: boolean;
  positionTop: string;
  positionLeft: string;
  data: TravelDestData;
}
const props = defineProps<PlannerModalProps>();
console.log(props);
watch(
  () => props.visible,
  async () => {
    propsStyle.top = props.positionTop;
    propsStyle.left = props.positionLeft;
    propsStyle.opacity = props.visible ? 100 : 0;
    myPlans.value = await planner?.GetMyPlans();
  },
);
const propsStyle = reactive({
  top: '0px',
  left: '500px',
  opacity: 0,
});

const emit = defineEmits(['toggle-visibility']);

const myPlans = ref<TravelData[]>();
const planner = usePlanner();
function HandleClick(data: TravelData) {
  data.destData[0].push(props.data);
  planner?.UpdatePlanData(data);
  emit('toggle-visibility');
}
</script>

<template>
  <div
    class="bg-gray-3 position-absolute p-1 rounded"
    style="width: fit-content; min-width: 150px; transition: opacity 0.2s ease-in-out"
    :style="{ ...propsStyle }"
  >
    <div
      style="
        overflow: hidden;
        overflow-y: scroll;
        max-height: 200px;
        scrollbar-width: none;
        cursor: pointer;
      "
    >
      <p
        v-for="plan in myPlans"
        :key="plan.id"
        class="m-0 p-1 border-bottom text-center"
        @click="() => HandleClick(plan)"
      >
        {{ plan.title }}
      </p>
    </div>
    <button
      class="btn w-100 h-100"
      @click="
        async () => {
          const newPlan = await planner?.CreatePlanData('여행 계획');
          if (newPlan !== undefined) HandleClick(newPlan);
        }
      "
    >
      <!-- <i class="bi-plus-lg"></i> -->
      <p class="m-0 p-0">새 계획</p>
    </button>
  </div>
</template>
