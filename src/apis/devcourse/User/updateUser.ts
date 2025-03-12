import devAPI from "@/config/axiosDevConfig";
import { USER } from "@/apis/devcourse/endpoints";
import { type devUser, ExtractUserFromJson } from "@/types/devcourse/devUser";

export interface UpdateUserRequest {
  fullName : string;
  username : string;
}
export interface UpdateUserResponse {
  user : devUser;
}

export async function updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
  const response = await devAPI.put(import.meta.env.VITE_API_BASE_URL + USER.updateUser, {
    ...request
  });
  console.log(response);
  return {
    user: ExtractUserFromJson(response.data),
  };
};
