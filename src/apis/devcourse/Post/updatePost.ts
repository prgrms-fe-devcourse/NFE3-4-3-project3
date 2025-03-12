import { type devPost, ExtractPostFromJson } from '@/types/devcourse/devPost';
import { POST } from '@/apis/devcourse/endpoints';
import devAPI from '@/config/axiosDevConfig';

export interface UpdatePostRequest {
  postId: string;
  title: string;
  channelId: string;
  image?: File;
  imageToDeletePublicId?: string;
}
export interface UpdatePostResponse {
  post: devPost;
}

export async function updatePost(request: UpdatePostRequest): Promise<UpdatePostResponse> {
  const form = new FormData();
  form.append('postId', request.postId);
  form.append('title', request.title);
  form.append('channelId', request.channelId);
  if (request.image && request.imageToDeletePublicId) {
    form.append('image', request.image);
    form.append('imageToDeletePublicId', request.imageToDeletePublicId);
  }
  const response = await devAPI.put<devPost>(
    import.meta.env.VITE_API_BASE_URL + POST.update,
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
