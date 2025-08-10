<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { computed, watch, ref } from 'vue';
import { LMap, LTileLayer, LPolyline } from '@vue-leaflet/vue-leaflet';
import { mapConfig } from '@/config';
import type { Location, Vehicle } from '@/types';
import VehicleMarker from './VehicleMarker.vue';

// const { zoom, center, vehicles, bounds } = defineProps<{
//   zoom: number;
//   center: [number, number];
//   vehicles: Vehicle[];
//   bounds: Location[];
// }>();
const { zoom, center } = defineProps<{
  zoom: number;
  center: [number, number];
}>();

// Get map
const mapRef = ref<InstanceType<typeof LMap> | null>(null);

// Create latlng pairs from bounds
// const boundsArray = computed(() =>
//   bounds.map((loc) => [loc.lat, loc.lng] as [number, number])
// );

// Watch for changes in boudsArray
// watch(
//   boundsArray,
//   (newBounds) => {
//     if (mapRef.value && newBounds.length > 0) {
//       mapRef.value.leafletObject?.fitBounds(newBounds);
//     }
//   },
//   { immediate: true }
// );

const history = [
  { lat: 24.4539, lng: 54.3773 },
  { lat: 24.4545, lng: 54.3785 },
  { lat: 24.455, lng: 54.3795 },
  { lat: 24.456, lng: 54.379 },
  { lat: 24.4575, lng: 54.378 },
  { lat: 24.458, lng: 54.377 },
  { lat: 24.459, lng: 54.3765 },
  { lat: 24.46, lng: 54.3775 },
  { lat: 24.461, lng: 54.3785 },
  { lat: 24.462, lng: 54.3795 },
];
</script>

<template>
  <div class="w-full h-full">
    <LMap
      style="height: 100%; width: 100%"
      ref="mapRef"
      :zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
    >
      <!-- <LMap
      style="height: 100%; width: 100%"
      ref="mapRef"
      :zoom="zoom"
      :center="center"
      :bounds="boundsArray"
      :use-global-leaflet="false"
    > -->
      <LTileLayer
        :url="mapConfig.tileUrl"
        :attribution="mapConfig.attribution"
      />
      <LPolyline
        v-if="history && history.length > 1"
        :lat-lngs="history.map((loc) => [loc.lat, loc.lng])"
        :color="'blue'"
        :weight="4"
        :opacity="0.7"
      />

      <!-- <VehicleMarker v-for="v in vehicles" :key="v.id" :vehicle="v" /> -->
    </LMap>
  </div>
</template>
