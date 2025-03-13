import axiosApi from '../config/axiosConfig'
import { message } from 'ant-design-vue'

/**
 * @throws {Error}
 * @param query
 * @returns BlogResult
 */

export async function userRegister(email: string, fullName: string, password: string) {
  const response = await axiosApi.post('/signup', { email, fullName, password })
  if (response.status !== 201) {
    throw 'state : ' + response.status
  } else {
    console.error(response.status)
  }
  return response.data
}

export async function checkUserEmail(email: string): Promise<boolean> {
  try {
    const response = await axiosApi.post('/auth/checkEmail', { email })
    if (response.status !== 200) {
      throw 'state : ' + response.status
    }
    return response.data.result
  } catch (error) {
    message.error('이메일 중복 확인에 실패했습니다. 잠시 후 다시 시도해주세요.', 1)
    return false
  }
}
