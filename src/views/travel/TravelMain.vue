<script setup lang="ts">
import MainCategoryBoxes from '@/components/travel/MainCategoryBoxes.vue';
import AccommodationSwiper from '@/components/travel/AccommodationSwiper.vue';
import CultureShoppingSwiper from '@/components/travel/CultureShoppingSwiper.vue';
import RestaurantSwiper from '@/components/travel/RestaurantSwiper.vue';
import ExpandingMenu from '@/components/travel/ExpandingMenu.vue';

import type { Category } from '@/components/travel/MainCategoryBoxes.vue';
import type { ExpandingMenuItemData } from '@/components/travel/ExpandingMenu.vue';
import type { Restaurant } from '@/components/travel/RestaurantSwiper.vue';
import type { Accommodation } from '@/components/travel/AccommodationSwiper.vue';
import type { ShoppingAndCulture } from '@/components/travel/CultureShoppingSwiper.vue';
import PATH from '@/constants/path';

const categories: Category[] = [
  {
    img: '/TravelMain/Firework.jpg',
    content: '문화 & 쇼핑',
    path: PATH.travelSearch.replace(':category', '38'),
  },
  {
    img: '/TravelMain/Accommodation.jpg',
    content: '숙소',
    path: PATH.travelSearch.replace(':category', '32'),
  },
  {
    img: '/TravelMain/Restaurant.jpg',
    content: '레스토랑',
    path: PATH.travelSearch.replace(':category', '39'),
  },
  {
    img: '/TravelMain/Activity.jpg',
    content: '관광 & 체험',
    path: PATH.travelSearch.replace(':category', '28'),
  },
];
const shoppingAndCulture: ShoppingAndCulture[] = [
  {
    id: 3432213,
    img: 'http://tong.visitkorea.or.kr/cms/resource/56/3431756_image2_1.jpg',
    path: PATH.travelDetail.replace(':contentId', '3432213'),
    customQuery: { contenttypeid: '14' },
  },
  {
    id: 2609837,
    img: 'http://tong.visitkorea.or.kr/cms/resource/92/3085092_image2_1.JPG',
    path: PATH.travelDetail.replace(':contentId', '2609837'),
  },
  {
    id: 2437611,
    img: 'http://tong.visitkorea.or.kr/cms/resource/12/2437612_image2_1.jpg',
    path: PATH.travelDetail.replace(':contentId', '2437611'),
  },
  {
    id: 2639878,
    img: 'http://tong.visitkorea.or.kr/cms/resource/66/3336266_image2_1.jpg',
    path: PATH.travelDetail.replace(':contentId', '2639878'),
    customQuery: { contenttypeid: '14' },
  },
  {
    id: 2553929,
    img: 'http://tong.visitkorea.or.kr/cms/resource/67/3340967_image2_1.jpg',
    path: PATH.travelDetail.replace(':contentId', '2553929'),
    customQuery: { contenttypeid: '14' },
  },
  {
    id: 2756702,
    img: 'http://tong.visitkorea.or.kr/cms/resource/97/2756897_image2_1.jpg',
    path: PATH.travelDetail.replace(':contentId', '2756702'),
  },

  {
    id: 1754453,
    img: 'http://tong.visitkorea.or.kr/cms/resource/28/3465428_image2_1.jpg',
    path: PATH.travelDetail.replace(':contentId', '1754453'),
    customQuery: { contenttypeid: '14' },
  },
];
const accommodations: Accommodation[] = [
  {
    id: 2531222,
    img: 'http://tong.visitkorea.or.kr/cms/resource/56/3067856_image2_1.jpg',
    type: '강릉오죽한옥마을',
    location: '강원도',
    price: '80,000 원',
    path: PATH.travelDetail.replace(':contentId', '2531222'),
  },
  {
    id: 2708661,
    img: 'http://tong.visitkorea.or.kr/cms/resource/01/2709101_image2_1.jpg',
    type: '비브릿지',
    location: '강원도',
    price: '170,000 원',
    path: PATH.travelDetail.replace(':contentId', '2708661'),
  },
  {
    id: 2446529,
    img: 'http://tong.visitkorea.or.kr/cms/resource/11/2635611_image2_1.jpg',
    type: '경주수호정',
    location: '경주시',
    price: '80,000 원',
    path: PATH.travelDetail.replace(':contentId', '2446529'),
  },
  {
    id: 628690,
    img: 'http://tong.visitkorea.or.kr/cms/resource/81/1853081_image2_1.jpg',
    type: '곰펜션',
    location: '강원도',
    price: '120,000 원',
    path: PATH.travelDetail.replace(':contentId', '628690'),
  },

  {
    id: 2725982,
    img: 'http://tong.visitkorea.or.kr/cms/resource/83/2725983_image2_1.jpg',
    type: '그랜드 인투라온호텔 정선',
    location: '강원도',
    price: '100,000 원',
    path: PATH.travelDetail.replace(':contentId', '2725982'),
  },
];
const restaurants: Restaurant[] = [
  {
    id: 2844892,
    img: 'http://tong.visitkorea.or.kr/cms/resource/83/2844883_image2_1.JPG',
    type: '카페인덕동',
    location: '경남',
    path: PATH.travelDetail.replace(':contentId', '2844892'),
  },
  {
    id: 2603720,
    img: 'http://tong.visitkorea.or.kr/cms/resource/58/2603758_image2_1.jpg',
    type: '누닝 펫푸드카페',
    location: '인천',
    path: PATH.travelDetail.replace(':contentId', '2603720'),
  },
  {
    id: 2603467,
    img: 'http://tong.visitkorea.or.kr/cms/resource/68/2603468_image2_1.jpg',
    type: '(유)헤세의정원',
    location: '경기도',
    path: PATH.travelDetail.replace(':contentId', '2603467'),
  },
  {
    id: 2848931,
    img: 'http://tong.visitkorea.or.kr/cms/resource/76/2848776_image2_1.jpg',
    type: '개떼놀이터',
    location: '강원도',
    path: PATH.travelDetail.replace(':contentId', '2848931'),
  },
  {
    id: 2938673,
    img: 'http://tong.visitkorea.or.kr/cms/resource/73/2938273_image2_1.JPG',
    type: '태조밥상',
    location: '전북',
    path: PATH.travelDetail.replace(':contentId', '2938673'),
  },
];

