<script setup lang="ts"></script>

<template>
  <div class="banner-wrapper">
    <div class="banner-cards">
      <div class="banner-card">
        <img src="/PNG-Image/images/alert-bell.png" alert="bell image" />
        <p>
          유기동물들에게 <br />
          관심을 기울여주세요
        </p>
      </div>
      <div class="banner-card">
        <p>
          절반이 넘는 유기동물들이 <br />
          <em class="green">보호소</em>에서 <em class="red">사망</em>하고 있습니다.
        </p>
      </div>
    </div>
    <div class="banner-graph">
      <!-- TRY : Chart.js 로 구현해보기 -->
      <img src="/PNG-Image/images/adoption-chart.png" alert="adoption data graph" />
    </div>
  </div>
</template>

<style scoped>
.banner-wrapper {
  display: flex;
  flex-direction: row;
  gap: 62px;
  margin: 48px 0px;
}

.banner-graph {
  width: 681px;
  height: 473px;
}

.banner-cards {
  display: flex;
  flex-direction: column;
  gap: 57px;
}

.banner-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 164px;
  border-radius: 34px;
  gap: 30px;
  background-color: var(--gray-2);
}

.banner-card img {
  width: 87px;
  height: 87px;
  border-radius: 100%;
}

.banner-card p {
  display: block;
  text-align: center;
  font-size: 26px;
  font-family: 'Paperlogy';
  font-weight: 600;
  margin: 0;
}

em.green {
  font-style: normal;
  color: var(--primary-green);
}

em.red {
  font-style: normal;
  color: var(--primary-red);
}
</style>
