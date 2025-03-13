import axiosApi from '../config/axiosConfig'
import { USER_ENDPOINT } from './endpoint'
import type { NotificationType, UserType } from '../types/user'
import type { MessageType } from 'ant-design-vue/es/message'

// 유저 정보 조회
export const getUserInfo = async (userId: string): Promise<UserType> => {
  const response = await axiosApi.get(`${USER_ENDPOINT.userInfo}/${userId}`)

  return response.data
}

// 유저 정보 수정
/** 성공 시 true, 실패 시 false 반환 */
export const updateUserInfo = async (fullName: string): Promise<boolean> => {
  try {
    await axiosApi.put(`${USER_ENDPOINT.userInfoEdit}`, { fullName })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// 유저 이미지 업로드
/** 성공 시 true, 실패 시 false 반환 */
export const uploadUserImage = async (formData: FormData): Promise<boolean> => {
  try {
    await axiosApi.post(`${USER_ENDPOINT.userImageUpload}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// 유저 메세지 조회
export const getUserMessage = async (): Promise<MessageType[]> => {
  try {
    const response = await axiosApi.get(`${USER_ENDPOINT.userGetMessage}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 유저 메세지 읽음 처리
/** 성공 시 true, 실패 시 false 반환 */
export const updateUserMessage = async (sender: string): Promise<boolean> => {
  try {
    await axiosApi.put(`${USER_ENDPOINT.userUpdateMessage}`, { sender })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// 유저 알림 조회
export const getUserNotification = async (): Promise<NotificationType[]> => {
  try {
    const response = await axiosApi.get(`${USER_ENDPOINT.userNotification}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 유저 알림 읽음 처리
/** 성공 시 true, 실패 시 false 반환 */
export const updateUserNotification = async (): Promise<boolean> => {
  try {
    await axiosApi.put(`${USER_ENDPOINT.userUpdateNotification}`)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// 유저 팔로우 생성
/** 성공 시 true, 실패 시 false 반환 */
export const createUserFollow = async (userId: string): Promise<boolean> => {
  try {
    await axiosApi.post(`${USER_ENDPOINT.userFollow}`, { userId })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// 유저 팔로우 삭제
/** 성공 시 true, 실패 시 false 반환 */
export const deleteUserFollow = async (id: string): Promise<boolean> => {
  try {
    await axiosApi.delete(`${USER_ENDPOINT.userUnFollow}`, { data: { id } })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
