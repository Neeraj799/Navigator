import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { View } from 'react-native';

import type { TravelMode } from '@/constants/demo-routes';

const modeMarkers = {
  Drive: { label: 'Car', icon: { ios: 'car.fill', android: 'directions_car', web: 'directions_car' } },
  Ride: { label: 'Bicycle', icon: { ios: 'bicycle', android: 'directions_bike', web: 'directions_bike' } },
  Walk: { label: 'Walking person', icon: { ios: 'figure.walk', android: 'directions_walk', web: 'directions_walk' } },
} as const;

// Bundled schematic illustrations, not geographic map data.
// Local SVG assets avoid Android's Base64-only inline data URL decoder.
const detailedMap = require('../../assets/maps/route-detailed.svg');
const simpleMap = require('../../assets/maps/route-simple.svg');

export function RouteMap({ simple, mode }: { simple: boolean; mode: TravelMode }) {
  const marker = modeMarkers[mode];
  return (
    <View className="absolute inset-0">
      <Image
        source={simple ? simpleMap : detailedMap}
        contentFit="fill"
        style={{ width: '100%', height: '100%' }}
        accessibilityLabel="Illustrated demo route by the marina; not a live map"
        accessible
      />
      <View
        accessibilityLabel={`${marker.label} at the starting point of the demo route`}
        accessible
        pointerEvents="none"
        className="absolute h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary"
        style={{ left: '6.25%', top: '52.6667%', marginLeft: -18, marginTop: -18 }}>
        <SymbolView
          name={marker.icon}
          size={22}
          tintColor="#FFFFFF"
        />
      </View>
    </View>
  );
}
