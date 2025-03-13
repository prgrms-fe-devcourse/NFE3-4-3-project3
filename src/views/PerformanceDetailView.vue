<script lang="ts" setup>
import PerformanceInfo from '@/components/PerformanceDetailView/PerformanceInfo.vue'
import { computed, nextTick, onMounted, ref, watchEffect } from 'vue'
import PerformancePlace from '@/components/PerformanceDetailView/PerformancePlace.vue'
import type { PrfPlaceInfo } from '@/types/Performance'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import { getAwardPerformances, getPerformanceDetail, getPerformances } from '@/apis/kopis'
import PerformanceAward from '@/components/PerformanceDetailView/PerformanceAward.vue'
import PerformanceRecommend from '@/components/PerformanceDetailView/PerformanceRecommend.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const selectedColor = ref<string>('indigo')
const prfPlaceArray = ref<PrfPlaceInfo>()
const contentHeight = ref(1000)

const startDate = ref(null)
const endtDate = ref(null)
const imageRefs = ref([])
const prfdetail = ref()
const awardPerformances = ref([])
const recommendPerformance = ref([])

const isContentVisible = ref(false)
const actualContentHeight = ref(0) // 실제 콘텐츠 높이 저장

const genres = [
  { genre: '연극', code: 'AAAA' },
  { genre: '무용(서양/한국무용)', code: 'BBBC' },
  { genre: '대중무용', code: 'BBBE' },
  { genre: '서양음악(클래식)', code: 'CCCA' },
  { genre: '한국음악(국악)', code: 'CCCC' },
  { genre: '대중음악', code: 'CCCD' },
  { genre: '복합', code: 'EEEA' },
  { genre: '서커스/마술', code: 'EEEB' },
  { genre: '뮤지컬', code: 'GGGA' },
]

