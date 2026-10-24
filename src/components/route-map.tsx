import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";

import type { TravelMode } from "@/constants/demo-routes";

const modeMarkers = {
  Drive: {
    label: "Car",
    icon: { ios: "car.fill", android: "directions_car", web: "directions_car" },
  },
  Ride: {
    label: "Bicycle",
    icon: {
      ios: "bicycle",
      android: "directions_bike",
      web: "directions_bike",
    },
  },
  Walk: {
    label: "Walking person",
    icon: {
      ios: "figure.walk",
      android: "directions_walk",
      web: "directions_walk",
    },
  },
} as const;

const routeMap = require("../../assets/maps/map.jpg");
const routeOverlay = require("../../assets/maps/route.png");

export function RouteMap({ mode }: { mode: TravelMode }) {
  const marker = modeMarkers[mode];
  return (
    <View className="absolute inset-0">
      <Image
        source={routeMap}
        contentFit="fill"
        style={{ width: "100%", height: "100%" }}
        accessibilityLabel="Illustrated demo route by the marina; not a live map"
        accessible
      />
      <Image
        source={routeOverlay}
        contentFit="fill"
        style={{
          position: "absolute",
          left: "19.3%",
          top: "37.7%",
          width: "43.8%",
          height: "13.7%",
        }}
        accessible={false}
        pointerEvents="none"
      />
      <View
        accessibilityLabel={`${marker.label} at the starting point of the demo route`}
        accessible
        pointerEvents="none"
        className="absolute h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary"
        style={{
          left: "19.3%",
          top: "51.4%",
          marginLeft: -18,
          marginTop: -18,
        }}
      >
        <SymbolView name={marker.icon} size={22} tintColor="#FFFFFF" />
      </View>
      <View
        accessibilityLabel="Destination of the demo route"
        accessible
        pointerEvents="none"
        className="absolute h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-text"
        style={{ left: "63.1%", top: "37.7%", marginLeft: -16, marginTop: -16 }}
      >
        <SymbolView
          name={{ ios: "mappin", android: "location_on", web: "location_on" }}
          size={19}
          tintColor="#FFFFFF"
        />
      </View>
    </View>
  );
}
