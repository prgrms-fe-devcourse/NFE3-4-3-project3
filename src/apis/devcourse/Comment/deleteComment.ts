import { type devComment, ExtractCommentFromJson } from '@/types/devcourse/devComment';
import { COMMENT } from '@/apis/devcourse/endpoints';
import devAPI from '@/config/axiosDevConfig';

export interface DeleteCommentRequest {
  id : string;
}
export interface DeleteCommentResponse {
  comment : devComment;
}

export async function deleteComment(request : DeleteCommentRequest) : Promise<DeleteCommentResponse> {
  const response = await devAPI.delete(import.meta.env.VITE_API_BASE_URL + COMMENT.delete, {
    data : request
  });
  console.log(response);
  return {
    comment : ExtractCommentFromJson(response.data)
  }
}
