<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import type { SelectProps } from 'ant-design-vue';
import LibrarySelection from '@/components/LibrarySearchView/LibrarySelection.vue'
import LibraryResultList from '@/components/LibrarySearchView/LibraryResultList.vue'
import { onMounted } from 'vue'
import { getLibraryInfoByDetailRegion, getLibraryInfoByRegion } from '@/apis/books.ts'
import type { LibraryResult } from '@/types/library/library.types.ts'
import Pagination from '@/components/common/Pagination.vue'
import { REGION_DETAIL_CODE, type RegionKey } from '@/constants/regionDetailCode.ts'
import { REGION_CODE, type RegionCodeType, type RegionNameType } from '@/constants/regionCode.ts'

const regionList = [
  { code: 0, name: '전체' },
  { code: 11010, name: '종로구' },
  { code: 11020, name: '중구' },
  { code: 11030, name: '용산구' },
  { code: 11040, name: '성동구' },
  { code: 11050, name: '광진구' },
  { code: 11060, name: '동대문구' },
  { code: 11070, name: '중랑구' },
  { code: 11080, name: '성북구' },
  { code: 11090, name: '강북구' },
  { code: 11100, name: '도봉구' },
  { code: 11110, name: '노원구' },
  { code: 11120, name: '은평구' },
  { code: 11130, name: '서대문구' },
  { code: 11140, name: '마포구' },
  { code: 11150, name: '양천구' },
  { code: 11160, name: '강서구' },
  { code: 11170, name: '구로구' },
  { code: 11180, name: '금천구' },
  { code: 11190, name: '영등포구' },
  { code: 11200, name: '동작구' },
  { code: 11210, name: '관악구' },
  { code: 11220, name: '서초구' },
  { code: 11230, name: '강남구' },
  { code: 11240, name: '송파구' },
  { code: 11250, name: '강동구' },
];

const options = ref<SelectProps['options']>(
  regionList.map(region => ({
    value: region.code,
    label: region.name,
  }))
);

const filterValue = ref(0);
const resultList = ref<LibraryResult['libs']>([]);
const responseData = ref<LibraryResult>();
const currentPage = ref(1);
const isPending = ref(false);
const { regionCode } = inject('region');

// TODO 페이지네이션을 하고 나서 옵션을 바꾸면 이전 페이지 번호가 넘어가서 데이터가 이상하게 나오는 문제
const fetchData = async (detailRegionCode?: number) => {
  try {
    if (filterValue.value === 0) {
      const data: LibraryResult = await getLibraryInfoByRegion(regionCode.value, currentPage.value);
      responseData.value = data;
      resultList.value = data.libs;
    } else if (detailRegionCode) {
      const data: LibraryResult = await getLibraryInfoByDetailRegion(detailRegionCode, currentPage.value);
      responseData.value = data;
      resultList.value = data.libs;
    }
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
};

const handleChangeSelectOption = async () => {
  await fetchData(filterValue.value);
}

const handleChangePage = async (value: number) => {
  resultList.value = [];
  currentPage.value = value;
  await fetchData();
}

function changeOptions(city: RegionKey) {
  const arr = [];
  currentPage.value = 1;
  arr.push({ value: 0, label: '전체' })
  for (const item of REGION_DETAIL_CODE[city]) {
    arr.push({
      value: item.code,
      label: item.name,
    })
  }
  options.value = arr;
}

function findRegionName(num: RegionCodeType): RegionNameType {
  for (const item of REGION_CODE) {
    if (item.code === num) {
      return item.name;
    }
  }
  return '서울'
}

onMounted(() => {
  fetchData();
});

watch(regionCode, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    resultList.value = [];
    responseData.value = {
      pageSize: 1,
      pageNo: 1,
      numFound: 0,
      resultNum: 0,
      libs: [],
    };
    filterValue.value = 0;
    fetchData();
    changeOptions(findRegionName(newValue));
  }
});
</script>

<template>
  <div class="layout">
    <LibrarySelection />
    <div class="result-wrapper">
      <div class="input-wrapper">
        <a-config-provider :theme="{
          token: {
            colorPrimary: '#6472FC',
          },
        }">
          <a-select ref="select" v-model:value="filterValue" style="width: 150px" :options="options"
            @change="handleChangeSelectOption" size="large"></a-select>
        </a-config-provider>
      </div>
      <div class="search-result-wrapper">
        <div v-if="resultList.length === 0">
          <a-skeleton active />
          <a-skeleton active />
          <a-skeleton active />
          <a-skeleton active />
          <a-skeleton active />
        </div>
        <LibraryResultList
          v-for='item in resultList'
          :key="item.lib.libInfo.libCode"
          :address="item.lib.libInfo.address"
          :homepage="item.lib.libInfo.homepage"
          :lib-code="item.lib.libInfo.libCode"
          :lib-name="item.lib.libInfo.libName"
        />
      </div>
      <div class="pagination-wrapper">
        <Pagination :current="currentPage" :total="responseData?.numFound" :page-size="responseData?.pageSize"
          @update:current="handleChangePage" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  width: 936px;
  height: 1120px;
}

.result-wrapper {
  margin-top: 25px;
  height: 962px;
  width: 936px;
}

.input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 936px;
  height: 40px;
}

.search-box {
  width: 300px;
}

.search-result-wrapper {
  display: grid;
  gap: 8px;
  width: 936px;
  max-height: 752px;
  height: auto;
  margin-top: 16px;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 110px;
  width: 936px;
}
</style>
