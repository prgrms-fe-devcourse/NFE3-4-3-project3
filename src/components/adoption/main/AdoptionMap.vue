<script setup lang="ts">
import { ref, onMounted, nextTick, watch, computed } from 'vue';
import type { CSSProperties } from 'vue';
import SouthKoreaMap from '@/assets/southKoreaHigh.svg';
import PATH from '@/constants/path';
import ShelterCard from './ShelterCard.vue';
import CITY_ORG from '@/constants/api/cityOrg';
import type { OrgType } from '@/types/shelter';
import { useQuery } from '@tanstack/vue-query';
import { getShelterListApi, getShelterInfo } from '@/apis/adoption/shelter';
import lottie from 'lottie-web';
import LottieAnimation from './LottieAnimation.vue'; // 경로에 맞게 수정

const selectedRegion = ref('서울특별시'); // 기본 선택: 서울특별시
const cityOrgList = ref<OrgType[]>([]); // 구, 군 리스트

watch(selectedRegion, (newV, oldV) => {
  if (!Object.keys(CITY_ORG).includes(selectedRegion.value)) return;
  cityOrgList.value = [...CITY_ORG[newV]];
  refetch();
});

// 1. 간소화된 shelterList 조회
const {
  data: shelters,
  isLoading: isLoadingShelters,
  refetch,
} = useQuery({
  queryKey: ['shelters', 'list', selectedRegion],
  queryFn: () => {
    if (cityOrgList.value.length === 0) return Promise.resolve([]);
    return Promise.all(cityOrgList.value.map((org) => getShelterListApi(org.uprCd, org.orgCd)));
  },
});

// shelters 데이터가 배열이면 쿼리 실행 (빈 배열이어도)
const enabled = computed(() => Array.isArray(shelters.value));

// 2. 보호소별 상세정보 조회
const { data: shelterDetails, isLoading: isLoadingShelterDetails } = useQuery({
  queryKey: ['shelterDetails', 'list', selectedRegion],
  queryFn: () => {
    const flatShelters = computed(() => shelters.value?.flatMap((A) => A));
    if (!flatShelters.value || flatShelters.value.length === 0) return Promise.resolve([]);
    return Promise.all(flatShelters.value.map((shelter) => getShelterInfo(shelter.careRegNo)));
  },
  enabled,
});

const shelterInfoList = computed(() => {
  const result = shelterDetails.value
    ?.map((data) => data.body.items.item)
    .filter((v) => v != undefined);
  console.log('result', result);
  return result;
});

const tooltipText = ref('');
const tooltipStyle = ref<CSSProperties>({
  position: 'absolute',
  top: '0px',
  left: '0px',
  background: 'var(--secondary-green)',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '16px',
  color: 'var(--gray-1)',
  pointerEvents: 'none',
  zIndex: '10',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
  opacity: '0',
});

const attachRegionEvents = () => {
  nextTick(() => {
    const svgElement = document.querySelector('svg');
    if (!svgElement) return;
    const paths = svgElement.querySelectorAll('path[data-region]');
    paths.forEach((path) => {
      path.addEventListener('click', () => {
        const region = path.getAttribute('data-region');
        if (region) {
          selectedRegion.value = region;
          paths.forEach((p) => {
            p.setAttribute(
              'fill',
              p.getAttribute('data-region') === region ? 'var(--primary-red)' : '#ddd',
            );
          });
        }
      });
      path.addEventListener('mouseenter', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const region = path.getAttribute('data-region') || '';
        tooltipText.value = region;
        tooltipStyle.value.left = mouseEvent.pageX + 'px';
        tooltipStyle.value.top = mouseEvent.pageY - 40 + 'px';
        tooltipStyle.value.opacity = '1';
        if (region !== selectedRegion.value) {
          path.setAttribute('fill', '#ffcccc');
        }
      });
      path.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        tooltipStyle.value.left = mouseEvent.pageX + 'px';
        tooltipStyle.value.top = mouseEvent.pageY - 40 + 'px';
      });
      path.addEventListener('mouseleave', () => {
        tooltipText.value = '';
        tooltipStyle.value.opacity = '0';
        if (path.getAttribute('data-region') !== selectedRegion.value) {
          path.setAttribute('fill', '#ddd');
        }
      });
    });
  });
};

onMounted(() => {
  if (Object.keys(CITY_ORG).includes(selectedRegion.value)) {
    cityOrgList.value = [...CITY_ORG[selectedRegion.value]];
    refetch();
  }
  attachRegionEvents();
});
</script>

<template>
  <div class="wrapper">
    <div id="tooltip" v-if="tooltipText" :style="tooltipStyle">
      {{ tooltipText }}
    </div>

    <div class="title d-flex justify-content-between align-items-center">
      <span>사랑을 기다리는 아이들, 보호소에서 만나보세요!</span>
      <router-link :to="PATH.adoptionShelter">더보기</router-link>
    </div>
    <div class="d-flex justify-content-between">
      <div class="map">
        <SouthKoreaMap width="100%" height="125%" />
      </div>
      <div class="shelter-info-wrapper">
        <div class="shelter-title-card mb-3">
          <span
            >{{ selectedRegion }} 동물보호센터 <em>{{ shelterInfoList?.length }}</em
            >개소</span
          >
        </div>
        <div
          v-if="
            isLoadingShelterDetails ||
            isLoadingShelters ||
            (shelterInfoList && shelterInfoList.length === 0)
          "
          class="map-prompt-wrapper"
        >
          <LottieAnimation />
          <p class="map-prompt-text">
            {{
              isLoadingShelterDetails || isLoadingShelters
                ? '로딩중'
                : '지도에서 지역을 선택해 보호소를 확인하세요.'
            }}
          </p>
        </div>

        <div v-else class="card-list-wrapper">
          <ShelterCard
            v-for="shelter in shelterInfoList"
            :key="shelter.careNm"
            :shelter="shelter[0]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 100px 0;
}
.title span {
  font-size: 36px;
  font-weight: 700;
}
.title a {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-blue);
  text-decoration: none;
}
.title {
  margin-bottom: 42px;
}
.map {
  width: 580px;
  height: 645px;
  transform: translateY(-160px);
}
.shelter-info-wrapper {
  width: 664px;
  height: 645px;
  position: relative;
}
.shelter-title-card {
  width: 100%;
  height: 100px;
  border-radius: 17px;
  background-color: var(--gray-2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.shelter-title-card span {
  font-size: 36px;
  font-weight: 600;
}
.shelter-title-card span em {
  font-style: normal;
  color: var(--primary-red);
}
.card-list-wrapper {
  height: 545px;
  overflow-y: scroll;
}

/* 지도 선택 안내 스타일 */
.map-prompt-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.map-prompt-text {
  font-size: 18px;
  font-weight: bold;
  color: var(--gray-7);
  margin-top: 20px;
}
</style>
