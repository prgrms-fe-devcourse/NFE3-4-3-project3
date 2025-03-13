<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { getBookDetail, getLibraryInfoByLibraryCode, getLibraryPopularBooks } from '@/apis/books.ts'
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import type {
  LibraryResult,
  Libraries,
  LibraryPopularBooksType, PopularBookResponse
} from '@/types/library/library.types.ts'
import LibraryInfo from '@/components/LibraryDetailView/LibraryInfo.vue'
import type { Book, GetBookDetailResponse } from '@/types/libraryType.ts'
import HomeBookItem from '@/components/common/HomeBookItem.vue'

interface PopularBooksType {
  age8Books: Book[];
  age14Books: Book[];
  age20Books: Book[];
  loanBooks: Book[];
}

type AgeBooksType = keyof PopularBooksType;

const route = useRoute();
const libId = Number(route.params.id);
const libraryData = ref<Libraries>();
const popularBooksDetail = ref<GetBookDetailResponse[]>([]);
const popularBooks = ref<PopularBooksType>({
  age8Books: [],
  age14Books: [],
  age20Books: [],
  loanBooks: [],
});
const currentAgeFilter = ref<AgeBooksType>('age20Books');
const selectedPopularBook = ref<string>('');

function insertDataToArray(books: PopularBookResponse[], array: Book[]) {
  for (let i = 0; i < books.length; i++) {
    array.push(books[i].book)
  }
  return array;
}

const handleTabClick = (selected: AgeBooksType) => {
  currentAgeFilter.value = selected;
}

const handleBookClick = (isbn13: string) => {
  selectedPopularBook.value = isbn13;
}

const filteredBooks = computed(() =>
  popularBooksDetail.value.filter(item => selectedPopularBook.value === item.detailData.isbn13)
);

onMounted(async () => {
  try {
    const data: LibraryResult = await getLibraryInfoByLibraryCode(libId);
    libraryData.value = data.libs[0];
    const books: LibraryPopularBooksType = await getLibraryPopularBooks(libId);
    const arrAge8: Book[] = [];
    const arrAge14: Book[] = [];
    const arrAge20: Book[] = [];
    const arrAll: Book[] = [];
    popularBooks.value.age8Books = insertDataToArray(books.age8Books, arrAge8);
    popularBooks.value.age14Books = insertDataToArray(books.age14Books, arrAge14);
    popularBooks.value.age20Books = insertDataToArray(books.age20Books, arrAge20);
    popularBooks.value.loanBooks = insertDataToArray(books.loanBooks, arrAll);

    const promiseArray: Promise<GetBookDetailResponse>[] = [];

    for (let i = 0; i < 6; i++) {
      const item = popularBooks.value.loanBooks[i];
      promiseArray.push(getBookDetail(Number(item.isbn13))) // TODO - get 함수의 인자 타입을 string 으로 바꾸는게 나을듯
    }

    popularBooksDetail.value = await Promise.all(promiseArray);
    selectedPopularBook.value = popularBooksDetail.value[0].detailData.isbn13;
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
});
</script>

<template>
  <div class="library-detail">
    <h2 class="info-title">도서관 상세 정보</h2>
    <div v-if="libraryData">
      <LibraryInfo :lib-name="libraryData.lib.libInfo.libName" :homepage="libraryData.lib.libInfo.homepage"
        :address="libraryData.lib.libInfo.address" :fax="libraryData.lib.libInfo.fax"
        :closed="libraryData.lib.libInfo.closed" :operating-time="libraryData.lib.libInfo.operatingTime"
        :tel="libraryData.lib.libInfo.tel" />
      <div class="popular-books">
        <h2>도서관 인기 도서</h2>
        <div class="flex-wrapper">
          <div class="books-grid">
            <div v-for="item in popularBooksDetail" :key="item.detailData.isbn13">
              <img :src="item.detailData.bookImageURL" height="237" width="206" alt="book-img"
                @click="handleBookClick(item.detailData.isbn13)" class="book-image"
                :class="{ 'book-image-shadow': selectedPopularBook !== item.detailData.isbn13 }">
            </div>
          </div>
          <div v-for="item in filteredBooks" :key="item.detailData.isbn13" class="popular-book-info">
            <div class="book-info-title">
              <img src="/icons/library/purple-box.svg" alt="block-img">
              <div>{{ item.detailData.bookname }}</div>
            </div>
            <div class="author">{{ item.detailData.authors }}</div>
            <div class="description">{{ item.detailData.description }}</div>
          </div>
        </div>
      </div>
      <div class="popular-books">
        <div class="title-with-tab">
          <h2>도서관 연령별 인기 도서</h2>
          <div :class="{ tab: true, 'tab-active': currentAgeFilter === 'age20Books' }"
            @click="handleTabClick('age20Books')">성인</div>
          <div :class="{ tab: true, 'tab-active': currentAgeFilter === 'age14Books' }"
            @click="handleTabClick('age14Books')">청소년</div>
          <div :class="{ tab: true, 'tab-active': currentAgeFilter === 'age8Books' }"
            @click="handleTabClick('age8Books')">영유아</div>
        </div>
        <div class="books-flex">
          <HomeBookItem v-for="book in popularBooks[currentAgeFilter]" :authors="book.authors" :title="book.bookname"
            :bookimage="book.bookImageURL" :isbn13="book.isbn13" :key="book.isbn13" />
        </div>
      </div>
      <h2 class="info-title-map">도서관 위치</h2>
      <KakaoMap class="map" :width="1246" :height="400" :lat="Number(libraryData.lib.libInfo.latitude)"
        :lng="Number(libraryData.lib.libInfo.longitude)" :draggable="true">
        <KakaoMapMarker :lat="Number(libraryData.lib.libInfo.latitude)" :lng="Number(libraryData.lib.libInfo.longitude)"
          title="절대경로로 이미지 가져오기">
          <template v-slot:infoWindow>
            <div style="padding: 10px">{{ libraryData.lib.libInfo.libName }}</div>
          </template>
        </KakaoMapMarker>
      </KakaoMap>
    </div>
    <div v-else>
      <div class="loading"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  height: 1528px;
  width: 1246px;
}

