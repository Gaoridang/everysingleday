import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";

export default function TeacherLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="createChecklist"
        options={{
          animation: "slide_from_bottom",
          headerShown: true,
          headerTitle: "체크리스트 만들기",
          headerLeft: () => (
            <Feather
              name="x"
              size={24}
              color="#333"
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreateClassScreen"
        options={{
          animation: "slide_from_bottom",
          headerTitle: "체크리스트 만들기",
          headerLeft: () => (
            <Feather
              name="x"
              size={24}
              color="#333"
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}
