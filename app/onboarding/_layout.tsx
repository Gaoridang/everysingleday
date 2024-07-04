import { Slot, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SelectRoleScreen" />
      <Stack.Screen name="InputNameScreen" />
      <Stack.Screen name="SelectAvatarScreen" />
    </Stack>
  );
}
