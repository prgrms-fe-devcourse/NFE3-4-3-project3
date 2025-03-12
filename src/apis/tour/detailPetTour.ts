import tourAPI from '@/config/axiosTourConfig';
import { PETTOUR } from '@/apis/tour/tourEndpoints';

interface PetTourData {
  contentId: number | string;
}

//상세페이지 동반여행정보 호출 함수 (검색페이지에서 contentId를 파라메터로 받음)
export async function fetchPetTourData(requiredData: PetTourData) {
  try {
    const response = await tourAPI.get(PETTOUR.get, {
      params: {
        contentId: requiredData.contentId,
      },
    });
    const data = response.data.response.body.items.item;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error;
  }
}
