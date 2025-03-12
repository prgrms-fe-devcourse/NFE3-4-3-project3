<script setup lang="ts">
import TitleText from '@/components/common/TitleText.vue';
import ShelterCard from '@/components/adoption/shelter/ShelterCard.vue';
import ShelterModal from '@/components/adoption/shelter/ShelterModal.vue';
import { KOR_ORG } from '@/constants/api/korOrg';
import CITY_ORG from '@/constants/api/cityOrg';
import { ref, computed, watch, reactive } from 'vue';
import ShelterKakaoMap from '@/components/adoption/shelter/ShelterKakaoMap.vue';
import { useQuery } from '@tanstack/vue-query';
import { getShelterListApi, getShelterInfo } from '@/apis/adoption/shelter';
import {
  type UpperOrgType,
  type OrgType,
  type ShelterWithRegNo,
  initialShelter,
} from '@/types/shelter';

const upperOrg = ref<UpperOrgType>({
  orgCd: '6110000',
  orgdownNm: '서울특별시',
});

// 최종적으로 선택된 지역 상태
const org = ref<OrgType>({
  uprCd: '6110000',
  orgCd: '3220000',
  orgdownNm: '하위 지역 선택',
});

// 선택된 동물 상태 리스트
const animals = reactive({
  dog: false,
  cat: false,
  etc: false,
});

//  📍 여기서 org가 달라질때마다 보호소 목록 조회를 하면 됨.
// 1. 해당 지역내 모든 보호소를 조회
const {
  data: shelters,
  isLoading: isLoadingShelters,
  refetch,
} = useQuery({
  queryKey: ['shelters', 'list', org.value.uprCd, org.value.orgCd],
  queryFn: () => getShelterListApi(org.value.uprCd, org.value.orgCd),
});

// 다음쿼리가 실행될 준비가 되었는지 확인한다.
const enabled = computed(() => {
  if (shelters.value && (shelters.value.length > 0 || shelters.value !== undefined)) {
    return true;
  }
  return false;
});

// 2. 보호소 별 상세정보를 조회
const {
  data: shelterDetails,
  isLoading: isLoadingShelterDetails,
  // refetch,
} = useQuery({
  queryKey: ['shelterDetails', org.value.uprCd, org.value.orgCd, shelters],
  queryFn: () => {
    console.log('두번째 쿼리가 작동');
    return Promise.all(shelters.value.map((shelter) => getShelterInfo(shelter.careRegNo)));
  },
  enabled, // 준비 완료시 queryFn 실행
});

const converter = {
  dog: '개',
  cat: '고양이',
  etc: '기타',
};

const orgList = computed(() => CITY_ORG[upperOrg.value?.orgdownNm]); // 드롭다운 리스트
// 사이드바의 정보를 조합해서 필터에 맞는 정보만 반환
const shelterList = computed(() => {
  return shelterDetails.value
    ?.filter((shelterData) => 'item' in shelterData.body.items)
    .map((shelterData) => {
      const careRegNoData = shelterData.header.reqNo;
      const shelterInfoData = shelterData.body.items.item[0];
      return {
        careRegNo: careRegNoData,
        ...shelterInfoData,
      };
    })
    .filter((shelter) => {
      const animalArray = shelter.saveTrgtAnimal.split('+');
      const selectedAnimals = Object.keys(animals).filter((animal) => animals[animal]);
      //console.log('selected', selectedAnimals);
      return selectedAnimals.every((animal) => animalArray.includes(converter[animal]));
    });
});

// 디버깅용
// watch(shelterList, (newV, _) => {
//   console.log('✅두번째 사이드바 shelterList', newV);
// });

const isOpenModal = ref<boolean>(false);
const shelter = ref<ShelterWithRegNo | null>({
  ...initialShelter,
}); // 현재 보여지는 보호소 목록중 선택된 보호소정보

// 상위 지역이 바뀔떄
const handleButtonClick = (upperOrgItem: UpperOrgType) => {
  upperOrg.value = upperOrgItem; // 현재 상태를 업데이트하고
  org.value = CITY_ORG[upperOrg.value?.orgdownNm][0]; // 하위 지역중 첫번재 지역을 자동 선택
  console.log('org', org.value);
  refetch();
};
// 하위 지역이 바뀔때
const handleDropDown = (orgItem) => {
  org.value = orgItem;
  console.log('org.value', org.value);
  refetch();
};

