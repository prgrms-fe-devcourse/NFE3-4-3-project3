import KakaoLocalApi from '../config/axiosKakaoLocalConfig.ts'
import type { KakaoAddress, LocationInfo } from '../types/location.types.ts'

// TODO 개선 필요
export const getAddressByLocation = async (location: LocationInfo): Promise<KakaoAddress> => {
  try {
    const response = await KakaoLocalApi.get('/geo/coord2address.JSON', {
      params: {
        x: location.longitude,
        y: location.latitude,
      },
    })
    const responseData = await response.data
    return {
      regionDepth1: responseData.documents[0].address.region_1depth_name,
      regionDepth2: responseData.documents[0].address.region_2depth_name,
    }
  } catch (error) {
    console.error(error)
  }
}
