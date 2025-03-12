<script setup lang="ts">
import { createPost } from '@/apis/devcourse/Post/createPost';
import * as CHANID from '@/constants/communityConsts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type adoptionForm from '@/types/adoptionForm';

const router = useRouter();

// 개인정보 입력 필드
const name = ref('');
const phone = ref('');
const email = ref('');
const gender = ref('');
const agreeToUse = ref(false);

// 입양 질문 섹션
const adoptionNumber = ref('');
const adoptionReason = ref('');
const hasPet = ref('');
const gaveUpPet = ref('');
const familyMembers = ref('');
const familyAgreement = ref('');

// 폼 제출 처리
const handleSubmit = () => {
  // console.log('폼 제출됨');
  // console.log('이름:', name.value);
  // console.log('전화번호:', phone.value);
  // console.log('이메일:', email.value);
  // console.log('성별:', gender.value);
  // console.log('입양 공고 번호:', adoptionNumber.value);
  // console.log('입양 동기:', adoptionReason.value);
  // console.log('반려동물 여부:', hasPet.value);
  // console.log('반려동물 포기 경험:', gaveUpPet.value);
  // console.log('가족 구성원:', familyMembers.value);
  // console.log('가족 동의 여부:', familyAgreement.value);
  const form : adoptionForm = {
    name : name.value,
    phone : phone.value,
    email : email.value,
    gender : gender.value,
    adoptionNumber : adoptionNumber.value,
    adoptionReason : adoptionReason.value,
    hasPet : hasPet.value,
    gaveUpPet : gaveUpPet.value,
    familyMembers : familyMembers.value,
    familyAgreement : familyAgreement.value,
  }
  createPost({
    channelId: CHANID.AdoptionChannelId,
    title: JSON.stringify(form),
  });

  // 페이지 이동
  router.push('/adoption-complete');
};
</script>

