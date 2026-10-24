import { Redirect, router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AppText } from "@/components/app-text";
import { RouteMap } from "@/components/route-map";
import { AppColors } from "@/constants/app-colors";
import { demoRoutes, type TravelMode } from "@/constants/demo-routes";
import { resolveLocation } from "@/constants/locations";
import { useTrip } from "@/context/trip-context";

export default function RouteViewScreen() {
  const insets = useSafeAreaInsets();
  const { queries } = useTrip();
  const pickup = resolveLocation(queries.pickup);
  const dropoff = resolveLocation(queries.dropoff);
  const [mode, setMode] = useState<TravelMode>("Drive");
  const [step, setStep] = useState<number | null>(null);
  const [departure, setDeparture] = useState(() => Date.now());
  const route = demoRoutes[mode];
  const arrival = new Date(
    departure + route.minutes * 60000,
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const arrived = step !== null && step >= route.steps.length;

  if (!pickup || !dropoff || pickup.id === dropoff.id)
    return <Redirect href="/set-locations" />;

  function editLocations() {
    router.navigate("/set-locations");
  }

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right"]}
    >
      <ScrollView className="flex-1" contentContainerClassName="grow">
        <View className="h-[280px] overflow-hidden bg-[#A4C5D1]">
          <RouteMap mode={mode} />
          <View className="absolute left-4 right-4 top-3 flex-row justify-between">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to trip review"
              onPress={() => router.navigate("/trip-ready")}
              className="h-11 w-11 items-center justify-center rounded-2xl bg-surface"
            >
              <SymbolView
                name={{
                  ios: "chevron.left",
                  android: "chevron_left",
                  web: "chevron_left",
                }}
                size={23}
                tintColor={AppColors.text}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Map layers"
              onPress={() => undefined}
              className="h-11 w-11 items-center justify-center rounded-2xl bg-surface active:opacity-70"
            >
              <SymbolView
                name={{
                  ios: "square.3.layers.3d",
                  android: "layers",
                  web: "layers",
                }}
                size={23}
                tintColor={AppColors.text}
              />
            </Pressable>
          </View>
          <View className="absolute bottom-9 left-4 right-4 items-start">
            <View className="flex-row items-center gap-2 rounded-full bg-[#203341] px-3 py-2">
              <SymbolView
                name={{
                  ios: "exclamationmark.triangle",
                  android: "warning",
                  web: "warning",
                }}
                size={15}
                tintColor="#FFFFFF"
              />
              <AppText
                weight="bold"
                className="shrink text-[14px] leading-[21px] tracking-[0px] text-surface"
              >
                {route.traffic}
              </AppText>
            </View>
          </View>
        </View>
        <View
          className="-mt-5 grow rounded-t-[26px] bg-surface px-4 pt-2"
          style={{ paddingBottom: Math.max(insets.bottom, 20) }}
        >
          <View className="mb-4 h-1 w-9 self-center rounded-full bg-border" />
          <View className="w-full max-w-[480px] self-center">
            <AppText
              weight="extrabold"
              className="text-[13px] leading-[19.5px] tracking-[1.04px] text-[#A9B4BE]"
            >
              {mode === "Drive"
                ? "Fastest route"
                : mode === "Ride"
                  ? "Cycling route"
                  : "Walking route"}
            </AppText>
            <View className="flex-row flex-wrap items-baseline justify-between gap-x-3">
              <AppText
                accessibilityRole="header"
                weight="extrabold"
                className="text-[34px] leading-[34px] tracking-[-0.85px] text-text"
              >
                {route.minutes} min
              </AppText>
              <AppText
                weight="semibold"
                className="text-right text-[14px] leading-[21px] tracking-[0px] text-[#7C8B99]"
              >
                {route.distance} · arrive {arrival}
              </AppText>
            </View>
            <View className="mb-4 mt-4 flex-row gap-2">
              {(Object.keys(demoRoutes) as TravelMode[]).map((value) => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: mode === value }}
                  onPress={() => {
                    setMode(value);
                    setStep(null);
                    setDeparture(Date.now());
                  }}
                  className={`min-h-11 flex-1 items-center justify-center rounded-2xl border px-2 py-2 ${mode === value ? "border-primary bg-[#FFF0E9]" : "border-border bg-surface"}`}
                >
                  <AppText
                    weight="bold"
                    className={`text-[14px] leading-[21px] tracking-[0px] text-center ${mode === value ? "text-primary" : "text-text"}`}
                  >
                    {value}
                  </AppText>
                </Pressable>
              ))}
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit pickup and destination"
              onPress={editLocations}
              className="flex-row rounded-2xl bg-background p-3.5 active:opacity-70"
            >
              <View className="mr-3 w-2 items-center py-1.5">
                <View className="h-2 w-2 rounded-full bg-primary" />
                <View className="my-1 w-px flex-1 bg-border" />
                <View className="h-2 w-2 rounded-[1px] bg-text" />
              </View>
              <View className="min-w-0 flex-1 gap-2.5">
                {[pickup, dropoff].map((place) => (
                  <AppText
                    key={place.id}
                    weight="bold"
                    className="text-[15px] leading-[22.5px] tracking-[0px] text-text"
                  >
                    {place.name}
                    {place.kind !== "custom" ? ` · ${place.address}` : ""}
                  </AppText>
                ))}
              </View>
            </Pressable>

            <AppText
              weight="extrabold"
              className="mb-1 mt-4 text-[13px] leading-[19.5px] tracking-[1.04px] text-[#A9B4BE]"
            >
              Turn by turn
            </AppText>
            {route.steps.map((instruction, index) => (
              <View
                key={`${mode}-${index}`}
                className={`flex-row items-start gap-3 border-b border-border py-3 ${step === index ? "rounded-xl bg-[#FFF0E9] px-2" : ""}`}
              >
                <View className="mt-1 h-8 w-8 items-center justify-center rounded-full bg-background">
                  <SymbolView
                    name={{
                      ios: "arrow.turn.up.right",
                      android: "turn_right",
                      web: "turn_right",
                    }}
                    size={18}
                    tintColor={AppColors.text}
                  />
                </View>
                <View className="min-w-0 flex-1">
                  <AppText
                    weight="bold"
                    className="text-[15px] leading-[20.63px] tracking-[0px] text-text"
                  >
                    {instruction.title}
                  </AppText>
                  <AppText className="mt-1 text-[13px] leading-[19.5px] tracking-[0px] text-[#7C8B99]">
                    {instruction.detail}
                  </AppText>
                </View>
                <AppText
                  weight="bold"
                  className="pt-1 text-[13px] leading-[19.5px] tracking-[0px] text-[#7C8B99]"
                >
                  {instruction.distance}
                </AppText>
              </View>
            ))}
            {step !== null && (
              <AppText
                accessibilityLiveRegion="polite"
                weight="bold"
                className="mt-3 text-[15px] leading-[22.5px] tracking-[0px] text-text"
              >
                {arrived
                  ? `Complete · Arrived at ${dropoff.name}`
                  : `Step ${step + 1} of ${route.steps.length}: ${route.steps[step].title}`}
              </AppText>
            )}
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                if (step === null || arrived) {
                  setDeparture(Date.now());
                  setStep(0);
                } else setStep(step + 1);
              }}
              className="mt-5 min-h-[52px] flex-row items-center justify-center gap-2 rounded-2xl bg-primary p-3 active:opacity-80"
            >
              <SymbolView
                name={{ ios: "location", android: "near_me", web: "near_me" }}
                size={20}
                tintColor="#FFFFFF"
              />
              <AppText
                weight="extrabold"
                className="text-center text-[17px] leading-[25.5px] tracking-[0px] text-surface"
              >
                {step === null
                  ? "Start navigation"
                  : arrived
                    ? "Restart"
                    : "Next step"}
              </AppText>
            </Pressable>
            {step !== null && (
              <Pressable
                accessibilityRole="button"
                onPress={() => setStep(null)}
                className="min-h-11 items-center justify-center"
              >
                <AppText
                  weight="bold"
                  className="text-[14px] leading-[21px] tracking-[0px] text-center text-primary"
                >
                  End navigation
                </AppText>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
