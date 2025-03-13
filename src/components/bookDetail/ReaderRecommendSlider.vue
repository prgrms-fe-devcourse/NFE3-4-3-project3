<template>
  <div class="reader-recommend-slider-container">
    <h1>독자 추천 도서</h1>

    <div class="slide-container">

      <div class="book-description-container">
        <p v-html="currentMainBook?.description"></p>
      </div>

      <div class="slide-wrapper">
        <div class="slide-items">
          <div v-for="(book, index) in bookDetails" :key="book.isbn13" class="slide-item"
            :class="getPositionClass((index + slideIndex) % totalCount)" @click="handleBookClick(book.isbn13, index)">
            <img :src="book.bookImageURL" alt="도서 이미지">
          </div>
        </div>

        <div class="slide-controller-container">
          <div class="slide-button left" @click="handlePrevButton">
            <img src="/icons/arrow-left.svg" alt="arrow-left">
          </div>

          <div class="slide-count-container">
            <p>{{ currentIndex + 1 }} / {{ totalCount }}</p>
          </div>

          <div class="slide-button right" @click="handleNextButton">
            <img src="/icons/arrow-right.svg" alt="arrow-right">
          </div>
        </div>
      </div>

      <div class="book-info-container">
        <p class="book-title">{{ currentMainBook?.bookname }}</p>
        <p class="book-author book-info-item">{{ currentMainBook?.authors }}</p>
        <p class="book-publisher book-info-item">{{ currentMainBook?.publisher }}</p>
        <p class="book-subject book-info-item">{{ currentMainBook?.class_nm }}</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { getBookDetail } from '@/apis/books';
import type { BookDetail, ReaderRecBook } from '@/types/libraryType';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps<{
  readerRecBooksDatas: ReaderRecBook[];
}>();

const router = useRouter();

// 현재 메인 도서
const currentMainBook = computed(() => {
  return bookDetails.value[currentIndex.value];
})

const bookDetails = ref<BookDetail[]>([]);

const totalCount = computed(() => {
  return bookDetails.value.length;
})

const handleBookClick = (isbn13: string, index: number) => {
  if (index === currentIndex.value) {
    router.push(`/book/detail/${isbn13}`);
  }
}

const fetchBookDetail = async () => {
  try {
    const bookPromiss = props.readerRecBooksDatas.map(book =>
      getBookDetail(+book.book.isbn13)
    )

    const response = await Promise.all(bookPromiss);
    bookDetails.value = response.map(result => result.detailData);
  } catch (error) {
    console.error('책 상세 정보 가져오기 실패', error);
    throw error;
  }
}

// 책 상세 정보 가져오기
watchEffect(() => {
  fetchBookDetail();
})

const slideIndex = ref(0);

const getPositionClass = (index: number) => {
  const positions = ['center', 'left', 'far-left', 'further-left', null, null, null, 'further-right', 'far-right', 'right'];
  return positions[index];
}

const currentIndex = ref(0);

const handlePrevButton = () => {
  if (slideIndex.value === bookDetails.value.length - 1) {
    slideIndex.value = 0;
  } else {
    slideIndex.value++;
  }

  if (currentIndex.value === 0) {
    currentIndex.value = bookDetails.value.length - 1;
  } else {
    currentIndex.value--;
  }
}

const handleNextButton = () => {
  if (slideIndex.value === 0) {
    slideIndex.value = bookDetails.value.length - 1;
  } else {
    slideIndex.value--;
  }

  if (currentIndex.value === bookDetails.value.length - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
}
</script>

<style lang="scss" scoped>
.reader-recommend-slider-container {
  width: 100%;
  padding: 40px 0;

  h1 {
    font-size: $text-title-200;
    margin-bottom: 45px;
  }

  .slide-container {
    position: relative;
    width: 100%;
    height: 400px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .book-description-container {
      width: 20%;
      padding-bottom: 50px;
      overflow: hidden;
      height: 191px;

      p {
        font-size: 16px;
        color: #61605D;
      }
    }

    .book-info-container {
      width: 20%;
      padding-bottom: 50px;

      .book-title {
        font-size: 18px;
        color: #61605D;
        margin-bottom: 18px;
      }

      .book-info-item {
        font-size: 14px;
        color: #61605D;
        margin-bottom: 6px;
      }
    }

    .slide-wrapper {
      width: 60%;
      height: 100%;
      position: relative;

      .slide-items {
        width: 100%;
        height: 100%;
        position: relative;

        .slide-item {
          position: absolute;
          width: 218px;
          height: 326px;
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            border-radius: 8px;
            width: 100%;
            height: 100%;
            border: 1px solid #61605D;
          }

          &.far-left {
            right: -4%; // left를 right로 변경
            transform: translateX(-10%) scale(0.6); // 10%를 -10%로 변경
            z-index: 1;
            opacity: 0.6;
          }

          &.left {
            right: 12%; // left를 right로 변경
            transform: translateX(0) scale(0.8);
            z-index: 2;
            opacity: 0.8;
          }

          &.center {
            left: 50%; // 중앙은 그대로
            transform: translateX(-50%) scale(1);
            z-index: 3;
            cursor: pointer;
          }

          &.right {
            left: 12%; // right를 left로 변경
            transform: translateX(0) scale(0.8);
            z-index: 2;
            opacity: 0.8;
          }

          &.far-right {
            left: -4%; // right를 left로 변경
            transform: translateX(10%) scale(0.6); // -10%를 10%로 변경
            z-index: 1;
            opacity: 0.6;
          }

          &.further-right {
            left: 2%; // right를 left로 변경
            transform: translateX(0) scale(0.5);
            z-index: 0;
            opacity: 0;
          }

          &.further-left {
            right: 2%; // left를 right로 변경
            transform: translateX(0) scale(0.5);
            z-index: 0;
            opacity: 0;
          }

          &:not(.center):not(.left):not(.right):not(.far-left):not(.far-right):not(.further-right):not(.further-left) {
            opacity: 0;
          }
        }
      }

      .slide-controller-container {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;

        .slide-button {
          width: 30px;
          height: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          z-index: 10;
          opacity: 0.5;

          &:hover {
            opacity: 1;
          }
        }

        .slide-count-container {
          color: #aaa;

          p {
            font-size: 16px;
            color: #61605D;
            min-width: 60px;
            text-align: center;
          }
        }

      }
    }
  }
}
</style>
