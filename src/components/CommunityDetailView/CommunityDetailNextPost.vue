<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Post } from '@/types/community/communityType'

const router = useRouter()
const props = defineProps<{
  posts: Post[] // 전체 게시글 리스트
  currentPostId: string // 현재 게시글 ID
}>()

// 기존 Post 타입 확장 (다음 게시글을 위한)
interface ExtendedPost extends Post {
  computedImage: string
  isEmpty?: boolean
  backgroundColor?: string
  isDefault?: boolean
}

// 기본 이미지 경로
const defaultImage = '/images/community-no-image.png'
const emptyPostBackground = '#F5F5F5'

// 현재 게시글의 인덱스 찾기
const currentIndex = computed(() => props.posts.findIndex((p) => p.id === props.currentPostId))

// 다음 게시글 찾기 (최대 3개, 부족하면 이전 게시글로 채우기)
const nextPosts = computed<ExtendedPost[]>(() => {
  if (currentIndex.value === -1) return []

  let nextPosts: ExtendedPost[] = props.posts
    .slice(currentIndex.value + 1, currentIndex.value + 4)
    .map((post) => ({
      ...post,
      computedImage: post.image || defaultImage,
      isDefault: !post.image,
    }))

  // 가장 최신 게시글이면 -> 이전 게시글 3개 보여줌
  if (nextPosts.length === 0) {
    nextPosts = props.posts
      .slice(Math.max(0, currentIndex.value - 3), currentIndex.value)
      .map((post) => ({
        ...post,
        computedImage: post.image || defaultImage,
        isDefault: !post.image,
      }))
  }

  // 게시글이 3개일 때 2번째 게시글이라면 -> 이전 1개 + 다음 1개 보여줌
  if (props.posts.length === 3 && currentIndex.value === 1) {
    nextPosts = [
      {
        ...props.posts[currentIndex.value - 1],
        computedImage: props.posts[currentIndex.value - 1].image || defaultImage,
        isDefault: !props.posts[currentIndex.value - 1].image,
      },
      {
        ...props.posts[currentIndex.value + 1],
        computedImage: props.posts[currentIndex.value + 1].image || defaultImage,
        isDefault: !props.posts[currentIndex.value + 1].image,
      },
    ]
  }

  // 부족한 게시글 빈 슬롯으로 채우기
  while (nextPosts.length < 3) {
    nextPosts.push({
      id: '',
      title: '게시글 없음',
      image: '',
      computedImage: defaultImage,
      isDefault: true,
      isEmpty: true,
      backgroundColor: emptyPostBackground,
      category: '도서', // 기본 카테고리로 설정
      content: '',
      createdAt: '',
      userId: '',
      authorName: '',
    })
  }

  return nextPosts
})

// 게시글 상세페이지로 이동 (빈 슬롯 클릭 방지)
const goToDetail = (postId: string, isEmpty?: boolean) => {
  if (!postId || isEmpty) return
  window.scrollTo(0, 0)
  router.push(`/community/${postId}`)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-title">다음 게시글</div>
    <div class="next-posts">
      <div
        class="post-item"
        v-for="post in nextPosts"
        :key="post.id"
        @click="goToDetail(post.id, post.isEmpty)"
        :class="{ 'no-click': post.isEmpty }"
        :style="{ backgroundColor: post.backgroundColor }"
      >
        <img
          v-if="!post.isEmpty"
          :src="post.computedImage"
          :class="{ 'post-image': true, 'default-image': post.isDefault }"
          alt="다음 게시글"
        />
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sidebar-title {
  width: 200px;
  height: 52px;
  background-color: $text-color-500;
  color: white;
  border-radius: 10px 10px 0 0;
  text-align: center;
  line-height: 52px;
  font-weight: bold;
}

.next-posts {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.post-item {
  width: 200px;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  background-color: #f7f7f7;

  &:hover {
    transform: scale(1.05);
  }
}

.post-item.no-click {
  pointer-events: none;
  cursor: default;
  transform: none !important;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.post-image {
  width: 135px;
  height: 200px;
  object-fit: cover;
  margin: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}

.default-image {
  width: 135px;
  height: 200px;
  padding: 50px 20px;
  background-color: white;
  border: 1px solid #d1d1d1;
  object-fit: contain;
  box-shadow: none;
}
</style>
