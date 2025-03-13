<script setup lang="ts">

</script>

<template>
  <div class="button-layout">
    <button class="button-first">
      <img src="/icons/library/button-image1.svg" alt="button-1" class="image-button"/>
      <span class="button-text">주말에도<br>운영하는 도서관</span>
    </button>
    <button class="button-second">
      <img src="/icons/library/button-image2.svg" alt="button-2" class="image-button"/>
      <span class="button-text">가장 많은 책을<br>보유한 도서관</span>
    </button>
    <button class="button-third">
      <img src="/icons/library/button-image3.svg" alt="button-3" class="image-button"/>
      <span class="button-text-last">대출 반납이<br>활발한 도서관</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.button-layout {
  display: flex;
  width: 936px;
  height: 133px;
  justify-content: space-between;
}

.button-first, .button-second, .button-third {
  position: relative;
  width: 300px;
  height: 133px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.button-first {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.button-second {
  border-radius: 20px;
}

.button-third {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.image-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.button-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 20px;
  font-weight: bold;
  color: $text-color-400
}

.button-text-last {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 20px;
  font-weight: bold;
  color: #FFFFFF;
}
</style>
