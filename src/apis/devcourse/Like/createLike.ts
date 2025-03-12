import { type devLike, ExtractLikeFromJson } from "@/types/devcourse/devLike";
import { LIKE } from '@/apis/devcourse/endpoints';
import devAPI from "@/config/axiosDevConfig";
import { createNotification } from '../Notification/createNotification';
import { getPost } from '../Post/getPost';

export interface CreateLikeRequest {
  postId : string;
}
export interface CreateLikeResponse {
  like : devLike;
}

export async function createLike(request : CreateLikeRequest) : Promise<CreateLikeResponse> {
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + LIKE.create, {
    ...request
  });
  console.log(response);
  const Like = ExtractLikeFromJson(response.data);
  const post = (await getPost({id: request.postId})).post;
  createNotification({notificationType: 'LIKE', notificationTypeId: Like._id, postId: request.postId, userId: post.author._id});
  return {
    like : Like
  }
}
