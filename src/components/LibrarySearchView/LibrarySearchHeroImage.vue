<script setup lang="ts">

</script>

<template>
  <div class="library-hero">
    <img src="/icons/library/main-image.svg" height="470" width="895" alt="main-image">
    <img src="/icons/library/line.svg" height="470" width="1220" alt="line-image" class="line-image">
    <div class="hero-word">
      <div>우리 동네 주변</div>
      <div class="subtitle">도서관을 찾아보세요</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.library-hero {
  margin-top : 100px;
  position: relative;
  display: flex;
  height: 470px;
  align-items: center;
  justify-content: space-between;
}

.line-image {
  position: absolute;
  top: -90px;
  left: 0;
}

.hero-word {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 220px;
  margin-left: 10px;
}

.subtitle {
  margin-top: 10px;
  margin-left: 30px;
}
</style>
