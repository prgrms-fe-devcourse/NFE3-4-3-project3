<script setup lang="ts">
import { getAwardPerformances } from '@/apis/kopis.ts'
import { ref, onMounted } from 'vue'
import type { AwardCardProps } from '@/types/peformance.types.ts'
import AwardCardActive from '@/components/HomeView/AwardCardActive.vue'
import AwardCardDefault from '@/components/HomeView/AwardCardDefault.vue'

const currentIndex = ref<number>(0)
const awardPerformances = ref<AwardCardProps[]>([])

const handleRight = () => {
  if (currentIndex.value < awardPerformances.value.length - 1) {
    currentIndex.value += 1
  }
}

const handleLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1
  }
}

onMounted(async () => {
  try {
    const data = await getAwardPerformances()
    awardPerformances.value = data.dbs.db
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
})
</script>

<template>
  <div class="award-layout">
    <div class="title">수상을 받은 공연을 만나보세요</div>
    <div class="content">
      <button @click="handleLeft" class="button">
        <img src="/icons/arrow-left.svg" height="15" width="15" alt="arrow-left" />
      </button>
      <div class="award">
        <transition-group name="slide" tag="div" class="award-card-group">
          <div v-for="(item, index) in awardPerformances" :key="index" class="award-card">
            <AwardCardActive
              v-show="index === currentIndex"
              :index="index"
              :prfnm="item.prfnm"
              :poster="item.poster"
              :mt20id="item.mt20id"
              :fcltynm="item.fcltynm"
            />
            <AwardCardDefault
              v-show="index !== currentIndex"
              :index="index"
              :prfnm="item.prfnm"
              :poster="item.poster"
              :mt20id="item.mt20id"
              :fcltynm="item.fcltynm"
            />
          </div>
        </transition-group>
      </div>
      <button @click="handleRight" class="button">
        <img src="/icons/arrow-right.svg" height="15" width="15" alt="arrow-right" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.award-layout {
  width: 1246px;
  height: 352px;
  margin-top: 50px;
  margin-bottom: 80px;
}

.title {
  color: $text-color-500;
  font-size: 24px;
  font-weight: bold;
}

.content {
  display: flex;
  width: 1246px;
  justify-content: space-between;
  align-items: center;
}

.award {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 30px;
  width: 1150px;
  height: 323px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid $text-color-200;
  background-color: transparent;
  cursor: pointer;
}

.award-card-group {
  display: flex;
  gap: 20px;
  transition: all 0.3s ease;
  align-items: flex-end;
}

.award-card {
  flex-shrink: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
