import { useQuery } from '@tanstack/vue-query';
import { getShelterInfo, getShelterListApi } from '@/apis/adoption/shelter';
import { computed } from 'vue';

export const useFetchShelters = (org) => {
  // 1. 해당 지역내 모든 보호소를 조회
  const {
    data: shelters,
    isLoading: isLoadingShelters,
    refetch,
  } = useQuery({
    queryKey: ['shelters', 'list', org.uprCd, org.orgCd],
    queryFn: () => getShelterListApi(org.uprCd, org.orgCd),
  });

  // 다음쿼리가 실행될 준비가 되었는지 확인한다.
  const enabled = computed(() => {
    if (shelters.value && (shelters.value.length > 0 || shelters.value !== undefined)) {
      return true;
    }
    return false;
  });

  // 2. 보호소 별 상세정보를 조회
  const {
    data: shelterDetails,
    isLoading: isLoadingShelterDetails,
    // refetch,
  } = useQuery({
    queryKey: ['shelterDetails'],
    queryFn: () => {
      console.log('두번째 쿼리가 작동');
      return Promise.all(shelters.value.map((shelter) => getShelterInfo(shelter.careRegNo)));
    },
    enabled, // 준비 완료시 queryFn 실행
  });

  return { shelterDetails, isLoadingShelterDetails, refetch };
};
