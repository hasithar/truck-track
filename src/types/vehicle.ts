import type { DateString } from './common';
import type { Location, LocationEntry } from './location';

// Vehicle Type
export type VehicleType = 'truck' | 'car' | 'bus' | 'van';

// Vehicle status
export type VehicleStatus = 'online' | 'offline' | 'alert';

// Vehicle
export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  status: VehicleStatus;
  type: VehicleType;
  location: Location;
  lastUpdated: DateString;
  history: LocationEntry[];
}
