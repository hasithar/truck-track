<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from 'vue';
import { useVehicleStore } from '@/store';
import { storeToRefs } from 'pinia';
import LocationMap from '@/components/maps/LocationMap.vue';
import { mapConfig } from '@/config';

// Map state
const zoom = ref(12);
const center = ref<[number, number]>([mapConfig.base.lat, mapConfig.base.lng]);

// Setup store
const vehicleStore = useVehicleStore();
const { vehicles } = storeToRefs(vehicleStore);

// Generate mock vehicle data before rendering
onBeforeMount(() => {
  if (!vehicles.value.length) {
    vehicleStore.generateMockData(20);
  }
});

// Vehicle coords for bounds
const bounds = computed(() => {
  if (!vehicles.value.length) return null;
  return vehicles.value.map((v) => v.location);
});

// Update bounds on data change
watch(
  bounds,
  (newBounds) => {
    if (!newBounds) return;
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-6">
      <div class="aspect-square rounded-xl bg-slate-400" />
      <div class="aspect-square rounded-xl bg-slate-400" />
      <div class="aspect-square rounded-xl bg-slate-400" />
      <div class="aspect-square rounded-xl bg-slate-400" />
      <div class="aspect-square rounded-xl bg-slate-400" />
      <div class="aspect-square rounded-xl bg-slate-400" />
    </div>

    <div class="w-full h-[500px]">
      <LocationMap
        :zoom="zoom"
        :center="center"
        :vehicles="vehicles"
        :bounds="bounds"
      />
    </div>

    <div class="min-h-[100vh] flex-1 rounded-xl bg-slate-400 md:min-h-min" />
  </div>
</template>
