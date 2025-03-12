import { COMMON } from '@/apis/tour/tourEndpoints';
import tourAPI from '@/config/axiosTourConfig';

interface DataId {
  contentTypeId: string;
  contentId: string;
}

// 공통정보 조회
export async function detailCommon(dataId: DataId) {
  try {
    const response = await tourAPI.get(COMMON.get, {
      params: {
        contentId: dataId.contentId,
        contentTypeId: dataId.contentTypeId,
        defaultYN: 'Y',
        firstImageYN: 'Y',
        areacodeYN: 'Y',
        catcodeYN: 'Y',
        addrinfoYN: 'Y',
        mapinfoYN: 'Y',
        overviewYN: 'Y',
      },
    });
    console.log(response);
    const data = response.data.response.body.items?.item;
    // console.log(data);
    return data; // API 응답 데이터를 반환
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error; // 호출한 곳에서 에러를 처리할 수 있도록 예외 던지기
  }
}
