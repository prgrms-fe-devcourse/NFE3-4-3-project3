import devAPI from "@/config/axiosDevConfig";
import { USER } from "@/apis/devcourse/endpoints";
import { type devUser, ExtractUserFromJson } from "@/types/devcourse/devUser";

export interface DeletePhotoRequest {
  isCover : boolean;
}
export interface DeletePhotoResponse {
  user : devUser;
}

export async function deletePhoto(request : DeletePhotoRequest) : Promise<DeletePhotoResponse> {
  console.log(request);
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + USER.deletePhoto, {
    ...request
  });
  console.log(response);
  return {
    user : ExtractUserFromJson(response.data)
  }
}
