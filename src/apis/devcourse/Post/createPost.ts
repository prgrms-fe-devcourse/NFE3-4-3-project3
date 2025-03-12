import { type devPost, ExtractPostFromJson } from '@/types/devcourse/devPost';
import { POST } from '@/apis/devcourse/endpoints';
import devAPI from '@/config/axiosDevConfig';

export interface CreatePostRequest {
  title: string;
  channelId: string;
  image?: File;
}
export interface CreatePostResponse {
  post: devPost;
}

export async function createPost(request: CreatePostRequest): Promise<CreatePostResponse> {
  const form = new FormData();
  form.append('title', request.title);
  form.append('channelId', request.channelId);
  if (request.image) {
    form.append('image', request.image);
  }
  const response = await devAPI.post<devPost>(
    import.meta.env.VITE_API_BASE_URL + POST.create,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  console.log(response);
  return {
    post: ExtractPostFromJson(response.data),
  };
}
