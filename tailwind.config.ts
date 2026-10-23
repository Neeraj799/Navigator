import type { Config } from 'tailwindcss';

import { AppColors } from './src/constants/app-colors';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // NativeWind's preset has no TypeScript module exports, so load it with require.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: AppColors,
      fontFamily: {
        nunito: ['NunitoSans_400Regular'],
        'nunito-medium': ['NunitoSans_500Medium'],
        'nunito-semibold': ['NunitoSans_600SemiBold'],
        'nunito-bold': ['NunitoSans_700Bold'],
        'nunito-extrabold': ['NunitoSans_800ExtraBold'],
      },
    },
  },
  plugins: [],
} satisfies Config;
