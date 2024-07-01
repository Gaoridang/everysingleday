import { useEffect } from "react";
import { useSegments, useRouter, useRootNavigationState } from "expo-router";
import { User } from "@supabase/supabase-js";

export function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // 사용자가 로그인하지 않았고, 현재 auth 그룹에 있지 않다면 로그인 페이지로 리다이렉트
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // 사용자가 로그인했는데 auth 그룹에 있다면 홈 페이지로 리다이렉트
      router.replace("/");
    }
  }, [user, segments, navigationState]);
}
