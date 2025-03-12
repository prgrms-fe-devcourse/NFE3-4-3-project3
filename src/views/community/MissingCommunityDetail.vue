<script setup lang="ts">
// import useFetchMissingDetail from '@/composibles/tanstack-query/useFetchMissingDetail';
import { useRoute, useRouter } from 'vue-router';
import useFetchMissingPost from '@/composibles/tanstack-query/useFetchMissingPost';
import { computed, ref, onMounted } from 'vue';
import type MissingAnimalDataType from '@/types/missingAnimal';
import type { ComputedRef } from 'vue';
// import useFetchUser from '@/composibles/tanstack-query/useFetchUser';
import useDeletePost from '@/composibles/tanstack-query/useDeletePost';
import { useQueryClient } from '@tanstack/vue-query';
import QUERY_KEY from '@/constants/queryKey';
import PATH from '@/constants/path';
import CommentSection from '@/components/community/CommentSection.vue';
import { getPost } from '@/apis/devcourse/Post/getPost';
import { type devUser } from '@/types/devcourse/devUser';
import { type devComment } from '@/types/devcourse/devComment';
// import { useAuthStore } from '@/stores/auth';
// import { storeToRefs } from 'pinia';

const cat = ['나이', '품종', '성별', '색상', '마이크로 칩 번호'];
const missingCat = ['분실 날짜', '분실 장소', '주위의 특징적 건물', '관할지'];
const contactInfoCat = ['신고자', '연락처'];
const route = useRoute();
const router = useRouter();
const deletePostMutation = useDeletePost();
const queryClient = useQueryClient();
// const { postId } = route.params;
const postId = route.params.postId as string;
const { postCards, isLoading } = useFetchMissingPost();

interface parsedPostData {
  author: devUser;
  title: string;
  content: string;
  image: string;
  comments: devComment[];
  id: string;
}
const post = ref<parsedPostData>();

onMounted(async () => {
  try {
    const response = (await getPost({ id: postId })).post;
    const parsedTitle = JSON.parse(response.title);
    post.value = {
      author: response.author,
      title: parsedTitle.title,
      content: parsedTitle.content,
      image: response.image ?? '',
      comments: response.comments,
      id: response._id,
    };
  } catch (e) {
    console.log(e);
  }
});

// 전체 카드데이터중 특정 Id를 가진 카드만 가져오기
const data = computed(() => postCards.value?.posts.filter((cards) => cards._id === postId));
// title에 저장된 실종정보 파싱
const contents: ComputedRef<MissingAnimalDataType> = computed(() => {
  if (data.value !== undefined) {
    return JSON.parse(data?.value[0].title);
  }
  return null;
});
const user = computed(() => {
  if (data.value !== undefined) {
    return data?.value[0]?.author;
  }
  return null;
});
const canEdit = computed(() => {
  const uid = localStorage.getItem('uid');
  return uid === user.value?._id;
});
const profileImgUrl =
  user.value?.image === undefined ? '/PNG-Image/images/default-profile1.png' : user.value?.image;

const dummyData = computed(() => ({
  title: '가족을 찾습니다',
  postBy: user.value?.fullName,
  createdAt: data.value[0].createdAt,
  animalInfo: {
    age: contents.value.age,
    breed: contents.value.species,
    gender: contents.value.gender,
    color: contents.value.furColor,
    microChipId: contents.value.RFID,
    note: contents.value.feature,
  },
  missingInfo: {
    date: contents.value.date,
    location: contents.value.address,
    note: contents.value.placeFeature,
    juris: contents.value.region,
  },
  contactInfo: {
    name: contents.value.name,
    tel: contents.value.phone,
  },
}));

const handleDelete = async () => {
  // 삭제 요청  보내기
  deletePostMutation.mutate(postId);
  // 기존 쿼리키를 무효화 하고 새롭게 데이터 요청
  queryClient.invalidateQueries({
    queryKey: QUERY_KEY.missingList,
  });
  await queryClient.refetchQueries({
    queryKey: QUERY_KEY.missingList,
    type: 'all',
  });

  router.push(PATH.communityMissing);
};

const handleUpdate = () => {
  router.push({ path: PATH.communityMissingForm, query: { postId: postId } });
};
// 댓글 삭제 함수
const handleCommentUpdate = async (index: number) => {
  const response = (await getPost({ id: postId })).post;
  const parsedTitle = JSON.parse(response.title);
  post.value = {
    author: response.author,
    title: parsedTitle.title,
    content: parsedTitle.content,
    image: response.image ?? '',
    comments: response.comments,
    id: response._id,
  };
};
</script>

