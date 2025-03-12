<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import TextBlock, { type TextBlockDescriptor } from '../common/TextBlock.vue';
import { RouterLink, useRouter } from 'vue-router';
const plannerIntroText: TextBlockDescriptor[][] = [
  [
    {
      content: '반려동물',
      bgColor: 'var(--primary-green)',
      color: 'var(--gray-1)',
      font: 'Pretendard',
      size: '56px',
      weight: 700,
      margin: 'my-0',
    },
    {
      content: '과',
      bgColor: '',
      color: '#4B3C3C',
      font: 'Pretendard',
      size: '56px',
      weight: 700,
      margin: 'my-0',
    },
  ],
  [
    {
      content: '함께하는 특별한 여행',
      bgColor: '',
      color: '#4B3C3C',
      font: 'Pretendard',
      size: '50px',
      weight: 700,
      margin: 'my-0',
    },
  ],
  [
    {
      content: '반려동물과 함께하는 여행, 이제 쉽고 편리하게 시작하세요!',
      bgColor: '',
      color: '#4B3C3C',
      font: 'Pretendard',
      size: '20px',
      weight: 700,
      margin: 'my-0',
    },
  ],
  [
    {
      content: '맞춤형 일정으로, 여러분의 여행을 더욱 특별하게 만들어드립니다.',
      bgColor: '',
      color: '#4B3C3C',
      font: 'Pretendard',
      size: '20px',
      weight: 700,
      margin: 'my-0',
    },
  ],
];

const auth = useAuthStore();
const router = useRouter();
const handleAddPlan = () => {
  router.push('/travel');
};
</script>
<template>
  <div class="planner-hero">
    <div class="planner-content">
      <!-- 왼쪽 텍스트 영역 -->
      <div class="planner-text">
        <div class="planner-title">
          <TextBlock :text-block="plannerIntroText[0][0]" />
          <TextBlock :text-block="plannerIntroText[0][1]" />
        </div>
        <div class="planner-subtitle">
          <TextBlock :text-block="plannerIntroText[1][0]" />
        </div>
        <div class="planner-description">
          <TextBlock :text-block="plannerIntroText[2][0]" />
        </div>
        <div class="planner-additional-description">
          <TextBlock :text-block="plannerIntroText[3][0]" />
        </div>
        <div class="planner-button-container">
          <RouterLink v-if="!auth.isAuth" to="/login" class="planner-button">
            <i class="bi-paw login-paw-icon"></i>
            로그인하고 서비스 이용하기
          </RouterLink>
          <div v-else class="planner-add-plan" @click="handleAddPlan">
            <i class="bi-plus-circle planner-add-icon"></i>
            <div class="planner-add-text">
              <div class="planner-add-title">여행 계획 세우기</div>
              <div class="planner-add-subtext">
                새 여행 계획을 생성하거나, 기존 계획에 일정을 추가할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 오른쪽 이미지 영역 -->
      <div class="planner-image-container">
        <img src="/travelPlanner/planner-image.png" alt="Planner Image" class="planner-image" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.planner-hero {
  position: relative;
  width: 100%;
  max-width: 1920px;
  min-width: 1280px;
  height: 500px;
  margin: 0 auto 50px;
  background: url('/PlannerBackgroundImg.png') center center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  box-sizing: border-box;
}
.planner-content {
  display: flex;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  justify-content: space-between;
}
.planner-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45%;
  padding-right: 20px;
  text-align: left;
}
.planner-title {
  display: flex;
  flex-wrap: wrap;
  font-family: 'Pretendard';
  margin-bottom: 10px;
}
.planner-title > :first-child {
  background-color: var(--primary-green);
  color: var(--gray-1);
  padding: 0 0.2em;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
.planner-title > :last-child {
  color: #4B3C3C;
  margin-left: 8px;
}
.planner-subtitle {
  font-family: 'Pretendard';
  font-size: 50px;
  line-height: 1.2;
  color: #4B3C3C;
  margin-bottom: 15px;
}
.planner-description {
  font-family: 'Pretendard';
  font-size: 20px;
  line-height: 1.5;
  color: #4B3C3C;
  margin-bottom: 10px;
}
.planner-additional-description {
  font-family: 'Pretendard';
  font-size: 20px;
  line-height: 1.5;
  color: #4B3C3C;
}
.planner-button-container {
  margin-top: 20px;
}
.planner-button {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  border: 2px solid var(--primary-green);
  border-radius: 8px;
  color: var(--primary-green);
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}
.planner-button:hover {
  background-color: var(--primary-green);
  color: #FFFFFF;
}
.login-paw-icon {
  font-size: 1.5rem;
  margin-right: 8px;
  color: var(--primary-green);
  transition: color 0.3s;
}
.planner-button:hover .login-paw-icon {
  color: #FFFFFF;
}
.planner-add-plan {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border: 2px solid var(--primary-green);
  border-radius: 8px;
  background-color: #FFFFFF;
  color: var(--primary-green);
  cursor: pointer;
  transition: background 0.3s, transform 0.2s, color 0.3s;
  margin-top: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
.planner-add-plan:hover {
  background: var(--primary-green);
  color: #FFFFFF;
  transform: scale(1.02);
}
.planner-add-icon {
  font-size: 1.5rem;
  margin-right: 10px;
  color: var(--primary-green);
}
.planner-add-plan:hover .planner-add-icon {
  color: #FFFFFF;
}
.planner-add-text {
  display: flex;
  flex-direction: column;
}
.planner-add-title {
  font-size: 20px;
  font-weight: 600;
  font-family: 'Pretendard';
}
.planner-add-subtext {
  font-size: 16px;
  font-family: 'Pretendard';
  color: #555;
}
.planner-image-container {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.planner-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
