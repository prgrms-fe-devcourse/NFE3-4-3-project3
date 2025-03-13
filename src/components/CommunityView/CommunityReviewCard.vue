<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import CommunityUserDropdown from './CommunityUserDropdown.vue'
import type { Comment, Like } from '@/types/community/communityType';

const router = useRouter()
const props = defineProps<{
  review: {
    id: string
    authorName: string
    title: string
    content: string
    likes: Like[]
    comments: Comment[]
    image: string
    category: string
    time: string
    authorImage: string
    authorId: string
  }
}>()

// 기본 이미지 경로
const defaultBookImage = '/images/community-no-image.png'

// 책 이미지가 없을 때 기본 이미지로 대체
const reviewImage = computed(() => props.review.image || defaultBookImage)

// 기본 이미지인지 확인
const isDefaultImage = computed(() => reviewImage.value === defaultBookImage)

// // 댓글 개수 상태
// const commentCount = ref(0)

// // 좋아요 개수 상태
// const likeCount = ref(0)

// // 로컬 스토리지에서 댓글 개수 가져오는 함수
// const getCommentCount = (postId: string): number => {
//   const savedComments = localStorage.getItem(`comments_${postId}`)
//   return savedComments ? JSON.parse(savedComments).length : 0
// }

// 로컬 스토리지에서 특정 게시물의 좋아요한 사용자 수 가져오는 함수
// const getLikeCount = (postId: string): number => {
//   let count = 0

//   // 로컬 스토리지 전체 키 확인
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i)

//     // 로컬 스토리지에서 likedPosts_로 시작하는 키만 찾기 -> 사용자별 좋아요 데이터
//     if (key && key.startsWith('likedPosts_')) {
//       const savedLikes = localStorage.getItem(key)

//       try {
//         const parsedLikes = savedLikes ? JSON.parse(savedLikes) : []
//         if (Array.isArray(parsedLikes) && parsedLikes.includes(postId)) {
//           count++
//         }
//       } catch (error) {
//         console.error(`❌ JSON 파싱 오류:`, error)
//       }
//     }
//   }

//   console.log(`${postId} 좋아요 개수:`, count)
//   return count
// }

// 댓글 개수 불러오기
// onMounted(() => {
//   commentCount.value = getCommentCount(props.review.id)
//   likeCount.value = getLikeCount(props.review.id)
// })

const goToDetail = () => {
  router.push(`/community/${props.review.id}`)
}
</script>

<template>
  <div class="review-card" @click="goToDetail">
    <div class="review-content">
      <div class="user-info">
        <img :src="review.authorImage || '/images/user-dummy.png'" alt="유저 프로필" class="review-avatar" />
        <div class="user-details">
          <!-- 작성자 클릭했을 때는 이벤트 전파 막기 -->
          <CommunityUserDropdown :authorId="review.authorId" :authorName="review.authorName" @click.stop
            class="user-name" />
          <span class="time">{{ review.time }}</span>
        </div>
      </div>
      <h3 class="review-title">{{ review.title }}</h3>
      <p class="review-text">{{ review.content }}</p>
      <div class="review-meta">
        <span>좋아요 {{ review.likes.length }}</span>
        <span>댓글 {{ review.comments.length }}</span>
      </div>
    </div>
    <img :src="reviewImage" :class="{ 'review-image': true, 'default-image': isDefaultImage }" alt="책표지" />
  </div>
</template>

<style lang="scss" scoped>
.review-card {
  cursor: pointer;
  width: 1200px;
  height: 240px;
  border-bottom: 1px solid $text-color-100;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.review-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: $text-color-600;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.review-avatar {
  width: 35px;
  height: 35px;
}

.user-name {
  color: $text-color-400;
}

.time {
  color: $text-color-300;
}

.review-title {
  font-size: $text-size-400;
  margin: 0;
}

.review-text {
  font-size: $text-size-300;
  color: #666;
  line-height: 1.5;
  margin-top: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* 웹킷 브라우저용 (Chrome, Safari 등) */
  line-clamp: 2;
  /* 표준 속성 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}

.review-meta {
  font-size: $text-size-200;
  color: #777;
  display: flex;
  gap: 15px;
}

.review-image {
  width: 150px;
  height: 200px;
  object-fit: cover;
  margin-left: 30px;
  box-shadow: 0px 1px 4px $text-color-300;
}

.default-image {
  padding: 50px 30px;
  object-fit: fill;
}
</style>
