<script setup lang="ts">
export interface DetailInfoData {
  infoname: string;
  infotext: string;
}
interface DetailInfoComponentProps {
  data: DetailInfoData[];
}
const props = defineProps<DetailInfoComponentProps>();
const formattedData = props.data.map((e) => {
  return {
    infoname: e.infoname,
    infotext: e.infotext.replace('<br />', ''),
  };
});
</script>

<template>
  <div v-for="(item, index) in formattedData" :key="index" class="mb-1">
    <p class="p-0 m-0 title-text">{{ item.infoname || '정보 없음' }}</p>
    <p class="p-0 m-0 content-text mt-2 fs-5">{{ item.infotext || '정보 없음' }}</p>
  </div>
</template>

<style scoped>
.title-text {
  font-family: 'Pretendard';
  font-size: 36px;
  font-weight: bold;
  white-space: pre-wrap;
}
.content-text {
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 400;
  white-space: pre-wrap;
}
</style>
