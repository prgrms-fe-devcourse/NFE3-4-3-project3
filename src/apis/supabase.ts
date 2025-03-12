/**
 * supabase.ts
 * 
 * Supabase 연동 + 유기동물(Animal) 테이블 관련 함수들을 모두 모아둔 파일
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_BASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const PAGE_SIZE = 9;

// ==================================================
// 1) 기본 조회 함수들 (기존 코드)
// ==================================================

// (1) 동물 종류 관계없이 전체 조회
export async function getAnimalList(page: number) {
  const { data, error } = await supabase
    .from('Animal')
    .select('*')
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  console.log('supabase data', data);
  return data ? data : error;
}

// (2) 동물 종류별 조회
type KindCdType = '개' | '고양이' | '기타축종';
export async function getAnimalListBykindCd(kindCd: KindCdType, page: number) {
  const { data, error } = await supabase
    .from('Animal')
    .select('*')
    .ilike('kindCd', `[${kindCd}]%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  console.log('supabase data', data);
  return data ? data : error;
}

// (3) 공고 올라온 지역명으로 조회 -> orgNm(관할기관) 컬럼에서 조회
type OrgNameType = '서울특별시' | '인천광역시' | '대구광역시' | '부산광역시';
export async function getAniamlListByOrg(orgName: OrgNameType, page: number) {
  const { data, error } = await supabase
    .from('Animal')
    .select('*')
    .ilike('orgNm', `${orgName}%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  console.log('supabase data', data);
  return data ? data : error;
}

// (4) 성별로 조회
type SexType = 'M' | 'F';
export async function getAnimalListBySex(sexCd: SexType, page: number) {
  const { data, error } = await supabase
    .from('Animal')
    .select('*')
    .eq('sexCd', sexCd)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  console.log('supabase data', data);
  return data ? data : error;
}

// (5) 입양 상태로 조회
//    state = true  -> 입양 가능한 상태만 반환 (보호중)
//    state = false -> 입양 불가능(종료/반환), 자연사는 제외
export async function getAnimalListByState(state: boolean, page: number) {
  const adoptionState = state ? '보호중' : '종료(반환)';

  const { data, error } = await supabase
    .from('Animal')
    .select('*')
    .eq('processState', adoptionState)
    // 예: 성별까지 추가로 필터링하고 싶으면 .eq('sexCd', 'M') 등
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  console.log('supabase data', data);
  return data ? data : error;
}

// (6) 유기동물 코드(desertionNo)로 특정 동물 조회
export async function getAnimalInfo(code: string) {
  const { data, error } = await supabase
    .from('Animal')
    .select('*')
    .eq('desertionNo', code);

  return data ? data : error;
}

// (7) 쿼리로 조회
interface GetAnimalListParams {
  kindCd?: KindCdType;    // 개, 고양이, 기타축종
  orgName?: OrgNameType;  // 시·도 (ex: 서울특별시)
  sexCd?: SexType;        // M, F
  state?: boolean;        // true: 입양가능, false: 입양불가능
  species?: string;       // 품종 (kindCd를 부분일치로 검색)
  page: number;
  queryStart?: string;    // 조회 시작일 (YYYYMMDD)
  queryEnd?: string;      // 조회 종료일 (YYYYMMDD)
}

export async function getAnimalListQuery(params: GetAnimalListParams) {
  const { orgName, sexCd, state, page, queryStart, queryEnd, species, kindCd } = params;
  const adoptionState = state !== undefined
    ? (state ? '보호중' : '종료(반환)')
    : undefined;

  let query = supabase.from('Animal').select('*');

  // 축종 조건 (ex: [개]%)
  if (kindCd) {
    query = query.ilike('kindCd', `[${kindCd}]%`);
  }

  // 품종 조건 (ex: "%비글%" )
  if (species) {
    query = query.ilike('kindCd', `%${species}%`);
  }

  // 지역(관할기관) 조건 (orgNm)
  if (orgName) {
    query = query.ilike('orgNm', `${orgName}%`);
  }

  // 성별 조건
  if (sexCd) {
    query = query.eq('sexCd', sexCd);
  }

  // 상태 조건 (processState)
  if (adoptionState) {
    query = query.eq('processState', adoptionState);
  }

  // 공고 기간 (noticeSdt ~ noticeEdt)
  if (queryStart && queryEnd) {
    query = query.gte('noticeSdt', queryStart); 
    query = query.lte('noticeEdt', queryEnd);
  }

  // 페이지네이션
  query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, error } = await query;
  console.log('supabase data', data);
  return data ? data : error;
}

// ==================================================
// 2) 추가 헬퍼 함수들 (옵션용)
// ==================================================

/**
 * (A) 지역 옵션을 시·도 단위로 추출
 *    - ex) orgNm이 "서울특별시 강남구"이면 -> "서울특별시" 만 추출
 */
export async function fetchRegionOptions(): Promise<string[]> {
  const { data, error } = await supabase
    .from('Animal')
    .select('orgNm')
    .order('orgNm', { ascending: true });

  if (error) {
    console.error('fetchRegionOptions error:', error);
    return [];
  }
  if (!data) return [];

  // 중복 제거
  const setOfRegions = new Set<string>();
  data.forEach(item => {
    if (item.orgNm) {
      // "경기도 성남시", "서울특별시 강남구" -> 첫 단어만 (예: "서울특별시")
      const splitted = item.orgNm.split(' ');
      const cityDo = splitted[0]; 
      setOfRegions.add(cityDo);
    }
  });

  return Array.from(setOfRegions).sort();
}

/**
 * (B) 성별 옵션 (M, F 등)
 */
export async function fetchSexOptions(): Promise<string[]> {
  const { data, error } = await supabase
    .from('Animal')
    .select('sexCd')
    .order('sexCd', { ascending: true });

  if (error) {
    console.error('fetchSexOptions error:', error);
    return [];
  }
  if (!data) return [];

  const setOfSex = new Set<string>();
  data.forEach(item => {
    if (item.sexCd) {
      setOfSex.add(item.sexCd);
    }
  });

  return Array.from(setOfSex).sort();
}

/**
 * (C) 상태 옵션 (processState)
 *    - ex) '보호중', '종료(반환)', '종료(입양)', '자연사' 등
 */
export async function fetchStateOptions(): Promise<string[]> {
  const { data, error } = await supabase
    .from('Animal')
    .select('processState')
    .order('processState', { ascending: true });

  if (error) {
    console.error('fetchStateOptions error:', error);
    return [];
  }
  if (!data) return [];

  const setOfState = new Set<string>();
  data.forEach(item => {
    if (item.processState) {
      setOfState.add(item.processState);
    }
  });

  return Array.from(setOfState).sort();
}

/**
 * (D) 품종 옵션 (kindCd) 전체 목록
 *    - ex) "[개] 비글", "[고양이] 한국 고양이" 등
 */
export async function fetchBreedAllList(): Promise<string[]> {
  const { data, error } = await supabase
    .from('Animal')
    .select('kindCd')
    .order('kindCd', { ascending: true });

  if (error) {
    console.error('fetchBreedAllList error:', error);
    return [];
  }
  if (!data) return [];

  const setOfKindCd = new Set<string>();
  data.forEach(item => {
    if (item.kindCd) {
      setOfKindCd.add(item.kindCd);
    }
  });

  return Array.from(setOfKindCd).sort();
}
