<script setup lang="js">
//<a href="https://www.flaticon.com/free-icons/paws" title="paws icons">Paws icons created by Icons_Field - Flaticon</a>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  travelData : {
    type: Object,
    default: ()=>{}
  },
  currentFocused : {
    type: Object,
    default: ()=>{}
  },
  currentFocusedDay : {
    type: Number,
    default: -1
  }
});
const mapContainer = ref(null);
let mapInstance = undefined;
const prevLines = [];
const prevMarkers = [];

watch(
  ()=>props,
  ()=>{
    const destArr = props.travelData.destData[props.currentFocusedDay];
    if(destArr.length <= 0) return;
    if(mapInstance !== undefined){
      if(props.currentFocused.contentid === '')
        mapInstance.panTo(new window.kakao.maps.LatLng(destArr[0].mapy, destArr[0].mapx));
      else
        mapInstance.panTo(new window.kakao.maps.LatLng(props.currentFocused.mapy, props.currentFocused.mapx));

      const linePath = [];
      const markers = destArr.map((e)=>{
        const latlng = new window.kakao.maps.LatLng(e.mapy, e.mapx);
        linePath.push(latlng);
        return new window.kakao.maps.Marker({ position: latlng});
      });

      while(prevLines.length > 0) prevLines.pop().setMap(null);
      while(prevMarkers.length > 0) prevMarkers.pop().setMap(null);
      const polyLine = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight:5,
        strokeColor: '#f3723f',
        strokeOpacity: 0.75,
        strokeStyle: 'dashed',
      });
      prevLines.push(polyLine);
      polyLine.setMap(mapInstance);

      for(let i = 0; i < markers.length; i++){
        markers[i].setImage(
          new window.kakao.maps.MarkerImage('/travelPlanner/paws.png',
            new window.kakao.maps.Size(35, 35),
            new window.kakao.maps.Point(17.5, 17.5)
          )
        );
        prevMarkers.push(markers[i]);
        markers[i].setMap(mapInstance);
      }
    }
  }, {deep:true}
);
onMounted(() => {
  const defaultPosition = {lat: 37.484681, lng: 127.010839};
  const defaultOptions = { center: new window.kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng), level: 3, maxLevel : 5 };
  loadKakaoMap(mapContainer.value, [defaultPosition], defaultOptions);
});
const loadKakaoMap = (container, positions, options) => {
  if (window.kakao && window.kakao.maps) {
    window.kakao.maps.load(()=>{
      const markers = positions.map((e)=>{
        return (new window.kakao.maps.Marker({ position: new window.kakao.maps.LatLng(e.lat, e.lng)}));
      });
      mapInstance = new window.kakao.maps.Map(container, options);
      for(let i = 0; i < markers.length; i++){
        markers[i].setImage(
          new window.kakao.maps.MarkerImage('/travelPlanner/paws.png',
            new window.kakao.maps.Size(31, 35),
            new window.kakao.maps.Point(13, 34)
          )
        );
        markers[i].setMap(mapInstance);
      }
    });
  }
};
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 100%"></div>
</template>
