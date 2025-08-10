import type { DateString } from './common';

// Location
export interface Location {
  lat: number;
  lng: number;
}

// Location entry with timestamp
export interface LocationEntry {
  location: Location;
  timestamp: DateString;
}
