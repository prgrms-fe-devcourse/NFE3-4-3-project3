import PATH from '@/constants/path';
import { isAuthenticated } from '@/utils/guard'

const ADOPTION_ROUTES = [
  {
    path: PATH.adoption,
    name: 'adoption',
    component: () => import('@/views/adoption/AdoptionMain.vue'),
    meta: { headerVariant: 'header-transparent' },
  },
  {
    path: PATH.adoptionShelter,
    name: 'shelter',
    component: () => import('@/views/adoption/ShelterSearch.vue'),
    meta: { headerVariant: 'header-default', footerDisabled: true },
  },
  {
    path: PATH.adoptionSearch,
    name: 'search',
    component: () => import('@/views/adoption/AdoptionSearch.vue'),
    meta: { headerVariant: 'header-transparent' },
  },
  {
    path: PATH.adoptionDetail,
    name: 'adoptionDetail',
    component: () => import('@/views/adoption/AdoptionDetail.vue'),
    meta: { headerVariant: 'header-green' },
  },
  {
    path: PATH.adoptionForm,
    name: 'form',
    component: () => import('@/views/adoption/AdoptionForm.vue'),
    meta: { headerVariant: 'header-green' },
    beforeEnter: isAuthenticated
  },
  {
    path: PATH.adoptionComplete,
    name: 'adoptionComplete',
    component: () => import('@/views/adoption/AdoptionComplete.vue'),
    meta: { headerVariant: 'header-green' },
    beforeEnter: (to, from)=>{
      if(from.name === 'form'){
        return true;
      }
      else{
        return '/NotFound';
      }
    }
  },
  // 하위 라우터 추가..
];

export default ADOPTION_ROUTES;
