import '@/global.css';

import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
} from '@expo-google-fonts/nunito-sans';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

import { AppColors } from '@/constants/app-colors';
import { TripProvider } from '@/context/trip-context';

export default function RootLayout() {
  // These font files are bundled with the app, so loading needs no internet.
  const [fontsLoaded, fontError] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_500Medium,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
  });

  if (fontError) throw fontError;
  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color={AppColors.primary} accessibilityLabel="Loading fonts" />
      </View>
    );
  }

  return (
    <TripProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: AppColors.background } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="set-locations" />
        <Stack.Screen name="trip-ready" />
        <Stack.Screen name="route-view" />
      </Stack>
    </TripProvider>
  );
}
