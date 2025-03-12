import tourAPI from '@/config/axiosTourConfig';
import { IMAGE } from '@/apis/tour/tourEndpoints';

//상세페이지 동반여행정보 호출 함수 (검색페이지에서 contentId를 파라메터로 받음)
interface ImageData {
  contentId: number | string;
}

export async function fetchTourImageData(requiredData: ImageData) {
  try {
    const response = await tourAPI.get(IMAGE.get, {
      params: {
        contentId: requiredData.contentId,
      },
    });
    const data = response.data.response.body.items?.item;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error;
  }
}
