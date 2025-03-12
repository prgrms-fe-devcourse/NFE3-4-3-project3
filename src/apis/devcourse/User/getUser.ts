import devAPI from "@/config/axiosDevConfig";
import { USER } from "@/apis/devcourse/endpoints";
import { type devUser, ExtractUserFromJson } from "@/types/devcourse/devUser";

export interface GetUserRequest {
  id : string;
}
export interface GetUserResponse {
  user : devUser;
}

export async function getUser(request: GetUserRequest): Promise<GetUserResponse> {
  const response = await devAPI.get(import.meta.env.VITE_API_BASE_URL + USER.getUser(request.id));
  return {
    user: ExtractUserFromJson(response.data),
  };
};
