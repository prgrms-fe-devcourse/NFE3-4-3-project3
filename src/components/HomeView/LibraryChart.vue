<script setup lang="ts">
interface AnalysisData {
  result : {
    age : string;
    quantity : string;
    rate : string;
  }
}

const props = defineProps<{
  regionName : string,
  regionData : AnalysisData[],
  detailRegionName : string,
  detailRegionData : AnalysisData[],
}>();

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const quantityData = [];

for (const item of props.regionData) {
  quantityData.push(item.result.quantity);
}

const data = {
  labels: [
    '전체',
    '영유아',
    '유아',
    '초등',
    '청소년',
    '20대',
    '30대',
    '40대',
    '50대',
    '60대 이상',
  ],
  datasets: [
    {
      label: `독서량`,
      backgroundColor: '#979efd',
      data: quantityData
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="library-chart">
    <div class="chart-title">{{ regionName }} 연령별 독서량</div>
    <Bar :data="data" :options="options" />
  </div>
</template>

<style scoped lang="scss">
.library-chart {
  display: grid;
  place-items: center;
  width: 480px;
  height: 280px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  padding: 20px 20px 36px 20px;
}

.chart-title {
  font-size: 24px;
  font-weight: bold;
}
</style>
