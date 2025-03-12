<script setup lang="ts">
import CampaignCard from '@/components/common/CampaignCard.vue';
import TitleText from '@/components/common/TitleText.vue';
import CAMPAIGN_LINKS from '@/constants/campaigns';

const CARD_WIDTH = '100%';
const CARD_HEIGHT = '300px';
</script>

<template>
  <div class="wrapper d-flex flex-column flex-lg-row gap-3 justify-content-center pb-3">
    <div>
      <div class="title d-flex gap-1 align-items-center">
        <TitleText size="32px" weight="600" color="gray-10"> # 진행중인 </TitleText>
        <TitleText size="32px" weight="600" highlight-color="blue"> 반려동물 캠페인 </TitleText>
      </div>
      <div Class="d-flex gap-3 bg-red w-100">
        <CampaignCard
          :width="CARD_WIDTH"
          :height="CARD_HEIGHT"
          image-url="/Campaign/campaign-tossbank.png"
          :linkTo="CAMPAIGN_LINKS.toss"
          :hasFilter="true"
        >
          <template #title>
            <span><em :style="{ fontStyle: 'normal', color: '#2C63F6' }">Toss</em> bank</span>
          </template>
          <template #subTitle>
            <span>함께 겨울나기 캠페인</span>
          </template>
        </CampaignCard>
        <CampaignCard
          :width="CARD_WIDTH"
          :height="CARD_HEIGHT"
          image-url="/Campaign/campagin-game.png"
          :linkTo="CAMPAIGN_LINKS.togetheron"
          :hasFilter="true"
        >
          <template #title>
            <span>함께 On, 댕댕이게임</span>
          </template>
          <template #subTitle>
            <span>강릉 바우길 투어</span>
          </template>
        </CampaignCard>
      </div>
    </div>
    <div>
      <div class="title d-flex gap-1 align-items-center">
        <TitleText size="32px" weight="600" color="gray-10"> #모집중인 </TitleText>
        <TitleText size="32px" weight="600" highlight-color="green"> 돌봄 봉사</TitleText>
      </div>
      <div Class="d-flex gap-3 bg-red ">
        <CampaignCard
          :width="CARD_WIDTH"
          :height="CARD_HEIGHT"
          image-url="/Campaign/volunteer1.png"
          :linkTo="CAMPAIGN_LINKS.luppyworld"
        />

        <CampaignCard
          :width="CARD_WIDTH"
          :height="CARD_HEIGHT"
          image-url="/Campaign/volunteer2.png"
          :linkTo="CAMPAIGN_LINKS.balunteer"
        />
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  max-width: 100vw;
  padding: 20px 40px;
  /* height: 400px; */
  background-color: var(--gray-3);
}

.campaign-category-section {
  width: 45vw;
}
</style>
