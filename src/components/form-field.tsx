import { AppText } from "@/components/app-text";
import { type ReactNode, type Ref, useState } from "react";
import { TextInput, type TextInputProps, View } from "react-native";

import { AppColors } from "@/constants/app-colors";

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  trailing?: ReactNode;
  inputRef?: Ref<TextInput>;
};

export function FormField({
  label,
  error,
  trailing,
  inputRef,
  onFocus,
  onBlur,
  ...inputProps
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <AppText
        weight="bold"
        className="mb-2 text-[15px] leading-[22.5px] tracking-[0px] text-text"
      >
        {label}
      </AppText>
      <View
        className={`min-h-[52px] flex-row items-center rounded-2xl border bg-surface ${error ? "border-error" : focused ? "border-primary" : "border-border"}`}
      >
        <TextInput
          {...inputProps}
          ref={inputRef}
          accessibilityLabel={label}
          accessibilityHint={error}
          placeholderTextColor={AppColors.muted}
          selectionColor={AppColors.primary}
          underlineColorAndroid="transparent"
          className="font-nunito min-h-[50px] min-w-0 flex-1 px-4 py-3 text-sm text-text"
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        {trailing}
      </View>
      {error && (
        <AppText
          accessibilityLiveRegion="polite"
          className="mt-1.5 text-xs leading-[18px] text-error"
        >
          {error}
        </AppText>
      )}
    </View>
  );
}
