<script setup lang="ts">
import type { devNotification } from '@/types/devcourse/devNotification';

interface NotificationCardProps {
  notification : devNotification;
}
const props = defineProps<NotificationCardProps>();
</script>

<template>
  <!-- 아바타 -->
  <div class="border-bottom d-flex align-content-center p-2 justify-content-around" style="height: 75px;">
    <div style="height:100%; aspect-ratio: 1/1; overflow: hidden; border-radius: 100%; justify-content: center;">
      <img :src="props.notification.author.image" alt="" style=" height:100%; width: auto;">
    </div>
    <div style="width: 80%; align-content: center;">
      <p class="notification-modal-name m-0 p-0 text-gray-10 overflow-hidden" style="text-overflow: ellipsis; white-space: nowrap;">{{ props.notification.author.fullName }}</p>
      <p v-if="props.notification.comment" class="notification-modal-text m-0 p-0 text-gray-10 overflow-hidden" style="text-overflow: ellipsis; white-space: nowrap;">{{ props.notification.comment.comment }}</p>
      <p v-if="props.notification.comment" class="notification-modal-text m-0 p-0 text-gray-10 overflow-hidden" style="text-overflow: ellipsis; white-space: nowrap;"></p>
      <p v-if="!props.notification.comment" class="notification-modal-text m-0 p-0 text-gray-10" >좋아요를 보냈습니다.</p>
    </div>
  </div>
</template>

<style scoped>
.notification-modal-text {
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-10);
}
.notification-modal-name {
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-10);
}
</style>
