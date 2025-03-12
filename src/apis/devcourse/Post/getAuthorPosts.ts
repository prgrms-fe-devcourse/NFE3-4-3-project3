import { type devPost, ExtractPostFromJson } from "@/types/devcourse/devPost";
import { POST } from '@/apis/devcourse/endpoints';
import devAPI from "@/config/axiosDevConfig";

export interface GetAuthorPostsRequest {
  authorId: string;
  offset?: number;
  limit?: number;
}
export interface GetAuthorPostsResponse {
  posts: devPost[];
}

export async function getAuthorPosts(request : GetAuthorPostsRequest) : Promise<GetAuthorPostsResponse> {
  const response = await devAPI.get(import.meta.env.VITE_API_BASE_URL + POST.getAuthorPost(request.authorId), {
    params: {
      offset: request.offset,
      limit: request.limit,
    },
  });
  console.log(response);
  return {
    posts: response.data.map((e)=>ExtractPostFromJson(e))
  }
}
