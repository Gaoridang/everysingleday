import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter, Redirect } from "expo-router";
import { useAuth } from "./context/AuthProvider";
import { useTheme } from "./context/ThemeProvider";

export default function Index() {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const { isDarkColorScheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace("/(auth)/login");
      } else if (!userRole) {
        router.replace("/onboarding/role");
      } else {
        router.replace(`/(app)/(${userRole})`);
      }
    }
  }, [isLoading, isAuthenticated, userRole, router]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDarkColorScheme ? "#000" : "#fff",
        }}
      >
        <ActivityIndicator
          size="large"
          color={isDarkColorScheme ? "#fff" : "#000"}
        />
      </View>
    );
  }

  return null;
}
