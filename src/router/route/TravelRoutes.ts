import PATH from '@/constants/path';
import { isAuthenticated } from '@/utils/guard'

const TRAVEL_ROUTES = [
  {
    path: PATH.travelPlanner,
    name: 'travelPlanner',
    component: () => import('@/views/travel/TravelPlanner.vue'),
    meta: { headerVariant: 'header-red', footerDisabled: true },
    beforeEnter: isAuthenticated
  },
  {
    path: PATH.travel,
    name: 'travelMain',
    component: () => import('@/views/travel/TravelMain.vue'),
    meta: { headerVariant: 'header-transparent' },
  },
  {
    path: PATH.travelSearch,
    name: 'travelSearch',
    component: () => import('@/views/travel/TravelSearch.vue'),
    meta: { headerVariant: 'header-default' },
  },
  {
    path: PATH.travelDetail,
    name: 'travelDetail',
    component: () => import('@/views/travel/TravelDetail.vue'),
    meta: { headerVariant: 'header-red' },
  },
];
export default TRAVEL_ROUTES;
