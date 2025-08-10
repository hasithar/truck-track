<script lang="ts" setup>
import { Check, Info, Ban, CheckCircle2 } from 'lucide-vue-next';
import type { VehicleStatus } from '@/types';
import { computed } from 'vue';

const { status } = defineProps<{
  status: VehicleStatus;
}>();

// Map vehicle status
const statusComponent = computed(() => {
  switch (status.toLowerCase()) {
    case 'online':
      return {
        icon: CheckCircle2,
        background: 'bg-green-600',
        foreground: 'text-green-700',
      };
    case 'offline':
      return {
        icon: Ban,
        background: 'bg-slate-600',
        foreground: 'text-slate-700',
      };
    case 'alert':
      return {
        icon: Info,
        background: 'bg-red-600',
        foreground: 'text-red-700',
      };
    default:
      return {
        icon: Check,
        background: 'bg-green-500',
        foreground: 'text-green-500',
      };
  }
});
</script>

<template>
  <span
    class="flex gap-1 items-center pl-0.5 text-white px-2 py-1 rounded-xl shadow-2xl"
    :class="statusComponent.background"
  >
    <span
      class="rounded-full p-0.5 bg-white"
      :class="statusComponent.foreground"
    >
      <component :is="statusComponent.icon" class="size-3" />
    </span>

    <span class="uppercase text-[0.65rem] font-semibold">{{ status }}</span>
  </span>
</template>

<style></style>
