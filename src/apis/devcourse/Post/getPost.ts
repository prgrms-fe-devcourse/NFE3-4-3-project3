import { type devPost, ExtractPostFromJson } from "@/types/devcourse/devPost";
import devAPI from "@/config/axiosDevConfig";

export interface GetPostRequest {
  id: string;
}
export interface GetPostResponse {
  post : devPost;
}

export async function getPost(request: GetPostRequest): Promise<GetPostResponse> {
  const response = await devAPI.get<devPost>(import.meta.env.VITE_API_BASE_URL + `/posts/${request.id}`);
  console.log(response);
  return {
    post: ExtractPostFromJson(response.data)
  }
}
