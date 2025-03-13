import { defineStore } from 'pinia'

export const useAuthTokenStore = defineStore('token', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    setToken(token: string) {
      this.accessToken = token
      localStorage.setItem('accessToken', token)
    },
    clearToken() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
    },
  },
})