<template>
  <div v-if="isLoading">로딩중</div>
  <div v-else class="container d-flex flex-column mt-5" style="width: 67%; min-width: 1280px">
    <!-- 제목 -->
    <p class="m-0 p-0 title-text text-gray-10 mb-1">{{ dummyData.title }}</p>
    <!-- 유저 아바타 & 유저 ID -->
    <div class="d-flex align-items-center mb-1 gap-2">
      <img
        :src="profileImgUrl"
        class="bg-primary"
        style="height: 35px; aspect-ratio: 1/1; border-radius: 100%"
      />
      <p class="m-0 p-0 post-by-text text-gray-7">{{ dummyData.postBy }}</p>
    </div>
    <!-- 포스트 생성 날짜 & 수정/삭제 버튼 -->
    <div class="d-flex align-items-center justify-content-between mb-3">
      <p class="m-0 p-0 date-text text-gray-7">{{ dummyData.createdAt }}</p>
      <div class="d-flex gap-2">
        <button
          v-if="canEdit"
          class="btn border-0 bg-primary-green rounded-5 d-flex align-items-center justify-content-center"
          style="width: 100px; height: 35px"
          @click="handleUpdate"
        >
          <p class="m-0 p-0 button-text text-gray-1">수정하기</p>
        </button>
        <button
          v-if="canEdit"
          class="btn border-primary-red rounded-5 d-flex align-items-center justify-content-center bg-white"
          style="width: 100px; height: 35px"
          @click="handleDelete"
        >
          <p class="m-0 p-0 button-text text-primary-red">삭제하기</p>
        </button>
      </div>
    </div>
    <!-- 실종 동물 정보 -->
    <div class="d-flex justify-content-between gap-3 mb-3">
      <div class="col bg-gray-3 rounded p-0">
        <img :src="data[0].image" alt="" class="w-100 h-100" />
      </div>
      <div class="col bg-gray-3 rounded p-3">
        <div class="row mb-3">
          <div
            v-for="(item, index) in Object.values(dummyData.animalInfo).slice(0, -1)"
            :key="cat[index]"
            class="d-flex justify-content-between py-1"
          >
            <p class="w-50 m-0 p-0 cat-text">{{ cat[index] }}</p>
            <p class="w-50 m-0 p-0 value-text">{{ item }}</p>
          </div>
        </div>
        <div class="row m-0 p-0">
          <p class="m-0 p-0 cat-text">특징</p>
          <p class="m-0 p-0 value-text">{{ dummyData.animalInfo.note }}</p>
        </div>
      </div>
    </div>
    <!-- 분실 정보 -->
    <div class="bg-gray-3 rounded mb-3 p-3">
      <div
        v-for="(item, index) in Object.values(dummyData.missingInfo)"
        :key="missingCat[index]"
        class="d-flex justify-content-between py-1"
      >
        <p class="w-25 m-0 p-0 cat-text">{{ missingCat[index] }}</p>
        <p class="w-75 m-0 p-0 value-text">{{ item }}</p>
      </div>
    </div>
    <!-- 발견시 연락 정보 -->
    <div class="bg-gray-3 rounded mb-3 p-3">
      <div
        v-for="(item, index) in Object.values(dummyData.contactInfo)"
        :key="contactInfoCat[index]"
        class="d-flex justify-content-between py-1"
      >
        <p class="w-25 m-0 p-0 cat-text">{{ contactInfoCat[index] }}</p>
        <p class="w-75 m-0 p-0 value-text">{{ item }}</p>
      </div>
    </div>

    <!-- 댓글 섹션 -->
    <CommentSection
      v-if="post"
      :comments="post.comments"
      :onUpdateComment="handleCommentUpdate"
      color="red"
      :postId="post.id"
    />
  </div>
</template>

<style scoped>
.title-text {
  font-family: 'Pretendard';
  font-weight: bold;
  font-size: 36px;
}
.postBy-text {
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 24px;
}
.date-text {
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
}
.button-text {
  font-family: 'Pretendard';
  font-weight: bold;
  font-size: 16px;
}
.cat-text {
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 20px;
}
.value-text {
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
}
</style>
