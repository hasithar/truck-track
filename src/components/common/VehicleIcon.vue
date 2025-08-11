<script lang="ts" setup>
import { Truck, Car, Bus, Ambulance, SquareDashed } from 'lucide-vue-next';
import type { VehicleType } from '@/types';
import { computed } from 'vue';

const { type, showName } = defineProps<{
  type: VehicleType;
  showName: boolean;
}>();

// Map vehicle type to icon
const IconComponent = computed(() => {
  switch (type.toLowerCase()) {
    case 'truck':
      return Truck;
    case 'car':
      return Car;
    case 'bus':
      return Bus;
    case 'van':
      return Ambulance;
    default:
      return SquareDashed;
  }
});
</script>

<template>
  <span class="flex gap-2 items-center pl-0.5">
    <component :is="IconComponent" class="size-4" />
    <span class="capitalize" v-if="showName && type">{{ type }}</span>
  </span>
</template>

<style></style>
