import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { AppColors } from '@/constants/app-colors';
import { getLocationSuggestions, resolveLocation, type TripLocation } from '@/constants/locations';
import { useTrip } from '@/context/trip-context';
import { useCurrentLocation } from '@/hooks/use-current-location';

type Field = 'pickup' | 'dropoff';

export function LocationSelection() {
  const insets = useSafeAreaInsets();
  const dropoffInput = useRef<TextInput>(null);
  const pickupInput = useRef<TextInput>(null);
  const [active, setActive] = useState<Field>('pickup');
  const { queries, setQueries } = useTrip();
  const currentLocation = useCurrentLocation();
  const pickup = resolveLocation(queries.pickup);
  const dropoff = resolveLocation(queries.dropoff);
  const suggestions = getLocationSuggestions(queries[active]);
  const sameLocation = pickup !== null && pickup.id === dropoff?.id;
  const canContinue = pickup !== null && dropoff !== null && !sameLocation;

  function selectLocation(place: TripLocation) {
    currentLocation.cancel();
    if (active === 'pickup') {
      setActive('dropoff');
      dropoffInput.current?.focus();
    } else {
      Keyboard.dismiss();
    }
    setQueries((current) => ({ ...current, [active]: place.name }));
  }

  function swapLocations() {
    currentLocation.cancel();
    setQueries({ pickup: queries.dropoff, dropoff: queries.pickup });
  }

  function handleNext() {
    if (!canContinue) return;
    Keyboard.dismiss();
    currentLocation.cancel();
    router.push('/trip-ready');
  }

  function useDeviceLocation() {
    const field = active;
    Keyboard.dismiss();
    void currentLocation.locate((address) => {
      setQueries((current) => ({ ...current, [field]: address }));
      if (field === 'pickup') setActive('dropoff');
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="border-b border-border bg-surface px-4 pb-5 pt-2">
          <View className="w-full max-w-[480px] self-center flex-row items-start">
            <Pressable accessibilityRole="button" accessibilityLabel="Back to login" onPress={() => {
              currentLocation.cancel();
              if (router.canGoBack()) router.back();
              else router.replace('/login');
            }} className="mr-1 min-h-11 w-9 items-center justify-center">
              <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} size={24} tintColor={AppColors.text} />
            </Pressable>
            <View className="min-w-0 flex-1 pt-1">
              <AppText accessibilityRole="header" weight="extrabold" className="text-[24px] leading-[29px] tracking-[-0.5px] text-text">Where are you going?</AppText>
              <AppText className="mt-1.5 text-[13px] leading-5 text-muted">Step 1 of 2 · Set pickup and drop-off</AppText>
            </View>
          </View>
        </View>
        <ScrollView className="flex-1 bg-background" contentContainerClassName="px-4 pt-5 pb-6" keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
          <View className="w-full max-w-[480px] self-center">
            <View className="flex-row rounded-[22px] border border-border bg-surface px-3.5 py-3">
              <View className="w-5 items-start pb-1 pt-[22px]">
                <View className="h-[9px] w-[9px] rounded-full bg-primary" />
                <View className="my-1 ml-1 w-px flex-1 bg-border" />
                <View className="h-[9px] w-[9px] rounded-[2px] bg-text" />
              </View>
              <View className="min-w-0 flex-1">
                {(['pickup', 'dropoff'] as const).map((field) => (
                  <View key={field} className={`${field === 'pickup' ? 'border-b border-border' : ''} py-3`}>
                    <AppText weight="bold" className={`text-[11px] ${active === field ? 'text-primary' : 'text-muted'}`}>{field === 'pickup' ? 'Pickup' : 'Drop-off'}</AppText>
                    <View className="relative flex-row items-center">
                    <TextInput
                      ref={field === 'dropoff' ? dropoffInput : pickupInput}
                      accessibilityLabel={field === 'pickup' ? 'Pickup location' : 'Drop-off location'}
                      placeholder={field === 'pickup' ? 'Choose a starting point' : 'Choose a destination'}
                      placeholderTextColor={AppColors.muted}
                      selectionColor={AppColors.primary}
                      value={queries[field]}
                      onFocus={() => { currentLocation.cancel(); setActive(field); }}
                      onChangeText={(value) => {
                        currentLocation.cancel();
                        setActive(field);
                        setQueries((current) => ({ ...current, [field]: value }));
                      }}
                      autoCorrect={false}
                      returnKeyType={field === 'pickup' ? 'next' : 'done'}
                      onSubmitEditing={() => field === 'pickup' ? dropoffInput.current?.focus() : Keyboard.dismiss()}
                      className={`font-nunito-semibold min-h-9 min-w-0 flex-1 py-1 text-[13px] text-text ${queries[field].length > 0 ? 'pr-11' : ''}`}
                    />
                    {queries[field].length > 0 && (
                      <Pressable accessibilityRole="button" accessibilityLabel={`Clear ${field === 'pickup' ? 'pickup' : 'drop-off'}`} disabled={queries[field].length === 0} accessibilityState={{ disabled: queries[field].length === 0 }} onPress={() => {
                        currentLocation.cancel();
                        setQueries((current) => ({ ...current, [field]: '' }));
                        setActive(field);
                        (field === 'pickup' ? pickupInput : dropoffInput).current?.focus();
                      }} className="absolute -top-1 right-0 h-11 w-11 items-center justify-center">
                        <View className="h-6 w-6 items-center justify-center rounded-full bg-background">
                          <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' }} size={13} tintColor={AppColors.muted} />
                        </View>
                      </Pressable>
                    )}
                    </View>
                  </View>
                ))}
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel="Swap pickup and drop-off" onPress={swapLocations} className="ml-2 mt-5 h-11 w-11 items-center justify-center rounded-xl bg-background">
                <SymbolView name={{ ios: 'arrow.up.arrow.down', android: 'swap_vert', web: 'swap_vert' }} size={20} tintColor={AppColors.text} />
              </Pressable>
            </View>
            {sameLocation && <AppText accessibilityLiveRegion="polite" className="mt-2 text-xs text-error">Choose different pickup and drop-off locations.</AppText>}
            <View className="mt-3.5 flex-row gap-3">
              <Pressable accessibilityRole="button" accessibilityLabel={`Use current location as ${active === 'pickup' ? 'pickup' : 'drop-off'}`} accessibilityState={{ disabled: currentLocation.loading, busy: currentLocation.loading }} disabled={currentLocation.loading} onPress={useDeviceLocation} className="min-h-12 min-w-0 flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-2 py-3 active:opacity-70">
                {currentLocation.loading ? <ActivityIndicator size="small" color={AppColors.primary} /> : <SymbolView name={{ ios: 'location.viewfinder', android: 'my_location', web: 'my_location' }} size={18} tintColor={AppColors.text} />}
                <AppText weight="bold" className="shrink text-xs text-text">{currentLocation.loading ? 'Locating…' : 'Use current'}</AppText>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={() => Alert.alert('Pick on map', 'Map selection is not connected in this UI demo. Choose a suggested location below.')} className="min-h-12 min-w-0 flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-2 py-3 active:opacity-70">
                <SymbolView name={{ ios: 'map', android: 'map', web: 'map' }} size={18} tintColor={AppColors.text} />
                <AppText weight="bold" className="shrink text-xs text-text">Pick on map</AppText>
              </Pressable>
            </View>
            {currentLocation.error && <AppText accessibilityLiveRegion="polite" className="mt-2 text-xs leading-5 text-error">{currentLocation.error}</AppText>}
            <AppText weight="bold" className="mb-3 mt-6 text-xs text-muted">Set as {active === 'pickup' ? 'pickup' : 'drop-off'}</AppText>
            <View className={`overflow-hidden bg-surface ${suggestions.length === 0 ? 'rounded-[18px]' : 'rounded-[22px] border border-border'}`}>
              {suggestions.map((place, index) => (
                <Pressable key={place.id} accessibilityRole="button" accessibilityLabel={`Set ${place.name} as ${active === 'pickup' ? 'pickup' : 'drop-off'}`} onPress={() => selectLocation(place)} className={`min-h-[66px] flex-row items-center gap-3 px-3.5 py-3 active:bg-background ${index > 0 ? 'border-t border-border' : ''}`}>
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-background">
                    <SymbolView name={place.kind === 'home' ? { ios: 'house', android: 'home', web: 'home' } : place.kind === 'office' ? { ios: 'building.2', android: 'apartment', web: 'apartment' } : { ios: 'clock', android: 'schedule', web: 'schedule' }} size={18} tintColor={AppColors.text} />
                  </View>
                  <View className="min-w-0 flex-1">
                    <AppText weight="bold" className="text-[13px] leading-5 text-text">{place.name}</AppText>
                    <AppText className="mt-1 text-xs leading-[18px] text-muted">{place.address}</AppText>
                  </View>
                </Pressable>
              ))}
              {suggestions.length === 0 && <AppText accessibilityLiveRegion="polite" className="px-4 py-6 text-center text-xs leading-5 text-muted">No saved places match that. Keep typing to use it as a custom address.</AppText>}
            </View>
          </View>
        </ScrollView>
        <View className="border-t border-border bg-surface px-4 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <Pressable accessibilityRole="button" accessibilityState={{ disabled: !canContinue }} disabled={!canContinue} onPress={handleNext} className={`min-h-[52px] w-full max-w-[480px] self-center items-center justify-center rounded-2xl p-3 ${canContinue ? 'bg-primary active:opacity-80' : 'bg-[#E6EBF0]'}`}>
            <AppText weight="extrabold" className={`text-base ${canContinue ? 'text-surface' : 'text-[#A5B2BF]'}`}>Next</AppText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
