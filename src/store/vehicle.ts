import { ref } from 'vue';
import { defineStore } from 'pinia';
import { generateVehicles } from '@/utils';
import type { Vehicle } from '@/types';

export const useVehicleStore = defineStore('vehicles', () => {
  // state
  const vehicles = ref<Vehicle[]>([]);

  // actions
  const generateMockData = (count: number): void => {
    const data = generateVehicles(count);
    vehicles.value = data;
  };

  const simulateMovement = (): void => {
    setInterval(() => {
      vehicles.value.forEach((v) => {
        // Skipping offline vehicles
        if (v.status === 'offline') return;

        // save curent location to history
        v.history.push({
          location: {
            lat: v.location.lat,
            lng: v.location.lng,
          },
          timestamp: v.lastUpdated,
        });

        // sent new location
        v.location.lat += (Math.random() - 0.5) * 0.02;
        v.location.lng += (Math.random() - 0.5) * 0.02;
        v.lastUpdated = new Date().toISOString();
      });
    }, 5000);
  };

  return {
    vehicles,
    generateMockData,
    simulateMovement,
  };
});
