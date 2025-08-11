import { getDistance } from 'geolib';
import type { DateString, Location, LocationEntry } from '@/types';

// Calculate total distance travelled
export const getTotalDistance = (
  history: LocationEntry[],
  location: Location
): number => {
  // Combine with current location
  const points = [...history.map((h) => h.location), location];
  let totalMeters = 0;

  // Get sum distance
  for (let i = 1; i < points.length; i++) {
    totalMeters += getDistance(
      { latitude: points[i - 1].lat, longitude: points[i - 1].lng },
      { latitude: points[i].lat, longitude: points[i].lng }
    );
  }

  // Converto Km
  return totalMeters / 1000;
};

// Calculate average spped for the full journey
export const getAverageSpeed = (
  history: LocationEntry[],
  location: Location,
  lastUpdated: DateString
): number => {
  const totalKm = getTotalDistance(history, location);

  // Exit if no history deta
  if (history.length === 0) return 0;

  const startTime = new Date(history[0].timestamp).getTime();
  const endTime = new Date(lastUpdated).getTime();

  const totalHours = (endTime - startTime) / (1000 * 60 * 60);

  const speed = totalHours > 0 ? totalKm / totalHours : 0;
  return speed;
};
