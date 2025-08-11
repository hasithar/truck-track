import type { Location } from '@/types';

export interface MapConfig {
  tileUrl: string;
  attribution: string;
  base: Location;
}

export const mapConfig: MapConfig = {
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; OpenStreetMap contributors',
  base: {
    lat: 24.4539,
    lng: 54.3773,
  },
};
