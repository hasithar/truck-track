import { ref } from 'vue';
import { defineStore } from 'pinia';
import { generateVehicles } from '@/utils';
import type { Vehicle } from '@/types';

export const useVehicleStore = defineStore('vehicles', () => {
  // state
  const vehicles = ref<Vehicle[]>([]);

  // actions
  const generateMockData = (count: number) => {
    const data = generateVehicles(count);
    vehicles.value = data;
  };

  return {
    vehicles,
    generateMockData,
  };
});

// Base location
// const baseLocation: Location = {
//   lat: 24.4539,
//   lng: 54.3773,
// };

// const vehicleIcons: Record<VehicleType, LucideIcon> = {
//   truck: TruckIcon,
//   van: VanIcon,
//   bike: BikeIcon,
//   car: CarIcon,
// };
