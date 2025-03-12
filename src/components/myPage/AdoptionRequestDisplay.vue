<script setup lang="ts">
import { onMounted } from 'vue';

export interface AdoptionRequestData {
  name: string;
  contact: string;
  email: string;
  gender: string;
  reqId: string;
  questions: { question: string; answer: string }[];
  oathDate: Date;
}
interface AdoptionRequestDisplayProps {
  data: AdoptionRequestData;
}
const props = defineProps<AdoptionRequestDisplayProps>();
const petnerText =
  '본인은 펫트너를 통해 입양한 반려동물에게 책임을 다하고, 최적의 환경과 보살핌을 제공할 것을 서약합니다.';
const formattedOathDate = props.data.oathDate.toLocaleDateString();
</script>

<template>
  <div class="bg-primary d-flex flex-column">
    <div
      class="bg-secondary-green w-100 py-4 px-5 d-flex justify-content-between border-bottom border-2 align-items-center"
    >
      <p class="p-0 m-0 text-gray-1 adoption-request-title-text">입양 신청서</p>
      <img src="/pawIcon.svg" alt="" style="width: 40px; height: 40px" />
    </div>
    <div class="bg-secondary-green w-100 p-3 px-5">
      <!-- 이름 & 연락처 -->
      <div class="d-flex border-bottom border-2 py-3">
        <div class="col d-flex gap-5">
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">성명</p>
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">{{ props.data.name }}</p>
        </div>
        <div class="col d-flex gap-5">
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">연락처</p>
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">{{ props.data.contact }}</p>
        </div>
      </div>
      <!-- 이메일 & 성별 -->
      <div class="d-flex border-bottom border-2 py-3">
        <div class="col d-flex gap-5">
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">이메일</p>
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">{{ props.data.email }}</p>
        </div>
        <div class="col d-flex gap-5">
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">성별</p>
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">{{ props.data.gender }}</p>
        </div>
      </div>
      <!-- 유기동물 공고번호 -->
      <div class="d-flex py-3">
        <div class="col d-flex gap-5">
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">유기동물 공고번호</p>
          <p class="m-0 p-0 text-gray-1 adoption-request-content-text">{{ props.data.reqId }}</p>
        </div>
      </div>
    </div>
    <div class="bg-gray-3 w-100 px-5">
      <div v-for="(item, index) in props.data.questions" :key="index" class="mt-5">
        <div class="border-bottom border-2 border-gray-7 pb-3">
          <p class="m-0 p-0 text-gray-10 question-title">
            {{ (index + 1).toString() + '. ' + item.question }}
          </p>
        </div>
        <div class="pt-3">
          <p class="m-0 p-0 text-gray-7 question-content">{{ item.answer }}</p>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center p-5 gap-3">
        <p class="p-0 m-0 petner-logo text-secondary-green">{{ 'Petner' }}</p>
        <p class="p-0 m-0 petner-oath text-gray-7">{{ petnerText }}</p>
        <p class="p-0 m-0 petner-oath-date text-gray-7">{{ formattedOathDate }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.adoption-request-title-text {
  font-family: 'Paperlogy';
  font-size: 24px;
  font-weight: 600;
}
.adoption-request-content-text {
  font-family: 'Paperlogy';
  font-size: 16px;
  font-weight: 500;
}
.question-title {
  font-family: 'Paperlogy';
  font-size: 16px;
  font-weight: 500;
}
.question-content {
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
}
.petner-logo {
  font-family: 'Paperlogy';
  font-size: 32px;
  font-weight: 700;
}
.petner-oath {
  font-family: 'Paperlogy';
  font-size: 12px;
  font-weight: 500;
}
.petner-oath-date {
  font-family: 'Paperlogy';
  font-size: 16px;
  font-weight: 500;
}
</style>
