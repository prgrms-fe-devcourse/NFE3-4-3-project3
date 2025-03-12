<script setup lang="ts">
export interface CommunityPostsSlideData {
  mainImgUrl : string;
  postBy : string;
  avatarImgUrl : string;
  title : string;
  content : string;
  numLikes : number;
  numComments : number;
  createdAt : Date;
}
interface CommunityPostSlideProps {
  data : CommunityPostsSlideData;
}
const props = defineProps<CommunityPostSlideProps>();
const dateFormat =
  props.data.createdAt.getFullYear().toString() + '/' +
  props.data.createdAt.getMonth().toString() + '/' +
  props.data.createdAt.getDay().toString();
</script>

<template>
  <div class="d-flex flex-column gap-1 bg-white rounded-3">
    <img class="rounded-top-3 bg-gray-10" :src="props.data.mainImgUrl" alt="">
    <div class="p-3">
      <div class="d-flex align-items-center mb-2 gap-2">
        <div class="bg-primary" style="height: 35px; aspect-ratio: 1/1; border-radius: 100%"></div>
        <p class="m-0 p-0 post-by-text text-gray-7">{{ props.data.postBy }}</p>
      </div>
      <p class="m-0 p-0 title-text mb-2" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" >
        {{ props.data.title }}
      </p>
      <p class="m-0 p-0 content-text mb-2" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        {{ props.data.content }}
      </p>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="d-flex gap-2 align-items-center">
          <i class="m-0 p-0 bi-heart-fill heart"></i>
          <p class="m-0 p-0"><b>{{ props.data.numLikes }}</b></p>
          <i class="m-0 p-0 bi-chat chat"></i>
          <p class="m-0 p-0"><b>{{ props.data.numComments }}</b></p>
        </div>
        <p class="m-0 p-0 date-text">{{ dateFormat }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heart {
  color: red;
  font-size: 1.25rem;
}
.chat {
  font-size: 1.25rem;
}
.title-text {
  font-family: 'Pretendard';
  font-weight: bold;
  font-size: 20px;
}
.content-text {
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
}
.date-text {
  font-family: 'Pretendard';
  font-weight: bold;
  font-size: 16px;
}
</style>
