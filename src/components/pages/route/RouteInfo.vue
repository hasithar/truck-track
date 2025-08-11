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
import { Route } from 'lucide-vue-next';

const { location, history, lastUpdated } = defineProps<{
  location: Location;
  history: LocationEntry[];
  lastUpdated: DateString;
}>();

// Get total distance
const totalDistance = computed(() => getTotalDistance(history, location));

// Get average speed
const averageSpeed = computed(() => {
  const speed = getAverageSpeed(history, location, lastUpdated);

  // Round up speed value
  return Math.ceil(speed * 100) / 100;
});
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Route Summary</CardTitle>
      <CardDescription>Summary of the route progression</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex justify-between relative">
        <LocationTag
          v-if="history.length > 0"
          label="Origin"
          :lat="history[0].location.lat"
          :lng="history[0].location.lng"
        />
        <LocationTag
          label="Current Location"
          :lat="location.lat"
          :lng="location.lng"
        />
        <div
          class="absolute top-[23px] z-1 border border-dashed border-gray-400 h-px inset-0 left-10 right-10"
        ></div>
      </div>

      <div class="mt-6 flex flex-col gap-2">
        <div>
          <span
            class="text-sm font-semibold mr-2 inline-flex items-center gap-2"
            ><Route class="size-3" /> Total Distance Traveled:</span
          ><span class="text-sm px-2 py-0.5 bg-slate-200 text-slate-800 rounded"
            >{{ totalDistance }} Km</span
          >
        </div>

        <div>
          <span
            class="text-sm font-semibold mr-2 inline-flex items-center gap-2"
            ><Route class="size-3" /> Average Speed:</span
          ><span class="text-sm px-2 py-0.5 bg-slate-200 text-slate-800 rounded"
            >{{ averageSpeed }} Km/h</span
          >
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
