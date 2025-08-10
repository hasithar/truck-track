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

// Carto map
// const tileUrl =
('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png');
// const attribution =
('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>');
