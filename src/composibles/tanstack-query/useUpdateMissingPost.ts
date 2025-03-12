import { updatePost } from '@/apis/devcourse/Post/updatePost';
import { useMutation } from '@tanstack/vue-query';

const useUpdateMissingPost = () => {
  const updateFormMutation = useMutation({
    mutationFn: updatePost,
  });
  return updateFormMutation;
};
export default useUpdateMissingPost;
