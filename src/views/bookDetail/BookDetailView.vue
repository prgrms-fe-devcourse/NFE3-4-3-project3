<template>
  <div class="wrap">
    <!-- 책 소개  -->
    <div class="book-detail-header">
      <div v-if="isLoading" class="loading-container">
        <img src="/images/loading.gif" alt="로딩중" class="loading-img">
      </div>
      <div v-else class="book-detail-container">
        <div class="book-detail-left">
          <div class="goToBack">
            <GoToBack />
          </div>
          <img v-if="detailData?.bookImageURL" :src="detailData?.bookImageURL" alt="book-detail-bg" class="book-img">
          <img v-else src="/images/no-image.png" alt="이미지 준비중입니다." class="book-img">
        </div>
        <div class="book-detail-right">
          <div class="book-detail-right-contents">
            <h1>{{ detailData?.bookname }}</h1>

            <div class="book-info">
              <div class="book-info-item">
                <div class="book-info-item-title">저자정보</div>
                <p class="book-info-item-text">{{ detailData?.authors }}</p>
              </div>

              <div class="book-info-item">
                <div class="book-info-item-title">출판사</div>
                <p class="book-info-item-text">{{ detailData?.publisher }}</p>
              </div>

              <div class="book-info-item">
                <div class="book-info-item-title">출판연도</div>
                <p class="book-info-item-text">{{ detailData?.publication_year }}</p>
              </div>

              <div class="book-info-item">
                <div class="book-info-item-title">주제분류</div>
                <p class="book-info-item-text">{{ detailData?.class_nm }}</p>
              </div>

            </div>

            <div class="book-description">
              <p v-html="detailData?.description"></p>
            </div>
          </div>

          <div class="book-detail-sub-contents">
            <div class="book-loan-count-container">
              <p class="book-loan-count-title">대출건수</p>
              <p class="book-loan-count">{{ loanCount }}</p>
            </div>

            <div class="bookmark" @click="handleBookmarkClick">
              <BookMarkIcon strokeColor="#fff" />
              <span>북마크</span>
            </div>
          </div>

        </div>

      </div>
    </div>
    <!-- 책 소개  -->

    <!-- 도서관 정보 -->
    <div class="book-detail-body-container">
      <div class="book-library-info-container">
        <div class="book-library-info-left">
          <h2>도서 소장 도서관</h2>

          <div class="book-library-header-conatiner">
            <div class="library-filter-container">
              <a-select v-model:value="regionValue" style="width: 200px" :options="regionOptions"
                @change="handleRegionChange"></a-select>
              <a-select v-model:value="regionValue1" style="width: 200px" :options="regionDetailOptions"
                @change="handleDetailRegionChange"></a-select>
            </div>

            <div class="homepage-button-container">
              <p @click="handleLibraryClick">홈페이지 이동</p>
            </div>
          </div>

          <div class="library-table-container">
            <a-table :columns="columns" :data-source="tableData" :pagination="{ pageSize: 50 }" :scroll="{ y: 200 }"
              :custom-row="libraryClickHandler" />
          </div>
        </div>
        <div class="book-library-info-right">
          <div id="map" style="width:100%;height:100%;"></div>
        </div>
      </div>

      <!-- 함께 대출된 관련 도서 -->
      <LoanBookSlider :coLoanBooksDatas="coLoanBooksData" />
      <!-- 함께 대출된 관련 도서 -->

      <!-- 다독자를 위한 추천 도서 -->
      <ReaderRecommendSlider :readerRecBooksDatas="readerRecBooksData" />
      <!-- 다독자를 위한 추천 도서 -->
    </div>
    <!-- 도서관 정보 -->

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue';
import BookMarkIcon from '@/components/bookDetail/BookMarkIcon.vue';
import { getBookDetail, getLibraryLoanPossible, getLibraryUsageAnalysis } from '@/apis/books';
import type { BookDetail, CoLoanBook, ReaderRecBook } from '@/types/libraryType';
import GoToBack from '@/components/common/GoToBack.vue';
import { REGION_CODE } from '@/constants/regionCode';
import { REGION_DETAIL_CODE } from '@/constants/regionDetailCode';
import LoanBookSlider from '@/components/bookDetail/LoanBookSlider.vue';
import ReaderRecommendSlider from '@/components/bookDetail/ReaderRecommendSlider.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const columns = [
  {
    title: 'NO',
    dataIndex: 'no',
    width: 60,
    textAlign: 'center',
  },
  {
    title: '도서관 명',
    dataIndex: 'libraryName',
    width: 300,
  },
  {
    title: '주소',
    dataIndex: 'address',
    width: 300,
  },
];

const tableData = ref<any[]>([]) // 도서관 테이블 데이터

const detailData = ref<BookDetail>() // 도서 상세 데이터
const loanInfoData = ref<any>() // 대출 정보 데이터

const libraryLoanPossibleData = ref<any>() // 대출 가능한 도서관 데이터

const isLoading = ref(false)

const regionValue = ref<number>(11)
const regionValue1 = ref<string>('세부 지역 선택')

