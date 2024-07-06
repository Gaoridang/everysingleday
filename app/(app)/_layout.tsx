import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../context/ThemeProvider";

export default function AppLayout() {
  const { isDarkColorScheme } = useTheme();

  return (
    <>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: isDarkColorScheme ? "#000" : "#fff",
          },
          headerStyle: {
            backgroundColor: isDarkColorScheme ? "#000" : "#fff",
          },
        }}
      >
        <Stack.Screen name="student" options={{ headerShown: false }} />
        <Stack.Screen name="teacher" options={{ headerShown: false }} />
        <Stack.Screen name="parent" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