<template>
  <div>
    <!-- 배너 섹션 -->
    <div class="banner-section position-relative">
      <img
        src="/PNG-Image/images/adoptformbtn.png"
        alt="Adopt Form Banner"
        class="img-fluid"
        style="object-fit: cover; width: 100%; height: 350px"
      />
      <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
        <h3
          class="fw-bold mb-3"
          style="
            font-family: 'Paperlogy';
            font-size: 3rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          "
        >
          입양 신청서 작성하기
        </h3>
      </div>
    </div>

    <!-- 개인정보 섹션 -->
    <div class="container my-5">
      <h2
        class="text-center mb-4 py-3"
        style="font-family: 'Paperlogy'; font-weight: 600; color: var(--primary-green)"
      >
        개인정보 입력
      </h2>

      <form @submit.prevent="handleSubmit">
        <!-- 성명 -->
        <div class="mb-4">
          <label for="name" class="form-label">1. 성명</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="form-control rounded-pill p-3"
            placeholder="예: 홍길동"
            required
            style="background-color: #fff7f0; border: 2px solid var(--primary-green)"
          />
        </div>

        <!-- 연락처 -->
        <div class="mb-4">
          <label for="phone" class="form-label">2. 연락처</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            class="form-control rounded-pill p-3"
            placeholder="예: 01012345678"
            required
            style="background-color: #fff7f0; border: 2px solid var(--primary-green)"
          />
        </div>

        <!-- 이메일 -->
        <div class="mb-4">
          <label for="email" class="form-label">3. 이메일주소</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control rounded-pill p-3"
            placeholder="예: example@email.com"
            required
            style="background-color: #fff7f0; border: 2px solid var(--primary-green)"
          />
        </div>

        <!-- 성별 -->
        <div class="mb-5">
          <label class="form-label">4. 성별</label>
          <div class="form-check form-check-inline px-5">
            <input type="radio" id="male" value="남" v-model="gender" class="form-check-input" />
            <label for="male" class="form-check-label">남</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" id="female" value="여" v-model="gender" class="form-check-input" />
            <label for="female" class="form-check-label">여</label>
          </div>
        </div>

        <!-- 개인정보 수집 및 이용 동의 -->
        <div class="mb-4 p-3 border rounded-3 bg-light">
          <div class="form-check">
            <input
              type="checkbox"
              id="agreeToUse"
              v-model="agreeToUse"
              class="form-check-input"
              style="width: 22px; height: 22px"
            />
            <label for="agreeToUse" class="form-check-label ms-2 mb-2">
              개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>
          <div class="mt-2 text-muted">
            <p>수집하는 개인정보 항목: 성명, 이메일, 휴대전화번호</p>
            <p>개인정보의 보유 및 이용기간: 5년 (관계법령에서 정한 일정한 기간)</p>
            <p>
              Petner는 법률에서 정하는 경우를 제외하고는 귀하의 동의 없이 개인정보를 제 3자에게
              제공하지 않습니다.
            </p>
            <p>문의: 02-111-2342 / petnerInfo@petner.com</p>
          </div>
        </div>

        <!-- 입양 질문 섹션 -->
        <h2
          class="text-center mb-2 py-5"
          style="font-family: 'Paperlogy'; font-weight: 600; color: var(--primary-green)"
        >
          입양 질문
        </h2>

        <!-- 입양 공고번호 -->
        <div class="mb-4">
          <label for="adoptionNumber" class="form-label"
            >1. 입양을 희망하는 동물의 공고번호를 적어주세요.</label
          >
          <input
            type="text"
            id="adoptionNumber"
            v-model="adoptionNumber"
            class="form-control rounded-pill p-3"
            required
            style="background-color: #fff7f0; border: 2px solid var(--primary-green)"
          />
        </div>

        <!-- 입양 동기 -->
        <div class="mb-4">
          <label for="adoptionReason" class="form-label"
            >2. 입양을 원하시는 가장 큰 이유는 무엇인가요?</label
          >
          <textarea
            id="adoptionReason"
            v-model="adoptionReason"
            class="form-control rounded-3 p-3"
            rows="4"
            required
            style="background-color: #fff7f0; border: 2px solid var(--primary-green)"
          ></textarea>
        </div>

        <!-- 반려동물 여부 -->
        <div class="mb-4">
          <label for="hasPet" class="form-label"
            >3. 키우고 계신 반려동물이 있나요? 있다면 소개해 주세요.</label
          >
          <textarea
            id="hasPet"
            v-model="hasPet"
            class="form-control rounded-3 p-3"
            rows="4"
            style="background-color: #fff7f0; border: 2px solid var(--primary-green)"
          ></textarea>
        </div>

        <!-- 반려동물 포기 경험 -->
        <div class="mb-4">
          <label for="gaveUpPet" class="form-label"
            >4. 키우던 반려동물을 개인 사정으로 포기한 경험이 있으신가요? 이유는 무엇인가요?</label
          >
          <textarea
            id="gaveUpPet"
            v-model="gaveUpPet"
            class="form-control rounded-3 p-3"
            rows="4"
            style="background-color: #fff7f0; border: 2px solid var(--primary-green)"
          ></textarea>
        </div>

        <!-- 가족 구성원 -->
        <div class="mb-4">
          <label for="familyMembers" class="form-label"
            >5. 가족 구성원은 몇 명인가요? 구성원을 소개해 주세요.</label
          >
          <textarea
            id="familyMembers"
            v-model="familyMembers"
            class="form-control rounded-3 p-3"
            rows="4"
            required
            style="background-color: #fff7f0; border: 2px solid var(--primary-green)"
          ></textarea>
        </div>

        <!-- 가족 동의 여부 -->
        <div class="mb-4">
          <label class="form-label">6. 입양결정에 가족 모두 동의하십니까?</label>
          <div class="d-flex align-items-center">
            <div class="form-check form-check-inline">
              <input
                type="radio"
                id="familyAgreementAgree"
                value="동의"
                v-model="familyAgreement"
                class="form-check-input"
              />
              <label for="familyAgreementAgree" class="form-check-label">동의</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                id="familyAgreementPartial"
                value="일부동의"
                v-model="familyAgreement"
                class="form-check-input"
              />
              <label for="familyAgreementPartial" class="form-check-label">일부동의</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                id="familyAgreementDisagree"
                value="반대"
                v-model="familyAgreement"
                class="form-check-input"
              />
              <label for="familyAgreementDisagree" class="form-check-label">반대</label>
            </div>
          </div>
        </div>

        <!-- 입양인 동의 -->
        <div class="mb-4 p-4 border rounded-3 bg-light text-center">
          <p>
            입양인은 이하 내용을 읽고 동의함으로써, 상기의 조항을 위반 시에는
            <br />
            단체의 어떠한 처벌조치에도 이의를 제기함이 없이 따를 것을 서약합니다.
          </p>
        </div>

        <!-- 제출 버튼 -->
        <button
          type="submit"
          class="btn btn-primary btn-block py-3"
          :class="{ 'btn-secondary': !agreeToUse }"
          :disabled="!agreeToUse"
        >
          제출하기
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 배너 스타일 */
.banner-section {
  position: relative;
  width: 100%;
  height: 350px;
}

.banner-section .position-absolute {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 폼 스타일 */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-check-input {
  width: 18px;
  height: 18px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  background-color: var(--primary-green);
  color: var(--gray-1);
  border: none;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--secondary-green);
}

.form-check-inline {
  margin-right: 20px;
  align-items: center;
}

.form-check-input {
  margin-right: 5px;
  cursor: pointer;
}
</style>