const selectedLibrary = ref<any>(null)

const coLoanBooksData = ref<CoLoanBook[]>([])

const readerRecBooksData = ref<ReaderRecBook[]>([])
// 대출 건수
const loanCount = computed(() => {
  return loanInfoData.value?.[0]?.Total?.loanCnt || '정보 없음'
})

// 지역 선택 옵션
const regionOptions = computed(() => {
  return REGION_CODE.map((region) => {
    return {
      label: region.name,
      value: region.code,
    }
  })
})

// 세부지역 선택 옵션
const regionDetailOptions = computed(() => {
  const regionName = REGION_CODE.find(region => region.code === regionValue.value)?.name;

  return REGION_DETAIL_CODE[regionName!].map((region) => {
    return {
      label: region.name,
      value: region.code,
    };
  });
});

// 대출 가능한 도서관 데이터 포맷팅
const formatLibraryLoanPossibleData = (libraryData: any) => {
  tableData.value = libraryData.libs.map((item: any, index: number) => ({
    no: index + 1,
    libraryName: item.lib.libName,
    address: item.lib.address,
    homepage: item.lib.homepage,
    latitude: item.lib.latitude,
    longitude: item.lib.longitude,
  }));

  selectedLibrary.value = tableData.value[0]

  initMap(selectedLibrary.value.latitude, selectedLibrary.value.longitude);
}

watchEffect(async () => {
  isLoading.value = true
  try {
    // 도서 상세 데이터 조회
    const { detailData: fetchDetailData, loanInfoData: fetchLoanInfoData } = await getBookDetail(+props.id)
    detailData.value = fetchDetailData;
    loanInfoData.value = fetchLoanInfoData;

    // 대출 가능한 도서관 데이터 조회
    const libraryLoanPossible = await getLibraryLoanPossible(+props.id, regionValue.value = 11, null)
    libraryLoanPossibleData.value = libraryLoanPossible

    formatLibraryLoanPossibleData(libraryLoanPossible)
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error)
  } finally {
    isLoading.value = false
  }
});

let map: any = null;
let marker: any = null;
let infowindow: any = null;

const initMap = (lat: number = 37.566826, lng: number = 126.9786567) => {
  if ((window as any).kakao) {
    const kakao = (window as any).kakao

    // 지도가 이미 초기화되어 있다면, 다시 생성하지 않도록 처리
    if (map) {
      // 지도 위치만 업데이트
      const latLng = new kakao.maps.LatLng(lat, lng)
      map.setCenter(latLng) // 지도 중심 변경
      marker.setPosition(latLng) // 마커 위치 변경

      infowindow.setContent(`${selectedLibrary.value.libraryName ? `<div style="padding:5px; text-align: center; font-size: 14px;">${selectedLibrary.value.libraryName}</div>` : ''}`);
      infowindow.setPosition(latLng);
      return
    }

    // 지도 생성
    kakao.maps.load(() => {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      }

      map = new kakao.maps.Map(container, options) // 지도 객체 생성

      const markerPosition = new kakao.maps.LatLng(lat, lng)
      marker = new kakao.maps.Marker({ // 마커 객체 생성
        position: markerPosition,
      })

      infowindow = new kakao.maps.InfoWindow({
        content: `${selectedLibrary?.value?.libraryName ? `<div style="padding:5px; text-align: center;">${selectedLibrary.value.libraryName}</div>` : ''}`,
        position: markerPosition
      });


      marker.setMap(map)
      infowindow.open(map, marker);

      kakao.maps.event.addListener(marker, 'click', handleLibraryClick);
    })
  }
}

const handleLibraryClick = () => {
  const result = confirm(`${selectedLibrary.value.libraryName} 홈페이지로 이동하시겠습니까?`);
  if (result) {
    window.open(selectedLibrary.value.homepage, '_blank');
  }
}

onMounted(() => {
  initMap();
})

watchEffect(async () => {
  try {
    const { coLoanBooksData: fetchCoLoanBooksData, readerRecBooksData: fetchReaderRecBooksData } = await getLibraryUsageAnalysis(+props.id)

    coLoanBooksData.value = fetchCoLoanBooksData
    readerRecBooksData.value = fetchReaderRecBooksData
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error)
  }
})

const handleRegionChange = async (value: number) => {
  try {
    const response = await getLibraryLoanPossible(+props.id, value, null);

    formatLibraryLoanPossibleData(response);
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error)
  }
}

const handleDetailRegionChange = async (value: number) => {
  try {
    const response = await getLibraryLoanPossible(+props.id, regionValue.value, value);

    formatLibraryLoanPossibleData(response);
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error)
  }
}

// 도서관 테이블 클릭 이벤트
const libraryClickHandler = (record: any) => {
  return {
    onClick: () => {
      selectedLibrary.value = record
      initMap(selectedLibrary.value.latitude, selectedLibrary.value.longitude)
    }
  }
}

const handleBookmarkClick = () => {
  alert('북마크 클릭')
}
</script>

<style scoped lang="scss">
@import './BookDetailView.scss';
</style>
