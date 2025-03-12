import { getChannelPosts } from '@/apis/devcourse/Post/getChannelPosts';
import { MissingChannelId } from '@/constants/communityConsts';
import QUERY_KEY from '@/constants/queryKey';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
// TODO
// [x] 데이터 불러오기
// [] 최신순, 댓글순으로 데이터 정렬해서 보여주기
// [x] 강아지, 고양이, 기타 축종 선택해서 보여주기

const useFetchMissingPost = () => {
  const { data: postCards, isLoading } = useQuery({
    queryKey: QUERY_KEY.missingList,
    queryFn: () =>
      getChannelPosts({
        channelId: MissingChannelId,
        limit: 6,
      }),
  });

  return { postCards, isLoading };
};
export default useFetchMissingPost;
