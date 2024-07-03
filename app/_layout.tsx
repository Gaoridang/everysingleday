import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider, useTheme } from "./context/ThemeProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <RootLayoutNav />
          </SafeAreaProvider>
        </QueryClientProvider>
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
