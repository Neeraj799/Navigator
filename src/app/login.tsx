import { AppText } from "@/components/app-text";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { z } from "zod";

import { FormField } from "@/components/form-field";
import { RouteLogo } from "@/components/route-logo";
import { AppColors } from "@/constants/app-colors";
import { loginSchema } from "@/validation/login-schema";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const passwordInput = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Revalidate current inputs so errors update as the user corrects them.
  const validation = loginSchema.safeParse({ email, password });
  const errors = validation.success
    ? undefined
    : z.flattenError(validation.error).fieldErrors;
  const emailError = errors?.email?.[0];
  const passwordError = errors?.password?.[0];

  function handleLogin() {
    setSubmitted(true);
    if (!validation.success) return;
    Keyboard.dismiss();
    // A mock action for this phase; no credentials are sent or saved.
    router.push("/set-locations");
  }

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        className="flex-1 bg-background"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="grow"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View className="grow px-6 pt-9 pb-7">
            <View className="w-full max-w-[480px] self-center">
              <RouteLogo />
              <AppText
                weight="extrabold"
                accessibilityRole="header"
                className="mt-6 text-[32px] leading-[36.8px] tracking-[-0.8px] text-[#111F2C]"
              >
                Welcome back
              </AppText>
              <AppText className="mt-2.5 text-sm leading-[22px] text-muted">
                Log in to plan a trip and follow your route turn by turn.
              </AppText>
              <View className="mt-[30px] gap-5">
                <FormField
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => passwordInput.current?.focus()}
                  error={submitted ? emailError : undefined}
                />
                <FormField
                  inputRef={passwordInput}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  autoComplete="current-password"
                  textContentType="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!passwordVisible}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  error={submitted ? passwordError : undefined}
                  trailing={
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        passwordVisible ? "Hide password" : "Show password"
                      }
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      className="w-12 min-h-12 items-center justify-center"
                    >
                      <SymbolView
                        name={{
                          ios: passwordVisible ? "eye.slash" : "eye",
                          android: passwordVisible
                            ? "visibility_off"
                            : "visibility",
                          web: passwordVisible
                            ? "visibility_off"
                            : "visibility",
                        }}
                        size={20}
                        tintColor={AppColors.muted}
                      />
                    </Pressable>
                  }
                />
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  Alert.alert(
                    "Forgot password?",
                    "Password recovery is not connected in this demo.",
                  )
                }
                className="mt-1.5 min-h-11 self-start justify-center"
              >
                <AppText weight="medium" className="text-[13px] text-primary">
                  Forgot password?
                </AppText>
              </Pressable>
            </View>
          </View>
          <View
            className="border-t border-border bg-surface px-6 pt-4"
            style={{ paddingBottom: Math.max(insets.bottom, 20) }}
          >
            <View className="w-full max-w-[480px] self-center">
              <Pressable
                accessibilityRole="button"
                onPress={handleLogin}
                className="min-h-[54px] items-center justify-center rounded-2xl bg-primary p-4 active:opacity-80"
              >
                <AppText weight="bold" className="text-base text-surface">
                  Log in
                </AppText>
              </Pressable>
              <View className="mt-1.5 flex-row flex-wrap items-center justify-center">
                <AppText className="text-[13px] text-muted">
                  New to Navigator?
                </AppText>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push("/register")}
                  className="min-h-11 justify-center px-[3px]"
                >
                  <AppText weight="semibold" className="text-[13px] text-text">
                    Create an account
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
