<template>
  <div class="notification-item-container" v-if="isOpen">
    <div class="notification-item-header">
      <p>읽지 않은 알림</p>
    </div>

    <div class="notification-item-list">
      <span v-if="isPending">Loading...</span>
      <span v-else-if="isError">Error: {{ error?.message }}</span>
      <!-- We can assume by this point that `isSuccess === true` -->
      <ul v-else-if="notificationList">
        <li class="read">
          <div class="read-button" @click="handleRead">모두 읽기</div>
        </li>
        <li v-for="(item,index) in notificationList" :key="index">
          <div v-if="item.seen === false" class="notification-item" :key="index">
            <div class="notification-item-content">
              <div class="notification-item-content-header">
                <p class="notification-item-name">{{ item.author.fullName }}님이</p>
              </div>
              <p class="notification-item-description">내 게시글에 활동을 남겼어요!</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getUserNotification, updateUserNotification } from '@/apis/user.ts'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore();

const { isOpen } = defineProps<{
  isOpen: boolean;
}>();

// 유저 알림 조회
const { data: notificationList, isPending, isError, error } = useQuery({
  queryKey: ['userNotificationList', authStore.userId],
  queryFn: async () => await getUserNotification(),
})

const handleRead = async () => {
  const result = await updateUserNotification();
}
</script>

<style lang="scss" scoped>
.notification-item-container {
  width: 250px;
  height: 300px;
  border: 1px solid #D3D0CB;
  border-radius: 10px;
  position: absolute;
  top: 130%;
  left: 50%;
  z-index: 10000000;
  transform: translateX(-50%);
  background-color: #fff;

  .notification-item-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    background-color: #333333;
    border-radius: 10px 10px 0 0;

    p {
      color: #fff;
      font-size: 13px;
      letter-spacing: -0.02em;
    }
  }

  .notification-item-list {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: .5rem 1rem;
    height: 90%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    .read{
      display: flex;
      justify-content: flex-end;
      font-size : 14px;
      color : #6472fc;
    }

    .read-button{
      cursor: pointer;
    }

    .notification-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: .5rem;
      border-bottom: 1px solid #D3D0CB;


      .notification-item-image {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }

      .notification-item-content {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        width: 80%;

        .notification-item-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.2rem;

          .notification-item-name {
            font-size: 13px;
            color: #5c5c5c;
          }

          .notification-item-date {
            font-size: 11px;
            color: #a7a7a7;
          }
        }

        .notification-item-description {
          font-size: 12px;
          color: #838383;
        }
      }
    }
  }
}
</style>
