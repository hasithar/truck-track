<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { DateString, Location, LocationEntry } from '@/types';
import LocationTag from './LocationTag.vue';
import { getAverageSpeed, getTotalDistance } from '@/utils';
import { computed } from 'vue';

const { location, history, lastUpdated } = defineProps<{
  location: Location;
  history: LocationEntry[];
  lastUpdated: DateString;
}>();

// Get total distance
const totalDistance = computed(() => getTotalDistance(history, location));

// Get average speed
const averageSpeed = computed(() =>
  getAverageSpeed(history, location, lastUpdated)
);
</script>

<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Route Summary</CardTitle>
      <CardDescription>Summary of the route progression</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex justify-between relative">
        <LocationTag
          label="Current Location"
          :lat="location.lat"
          :lng="location.lng"
        />

        <div
          class="absolute top-[23px] z-1 border border-dashed border-gray-400 h-px inset-0 left-10 right-10"
        ></div>
      </div>

      <div>
        <span>Total Distance Traveled:</span><span>{{ totalDistance }}</span>
      </div>

      <div>
        <span>Average Speed:</span><span>{{ averageSpeed }}</span>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
