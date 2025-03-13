<template>
  <div class="mypage-container">
    <div v-if="isLoading"></div>
    <UserCardSection v-else :userInfo="data" />
  </div>
</template>

<script setup lang="ts">
import UserCardSection from '@/components/myPage/UserCardSection.vue';
import { useAuthStore } from '@/stores/authStore';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getUserInfo } from '@/apis/user';
import { onMounted } from 'vue';

const { userId } = useAuthStore();

const queryClient = useQueryClient();

const { data, isLoading } = useQuery({
  queryKey: ['userInfo', userId],
  queryFn: () => getUserInfo(userId as string),
  refetchInterval: 1000 * 60,
})

onMounted(async () => {
  queryClient.invalidateQueries({ queryKey: ['userInfo', userId] })
})

</script>

<style lang="scss" scoped>
.mypage-container {
  width: 1256px;
  margin: 60px auto;
}
</style>
