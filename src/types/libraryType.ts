// 도서 정보
export interface Book {
  addition_symbol: string
  authors: string
  bookDtlUrl: string
  bookImageURL?: string
  bookname: string
  class_nm: string
  class_no: string
  isbn13: string
  loan_count: string
  publication_year: string
  publisher: string
  vol: string
}

// 도서 목록 아이템
export interface BookItem {
  doc: Book
}

// 정렬 옵션 값
export type SortOptionValue = 'loan' | 'title' | 'author' | 'pub' | 'pubYear' | 'isbn'

// 정렬 옵션 라벨
export type SortOptionLabel =
  | '대출건수 순'
  | '도서명 순'
  | '저자명 순'
  | '출판사 순'
  | '출판년도 순'
  | 'ISBN 순'

// 정렬 옵션
export interface SortOption {
  label: SortOptionLabel
  value: SortOptionValue
}

// 검색 타입 라벨
export type SearchTypeLabel = '도서명' | '저자'

// 검색 타입 값
export type SearchTypeValue = '도서명' | '저자'

// 검색 타입
export interface SearchType {
  label: SearchTypeLabel
  value: SearchTypeValue
}

// 도서 상세 정보
export interface BookDetail {
  bookname: string
  authors: string
  publisher: string
  publication_year: string
  class_nm: string
  bookImageURL: string
  description: string
  isbn13: string
}

// 도서 별 이용 분석 데이터 도서 타입
export interface analysisBooksType {
  authors: string
  bookname: string
  isbn13: string
  publication_year: string
  publisher: string
  vol: string
}

// 추천 도서 타입
export interface ReaderRecBook {
  book: Book
}

// 연관 대출 도서 타입
export interface CoLoanBook {
  book: Book
}

// 전체 응답 타입
export interface BookRecommendation {
  readerRecBooks: ReaderRecBook[]
  coLoanBooks: CoLoanBook[]
}

// 이달의 키워드 타입
export interface MonthKeyword {
  keyword: {
    word: string
    weight: number
  }
}

// 이달의 키워드 응답 타입
export interface MonthKeywordResponse {
  keywords: MonthKeyword[]
  request: {
    month: string
  }
}

// 도서 상세 정보 응답 타입
interface BookDetailData {
  book : BookDetail;
}

// 기본 대출 상세 정보 타입
interface LoanDetail {
  ranking: number;
  name: string;
  loanCnt: number;
}

interface LoanTotalItem {
  Total: LoanDetail;
}

interface LoanRegionItem {
  regionResult: {
    region: LoanDetail;
  }[];
}

interface LoanAgeItem {
  ageResult: {
    age: LoanDetail;
  }[];
}

interface LoanGenderItem {
  genderResult: {
    gender: LoanDetail;
  }[];
}

export type LoanInfoItem =
  | LoanTotalItem
  | LoanRegionItem
  | LoanAgeItem
  | LoanGenderItem;

export interface BookDetailResponse {
  response : {
    request : {
      isbn13 : string;
      loaninfoYN : 'Y' | 'N';
    },
    detail : Array<BookDetailData>;
    loanInfo : Array<LoanInfoItem>;
  }
}

// 도서 상세 API 요청에 대한 응답 타입
export interface GetBookDetailResponse {
  detailData : BookDetail;
  loanInfoData : Array<LoanInfoItem>;
}
