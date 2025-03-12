<script setup lang="ts">
import { defineProps, ref, useTemplateRef } from 'vue';
import { type devComment } from '@/types/devcourse/devComment';
import { createComment } from '@/apis/devcourse/Comment/createComment';
import { useAuthStore } from '@/stores/auth';
import { deleteComment } from '@/apis/devcourse/Comment/deleteComment';
import { type devPost } from '@/types/devcourse/devPost';
import { RouterLink } from 'vue-router';
import { deletePost } from '@/apis/devcourse/Post/deletePost';

// props 타입 정의
interface CommentSectionProps {
  comments : devComment[],
  onUpdateComment : (id: number)=>void,
  color: string,
  postId: string,
}
const props = defineProps<CommentSectionProps>();

// 댓글 삭제 함수 (props로 전달받음)
// const handleCommentDelete = (index: number) => {
//   props.onDeleteComment(index);
// };

const auth = useAuthStore();
const newComment = ref<boolean>(false);
const commentContents = ref<string>('');
function HandleInput(e : Event) {
  const element = e.target as HTMLDivElement;
  commentContents.value = element.innerText;
}
const updateIndex = ref<number>(-1);
const commentTextBoxes = useTemplateRef<HTMLInputElement[]>('commentTextBox');
</script>

<template>
  <div>
    <h5 class="mb-4">
      <span :style="{ color: 'var(--gray-7)' }">댓글 </span>
      <span :style="{ color: color === 'red' ? 'var(--primary-red)' : 'var(--primary-blue)' }">{{
        props.comments.length
      }}</span>
      <span :style="{ color: 'var(--gray-7)' }">개</span>
    </h5>

    <div
      v-for="(comment, index) in props.comments"
      :key="index"
      class="border p-3 mb-3 rounded-3"
      :style="{
        backgroundColor: color === 'red' ? 'var(--gray-1)' : 'var(--primary-blue-light)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }"
    >
      <div class="d-flex align-items-center mb-3">
        <img
          :src="comment.author.image"
          alt="user-profile"
          class="rounded-circle me-2"
          width="40"
          height="40"
        />
        <div>
          <p
            class="mb-0 fw-bold"
            :style="{ color: color === 'red' ? 'var(--primary-red)' : 'var(--primary-blue)' }"
          >
            {{ comment.author.fullName }}
          </p>
          <p class="mb-0 text-muted" style="font-size: 14px">{{ (new Date(comment.updatedAt)).toLocaleDateString() + ' ' + (new Date(comment.updatedAt)).toLocaleTimeString() }}</p>
        </div>
      </div>

      <input ref="commentTextBox" :disabled="updateIndex !== index" type="text" name="" id="" :value="comment.comment" class="border-0" style="width: 90%">

      <div v-if="auth.user?._id === comment.author._id" class="position-absolute bottom-0 end-0 mb-2 me-2">
        <button
          v-if="index !== updateIndex"
          class="btn btn-sm"
          @click="async (e)=>{
            updateIndex = index;
          }"
          :style="{
            color: color === 'red' ? 'var(--primary-red)' : 'var(--primary-blue)',
          }"
        >
          수정
        </button>
        <button
          v-if="index === updateIndex"
          class="btn btn-sm"
          @click="async (e)=>{
            await deleteComment({id: comment._id});
            await createComment({postId: props.postId, comment: commentTextBoxes ? commentTextBoxes[index].value : '' });
            props.onUpdateComment(1);
            updateIndex = -1;
          }"
          :style="{
            color: 'var(--primary-green)',
          }"
        >
          완료
        </button>
        <button
          class="btn btn-sm"
          @click="async (e)=>{await deleteComment({id: comment._id}); props.onUpdateComment(1); }"
          :style="{
            color: color === 'red' ? 'var(--primary-red)' : 'var(--primary-blue)',
          }"
        >
          삭제
        </button>
      </div>
    </div>

    <div class="w-100 rounded py-3">
      <div v-if="auth.isAuth">
        <div v-if="newComment"
        class="border p-3 mb-3 rounded-3"
        :style="{
          backgroundColor: color === 'red' ? 'var(--gray-1)' : 'var(--primary-blue-light)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          height: 'fit-content',
        }"
        >
          <div class="d-flex align-items-center mb-3">
            <img
              :src="auth.user?.image"
              alt="user-profile"
              class="rounded-circle me-2"
              width="40"
              height="40"
            />
            <div>
              <p
                class="mb-0 fw-bold"
                :style="{ color: color === 'red' ? 'var(--primary-red)' : 'var(--primary-blue)' }"
              >
                {{ auth.user?.fullName }}
              </p>
            </div>
          </div>
          <div contenteditable="plaintext-only" class="w-100 border border-2 border-secondary-red rounded" style="outline: none;" @input="(e)=>HandleInput(e)"/>
          <div class="d-flex gap-3 mt-3">
            <button class="btn bg-primary-green text-gray-1" @click="async ()=>{
              await createComment({postId: props.postId, comment: commentContents});
              commentContents = '';
              newComment = false;
              props.onUpdateComment(1);
            }
            ">제출하기</button>
            <button class="btn bg-primary-red text-gray-1" @click="()=>{ commentContents=''; newComment=false; }">취소하기</button>
          </div>
        </div>
        <button class="btn bg-gray-3 w-100 p-2 mt-2" @click="newComment = true">
          <p class="m-0 p-0">새 댓글 작성하기</p>
        </button>
      </div>
      <div v-if="!auth.isAuth" class="d-flex flex-column align-items-center">
        <p class="m-0 p-0 text-primary-purple">댓글을 작성하기 위해서는 로그인이 필요합니다.</p>
        <RouterLink class="btn bg-primary-purple w-100 p-2 mt-2 text-gray-1" to="/login">
          <p class="m-0 p-0">로그인</p>
        </RouterLink>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* 추가 스타일 */
</style>
