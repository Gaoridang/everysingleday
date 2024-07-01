import React, { useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import { View, Text } from "react-native";
import { useAuth } from "../../context/AuthProvider";

export default function ProtectedLayout() {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Slot />;
}
