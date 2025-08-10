<script setup lang="ts">
import type { Vehicle } from '@/types';
import type { LatLngExpression } from 'leaflet';
import { DateTime } from 'luxon';
import { computed } from 'vue';
import L from 'leaflet';
import { LMarker, LPopup, LTooltip } from '@vue-leaflet/vue-leaflet';
import Button from '@/components/ui/button/Button.vue';
import { RouterLink } from 'vue-router';
import VehicleIcon from '@/components/common/VehicleIcon.vue';
import VehicleStatusTag from '@/components/common/VehicleStatusTag.vue';

const { vehicle, showHistoryLink } = defineProps<{
  vehicle: Vehicle;
  showHistoryLink: boolean;
}>();

// Validate vehicle has location
const hasValidLocation = computed(() => {
  return vehicle?.location?.lat && vehicle?.location?.lng;
});

const position = computed(() => {
  if (!hasValidLocation.value) {
    console.log('Vehicle missing location data:', vehicle);
    return [0, 0] as LatLngExpression; // return default
  }
  return [vehicle.location.lat, vehicle.location.lng] as LatLngExpression;
});

// Map status colors
const statusStyles = computed(() => {
  switch (vehicle.status.toLowerCase()) {
    case 'online':
      return {
        classes: 'border-green-700',
      };
    case 'offline':
      return {
        classes: 'border-slate-400',
      };
    case 'alert':
      return {
        classes: 'border-red-700',
      };
    default:
      return {
        classes: 'border-green-500',
      };
  }
});

// Custom div icon
const vehicleMarker = computed(() => {
  return L.divIcon({
    html: `
      <div class="bg-transparent">
        <div class="relative flex flex-col justify-center items-center">
          <div class="bg-white w-[32px] h-[32px] rounded-full p-0.5 border-2 ${
            statusStyles.value.classes
          }">
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
    iconSize: [32, 60],
    iconAnchor: [16, 60],
    popupAnchor: [0, -60],
  });
});
</script>

<template>
  <LMarker v-if="hasValidLocation" :lat-lng="position" :icon="vehicleMarker">
    <LTooltip
      :sticky="true"
      :interactive="true"
      :offset="[0, -10]"
      direction="top"
    >
      {{ vehicle.name || vehicle.id || 'Unknown Vehicle' }}
    </LTooltip>

    <LPopup>
      <div class="flex flex-col items-center">
        <h6
          class="text-center font-bold bg-slate-200 w-full px-1 py-1.5 rounded text-sm mb-2"
        >
          {{ vehicle.name || 'Unknown Vehicle' }}

          <span class="text-xs block mt-0.5" v-if="vehicle.plate"
            >Plate: {{ vehicle.plate }}</span
          >
        </h6>

        <div
          v-if="vehicle.type"
          class="capitalize w-fit flex gap-2 items-center mb-2"
        >
          <span class="uppercase text-xs font-semibold">Type: </span>
          <VehicleIcon :type="vehicle.type" :show-name="true" />
        </div>

        <div v-if="vehicle.status" class="flex flex-col items-center mb-2 mt-2">
          <VehicleStatusTag :status="vehicle.status" />
          <span
            class="text-xs block mt-2 text-center"
            v-if="vehicle.lastUpdated"
            >Last updated on: <br />{{
              DateTime.fromISO(vehicle.lastUpdated).toFormat(
                'dd LLL yyyy, hh:mm:ss a'
              )
            }}
          </span>
        </div>

        <RouterLink :to="`/route/${vehicle.id}`" v-if="showHistoryLink">
          <Button class="mt-2 w-full cursor-pointer hover:bg-gray-700" size="sm"
            >View History</Button
          >
        </RouterLink>
      </div>
    </LPopup>
  </LMarker>
</template>

<style scoped></style>