.books-flex {
  display: flex;
  flex-wrap: nowrap;
  /* 한 줄로 유지 */
  gap: 20px;
  /* 요소들 간의 간격 (원하는 값으로 조정) */
  padding: 40px;
  width: 1246px;
  height: 370px;
  background-color: #FCF4EF;
  border-radius: 20px;
  margin-top: 10px;
  overflow-x: auto;
  /* 가로 스크롤 활성화 */
}

.popular-books {
  margin-top: 80px;
}

.info-title {
  margin-top: 20px;
}

.info-title-map {
  margin-top: 40px;
}

.map {
  margin-top: 10px;
  margin-bottom: 40px;
  border-radius: 10px;
}

.title-with-tab {
  display: flex;
  gap: 40px;
  align-items: center;
  height: 36px;
  width: 470px;
}

.tab {
  display: grid;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 19px;
  cursor: pointer;
  font-size: 16px;
  color: $text-color-400;
  font-weight: 500;
  position: relative;
  /* 자식 요소(.tab-active::before)의 위치 기준 */
}

.tab:hover {
  color: $secondary-color-300;
}

.tab-active {
  color: $secondary-color-300;
}

.tab-active::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background-color: $primary-color-100;
  border-radius: 50%;
}

.flex-wrapper {
  display: flex;
  height: 497px;
  width: 1246px;
  justify-content: space-between;
  margin-top: 10px;
}

.books-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  height: 497px;
  width: 760px;
}

.popular-book-info {
  display: grid;
  height: 497px;
  width: 450px;
  place-content: center;
  gap: 20px;
}

.book-image {
  cursor: pointer;
}

.book-image-shadow {
  filter: brightness(45%)
}

.author {
  display: flex;
  width: 450px;
  font-size: 20px;
  color: $text-color-500;
  font-weight: 600;
  justify-content: flex-end;
}

.description {
  font-size: 18px;
  color: $text-color-500;
}

.book-info-title {
  display: flex;
  gap: 40px;
  font-size: 36px;
  font-weight: bold;
  align-items: center;
  margin-bottom: 20px;
  width: 450px;
  height: 43px;
}
</style>
