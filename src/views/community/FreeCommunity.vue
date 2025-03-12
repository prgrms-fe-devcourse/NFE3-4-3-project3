<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import PostCard from '@/components/community/PostCard.vue';
import {
  getChannelPosts,
  type GetChannelPostsResponse,
} from '@/apis/devcourse/Post/getChannelPosts';
import * as CHANID from '@/constants/communityConsts';

const router = useRouter();
const filter = ref<'latest' | 'comment' | 'popular'>('latest');
const currentPage = ref(1);
const postsData = ref<GetChannelPostsResponse | null>(null);
const sortedData = computed(() => {
  const posts = postsData.value?.posts;
  switch (filter.value) {
    case 'comment':
      return posts!.sort((a, b) => b.comments.length - a.comments.length);
    case 'popular':
      return posts!.sort((a, b) => b.likes.length - a.likes.length);
    default:
      return posts;
  }
});
// 필터 변경 함수
const handleFilterChange = (newFilter: 'latest' | 'comment' | 'popular') => {
  filter.value = newFilter;
};

const handleWriteButton = () => {
  router.push('/community/free/form');
};

onMounted(async () => {
  postsData.value = await getChannelPosts({ channelId: CHANID.FreeChannelId, offset: 0 });

  console.log('API로 받은 게시글 데이터:', postsData.value);
});
</script>

<template>
  <div>
    <!-- 배너 섹션 -->
    <div class="banner-section position-relative">
      <img
        src="/PNG-Image/images/freecommunitybanner.png"
        alt="Community Banner"
        class="img-fluid"
        style="object-fit: cover; width: 100%; height: 500px"
      />
      <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
        <h3 class="fw-bold mb-4" style="font-family: 'Paperlogy'; font-size: 2.5rem">
          소중한 반려동물과의 이야기, <br />
          함께 나누는 공간
        </h3>
        <p
          style="
            font-family: 'Paperlogy';
            font-size: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          "
        >
          펫트너와 함께하는 따뜻한 커뮤니티에서, 여러분의 이야기와 정보가 큰 도움이 됩니다!
        </p>
      </div>
    </div>

    <!-- 필터 & 글 작성 헤더 -->
    <div class="container my-5 header-row">
      <div class="d-flex flex-wrap justify-content-between align-items-center">
        <div class="filter-group d-flex gap-3">
          <button
            class="filter-button btn"
            :class="{ active: filter === 'latest' }"
            @click="handleFilterChange('latest')"
          >
            <i class="bi bi-clock"></i> 최신순
          </button>
          <button
            class="filter-button btn"
            :class="{ active: filter === 'popular' }"
            @click="handleFilterChange('popular')"
          >
            <i class="bi bi-star"></i> 인기순
          </button>
          <button
            class="filter-button btn"
            :class="{ active: filter === 'comment' }"
            @click="handleFilterChange('comment')"
          >
            <i class="bi bi-chat"></i> 댓글순
          </button>
        </div>
        <button class="write-button btn" @click="handleWriteButton">
          <i class="bi bi-pencil-square"></i> 글 작성하기
        </button>
      </div>
    </div>

    <!-- 카드 리스트 -->
    <!-- my-5: 위아래 여백, row-cols-1 row-cols-md-2: 화면 크기에 따라 1~2열, g-4: 그리드 간격 -->
    <div class="container my-5" v-if="postsData">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div v-for="post in sortedData" :key="post._id" class="col">
          <PostCard
            :postId="post._id"
            :imageUrl="post.image"
            :authorImage="post.author.image"
            :authorName="post.author.fullName"
            :authorEmail="post.author.email"
            :title="post.title"
            :createdAt="post.createdAt"
            :likes="post.likes"
            :comments="post.comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-row {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
  margin-bottom: 30px;
}

.filter-button {
  font-size: 1rem;
  font-weight: 500;
  color: var(--gray-7);
  cursor: pointer;
  font-family: 'Paperlogy';
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

.filter-button:hover {
  background-color: #f8f9fa;
  color: var(--primary-purple);
  transform: scale(1.05);
}

.filter-button.active {
  background-color: var(--primary-purple);
  color: #fff;
  border-color: var(--primary-purple);
  font-weight: 700;
}

.filter-button i {
  font-size: 1.25rem;
}

.write-button {
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Paperlogy';
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--primary-purple);
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.write-button:hover {
  opacity: 0.9;
}

.write-button i {
  font-size: 1.25rem;
}
</style>
