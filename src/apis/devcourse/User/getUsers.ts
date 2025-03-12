import devAPI from "@/config/axiosDevConfig";
import { USER } from "@/apis/devcourse/endpoints";
import { type devUser, ExtractUserFromJson } from "@/types/devcourse/devUser";

export interface GetUsersRequest {
  offset : number;
  limit : number;
}
export interface GetUsersResponse {
  users : devUser[];
}

export async function getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
  const response = await devAPI.get(import.meta.env.VITE_API_BASE_URL + USER.getUserList, {
    params: {
      offset: request.offset,
      limit: request.limit,
    }
  });
  console.log(response)
  return {
    users : response.data.map((e)=>ExtractUserFromJson(e)),
  };
};
