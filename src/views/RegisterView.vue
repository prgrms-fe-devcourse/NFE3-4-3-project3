<script lang="ts" setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import router from "@/router";
import axiosApi from "@/config/axiosConfig";
import { AUTH_CONFIG } from "@/config/authConfig";

const address = ref<string>("");
const domain = ref<string>("@naver.com");
const password1 = ref<string>("");
const password2 = ref<string>("");
const fullName = ref<string>("");



const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(address.value + domain.value);
};

const validatePassword = () => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,16}$/;
  // const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;


  return passwordPattern.test(password1.value);
};





const validateForm = () => {
  if (!validateEmail()) {
    message.error("올바른 이메일 주소를 입력해주세요.");
    return false;
  }
  if (!fullName.value) {
    message.error("닉네임을 입력해주세요.");
    return false;
  }
  if (!validatePassword()) {
    message.error("비밀번호는 8~16자이며, 영문/숫자/특수문자 중 2가지 이상 포함해야 합니다.");
    return false;
  }
  if (password1.value !== password2.value) {
    message.error("비밀번호가 일치하지 않습니다.");
    return false;
  }
  return true;
};

const handleSignUp = async () => {
  if (!validateForm()) return;

  try {
    const response = await axiosApi.post("/signup", {

      email: address.value + domain.value,
      password: password1.value,
      fullName: fullName.value,
    });

    if (response.status === 400) {
      message.error("이메일 중복")

    } else {
      message.success("회원가입 성공!");
      router.push("/login");

    }
  } catch (error) {
    console.error(error)
    message.error("회원가입 실패! 다시 시도해주세요.", 1);
  }
};

const handleKakaoLogin = (provider: "KAKAO" | "NAVER" | "GOOGLE") => {
  const config = AUTH_CONFIG[provider];
  const authUrl = `${config.AUTH_URL}?client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&response_type=code`;
  window.location.href = authUrl;
};

const handleSocialLogin = (provider: "NAVER" | "GOOGLE") => {
  const config = AUTH_CONFIG[provider];
  const authUrl = `${config.AUTH_URL}?client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&response_type=code&scope=${encodeURIComponent(config.SCOPE)}`;
  window.location.href = authUrl;
};

</script>

<template>
  <div class="layout">
    <div class="logo">
      <img src="/icons/SignUp/logo.svg" style="width: 300px; height: 80px" />
    </div>

    <div style="display: flex; margin-top: 43px; margin-left: 212px;">
      <div class="input-group">
        <div class="input-text">이메일 입력</div>

        <a-input-group compact style="width: 332px;">
          <a-auto-complete class="input" v-model:value="address" placeholder="Email" />
          <a-select class="input-mail" v-model:value="domain">
            <a-select-option value="naver">@naver.com</a-select-option>
            <a-select-option value="google">@google.com</a-select-option>
          </a-select>
        </a-input-group>

        <div class="input-text">닉네임 입력</div>
        <div class="">
          <a-input class="input-name" v-model:value="fullName" placeholder="닉네임을 입력해주세요">
          </a-input>
        </div>

        <div class="input-text">비밀번호 입력</div>
        <a-input-password class="input-pass" v-model:value="password1" placeholder="비밀번호를 입력해주세요" />
        <div class="small-text"> 영문 대·소문자/숫자.특수문자 중 2가지 이상 조합, 8~16글자 </div>

        <div class="input-text">비밀번호 확인</div>
        <a-input-password class="input-pass" v-model:value="password2" placeholder="비밀번호를 다시 입력해주세요" />

        <div>
          <a-button type="primary" class="button" @click="handleSignUp">회원가입</a-button>
        </div>
      </div>


      <div style="margin-top: 23px; margin-left: 75px; ">
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="96" viewBox="0 0 2 96" fill="none">
          <path d="M1.0957 0L1.0957 96" stroke="#595959" stroke-opacity="0.5" />
        </svg>

        <div class="text">또는</div>

        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="96" viewBox="0 0 2 96" fill="none">
          <path d="M1.0957 0L1.0957 96" stroke="#595959" stroke-opacity="0.5" />
        </svg>
      </div>

      <div>
        <div class="social-signup">
          <img style="width: 110%;" src="/icons/SignUp/kakao.svg" @click="() => handleKakaoLogin('KAKAO')" /> <br>
          <img class="social-btn" style="margin-top: 11px; width: 110%" src=" /icons/SignUp/naver.svg"
            @click="() => handleSocialLogin('NAVER')" />
          <br>
          <img class="social-btn" style="margin-top: 11px; width: 110%" src="/icons/SignUp/google.svg"
            @click="() => handleSocialLogin('GOOGLE')" />
        </div>
      </div>
    </div>



  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 903px;
}

.logo {
  margin-top: 48px;
  margin-left: 470px;
}

.input-group {
  width: 339px;
  margin-top: -20px;

  .input-text {
    margin: 1rem 0 .5rem
  }

  .input {
    width: 191px;
  }

  .input-mail {
    width: 142px;
  }

  .input-name {
    width: 332px;
    padding: 4px 11px;
    height: 38px;
    font-size: 16px;

  }

  .input-pass {
    width: 332px;
    padding: 4px 11px;
    margin-bottom: 5px;
    height: 38px;
    font-size: 15px;
  }
}

::v-deep .ant-input-group .ant-select-selector {
  height: 38px;
  font-size: 15px;
  padding: 4px 11px;

  .ant-select-selection-search-input {
    height: 100% !important;
  }
}

::v-deep .ant-select-selector .ant-select-selection-search-input {
  padding: 11px 1px 4px 1px;
  padding: 11px;
}

.small-text {
  color: var(--gray-6, #bfbfbf);
  font-size: 10px
}

.button {
  width: 100px;
  margin-left: 220px;
  margin-top: 20px;
  background-color: #6472fc;
}

.text {
  color: rgba(25, 25, 25, 0.50);
  font-size: 14px;
  font-style: normal;
  margin-left: -10px;
}

.social-signup {
  margin-top: 50px;
  margin-left: 87.9px;
}

.text-error {
  color: red;
}

.text-success {
  color: green;
}
</style>
