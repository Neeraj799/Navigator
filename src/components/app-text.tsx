import { Text, type TextProps } from 'react-native';

const fontClasses = {
  regular: 'font-nunito',
  medium: 'font-nunito-medium',
  semibold: 'font-nunito-semibold',
  bold: 'font-nunito-bold',
  extrabold: 'font-nunito-extrabold',
} as const;

type AppTextProps = TextProps & {
  weight?: keyof typeof fontClasses;
};

// Use AppText for application text so Nunito Sans is the default everywhere.
export function AppText({ weight = 'regular', className = '', ...props }: AppTextProps) {
  return <Text {...props} className={`${fontClasses[weight]} ${className}`} />;
}
