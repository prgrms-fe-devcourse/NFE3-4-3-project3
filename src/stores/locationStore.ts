import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { LocationInfo } from '../types/location.types.ts'

export const useLocationStore = defineStore('location', () => {
  const userLocation = reactive<LocationInfo>({latitude : null, longitude: null});

  function setUserLocation(location: LocationInfo) {
    userLocation.latitude = location.latitude;
    userLocation.longitude = location.longitude;
  }

  return { userLocation, setUserLocation }
})
