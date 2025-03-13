<script setup lang="ts">
import type { LibraryInfoResult } from '@/types/library/library.types.ts'

type LibraryInfoProps = Pick<LibraryInfoResult, 'libName' | 'address' | 'tel' | 'operatingTime' | 'closed'>
defineProps<LibraryInfoProps>()
</script>

<template>
  <div class="library-info">
    <div class="title">가까운 도서관</div>
    <div class="info">
      <div class="content-wrapper">
        <img src="/icons/home-library/library.svg" alt="library-icon" height="24px" width="24px" />
        <div>이름 : {{ libName }}</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/map.svg" alt="map-icon" height="24px" width="24px" />
        <div>주소 : {{ address}}</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/phone.svg" alt="phone-icon" height="24px" width="24px" />
        <div>전화번호 : {{ tel }}</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/calendar-days.svg" alt="calendar-icon" height="24px" width="24px" />
        <div>휴관일 : {{ closed }}</div>
      </div>
      <div class="content-wrapper">
        <img src="/icons/home-library/clock-4.svg" alt="clock-icon" height="24px" width="24px" />
        <div>운영시간 : {{ operatingTime }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.library-info {
  width : 370px;
  height: 280px;
  background-color: #3F5892;
  border-radius: 10px;
  padding: 20px;
  display: grid;
}

.title {
  color : #FFFFFF;
  font-size: 24px;
  font-weight: bold;
  height: 30px;
}

.info {
  display: grid;
  color : #FFFFFF;
  font-size: 16px;
  gap : 8px;
  margin-bottom : 12px;
}

.content-wrapper {
  display: flex;
  align-items: center;
  gap : 6px;
}
</style>
