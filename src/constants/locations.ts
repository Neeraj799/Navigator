// Local assignment suggestions; these are not live search results.
export const locations = [
  { id: 'home', name: 'Home', address: 'Villa 12, Street 840, Zone 61 · West Bay', kind: 'home' },
  { id: 'office', name: 'Marina Office Tower', address: 'Level 14, Al Fardan Rd · Lusail Marina', kind: 'office' },
  { id: 'ferry', name: 'Corniche Ferry Terminal', address: 'Gate 3, Corniche Promenade', kind: 'recent' },
  { id: 'metro', name: 'Msheireb Metro Station', address: 'Al Kinana St · Msheireb Downtown', kind: 'recent' },
  { id: 'airport', name: 'Hamad International Airport', address: 'Doha · Passenger terminal', kind: 'recent' },
] as const;

export type TripLocation = {
  id: string;
  name: string;
  address: string;
  kind: 'home' | 'office' | 'recent' | 'custom';
};

export function getLocationSuggestions(value: string) {
  const query = value.trim().replace(/\s+/g, ' ').toLowerCase();
  return locations.filter((place) => `${place.name} ${place.address}`.toLowerCase().includes(query));
}

export function resolveLocation(value: string): TripLocation | null {
  const name = value.trim().replace(/\s+/g, ' ');
  if (!name) return null;
  const normalized = name.toLowerCase();
  return locations.find((place) => place.name.toLowerCase() === normalized) ?? {
    id: `custom:${normalized}`,
    name,
    address: name,
    kind: 'custom',
  };
}
