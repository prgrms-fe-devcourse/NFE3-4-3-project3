<script setup lang="ts"></script>

<template>
  <div class="performanceTab-container">
    <div class="performanceTab active">공연 상세 정보</div>
    <div class="performanceTab">공연장 상세 정보</div>
    <div class="performanceTab">연관 공연 정보</div>
  </div>
</template>

<style lang="scss" scoped>
.performanceTab-container {
  width: 100%;
  height: 70px;
  border: 1px solid $text-color-100;
  border-radius: 12px;
  display: flex;
  margin-top: 54px;
}

.performanceTab {
  width: calc(100% / 3);
  height: 100%;
  font-size: 18px;
  color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid $text-color-100;
}

.performanceTab.active {
  background-color: #f1f1ef;
  color: $secondary-color-300;
}
</style>
