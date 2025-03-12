<script setup lang="ts">
import { useTemplateRef, } from 'vue';

interface TravelDestCardProp{
  id: number;
  name : string;
  index : number;
  DeleteDestCallback : (id : number, index: number)=>void;
}
const props = defineProps<TravelDestCardProp>();
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
const element = useTemplateRef<HTMLDivElement>('this-element');
</script>

<template>
    <div ref="this-element" class="bg-gray-3 d-flex rounded opacity-transition"
      @transitionend="(e)=>{
        if(e.propertyName === 'opacity'){
          props.DeleteDestCallback(id, index);
        }
      }"
      style="height: 75px; align-items: center; cursor: pointer; user-select: none;">
      <div class="bg-primary-red mx-2" style="border-radius: 100%; height: 50px; aspect-ratio: 1/1; align-content: center; justify-items: center;">
        <p class="order-text m-0 p-0">{{ props.index + 1 }}</p>
      </div>
      <div class="h-100 rounded col" style="align-content: center;">
        <p class="name-text m-0 p-0">{{ props.name }}</p>
      </div>
      <div class="h-100 rounded col-2 d-flex align-items-center justify-content-center">
        <i class="bi-dash-lg trashcan-default transition"
          @mouseenter="ColorChangeOnHover"
          @mouseleave="ColorChangeOnHoverRestore"
          @click="(e)=>{
            e.stopPropagation();
            if(!element) return;
            element.classList.add('opacity-0');
          }"
        >
        </i>
      </div>
    </div>
</template>

<style scoped>
.name-text {
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 20px;
  color: var(--gray-7);
}
.order-text {
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 20px;
  color: var(--gray-1);
}
.trashcan-default {
  color: var(--gray-7);
  font-size: 1.5rem;
}
.trashcan-danger {
  color: #FF4444;
  font-size: 1.5rem;
}
.focused {
  border: 2px;
  border-color: var(--primary-red);
}
.transition {
  transition: color 0.25s ease-in-out;
}
.opacity-transition {
  transition: opacity 0.25s ease-in-out;
}
</style>
