declare module 'leaflet' {
  // Basic types you need
  export type LatLngExpression =
    | [number, number]
    | { lat: number; lng: number };

  export interface LatLng {
    lat: number;
    lng: number;
  }

  export interface DivIconOptions {
    html?: string | HTMLElement | false;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
    className?: string;
  }

  export interface IconOptions {
    iconUrl: string;
    iconRetinaUrl?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
    shadowUrl?: string;
    shadowSize?: [number, number];
    shadowAnchor?: [number, number];
    className?: string;
  }

  export interface MarkerOptions {
    icon?: any;
    clickable?: boolean;
    draggable?: boolean;
    keyboard?: boolean;
    title?: string;
    alt?: string;
    zIndexOffset?: number;
    opacity?: number;
    riseOnHover?: boolean;
    riseOffset?: number;
  }

  // Main Leaflet object
  export interface LeafletStatic {
    divIcon(options: DivIconOptions): any;
    icon(options: IconOptions): any;
    latLng(lat: number, lng: number): LatLng;
    marker(latlng: LatLngExpression, options?: MarkerOptions): any;

    // Icon default fix
    Icon: {
      Default: {
        prototype: any;
        mergeOptions(options: any): void;
      };
    };
  }

  // Default export
  const L: LeafletStatic;
  export default L;

  // Named exports
  export function divIcon(options: DivIconOptions): any;
  export function icon(options: IconOptions): any;
  export function latLng(lat: number, lng: number): LatLng;
  export function marker(
    latlng: LatLngExpression,
    options?: MarkerOptions
  ): any;
}
