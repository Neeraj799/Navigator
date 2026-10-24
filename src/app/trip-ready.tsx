import { Redirect, router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AppText } from "@/components/app-text";
import { AppColors } from "@/constants/app-colors";
import { resolveLocation } from "@/constants/locations";
import { useTrip } from "@/context/trip-context";

export default function TripReadyScreen() {
  const insets = useSafeAreaInsets();
  const { queries } = useTrip();
  const pickup = resolveLocation(queries.pickup);
  const dropoff = resolveLocation(queries.dropoff);

  if (!pickup || !dropoff || pickup.id === dropoff.id) {
    return <Redirect href="/set-locations" />;
  }

  function editLocations() {
    router.navigate("/set-locations");
  }

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right"]}
    >
      <View className="border-b border-border bg-surface px-4 pb-5 pt-2">
        <View className="w-full max-w-[480px] self-center flex-row items-start">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to set locations"
            onPress={editLocations}
            className="mr-1 min-h-11 w-9 items-center justify-center"
          >
            <SymbolView
              name={{
                ios: "chevron.left",
                android: "chevron_left",
                web: "chevron_left",
              }}
              size={24}
              tintColor={AppColors.text}
            />
          </Pressable>
          <View className="min-w-0 flex-1 pt-1">
            <AppText
              accessibilityRole="header"
              weight="extrabold"
              className="text-[26px] leading-[32.5px] tracking-[-0.65px] text-text"
            >
              Trip ready
            </AppText>
            <AppText className="mt-1.5 text-[15px] leading-[22.5px] tracking-[0px] text-[#7C8B99]">
              Step 2 of 2 · Review your locations
            </AppText>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="grow px-4 py-6">
        <View className="w-full max-w-[480px] self-center">
          <View className="mb-5 h-16 w-16 items-center justify-center rounded-full bg-[#FFF0E9]">
            <SymbolView
              name={{ ios: "checkmark", android: "check", web: "check" }}
              size={30}
              tintColor={AppColors.primary}
            />
          </View>
          <AppText
            weight="extrabold"
            className="text-[26px] leading-[32.5px] tracking-[-0.65px] text-text"
          >
            Your trip is ready
          </AppText>
          <AppText className="mt-2 text-[15px] leading-[22.5px] tracking-[0px] text-[#7C8B99]">
            Review your starting point and destination before viewing the route.
          </AppText>

          <View className="mt-6 rounded-[22px] border border-border bg-surface px-4">
            {[
              { label: "Starting point", place: pickup },
              { label: "Destination", place: dropoff },
            ].map(({ label, place }, index) => (
              <View
                key={label}
                className={`flex-row gap-3 py-5 ${index === 0 ? "border-b border-border" : ""}`}
              >
                <View
                  className={`mt-1.5 h-2.5 w-2.5 ${index === 0 ? "rounded-full bg-primary" : "rounded-[2px] bg-text"}`}
                />
                <View className="min-w-0 flex-1">
                  <AppText
                    weight="extrabold"
                    className="text-[12px] leading-[18px] tracking-[0.96px] text-muted"
                  >
                    {label}
                  </AppText>
                  <AppText
                    weight="bold"
                    className="mt-1.5 text-[15px] leading-[22.5px] tracking-[0px] text-text"
                  >
                    {place.name}
                  </AppText>
                  {place.kind !== "custom" && (
                    <AppText className="mt-1 text-[13px] leading-[19.5px] tracking-[0px] text-[#7C8B99]">
                      {place.address}
                    </AppText>
                  )}
                </View>
              </View>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={editLocations}
            className="mt-4 min-h-12 flex-row items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 active:opacity-70"
          >
            <SymbolView
              name={{ ios: "pencil", android: "edit", web: "edit" }}
              size={18}
              tintColor={AppColors.text}
            />
            <AppText
              weight="bold"
              className="text-[14px] leading-[21px] tracking-[0px] text-center text-text"
            >
              Edit locations
            </AppText>
          </Pressable>
        </View>
      </ScrollView>

      <View
        className="border-t border-border bg-surface px-4 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/route-view")}
          className="min-h-[52px] w-full max-w-[480px] self-center flex-row items-center justify-center gap-2 rounded-2xl bg-primary p-3 active:opacity-80"
        >
          <SymbolView
            name={{ ios: "map", android: "map", web: "map" }}
            size={20}
            tintColor={AppColors.surface}
          />
          <AppText weight="extrabold" className="text-base text-surface">
            View route
          </AppText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
