<template>
  <div class="message-item-container" v-if="isOpen">
    <div class="message-item-header">
      <p>읽지 않은 메세지</p>
    </div>

    <div class="message-item-list">
      <span v-if="isPending">Loading...</span>
      <span v-else-if="isError">Error: {{ error?.message }}</span>
      <div v-else-if="messageList">
        <div v-for="(item,index) in messageList" class="message-item" :key="index" @click="handleReadMessage(item.sender._id)">
          <img :src="item.sender.image || '/images/user-dummy.png'" alt="user-dummy" class="message-item-image">

          <div class="message-item-content">
            <div class="message-item-content-header">
              <p class="message-item-name">{{ item.message }}</p>
            </div>
            <p class="message-item-description">{{ item.sender.fullName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getUserMessage, updateUserMessage } from '@/apis/user.ts'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore();

const { isOpen } = defineProps<{
  isOpen: boolean;
}>();

// 유저 메세지 조회
const { data: messageList, isPending, isError, error} = useQuery({
  queryKey: ['userMessageList', authStore.userId],
  queryFn: () => getUserMessage(),
})

const handleReadMessage = async (id) => {
  const result = await updateUserMessage(id);
}
</script>

<style lang="scss" scoped>
.message-item-container {
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

  .message-item-header {
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

  .message-item-list {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: .5rem 1rem;
    height: 90%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    .message-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      padding-bottom: .5rem;
      border-bottom: 1px solid #D3D0CB;


      .message-item-image {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }

      .message-item-content {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        width: 80%;

        .message-item-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.2rem;

          .message-item-name {
            font-size: 13px;
            color: #5c5c5c;
          }

          .message-item-date {
            font-size: 11px;
            color: #a7a7a7;
          }
        }

        .message-item-description {
          font-size: 12px;
          color: #838383;
        }
      }
    }
  }

}
</style>
