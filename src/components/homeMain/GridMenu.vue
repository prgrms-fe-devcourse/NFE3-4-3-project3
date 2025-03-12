<script setup lang="ts">
import GalleryItem from '@/components/homeMain/atoms/GalleryItem.vue';
import TextBlock, { type TextBlockDescriptor } from '@/components/common/TextBlock.vue';

const gridMenuText: TextBlockDescriptor[] = [
  {
    content: '변화를 위한 ',
    bgColor: '',
    color: 'var(--gray-10)',
    font: 'Pretendard',
    size: '32px',
    weight: 700,
    margin: 'my-0',
  },
  {
    content: '첫걸음',
    bgColor: '',
    color: 'var(--primary-red)',
    font: 'Pretendard',
    size: '32px',
    weight: 700,
    margin: 'my-0',
  },
  {
    content: ', 당신의 참여로 시작됩니다!',
    bgColor: '',
    color: 'var(--gray-10)',
    font: 'Pretendard',
    size: '32px',
    weight: 700,
    margin: 'my-0',
  },
  {
    content: '소중한 생명을 지키는 캠패인에 동참하고, 희망을 선물해주세요.',
    bgColor: '',
    color: 'var(--gray-6)',
    font: 'Pretendard',
    size: '24px',
    weight: 500,
    margin: 'mb-3',
  },
];
const gridImages = ['/GridImage3.png', '/GridImage2.jpg', '/GridImage0.png', '/GridImage1.jpg'];
const gridItemTexts: TextBlockDescriptor[][][] = [
  [
    [
      {
        content: 'Toss',
        bgColor: '',
        color: '#2C63F6',
        font: 'Pretendard',
        size: '32px',
        weight: 700,
        margin: 'm-0',
      },
      {
        content: 'Bank',
        bgColor: '',
        color: 'var(--gray-1)',
        font: 'Pretendard',
        size: '32px',
        weight: 700,
        margin: 'm-0',
      },
    ],
    [
      {
        content: '함께 겨울나기 캠패인',
        bgColor: '',
        color: 'var(--gray-1)',
        font: 'Pretendard',
        size: '20px',
        weight: 600,
        margin: 'm-0',
      },
    ],
  ],
  [
    [
      {
        content: '동물보호단체',
        bgColor: '',
        color: 'var(--gray-1)',
        font: 'Pretendard',
        size: '32px',
        weight: 500,
        margin: 'm-0',
      },
    ],
    [
      {
        content: '라이프',
        bgColor: '',
        color: 'var(--primary-green)',
        font: 'Pretendard',
        size: '32px',
        weight: 800,
        margin: 'm-0',
      },
    ],
  ],
  [
    [
      {
        content: '작은 손길, 큰 기쁨',
        bgColor: '',
        color: 'var(--gray-1)',
        font: 'Pretendard',
        size: '20px',
        weight: 500,
        margin: 'm-0',
      },
    ],
    [
      {
        content: '처음이라면, 이웃과 함께',
        bgColor: '',
        color: 'var(--gray-1)',
        font: 'Pretendard',
        size: '20px',
        weight: 500,
        margin: 'm-0',
      },
    ],
    [
      {
        content: '현재 모집중인 돌봄 봉사',
        bgColor: '',
        color: 'var(--gray-1)',
        font: 'Pretendard',
        size: '32px',
        weight: 700,
        margin: 'm-0',
      },
    ],
  ],
  [
    [
      {
        content: '상시모집',
        bgColor: '',
        color: 'var(--gray-6)',
        font: 'Pretendard',
        size: '18px',
        weight: 500,
        margin: 'm-0',
      },
    ],
    [
      {
        content: '새로운 집까지 안전하게,',
        bgColor: '',
        color: 'var(--gray-1)',
        font: 'Pretendard',
        size: '32px',
        weight: 700,
        margin: 'm-0',
      },
    ],
    [
      {
        content: '해외 이동 봉사',
        bgColor: '',
        color: 'var(--primary-blue)',
        font: 'Pretendard',
        size: '32px',
        weight: 700,
        margin: 'm-0',
      },
    ],
  ],
];
</script>

<template>
  <div
    class="container mb-5 d-flex flex-column"
    style="height: 750px; min-width: 960px; margin-top: 90px; margin-bottom: 120px"
  >
    <div class="d-flex">
      <TextBlock
        v-for="(item, index) in gridMenuText.slice(0, 3)"
        :key="'grid-menu-' + index"
        :text-block="item"
      />
    </div>
    <TextBlock :text-block="gridMenuText[3]" />
    <!-- 그리드 -->
    <div class="d-flex gap-3" style="flex: 1 1 auto">
      <div class="d-flex flex-column gap-3" style="width: 67%">
        <div class="d-flex gap-3" style="height: 50%">
          <div class="grid-menu-item rounded-4 overflow-hidden" style="width: 50%">
            <GalleryItem
              :bg-image="gridImages[0]"
              :title="gridItemTexts[0]"
              link-to="www.tossbank.com/articles/32383"
            />
          </div>
          <div class="grid-menu-item rounded-4 overflow-hidden" style="width: 50%">
            <GalleryItem
              :bg-image="gridImages[1]"
              :title="gridItemTexts[1]"
              link-to="www.savelife.or.kr/"
            />
          </div>
        </div>
        <div class="grid-menu-item rounded-4 overflow-hidden" style="height: 50%">
          <GalleryItem
            :bg-image="gridImages[2]"
            :title="gridItemTexts[2]"
            link-to="www.1365.go.kr/vols/search.do?collection=ALL&startCount=0&sort=RANK&cateSearch=all&range=A&startDate=&endDate=&searchField=ALL&reQuery=&realQuery=%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC&query=%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC%EB%B3%B5%EC%A7%80"
          />
        </div>
      </div>
      <div class="grid-menu-item rounded-4 overflow-hidden" style="width: 33%">
        <GalleryItem
          :bg-image="gridImages[3]"
          :title="gridItemTexts[3]"
          link-to="www.ekara.org/parttake/abroad"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-menu-item {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  overflow: hidden;
}
.grid-menu-item:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
</style>
