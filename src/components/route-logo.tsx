import { View } from "react-native";

// Native shapes approximate the route mark without adding a dependency.
export function RouteLogo() {
  return (
    <View
      accessible={false}
      className="h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-primary"
    >
      <View className="h-7 w-[26px]">
        <View className="absolute left-[3px] top-[5px] h-2.5 w-5 rounded-l-[6px] border-2 border-r-0 border-white" />
        <View className="absolute left-[3px] top-[13px] h-2.5 w-5 rounded-r-[6px] border-2 border-l-0 border-white" />
        <View className="absolute right-0 top-0.5 h-[7px] w-[7px] rounded-full border-2 border-white bg-primary" />
        <View className="absolute bottom-0.5 left-0 h-[7px] w-[7px] rounded-full border-2 border-white bg-primary" />
      </View>
    </View>
  );
}
