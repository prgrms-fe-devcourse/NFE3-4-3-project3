<script setup lang="ts">
import TextBlock, { type TextBlockDescriptor } from '@/components/common/TextBlock.vue';
import { ref, useTemplateRef } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const IntroText : TextBlockDescriptor[] = [
  {
    content: 'Petner와 함께,',
    color: 'var(--gray-10)', bgColor:'', font:'Pretendard', weight:700, size: '40px', margin: 'my-0'
  },
  {
    content: '사랑하는 반려동물과 더 가까워지세요!',
    color: 'var(--gray-10)', bgColor:'', font:'Pretendard', weight:700, size: '40px', margin: 'my-0'
  }
];
const SignupText : TextBlockDescriptor[] = [
  {
    content: 'Sign Up',
    color: 'var(--gray-10)', bgColor:'', font:'Paperlogy', weight:600, size: '32px', margin: 'my-3'
  },
  {
    content: '반려동물과 더 행복한 삶을 위한 첫걸음!',
    color: 'var(--gray-7)', bgColor:'', font:'Pretendard', weight:400, size: '16px', margin: 'my-0'
  },
  {
    content: 'Petner에 가입하고 다양한 혜택과 서비스를 경험해 보세요.',
    color: 'var(--gray-7)', bgColor:'', font:'Pretendard', weight:400, size: '16px', margin: 'mt-0 mb-3'
  }
];
const SwitchText : TextBlockDescriptor[] = [
  {
    content: '아이디가 있으신가요?',
    color: 'var(--gray-7)', bgColor:'', font:'Pretendard', weight:400, size: '16px',
  },
  {
    content: '로그인',
    color: 'var(--secondary-red)', bgColor:'', font:'Pretendard', weight:400, size: '16px',
  },
];

// 제출 버튼 비활성화 시 (폼 검증 실패) secondary 색으로 변경
const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const auth = useAuthStore();
const toast = useTemplateRef<HTMLDivElement>('toast');
const toastMsg = '회원가입에 실패했습니다. 다시 시도해주세요.';

const emailRules = [
  (value: string) => !!value || "Email is required.",
  (value: string) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
];
const passwordRules = [
  (value: string) => !!value || "Password is required.",
  (value: string) => value.length >= 4 || "Password must be at least 4 characters.",
];

async function HandleAction() {
  try{
    await auth.Signup(name.value, email.value, password.value);
    router.replace('/login');
  }
  catch(e){
    toast.value?.classList.add('show');
    console.log(e);
  }
}
</script>

<template>
  <div ref='toast'
    class="toast position-fixed start-50 translate-middle-x align-items-center text-gray-1 bg-primary-red border-0"
    role="alert" aria-live="assertive" aria-atomic="true"
    style="top: 90px; transition: all 0.5s ease-in-out;"
  >
    <div class="d-flex">
      <div class="toast-body">
        {{ toastMsg }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div class="container" style="width: 67%; height: 1000px; margin-top: 100px; min-width: 1000px;">
    <div class="d-flex flex-column">
      <TextBlock :text-block="IntroText[0]" />
      <TextBlock :text-block="IntroText[1]" />
      <div class="d-flex" style="justify-content: space-around; height: 750px;">
        <div class="decorative-image w-50" style="aspect-ratio: 1/1;"></div>
        <div style="width:30%">
          <TextBlock :text-block="SignupText[0]" />
          <TextBlock :text-block="SignupText[1]" />
          <TextBlock :text-block="SignupText[2]" />
          <form @submit.prevent="HandleAction">
            <div class="d-flex flex-column">
              <label class="my-2" for="name" style="font-family: Paperlogy;">Name</label>
              <input v-model='name' required class="my-2 bg-gray-2 border-0 rounded-5 p-3" type="text" placeholder="Name" id="name" >
              <label class="my-2" for="email" style="font-family: Paperlogy;">Email</label>
              <input :rules="emailRules" v-model='email' required class="my-2 bg-gray-2 border-0 rounded-5 p-3" type="email" placeholder="Email" id="email" >
              <label class="my-2" for="password" style="font-family: Paperlogy;">Password</label>
              <input :rules="passwordRules" v-model='password' required class="my-2 bg-gray-2 border-0 rounded-5 p-3" type="password" placeholder="Password" id="password" >
              <button type="submit" class="btn rounded-5 text-gray-1 bg-primary-red my-2 w-100" style="width:200px; height:62.5px;">
                <div class="d-flex justify-content-center position-relative">
                  <div :style="{ fontFamily:' Pretendard', fontSize: '20px', fontWeight: 400 }">Sign Up</div>
                </div>
              </button>
            </div>
          </form>
          <div class="w-100 justify-content-center d-flex my-3 gap-3">
            <TextBlock :text-block="SwitchText[0]" />
            <router-link style="text-decoration: none" to='/login?next=/signup'><TextBlock :text-block="SwitchText[1]" /></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.decorative-image {
  background-image: url('/LoginAndSignup/Image.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
