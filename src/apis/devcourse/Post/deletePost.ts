import { type devPost, ExtractPostFromJson } from "@/types/devcourse/devPost";
import { POST } from '@/apis/devcourse/endpoints';
import devAPI from "@/config/axiosDevConfig";

export interface DeletePostRequest {
  id: string;
}
export interface DeletePostResponse {
  post : devPost;
}

export async function deletePost(request: DeletePostRequest): Promise<DeletePostResponse> {
  const response = await devAPI.delete<devPost>(import.meta.env.VITE_API_BASE_URL + POST.delete, {
    data: request
  });
  console.log(response);
  return {
    post: ExtractPostFromJson(response.data)
  }
}
