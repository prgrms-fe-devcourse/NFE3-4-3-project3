<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import GenreContainer, { type GenreEmit } from '@/components/PerformanceSearch/GenreContainer.vue'
import { getPerformances, type PerformanceInfoType } from '@/apis/kopis.ts'
import PerformanceCard from '@/components/common/PerformanceCard.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import { type InfiniteData, useInfiniteQuery } from '@tanstack/vue-query'
import NotFound from '@/components/common/NotFound.vue'

const genreCurrentName = ref('전체')
const genreCode = ref('')
const searchText = ref('')
const loadMoreTrigger = ref<HTMLDivElement | null>(null) // 무한 스크롤 트리거

const handleGenreClick = (genre: GenreEmit) => {
  genreCode.value = genre.genreCode
  genreCurrentName.value = genre.genreName
}

const handleSearch = (value: string) => {
  searchText.value = value
}

const queryKey = computed(() => ['performances', genreCode.value, searchText.value])

const { data, fetchNextPage, hasNextPage, isPending, isFetching } = useInfiniteQuery({
  queryKey: queryKey,
  queryFn: ({ pageParam = 1 }) =>
    getPerformances({
      shcate: genreCode.value,
      cpage: pageParam,
      rows: 9,
      shprfnm: searchText.value,
    }),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    if (lastPage.dbs.db.length < 9) {
      return undefined
    }
    return allPages.length + 1
  },
  maxPages: 10,
})

let observer: IntersectionObserver | null = null

onMounted(async () => {
  observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0]
      if (target.isIntersecting && hasNextPage.value) {
        fetchNextPage()
      }
    },
    { rootMargin: '400px' },
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})
</script>

<template>
  <div class="layout">
    <div class="banner">
      <img src="/public/icons/Performance/search-hero.svg" width="1246" height="284" />
      <div class="banner-text">
        <div style="color: var(--Secondary-Orange, #ea5313)">'{{ genreCurrentName }}'</div>
        <div>&nbsp;에 대한 검색 결과 입니다</div>
      </div>
    </div>
    <div style="margin-top: 21px">
      <GenreContainer @handle-genre-click="handleGenreClick" />
    </div>
    <div class="search-row">
      <div style="font-size: 24px; font-weight: 600">공연 검색 결과</div>
      <div style="width: 579px; height: 51px">
        <SearchBox
          @submit="handleSearch"
          :search-type-options="[
            {
              value: 'performance',
              label: '공연명',
            },
            {
              value: 'facility',
              label: '공연시설명',
            },
          ]"
        />
      </div>
    </div>
    <div v-if="isPending" class="performance-grid">
      <a-skeleton active :paragraph="{ rows: 9 }" />
      <a-skeleton active :paragraph="{ rows: 9 }" />
      <a-skeleton active :paragraph="{ rows: 9 }" />
      <a-skeleton active :paragraph="{ rows: 9 }" />
      <a-skeleton active :paragraph="{ rows: 9 }" />
      <a-skeleton active :paragraph="{ rows: 9 }" />
      <a-skeleton active :paragraph="{ rows: 9 }" />
      <a-skeleton active :paragraph="{ rows: 9 }" />
      <a-skeleton active :paragraph="{ rows: 9 }" />
    </div>
    <div v-else-if="data && data.pages.length > 0" style="margin-bottom: 50px">
      <div v-for="(page, pageIndex) in data.pages" :key="pageIndex" class="performance-grid">
        <div v-for="item in page.dbs.db" :key="item.mt20id">
          <PerformanceCard
            :cate="item.genrenm"
            :mt20id="item.mt20id"
            :poster="item.poster"
            :prfnm="item.prfnm"
            :prfpd="item.prfpdfrom + '~' + item.prfpdto"
          />
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 20px">
      <NotFound title="검색 결과가 없습니다." />
    </div>
    <div ref="loadMoreTrigger" class="load-more-trigger"></div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 1246px;
}

.banner {
  margin-top: 57px;
  height: 284px;
}

.banner-text {
  display: flex;
  margin-top: -178px;
  margin-left: 94px;
  color: #fff;
  font-family: Pretendard;
  font-size: 40px;
}

.keyword_badge_container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .badge {
    display: inline-block;
    border-radius: 30px;
    border: 1px solid #d3d0cb;
    padding: 0.5rem 1rem;
    color: #61605d;
  }
}

.performance-grid {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 1246px;
  max-height: 1410px;
  margin-top: 30px;
}

.search-row {
  display: flex;
  width: 1246px;
  align-items: center;
  justify-content: space-between;
}
</style>
