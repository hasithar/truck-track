<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mapConfig } from '@/config';
import { computed, ref } from 'vue';
import RouteMap from '@/components/maps/RouteMap.vue';
import { useRoute } from 'vue-router';
import { useVehicleStore } from '@/store';
import { storeToRefs } from 'pinia';
import HistoryTimeline from '@/components/pages/route/HistoryTimeline.vue';

// Map state
const zoom = ref(12);
const center = ref<[number, number]>([mapConfig.base.lat, mapConfig.base.lng]);

// Get vehicle id
const route = useRoute();
const vehicleId = route.params.id;

// Setup store
const vehicleStore = useVehicleStore();
const { vehicles } = storeToRefs(vehicleStore);

// Get vehicle from store
const vehicle = computed(() => vehicles.value.find((v) => v.id === vehicleId));
</script>

<template>
  <div class="flex gap-4 h-full px-4 pb-4">
    <div class="w-1/4">
      <div>
        <Card class="w-[350px]">
          <CardHeader>
            <CardTitle>Create project {{ vehicleId }}</CardTitle>
            <CardDescription
              >Deploy your new project in one-click.</CardDescription
            >
          </CardHeader>
          <CardContent> </CardContent>
          <CardFooter class="flex justify-between px-6 pb-6">
            <Button variant="outline"> Cancel </Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>

      <div v-if="vehicle?.history.length" class="mt-4">
        <HistoryTimeline :history="vehicle?.history" />
      </div>
    </div>

    <div class="w-3/4">
      <div class="w-full h-full rounded-2xl overflow-hidden">
        <RouteMap
          :zoom="zoom"
          :center="center"
          :vehicle="vehicle"
          v-if="vehicle"
        />
        <div v-else>Vehicle not Found</div>
      </div>
    </div>
  </div>
</template>
