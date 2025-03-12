<script setup lang="ts">
import ShelterKakaoMap from '@/components/adoption/shelter/ShelterKakaoMap.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref, computed } from 'vue';
import PlannerModal from './PlannerModal.vue';

interface BaseDetail {
  title: string;
  contentid: string;
  addr1: string | null;
  tel: string | null;
  overview: string | null;
  homepage: string | null;
  firstimage: string | null;
  mapx: string | number | null;
  mapy: string | number | null;
}
export interface AccommodationDetail extends BaseDetail {
  contenttypeid: '32';
  roomcount: number | null;
  checkintime: string | null;
  checkouttime: string | null;
  refundregulation: string | null;
}
export interface RestaurantDetail extends BaseDetail {
  contenttypeid: '39';
  opentimefood: string | null;
  restdatefood: string | null;
  parkingfood: string | null;
  treatmenu: string | null;
  firstmenu: string | null;
}
export interface CultureDetail extends BaseDetail {
  contenttypeid: '14';
  infocenterculture: string | null;
  usetimeculture: string | null;
  restdateculture: string | null;
  parkingculture: string | null;
  parkingfee: string | null;
}
export interface ShoppingDetail extends BaseDetail {
  contenttypeid: '38';
  infocentershopping: string | null;
  fairday: string | null;
  parkingshopping: string | null;
  restdateshopping: string | null;
}
export interface TourSpotDetail extends BaseDetail {
  contenttypeid: '12';
  infocenter: string | null;
  restdate: string | null;
  expguide: string | null;
  parking: string | null;
  usetime: string | null;
}
export interface ActivitiesDetail extends BaseDetail {
  contenttypeid: '28';
  infocenterleports: string | null;
  restdateleports: string | null;
  usetimeleports: string | null;
  parkingleports: string | null;
  usefeeleports: string | null;
}
export type DetailCard =
  | AccommodationDetail
  | RestaurantDetail
  | CultureDetail
  | ShoppingDetail
  | TourSpotDetail
  | ActivitiesDetail;

const { detail } = defineProps<{ detail: DetailCard }>();
const router = useRouter();
const authStore = useAuthStore();

// PlannerModal 관련 상태
const isPlannerVisible = ref(false);
const modalPositionTop = ref('100%'); // 필요에 따라 위치값 수정
const modalPositionLeft = ref('0%'); //필요에 따라 위치값 수정

//기존 detail Prop을 PlannerModal 데이터에 맞게 수정
const detailForPlanner = computed(() => {
  const { title, contenttypeid, ...rest } = detail;
  return {
    ...rest,
    name: title,
    contentTypeId: contenttypeid,
    mapx: Number(detail.mapx),
    mapy: Number(detail.mapy),
  };
});

function togglePlannerModal() {
  isPlannerVisible.value = !isPlannerVisible.value;
}

function handleIconClick() {
  if (!authStore.isAuth) {
    router.push({ name: 'login' });
  } else {
    isPlannerVisible.value = !isPlannerVisible.value;
  }
}

// HTML 태그 제거 함수
function formatPolicy(text: string | null): string {
  if (!text) return '';
  return (
    text
      // <br />, <br>, <br/> 등 다양한 형식을 공백으로 대체
      .replace(/<br\s*\/?>/gi, ' ')
      // 나머지 HTML 태그는 제거
      .replace(/<[^>]*>/g, '')
  );
}
</script>

