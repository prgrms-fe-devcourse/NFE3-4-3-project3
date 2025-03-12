import type { devUser } from '@/types/devcourse/devUser';
import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

import { login, type LoginRequest, type LoginResponse } from '@/apis/devcourse/Auth/login';
import { logout } from '@/apis/devcourse/Auth/logout';
import { getUser, type GetUserRequest, type GetUserResponse } from '@/apis/devcourse/User/getUser';
import { signup, type SignupRequest } from '@/apis/devcourse/Auth/signup';
import { updateUser } from '@/apis/devcourse/User/updateUser';
import { uploadPhoto } from '@/apis/devcourse/User/uploadPhoto';

export const useAuthStore = defineStore('auth', ()=>{
  const user = ref<devUser | null>(null);
  const token = ref<string | null>(localStorage.getItem('jwt'));
  const userId = ref<string | null>(localStorage.getItem('uid'));
  const isAuth = ref<boolean>(false);

  if(localStorage.getItem('jwt')){
    isAuth.value = true;
  }

  async function GetUser() {
    if(token.value && userId.value){
      const request : GetUserRequest = { id: userId.value };
      const response : GetUserResponse = await getUser(request);
      user.value = response.user;
      isAuth.value = true;
    }
  }
  async function Login(email: string, password: string){
    try{
      const request : LoginRequest = { email, password };
      const response : LoginResponse = await login(request);
      localStorage.setItem('jwt', response.token);
      localStorage.setItem('uid', response.user._id);
      user.value = response.user;
      token.value = response.token;
      userId.value = response.user._id
      isAuth.value = true;
    }
    catch(e){
      console.log('Login failed : ' + e);
      throw e;
    }

  }
  async function Logout(){
    const response : boolean = await logout();
    if(response){
      localStorage.removeItem('jwt');
      localStorage.removeItem('uid');
      user.value = null;
      token.value = null;
      userId.value = null;
      isAuth.value = false;
    }
  }
  async function Signup(fullName : string, email : string, password : string){
    try{
      const request : SignupRequest = { fullName, email, password };
      await signup(request);
    }
    catch(e){
      console.log('Signup failed : ' + e);
      throw e;
    }
  }
  async function UpdateUser(fullName : string, username : string){
    try{
      updateUser({
        fullName : fullName,
        username : username
      });
      if(user.value) user.value.fullName = fullName;
    }
    catch(e){
      console.log(e);
      throw e;
    }
  }
  async function UploadPhoto(image : File, isCover : boolean){
    try{
      await uploadPhoto({image: image, isCover : isCover});
      GetUser();
    }
    catch(e){
      console.log(e);
      throw e;
    }
  }


  // 유저 아이디를 token 값에서 추출 할 수 있나?
  onMounted(async ()=>{
    GetUser();
  });

  return {
    user,
    token,
    isAuth,
    Login,
    Logout,
    Signup,
    UpdateUser,
    UploadPhoto
  };
});
