import type { Vehicle } from '@/types';
import { mapConfig } from '@/config';
import { faker } from '@faker-js/faker';

// Get random coords near the base location
const randomNear = (base: number, spread = 0.05) => {
  return base + (Math.random() * 2 - 1) * spread;
};

// Map vehicle types to names
const vehicleNamesByType: Record<string, () => string> = {
  truck: () => `Truck ${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
  bus: () => `Bus ${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
  van: () => `Van ${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
  car: () => `Car ${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
};

// Create a mock vehicle
export const createMockVehicle = (): Vehicle => {
  const vehicleType = faker.helpers.arrayElement([
    'truck',
    'car',
    'bus',
    'van',
  ]);

  return {
    id: faker.string.uuid(),
    name: vehicleNamesByType[vehicleType]?.() ?? faker.vehicle.vehicle(),
    plate: faker.vehicle.vrm(),
    status: faker.helpers.arrayElement(['online', 'offline', 'alert']),
    type: vehicleType,
    location: {
      lat: randomNear(mapConfig.base.lat),
      lng: randomNear(mapConfig.base.lng),
    },
    lastUpdated: faker.date.recent().toISOString(),
    history: [],
  };
};

// Genrtate vehicles
export const generateVehicles = (count: number): Vehicle[] =>
  faker.helpers.multiple(createMockVehicle, {
    count: count,
  });