<template>
  <!-- 숙소 타입(contenttypeid === 32) -->
  <div v-if="detail?.contenttypeid === '32'" class="container">
    <div class="row g-2">
      <h3 class="text-secondary-red fs-5" style="font-family: 'Paperlogy'; font-weight: 700">
        숙소
      </h3>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="mb-0 text-gray-10" style="font-family: 'Paperlogy'; font-weight: 700">
          {{ detail?.title ?? '가람초연재' }}
        </h1>

        <div class="button-container" style="width: fit-content; height: fit-content">
          <!-- 여행 플래너 버튼 -->
          <button
            @click="
              (e) => {
                handleIconClick();
              }
            "
            class="btn p-0 border-0 bg-transparent"
          >
            <i class="bi bi-map fa-2x text-primary-green"></i>
          </button>
          <span class="tooltip">여행계획에 추가하기</span>
          <PlannerModal
            :visible="isPlannerVisible"
            :positionTop="modalPositionTop"
            :positionLeft="modalPositionLeft"
            :data="detailForPlanner"
            @toggle-visibility="togglePlannerModal"
          />
        </div>
      </div>

      <div class="bi bi-geo-alt fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7">
          {{ detail?.addr1 ?? '경상북도 안동시 풍천면 하회종가길 76-6' }}</span
        >
      </div>
      <div class="bi bi-telephone fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ detail?.tel ?? '연락처' }}</span>
      </div>
      <div class="bi bi-house fa-s text-secondary-red fs-5">
        <span
          class="ms-1 text-gray-7"
          v-html="detail?.homepage ? formatPolicy(detail.homepage) : '-'"
        ></span>
      </div>
    </div>
    <div class="row mt-3 gy-3">
      <div class="col-6">
        <h2 class="mb-3 fs-5">소개</h2>

        <p class="fs-7" v-if="detail?.overview" v-html="detail.overview"></p>
        <p class="fs-7" v-else>정보가 없습니다.</p>
        <div class="d-flex align-items-center justify-content-between mt-5">
          <h2 class="fs-5">문의 및 안내</h2>
          <span class="fs-6" v-if="detail?.tel">{{ detail.tel }}</span>
          <span class="fs-6" v-else>010-3524-6124</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">객실 갯수</h2>
          <span class="fs-6">{{ (detail?.roomcount ?? '2') + '개' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">체크인 / 체크아웃</h2>
          <span class="fs-6">{{
            (detail?.checkintime ?? '15:00') + ' / ' + (detail?.checkouttime ?? '10:00')
          }}</span>
        </div>
        <div class="row mt-2">
          <div class="col-auto">
            <h2 class="fs-5">환불 규정</h2>
          </div>
          <div class="col text-end">
            <span
              class="fs-6"
              v-if="detail?.refundregulation"
              v-html="formatPolicy(detail.refundregulation)"
            ></span>
            <span class="fs-6" v-else>예약 확정시 환불 불가</span>
          </div>
        </div>
      </div>

      <!-- 오른쪽: 지도 Placeholder -->
      <div class="col-6">
        <div class="map-placeholder d-flex align-items-center justify-content-center rounded-4">
          <ShelterKakaoMap :lat="Number(detail.mapy)" :lng="Number(detail.mapx)" />
        </div>
      </div>
    </div>
  </div>

  <!-- 음식점 타입(contenttypeid === 39) -->
  <div v-if="detail?.contenttypeid === '39'" class="container">
    <div class="row g-2">
      <h3 class="text-secondary-red fs-5" style="font-family: 'Paperlogy'; font-weight: 700">
        레스토랑 & 카페
      </h3>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="mb-0 text-gray-10" style="font-family: 'Paperlogy'; font-weight: 700">
          {{ detail?.title ?? '가평카페 109' }}
        </h1>
        <div class="button-container" style="width: fit-content; height: fit-content">
          <!-- 여행 플래너 버튼 -->
          <button
            @click="
              (e) => {
                handleIconClick();
              }
            "
            class="btn p-0 border-0 bg-transparent"
          >
            <i class="bi bi-map fa-2x text-primary-green"></i>
          </button>
          <span class="tooltip">여행계획에 추가하기</span>
          <PlannerModal
            :visible="isPlannerVisible"
            :positionTop="modalPositionTop"
            :positionLeft="modalPositionLeft"
            :data="detailForPlanner"
            @toggle-visibility="togglePlannerModal"
          />
        </div>
      </div>

      <div class="bi bi-geo-alt fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7">
          {{ detail?.addr1 ?? '경상북도 안동시 풍천면 하회종가길 76-6' }}</span
        >
      </div>
      <div class="bi bi-telephone fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ detail?.tel ?? '연락처' }}</span>
      </div>
      <div class="bi bi-house fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7">{{
          detail?.homepage ? formatPolicy(detail.homepage) : '-'
        }}</span>
      </div>
    </div>
    <div class="row mt-3 gy-3">
      <div class="col-6">
        <h2 class="mb-3 fs-4">소개</h2>

        <p class="fs-7">
          {{ detail?.overview ? formatPolicy(detail.overview) : '-' }}
        </p>
        <div class="d-flex align-items-center justify-content-between mt-5">
          <h2 class="fs-5">문의 및 안내</h2>
          <span class="fs-6">{{ formatPolicy(detail?.tel) ?? '010-3524-6124' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">영업시간</h2>
          <span class="fs-6">{{
            detail?.opentimefood ? formatPolicy(detail.opentimefood) : '-'
          }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">쉬는 날</h2>
          <span class="fs-6">{{ formatPolicy(detail.restdatefood) || '연중무휴' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">주차 정보</h2>
          <span class="fs-6">{{ formatPolicy(detail.parkingfood) || '유료 주차장' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">취급 메뉴</h2>
          <span class="fs-6">{{ formatPolicy(detail.treatmenu) || '정보 없음' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">대표 메뉴</h2>
          <span class="fs-6">{{ formatPolicy(detail.firstmenu) || '정보 없음' }}</span>
        </div>
      </div>

      <!-- 오른쪽: 지도 Placeholder -->
      <div class="col-6">
        <div class="map-placeholder d-flex align-items-center justify-content-center rounded-4">
          <ShelterKakaoMap :lat="Number(detail.mapy)" :lng="Number(detail.mapx)" />
        </div>
      </div>
    </div>
  </div>

  <!-- 문화  (contenttypeid === 14) -->
  <div v-if="detail?.contenttypeid === '14'" class="container">
    <div class="row g-2">
      <h3 class="text-secondary-red fs-5" style="font-family: 'Paperlogy'; font-weight: 700">
        문화 & 쇼핑
      </h3>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="mb-0 text-gray-10" style="font-family: 'Paperlogy'; font-weight: 700">
          {{ detail?.title ?? '-' }}
        </h1>
        <div class="button-container" style="width: fit-content; height: fit-content">
          <!-- 여행 플래너 버튼 -->
          <button
            @click="
              (e) => {
                handleIconClick();
              }
            "
            class="btn p-0 border-0 bg-transparent"
          >
            <i class="bi bi-map fa-2x text-primary-green"></i>
          </button>
          <span class="tooltip">여행계획에 추가하기</span>
          <PlannerModal
            :visible="isPlannerVisible"
            :positionTop="modalPositionTop"
            :positionLeft="modalPositionLeft"
            :data="detailForPlanner"
            @toggle-visibility="togglePlannerModal"
          />
        </div>
      </div>

      <div class="bi bi-geo-alt fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ formatPolicy(detail?.addr1) ?? '주소정보 없음' }}</span>
      </div>
      <div class="bi bi-telephone fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ formatPolicy(detail?.tel) ?? '-' }}</span>
      </div>
      <div class="bi bi-house fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7">{{
          detail?.homepage ? formatPolicy(detail.homepage) : '-'
        }}</span>
      </div>
    </div>
    <div class="row mt-3 gy-3">
      <div class="col-6">
        <h2 class="mb-3 fs-4">소개</h2>

        <p class="fs-7">
          {{ detail?.overview ? formatPolicy(detail.overview) : '-' }}
        </p>
        <div class="d-flex align-items-center justify-content-between mt-5">
          <h2 class="fs-5">문의 및 안내</h2>
          <span
            class="fs-6"
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
            >{{ detail?.infocenterculture ? formatPolicy(detail.infocenterculture) : '-' }}</span
          >
        </div>
        <div class="row mt-2">
          <!-- 왼쪽 레이블: col-auto로 레이블 길이에 맞게 폭을 결정 -->
          <div class="col-auto">
            <h2 class="fs-5 mb-0">영업시간</h2>
          </div>

          <!-- 오른쪽 텍스트: 나머지 공간을 차지, 오른쪽 정렬, 길면 잘림 -->
          <div
            class="col text-end fs-6"
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >
            {{ detail?.usetimeculture ? formatPolicy(detail.usetimeculture) : '-' }}
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">쉬는 날</h2>
          <span class="fs-6">{{ detail?.restdateculture || '정보 없음' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">주차 정보</h2>
          <span class="fs-6">{{
            detail?.parkingculture || detail?.parkingfee
              ? `${formatPolicy(detail.parkingculture) ?? '주차정보 없음'}/${formatPolicy(detail.parkingculture) ?? '주차요금 정보 없음'}`
              : '주차정보 없음'
          }}</span>
        </div>
      </div>

      <!-- 오른쪽: 지도 Placeholder -->
      <div class="col-6">
        <div class="map-placeholder d-flex align-items-center justify-content-center rounded-4">
          <ShelterKakaoMap :lat="Number(detail.mapy)" :lng="Number(detail.mapx)" />
        </div>
      </div>
    </div>
  </div>

  <!-- 쇼핑 contenttypeid === 38 -->
  <div v-if="detail?.contenttypeid === '38'" class="container">
    <div class="row g-2">
      <h3 class="text-secondary-red fs-5" style="font-family: 'Paperlogy'; font-weight: 700">
        문화 & 쇼핑
      </h3>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="mb-0 text-gray-10" style="font-family: 'Paperlogy'; font-weight: 700">
          {{ detail?.title ?? '가평현리 5일장' }}
        </h1>
        <div class="button-container" style="width: fit-content; height: fit-content">
          <!-- 여행 플래너 버튼 -->
          <button
            @click="
              (e) => {
                handleIconClick();
              }
            "
            class="btn p-0 border-0 bg-transparent"
          >
            <i class="bi bi-map fa-2x text-primary-green"></i>
          </button>
          <span class="tooltip">여행계획에 추가하기</span>
          <PlannerModal
            :visible="isPlannerVisible"
            :positionTop="modalPositionTop"
            :positionLeft="modalPositionLeft"
            :data="detailForPlanner"
            @toggle-visibility="togglePlannerModal"
          />
        </div>
      </div>

      <div class="bi bi-geo-alt fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7">
          {{ detail?.addr1 ? formatPolicy(detail.addr1) : '-' }}</span
        >
      </div>
      <div class="bi bi-telephone fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ detail?.tel ? formatPolicy(detail.tel) : '-' }}</span>
      </div>
      <div class="bi bi-house fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7">
          {{ detail?.homepage ? formatPolicy(detail.homepage) : '-' }}
        </span>
      </div>
    </div>
    <div class="row mt-3 gy-3">
      <div class="col-6">
        <h2 class="mb-3 fs-4">소개</h2>

        <p class="fs-7">
          {{ detail?.overview ? formatPolicy(detail.overview) : '-' }}
        </p>
        <div class="d-flex align-items-center justify-content-between mt-5">
          <h2 class="fs-5">문의 및 안내</h2>
          <span class="fs-6">{{
            detail?.infocentershopping ? formatPolicy(detail.infocentershopping) : '정보 없음'
          }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">영업시간</h2>
          <span class="fs-6">{{ detail?.fairday ? formatPolicy(detail.fairday) : '-' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">쉬는 날</h2>
          <span class="fs-6">{{ formatPolicy(detail?.restdateshopping) || '정보 없음' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">주차 정보</h2>
          <span class="fs-6">{{
            formatPolicy(detail.parkingshopping) ?? '주차요금 정보 없음'
          }}</span>
        </div>
      </div>

      <!-- 오른쪽: 지도 Placeholder -->
      <div class="col-6">
        <div class="map-placeholder d-flex align-items-center justify-content-center rounded-4">
          <ShelterKakaoMap :lat="Number(detail.mapy)" :lng="Number(detail.mapx)" />
        </div>
      </div>
    </div>
  </div>

  <!-- 관광 contenttypeid === 12 -->
  <div v-if="detail?.contenttypeid === '12'" class="container">
    <div class="row g-2">
      <h3 class="text-secondary-red fs-5" style="font-family: 'Paperlogy'; font-weight: 700">
        관광 & 체험
      </h3>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="mb-0 text-gray-10" style="font-family: 'Paperlogy'; font-weight: 700">
          {{ detail?.title ?? '가우도' }}
        </h1>
        <div class="button-container" style="width: fit-content; height: fit-content">
          <!-- 여행 플래너 버튼 -->
          <button
            @click="
              (e) => {
                handleIconClick();
              }
            "
            class="btn p-0 border-0 bg-transparent"
          >
            <i class="bi bi-map fa-2x text-primary-green"></i>
          </button>
          <span class="tooltip">여행계획에 추가하기</span>
          <PlannerModal
            :visible="isPlannerVisible"
            :positionTop="modalPositionTop"
            :positionLeft="modalPositionLeft"
            :data="detailForPlanner"
            @toggle-visibility="togglePlannerModal"
          />
        </div>
      </div>

      <div class="bi bi-geo-alt fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ detail?.addr1 ?? '주소정보 없음' }}</span>
      </div>
      <div class="bi bi-telephone fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ detail?.tel ?? '-' }}</span>
      </div>
      <div class="bi bi-house fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7">{{
          detail?.homepage ? formatPolicy(detail.homepage) : '-'
        }}</span>
      </div>
    </div>
    <div class="row mt-3 gy-3">
      <div class="col-6">
        <h2 class="mb-3 fs-4">소개</h2>

        <p class="fs-7">
          {{ detail?.overview ?? '소개글 없음' }}
        </p>
        <div class="d-flex align-items-center justify-content-between mt-5">
          <h2 class="fs-5">문의 및 안내</h2>
          <span class="fs-6">{{ detail?.infocenter ?? '-' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">영업시간</h2>
          <span class="fs-6">{{ detail?.usetime ? formatPolicy(detail.usetime) : '-' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">쉬는 날</h2>
          <span class="fs-6">{{ detail?.restdate ? formatPolicy(detail.restdate) : '-' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">주차 정보</h2>
          <span class="fs-6">{{ detail.parking ? formatPolicy(detail.parking) : '-' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">체험 안내</h2>
          <span class="fs-6">{{ detail.expguide ? formatPolicy(detail.expguide) : '-' }}</span>
        </div>
      </div>

      <!-- 오른쪽: 지도 Placeholder -->
      <div class="col-6">
        <div
          class="map-placeholder d-flex align-items-center justify-content-center rounded-4 overflow-hidden"
        >
          <ShelterKakaoMap :lat="Number(detail.mapy)" :lng="Number(detail.mapx)" />
        </div>
      </div>
    </div>
  </div>
  <!-- 레포츠 contenttypeid === 28 -->
  <div v-if="detail?.contenttypeid === '28'" class="container">
    <div class="row g-2">
      <h3 class="text-secondary-red fs-5" style="font-family: 'Paperlogy'; font-weight: 700">
        관광 & 체험
      </h3>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="mb-0 text-gray-10" style="font-family: 'Paperlogy'; font-weight: 700">
          {{ detail?.title ?? '가우도' }}
        </h1>
        <div class="button-container" style="width: fit-content; height: fit-content">
          <!-- 여행 플래너 버튼 -->
          <button
            @click="
              (e) => {
                handleIconClick();
              }
            "
            class="btn p-0 border-0 bg-transparent"
          >
            <i class="bi bi-map fa-2x text-primary-green"></i>
          </button>
          <span class="tooltip">여행계획에 추가하기</span>
          <PlannerModal
            :visible="isPlannerVisible"
            :positionTop="modalPositionTop"
            :positionLeft="modalPositionLeft"
            :data="detailForPlanner"
            @toggle-visibility="togglePlannerModal"
          />
        </div>
      </div>

      <div class="bi bi-geo-alt fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ detail?.addr1 ?? '주소정보 없음' }}</span>
      </div>
      <div class="bi bi-telephone fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7"> {{ detail?.tel ?? '-' }}</span>
      </div>
      <div class="bi bi-house fa-s text-secondary-red fs-5">
        <span class="ms-1 text-gray-7">{{
          detail?.homepage ? formatPolicy(detail.homepage) : '-'
        }}</span>
      </div>
    </div>
    <div class="row mt-3 gy-3">
      <div class="col-6">
        <h2 class="mb-3 fs-4">소개</h2>

        <p class="fs-7">
          {{ detail?.overview ?? '소개글 없음' }}
        </p>
        <div class="d-flex align-items-center justify-content-between mt-5">
          <h2 class="fs-5">문의 및 안내</h2>
          <span class="fs-6">{{ formatPolicy(detail?.infocenterleports) ?? '-' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">영업시간</h2>
          <span class="fs-6">{{
            detail?.usetimeleports ? formatPolicy(detail.usetimeleports) : '-'
          }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">쉬는 날</h2>
          <span class="fs-6">{{ formatPolicy(detail?.restdateleports) || '-' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">주차 정보</h2>
          <span class="fs-6">{{ formatPolicy(detail.parkingleports) ?? '-' }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="fs-5">입장료</h2>
          <span class="fs-6">{{ formatPolicy(detail.usefeeleports) ?? '-' }}</span>
        </div>
      </div>

      <!-- 오른쪽: 지도 Placeholder -->
      <div class="col-6">
        <div class="map-placeholder d-flex align-items-center justify-content-center rounded-4">
          <ShelterKakaoMap :lat="Number(detail.mapy)" :lng="Number(detail.mapx)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 지도 Placeholder 스타일 */
.map-placeholder {
  width: 100%;
  height: 630px; /* 원하는 크기로 조절 */
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
}

.tooltip {
  position: absolute;
  bottom: 120%; /* 버튼 위에 위치 */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
}

/* 버튼에 마우스 오버하면 툴팁 표시 */
.button-container:hover .tooltip {
  opacity: 1;
}
.button-container {
  position: relative;
  display: inline-block;
}
</style>
