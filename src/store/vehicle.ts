import { ref } from 'vue';
import { defineStore } from 'pinia';
import { generateVehicles } from '@/utils';
import type { Vehicle } from '@/types';

// Limiting the history entries - Added this to prevent performanc issues
const HISTORY_LIMIT = 100;

export const useVehicleStore = defineStore('vehicles', () => {
  // state
  const vehicles = ref<Vehicle[]>([]);
  const searchQuery = ref<string>('');
  const selectedStatus = ref<string>('all');

  // actions
  // Generate mock data
  const generateMockData = (count: number): void => {
    const data = generateVehicles(count);
    vehicles.value = data;
  };

  // Simulate vehicle movements
  const simulateMovement = (): void => {
    setInterval(() => {
      vehicles.value.forEach((v) => {
        // Skipping offline vehicles
        if (v.status === 'offline') return;

        // set new location
        v.location.lat += (Math.random() - 0.5) * 0.02;
        v.location.lng += (Math.random() - 0.5) * 0.02;
        v.lastUpdated = new Date().toISOString();

        // Check duplicate
        const lastRecord = v.history[v.history.length - 1];
        const isDuplicate =
          lastRecord &&
          lastRecord.location.lat === v.location.lat &&
          lastRecord.location.lng === v.location.lng &&
          lastRecord.timestamp === v.lastUpdated;

        // save curent location to history
        if (!isDuplicate) {
          v.history.push({
            location: { ...v.location },
            timestamp: v.lastUpdated,
          });
        }

        // A new record added for every 10 secnds.
        // Limiting the history entries to prevnt performace issues
        if (v.history.length > HISTORY_LIMIT) {
          v.history.shift(); // remove old entries
        }
      });
    }, 10000);
  };

  // Setting vehicle search wuery
  const setSearchQuery = (query: string): void => {
    searchQuery.value = query;
  };

  // setting selected status
  const setSelectedStatus = (status: string): void => {
    selectedStatus.value = status;
  };

  return {
    vehicles,
    searchQuery,
    selectedStatus,
    generateMockData,
    simulateMovement,
    setSearchQuery,
    setSelectedStatus,
  };
});
