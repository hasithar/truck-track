<script setup lang="ts">
import { ref, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { useVehicleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { Search } from 'lucide-vue-next';

// Local inpt state
const localSearch = ref('');

// Setup store
const vehicleStore = useVehicleStore();
const { searchQuery } = storeToRefs(vehicleStore);

// Debounce timer
let debounceTimeout: number | undefined;

// Watch local input and debounce
watch(localSearch, (newVal) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = window.setTimeout(() => {
    searchQuery.value = newVal.trim();
  }, 300);
});

// Initialize local input from store
localSearch.value = searchQuery.value;
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      id="search"
      type="text"
      placeholder="Search by Name / Plate"
      class="pl-10"
      v-model="localSearch"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
    >
      <Search class="size-4 text-muted-foreground" />
    </span>
  </div>
</template>
