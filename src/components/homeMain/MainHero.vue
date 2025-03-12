<script setup lang="ts">
import TextBlock, { type TextBlockDescriptor } from '../common/TextBlock.vue';

const heroImagePath = '/HomeMainHeroImg.png';
const heroText : TextBlockDescriptor[] = [
  {
    content: '펫트너, 사랑으로 연결되는 반려동물의 새로운 시작',
    color: 'var(--gray-1)', bgColor:'', font:'Paperlogy', weight:700, size: '48px'
  },
  {
    content: '반려동물 입양, 실종/발견 신고, 여행 서비스까지!\n펫트너(Petner)로 반려동물과 더 나은 삶을 만들어가세요.\n동물들에게 기회를, 당신에게 특별한 경험을 선사합니다.',
    color: 'var(--gray-1)',
    bgColor: '',
    font: 'Paperlogy',
    weight: 500,
    size: '20px'
  }
];
</script>

<template>
  <div class="container-fluid mb-5 p-0 hero"
    :style="{
      backgroundImage : `linear-gradient(#00000080 0 50%, #00000000), url(${heroImagePath})`,
      backgroundBlendMode : 'multiply',
      backgroundPositionX : 'center'
    }">
    <!-- Hero minus header -->
    <div class="w-100 position-absolute d-flex hero-text-container" style="height: 500px; top: 75px; align-items: center; padding-left: 18%;">
      <div style="max-width:500px; min-width:500px;">
        <TextBlock :text-block="heroText[0]" />
        <TextBlock :text-block="heroText[1]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-size: cover;
  height: 575px;
  min-width: 1280px;
}

/* Hero 텍스트 컨테이너에 애니메이션 효과 추가 */
.hero-text-container {
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
  /* 필요 시 애니메이션 지연 추가 */
  animation-delay: 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
