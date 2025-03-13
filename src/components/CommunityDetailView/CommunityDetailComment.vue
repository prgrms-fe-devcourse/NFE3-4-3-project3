<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { createComment, deleteComment } from '@/apis/community/post'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ko' // 한국어 로케일 추가
import router from '@/router'
import { Modal } from 'ant-design-vue'

dayjs.extend(relativeTime)
dayjs.extend(utc) // UTC 플러그인 추가
dayjs.extend(timezone) // 타임존 플러그인 추가
dayjs.locale('ko') // 한국어로 설정
dayjs.tz.setDefault('Asia/Seoul') // 기본 타임존을 한국(KST)으로 설정

const authStore = useAuthStore()
const userId = ref(authStore.userId ?? '')
const token = ref(authStore.token ?? '')
const props = defineProps<{ postId: string }>()

const submitting = ref<boolean>(false)
const value = ref<string>('')

// 로컬 스토리지에서 기존 댓글 불러오기
const getStoredComments = () => {
  const saved = localStorage.getItem(`comments_${props.postId}`)
  return saved ? JSON.parse(saved) : []
}

// 댓글 리스트
const comments =
  ref<{ id: string; author: string; avatar: string; content: string; datetime: string }[]>(
    getStoredComments(),
  )

// 댓글 리스트 로컬 스토리지에 저장
const saveCommentsToStorage = () => {
  localStorage.setItem(`comments_${props.postId}`, JSON.stringify(comments.value))
}

// 댓글 시간 업데이트...?
setInterval(() => {
  comments.value = comments.value.map((comment) => ({
    ...comment,
    relativeTime: dayjs(comment.datetime).locale('ko').fromNow(),
  }))
}, 60000)

// 댓글 작성
const handleSubmit = async () => {
  if (!value.value.trim()) return
  if (!userId.value) {
    Modal.warning({
      title: '로그인 필요',
      content: '댓글을 작성하려면 로그인이 필요합니다.',
      okText: '로그인하기',
      okButtonProps: {
        // style 타입 에러 -> SCSS에서 따로 스타일 줘도 에러남...
        style: {
          backgroundColor: '#6472fc', // 버튼 색깔
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
        },
      },
      onOk() {
        router.push('/login')
      },
    })
    return
  }

  submitting.value = true
  try {
    const response = await createComment(props.postId, value.value, token.value)

    // 댓글을 리스트에 추가 + 로컬 스토리지 저장
    const newComment = {
      id: response._id,
      author: authStore.fullName ?? '익명',
      avatar: '/images/user-dummy.png',
      content: response.comment,
      datetime: response.createdAt,
    }
    comments.value.unshift(newComment)
    saveCommentsToStorage()
    value.value = ''
  } catch (error) {
    console.error('❌ 댓글 작성 실패:', error)
    alert('댓글 작성 중 오류가 발생했습니다.')
  } finally {
    submitting.value = false
  }
}

// 댓글 삭제 (서버 + 로컬)
const handleDelete = async (commentId: string) => {
  if (!confirm('댓글을 삭제하시겠습니까?')) return

  try {
    await deleteComment(commentId, token.value)
    comments.value = comments.value.filter((c) => c.id !== commentId)
    saveCommentsToStorage()
  } catch (error) {
    console.error('❌ 댓글 삭제 실패:', error)
    alert('댓글 삭제 중 오류가 발생했습니다.')
  }
}

// postId가 바뀌면 새로운 댓글 로드
watch(
  () => props.postId,
  (newPostId) => {
    if (newPostId) {
      comments.value = getStoredComments()
    }
  },
)

// 컴포넌트 마운트 시 로컬 스토리지에서 댓글 불러오기
onMounted(() => {
  dayjs.locale('ko')
  comments.value = getStoredComments()
})
</script>

<template>
  <div class="comments-container">
    <div class="comment-title">댓글</div>

    <a-comment>
      <template #avatar>
        <a-avatar src="/images/user-dummy.png" alt="User Avatar" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" placeholder="댓글을 입력하세요." />
        </a-form-item>
        <a-form-item class="comment-submit">
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            등록
          </a-button>
        </a-form-item>
      </template>
    </a-comment>

    <a-list v-if="comments.length" :data-source="comments" item-layout="horizontal">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment :author="item.author" :avatar="item.avatar" :content="item.content">
            <template #datetime>
              <a-tooltip>
                <span>{{ dayjs(item.datetime).locale('ko').fromNow() }}</span>
              </a-tooltip>
            </template>
            <template #actions>
              <span
                v-if="item.author === authStore.fullName"
                @click="handleDelete(item.id)"
                class="delete-icon"
              >
                <DeleteOutlined />
              </span>
            </template>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style lang="scss" scoped>
.comments-container {
  width: 90%;
  max-width: 800px;
  margin-left: 50px;
  flex-grow: 1;
}

a-list-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

:deep(.ant-btn-primary) {
  width: 70px;
  background-color: $secondary-color-300 !important;
  color: white !important;
  border-radius: 10px;
  margin-top: 20px;
}

.comment-title {
  font-size: $text-size-400;
  font-weight: bold;
  margin: 0;
  padding-bottom: 5px;
}

.comment-submit {
  display: flex;
  justify-content: flex-end;
}

/* 댓글 input창 */
:deep(.ant-input) {
  padding: 10px 12px !important;
  font-size: 14px;
}

/* placeholder와 텍스트 사이 간격 조정 */
:deep(.ant-input::placeholder) {
  line-height: 1.8;
  color: $text-color-200;
}
</style>
