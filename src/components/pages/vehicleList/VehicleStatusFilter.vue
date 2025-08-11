<script setup lang="ts">
import Label from '@/components/ui/label/Label.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useVehicleStore } from '@/store';
import { Funnel } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

// Setup store
const vehicleStore = useVehicleStore();
const { selectedStatus } = storeToRefs(vehicleStore);
</script>

<template>
  <div class="flex gap-2">
    <Label class="text-sm whitespace-nowrap hidden xl:inline-flex"
      ><Funnel class="size-4 text-muted-foreground" /> Filter by Status</Label
    >
    <Select v-model="selectedStatus">
      <SelectTrigger class="">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Vehicle Status</SelectLabel>
          <SelectItem value="all"> All Statuses </SelectItem>
          <SelectItem value="online"> Online </SelectItem>
          <SelectItem value="offline"> Offline </SelectItem>
          <SelectItem value="alert"> Alert </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
