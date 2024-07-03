// app/(teacher)/account/_layout.tsx
import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="EditProfile" />
    </Stack>
  );
}
