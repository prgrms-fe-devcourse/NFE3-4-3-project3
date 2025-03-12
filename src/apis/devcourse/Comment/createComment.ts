import { type devComment, ExtractCommentFromJson } from '@/types/devcourse/devComment';
import { COMMENT } from '@/apis/devcourse/endpoints';
import devAPI from '@/config/axiosDevConfig';
import { createNotification } from '../Notification/createNotification';
import { getPost } from '../Post/getPost';

export interface CreateCommentRequest {
  postId: string;
  comment : string;
}
export interface CreateCommentResponse {
  comment : devComment;
}

export async function createComment(request : CreateCommentRequest) : Promise<CreateCommentResponse> {
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + COMMENT.create, {
    ...request
  });
  // console.log(response);
  const Comment = ExtractCommentFromJson(response.data);
  const post = (await getPost({id: request.postId})).post;
  createNotification({notificationType: 'COMMENT', notificationTypeId: Comment._id, postId: request.postId, userId: post.author._id});
  return {
    comment : Comment
  }
}
