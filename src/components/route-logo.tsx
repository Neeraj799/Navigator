import { Image } from "expo-image";
import { View } from "react-native";

export function RouteLogo() {
  return (
    <View
      accessible={false}
      className="h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-primary"
    >
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 26, height: 28 }}
        contentFit="contain"
        accessible={false}
      />
    </View>
  );
}
