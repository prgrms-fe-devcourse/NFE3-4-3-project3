<script setup lang="ts">
import { createUserFollow, deleteUserFollow } from '@/apis/user';
import { useAuthStore } from '@/stores/authStore';
import { message } from 'ant-design-vue';
import { computed, onUnmounted, ref, watch } from 'vue'

const isOpen = ref(false)

const props = defineProps<{ authorName: string, authorId: string }>()
const name = ref(props.authorName || '익명')

const { userInfo, getUserInfo } = useAuthStore()

const userNewdata = ref(userInfo);
// authorName이 변경될 때 name 업데이트
watch(
  () => props.authorName,
  (newVal) => {
    if (newVal) name.value = newVal
  },
  { immediate: true },
)

// 드롭다운
const toggleDropdown = (event: Event) => {
  event.stopPropagation() // -> 부모 요소로 이벤트 전파 막기
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    window.addEventListener('click', closeDropdown)
  } else {
    window.removeEventListener('click', closeDropdown)
  }
}

// 배경이나 다른 곳 클릭하면 드롭다운 닫기
const closeDropdown = () => {
  isOpen.value = false
  window.removeEventListener('click', closeDropdown)

}

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})

// watchEffect(() => {
//   console.log('userInfo 변경됨:', userInfo?.following);
// })

const isFollowing = computed(() => {
  return userNewdata.value?.following.find((follow) => follow.user === props.authorId)
})

const follow = async () => {
  try {
    const response = await createUserFollow(props.authorId)
    if (response) {
      userNewdata.value = await getUserInfo()
      message.success('팔로우를 성공했습니다.', 1)
    }
  } catch (error) {
    console.error(error)
    message.error('팔로우를 실패했습니다. 잠시 후 다시 시도해주세요.', 1)
  }
  closeDropdown()
}

const unFollow = async () => {
  try {
    const response = await deleteUserFollow(isFollowing.value?._id as string)
    if (response) {
      userNewdata.value = await getUserInfo()
      message.success('팔로우를 취소했습니다.', 1)
    }
  } catch (error) {
    console.error(error)
    message.error('팔로우를 취소하는데 실패했습니다. 잠시 후 다시 시도해주세요.', 1)
  }
}
</script>

<template>
  <div class="user-dropdown">
    <span class="author-name" @click="toggleDropdown">{{ authorName || '익명' }}</span>
    <div v-if="isOpen" class="dropdown-menu">
      <button @click="follow" v-if="!isFollowing">팔로우</button>
      <button @click="unFollow" v-else>팔로우 취소</button>
      <button>쪽지 보내기</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.author-name {
  cursor: pointer;
  font-weight: bold;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
}

.dropdown-menu {
  position: absolute;
  top: 30px;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 120px;
  padding: 5px 0;
  z-index: 999;
}

.dropdown-menu button {
  background: none;
  border: none;
  padding: 8px 12px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
}

.dropdown-menu button:hover {
  background: #f4f4f4;
}
</style>
