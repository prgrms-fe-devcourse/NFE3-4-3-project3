import tourAPI from '@/config/axiosTourConfig';

//API 테스트
import { INTRO } from '@/apis/tour/tourEndpoints';

interface DataId {
  contentTypeId: string | number;
  contentId: string | number;
}

// 소개정보조회 조회
export async function detailIntro(dataId: DataId) {
  try {
    const response = await tourAPI.get(INTRO.get, {
      params: {
        contentId: dataId.contentId,
        contentTypeId: dataId.contentTypeId,
      },
    });

    const data = response.data.response.body.items.item;
    console.log(response.data);
    return data; // API 응답 데이터를 반환
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error; // 호출한 곳에서 에러를 처리할 수 있도록 예외 던지기
  }
}
