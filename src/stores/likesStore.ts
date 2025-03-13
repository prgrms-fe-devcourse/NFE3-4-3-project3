// 좋아요 스토어

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLikesStore = defineStore('likes', () => {
  const userId = ref<string | null>(localStorage.getItem('userId'))
  const likedPosts = ref<string[]>([])

  // userId별 좋아요 데이터 불러오기
  const loadLikes = () => {
    if (userId.value) {
      const storedLikes = JSON.parse(localStorage.getItem(`likedPosts_${userId.value}`) || '[]')
      likedPosts.value = storedLikes
    }
  }

  // 로그인한 사용자 ID 설정
  const setUser = (newUserId: string | null) => {
    userId.value = newUserId

    if (newUserId) {
      loadLikes()
    } else {
      likedPosts.value = [] // -> 로그아웃 시 초기화
    }
  }

  const toggleLike = (postId: string) => {
    if (!userId.value) return // -> 로그인 안 하면 저장X

    const index = likedPosts.value.indexOf(postId)
    if (index === -1) {
      likedPosts.value.push(postId)
    } else {
      likedPosts.value.splice(index, 1)
    }

    localStorage.setItem(`likedPosts_${userId.value}`, JSON.stringify(likedPosts.value))
  }

  // 로그아웃 시 좋아요 정보도 삭제됨
  const clearLikes = () => {
    if (userId.value) {
      localStorage.removeItem(`likedPosts_${userId.value}`)
    }
    likedPosts.value = []
    userId.value = null
  }

  return { userId, likedPosts, setUser, toggleLike, loadLikes, clearLikes }
})
