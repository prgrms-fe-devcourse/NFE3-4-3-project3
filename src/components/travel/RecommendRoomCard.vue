<script setup lang="ts">
import MOCK_RECOMMENDED_ROOM from '@/constants/mock/recommendedRoom.ts';

const rest = MOCK_RECOMMENDED_ROOM.roommaxcount - MOCK_RECOMMENDED_ROOM.roombasecount;
</script>

<template>
  <div class="d-flex gap-3 card-wrapper">
    <img :src="MOCK_RECOMMENDED_ROOM.imageURL" alt="recommended room image" />
    <div class="room-info d-flex flex-column justify-content-between">
      <div class="d-flex flex-column gap-1">
        <div class="room-info-title">{{ MOCK_RECOMMENDED_ROOM.roomtitle }}</div>
        <div>
          <span class="room-info-property"> 객실 인원 : </span>
          <span>
            <i
              v-for="i of MOCK_RECOMMENDED_ROOM.roombasecount"
              :key="i"
              class="bi bi-person red"
            ></i>
            <i v-for="i of rest" :key="i" class="bi bi-person"></i>
          </span>
        </div>
        <div>
          <span class="room-info-property"> 객실 크기 : </span>
          <span>
            {{ MOCK_RECOMMENDED_ROOM.roomsize }}평 ({{ MOCK_RECOMMENDED_ROOM.roomsize2 }}m2)</span
          >
        </div>
        <div>
          <span class="room-info-property"> 객실 수 : </span>
          <span> {{ MOCK_RECOMMENDED_ROOM.roomcount }} </span>
        </div>
        <div class="room-info-notice text-gray-7">
          {{ MOCK_RECOMMENDED_ROOM.roomintro }}
        </div>
        <div>
          <i v-for="i of 7" :key="i" class="bi bi-house"></i>
        </div>
      </div>
      <div class="room-info-price">{{ MOCK_RECOMMENDED_ROOM.roomoffseasonminfee1 }} / 박</div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  width: 1280px;
  height: 400px;
}

.room-info {
  font-size: 20px;
}

.room-info-property {
  font-weight: 600;
}

.room-info-notice {
  font-size: 16px;
}

.room-info-title {
  font-size: 36px;
  font-family: 'Paperlogy';
  font-weight: 700;
}

.room-info-price {
  color: var(--primary-red);
  font-size: 36px;
  font-weight: 600;
  text-align: end;
}
.bi-person.red {
  color: var(--primary-red);
}
</style>
