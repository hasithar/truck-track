<script setup lang="ts">
import type { Vehicle } from '@/types';
import type { LatLngExpression } from 'leaflet';
import { computed } from 'vue';
import L from 'leaflet';
import { LMarker, LPopup, LTooltip } from '@vue-leaflet/vue-leaflet';
import Button from '../ui/button/Button.vue';
import { RouterLink } from 'vue-router';

const { vehicle } = defineProps<{
  vehicle: Vehicle;
}>();

// Validate vehicle has location
const hasValidLocation = computed(() => {
  return vehicle?.location?.lat && vehicle?.location?.lng;
});

const position = computed(() => {
  if (!hasValidLocation.value) {
    console.warn('Vehicle missing location data:', vehicle);
    return [0, 0]; // return default
  }
  return [vehicle.location.lat, vehicle.location.lng] as LatLngExpression;
});

// Custom div icon
const vehicleMarker = computed(() => {
  return L.divIcon({
    html: `
      <div class="bg-transparent">
        <div class="relative flex flex-col justify-center items-center">
          <div class="bg-white w-[32px] h-[32px] rounded-full p-0.5 border-2 border-black">
            <img 
              src="/icons/${vehicle.type}.png" 
              alt="${vehicle.type || 'vehicle'}"
              class="w-full h-full"
              onerror="this.src='/icons/default.png'"
              loading="lazy"
            />
          </div>
          <div class="w-[1px] h-[20px] bg-slate-500"></div>
          <div class="w-[7px] h-[7px] bg-slate-600 rounded-full"></div>
        </div>
      </div>
    `,
    className: 'vehicle-marker',
    // iconSize: [60, 80],
    // iconAnchor: [30, 80],
    // popupAnchor: [0, -80],
  });
});
</script>

<template>
  <LMarker v-if="hasValidLocation" :lat-lng="position" :icon="vehicleMarker">
    <LTooltip
      :sticky="true"
      :interactive="true"
      direction="top"
      :offset="[0, -10]"
    >
      {{ vehicle.name || vehicle.id || 'Unknown Vehicle' }}
    </LTooltip>

    <LPopup>
      <div class="popup-content">
        <strong>{{ vehicle.name || 'Unknown Vehicle' }}</strong
        ><br />
        <span v-if="vehicle.type">Type: {{ vehicle.type }}</span
        ><br />
        <span v-if="vehicle.status">Status: {{ vehicle.status }}</span
        ><br />
        <span v-if="vehicle.plate">Plate: {{ vehicle.plate }}</span
        ><br />
        <RouterLink :to="`/route/${vehicle.id}`">
          <Button class="mt-2">View History</Button>
        </RouterLink>
      </div>
    </LPopup>
  </LMarker>
</template>

<style scoped></style>
