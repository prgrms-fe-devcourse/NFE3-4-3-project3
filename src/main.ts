import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { setupCalendar } from 'v-calendar'
import { useKakao } from 'vue3-kakao-maps/@utils';

const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAOMAP_KEY

useKakao(KAKAO_MAP_KEY);

const app = createApp(App)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
})

app.use(Antd)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })
///달력추가
app.use(setupCalendar, {})

app.mount('#app')
