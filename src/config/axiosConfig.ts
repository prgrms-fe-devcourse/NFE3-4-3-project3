import axios from 'axios'

// Axios 인스턴스 생성
const axiosApi = axios.create({
  // baseURL: 'http://13.125.143.126:5005', // API 기본 주소
  baseURL: import.meta.env.VITE_API_BASE_URL, // API 기본 주소
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
})

// 요청 인터셉터 설정 (토큰 추가)
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') // token -> accessToken으로 변경
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// axiosApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       try {
//         const { data } = await axios.post('/auth/refresh', {
//           token: localStorage.getItem('refreshToken'),
//         })
//         localStorage.setItem('accessToken', data.accessToken)
//         axiosApi.defaults.headers.Authorization = `Bearer ${data.accessToken}`
//         return axiosApi(originalRequest) // 실패한 요청 재시도
//       } catch (refreshError) {
//         console.log(refreshError)
//         console.warn('🔴 토큰 갱신 실패: 로그아웃 처리 필요')
//       }
//     }
//     return Promise.reject(error)
//   },
// )

// 응답 인터셉터 설정 (토큰 만료 처리)
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      alert('❌ 접근 권한이 없습니다.')
    } else if (error.response?.status === 404) {
      alert('❌ 요청한 정보를 찾을 수 없습니다.')
    }
    return Promise.reject(error)
  },
)

export default axiosApi