const loadMoreContent = () => {
  let totalHeight = 0

  if (Array.isArray(imageRefs.value)) {
    imageRefs.value.forEach((img) => {
      totalHeight += img.offsetHeight
    })
  } else if (imageRefs.value) {
    totalHeight += imageRefs.value.offsetHeight
  }

  contentHeight.value = totalHeight

  isContentVisible.value = true
}
const updateContentHeight = () => {
  let totalHeight = 0

  nextTick(() => {
    if (Array.isArray(prfdetail.value.styurls.styurl)) {
      imageRefs.value = Array.from(document.querySelectorAll('.content img'))
    } else {
      imageRefs.value = [document.querySelector('.content img')]
    }

    totalHeight = 0
    imageRefs.value.forEach((img) => {
      totalHeight += img.offsetHeight
    })

    actualContentHeight.value = totalHeight

    if (contentHeight.value <= 1000) {
      contentHeight.value = 1000
    }
  })
}
onMounted(async () => {
  try {
    const data = await getPerformanceDetail('prfInfo', route.params.id as string)
    prfdetail.value = data

    if (prfdetail.value && prfdetail.value.mt10id) {
      const placeData = await getPerformanceDetail('prfPlace', prfdetail.value.mt10id)
      prfPlaceArray.value = placeData
    } else {
      console.error('mt10id 값이 없습니다.')
    }

    if (prfdetail.value?.genrenm) {
      const genre = genres.find((item) => item.genre === prfdetail.value?.genrenm)
      if (genre) {
        const data2 = await getAwardPerformances(genre)
        awardPerformances.value = data2.dbs.db
      } else {
        console.error('해당 장르를 찾을 수 없습니다.')
      }

      // 장르에 맞는 data3 가져오기
      const genreForPerformance = genres.find((item) => item.genre === prfdetail.value?.genrenm)
      if (genreForPerformance) {
        const data3 = await getPerformances({ shcate: genreForPerformance.code, cpage: 1, rows: 8 })
        recommendPerformance.value = data3?.dbs.db
      } else {
        console.error('장르에 맞는 추천 공연을 찾을 수 없습니다.')
      }
    } else {
      console.error('prfdetail에서 genrenm을 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error('API 요청 실패:', error)
  }

  updateContentHeight()
})

const dateRange = computed(() => {
  return {
    start: new Date(startDate.value),
    end: new Date(endtDate.value),
  }
})

const activeKey = ref<string>('1')

watchEffect(() => {
  if (prfdetail.value?.prfpdfrom) {
    startDate.value = prfdetail.value.prfpdfrom.replace(/\./g, '-')
  }

  if (prfdetail.value?.prfpdto) {
    endtDate.value = prfdetail.value.prfpdto.replace(/\./g, '-')
  }
})

const onTabChange = (key) => {
  activeKey.value = key
}
</script>

<template>
  <div class="layout">
    <div class="poster-container">
      <PerformanceInfo
        :prfnm="prfdetail?.prfnm"
        :prfSchedule="[prfdetail?.prfpdfrom, prfdetail?.prfpdto]"
        :prfruntime="prfdetail?.prfruntime"
        :fcltynm="prfdetail?.fcltynm"
        :prfcast="prfdetail?.prfcast"
        :pcseguidance="prfdetail?.pcseguidance"
        :prfage="prfdetail?.prfage"
        :genrenm="prfdetail?.genrenm"
        :poster="prfdetail?.poster"
        :relates="prfdetail?.relates"
      />
      <div class="calendar-container">
        <div class="calendar">
          <DatePicker
            v-model="dateRange"
            is-range
            :disabled="true"
            :masks="{ title: 'YYYY년 MMM ' }"
            :color="selectedColor"
            :min-date="startDate"
            :max-date="endtDate"
          />
        </div>
      </div>
    </div>
    <a-tabs :active-key="activeKey" @change="onTabChange" class="performanceTab-container">
      <a-tab-pane key="1" tab="공연 상세 정보" class="performanceTab">
        <div class="poster-detail-container">
          <div :style="{ height: contentHeight + 'px' }" class="content" ref="content">
            <div v-if="Array.isArray(prfdetail?.styurls?.styurl)" class="poster-description">
              <div v-for="(item, index) in prfdetail?.styurls?.styurl" :key="index">
                <img :src="item" alt="포스터 설명" ref="imageRefs" />
              </div>
            </div>
            <div v-else>
              <img :src="prfdetail?.styurls?.styurl" alt="포스터 설명" ref="imageRefs" />
            </div>
          </div>
          <button
            v-if="contentHeight < actualContentHeight && !isContentVisible"
            class="show-more"
            @click="loadMoreContent"
          >
            더보기
          </button>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="공연장 상세 정보" class="performanceTab">
        <PerformancePlace
          :fcltynm="prfPlaceArray?.fcltynm"
          :seatscale="prfPlaceArray?.seatscale"
          :parkinglot="prfPlaceArray?.parkinglot"
          :mt13cnt="prfPlaceArray?.mt13cnt"
          :opende="prfPlaceArray?.opende"
          :restaurant="prfPlaceArray?.restaurant"
          :cafe="prfPlaceArray?.cafe"
          :store="prfPlaceArray?.store"
          :nolibang="prfPlaceArray?.nolibang"
          :suyu="prfPlaceArray?.suyu"
          :parkbarrier="prfPlaceArray?.parkbarrier"
          :restbarrier="prfPlaceArray?.restbarrier"
          :elevbarrier="prfPlaceArray?.elevbarrier"
          :runwbarrier="prfPlaceArray?.runwbarrier"
          :latitude="prfPlaceArray?.la"
          :longitude="prfPlaceArray?.lo"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="연관 공연 정보" class="performanceTab">
        <div class="prf-related-container">
          <div class="prf-related-card" style="margin-bottom: 72px">
            <div class="prf-related-title">{{ prfdetail?.genrenm }} 수상작을 만나보세요</div>
            <div class="prf-related-layer">
              <template v-if="awardPerformances && awardPerformances.length > 0">
                <PerformanceAward
                  v-for="(item, index) in awardPerformances.slice(0, 4)"
                  :key="index"
                  :prfnm="item.prfnm"
                  :fcltynm="item.fcltynm"
                  :awards="item.awards"
                  :poster="item.poster"
                />
              </template>
              <template v-else>
                <div class="non-award">
                  <div class="non-award-emoji">😭</div>
                  <p class="non-award-titme">수상작이 아직 없습니다</p>
                </div>
              </template>
            </div>
          </div>
          <div class="prf-related-card">
            <div class="prf-related-title">추천하는 다른 {{ prfdetail?.genrenm }}</div>
            <div class="prf-recommend-case">
              <PerformanceRecommend
                v-for="(item, index) in recommendPerformance"
                :key="index"
                :area="item.area"
                :prfnm="item.prfnm"
                :prfpdfrom="item.prfpdfrom"
                :prfpdto="item.prfpdto"
                :poster="item.poster"
                :fcltynm="item.fcltynm"
              />
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  max-width: 1246px;
  margin: 0 auto;
  margin: 70px 0 50px 0;
}
.content {
  height: 1000px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.poster-container {
  display: flex;
  justify-content: space-between;
}

.poster-detail-container {
  width: 1042px;
  margin: 0 auto;
}

.poster-description {
  text-align: center;
  margin-bottom: 17px;
}

.show-more {
  width: 100%;
  height: 61px;
  border-radius: 6px;
  background: #f1f1ef;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #4d4c4c;
  border: 1px solid #dddddd;
  cursor: pointer;
}

.calendar-container {
  width: 300px;
  display: flex;
  align-items: center;
}

.calendar {
  pointer-events: none;
}

.calendar :deep(.vc-header .vc-arrow) {
  background: white;
  width: 19px;
  height: 19px;
  color: #b4b4b5;
}

.calendar :deep(.vc-header .vc-title) {
  background: white;
  font-size: 17px;
  font-family: 'Pretendard', sans-serif;
}

.calendar :deep(.vc-weekday-7) {
  color: red;
  font-family: 'Pretendard', sans-serif;
}

.calendar :deep(.vc-weekday) {
  color: #000000;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
}

.calendar :deep(.vc-weekday-7) {
  color: #1a54ff;
}

.calendar :deep(.vc-weekday-1) {
  color: #f73f3f;
}

::v-deep .ant-tabs-nav {
  width: 100%;
  border: 1px solid $text-color-100;
  border-radius: 12px;
  margin-top: 70px;
}
::v-deep .performanceTab-container .ant-tabs-nav::before {
  border-bottom: none;
}

::v-deep .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
  margin: 0;
}

::v-deep .performanceTab-container .ant-tabs-tab {
  width: calc(100% / 3);
  height: 56px;
  font-size: 18px;
  color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid $text-color-100;
}

::v-deep .performanceTab-container .ant-tabs-tab:nth-child(3) {
  border-right: none;
}

::v-deep .performanceTab-container .ant-tabs-nav-wrap {
  display: block;
}

::v-deep .performanceTab-container .ant-tabs-tab-active {
  background-color: #f1f1ef;
}
::v-deep .performanceTab-container .ant-tabs-tab-active .ant-tabs-tab-btn {
  color: $secondary-color-300;
}

::v-deep .performanceTab-container .ant-tabs-nav-list .ant-tabs-ink-bar {
  background: $secondary-color-300;
}

.prf-related-container {
  margin-top: 20px;
}

.prf-related-layer {
  width: 948px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.prf-related-card {
  width: 100%;
  padding: 45px;
  box-sizing: border-box;
  border-radius: 8px;
  background: $text-color-100;
  border: 1px solid $text-color-100;
  box-shadow: 0 0 24px 0 rgb(140 139 153 / 50%);
  border: 1px solid #dfdfdf;
}

.prf-related-title {
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
}

.prf-recommend-case {
  width: 1100px;
  display: flex;
  padding: 55px 0;
  box-sizing: border-box;
  margin: 0 auto;
  flex-wrap: wrap;
}

.non-award {
  width: 100%;
  text-align: center;
}

.non-award-emoji {
  font-size: 85px;
}
.non-award-titme {
  margin-top: 4px;
  font-size: 29px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
