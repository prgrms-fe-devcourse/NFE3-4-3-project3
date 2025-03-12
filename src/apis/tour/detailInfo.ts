import tourAPI from '@/config/axiosTourConfig';
import { INFO } from '@/apis/tour/tourEndpoints';

//상세페이지 동반여행정보 호출 함수 (검색페이지에서 contentId,contentTypeId를 파라메터로 받음)

interface InfoData {
  contentId: number | string;
  contentTypeId: number | string;
}
export async function fetchDetailInfoData(requiredData: InfoData) {
  try {
    const response = await tourAPI.get(INFO.get, {
      params: {
        contentId: requiredData.contentId,
        contentTypeId: requiredData.contentTypeId,
      },
    });
    const data = response.data.response.body.items.item;
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error;
  }
}
