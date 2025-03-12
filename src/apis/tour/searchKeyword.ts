import tourAPI from '@/config/axiosTourConfig';

//API 테스트
import { KEYWORD } from '@/apis/tour/tourEndpoints';

// 숙소정보

interface KeywordItem {
  contentTypeId: string;
  areaCode: string;
  keyword: string;
  pageNo: number;
}

// 키워드 검색
export async function searchKeyword(item: KeywordItem) {
  console.log(item, 1);
  try {
    const response = await tourAPI.get(KEYWORD.get, {
      params: {
        pageNo: item.pageNo,
        contentTypeId: item.contentTypeId,
        areaCode: item.areaCode,
        listYN: 'Y',
        arrange: 'O',
        keyword: item.keyword,
      },
    });
    const data = response.data.response.body.items.item;
    return data; // API 응답 데이터를 반환
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error; // 호출한 곳에서 에러를 처리할 수 있도록 예외 던지기
  }
}
