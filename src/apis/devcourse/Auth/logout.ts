import devAPI from "@/config/axiosDevConfig";
import { AUTH } from "@/apis/devcourse/endpoints";

export async function logout() : Promise<boolean> {
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + AUTH.logout, {});
  if(response.status === 200){
    return true;
  }
  return false;
}
