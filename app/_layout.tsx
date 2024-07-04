import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ClassProvider } from "./context/ClassProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <ClassProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <RootLayoutNav />
            </SafeAreaProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ClassProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  return (
    <>
      <Slot />
    </>
  );
}
