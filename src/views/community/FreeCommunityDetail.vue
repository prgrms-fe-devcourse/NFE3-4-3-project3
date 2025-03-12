<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CommentSection from '@/components/community/CommentSection.vue';
import { getPost } from '@/apis/devcourse/Post/getPost';
import { deletePost } from '@/apis/devcourse/Post/deletePost';
import { updatePost } from '@/apis/devcourse/Post/updatePost';
import { devPost } from '@/types/devcourse/devPost';
import { devUser } from '@/types/devcourse/devUser';
import { devComment } from '@/types/devcourse/devComment';

const route = useRoute();
const router = useRouter();
const postId = route.params.postId as string;

// 현재 로그인한 사용자 정보를 가져오기
const currentUser = ref<devUser | null>(null);
onMounted(() => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    try {
      currentUser.value = JSON.parse(storedUser);
    } catch (e) {
      console.error('현재 사용자 파싱 에러:', e);
    }
  } else {
    const uid = localStorage.getItem('uid');
    if (uid) {
      currentUser.value = {
        _id: uid,
        fullName: '',
        email: '',
        image: '',
      } as devUser;
    }
  }
});

// 게시글 데이터를 저장할 ref
interface parsedPostData {
  author: devUser;
  title: string;
  content: string;
  image: string;
  imagePublicId?: string;
  comments: devComment[];
  id: string;
  channelId?: string;
  createdAt: string;
}
const post = ref<parsedPostData | null>(null);

// 게시글 수정정 관련 변수
const isEditing = ref(false);
const editTitle = ref('');
const editContent = ref('');
const selectedImage = ref<File | null>(null);

onMounted(async () => {
  try {
    const response = (await getPost({ id: postId })).post;
    const parsedTitle = JSON.parse(response.title);
    post.value = {
      author: response.author,
      title: parsedTitle.title,
      content: parsedTitle.content,
      image: response.image ?? '',
      imagePublicId: response.imagePublicId,
      comments: response.comments,
      id: response._id,
      channelId: response.channel?._id,
      createdAt: response.createdAt,
    };

    editTitle.value = parsedTitle.title;
    editContent.value = parsedTitle.content;
  } catch (e) {
    console.error('게시글 불러오기 에러:', e);
  }
});

// 파일 선택 핸들러
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedImage.value = target.files[0];
  }
};

// 게시글 삭제 함수
const handleDelete = async () => {
  try {
    const response = await deletePost({ id: postId });
    console.log('게시글 삭제:', response.post._id);
    router.push('/community/free');
  } catch (error) {
    console.error('게시글 삭제 에러:', error);
  }
};

// 수정 모드 전환
const toggleEdit = () => {
  isEditing.value = true;
};

// 게시글 수정 제출 함수
const handleUpdateSubmit = async () => {
  try {
    const newTitle = JSON.stringify({ title: editTitle.value, content: editContent.value });
    const response = await updatePost({
      postId: postId,
      title: newTitle,
      channelId: post.value?.channelId || '',
      image: selectedImage.value || undefined,
      imageToDeletePublicId: selectedImage.value ? post.value?.imagePublicId || '' : undefined,
    });
    console.log('게시글 수정:', response.post._id);
    const updatedParsedTitle = JSON.parse(response.post.title);
    post.value = {
      author: response.post.author,
      title: updatedParsedTitle.title,
      content: updatedParsedTitle.content,
      image: response.post.image ?? '',
      imagePublicId: response.post.imagePublicId,
      comments: response.post.comments,
      id: response.post._id,
      channelId: response.post.channel?._id,
      createdAt: response.post.createdAt,
    };
    isEditing.value = false;
    selectedImage.value = null;
  } catch (error) {
    console.error('게시글 수정 에러:', error);
  }
};

// 수정 취소
const cancelEdit = () => {
  if (post.value) {
    editTitle.value = post.value.title;
    editContent.value = post.value.content;
  }
  isEditing.value = false;
  selectedImage.value = null;
};

