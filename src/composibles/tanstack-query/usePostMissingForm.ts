import { useMutation } from '@tanstack/vue-query';
import { createPost } from '@/apis/devcourse/Post/createPost';

const usePostMissingForm = () => {
  const postFormMutation = useMutation({
    mutationFn: createPost,
  });
  return postFormMutation;
};

export default usePostMissingForm;
