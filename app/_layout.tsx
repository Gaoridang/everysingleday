import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "./context/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <ScrollView className="flex-1">
            <Slot />
          </ScrollView>
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}
