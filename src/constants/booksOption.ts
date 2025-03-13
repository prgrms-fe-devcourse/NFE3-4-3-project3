import type { SearchType, SortOption } from '../types/libraryType'

// 검색 타입
export const searchTypeOptions: SearchType[] = [
  {
    label: '도서명',
    value: '도서명',
  },
  {
    label: '저자',
    value: '저자',
  },
]

// 정렬 옵션
export const sortTypeOptions: SortOption[] = [
  {
    label: '대출건수 순',
    value: 'loan',
  },
  {
    label: '도서명 순',
    value: 'title',
  },
  {
    label: '저자명 순',
    value: 'author',
  },
  {
    label: '출판사 순',
    value: 'pub',
  },
  {
    label: '출판년도 순',
    value: 'pubYear',
  },
  {
    label: 'ISBN 순',
    value: 'isbn',
  },
]
