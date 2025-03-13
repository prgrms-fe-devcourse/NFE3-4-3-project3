import type { NewPost, Post } from '../../types/community/communityType'
import { useAuthStore } from '../../stores/authStore'
import axiosApi from '../../config/axiosConfig'
import { POST_ENDPOINT } from '../endpoint'

// 채널 아이디
const CHANNEL_ID = '67c5950406e63d3cffd3bb41'

// API 응답 타입
interface ApiPostResponse {
  _id: string
  title: string
  image?: string
  createdAt?: string | null
  author: {
    _id: string
    fullName: string
    image?: string
  }
  comments: string[]
  likes: string[]
}

// 현재 로그인된 사용자 정보 가져오기 (전역에서 호출하면 안됨?)
const getAuthToken = () => {
  const authStore = useAuthStore()
  return authStore.token
}

const getUserId = () => {
  const authStore = useAuthStore()
  return authStore.userId
}

const isAuthenticated = () => {
  const authStore = useAuthStore()
  return !!authStore.token
}

// 게시글 조회
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosApi.get<ApiPostResponse[]>(`/posts/channel/${CHANNEL_ID}`)
    return response.data.map((post): Post => {
      let category: '도서' | '공연/행사' = '도서'
      let title = post.title
      let content = ''

      try {
        if (title.startsWith('{') && title.endsWith('}')) {
          const parsedData = JSON.parse(title)
          category = parsedData.category ?? '도서'
          title = parsedData.title ?? post.title
          content = parsedData.content ?? ''
        }
      } catch (error) {
        console.warn('⛔️ JSON 파싱 실패, 일반 문자열로 처리:', error)
      }

      return {
        id: post._id,
        category,
        title,
        content,
        image: post.image || null,
        createdAt: post.createdAt || '',
        userId: post.author?._id ?? '익명 아이디',
        authorName: post.author?.fullName ?? '익명 사용자',
        authorImage: post.author?.image || '/images/user-dummy.png', // 프로필 사진
        comments: post.comments,
        likes: post.likes,
        authorId: post.author?._id ?? '',
      }
    })
  } catch (error) {
    console.error('❌ 게시글 조회 실패:', error)
    return []
  }
}

// 게시글 생성
export const createPost = async (post: NewPost, imageFile: File | null) => {
  try {
    if (!isAuthenticated()) {
      alert('로그인이 필요합니다!')
      return
    }

    const token = getAuthToken()
    const author = getUserId()
    if (!author) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.')
      return
    }

    const jsonData = JSON.stringify({
      category: post.category,
      title: post.title,
      content: post.content, // -> content 필드 추가
    })

    const formData = new FormData()
    formData.append('title', jsonData)
    if (imageFile) formData.append('image', imageFile)
    formData.append('channelId', CHANNEL_ID)

    await axiosApi.post('/posts/create', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.error('❌ 게시글 추가 실패:', error)
  }
}

// 게시글 수정
export const updatePost = async (
  postId: string,
  updatedPost: Post,
  imageFile: File | null,
  imageToDeletePublicId?: string,
) => {
  try {
    const token = getAuthToken()
    const formData = new FormData()

    const jsonData = JSON.stringify({
      category: updatedPost.category,
      title: updatedPost.title,
      content: updatedPost.content, // -> content 필드 추가
    })

    formData.append('title', jsonData)
    if (imageFile) formData.append('image', imageFile)
    if (imageToDeletePublicId) formData.append('imageToDeletePublicId', imageToDeletePublicId)
    formData.append('postId', postId)
    formData.append('channelId', CHANNEL_ID)

    const response = await axiosApi.put('/posts/update', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    if (!response || !response.data) {
      throw new Error('서버 응답이 올바르지 않습니다.')
    }
    return response.data
  } catch (error) {
    console.error('❌ 게시글 수정 실패:', error)
    throw error
  }
}

// 게시글 삭제
export const deletePost = async (postId: string, author: string) => {
  if (author !== getUserId()) {
    alert('작성자만 삭제할 수 있습니다!')
    return
  }

  try {
    const token = getAuthToken()
    await axiosApi.delete('/posts/delete', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id: postId },
    })
  } catch (error) {
    console.error('❌ 게시글 삭제 실패:', error)
  }
}

// 댓글 작성
export const createComment = async (postId: string, comment: string, token: string) => {
  try {
    const response = await axiosApi.post(
      '/comments/create',
      { postId, comment },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return response.data
  } catch (error) {
    console.error('❌ 댓글 작성 실패:', error)
    throw error
  }
}

// 댓글 삭제
export const deleteComment = async (commentId: string, token: string) => {
  try {
    await axiosApi.delete('/comments/delete', {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: commentId },
    })
  } catch (error) {
    console.error('❌ 댓글 삭제 실패:', error)
    throw error
  }
}

export const postLike = async (postId: string) => {
  try {
    const response = await axiosApi.post(POST_ENDPOINT.postLike, { postId })
    return response.data
  } catch (error) {
    console.error('❌ 게시글 좋아요 실패:', error)
    throw error
  }
}

export const postUnlike = async (id: string) => {
  try {
    await axiosApi.delete(POST_ENDPOINT.postUnLike, { data: { id } })
  } catch (error) {
    console.error('❌ 게시글 좋아요 취소 실패:', error)
    throw error
  }
}
