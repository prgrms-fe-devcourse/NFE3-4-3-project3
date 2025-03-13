<template>
  <div class="user-card-wrap">
    <div class="user-card-header">
      <img v-if="profileImage" :src="profileImage" alt="유저 이미지" class="user-image">
      <img v-else src="/images/user-dummy.png" alt="유저 이미지" class="user-image">

      <div class="user-card-header-info">
        <p class="user-name">{{ fullName }} 님</p>
        <div class="image-upload-container">
          <input type="file" ref="fileInput" accept="image/*" @change="handleImageUpload" class="hidden-input">
          <p class="user-image-upload" @click="triggerFileInput">이미지 업로드</p>
        </div>
      </div>
    </div>

    <div class="user-card-body">
      <p class="user-info-title">이름</p>
      <div class="user-info-content">
        <span v-if="!isEditingName">{{ fullName }}</span>
        <input v-else v-model="editedName" type="text" class="edit-input">
        <button type="button" @click="handleNameEdit">
          {{ isEditingName ? '저장' : '수정' }}
        </button>
      </div>
      <p class="user-info-title">이메일</p>
      <div class="user-info-content">
        <span>{{ email }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { updateUserInfo, uploadUserImage } from '@/apis/user';
import { useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue'

const props = defineProps<{
  fullName: string
  email: string
  profileImage?: string
  userId: string
}>()

const queryClient = useQueryClient()

const isEditingName = ref(false)

const editedName = ref(props.fullName)

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  try {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('isCover', 'false')

    const response = await uploadUserImage(formData)

    if (response) {
      queryClient.invalidateQueries({ queryKey: ['userInfo', props.userId] })
    } else {
      alert('이미지 업데이트 실패')
    }
  } catch (error) {
    console.error('이미지 업로드 실패:', error)
  }
}

const handleNameEdit = async () => {
  if (isEditingName.value) {

    try {
      const response = await updateUserInfo(editedName.value);

      if (response) {
        queryClient.invalidateQueries({ queryKey: ['userInfo', props.userId] })
      } else {
        alert('이름 업데이트 실패')
      }
    } catch (error) {
      console.error(error)
    }
  }
  isEditingName.value = !isEditingName.value
}
</script>

<style lang="scss" scoped>
.user-card-wrap {

  .user-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 23px;

    .user-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-card-header-info {
      text-align: right;

      .user-name {
        font-size: 28px;
        margin-bottom: 12px;
        color: #222;
      }

      .image-upload-container {
        position: relative;

        .hidden-input {
          display: none;
        }

        .user-image-upload {
          font-size: 12px;
          padding: .5rem 1rem;
          background-color: #F0EFFA;
          display: inline-block;
          border-radius: 12px;
          cursor: pointer;

          &:hover {
            background-color: #E5E3F5;
          }
        }
      }
    }
  }

  .user-card-body {
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
    padding: 18px 16px;
    margin-bottom: 23px;

    .user-info-title {
      margin-bottom: 10px;
      font-size: 12px;
      color: #434343;
    }

    .user-info-content {
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 14px;
        color: #434343;
        padding: 6px;
      }

      button {
        font-size: 12px;
        color: #fff;
        background-color: $secondary-color-300;
        padding: 4px 18px;
        border-radius: 12px;
        border: none;
        cursor: pointer;
      }

      .edit-input {
        font-size: 14px;
        color: #434343;
        border: 1px solid #EBEBEE;
        border-radius: 4px;
        padding: 4px 8px;
        width: 200px;
      }
    }
  }
}
</style>
