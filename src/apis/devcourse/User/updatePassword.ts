import devAPI from "@/config/axiosDevConfig";
import { USER } from "@/apis/devcourse/endpoints";

export interface UpdatePasswordRequest {
  password : string;
}

export async function updatePassword(request: UpdatePasswordRequest): Promise<boolean> {
  const response = await devAPI.put(import.meta.env.VITE_API_BASE_URL + USER.updatePassword, {
    ...request
  });
  if(response.status === 200){
    return true;
  }
  return false;
}
