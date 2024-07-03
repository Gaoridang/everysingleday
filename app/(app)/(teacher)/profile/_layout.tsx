// app/(teacher)/account/_layout.tsx
import { Stack } from "expo-router";
import { useTheme } from "~/app/context/ThemeProvider";

export default function AccountLayout() {
  const { isDarkColorScheme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkColorScheme ? "#000000" : "#ffffff",
        },
        headerTintColor: isDarkColorScheme ? "#ffffff" : "#000000",
        contentStyle: {
          padding: 16,
          backgroundColor: isDarkColorScheme ? "#000000" : "#ffffff",
        },
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editModal"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ClassList"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
