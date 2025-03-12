import { deletePost } from '@/apis/devcourse/Post/deletePost';
import { useMutation } from '@tanstack/vue-query';

const useDeletePost = () => {
  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => deletePost({ id: postId }),
  });

  return deletePostMutation;
};

export default useDeletePost;
