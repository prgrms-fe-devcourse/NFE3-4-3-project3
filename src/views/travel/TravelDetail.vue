<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import PhotoGrid from '@/components/travel/travelDetail/PhotoGrid.vue';
import InfoCard from '@/components/travel/travelDetail/TravelInfoCard.vue';

import { FreeChannelId } from '@/constants/communityConsts';

import { type DetailCard } from '@/components/travel/travelDetail/TravelInfoCard.vue';
import { type PetTravelDetail } from '@/components/travel/travelDetail/withPetsInfo.vue';
import { type RoomItem } from '@/components/travel/travelDetail/AccommodationCard.vue';
import { type DetailInfoData } from '@/components/travel/travelDetail/DetailInfoComponent.vue';

import WithPetsInfo from '@/components/travel/travelDetail/withPetsInfo.vue';
import AccommodationCard from '@/components/travel/travelDetail/AccommodationCard.vue';
import CommunityFreePosts from '@/components/travel/travelDetail/CommunityFreePosts.vue';
import DetailInfoComponent from '@/components/travel/travelDetail/DetailInfoComponent.vue';
//API 함수들
import { fetchTourImageData } from '@/apis/tour/detailImage';
import { fetchPetTourData } from '@/apis/tour/detailPetTour';
import { fetchDetailInfoData } from '@/apis/tour/detailInfo';
import { detailIntro } from '@/apis/tour/detailIntro';
import { detailCommon } from '@/apis/tour/detailCommon';
import { type devUser } from '@/types/devcourse/devUser';

import { getAllSearchQuery } from '@/apis/devcourse/Search/getAllSearchQuery';
import type { devPost } from '@/types/devcourse/devPost';
import { getUser } from '@/apis/devcourse/User/getUser';

const imageData = ref<string[]>([]);
const postsData = ref<devPost[]>([]);
const usersData = ref<devUser[]>([]);

const detailRoomData = ref<RoomItem[]>([]);
const detailInfoData = ref<DetailInfoData[]>([]);
const detailCommonData = ref<DetailCard | null>(null);
const detailIntroData = ref<DetailCard | null>(null);
const detailMergedData = ref<DetailCard | null>(null);
const detailPetTourData = ref<PetTravelDetail | null>(null);

const route = useRoute();
const contentIdRaw = route.params.contentId;
const contentTypeIdRaw = route.query.contenttypeid;

//  슬러그를 배열에서 string으로 반환하는 함수
let contentId: string;
if (Array.isArray(contentIdRaw)) {
  contentId = contentIdRaw[0];
} else if (typeof contentIdRaw === 'string') {
  contentId = contentIdRaw;
} else {
  console.warn('ContentId가 없습니다.');
}

//쿼리 스트링으로 변환
let contentTypeId: string;
if (Array.isArray(contentTypeIdRaw)) {
  contentTypeId = contentTypeIdRaw[0] as string;
} else if (typeof contentTypeIdRaw === 'string') {
  contentTypeId = contentTypeIdRaw;
} else {
  console.warn('ContentId가 없습니다.');
}

onMounted(async () => {
  if (!contentId) return;
  try {
    //detailImage 호출 => 배열로 반환
    const imageResult = await fetchTourImageData({ contentId: contentId });
    if (Array.isArray(imageResult)) {
      imageData.value = imageResult.map((item: { originimgurl: string }) => item.originimgurl);
    } else {
      console.warn('API 응답 결과가 배열이 아닙니다.', imageData.value);
    }
    //detailCommon 호출
    const CommonData = await detailCommon({ contentId, contentTypeId });
    detailCommonData.value = CommonData[0];

    //detailInfo 호출
    const fetchedDetailInfoData = await fetchDetailInfoData({ contentId, contentTypeId });
    detailInfoData.value = fetchedDetailInfoData;
    detailRoomData.value = fetchedDetailInfoData;

    //detailIntro 호출
    const fetchedDetailIntroData = await detailIntro({ contentId, contentTypeId });
    detailIntroData.value = fetchedDetailIntroData[0];

    //detailPetTour 호출
    const fetchedDetailPetTour = await fetchPetTourData({ contentId });
    detailPetTourData.value = fetchedDetailPetTour[0];

    //Common,Info,Intro를 InfoCard컴포넌트 프로퍼티에 넘기기위해 하나의 객체에 저장
    if (detailCommonData.value && detailIntroData.value) {
      detailMergedData.value = {
        ...detailCommonData.value,
        ...detailIntroData.value,
      };
    }

    //자유게시판 포스트 글 불러오기기
    if(detailCommonData.value){
      const posts = (await getAllSearchQuery({searchQuery: detailCommonData.value.title})).resultsPosts.filter((e)=>{
        return (e.channel as unknown as string)===FreeChannelId}
      );
      console.log('posts', posts);
      const users : devUser[] = [];
      for(let i = 0; i < posts.length; i++){
        const authorid : string = posts[i].author as unknown as string;
        users.push((await getUser({id : authorid})).user);
      }
      postsData.value = posts;
      usersData.value = users;
    }

  } catch (error) {
    console.error('상세 데이터를 불러오는 중 오류 발생: ', error);
  }
});
</script>

<template>
  <div class="overflow-hidden">
    <div class="container w-100">
      <div v-if="detailCommonData && imageData" class="my-5">
        <PhotoGrid :firstimage="detailCommonData.firstimage" :images="imageData" />
      </div>
      <div v-if="detailMergedData" class="mb-3">
        <InfoCard :detail="detailMergedData" />
      </div>
      <div v-if="detailPetTourData">
        <WithPetsInfo :detail="detailPetTourData" />
      </div>
      <div v-if="contentTypeId === '32'" class="my-5">
        <AccommodationCard :rooms="detailRoomData" />
      </div>
      <div class="container my-5">
        <DetailInfoComponent :data="detailInfoData" />
      </div>
      <div class="container mb-5">
        <CommunityFreePosts :data="postsData" :users="usersData" :title="detailCommonData ? detailCommonData.title : '자유게시판'" />
      </div>
    </div>
  </div>
</template>
