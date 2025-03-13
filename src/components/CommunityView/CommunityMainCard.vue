<script setup lang="ts">
import type { Comment, Like } from '@/types/community/communityType';
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  post: {
    id: string
    title: string
    image: string
    date: string
    authorName: string
    authorImage: string
    comments: Comment[]
    likes: Like[]
  }
}>()

// 기본 이미지 경로
const defaultBookImage = '/public/images/community-no-image.png'

// 책 이미지가 없으면 기본 이미지 사용
const bookImage = computed(() => (props.post.image ? props.post.image : defaultBookImage))

// 현재 이미지가 기본 이미지인지 체크
const isDefaultImage = computed(() => bookImage.value === defaultBookImage)

// // 댓글 개수 상태
// const commentCount = ref(0)

// // 좋아요 개수 상태
// const likeCount = ref(0)

// // 로컬 스토리지에서 댓글 개수 가져오는 함수
// const getCommentCount = (postId: string): number => {
//   const savedComments = localStorage.getItem(`comments_${postId}`)
//   return savedComments ? JSON.parse(savedComments).length : 0
// }

// // 로컬 스토리지에서 특정 게시물의 좋아요한 사용자 수 가져오는 함수
// const getLikeCount = (postId: string): number => {
//   let likeCount = 0

//   // 로컬 스토리지 전체 키 확인
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i)

//     // 로컬 스토리지에서 likedPosts_로 시작하는 키만 찾기 -> 사용자별 좋아요 데이터
//     if (key && key.startsWith('likedPosts_')) {
//       const savedLikes = localStorage.getItem(key)

//       try {
//         const parsedLikes = savedLikes ? JSON.parse(savedLikes) : []
//         if (Array.isArray(parsedLikes) && parsedLikes.includes(postId)) {
//           likeCount++
//         }
//       } catch (error) {
//         console.error(`❌ JSON 파싱 오류:`, error)
//       }
//     }
//   }

//   console.log(`${postId} 좋아요 개수:`, likeCount)
//   return likeCount
// }

// 페이지 로드될 때 댓글 및 좋아요 개수 불러오기
// onMounted(() => {
//   commentCount.value = getCommentCount(props.post.id)
//   likeCount.value = getLikeCount(props.post.id)
// })

const goToDetail = () => {
  router.push(`/community/${props.post.id}`)
}
</script>

<template>
  <div class="post-card" @click="goToDetail">
    <div class="post-info">
      <h3 class="post-title">{{ post.title }}</h3>
      <div class="user-info">
        <img
          :src="post.authorImage || '/images/user-dummy.png'"
          alt="유저 프로필"
          class="review-avatar"
        />
        <div>
          <span>{{ post.authorName }}</span>
        </div>
      </div>

      <div class="divider"></div>
      <div class="post-meta">
        <p>{{ post.date }}</p>
        <div class="post-meta-detail">
          <div class="icons-heart">
            <img src="/images/community-heart.png" alt="좋아요 아이콘" />
            <span>{{ post.likes.length }}</span>
          </div>

          <div class="icons-comment">
            <img src="/images/community-comment.png" alt="댓글 아이콘" />
            <span>{{ post.comments.length }}</span>
          </div>
        </div>
      </div>
    </div>
    <img :src="bookImage" :class="{ 'post-image': true, 'default-image': isDefaultImage }" alt="책표지" />
    <div class="new-post-badge">New</div>
  </div>
</template>

<style lang="scss" scoped>
.post-card {
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  width: 330px;
  height: 230px;
  background: white;
  color: $text-color-500;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 0px;
  margin-bottom: 10px;
  border: 3px solid #d4d8ff;
  border-radius: 10px;
  box-shadow: 0px 5px 10px #eaecff;
  transition: transform 0.3s ease,
  box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  .post-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .post-title {
    font-size: 24px;
    margin-top: 10px;
    min-height: 56px;
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

  .user-info {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: $text-size-200;
    color: $text-color-400;
    margin-top: 12px;
  }

  .review-avatar {
    width: 28px;
    height: 28px;
  }

  .post-date {
    font-size: 14px;
    color: $text-color-300;
  }

  .divider {
    width: 70%;
    height: 1px;
    background: $text-color-200;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .post-meta {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    color: $text-color-300;

    p {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 5px;
    }
  }

  .post-meta-detail {
    display: flex;
    flex-direction: row;
    gap: 25px;
    color: $text-color-300;
    align-items: center;
  }

  .meta-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  .icons-heart {
    display: flex;
    align-items: center;
    gap: 5px;

    img {
      width: 18px;
      height: 18px;
    }
  }

  .icons-comment {
    display: flex;
    align-items: center;
    gap: 5px;

    img {
      width: 22px;
      height: 22px;
    }
  }

  .post-image {
    width: 80px;
    height: 120px;
    position: absolute;
    bottom: 13px;
    right: 15px;
    box-shadow: 0px 1px 4px $text-color-300;
  }

  // 기본 이미지일 때 크기 조절
  .default-image {
    padding: 35px 20px;
  }

  .new-post-badge {
    width: 45px;
    height: 23px;
    position: absolute;
    top: 0;
    right: 0;
    background: $secondary-color-100;
    color: $text-color-600;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 10px;
  }
}
</style>
