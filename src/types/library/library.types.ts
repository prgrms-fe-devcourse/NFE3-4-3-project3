import type { Book } from '../libraryType.ts'

export const regionCodes = {
  '서울' : 11,
  '부산' : 21,
  '대구' : 22,
  '인천' : 23,
  '광주' : 24,
  '대전' : 25,
  '울산' : 26,
  '세종' : 29,
  '경기' : 31,
  '강원' : 32,
  '충북' : 33,
  '충남' : 34,
  '전북' : 35,
  '전남' : 36,
  '경북' : 37,
  '경남' : 38,
  '제주' : 39,
}

export type RegionKey = keyof typeof regionCodes;

export type Libraries = {
  lib : {
    libInfo : LibraryInfoResult
  }

};

export interface LibraryResult {
  pageNo: number;
  pageSize: number;
  numFound: number;
  resultNum: number;
  libs: Libraries[];
}

export interface LibraryInfoResult {
  BookCount : string;
  address : string;
  closed : string;
  fax : string;
  homepage : string;
  latitude : string;
  libCode : string;
  libName : string;
  longitude : string;
  operatingTime : string;
  tel : string;
}

export type PopularBookResponse = {
  book : Book;
}
export interface LibraryPopularBooksType {
  age0Books : PopularBookResponse[];
  age6Books : PopularBookResponse[];
  age8Books : PopularBookResponse[];
  age14Books : PopularBookResponse[];
  age20Books : PopularBookResponse[];
  loanBooks : PopularBookResponse[];
}
