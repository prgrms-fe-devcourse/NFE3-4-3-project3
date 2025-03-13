<script setup lang="ts">
import { deletePost, postLike, postUnlike } from '@/apis/community/post'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useLikesStore } from '@/stores/likesStore'
import type { Post } from '@/types/community/communityType'
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import CommunityUserDropdown from '../CommunityView/CommunityUserDropdown.vue'
import { message, Modal } from 'ant-design-vue'
import { useQueryClient } from '@tanstack/vue-query'

const props = defineProps<{
  post: Post // liked 속성 추가
}>()

const authStore = useAuthStore()
const likesStore = useLikesStore() // 좋아요 스토어
const queryClient = useQueryClient()
const isLiked = ref<boolean>(false)
const likedId = ref<string>('')

// 현재 로그인한 사용자 ID 가져오기
const userId = computed(() => authStore.userId)

// 본인 게시글인지 확인
const isAuthor = computed(() => props.post.userId === userId.value)

// 기본 이미지 경로
const defaultBookImage = '/images/community-no-image.png'
const bookImage = computed(() => props.post.image || defaultBookImage)
const isDefaultImage = computed(() => bookImage.value === defaultBookImage)

// createdAt을 YYYY-MM-DD 형식으로 변환
const formattedDate = computed(() =>
  props.post.createdAt ? dayjs(props.post.createdAt).format('YYYY-MM-DD') : '',
)

// 로그인한 사용자에 맞는 좋아요 리스트 불러오기
onMounted(() => {
  likesStore.setUser(userId.value) // 로그인한 사용자 설정해서 userId별 좋아요 목록 불러오기
  isLiked.value = authStore.userInfo?.likes?.some(like => like.post === props.post.id) ?? false
  likedId.value = authStore.userInfo?.likes?.find(like => like.post === props.post.id)?._id ?? ''
})

// const isLiked = computed(() => likesStore.likedPosts.includes(props.post.id))

// // 좋아요 버튼
// const toggleLike = () => {
//   if (!userId.value) {
//     Modal.warning({
//       title: '로그인 필요',
//       content: '좋아요 기능을 이용하려면 로그인이 필요합니다.',
//       okText: '로그인하기',
//       okButtonProps: {
//         // style 타입 에러 -> SCSS에서 따로 스타일 줘도 에러남...
//         style: {
//           backgroundColor: '#6472fc', // 버튼 색깔
//           color: '#fff',
//           fontWeight: 'bold',
//           borderRadius: '8px',
//         },
//       },
//       onOk() {
//         router.push('/login')
//       },
//     })
//     return
//   }

//   likesStore.toggleLike(props.post.id)
//   console.log('테스트)))))))))) 좋아요 변경됨 →', likesStore.likedPosts)
// }

// 게시글 삭제
const handleDelete = () => {
  Modal.confirm({
    title: '게시글 삭제',
    content: '정말 삭제하시겠습니까?',
    okText: '삭제',
    cancelText: '취소',
    okType: 'danger',
    async onOk() {
      await deletePost(props.post.id, props.post.userId)

      message.success({
        content: '게시글이 삭제되었습니다!',
        duration: 1, // 1초 동안 표시
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
        },
      })
      queryClient.refetchQueries({ queryKey: ['userInfo', userId] })

      router.push('/community')

    },
  })
}

// 게시글 수정 페이지로 이동
const goToEditPage = () => {
  if (!isAuthor.value) {
    alert('본인 게시글만 수정할 수 있습니다!')
    return
  }

  router.push({
    path: `/community/edit/${props.post.id}`,
    query: { post: JSON.stringify(props.post) },
  })
}

// 게시글 목록으로 가기
const goBack = () => {
  router.push('/community')
}

const handleLike = async () => {
  if (!userId.value) {
    Modal.warning({
      title: '로그인 필요',
      content: '좋아요 기능을 이용하려면 로그인이 필요합니다.',
    })
    return
  }

  try {
    const response = await postLike(props.post.id)
    isLiked.value = !isLiked.value
    likedId.value = response._id
    queryClient.refetchQueries({ queryKey: ['userInfo', userId] })
  } catch (error) {
    console.error('❌ 게시글 좋아요 실패:', error)
    throw error
  }
}

