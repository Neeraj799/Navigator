import * as Location from 'expo-location';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';

async function withTimeout<T>(operation: Promise<T>, milliseconds: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('Location took too long. Try again outdoors or enter an address manually.')), milliseconds);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

export function useCurrentLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  useFocusEffect(useCallback(() => {
    setLoading(false);
    return () => { requestId.current += 1; };
  }, []));

  function cancel() {
    requestId.current += 1;
    setLoading(false);
    setError(null);
  }

  async function locate(onLocated: (address: string) => void) {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (id !== requestId.current) return;
      if (!permission.granted) {
        setError(permission.canAskAgain
          ? 'Location access was denied. Try again or enter an address manually.'
          : 'Enable location access in your device or browser settings, or enter an address manually.');
        return;
      }
      if (Platform.OS !== 'web' && !(await Location.hasServicesEnabledAsync())) {
        if (id === requestId.current) setError('Location services are off. Turn them on in device settings or enter an address manually.');
        return;
      }
      if (id !== requestId.current) return;
      const { coords } = await withTimeout(Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }), 15000);
      if (id !== requestId.current) return;
      let address = `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;
      // Native geocoding can fail offline; the coordinates still identify the place.
      if (Platform.OS !== 'web') {
        try {
          const [place] = await withTimeout(Location.reverseGeocodeAsync(coords), 5000);
          if (place) {
            const street = [place.streetNumber, place.street].filter(Boolean).join(' ');
            address = place.formattedAddress?.trim() || [street || place.name, place.city || place.district, place.region, place.country].filter(Boolean).join(', ') || address;
          }
        } catch {
          // Keep coordinates when an address is unavailable.
        }
      }
      if (id === requestId.current) onLocated(address);
    } catch (cause) {
      if (id === requestId.current) {
        setError(cause instanceof Error && cause.message.startsWith('Location took too long')
          ? cause.message
          : 'Could not find your location. Check location access and try again, or enter an address manually.');
      }
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }

  return { locate, cancel, loading, error };
}
