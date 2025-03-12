<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import NotificationModal from './NotificationModal.vue';
import { getNotifications } from '@/apis/devcourse/Notification/getNotifications';
import type { devNotification } from '@/types/devcourse/devNotification';
import { notificationsSeen } from '@/apis/devcourse/Notification/notificationsSeen';

const route = useRoute();
const auth = useAuthStore();

const headerClass = computed(() => route.meta.headerVariant || 'header-default');

const notificationOpen = ref<boolean>(false);
const notificationsArr = ref<devNotification[]>();

watch(
  ()=>notificationOpen.value,
  async ()=>{
    if(!auth.isAuth) return;
    if(notificationOpen.value === false){
      notificationsSeen();
    }
    else{
      notificationsArr.value = (await getNotifications()).notifications.filter((e)=>!e.seen);
    }
  }
)
</script>

<template>
  <header class="header" :class="headerClass">
    <router-link to="/" class="logo"> Petner </router-link>
    <nav class="links">
      <router-link to="/adoption" class="link">유기 동물 입양</router-link>
      <router-link to="/travel" class="link">반려동물 동반 여행</router-link>
      <!-- <router-link to="/page3" class="link">반려용품 쇼핑</router-link> -->
      <router-link to="/community" class="link">커뮤니티</router-link>
      <router-link to="/community/missing" class="link">동물 실종 신고</router-link>
    </nav>
    <router-link to="/mypage" class="user-avatar" v-if="auth.isAuth">
      <div class="person-circle">
        <img :src="auth.user?.image" alt="" style="width: 100%; height: 100%; border-radius: 100%">
      </div>
      <span class="user-name" :style="{ color: 'FFFFFF' }">{{ auth.user?.fullName }}</span>
    </router-link>
    <router-link to="/login" v-if="!auth.isAuth" style="text-decoration: none;">
      <span class="user-name" :style="{ color: 'FFFFFF' }">로그인</span>
    </router-link>
    <i v-if="auth.isAuth && !notificationOpen" class="bi-bell mx-2" style="font-size: 1.2rem; cursor: pointer" @click="notificationOpen = true"></i>
    <i v-if="auth.isAuth && notificationOpen" class="bi-bell-slash mx-2" style="font-size: 1.2rem; cursor: pointer" @click="notificationOpen = false"></i>
    <NotificationModal :visibility="notificationOpen" :notifications="notificationsArr ?? []" />
  </header>
</template>

<style scoped>
.header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  width: 100%;
  height: 75px;
  top: 0;
  /* overflow: hidden; */
}
.logo {
  font-family: 'Paperlogy';
  font-weight: 700;
  font-size: 2rem;
  text-decoration: none;
  text-decoration: none;
  flex-grow: 0;
  margin-right: 50px;
}
.links {
  display: flex;
  gap: 50px;
  flex-grow: 1;
  justify-content: flex-start;
  margin: 0 20px;
}
.link {
  font-family: 'Pretendard';
  font-size: 1.2rem;
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  transition:
    color 0.3s,
    transform 0.3s;
}

.link:hover {
  transform: scale(1.05);
}

.link:active {
  transform: scale(0.98);
}
.user-avatar {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  text-decoration: none;
  flex-grow: 0;
}
.person-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #cf54d3;
}

.user-name {
  font-weight: 400;
  font-size: 1.2rem;
  color: var(--gray-1);
}
</style>
