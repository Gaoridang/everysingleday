import { Stack, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated, View } from "react-native";
import { useCallback, useRef } from "react";

export default function OnboardingLayout() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // 애니메이션 지속 시간 (밀리초)
        useNativeDriver: true, // 성능 향상을 위해 네이티브 드라이버 사용
      }).start();

      return () => {
        // 화면에서 나갈 때 애니메이션 값을 리셋
        fadeAnim.setValue(0);
      };
    }, [fadeAnim])
  );

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Stack.Screen
          name="SelectRoleScreen"
          options={{
            headerTitle: "역할 선택",
            headerBackVisible: true,
            headerBackTitle: "뒤로",
          }}
        />
        <Stack.Screen
          name="InputNameScreen"
          options={{
            headerTitle: "이름 입력",
            headerBackVisible: true,
            headerBackTitle: "뒤로",
          }}
        />
        <Stack.Screen
          name="SelectAvatarScreen"
          options={{
            headerTitle: "프로필 사진 선택",
            headerBackVisible: true,
            headerBackTitle: "뒤로",
          }}
        />
      </Stack>
    </Animated.View>
  );
}
