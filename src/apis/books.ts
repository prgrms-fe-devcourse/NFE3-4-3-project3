import LibraryApi from '../config/axiosLibraryConfig'
import { LIBRARY_ENDPOINT } from './endpoint'
import type {
  BookDetail,
  BookDetailResponse,
  BookItem,
  BookRecommendation,
  GetBookDetailResponse,
  MonthKeywordResponse,
  SearchTypeValue,
  SortOptionValue,
} from '../types/libraryType'
import type { KakaoAddress } from '../types/location.types.ts'
import { regions } from '../constants/detail-region-code.ts'

interface BookListParams {
  pageNo: number
  pageSize: number
  format: string
  title?: string
  author?: string
  sort?: SortOptionValue
  keyword?: string
}
import type { QueryItemRankBook, QueryItemReader } from '../types/Book'
import dayjs from 'dayjs'
import type { AxiosResponse } from 'axios'

export const getBookList = async (
  searchKeyword: string,
  pageNo: number,
  searchType: SearchTypeValue,
  sortType: SortOptionValue,
  selectedKeyword: string,
): Promise<BookItem[]> => {
  try {
    const params: BookListParams = {
      pageNo,
      pageSize: 18,
      format: 'json',
      sort: sortType,
    }

    if (searchType === '도서명') {
      params.title = searchKeyword
    } else if (searchType === '저자') {
      params.author = searchKeyword
    }

    if (selectedKeyword) {
      params.keyword = selectedKeyword
    }

    const response = await LibraryApi.get(LIBRARY_ENDPOINT.bookList, {
      params,
    })

    const responseData = await response.data.response.docs

    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getBookDetail = async (isbn13: number): Promise<GetBookDetailResponse> => {
  try {
    const response: AxiosResponse<BookDetailResponse> = await LibraryApi.get(
      LIBRARY_ENDPOINT.bookDetail,
      {
        params: {
          isbn13: isbn13,
          loaninfoYN: 'Y',
          format: 'json',
        },
      },
    )

    const detailData = response.data.response.detail[0].book
    const loanInfoData = response.data.response.loanInfo

    return {
      detailData,
      loanInfoData,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 대출 가능한 도서관 조회
export const getLibraryLoanPossible = async (
  isbn13: number,
  regionCode: number,
  detailRegionCode: number | null,
) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryLoanPossible, {
      params: {
        isbn: isbn13,
        region: regionCode,
        dtl_region: detailRegionCode,
        format: 'json',
        pageSize: 300,
        pageNo: 1,
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 도서 별 이용 분석
export const getLibraryUsageAnalysis = async (isbn13: number) => {
  try {
    const response = await LibraryApi.get<{ response: BookRecommendation }>(
      LIBRARY_ENDPOINT.libraryUsageAnalysis,
      {
        params: {
          isbn13: isbn13,
          format: 'json',
        },
      },
    )

    // 연관 대출 도서
    const coLoanBooksData = response.data.response.coLoanBooks
    // 다독자를 위한 추천 도서
    const readerRecBooksData = response.data.response.readerRecBooks

    return {
      coLoanBooksData,
      readerRecBooksData,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 이달의 키워드
export const getMonthKeyword = async (): Promise<MonthKeywordResponse> => {
  try {
    const lastMonth = dayjs().subtract(1, 'month').format('YYYY-MM')
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.keyword, {
      params: {
        month: lastMonth,
        format: 'json',
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getLibraryInfo = async (address: KakaoAddress) => {
  try {
    const detailRegionCode = regions[address.regionDepth2]
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryDetail, {
      params: {
        dtl_region: detailRegionCode,
        format: 'json',
        pageSize: 25,
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getLibraryInfoByRegion = async (regionCode: number, pageNo: number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryDetail, {
      params: {
        region: regionCode,
        format: 'json',
        pageNo: pageNo,
        pageSize: 11,
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getLibraryInfoByDetailRegion = async (detailRegionCode: number, pageNo: number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryDetail, {
      params: {
        dtl_region: detailRegionCode,
        format: 'json',
        pageNo: pageNo,
        pageSize: 11,
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getLibraryInfoByLibraryCode = async (libraryCode: number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryDetail, {
      params: {
        libCode: libraryCode,
        format: 'json',
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getLibraryPopularBooks = async (libCode: number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.libraryPopularBook, {
      params: {
        libCode: libCode,
        format: 'json',
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getDetailRegionReadAnalysis = async (detailRegion: number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.readQuantityAnalysis, {
      params: {
        dtl_region: detailRegion,
        format: 'json',
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getRegionReadAnalysis = async (region: number) => {
  try {
    const response = await LibraryApi.get(LIBRARY_ENDPOINT.readQuantityAnalysis, {
      params: {
        region: region,
        format: 'json',
      },
    })
    return response.data.response
  } catch (error) {
    console.error(error)
  }
}

export const getBookToHome = async (query: QueryItemReader | QueryItemRankBook) => {
  try {
    let params: { [key: string]: any } = { format: 'json' }
    let bookType: string = ''
    if ('type' in query) {
      bookType = LIBRARY_ENDPOINT.bookwormList
      params = {
        ...params,
        type: query.type,
        isbn13: query.isbn13,
      }
    }

    if ('startDt' in query) {
      bookType = LIBRARY_ENDPOINT.bookRankList
      params = {
        ...params,
        startDt: query.startDt,
        kdc: query.kdc,
        pageSize: query.pagesize,
        pageNumber: query.pageNumber,
      }
    }

    if (query.isbn13) {
      const isbnList = query.isbn13.split(';').filter((isbn) => isbn) // ';'로 나누고 빈 값을 제거
      const promises = isbnList.map((isbn) => {
        return LibraryApi.get(bookType, { params: { ...params, isbn13: isbn } }) // 각 isbn에 대해 요청을 보냄
      })

      // 모든 API 요청을 병렬로 처리
      const responses = await Promise.all(promises)
      const responseData = responses.map((response) => response.data) // 응답 데이터 처리

      return responseData
    }

    const response = await LibraryApi.get(bookType, { params })

    // 확인 조금만 하고 위코드로 변경
    // const responseData = await response.data.response.docs
    const responseData = await response.data
    return responseData
  } catch (error) {
    throw error
  }
}
