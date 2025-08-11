<script lang="ts" setup>
import { MapPin } from 'lucide-vue-next';

const { label, lat, lng } = defineProps<{
  label: string;
  lat: number;
  lng: number;
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-1 text-center relative z-5">
    <MapPin class="size-4" />
    <span class="aspect-square size-2 block bg-slate-500 rounded-full"></span>
    <span class="text-xs"
      ><em class="block font-bold mb-1">{{ label }}</em
      >Lat:
      {{ lat.toFixed(8) }}
      <br />
      Lng: {{ lng.toFixed(8) }}
    </span>
  </div>
</template>

<style scoped></style>