// 댓글 업데이트 함수
const handleCommentUpdate = async (index: number) => {
  try {
    const response = (await getPost({ id: postId })).post;
    const parsedTitle = JSON.parse(response.title);
    post.value = {
      author: response.author,
      title: parsedTitle.title,
      content: parsedTitle.content,
      image: response.image ?? '',
      imagePublicId: response.imagePublicId,
      comments: response.comments,
      id: response._id,
      channelId: response.channel?._id,
      createdAt: response.createdAt,
    };
  } catch (error) {
    console.error('댓글 업데이트 에러:', error);
  }
};
</script>

<template>
  <div class="container my-5 full-height" v-if="post">
    <!-- 편집 모드일 때 -->
    <div v-if="isEditing">
      <div class="mb-4">
        <label for="editTitle" class="form-label">제목</label>
        <input id="editTitle" type="text" class="form-control" v-model="editTitle" />
      </div>
      <div class="mb-4">
        <label for="editContent" class="form-label">내용</label>
        <textarea id="editContent" class="form-control" rows="15" v-model="editContent"></textarea>
      </div>
      <div class="mb-5">
        <label for="editImage" class="form-label">새로운 이미지 선택 (선택사항)</label>
        <input id="editImage" type="file" class="form-control" @change="handleFileChange" />
      </div>
      <div class="d-flex justify-content-center gap-2 mt-3">
        <button
          class="btn px-4 py-2 hover-effect"
          style="background-color: var(--primary-purple); color: var(--gray-1); border-radius: 30px"
          @click="handleUpdateSubmit"
        >
          저장하기
        </button>
        <button
          class="btn px-4 py-2 hover-effect"
          style="
            border: 2px solid var(--primary-red);
            color: var(--primary-red);
            border-radius: 30px;
          "
          @click="cancelEdit"
        >
          취소하기
        </button>
      </div>
    </div>

    <div v-else>
      <div class="row" style="align-items: flex-start">
        <!-- 텍스트 영역 -->
        <div
          class="col-md-8"
          style="background-color: var(--gray-3); border-radius: 8px; padding: 20px"
        >
          <div class="d-flex align-items-start mb-4">
            <!-- 프로필 이미지 영역 -->
            <div class="profile-image">
              <img
                :src="post.author.image"
                alt="user-profile"
                class="rounded-circle"
                width="50"
                height="50"
              />
            </div>
            <!-- 작성자 정보 영역 -->
            <div class="author-info ms-2">
              <h5 class="mb-0">{{ post.author.fullName }}</h5>
              <small class="text-muted"> {{ new Date(post.createdAt).toLocaleString() }}</small>
            </div>
          </div>

          <h2 class="mb-4 fw-bold">{{ post.title }}</h2>
          <p class="mb-4">{{ post.content }}</p>
        </div>

        <!-- 이미지 영역 -->
        <div class="col-md-4">
          <div style="width: 100%; position: relative; border-radius: 8px">
            <img
              :src="post.image || undefined"
              alt="community-image"
              class="img-fluid"
              style="
                width: auto;
                max-width: 100%;
                height: auto;
                max-height: 800px;
                display: block;
                margin: 0 auto;
                object-fit: contain;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
              "
            />
          </div>
        </div>
      </div>
      <!-- 수정, 삭제 버튼 -->
      <div
        v-if="currentUser && post.author._id === currentUser._id"
        class="d-flex justify-content-end gap-2 my-5"
      >
        <button
          class="btn px-4 py-2 hover-effect"
          style="background-color: var(--primary-purple); color: var(--gray-1); border-radius: 30px"
          @click="toggleEdit"
        >
          수정하기
        </button>
        <button
          class="btn px-4 py-2 hover-effect"
          style="
            border: 2px solid var(--primary-red);
            color: var(--primary-red);
            border-radius: 30px;
          "
          @click="handleDelete"
        >
          삭제하기
        </button>
      </div>

      <!-- 댓글 섹션 -->
      <CommentSection
        :comments="post.comments"
        :onUpdateComment="handleCommentUpdate"
        color="red"
        :postId="post.id"
      />
    </div>
  </div>
</template>

<style scoped>
.hover-effect {
  transition: all 0.3s ease;
}
.hover-effect:hover {
  font-weight: 600;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
