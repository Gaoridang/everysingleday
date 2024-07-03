import "../global.css";

import React from "react";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider, useTheme } from "./context/ThemeProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { isDarkColorScheme } = useTheme();

  return (
    <>
      <Slot />
    </>
  );
}
