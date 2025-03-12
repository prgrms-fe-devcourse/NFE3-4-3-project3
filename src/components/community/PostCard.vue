<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import LikeButton from './LikeButton.vue';
import { type devLike } from '@/types/devcourse/devLike';
import { type devComment } from '@/types/devcourse/devComment';

interface PostCardProps {
  postId: string;
  imageUrl: string;
  title: string;
  createdAt: string;
  authorImage: string;
  authorName: string;
  authorEmail: string;
  likes: devLike[];
  comments?: devComment[];
}

const props = defineProps<PostCardProps>();
const router = useRouter();

// 카드 클릭 시 상세 페이지로 이동
const handleCardClick = () => {
  router.push(`/community/free/${props.postId}`);
};

const parsedData = computed(() => {
  try {
    const parsed = JSON.parse(props.title);
    return {
      title: parsed.title || props.title,
      content: parsed.content || '',
    };
  } catch (e) {
    console.error('타이틀 파싱 에러:', e);
    return { title: props.title, content: '' };
  }
});

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return minutes + '분 전';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + '시간 전';
  const days = Math.floor(hours / 24);
  return days + '일 전';
};

const commentCount = computed(() => (props.comments ? props.comments.length : 0));
</script>

<template>
  <div class="card-wrapper" @click="handleCardClick">
    <div class="card-image">
      <img :src="props.imageUrl" alt="게시글 이미지" />
    </div>

    <div class="card-body">
      <div class="author-info">
        <img :src="props.authorImage" alt="프로필 이미지" class="author-img" />
        <div class="author-details">
          <div class="author-name">{{ props.authorName }}</div>
          <div class="author-email">{{ props.authorEmail }}</div>
        </div>
        <div class="post-time">{{ timeAgo(props.createdAt) }}</div>
      </div>
      <div class="post-title">{{ parsedData.title }}</div>
      <div class="post-content">{{ parsedData.content }}</div>
    </div>

    <div class="card-footer">
      <div class="stats">
        <span class="stat">
          <!-- <i class="bi bi-heart-fill" style="color: #dc3644"></i> -->
          <LikeButton :postId="props.postId" :likes="props.likes" />
        </span>
        <span class="stat">
          <i class="bi bi-chat"></i>
          {{ commentCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  width: 100%;
  max-width: 600px;
  margin: 10px 0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s;
  cursor: pointer;
}

.card-wrapper:hover {
  transform: scale(1.02);
}

.card-wrapper:hover {
  transform: scale(1.02);
}

.card-image img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  filter: brightness(0.75);
}

.card-body {
  padding: 15px;
}

.author-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.author-info .author-details {
  margin-left: 10px;
  flex: 1;
}

.author-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.author-email {
  font-size: 14px;
  color: #777;
}

.post-time {
  font-size: 13px;
  color: #555;
  margin-left: 10px;
  white-space: nowrap;
}

.post-title {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-bottom: 6px;
}

.post-content {
  font-size: 16px;
  color: #555;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  padding: 10px 15px;
  background-color: #fafafa;
  border-top: 1px solid #eee;
}

.stats {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #555;
}
</style>
