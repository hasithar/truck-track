<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TruckElectric, Info, Ban, CheckCircle2 } from 'lucide-vue-next';
import { useVehicleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import type { VehicleStatus } from '@/types';

const { status, title, subtitle } = defineProps<{
  status?: VehicleStatus;
  title: string;
  subtitle: string;
}>();

// Setup store
const vehicleStore = useVehicleStore();
const { vehicles } = storeToRefs(vehicleStore);

// Map vehicle status to data
const statusComponent = computed(() => {
  switch (status?.toLowerCase()) {
    case 'online':
      return {
        icon: CheckCircle2,
        background: 'bg-green-600',
        foreground: 'text-white',
        gradient: 'from-green-100 via-green-500 to-green-300',
        count: vehicles.value.filter((item) => item.status === 'online').length,
      };
    case 'offline':
      return {
        icon: Ban,
        background: 'bg-slate-600',
        foreground: 'text-white',
        gradient: 'from-slate-100 via-slate-400 to-slate-200',
        count: vehicles.value.filter((item) => item.status === 'offline')
          .length,
      };
    case 'alert':
      return {
        icon: Info,
        background: 'bg-red-600',
        foreground: 'text-white',
        gradient: 'from-red-100 via-red-600 to-red-400',
        count: vehicles.value.filter((item) => item.status === 'alert').length,
      };
    default:
      return {
        icon: TruckElectric,
        background: 'bg-green-500',
        foreground: 'text-slate-500',
        gradient: 'from-white via-slate-300 to-white',
        count: vehicles.value.length,
      };
  }
});
</script>

<template>
  <Card class="w-full">
    <div class="flex flex-col xl:flex-row justify-between relative w-full">
      <CardHeader class="w-full">
        <CardTitle
          ><span class="text-xl xl:text-3xl font-bold">
            {{ statusComponent.count ?? 0 }}</span
          >
          {{ title }}</CardTitle
        >
        <CardDescription class="hidden xl:block">{{
          subtitle
        }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          class="absolute top-0 right-4 xl:right-0 xl:relative flex aspect-square size-8 xl:size-16 items-center justify-center shadow-slate-300 bg-gradient-to-br text-teal-600 p-1 rounded-lg shadow-[0_4px_12px_rgba(94,234,212,0.4)] border-1 border-slate-100"
          :class="statusComponent.gradient"
        >
          <component
            :is="statusComponent.icon"
            class="size-4 xl:size-8"
            :class="statusComponent.foreground"
          />
        </div>
      </CardContent>
      <p class="block xl:hidden text-gray-600 text-xs py-0 px-6 mt-2 w-full">
        {{ subtitle }}
      </p>
    </div>
  </Card>
</template>
