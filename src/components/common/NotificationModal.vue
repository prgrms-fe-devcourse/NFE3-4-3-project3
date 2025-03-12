<script setup lang="ts">
import { ref, watch } from 'vue';
import NotificationCard from './NotificationCard.vue';
import type { devNotification } from '@/types/devcourse/devNotification';

interface NotificationModalProps {
  visibility: boolean
  notifications: devNotification[];
}
const props = defineProps<NotificationModalProps>();
const display = ref<string>('0');
watch(
  ()=>props.visibility,
  ()=>{
    display.value = props.visibility ? '100' : '0';
  }
);
</script>

<template>
  <div
    class="position-absolute bg-gray-3 rounded-3 mx-5 my-3 overflow-hidden z-3"
    style="width: 400px; min-height: fit-content; max-height: 300px; top: 100%; right: 0%; z-index: 1; flex-direction: column; transition: opacity 0.5s ease-in-out;"
    :style="{ opacity: display }"
  >
    <div class="w-100 px-3 py-2 border-bottom">
      <p class="m-0 p-0 notification-modal-header">알림</p>
    </div>
    <div v-if="props.notifications.length <= 0"
      class="notification-modal-header px-3 py-4 text-center overflow-y-scroll d-flex flex-column"
      style="scrollbar-width: none;"
    >
      <p class="m-0 p-0">알림이 없습니다.</p>
    </div>
    <NotificationCard v-for="item in props.notifications" :key="item._id" :notification="item"/>
    <div class="px-3 py-3"></div>
  </div>
</template>

<style scoped>
.notification-modal-header {
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: var(--gray-10);
}
</style>
