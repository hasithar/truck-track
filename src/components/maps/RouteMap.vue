<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { computed, watch, ref } from 'vue';
import { LMap, LTileLayer, LPolyline } from '@vue-leaflet/vue-leaflet';
import { mapConfig } from '@/config';
import type { Vehicle } from '@/types';
import VehicleMarker from './mapui/VehicleMarker.vue';

const { zoom, center, vehicle } = defineProps<{
  zoom: number;
  center: [number, number];
  vehicle: Vehicle;
}>();

// Get map
const mapRef = ref<InstanceType<typeof LMap> | null>(null);

// Create latlng pairs from bounds
const pointsArray = computed(() =>
  vehicle.history.map(
    (entry) => [entry.location.lat, entry.location.lng] as [number, number]
  )
);

// Watch for changes in pointsArray - disabled to stop interfierring with zoom/pan
// watch(
//   pointsArray,
//   (newBounds) => {
//     if (mapRef.value && newBounds.length > 0) {
//       mapRef.value.leafletObject?.fitBounds(newBounds);
//     }
//   },
//   { immediate: true }
// );
</script>

<template>
  <div class="w-full h-full">
    <LMap
      style="height: 100%; width: 100%"
      ref="mapRef"
      :zoom="zoom"
      :center="
        vehicle.location ? [vehicle.location.lat, vehicle.location.lng] : center
      "
      :use-global-leaflet="false"
    >
      <LTileLayer
        :url="mapConfig.tileUrl"
        :attribution="mapConfig.attribution"
      />
      <LPolyline
        v-if="pointsArray && pointsArray.length > 1"
        :lat-lngs="[...pointsArray, vehicle.location]"
        :color="'blue'"
        :weight="4"
        :opacity="0.7"
      />

      <VehicleMarker :vehicle="vehicle" :show-history-link="false" />
    </LMap>
  </div>
</template>
