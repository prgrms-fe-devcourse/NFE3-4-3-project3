import devAPI from "@/config/axiosDevConfig";
import { AUTH } from "@/apis/devcourse/endpoints";
import { type devUser, ExtractUserFromJson } from "@/types/devcourse/devUser";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  user : devUser;
  token: string;
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + AUTH.login, {
    ...request
  });
  console.log(response)
  return {
    user: ExtractUserFromJson(response.data.user),
    token: response.data.token,
  };
};

