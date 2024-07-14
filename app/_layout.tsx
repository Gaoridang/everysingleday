import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ClassProvider } from "./context/ClassProvider";
import { TabBarProvider } from "./context/TabBarProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthProvider>
      <ClassProvider>
        <ThemeProvider>
          <TabBarProvider>
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider>
                <RootLayoutNav />
              </SafeAreaProvider>
            </QueryClientProvider>
          </TabBarProvider>
        </ThemeProvider>
      </ClassProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <Slot />
    </SafeAreaView>
  );
}
