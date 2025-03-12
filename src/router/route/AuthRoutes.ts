import PATH from '@/constants/path';
import { isAuthenticated } from '@/utils/guard'

const AUTH_ROUTES = [
  {
    path: PATH.login,
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { headerVariant: 'header-default' },
  },
  {
    path: PATH.signup,
    name: 'signup',
    component: () => import('@/views/auth/SignupView.vue'),
    meta: { headerVariant: 'header-default' },
  },
  {
    path: PATH.mypage,
    name: 'mypage',
    component: () => import('@/views/auth/MyPage.vue'),
    meta: { headerVariant: 'header-default' },
    beforeEnter: isAuthenticated
  },
];
export default AUTH_ROUTES;
