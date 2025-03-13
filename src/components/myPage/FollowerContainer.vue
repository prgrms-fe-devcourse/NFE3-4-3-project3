<template>
  <div class="follower-container" v-if="followers.length > 0">
    <div class="follower-item" v-for="follower in followers" :key="follower._id">
      <div class="follower-user-info">
        <img :src="follower.image || '/images/user-dummy.png'" alt="프로필 이미지" class="follower-user-profile-image">
        <p class="follower-user-name">{{ follower.fullName }}</p>
      </div>
      <div class="follower-user-info-container">
        <button v-if="isFollowing(follower._id)" class="follower-user-info-button active">맞팔로우</button>
        <button v-else class="follower-user-info-button" @click="emit('follow', follower._id)">팔로우하기</button>
      </div>
    </div>
  </div>
  <NotFound v-else title="팔로워가 없습니다." />
</template>

<script setup lang="ts">
import type { UserType } from '@/types/user';
import NotFound from '../common/NotFound.vue';

defineProps<{
  followers: UserType[],
  isFollowing: (userId: string) => boolean
}>()

const emit = defineEmits(['follow'])
</script>

<style lang="scss" scoped>
.follower-container {
  width: 100%;
  height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  .follower-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .follower-user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .follower-user-name {
        font-size: 14px;
      }

      .follower-user-profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .follower-user-info-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .follower-user-info-button {
        font-size: 12px;
        color: #fff;
        border-radius: 12px;
        padding: 5px 12px;
        background-color: #6472fc;
        border: none;
        cursor: pointer;

        &.active {
          background-color: #8a8a8a;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
