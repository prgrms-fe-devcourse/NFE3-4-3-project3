interface PathType {
  [key: string]: string;
}

// 📌 NOTICE 임의의 path, 설계변경가능
const PATH: PathType = Object.freeze({
  root: '/', // 메인페이지

  // 유저기능
  login: '/login',
  signup: '/signup',
  mypage: '/mypage',

  // 여행페이지와 그 하위
  travel: '/travel',
  travelSearch: '/travel/search/:category',
  travelDetail: '/travel/detail/:contentId',
  travelPlanner: '/travel/planner/:plannerId',

  // 입양페이지와 그 하위
  adoption: '/adoption',
  adoptionSearch: '/adoption/search',
  adoptionShelter: '/adoption/shelter', // 보호소 지도
  adoptionDetail: '/adoption/search/detail/:animalId',
  adoptionForm: '/adoption/form',
  adoptionComplete: '/adoption-complete',

  // 커뮤니티 페이지와 그 하위
  community: '/community',
  communityFree: '/community/free',
  communityMissing: '/community/missing',
  communityDetailFree: '/community/free/:postId',
  communityDetailMissing: '/community/missing/:postId',
  communityFreeForm: '/community/free/form',
  communityMissingForm: '/community/missing-form',

  // 쇼핑페이지와 그 하위
  shopping: '/shopping',
  shoppingDetail: '/shopping/:itemId',

  // 마이페이지와 그 하위
  user: '/mypage',
});
export default PATH;
