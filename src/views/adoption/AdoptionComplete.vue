<script setup lang="ts">
import CampaignCard from '@/components/common/CampaignCard.vue';
import PATH from '@/constants/path';
</script>

<template>
  <div class="wrapper">
    <div class="d-flex content-wrapper justify-content-between">
      <div class="d-flex flex-column justify-content-end">
        <div class="title">
          소중한 인연을 <br />
          맺어주셔서 감사합니다.
        </div>
        <span class="subTitle">
          입양 신청서를 소중히 접수하였습니다. 당신의 따뜻한 마음이 담긴 신청서를 바탕으로, <br />
          반려동물과의 아름다운 인연이 순조롭게 이어질 수 있도록 신속히 절차를 진행하겠습니다.
          <br />
          조금만 기다려 주세요. 당신의 선택을 진심으로 응원합니다.
        </span>
      </div>
      <img src="/PNG-Image/images/hand-pow.png" alt="hand and pow image" class="hand-img" />
    </div>
    <div class="d-flex justify-content-between content-wrapper">
      <div>
        <RouterLink :to="PATH.root" class="link-main"> 메인 페이지로 이동</RouterLink>
      </div>
      <div class="d-flex justify-content-end gap-1">
        <CampaignCard
          width="300px"
          height="200px"
          imageUrl="/PNG-Image/images/adoption-after.png"
          :linkTo="PATH.community"
        >
          <template #subTitle>
            <span class="img-badge"> 입양 후 이야기</span>
          </template>
        </CampaignCard>
        <CampaignCard
          width="300px"
          height="200px"
          imageUrl="/PNG-Image/images/adoption-friends.png"
          :linkTo="PATH.adoptionSearch"
        >
          <template #subTitle>
            <div class="d-flex justify-content-end w-100">
              <span class="img-badge"> 사랑을 기다리는 친구들</span>
            </div>
          </template>
        </CampaignCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  background-color: var(--secondary-green);

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.content-wrapper {
  width: 60vw;
}

.title {
  font-family: 'Paperlogy';
  font-size: 64px;
  font-weight: 700;
  color: var(--gray-1);
  line-height: 110%;
  margin-bottom: 40px;
}

.subTitle {
  color: var(--gray-1);
  display: block;
  margin-bottom: 30px;
  font-size: 18px;
}

.hand-img {
  height: 500px;
  width: 250px;
}

.link-main {
  margin-top: 20px;
  display: block;
  width: 240px;
  height: 50px;
  background-color: var(--gray-1);
  color: var(--primary-green);
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
}

span.img-badge {
  display: flex;
  font-family: 'Pretendard';
  font-weight: 600;
  padding: 7px 30px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 30px;
  background: rgba(78, 78, 78, 0.5);
}
</style>
