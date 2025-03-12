<script setup lang="js">
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  lat: {
    type: Number,
    default: null,
  },
  lng: {
    type: Number,
    default: null,
  },
});
const mapContainer = ref(null);
onMounted(() => {
  loadKakaoMap(mapContainer.value);
});

// props가 변경될 때마다 지도를 다시 로드하는 watch 설정
watch(
  () => [props.lat, props.lng],
  () => {
    loadKakaoMap(mapContainer.value);
  },
);

const loadKakaoMap = (container) => {
  if (window.kakao && window.kakao.maps) {
    const positionX = props.lat === null ? 33.450701 : props.lat;
    const positionY = props.lng === null ? 126.570667 : props.lng;
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(positionX, positionY), // 지도 중심 좌표
        level: 3, // 지도 확대 레벨
        maxLevel: 5, // 지도 축소 제한 레벨
      };

      const mapInstance = new window.kakao.maps.Map(container, options); // 지도 생성
      let markerPosition = new window.kakao.maps.LatLng(positionX, positionY);

      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(mapInstance);
    });
  }
};
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 100%"></div>
</template>
