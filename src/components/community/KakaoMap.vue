<script setup lang="js">
import { ref, onMounted } from 'vue';

const mapContainer = ref(null);
const doroRef = defineModel();
onMounted(() => {
  loadKakaoMap(mapContainer.value);
});

const loadKakaoMap = (container) => {
  if (window.kakao && window.kakao.maps) {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
        level: 3, // 지도 확대 레벨
        maxLevel: 5, // 지도 축소 제한 레벨
      };
      const mapInstance = new window.kakao.maps.Map(container, options); // 지도 생성

      // HTML5의 geolocation으로 사용할 수 있는지 확인
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 사용자의 현재 위치 확인
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude; // 위도
          let lon = position.coords.longitude; // 경도
          let locPosition = new window.kakao.maps.LatLng(lat, lon); // 지도의 중앙 위치를 geolocation으로 얻어온 좌표로 지정할 것.

          mapInstance.setCenter(locPosition); // 지도 중심좌표를 접속위치로 변경
        });
      }

      let geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체

      let marker = new window.kakao.maps.Marker(); // 지도에 표시될 마커 생성

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      window.kakao.maps.event.addListener(mapInstance, 'click', function (mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            let detailAddr = result[0].road_address ? result[0].road_address.address_name : '';
            let doroAddr = result[0].address.address_name; // 해당 정보를 폼으로 던져줘야 함

            doroRef.value = doroAddr;
            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(mapInstance);
          }
        });
      });
    });
  }
};
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 100%"></div>
</template>
