<script setup lang="ts">

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref, reactive, watch } from 'vue';

const auth = useAuthStore();
const router = useRouter();

const updating = reactive({ value: false });
const userName = ref(auth.user?.fullName);
const email = ref(auth.user?.email);
watch(
  ()=>auth.user,
  ()=>{
    userName.value = auth.user?.fullName;
    email.value = auth.user?.email;
  }
);

const avatarInput = ref<File>();
const coverImageInput = ref<File>();
</script>

<template>
  <div class="heroSection overflow-hidden position-relative z-0">
    <!-- 아바타 이미지 -->
    <div
      class="position-absolute overflow-hidden z-1 bg-primary"
      style="border-radius: 100%; width: 175px; height: 175px; top: 155px; left: 79px;"
    >
      <img :src="auth.user?.image" alt="" style="height:100%; width: auto;"/>
      <i v-if="updating.value"
        class="bi-images position-absolute translate-middle text-gray-1" style="top: 50%; left: 50%; font-size: 1.5rem"
      >
        <input class="form-control position-absolute opacity-0 top-0" type="file" id="formFile" accept="image/*" @change="(e)=>{
          avatarInput=e.target.files?.[0];
          if(avatarInput) auth.UploadPhoto(avatarInput, false);
        }" />
      </i>
    </div>
    <!-- 상단 백그라운드 이미지 -->
    <i v-if="updating.value"
      class="bi-images position-absolute translate-middle text-gray-1" style="top: 33%; left: 50%; font-size: 1.5rem"
    >
      <input class="form-control position-absolute opacity-0 top-0" type="file" id="formFile" accept="image/*" @change="(e)=>{
        coverImageInput=e.target.files?.[0];
        if(coverImageInput) auth.UploadPhoto(coverImageInput, true);
      }" />
    </i>
    <div class="overflow-hidden" style="height: 280px; width:100%">
      <img v-if="auth.user?.coverImage" :src="auth.user?.coverImage" alt="" style="height: auto; width: 100%"/>
      <div v-if="!(auth.user?.coverImage)" class="bg-primary-red w-100"></div>
    </div>
    <!-- 내 정보 텍스트 섹션 -->
    <div class="myInformation position-relative">
      <!-- 왼쪽 텍스 -->
      <div
        class="d-flex flex-column gap-1 position-absolute"
        :style="{ top: '40px', left: '237px' }"
      >
      <div class="d-flex flex-row align-items-center gap-2">
        <input v-if="!updating.value" type="text" class="title bg-white border-0" :value="userName" disabled style="field-sizing: content;"/>
        <input v-if="updating.value" type="text" class="title bg-white border-0" :value="userName" style="field-sizing: content;" @input="(e)=>userName=e.target.value"/>
        <input type="text" class="myInfoText bg-white border-0" :value="email" disabled style="field-sizing: content;"/>
      </div>
      <!-- <span class="myInfoText">{{ auth.user?.email }}</span> -->
      <div class="myInfoText">개 산책시키는 사람</div>
    </div>
      <!-- 오른쪽 버튼 -->
      <div class="d-flex flex-row gap-5 position-absolute" :style="{ top: '44px', right: '64px' }">
        <button v-if="!updating.value" class="editButton" @click="()=>{ updating.value = !updating.value; }">Edit Profile</button>
        <button v-if="updating.value" class="editButton" @click="async ()=>{
            updating.value = !updating.value;
            await auth.UpdateUser(userName ?? '' , '');
          }"
        >
          Edit Done
        </button>
        <button class="logoutButton" @click="()=>{auth.Logout(); router.push('/')}">Log Out</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 텍스트 */
.title {
  font-size: 30px;
  font-weight: 700;
  color: var(--gray-10);
}

.myInfoText {
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-6);
}
/* 내 정보 전체 섹션 */
.heroSection {
  width: 100%;
  height: 446px;
  border-radius: 10px;
  box-shadow: 2px 6px 20px var(--gray-3);
}

/* 내 정보 텍스트 섹션 */
.myInformation {
  width: 100%;
  height: 166px;
  background-color: var(--gray-1);
}

/*  버튼 */
.editButton {
  width: 172px;
  height: 45px;
  border: 1px solid var(--gray-7);
  border-radius: 10px;
  background-color: var(--gray-1);
  color: var(--gray-7);
}

.logoutButton {
  width: 172px;
  height: 45px;
  border: 1px solid var(--primary-red);
  border-radius: 10px;
  background-color: var(--gray-1);
  color: var(--primary-red);
}
</style>