const handleUnLike = async () => {
  try {
    await postUnlike(likedId.value)
    isLiked.value = !isLiked.value
    queryClient.refetchQueries({ queryKey: ['userInfo', userId] })
  } catch (error) {
    console.error('❌ 게시글 좋아요 취소 실패:', error)
    throw error
  }
}
</script>

<template>
  <section class="content-container">
    <button class="back-button" @click="goBack">
      <img src="/icons/go-back.svg" alt="뒤로가기 버튼" />
    </button>
    <div class="content-box">
      <div class="like-button">
        <img v-if="isLiked" src="/icons/heart-purple-fill.svg" alt="좋아요 취소 버튼" @click="handleUnLike" />
        <img v-else src="/icons/heart-purple.svg" alt="좋아요 버튼" @click="handleLike" />
      </div>

      <div class="title-category-wrapper">
        <span class="category">{{ post.category }}</span>
        <h2 class="content-title">{{ post.title }}</h2>
      </div>

      <div class="meta-info">
        <div class="user-profile">
          <img
            :src="post.authorImage || '/images/user-dummy.png'"
            alt="유저 프로필"
            class="profile-image"
          />
          <div>
            <div class="username">
              <CommunityUserDropdown :authorName="post.authorName" />
            </div>
          </div>
        </div>
        <span class="post-date">{{ formattedDate }}</span>
      </div>

      <div class="book-image">
        <img :src="bookImage" alt="게시글 이미지" class="post-image" :class="{ 'default-image': isDefaultImage }" />
      </div>

      <div class="review-container">
        <div class="review-text">
          <p>{{ post.content }}</p>
        </div>
      </div>

      <div v-if="isAuthor" class="button-group">
        <button class="edit-button" @click="goToEditPage">수정</button>
        <button class="delete-button" @click="handleDelete">삭제</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.content-container {
  position: relative;
  height: auto;
  height: 630px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-box {
  width: 1237px;
  height: 491px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  text-align: center;
}

.back-button {
  position: fixed;
  top: 0px;
  left: 0px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
  margin-bottom: 30px;

  img {
    width: 20px;
    height: 20px;
  }
}

.like-button {
  position: absolute;
  top: 80px;
  right: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: white;
  border: 2px solid $text-color-100;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;
}

.title-category-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
}

.content-title {
  font-size: $text-size-500;
  font-weight: bold;
  color: white;
  margin: 0;
}

.meta-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 16px;
  color: $text-color-400;
}

.user-profile {
  display: flex;
  direction: row;
  gap: 10px;
  align-items: center;
}

.profile-image {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: lighter;
  color: white;
  margin-right: 20px;
}

.category {
  width: 90px;
  height: 35px;
  font-weight: bold;
  background-color: $primary-color-100;
  padding: 5px 10px;
  border-radius: 999px;
  color: $text-color-500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-date {
  font-weight: lighter;
  color: white;
}

.button-group {
  direction: flex;
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  right: 80px;
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  width: 220px;
  height: 30px;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-button {
  background-color: white;
  color: #0077b6;
  border: 1px solid #0077b6;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0077b6;
    color: white;
  }
}

.delete-button {
  background-color: white;
  color: #d62828;
  border: 1px solid #d62828;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #d62828;
    color: white;
  }
}

/* 기존 책 이미지 스타일 */
.book-image {
  position: absolute;
  top: 60px;
  right: 80px;
  z-index: 2;
}

.book-image img {
  width: 220px;
  height: 320px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.default-image {
  background-color: white;
  padding: 90px 40px;
  box-sizing: border-box;
  /* 패딩이 내부에 포함되도록 설정 */
  object-fit: contain;
  width: 100%;
  height: auto;
}

.review-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 390px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.review-text {
  width: 900px;
  font-size: $text-size-300;
  font-weight: lighter;
  line-height: 1.6;
  text-align: left;
  position: relative;
  left: 0;
  padding: 20px;
}

.review-text p {
  margin: 0;
}
</style>
