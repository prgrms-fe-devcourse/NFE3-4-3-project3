import devAPI from '@/config/axiosDevConfig';
import { AUTH } from '@/apis/devcourse/endpoints';
import type { devUser } from "@/types/devcourse/devUser";

export interface SignupRequest {
  email: string;
  fullName: string;
  password: string;
}
export interface SignupResponse {
  user : devUser;
  token: string;
}

export async function signup(request : SignupRequest) : Promise<SignupResponse> {
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + AUTH.signup, {
    ...request
  });
  console.log(response);
  return response.data;
}
