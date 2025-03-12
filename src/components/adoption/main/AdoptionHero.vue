<script setup lang="ts">
</script>

<template>
  <div class="hero-wrapper">
    <img
      src="/PNG-Image/images/adoption-main-hero.png"
      alt="wish adoption top banner"
      class="hero-img"
    />

    <div class="hero-message-wrapper">
      <div class="hero-message">
        <p>작은 손길로 큰 변화를,</p>
        <p>당신의 마음이 새로운 시작을 엽니다.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-img {
  width: 100%;
  height: 575px;
  object-fit: cover;
}

.hero-message-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 575px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-message {
  width: 1280px;
  font-size: 48px;
  font-family: 'Paperlogy';
  font-weight: 600;
  color: var(--gray-1);
  text-align: end;
  line-height: 130%;
  padding-top: 100px;
  opacity: 0;
  animation: fadeInSlide 1.5s ease-out forwards 0.5s;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
