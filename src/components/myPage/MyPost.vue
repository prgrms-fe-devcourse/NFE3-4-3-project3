<script setup lang="ts">
import MyTravelCard from '@/components/myPage/MyTravelCard.vue';
import AdoptionRequestDisplay, {
  type AdoptionRequestData,
} from '@/components/myPage/AdoptionRequestDisplay.vue';
import { onMounted, ref, watch } from 'vue';

import { getChannelPosts } from '@/apis/devcourse/Post/getChannelPosts';
import type adoptionForm from '@/types/adoptionForm';
import * as CHANID from '@/constants/communityConsts';
import { useAuthStore } from '@/stores/auth';
import type { devPost } from '@/types/devcourse/devPost';

import { getAuthorPosts } from '@/apis/devcourse/Post/getAuthorPosts';
import { useRouter } from 'vue-router';

const adoptionFormPost = ref<devPost>();
const adoptionRequestData = ref<AdoptionRequestData>();
const freePosts = ref<devPost[]>([]);

const auth = useAuthStore();
const router = useRouter();

// 현재 선택된 콘텐츠 (게시글 / 입양신청서)
const currentContent = ref('게시글');

// 버튼 클릭 시 콘텐츠 변경 함수
const changeContent = (content: string) => {
  currentContent.value = content;
};
onMounted(async () => {
  if (!auth.user) return;

  // 입양 채널 게시글 중 본인이 작성한 글을 가져와 가장 최근 글 선택
  const adoptionPosts = (await getChannelPosts({ channelId: CHANID.AdoptionChannelId })).posts;
  const myPosts = adoptionPosts.filter((e) => e.author._id === auth.user?._id);
  if (myPosts.length > 0) {
    let mostRecent = myPosts[0];
    for (let i = 1; i < myPosts.length; i++) {
      if (new Date(mostRecent.createdAt) < new Date(myPosts[i].createdAt)) {
        mostRecent = myPosts[i];
      }
    }
    adoptionFormPost.value = mostRecent;
  }

  // 작성자 게시글(자유/실종 채널) 가져오기 및 정렬
  const fetchedPosts = (await getAuthorPosts({ authorId: auth.user._id })).posts.filter(
    (e) => e.channel._id === CHANID.FreeChannelId || e.channel._id === CHANID.MissingChannelId,
  );
  fetchedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  console.log(fetchedPosts);
  freePosts.value = fetchedPosts;
});

watch(
  () => adoptionFormPost.value,
  () => {
    if (!adoptionFormPost.value) return;
    const adoptionFormData = JSON.parse(adoptionFormPost.value.title) as adoptionForm;
    adoptionRequestData.value = {
      contact: adoptionFormData.phone,
      email: adoptionFormData.email,
      gender: adoptionFormData.gender,
      name: adoptionFormData.name,
      oathDate: new Date(adoptionFormPost.value.createdAt),
      reqId: adoptionFormData.adoptionNumber,
      questions: [
        {
          question: '입양을 원하시는 가장 큰 이유는 무엇인가요?',
          answer: adoptionFormData.adoptionReason,
        },
        {
          question: '키우고 계신 반려동물이 있나요? 있다면 소개해 주세요.',
          answer: adoptionFormData.hasPet,
        },
        {
          question: '키우던 반려동물을 개인 사정으로 포기한 경험이 있으신가요? 이유는 무엇인가요?',
          answer: adoptionFormData.gaveUpPet,
        },
        {
          question: '가족 구성원은 몇 명인가요? 구성원을 소개해 주세요.',
          answer: adoptionFormData.familyMembers,
        },
      ],
    };
    console.log(adoptionRequestData.value.oathDate);
  },
);

const goToPostDetail = (post: devPost) => {
  if (post.channel._id === CHANID.MissingChannelId) {
    router.push(`/community/missing/${post._id}`);
  } else {
    router.push(`/community/free/${post._id}`);
  }
};
</script>

<template>
  <div class="myPost">
    <!-- 게시글, 입양신청 버튼섹션 -->
    <div class="myContentText myPostTitleSection position-relative">
      <div class="position-absolute d-flex flex-row gap-4" :style="{ left: '58px', top: '34px' }">
        <!-- 버튼 클릭 시 currentContent 값 변경 -->
        <span
          class="cursorPointer"
          :class="{ currentContentText: currentContent === '게시글' }"
          @click="changeContent('게시글')"
        >
          게시글
        </span>
        <span
          class="cursorPointer"
          :class="{ currentContentText: currentContent === '입양신청서' }"
          @click="changeContent('입양신청서')"
        >
          입양신청서
        </span>
      </div>
    </div>
    <!-- 카드 리스트 섹션 -->

    <div v-motion-pop v-if="currentContent === '게시글'" class="container myPostListSection">
      <div
        v-for="post in freePosts"
        :key="post._id"
        class="my-5"
        @click="() => goToPostDetail(post)"
      >
        <MyTravelCard :data="post" onclick="" />
      </div>
    </div>
    <div v-motion-pop class="w-100" v-if="currentContent === '입양신청서'">
      <AdoptionRequestDisplay
        v-if="adoptionRequestData !== undefined"
        :data="adoptionRequestData"
      />
    </div>
  </div>
</template>

<style scoped>
/* 텍스트 */

.currentContentText {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-10);
}
.myContentText {
  font-size: 20px;
  font-weight: 400;
  color: var(--gray-10);
}

/* 나의 게시글 섹션 */
.myPost {
  width: 65%;
  height: 1089px;
  border-radius: 10px;
  box-shadow: 2px 6px 10px var(--gray-3);
  background-color: var(--gray-1);
}

/* 여행 리스트 컨테이너 여역 */
.myPostListSection {
  width: 85%;
  height: 90%;
  overflow-y: auto;
  scrollbar-width: none;
}

.cursorPointer:hover {
  cursor: pointer;
}

/* 나의 여행 제목 섹션 */
.myPostTitleSection {
  height: 85px;
  border-bottom: 1px solid #e6e6ea;
}
</style>
