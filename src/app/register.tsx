import { router } from "expo-router";
import { useRef, useState } from "react";
import {
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

import { AppText } from "@/components/app-text";
import { FormField } from "@/components/form-field";
import { PasswordField } from "@/components/password-field";
import { RouteLogo } from "@/components/route-logo";
import { registrationSchema } from "@/validation/registration-schema";

export default function RegistrationScreen() {
  const insets = useSafeAreaInsets();
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const confirmInput = useRef<TextInput>(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const validation = registrationSchema.safeParse(values);
  const errors =
    submitted && !validation.success
      ? z.flattenError(validation.error).fieldErrors
      : undefined;

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleRegister() {
    setSubmitted(true);
    if (!validation.success) return;
    Keyboard.dismiss();

    router.replace("/set-locations");
  }

  function returnToLogin() {
    router.navigate("/login");
  }

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
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
                className="mt-6 text-[32px] leading-[36.8px] tracking-[-0.8px] text-text"
              >
                Create an account
              </AppText>
              <AppText className="mt-2.5 text-[15px] leading-[24.38px] tracking-[0px] text-[#7C8B99]">
                Join Wayfare and start planning your next trip.
              </AppText>
              <View className="mt-[30px] gap-5">
                <FormField
                  label="Full name"
                  placeholder="Enter your full name"
                  value={values.name}
                  onChangeText={(value) => update("name", value)}
                  autoComplete="name"
                  textContentType="name"
                  autoCapitalize="words"
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => emailInput.current?.focus()}
                  error={errors?.name?.[0]}
                />
                <FormField
                  inputRef={emailInput}
                  label="Email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChangeText={(value) => update("email", value)}
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => passwordInput.current?.focus()}
                  error={errors?.email?.[0]}
                />
                <PasswordField
                  inputRef={passwordInput}
                  label="Password"
                  placeholder="At least 8 characters"
                  value={values.password}
                  onChangeText={(value) => update("password", value)}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => confirmInput.current?.focus()}
                  error={errors?.password?.[0]}
                />
                <PasswordField
                  inputRef={confirmInput}
                  label="Confirm password"
                  placeholder="Re-enter your password"
                  value={values.confirmPassword}
                  onChangeText={(value) => update("confirmPassword", value)}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
                  error={errors?.confirmPassword?.[0]}
                />
              </View>
              <AppText className="mt-4 text-[14px] leading-[21px] tracking-[0px] text-[#7C8B99]">
                Use at least 8 characters, including an uppercase letter, a
                number, and a special character.
              </AppText>
            </View>
          </View>
          <View
            className="border-t border-border bg-surface px-6 pt-4"
            style={{ paddingBottom: Math.max(insets.bottom, 20) }}
          >
            <View className="w-full max-w-[480px] self-center">
              <Pressable
                accessibilityRole="button"
                onPress={handleRegister}
                className="min-h-[56px] items-center justify-center rounded-2xl bg-primary p-4 active:opacity-80"
              >
                <AppText
                  weight="extrabold"
                  className="text-[17px] leading-[25.5px] tracking-[0px] text-center text-surface"
                >
                  Create account
                </AppText>
              </Pressable>
              <View className="mt-1.5 flex-row flex-wrap items-center justify-center">
                <AppText className="text-[14px] leading-[21px] tracking-[0px] text-center text-[#7C8B99]">
                  Already have an account?
                </AppText>
                <Pressable
                  accessibilityRole="button"
                  onPress={returnToLogin}
                  className="min-h-11 justify-center px-[3px]"
                >
                  <AppText
                    weight="bold"
                    className="text-[14px] leading-[21px] tracking-[0px] text-center text-text"
                  >
                    Log in
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
