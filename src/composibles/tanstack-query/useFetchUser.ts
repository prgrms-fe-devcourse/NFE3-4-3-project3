import { useQuery } from '@tanstack/vue-query';
import { getUser } from '@/apis/devcourse/User/getUser';

const useFetchUser = (userId: string) => {
  const { data } = useQuery({
    queryKey: ['user', { id: userId }],
    queryFn: () => getUser({ id: userId }),
  });

  return data;
};
export default useFetchUser;
