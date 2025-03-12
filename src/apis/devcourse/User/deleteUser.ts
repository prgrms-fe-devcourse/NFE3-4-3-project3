import devAPI from "@/config/axiosDevConfig";
import { USER } from "@/apis/devcourse/endpoints";
import { type devUser, ExtractUserFromJson } from "@/types/devcourse/devUser";

export interface DeleteUserRequest {
  id: string;
}
export interface DeleteUserResponse {
  user: devUser[];
}

export async function deleteUser(request : DeleteUserRequest) : Promise<DeleteUserResponse> {
  const response = await devAPI.delete(import.meta.env.VITE_API_BASE_URL + USER.deleteUser, {
    data : request
  });
  console.log(response);
  return {
    user: response.data.map((e)=>ExtractUserFromJson(e))
  }
}
