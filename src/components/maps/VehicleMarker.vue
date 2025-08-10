<script setup lang="ts">
import { LMarker, LPopup, LTooltip, LIcon } from '@vue-leaflet/vue-leaflet';
import type { Vehicle } from '@/types';
import Button from '../ui/button/Button.vue';

const { vehicle } = defineProps<{
  vehicle: Vehicle;
}>();

const icon = {
  iconUrl: `/icons/${vehicle.type}.png`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
};
</script>

<template>
  <LMarker :lat-lng="[vehicle.location.lat, vehicle.location.lng]">
    <LIcon
      :icon-url="icon.iconUrl"
      :icon-size="icon.iconSize"
      class-name="bg-white rounded-full p-0.5! shadow-2xl border-1 border-gray-500 marker-icon"
    />

    <LTooltip
      :sticky="true"
      :interactive="true"
      direction="top"
      offset="[0, -10]"
    >
      {{ vehicle.name }}
    </LTooltip>

    <LPopup>
      <strong>{{ vehicle.name }}</strong
      ><br />
      Type: {{ vehicle.type }}<br />
      Status: {{ vehicle.status }}
      <Button>View History</Button>
    </LPopup>
  </LMarker>
</template>
