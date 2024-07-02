// app/index.tsx
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { useAuth } from "./context/AuthProvider";

export default function Index() {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const router = useRouter();
  const hasNavigated = useRef(false);

  useEffect(() => {
    console.log("Auth state in Index:", {
      isAuthenticated,
      isLoading,
      userRole,
    });

    if (!isLoading && !hasNavigated.current) {
      if (isAuthenticated === false) {
        console.log("Routing to login");
        router.replace("/(auth)/login");
      } else if (isAuthenticated && userRole === null) {
        console.log("Routing to onboarding");
        router.replace("/onboarding/role");
      } else if (isAuthenticated && userRole) {
        console.log("Routing to home");
        router.replace(`/(${userRole})/home`);
      }
      hasNavigated.current = true;
    }
  }, [isLoading, isAuthenticated, userRole, router]);

  // 로딩 중일 때만 로딩 화면을 표시
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // 로딩이 끝났지만 아직 라우팅되지 않았을 때 빈 화면 표시
  return null;
}
