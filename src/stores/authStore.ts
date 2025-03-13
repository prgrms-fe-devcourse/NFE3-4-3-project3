import { defineStore } from 'pinia'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import axiosApi from '../config/axiosConfig'
import { useAuthTokenStore } from './auth'
import type { UserType } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('accessToken')) // 새로고침해도 유지
  const userId = ref<string | null>(localStorage.getItem('userId')) // 새로고침해도 유지
  const fullName = ref<string | null>(localStorage.getItem('fullName')) // 새로고침해도 유지
  const userInfo = ref<UserType | null>(null)

  // 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosApi.post('/login', { email, password })

      if (response.data.token && response.data.user._id && response.data.user.fullName) {
        token.value = response.data.token
        userId.value = response.data.user._id
        fullName.value = response.data.user.fullName

        localStorage.setItem('accessToken', token.value as string) // localStorage에 저장
        localStorage.setItem('userId', userId.value as string) // localStorage에 저장
        localStorage.setItem('fullName', fullName.value as string) // localStorage에 저장

        const authTokenStore = useAuthTokenStore()
        authTokenStore.setToken(token.value as string)

        message.success(`${fullName.value}님, 로그인 성공!`, 1)

        const userInfoResponse = await axiosApi.get(`/users/${userId.value}`)
        userInfo.value = userInfoResponse.data

        return true
      } else {
        message.error('로그인 실패! 다시 시도해주세요.', 1)
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      message.error('로그인 실패! 다시 시도해주세요.', 1)
      return false
    }
  }

  const getUserInfo = async () => {
    const userInfoResponse = await axiosApi.get(`/users/${userId.value}`)
    userInfo.value = userInfoResponse.data
    return userInfoResponse.data
  }

  // 로그아웃 함수
  const logout = () => {
    token.value = null
    userId.value = null

    fullName.value = null
    localStorage.removeItem('accessToken') // 토큰 삭제
    localStorage.removeItem('userId') // userId 삭제
    localStorage.removeItem('fullName') // 사용자 이름 삭제
    message.success('로그아웃 되었습니다.')

    // 로그아웃 후 새로고침 -> 좋아요 상태 초기화
    window.location.reload()
  }
  return { token, userId, fullName, login, logout, userInfo, getUserInfo }
})