const itemData: ExpandingMenuItemData[] = [
  {
    id: 0,
    bgImage: 'http://tong.visitkorea.or.kr/cms/resource/84/3082584_image2_1.jpg',
    title: '강아지 숲 ',
    content: '강원도',
    contentId: 2705409,
    contentTypeId: 12,
  },
  {
    id: 1,
    bgImage: 'http://tong.visitkorea.or.kr/cms/resource/67/2739267_image2_1.jpg',
    title: '해파랑길 44코스',
    content: '강원도',
    contentId: 2702507,
    contentTypeId: 28,
  },
  {
    id: 2,
    bgImage: 'http://tong.visitkorea.or.kr/cms/resource/24/3422224_image2_1.jpg',
    title: '강화 전등사',
    content: '인천',
    contentId: 125534,
    contentTypeId: 12,
  },
];
</script>

<template>
  <div>
    <div class="hero-container">
      <div class="header-wrapper"></div>

      <!-- 오버레이 텍스트 -->
      <div class="hero-text position-absolute top-50 start-0 translate-middle-y w-100">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h1 style="font-family: paperlogy; font-weight: 700; font-size: 48px">
                반려 동물과 함께 하는 <span class="text-primary-red">특별한</span> 여행,
              </h1>
              <p style="font-family: paperlogy; font-weight: 700; font-size: 48px">
                펫트너와 함께 떠나요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center mt-4">
      <MainCategoryBoxes :categories="categories" />

      <CultureShoppingSwiper
        :shopping="shoppingAndCulture"
        section-title="문화 & 쇼핑"
        section-subtitle="반려동물과 함께하는 쇼핑과 문화"
      />

      <AccommodationSwiper
        :accommodations="accommodations"
        section-title="숙소"
        section-subtitle="반려동물과 편안하게 쉴 수 있는 숙소, 여행의 시작을 함께하세요."
      />

      <RestaurantSwiper
        :restaurants="restaurants"
        section-title="음식점 & 카페"
        section-subtitle="반려동물과 특별한 순간을 즐길 수 있는 감성 맛집을 소개합니다."
      />

      <div class="container" style="width: 100%; margin-bottom: 5%">
        <div class="gray-10 fw-bold mt-5" style="font-size: 36px">관광 & 체험</div>
        <div class="gray-10 text-gray-7" style="font-size: 24px">
          반려동물과 함께하는 특별한 순간, 즐거움이 가득한 체험을 만나보세요.
        </div>
        <div style="height: 500px">
          <ExpandingMenu :item-data="itemData" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  position: relative;
  height: 575px;
  background-image: url('/public/TravelMainHero.png');
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0;
  z-index: 12;
}

.header-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  background-color: transparent;
  margin: 0;
  padding: 0;
}

::v-deep header {
  background-color: transparent !important;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  z-index: 2;
  color: #fff;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}
::v-deep img {
  transition: transform 0.3s ease;
}
::v-deep img:hover {
  transform: scale(1.05);
  cursor: pointer;
}

/* Swiper 슬라이드, 메인카테고리박스, 확장메뉴 아이템 등에 커서 & 스케일 적용 */
::v-deep .swiper-slide,
::v-deep .main-category-box,
::v-deep .expanding-menu-item {
  cursor: pointer;
  transition: transform 0.3s ease;
}

::v-deep .swiper-slide:hover,
::v-deep .main-category-box:hover,
::v-deep .expanding-menu-item:hover {
  transform: scale(1.01);
  border-radius: 12px; /* 기본 라운드 값 설정 */
}

::v-deep .swiper-slide img,
::v-deep .main-category-box img,
::v-deep .expanding-menu-item img {
  border-radius: 12px; /* 기본 라운드 값 설정 */
  transition: transform 0.3s ease;
}

::v-deep .swiper-slide:hover img,
::v-deep .main-category-box:hover img,
::v-deep .expanding-menu-item:hover img {
  border-radius: 12px; /* 기본 라운드 값 설정 */
  transform: scale(1.01);
}
</style>
