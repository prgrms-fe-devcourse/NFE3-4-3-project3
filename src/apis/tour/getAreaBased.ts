import tourAPI from '@/config/axiosTourConfig';
import { AREABASED } from '@/apis/tour/tourEndpoints';

interface AreaData {
  pageNo?: number;
  contentTypeId?: string;
  areaCode?: string;
  category?: number | string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
}

//검색페이지 첫 렌더링 화면(숙소 전체 불러오기,검색 페이지에서 필터 value로 areaCode, catrgory 전달)
export async function fetchAreaBasedData(item: AreaData = {}) {
  try {
    const response = await tourAPI.get(AREABASED.get, {
      params: {
        contentTypeId: item.contentTypeId,
        areaCode: item.areaCode,
        pageNo: item.pageNo,
        cat3: item.cat3,
      },
    });
    const data = response.data.response.body.items?.item;
    return data;
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error;
  }
}
