<script setup lang="ts">
import { detailCommon } from '@/apis/tour/detailCommon';
import { ref, onMounted, computed } from 'vue';
import PATH from '@/constants/path';
import { useRouter } from 'vue-router';
import type { TourData } from '@/types/travelList/tourData';
import type { DetailData } from '@/types/travelList/detailData';
import { traveListImg, restaurantImg } from '@/constants/mock/travel/travelList';
import {
  stayCategoryFormat,
  shoppingCategoryFormat,
  reportsCategoryFormat,
  restaurantCategoryFormat,
} from '@/utils/travel/categoryFormat';
import { fetchDetailInfoData } from '@/apis/tour/detailInfo';
import PlannerModal from './travelDetail/PlannerModal.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore(); // 로그인

const { data } = defineProps<{ data: TourData }>();
const router = useRouter();
const roomCost = ref();

// PlannerModal 관련 상태
const isPlannerVisible = ref(false);
const modalPositionTop = ref('22%'); // 필요에 따라 위치값 수정
const modalPositionLeft = ref('85%'); //필요에 따라 위치값 수정

//기존 detail Prop을 PlannerModal 데이터에 맞게 수정
const detailForPlanner = ref({
  contentid: data.contentid,
  contentTypeId: data.contenttypeid,
  name: data.title,
  mapx: Number(data.mapx),
  mapy: Number(data.mapy),
});

function togglePlannerModal() {
  isPlannerVisible.value = !isPlannerVisible.value;
}

function handleIconClick() {
  if (!authStore.isAuth) {
    alert('로그인을 해주세요');
    router.push({ name: 'login' });
  } else {
    isPlannerVisible.value = !isPlannerVisible.value;
  }
}
interface ContentData {
  contentId: string;
  contentTypeId: string;
}

// const contentData: ContentData = {
//   contentId: data.contentid,
//   contentTypeId: data.contenttypeid,
// };

// 현재 카드 정보에 대한 cat2,3 정보
const categoryOption = data.contenttypeid === '28' ? data.cat2 : data.cat3;
// 카드 카테고리
const currentCategory = computed(() => {
  switch (data.contenttypeid) {
    // 숙소
    case '32': {
      const catData = stayCategoryFormat(categoryOption);
      return catData;
    }
    // 레스토랑
    case '39': {
      const catData = restaurantCategoryFormat(categoryOption);
      return catData;
    }
    // 문화 & 쇼핑
    case '38': {
      const catData = shoppingCategoryFormat(categoryOption);
      return catData;
    }
    // 관광 & 체험
    case '28': {
      const catData = reportsCategoryFormat(categoryOption);
      return catData;
    }
    default: {
      return '';
    }
  }
});

//  랜덤 이미지
const randomImg = traveListImg[Math.floor(Math.random() * traveListImg.length)].url;

// 상속받은 contentTypeId,contentId
const contentData = ref({
  contentId: data.contentid,
  contentTypeId: data.contenttypeid,
});

// detailCommon의 결과가 배열이므로, ref의 초기값은 빈 배열로 설정
const overviewData = ref<DetailData>();

onMounted(async () => {
  // detailCommon이 반환하는 배열을 overviewData에 할당합니다.
  overviewData.value = await detailCommon(contentData?.value);
  if (data.contenttypeid === '32') {
    const fetchedDetailInfoData = await fetchDetailInfoData({
      contentId: data.contentid,
      contentTypeId: data.contenttypeid,
    });
    roomCost.value = fetchedDetailInfoData[0].roomoffseasonminfee1;
  }
});

// 카드 클릭시 해당 정보를 가진 상세 페이지 이동
const handleRouter = (contentData: ContentData) => {
  router.push({
    path: PATH.travelDetail.replace(':contentId', contentData.contentId),
    query: { contenttypeid: contentData.contentTypeId },
  });
};
</script>

<template>
  <!-- 카드 컴포넌트 -->
  <div class="d-flex flex-row gap-2" :style="{ width: '100%', height: '295px', marginTop: '20px' }">
    <div class="card overflow-hidden">
      <img
        v-if="data.firstimage"
        :src="data.firstimage ? data.firstimage : randomImg"
        class="card-img-top"
      />
      <div
        v-else
        class="card-img-top noCard-img-top d-flex align-items-center justify-content-center"
      >
        <span class="text-muted">No Image</span>
      </div>
    </div>
    <div class="d-flex flex-row justify-content-between ms-4 travelCard cardContentSection">
      <!-- 카테고리 -->
      <div class="d-flex flex-column justify-content-between" @click="handleRouter(contentData)">
        <div class="text-primary-blue" :style="{ fontSize: '16px' }">{{ currentCategory }}</div>
        <!-- 이름 및 아이콘 -->
        <div class="d-flex flex-row justify-content-between align-items-center">
          <div class="subTitle">{{ data.title }}</div>
          <div class="d-flex flex-row gap-2"></div>
        </div>
        <!-- 주소 -->
        <div>{{ data.addr1 }}</div>
        <div>{{ data.tel }}</div>
        <div class="" style="width: 100%">
          <div
            v-for="(item, index) in overviewData"
            :key="index"
            class="mb-0"
            style="
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              line-clamp: 3;
              overflow: hidden;
              max-width: 100%;
            "
          >
            {{ item.overview ? item.overview : '' }}
          </div>
        </div>
        <div class="title" style="height: 54px">
          {{ !roomCost || roomCost === '0' ? '' : `${roomCost} / 박` }}
        </div>
      </div>

      <!-- 아이콘 -->
      <div
        v-if="authStore.isAuth"
        class="button-container"
        style="width: fit-content; height: fit-content"
      >
        <!-- 여행 플래너 버튼 -->
        <button @click="handleIconClick" class="btn p-0 border-0 bg-transparent">
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
  </div>
</template>

<style scoped>
/* 제목 폰트 */
.title {
  font-size: 36px;
  font-weight: 700;
}

.subTitle {
  font-size: 24px;
  font-weight: 500;
}

.card {
  width: 50%;
  height: 295px;
  border-radius: 15px;
}
.cardContentSection {
  width: 50%;
  height: 295px;
}

.card-img-top {
  height: 300px;
  object-fit: cover;
}
.noCard-img-top {
  background-color: var(--gray-3);
  height: 300px;
  object-fit: cover;
}

.travelCard:hover {
  cursor: pointer;
}
</style>
