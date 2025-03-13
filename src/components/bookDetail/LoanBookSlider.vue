<template>
  <div class="loan-book-slider-container">
    <h1>함께 대출된 관련 도서</h1>

    <div class="slider-container">
      <div class="slide-left">
        <div class="slider-item-main">
          <Transition name="slide" mode="out-in">
            <div class="animation-container" :key="currentIndex">
              <div class="slider-item-main-info">
                <h4 class="slider-item-main-title">{{ currentMainBook?.bookname }}</h4>
                <p class="slider-item-main-category">{{ currentMainBook?.class_nm }}</p>

                <div class="slider-item-main-text">
                  <div class="slider-item-main-text-item"><span class="slider-item-main-text-label">지은이</span><span>{{
                    currentMainBook?.authors }}</span></div>
                  <div class="slider-item-main-text-item"><span class="slider-item-main-text-label">출판사</span><span>{{
                    currentMainBook?.publisher }}</span></div>
                  <div class="slider-item-main-text-item"><span class="slider-item-main-text-label">출판년도</span><span>{{
                    currentMainBook?.publication_year }}</span></div>
                </div>
              </div>
              <div class="slider-item-main-image" @click="bookClickHandler(currentMainBook?.isbn13)">
                <img v-if="currentMainBook?.bookImageURL" :src="currentMainBook?.bookImageURL" alt="dummy-book">
                <img v-else src="/images/no-image.png" alt="이미지 준비중입니다.">
              </div>

            </div>
          </Transition>

          <div class="slider-button-container">
            <div class="slider-left-button button" @click="handleLeftButton">
              <img src="/icons/arrow-left.svg" alt="arrow-left">
            </div>
            <div class="slide-count-container">
              {{ currentIndex + 1 }} / {{ totalCount }}
            </div>
            <div class="slider-right-button button" @click="handleRightButton">
              <img src="/icons/arrow-right.svg" alt="arrow-right">
            </div>
          </div>

        </div>
      </div>
      <Transition name="fade" mode="out-in">
        <div class="slide-right" :key="currentIndex">
          <div class="slide-sub-img-container">
            <div class="slide-sub-img-item" @click="subBookClickHandler(1)">
              <img v-if="subBooks[0]?.bookImageURL" :src="subBooks[0]?.bookImageURL" alt="dummy-book">
              <img v-else src="/images/no-image.png" alt="이미지 준비중입니다.">
            </div>
            <div class="slide-sub-img-item" @click="subBookClickHandler(2)">
              <img v-if="subBooks[1]?.bookImageURL" :src="subBooks[1]?.bookImageURL" alt="dummy-book">
              <img v-else src="/images/no-image.png" alt="이미지 준비중입니다.">
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBookDetail } from '@/apis/books';
import type { BookDetail, CoLoanBook } from '@/types/libraryType';
import type { PropType } from 'vue';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  coLoanBooksDatas: {
    type: Array as PropType<CoLoanBook[]>,
    required: true,
  },
})

const router = useRouter();

// 책 상세 정보 클릭 시 라우터 이동
const bookClickHandler = (isbn13: string) => {
  router.push(`/book/detail/${+isbn13}`);
}

// 서브 도서 클릭시 현재 도서 인덱스 변경
const subBookClickHandler = (index: number) => {
  currentIndex.value = (currentIndex.value + index) % bookDetails.value.length;
}

// 책 상세 정보 배열
const bookDetails = ref<BookDetail[]>([]);

// 책 상세 정보 가져오기
const fetchBookDetail = async () => {
  try {
    const bookPromiss = props.coLoanBooksDatas.map(book =>
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

// 슬라이드 관련 함수
const currentIndex = ref(0);

// 총 도서 수
const totalCount = computed(() => {
  return bookDetails.value.length;
})

// 현재 메인 도서
const currentMainBook = computed(() => {
  return bookDetails.value[currentIndex.value];
})

// 현재 서브 도서
const subBooks = computed(() => {
  const nextIndex = [
    (currentIndex.value + 1) % bookDetails.value.length,
    (currentIndex.value + 2) % bookDetails.value.length,
  ]

  return [bookDetails.value[nextIndex[0]], bookDetails.value[nextIndex[1]]];
})

// 왼쪽 버튼 클릭 시
const handleLeftButton = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = bookDetails.value.length - 1;
  } else {
    currentIndex.value--;
  }
}

// 오른쪽 버튼 클릭 시
const handleRightButton = () => {
  if (currentIndex.value === bookDetails.value.length - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
}

</script>

<style lang="scss" scoped>
.loan-book-slider-container {
  width: 100%;
  margin: 155px auto 60px;

  h1 {
    font-size: $text-title-200;
    margin-bottom: 45px;
  }

  .slider-container {
    width: 100%;
    height: 400px;
    display: flex;

    .slide-left {
      width: 60%;
      height: 100%;

      .slider-item-main {
        padding: 50px;
        position: relative;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: rgb(115 115 115 / 48%) 7px 9px 13px 0px, rgb(255 255 255 / 80%) -6px -2px 16px 0px;

        .animation-container {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          .slider-item-main-info {

            .slider-item-main-title {
              font-size: 20px;
              margin-bottom: 8px;
            }

            .slider-item-main-category {
              font-size: 13px;
              color: #ABA9A5;
              margin-bottom: 36px;
            }

            .slider-item-main-text {
              display: flex;
              flex-direction: column;
              gap: 20px;

              .slider-item-main-text-item {
                display: flex;
                align-items: center;

                .slider-item-main-text-label {
                  font-size: 18px;
                  color: $secondary-color-purple;
                  margin-right: 34px;
                }

                .slider-item-main-text-value {
                  font-size: 14px;
                }
              }
            }
          }

          .slider-item-main-image {
            width: 191px;
            height: 288px;
            cursor: pointer;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .slider-button-container {
          position: absolute;
          bottom: 2rem;
          right: 40%;
          display: flex;
          align-items: center;
          gap: 10px;

          .slide-count-container {
            min-width: 50px;
            text-align: center;
          }

          .button {
            width: 20px;
            height: 20px;
            cursor: pointer;

            img {
              width: 100%;
              height: 100%;
              opacity: .4;
            }

            &:hover {
              img {
                opacity: 1;
              }
            }
          }
        }
      }
    }

    .slide-right {
      width: 40%;
      height: 100%;

      .slide-sub-img-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .slide-sub-img-item {
          width: 162px;
          height: 225px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