const handleClose = () => {
  isOpenModal.value = false;
};
const handleCardClick = (shelterItem: ShelterWithRegNo) => {
  shelter.value = shelterItem;
  isOpenModal.value = true;
};

const handleCheckBox = (animal: keyof typeof animals) => {
  const prev: boolean = animals[animal];
  animals[animal] = !prev;
  console.log(animals);
};
</script>

<template>
  <div class="search-wrapper d-flex flex-column flex-lg-row">
    <div class="d-flex">
      <div class="side-bar">
        <TitleText size="24px" weight="600" color="gray-10">우리지역 보호소 찾기</TitleText>
        <hr />
        <!-- 상위 시도 선택 버튼 -->
        <div>
          <TitleText size="20px" weight="600" color="gray-10">시/도</TitleText>
          <div>
            <button
              v-for="upperOrgItem of KOR_ORG"
              :key="upperOrgItem.orgCd"
              type="button"
              class="btn btn-custom"
              :class="{ btnFocus: upperOrg.orgCd == upperOrgItem.orgCd }"
              @click="handleButtonClick(upperOrgItem)"
            >
              {{ upperOrgItem.orgdownNm.slice(0, 2) }}
            </button>
          </div>
        </div>
        <hr />
        <!-- 하위 시군구 드롭다운 -->
        <div>
          <TitleText size="20px" weight="600" color="gray-10">시군구</TitleText>
          <div>
            <div class="btn-group">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ org.orgdownNm }}
              </button>
              <ul class="dropdown-menu">
                <li v-for="orgItem of orgList" :key="orgItem.orgCd">
                  <a class="dropdown-item" href="#" @click="handleDropDown(orgItem)">{{
                    orgItem.orgdownNm
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <!-- 동물 선택 체크박스 -->
        <div>
          <TitleText size="20px" weight="600" color="gray-10">구조대상동물</TitleText>
          <div class="ps-1 mt-2 text-gray-10">
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                name="dog"
                id="dog"
                @change="handleCheckBox('dog')"
              />
              <label class="form-check-label" for="dog"> 개 </label>
            </div>
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                name="cat"
                id="cat"
                @change="handleCheckBox('cat')"
              />
              <label class="form-check-label" for="cat"> 고양이 </label>
            </div>
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="checkbox"
                name="etc"
                id="etc"
                @change="handleCheckBox('etc')"
              />
              <label class="form-check-label" for="etc"> 기타 </label>
            </div>
          </div>
        </div>
      </div>
      <!-- 조회결과 사이드바 -->
      <div class="side-bar card-list">
        <TitleText size="16px" color="gray-6" weight="600"
          >'{{ upperOrg.orgdownNm }} {{ org.orgdownNm }}' 조회결과</TitleText
        >
        <ShelterCard
          v-for="(shelterItem, index) of shelterList"
          :key="index"
          :shelter="shelterItem"
          @click="handleCardClick(shelterItem)"
          :isSelected="shelterItem.careRegNo === shelter?.careRegNo"
        />
      </div>
    </div>

    <!-- 지도 영역 -->
    <div class="map">
      <ShelterKakaoMap :lat="shelter.lat" :lng="shelter.lng" />
      <Transition name="fade">
        <ShelterModal
          v-if="shelter !== null && isOpenModal"
          :item="shelter"
          careRegNo="123"
          :onClose="handleClose"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  width: 100vw;
  background-color: var(--gray-1);
  height: 80vh;
  max-height: 900px;
}

.side-bar {
  width: 15vw;
  min-width: 200px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin: 0px auto;
  gap: 15px;
}

.side-bar.card-list {
  overflow-y: scroll;
}

.side-bar hr {
  margin: 0;
  color: var(--gray-6);
}

.map {
  position: relative;
  background-color: aliceblue;
  flex: 1;
}
.btn-custom {
  background-color: var(--gray-3);
  margin: 5px 3px;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 12px;
}
.btn-custom:hover {
  background-color: var(--secondary-green);
  color: var(--gray-1);
}
.btnFocus {
  background-color: var(--primary-green);
  color: var(--gray-1);
}

.dropdown-toggle {
  border: 1px solid var(--gray-3);
}

.dropdown-toggle:hover {
  background-color: var(--gray-3);
  color: var(--gray-10);
}

.dropdown-item:hover {
  background-color: var(--secondary-green);
}
.form-check-input {
  border-radius: 100%;
}

.form-check-input:checked {
  background-color: var(--primary-green);
  border: 1px solid white;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.8s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
