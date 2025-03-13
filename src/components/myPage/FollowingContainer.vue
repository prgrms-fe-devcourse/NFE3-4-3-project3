<template>
  <div class="following-container" v-if="following.length > 0">
    <div class="following-item" v-for="user in following" :key="user._id">
      <div class="following-user-info">
        <img :src="user.image || '/images/user-dummy.png'" alt="프로필 이미지" class="following-user-profile-image">
        <p class="following-user-name">{{ user.fullName }}</p>
      </div>
      <div class="following-user-info-container">
        <button class="following-user-info-button" @click="emit('unfollow', user._id)">팔로우 취소</button>
      </div>
    </div>
  </div>
  <NotFound v-else title="팔로잉이 없습니다." />
</template>

<script setup lang="ts">
import type { UserType } from '@/types/user';
import NotFound from '../common/NotFound.vue';

defineProps<{
  following: UserType[]
}>()

const emit = defineEmits(['unfollow'])
</script>


<style lang="scss" scoped>
.following-container {
  width: 100%;
  height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  .following-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .following-user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .following-user-name {
        font-size: 14px;
      }

      .following-user-profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .following-user-info-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .following-user-info-status {
        font-size: 12px;
        color: #1F1F1F;
        border-radius: 12px;
        padding: 6px 14px;
      }

      .following-user-info-button {
        font-size: 12px;
        color: #fff;
        border-radius: 12px;
        padding: 5px 12px;
        background-color: #6472fc;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
