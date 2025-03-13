<template>
  <div class="header">
    <div class="header-container">
      <RouterLink to="/" class="router-link">
        <img src="/icons/art-libro.svg" width="140" height="50" alt="ArtLibro" />
      </RouterLink>
      <div class="router-container">
        <RouterLink to="/book" class="router-link">도서</RouterLink>
        <img src="/icons/divider.svg" width="24" height="24" alt="Divider" />
        <RouterLink to="/library/search" class="router-link">도서관</RouterLink>
        <img src="/icons/divider.svg" width="24" height="24" alt="Divider" />
        <RouterLink to="/performance" class="router-link">공연/행사</RouterLink>
        <img src="/icons/divider.svg" width="24" height="24" alt="Divider" />
        <RouterLink to="/community" class="router-link">커뮤니티</RouterLink>
      </div>
    </div>

    <div class="router-container">
      <!-- 로그인 했을 때 -->
      <template v-if="authStore.token">
        <div class="notification-container">
          <div class="notification-lt">
            <div class="icon-container">
              <span v-if="notificationList">{{ notificationList.length }}</span>
              <img src="/icons/notification-icon.svg" alt="notification" class="notification-icon icon"
                @click.stop="handleClickIcon('notification')" />
              <NotificationContainer :isOpen="isOpen === 'notification'" />
            </div>

            <div class="icon-container">
              <span v-if="messageList">{{ messageList.length }}</span>
              <img src="/icons/message-icon.svg" alt="message" class="message-icon icon"
                @click.stop="handleClickIcon('message')" />
              <MessageContainer :isOpen="isOpen === 'message'" />
            </div>
          </div>

          <div class="line"></div>
          <div class="icon-container">
            <img src="/icons/myPage-icon.svg" alt="myPage" @click="goToMyPage" class="myPage-icon icon" />
          </div>
        </div>
        <button class="logout" @click="authStore.logout">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="login">로그인</RouterLink>
        <RouterLink to="/register" class="register">회원가입</RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserMessage, getUserNotification } from '@/apis/user'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/vue-query'
import { RouterLink, useRouter } from 'vue-router'
import NotificationContainer from './notificationContainer.vue'
import MessageContainer from './messageContainer.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const authStore = useAuthStore()

const router = useRouter()

const goToMyPage = () => {
  router.push('/mypage')
}

const isOpen = ref<'notification' | 'message' | null>(null)

const handleClickIcon = (type: 'notification' | 'message') => {
  isOpen.value = isOpen.value === type ? null : type
}

// 유저 메세지 조회
const { data: messageList } = useQuery({
  queryKey: ['userMessageList', authStore.userId],
  queryFn: () => getUserMessage(),
})

// 유저 알림 조회
const { data: notificationList } = useQuery({
  queryKey: ['userNotificationList', authStore.userId],
  queryFn: () => getUserNotification(),
})

const handleClickOutside = (event: MouseEvent) => {
  const notificationContainer = document.querySelector('.notification-container')
  if (notificationContainer && !notificationContainer.contains(event.target as Node)) {
    isOpen.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1246px;
  height: 64px;
  margin: 0 auto;
}

a,
a:link,
a:visited {
  text-decoration: none;
  color: inherit;
}

.header-container {
  display: flex;
  align-items: center;
}

.router-container {
  display: flex;
  gap: 16px;
  margin-left: 60px;

  .notification-container {
    display: flex;
    align-items: center;
    gap: 16px;

    .notification-lt {
      display: flex;
      align-items: baseline;

      .icon-container {
        margin-left: 30px;
      }
    }

    .line {
      width: 1px;
      height: 16px;
      background-color: #b9b9b9;
      margin: 0 10px;
    }

    .icon-container {
      position: relative;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      .notification-icon {
        width: 20px;
        height: 20px;
      }

      .myPage-icon {
        width: 20px;
      }

      span {
        position: absolute;
        top: -5px;
        right: -2px;
        background-color: #ff0000;
        color: #ffffff;
        border-radius: 50%;
        font-size: 10px;
        padding: 1px 4px;
        text-align: center;
      }
    }
  }
}

.router-link {
  font-size: 20px;
  font-weight: bold;
}

.login {
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register {
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff !important;
  background-color: #6472fc;
  height: 29px;
  width: 90px;
  border-radius: 999px;
}

.logout {
  background-color: #e7e7e7;
  height: 29px;
  width: 80px;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  color: #3d3d3d;
  cursor: pointer;
}
</style>
