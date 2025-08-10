<script setup lang="ts">
import { ref, watch, computed, onBeforeMount, onMounted } from 'vue';
import { useVehicleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { Card, CardContent } from '@/components/ui/card';
import LocationMap from '@/components/maps/LocationMap.vue';
import { mapConfig } from '@/config';
import DashboardCard from '@/components/pages/dashboard/DasboardCard.vue';

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
  if (!vehicles.value.length) return [];
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

// Start movement simu;ation
onMounted(() => {
  vehicleStore.simulateMovement();
});
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
    <div class="grid auto-rows-min gap-4 md:grid-cols-4 mb-2">
      <DashboardCard
        title="Vehicles"
        subtitle="Total fleet currently under monitoring"
      />
      <DashboardCard
        title="Online"
        subtitle="Actively transmitting location data"
        status="online"
      />
      <DashboardCard
        title="Offline"
        subtitle="Disconnected or inactive at the moment"
        status="offline"
      />
      <DashboardCard
        title="Alert"
        subtitle="Vehicles with active warnings or issues"
        status="alert"
      />
    </div>

    <div class="w-full h-full flex-1">
      <Card class="w-full h-full p-0 overflow-hidden">
        <CardContent class="h-full w-full p-0">
          <LocationMap
            :zoom="zoom"
            :center="center"
            :vehicles="vehicles"
            :bounds="bounds"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
