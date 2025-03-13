import KopisApi from '../config/axiosKopisConfig.ts'
import { KOPIS_ENDPOINT } from './endpoint.ts'
import type { PrfApi, PrfInfoDetail, PrfPlace } from '../types/Performance'

export const getMonthlyPerformances = async () => {
  try {
    const response = await KopisApi.get(KOPIS_ENDPOINT.monthlyList)
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getAwardPerformances = async (genre: object) => {
  try {
    // 추가
    const queryParam = genre ? `&shcate=${genre?.code}` : ''
    const response = await KopisApi.get(KOPIS_ENDPOINT.awardList + queryParam)

    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

// 타입 일단 여기에 지정
interface PeformanceSearchInputType {
  shcate: string
  cpage: number
  rows: number
  shprfnm?: string
  shprfnmfct?: string
  stdate?: string
  eddate?: string
}

export interface PerformanceInfoType {
  area: string
  fcltynm: string
  genrenm: string
  mt20id: string
  openrun: 'Y' | 'N'
  poster: string
  prfnm: string
  prfpdfrom: string
  prfpdto: string
  pfrstate: string
}

interface PeformanceSearchResponseType {
  dbs: {
    db: PerformanceInfoType[]
  }
}

export const getPerformances = async (
  searchInput: PeformanceSearchInputType,
): Promise<PeformanceSearchResponseType | undefined> => {
  const today = new Date()
  const todayDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`

  try {
    // 추가
    let queryParam = searchInput.shcate !== '' ? `&shcate=${searchInput?.shcate}` : ''
    queryParam += '&cpage=' + searchInput.cpage
    queryParam += '&rows=' + searchInput.rows
    queryParam += '&stdate=' + '20250201'
    queryParam += '&eddate=' + todayDate

    if (searchInput.shprfnm) {
      queryParam += '&shprfnm=' + searchInput.shprfnm
    }

    const response = await KopisApi.get(KOPIS_ENDPOINT.prfSearch + queryParam)
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

/// 추가 prfSearch
// query: PrfApi 삭제 상태
export const getPerformanceDetail = async (type: string, id: string) => {
  try {
    let params: { [key: string]: any } = {}
    let prftype: string = ''

    if (type === 'prfInfo') {
      prftype = KOPIS_ENDPOINT.prfDetailList.replace('ID', id)
    }

    if (type === 'prfPlace') {
      prftype = KOPIS_ENDPOINT.prfDetailPlace.replace('ID', id)
    }

    const response = await KopisApi.get(prftype, { params })
    const data = await response.data.dbs.db

    return data
  } catch (error) {
    console.error(error)
  }
}
