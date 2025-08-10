<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { computed, watch, ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import { mapConfig } from '@/config';
import type { Location, Vehicle } from '@/types';

const { zoom, center, vehicles, bounds } = defineProps<{
  zoom: number;
  center: [number, number];
  vehicles: Vehicle[];
  bounds: Location[];
}>();

// Get map
const mapRef = ref<InstanceType<typeof LMap> | null>(null);

// Create latlng pairs from bounds
const boundsArray = computed(() =>
  bounds.map((loc) => [loc.lat, loc.lng] as [number, number])
);

// Watch for changes in boudsArray
watch(
  boundsArray,
  (newBounds) => {
    if (mapRef.value && newBounds.length > 0) {
      mapRef.value.leafletObject?.fitBounds(newBounds);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="w-full h-full">
    <LMap
      style="height: 100%; width: 100%"
      ref="mapRef"
      :zoom="zoom"
      :center="center"
      :bounds="boundsArray"
      :use-global-leaflet="false"
    >
      <LTileLayer
        :url="mapConfig.tileUrl"
        :attribution="mapConfig.attribution"
      />
      <LMarker
        v-for="v in vehicles"
        :key="v.id"
        :lat-lng="[v.location.lat, v.location.lng]"
      >
        <LPopup>
          <strong>{{ v.name }}</strong>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<!-- <script lang="ts" setup>
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import { mapConfig } from '@/config';
import type { Location } from '@/types';

const { zoom, center, vehicles } = defineProps<{
  zoom: number;
  center: [number, number];
  // bounds: Location[];
  vehicles: any[];
}>();
console.log('🚀 ~ vehicles:', vehicles);

// const boundsArray = bounds.map((loc) => [loc.lat, loc.lng] as [number, number]);
</script>

<template>
  <div class="w-full h-full">
    <LMap
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
    >
      <LTileLayer
        :url="mapConfig.tileUrl"
        :attribution="mapConfig.attribution"
      />
      <LMarker
        v-for="v in vehicles"
        :key="v.id"
        :lat-lng="[v.location.lat, v.location.lng]"
      >
        <LPopup>
          <strong>{{ v.name }}</strong>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<style scoped></style> -->
