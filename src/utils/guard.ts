import { useAuthStore } from '@/stores/auth';
import type { NavigationGuardReturn } from 'vue-router';

export const isAuthenticated = (to, from): NavigationGuardReturn => {
  const auth = useAuthStore();


  if (!auth.isAuth) {
    return { name: 'login', query : { next: to.fullPath }};
  }
  return true;
};
