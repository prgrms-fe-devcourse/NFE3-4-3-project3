<script lang="ts" setup>
import { ref } from 'vue'

const activeKey = ref('1')
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" size="large">
    <a-tab-pane key="1" tab="전체"></a-tab-pane>
    <a-tab-pane key="2" tab="도서"></a-tab-pane>
    <a-tab-pane key="3" tab="공연/행사"></a-tab-pane>
  </a-tabs>
</template>

<style lang="scss" scoped>
:deep(.ant-tabs) {
  width: 100%;
}

/* 폰트 크기 조정 */
:deep(.ant-tabs-tab) {
  font-size: $text-size-300 !important;
}

/* 활성화된 탭 폰트 색상 변경 */
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: $secondary-color-300 !important;
  text-shadow: none !important; /* 기존 스타일 제거 */
}

/* 선택되지 않은 탭에 호버했을 때 폰트 색상 변경 */
:deep(.ant-tabs-tab:not(.ant-tabs-tab-active):hover .ant-tabs-tab-btn) {
  color: $secondary-color-300 !important;
}

/* 탭 아래 표시되는 바 색상 변경 */
:deep(.ant-tabs-ink-bar) {
  background-color: $secondary-color-300 !important;
}

/* 탭 아래 마진 제거 */
:deep(.ant-tabs-nav) {
  margin-bottom: 0 !important;
}
</style>
