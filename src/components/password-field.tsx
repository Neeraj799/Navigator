import { SymbolView } from 'expo-symbols';
import { useState, type ComponentProps } from 'react';
import { Pressable } from 'react-native';

import { FormField } from '@/components/form-field';
import { AppColors } from '@/constants/app-colors';

export function PasswordField(props: Omit<ComponentProps<typeof FormField>, 'secureTextEntry' | 'trailing'>) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
      secureTextEntry={!visible}
      trailing={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${visible ? 'Hide' : 'Show'} ${props.label.toLowerCase()}`}
          onPress={() => setVisible(!visible)}
          className="w-12 min-h-12 items-center justify-center"
        >
          <SymbolView
            name={{ ios: visible ? 'eye.slash' : 'eye', android: visible ? 'visibility_off' : 'visibility', web: visible ? 'visibility_off' : 'visibility' }}
            size={20}
            tintColor={AppColors.muted}
          />
        </Pressable>
      }
    />
  );
}
