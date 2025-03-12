import { type devLike, ExtractLikeFromJson } from "@/types/devcourse/devLike";
import { LIKE } from '@/apis/devcourse/endpoints';
import devAPI from "@/config/axiosDevConfig";

export interface DeleteLikeRequest {
  id : string;
}
export interface DeleteLikeResponse {
  like : devLike;
}

export async function deleteLike(request : DeleteLikeRequest) : Promise<DeleteLikeResponse> {
  const response = await devAPI.delete(import.meta.env.VITE_API_BASE_URL + LIKE.delete, {
    data: {
      ...request
    }
  });
  console.log(response);
  return {
    like : ExtractLikeFromJson(response.data)
  }
}
