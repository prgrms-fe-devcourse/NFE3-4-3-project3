// Community.ts
import PATH from '@/constants/path';
import { isAuthenticated } from '@/utils/guard'

const COMMUNITY_ROUTES = [
  {
    path: PATH.community,
    name: 'communityMain',
    component: () => import('@/views/community/CommunityMain.vue'),
    meta: { headerVariant: 'header-default' },
  },
  {
    path: PATH.communityFree,
    name: 'free',
    component: () => import('@/views/community/FreeCommunity.vue'),
    meta: { headerVariant: 'header-transparent' },
  },
  {
    path: PATH.communityDetailFree,
    name: 'freeCommunityDetail',
    component: () => import('@/views/community/FreeCommunityDetail.vue'),
    meta: { headerVariant: 'header-purple' },
  },
  {
    path: PATH.communityFreeForm,
    name: 'freeCommunityForm',
    component: () => import('@/views/community/FreeCommunityForm.vue'),
    meta: { headerVariant: 'header-purple' },
    beforeEnter: isAuthenticated
  },
  {
    path: PATH.communityMissing,
    name: 'missingCommunity',
    component: () => import('@/views/community/MissingCommunity.vue'),
    meta: { headerVariant: 'header-transparent' },
  },
  {
    path: PATH.communityDetailMissing,
    name: 'freeCommunity',
    component: () => import('@/views/community/MissingCommunityDetail.vue'),
    meta: { headerVariant: 'header-blue' },
  },
  {
    path: PATH.communityMissingForm,
    name: 'missingForm',
    component: () => import('@/views/community/MissingCommunityForm.vue'),
    meta: { headerVariant: 'header-blue' },
    beforeEnter: isAuthenticated
  },
];
export default COMMUNITY_ROUTES;
