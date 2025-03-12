<script setup lang="ts">
import MissingCommunityPostCard from '@/components/community/MissingCommunityPostCard.vue';
import useFetchMissingPost from '@/composibles/tanstack-query/useFetchMissingPost';
import PATH from '@/constants/path';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// 여기서 missing community post들을 호출
const { postCards, isLoading } = useFetchMissingPost();
const filteredPostCard = computed(() => {
  const filtered = postCards.value?.posts.filter((post) => {
    const contents = JSON.parse(post.title);
    return contents.animalType == animalType.value;
  });
  // console.log('필터링된 카드', filteredPostCard);

  // 여기에 sorting 로직을 추가 -> 댓글순일경우
  if (sortBy.value === 'comment') {
    return filtered?.sort((a, b) => b.comments.length - a.comments.length);
  }
  return filtered;
});

// 필터
const sortBy = ref<'recent' | 'comment'>('recent');
const animalType = ref<'dog' | 'cat' | 'etc'>('dog');

// 페이지네이션 변수
const currentPage = ref(1);
const cardsPerPage = 6;

// 페이지에 표시할 카드 계산
const startIndex = (currentPage.value - 1) * cardsPerPage;
const currentCards = postCards.value?.posts.slice(startIndex, startIndex + cardsPerPage);
// TODO 자유게시판과 중복되는 로직 컴포지블로 분리

const handleWriteClick = () => {
  // 유저의 로그인 여부 판단
  // const uid = localStorage.getItem('uid');
  // if (uid) {
    router.push(PATH.communityMissingForm); // 로그인✅ -> 실종신고 폼으로 이동
  // } else {
  //   alert('로그인 후 글을 작성할 수 있습니다.');
  //   router.push(PATH.login); // 로그인❌ -> 로그인 창으로 이동
  // }
};
</script>

<template>
  <div class="wrapper">
    <!-- 배너 -->
    <div class="banner">
      <img
        src="/PNG-Image/images/missingCommunityBanner.png"
        class="banner-img"
        alt="missing comuunity banner image"
      />
      <div class="banner-text">
        <h1>
          동네 이웃과 함께,<br />
          실종 동물을 찾아요!
        </h1>
        <h2>여러분의 작은 제보가 큰 변화를 만듭니다. 함께 힘을 모아 반려동물을 찾아요!</h2>
      </div>
    </div>
    <div class="w-100 d-flex justify-content-center">
      <div class="fitted-content">
        <!-- 필터-->
        <div class="controls">
          <div class="sort">
            <button :class="{ dark: sortBy === 'recent' }" @click="sortBy = 'recent'">
              최신순
            </button>
            <button :class="{ dark: sortBy === 'comment' }" @click="sortBy = 'comment'">
              댓글순
            </button>
          </div>
          <div class="type">
            <button :class="{ dark: animalType === 'dog' }" @click="animalType = 'dog'">
              강아지
            </button>
            <button :class="{ dark: animalType === 'cat' }" @click="animalType = 'cat'">
              고양이
            </button>
            <button :class="{ dark: animalType === 'etc' }" @click="animalType = 'etc'">
              기타 동물
            </button>
          </div>
          <!-- 글 작성 버튼 -->
          <div @click="handleWriteClick" class="write-button">
            <img src="/PNG-Image/images/car-light.png" alt="siren icon image" class="siren" />
            <span>글 작성하기</span>
          </div>
        </div>

        <!-- 카드 리스트 -->
        <div v-if="isLoading">로딩중</div>
        <div v-else class="container px-3">
          <div class="row row-cols-1 row-cols-2 justify-content-center">
            <div
              v-for="(post, index) of filteredPostCard"
              :key="index"
              class="col d-flex g-3 justify-content-center"
            >
              <MissingCommunityPostCard :card="post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-width: 800px;
  margin-bottom: 50px;
}
.banner {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-text {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: transparent;
  font-family: 'Paperlogy';
  text-align: center;
  color: var(--gray-1);
}

.banner-text h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 150%;
}
.banner-text h2 {
  font-size: 1.3em;
}
.fitted-content {
  width: 66vw;
  min-width: 800px;
  max-width: 1280px;
}
.container {
  min-height: 75vh;
}

.controls {
  margin: 40px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort button {
  font-size: 24px;
  font-weight: 600;
  background-color: transparent;
  border: none;
  color: var(--gray-7);
}
.type {
  display: flex;
  gap: 12px;
}

.type button {
  height: 38px;
  padding: 7px 15px;
  background-color: var(--gray-2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  color: var(--gray-7);
}

.type button:hover {
  background-color: var(--gray-3);
}

button.dark {
  color: var(--gray-10);
}

.write-button {
  height: 50px;
  padding: 15px 25px;
  background-color: var(--gray-2);
  border-radius: 4px;
  border: 2px solid var(--primary-blue);
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: 16px;
  color: var(--gray-10);
  font-weight: 600;
  cursor: pointer;
}
</style>
