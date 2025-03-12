<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import TextBlock, { type TextBlockDescriptor } from '@/components/common/TextBlock.vue';
import { Line } from 'vue-chartjs';
import { RouterLink } from 'vue-router';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  type ChartData,
  type ChartOptions,
  type Plugin as ChartPlugin,
} from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const abandonedText: TextBlockDescriptor[] = [
  {
    content: '2023 전국 유기동물 수',
    color: '#8D827A',
    bgColor: '',
    font: 'Pretendard',
    size: '20px',
    weight: 600,
    margin: 'mt-3 mb-1',
  },
  {
    content: '113,072마리',
    color: 'var(--primary-red)',
    bgColor: '',
    font: 'Pretendard',
    size: '40px',
    weight: 700,
    margin: 'mb-3',
  },
  {
    content: '1개 보호소당 관리해야하는 개체 수',
    color: '#8D827A',
    bgColor: '',
    font: 'Pretendard',
    size: '20px',
    weight: 600,
    margin: 'mb-1',
  },
  {
    content: '474마리',
    color: 'var(--primary-red)',
    bgColor: '',
    font: 'Pretendard',
    size: '40px',
    weight: 700,
    margin: 'mb-3',
  },
  {
    content: '2023 동물 보호센터 운영 비용',
    color: '#8D827A',
    bgColor: '',
    font: 'Pretendard',
    size: '20px',
    weight: 600,
    margin: 'mb-1',
  },
  {
    content: '373.9억원',
    color: 'var(--primary-red)',
    bgColor: '',
    font: 'Pretendard',
    size: '40px',
    weight: 700,
    margin: 'mb-5',
  },
];

const chartData: ChartData<'line'> = {
  labels: [2019, 2020, 2021, 2022, 2023],
  datasets: [
    {
      data: [46.6, 45.9, 41.5, 43.7, 45.6],
      label: '사망',
      borderColor: '#f3723f',
      backgroundColor: '#f3723f',
      tension: 0.2,
    },
    {
      data: [26.4, 29.6, 32.1, 27.5, 24.2],
      label: '입양',
      borderColor: '#5faa68',
      backgroundColor: '#5faa68',
      tension: 0.2,
    },
  ],
};

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
  },
  scales: {
    y: {
      offset: true,
      title: {
        text: '비율(%)',
        font: { family: 'Pretendard', size: 16, weight: 'bold' },
      },
      min: 20,
      max: 50,
      ticks: {
        display: true,
        font: { family: 'Pretendard', size: 16, weight: 'bold' },
      },
    },
    x: {
      offset: true,
      title: {
        text: '연도',
        font: { family: 'Pretendard', size: 16, weight: 'bold' },
      },
      ticks: {
        font: { family: 'Pretendard', size: 16, weight: 'bold' },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        font: { family: 'Pretendard', size: 14, weight: 'bold' },
      },
    },
  },
};

const chartPlugins: ChartPlugin<'line'>[] = [
  {
    id: 'ValueAbovePoint',
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      ctx.save();
      chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
        ctx.font = 'bold 24px Pretendard';
        ctx.textAlign = 'center';
        ctx.fillStyle = data.datasets[0].borderColor?.toString() ?? 'black';
        ctx.fillText(
          data.datasets[0].data[index]?.toString() ?? '?',
          datapoint.x,
          datapoint.y - 20,
        );
      });
      chart.getDatasetMeta(1).data.forEach((datapoint, index) => {
        ctx.font = 'bold 24px Pretendard';
        ctx.textAlign = 'center';
        ctx.fillStyle = data.datasets[1].borderColor?.toString() ?? 'black';
        ctx.fillText(
          data.datasets[1].data[index]?.toString() ?? '?',
          datapoint.x,
          datapoint.y - 20,
        );
      });
    },
  },
];

const chartVisible = ref(false);
const chartContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chartVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 },
  );

  if (chartContainer.value) observer.observe(chartContainer.value);
});

onUnmounted(() => {
  // 관찰자 해제
});
</script>

<template>
  <div class="container mb-5 p-3 d-flex gap-1" style="height: 575px; width: 67%; min-width: 1280px">
    <div style="width: 60%; height: 100%" ref="chartContainer">
      <!-- 차트는 뷰포트에 들어왔을 때만 렌더링 -->
      <Line v-if="chartVisible" :options="chartOptions" :data="chartData" :plugins="chartPlugins" />
    </div>
    <div
      class="gap-2"
      style="width: 40%; height: 100%; display: flex; flex-direction: column; text-align: right"
    >
      <TextBlock
        v-for="(item, index) in abandonedText"
        :key="'abandoned_' + index"
        :text-block="item"
      />
      <button
        type="button"
        class="btn rounded-5 align-self-end bg-primary-red adoption-btn"
        style="width: 200px; height: 62.5px"
      >
        <div class="d-flex justify-content-center position-relative">
          <RouterLink class="adoption-link" to="adoption/search" style="text-decoration: none">
            <div
              class="adoption-link-text"
              :style="{ fontFamily: 'Pretendard', fontSize: '20px', fontWeight: 500, color: '#ffffff' }"
            >
              입양 공고 보기
            </div>
          </RouterLink>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.adoption-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.adoption-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

</style>