<template>
  <div class="goToTop" @click="handleGoToTop">TOP</div>
</template>

<script setup lang="ts">
const handleGoToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style lang="scss" scoped>
.goToTop {
  padding: 1rem;
  background-color: #e1e1e1;
  position: fixed;
  bottom: 10%;
  right: 10%;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
}
</style>
