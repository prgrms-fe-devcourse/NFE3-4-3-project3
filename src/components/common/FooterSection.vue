<script setup lang="ts"></script>

<template>
  <div class="footer">
    <!-- <div class="footer-inner-layout"> -->
    <div class="footer-title">
      <div class="footer-inner-layout">ArtLibro</div>
    </div>
    <div class="footer-container">
      <div class="footer-inner-layout">
        <div class="footer-group">
          <div>대표전화</div>
          <div>1533-1886</div>
        </div>
        <div class="footer-group">
          <div>단체명</div>
          <div>4 김 1 홍</div>
        </div>
        <div class="footer-group">
          <div>개인정보 처리 방침</div>
          <div>이메일 주소 무단 수집 거부</div>
          <div>이용약관</div>
          <div>원격지원</div>
          <div>찾아오는 길</div>
          <div>서비스별 연락처</div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: auto;
  background-color: #202020;
}
.footer-inner-layout {
  width: 1246px;
  margin: 0 auto;
}

.footer-title {
  font-size: 20px;
  font-family: SF_HambakSnow;
  color: white;
  padding: 16px 0 16px 30px;
  display: flex;
  align-items: center;
  border-bottom: #818181 solid 1px;
}

.footer-group {
  display: flex;
  align-items: center;
  gap: 30px;
  color: #b9b9b9;
  margin-bottom: 10px;
}

.footer-container {
  display: grid;
  gap: 8px;
  padding: 22px 0 24px 25px;
}
</style>
