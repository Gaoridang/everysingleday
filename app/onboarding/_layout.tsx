import { Slot, Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingLayout() {
  return (
    <View className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#000000" />
      <SafeAreaView className="flex-1">
        <Slot />
      </SafeAreaView>
    </View>
  );
}
