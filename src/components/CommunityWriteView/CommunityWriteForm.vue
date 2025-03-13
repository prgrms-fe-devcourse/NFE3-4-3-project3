<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message, type UploadProps } from 'ant-design-vue'
import type { NewPost, Post } from '@/types/community/communityType'
import { createPost, fetchPosts } from '@/apis/community/post'
import { useAuthStore } from '@/stores/authStore'
import { useQueryClient } from '@tanstack/vue-query'
const authStore = useAuthStore()
const userId = authStore.userId

const props = defineProps<{ existingPost?: Post }>()
const emit = defineEmits(['postCreated', 'postUpdated'])
const queryClient = useQueryClient()
const categories = ['도서', '공연/행사']
const selectedCategory = ref(props.existingPost?.category || '도서')
const title = ref(props.existingPost?.title || '')
const content = ref(props.existingPost?.content || '')
const fileList = ref<UploadProps['fileList']>([])

// 제목과 내용 글자수 제한
const TITLE_MAX_LENGTH = 45
const CONTENT_MAX_LENGTH = 650

// 기존 이미지가 있다면 표시
if (props.existingPost?.image) {
  fileList.value = [
    {
      uid: '-1',
      name: '기존 이미지',
      status: 'done',
      url: props.existingPost.image,
    },
  ]
}

// 제목 입력할 때 글자수 제한
const handleTitleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  title.value = target.value.slice(0, TITLE_MAX_LENGTH)
}

// 제목 복붙할 때 글자수 제한
const handleTitlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedText = event.clipboardData?.getData('text') || ''
  title.value = (title.value + pastedText).slice(0, TITLE_MAX_LENGTH)
}

// 내용 입력할 때 글자수 제한
const handleContentInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  content.value = target.value.slice(0, CONTENT_MAX_LENGTH)
}

// 내용 복붙할 때 글자수 제한
const handleContentPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedText = event.clipboardData?.getData('text') || ''
  content.value = (content.value + pastedText).slice(0, CONTENT_MAX_LENGTH)
}

const handleFileChange: UploadProps['onChange'] = (info) => {
  fileList.value = info.fileList
}

const handleSubmit = async () => {
  const imageFile = fileList.value?.[0]?.originFileObj ?? null

  if (props.existingPost) {
    const updatedPost: Post = {
      id: props.existingPost.id,
      category: selectedCategory.value,
      title: title.value,
      content: content.value,
      image: props.existingPost.image || null,
      createdAt: props.existingPost.createdAt || '',
      userId: props.existingPost.userId,
      authorName: props.existingPost.authorName,
    }

    emit('postUpdated', updatedPost, imageFile)
  } else {
    if (!userId) {
      alert('로그인이 필요합니다!')
      return
    }

    const postData: NewPost = {
      category: selectedCategory.value,
      title: title.value,
      content: content.value,
      userId,
      authorName: authStore.fullName ?? '익명',
    }

    await createPost(postData, imageFile)
    emit('postCreated')
  }

  await fetchPosts()

  queryClient.refetchQueries({ queryKey: ['userInfo', userId] })

  message.success({
    content: props.existingPost ? '게시글이 수정되었습니다!' : '게시글이 등록되었습니다!',
    duration: 1, // 4초 동안 표시
    style: {
      fontSize: '15px',
      fontWeight: 'bold',
    },
  })
}
</script>

<template>
  <div class="post-form-container">
    <h2 class="form-title">{{ existingPost ? '📝 게시글 수정' : '✏️ 게시글 쓰기' }}</h2>

    <a-card class="form-card">
      <a-form layout="vertical">
        <a-form-item label="카테고리">
          <a-select v-model:value="selectedCategory">
            <a-select-option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="제목">
          <a-input v-model:value="title" placeholder="제목을 입력해 주세요" @input="handleTitleInput"
            @paste="handleTitlePaste" />
          <div class="char-count">{{ title.length }} / {{ TITLE_MAX_LENGTH }}</div>
        </a-form-item>

        <a-form-item label="내용">
          <a-textarea v-model:value="content" placeholder="내용을 입력해 주세요" :rows="10" @input="handleContentInput"
            @paste="handleContentPaste" />
          <div class="char-count">{{ content.length }} / {{ CONTENT_MAX_LENGTH }}</div>
        </a-form-item>

        <a-form-item label="사진 업로드 (선택)">
          <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture" :before-upload="() => false" @change="handleFileChange">
            <a-button>
              <upload-outlined />
              파일 선택
            </a-button>
          </a-upload>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" block @click="handleSubmit">
            {{ existingPost ? '수정 완료' : '작성 완료' }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.post-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;

  .form-title {
    font-size: $text-size-500;
    font-weight: bold;
    margin-bottom: 20px;
    align-self: flex-start;
    text-align: left;
    width: 100%;
  }

  .form-card {
    width: 900px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    :deep(.ant-form) {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* 카테고리 셀렉트 높이 조정 */
    :deep(.ant-select-selector) {
      height: 43px !important;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    /* 마지막 버튼과 마지막 폼 요소 간 간격 */
    :deep(.ant-form-item:last-child) {
      margin-top: 24px;
    }
  }

  .char-count {
    font-size: 14px;
    text-align: right;
    margin-top: 5px;
    color: $text-color-300;
  }

  /* 업로드한 파일 간격 */
  :deep(.ant-upload-list-item) {
    width: auto;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  /* 작성완료 버튼 스타일 */
  :deep(.ant-btn-primary) {
    background-color: $secondary-color-300 !important;
    height: 55px !important;
    font-weight: bold;
  }

  /* 각 label 폰트 설정 */
  :deep(.ant-form-item-label > label) {
    font-size: $text-size-300 !important;
    font-weight: bold;
  }

  /* input창 설정 */
  :deep(.ant-input) {
    padding: 10px 10px;
    font-size: $text-size-200;
  }

  /* 파일선택 버튼 설정 */
  :deep(.ant-upload) {
    font-size: 16px;
    border-radius: 8px;
  }

  :deep(.ant-btn) {
    padding: 8px 15px;
    font-size: 16px;
    height: 40px;
    border-radius: 8px;
  }

  /* 업로드한 파일 리스트 설정 */
  :deep(.ant-upload-list-item) {
    margin-top: 10px; // 업로드한 파일과 버튼에 간격 추가
  }
}
</style>
