<template>
  <div class="user-follow-card">
    <div class="user-follow-card-header">
      <div class="user-follow-card-header-tab" :class="{ active: selectedTab === 'follower' }"
        @click="selectedTab = 'follower'">팔로워</div>
      <div class="user-follow-card-header-tab" :class="{ active: selectedTab === 'following' }"
        @click="selectedTab = 'following'">팔로잉</div>
    </div>

    <FollowerContainer v-if="selectedTab === 'follower'" :followers="followerUsers" :isFollowing="isFollowing"
      @follow="handleFollow" />
    <FollowingContainer v-if="selectedTab === 'following'" :following="followingUsers" @unfollow="handleUnfollow" />
  </div>

</template>
<script setup lang="ts">
import FollowerContainer from '@/components/myPage/FollowerContainer.vue';
import FollowingContainer from '@/components/myPage/FollowingContainer.vue';
import { createUserFollow, deleteUserFollow, getUserInfo } from '@/apis/user';
import type { FollowersType, FollowingType, UserType } from '@/types/user';
import { message } from 'ant-design-vue';
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  followers: FollowersType[]
  following: FollowingType[]
}>()

const selectedTab = ref<'follower' | 'following'>('follower');
const followerUsers = ref<UserType[]>([]);
const followingUsers = ref<UserType[]>([]);

// 팔로워/팔로잉 유저 정보 가져오기
const fetchUsers = async () => {
  try {
    if (props.followers?.length) {
      const followerPromises = props.followers.map(follow => getUserInfo(follow.follower))
      followerUsers.value = await Promise.all(followerPromises)
    }
    if (props.following?.length) {
      const followingPromises = props.following.map(follow => getUserInfo(follow.user))
      followingUsers.value = await Promise.all(followingPromises)
    }
  } catch (error) {
    console.error(error)
    message.error('유저 정보를 불러오는데 실패했습니다.', 1)
  }
}

// 팔로우 상태 확인
const isFollowing = (userId: string) => {
  return props.following.some(follow => follow.user === userId)
}

// 팔로우 처리
const handleFollow = async (userId: string) => {
  try {
    await createUserFollow(userId)
    message.success('팔로우에 성공했습니다.', 1)
    window.location.reload()
  } catch (error) {
    console.error(error)
    message.error('팔로우 처리에 실패했습니다.', 1)
  }
}

// 언팔로우 처리
const handleUnfollow = async (userId: string) => {
  try {
    const followData = props.following.find(follow => follow.user === userId)
    if (followData && confirm('정말 팔로우를 취소하시겠습니까?')) {
      await deleteUserFollow(followData._id)
      followingUsers.value = followingUsers.value.filter(user => user._id !== userId)
      window.location.reload()

      message.success('팔로우를 취소했습니다.', 1)
    }
  } catch (error) {
    console.error(error)
    message.error('팔로우 취소에 실패했습니다.', 1)
  }
}

watchEffect(() => {
  fetchUsers()
})
</script>

<style lang="scss" scoped>
.user-follow-card {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  padding: 1rem;

  .user-follow-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;

    .user-follow-card-header-tab {
      font-size: 16px;
      color: $text-color-300;
      cursor: pointer;

      &.active {
        color: $secondary-color-300;
      }
    }
  }

}
</style>
