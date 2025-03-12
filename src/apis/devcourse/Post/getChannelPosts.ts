import { type devPost, ExtractPostFromJson } from '@/types/devcourse/devPost';
import { POST } from '@/apis/devcourse/endpoints';
import devAPI from '@/config/axiosDevConfig';

export interface GetChannelPostsRequest {
  channelId: string;
  offset?: number;
  limit?: number;
}
export interface GetChannelPostsResponse {
  posts: devPost[];
}

export async function getChannelPosts(
  request: GetChannelPostsRequest,
): Promise<GetChannelPostsResponse> {
  const response = await devAPI.get(POST.getChannelPost(request.channelId), {
    params: {
      offset: request.offset,
      limit: request.limit,
    },
  });
  return {
    posts: response.data.map((e) => ExtractPostFromJson(e)),
  };
}
