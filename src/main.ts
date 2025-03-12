import './assets/main.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import devAPI from './config/axiosDevConfig';
import adoAPI from './config/axiosAdoConfig';
import shelterAPI from './config/axiosShelterConfig';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/custom.scss';
import 'font-awesome/css/font-awesome.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.use(VueQueryPlugin);

// axios instance를 전역으로 제공
app.config.globalProperties.$devAPI = devAPI;
app.config.globalProperties.$adoAPI = adoAPI;
app.config.globalProperties.$shelterAPI = shelterAPI;

app.mount('#app');
