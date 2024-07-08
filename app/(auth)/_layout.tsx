import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "로그인",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "회원가입",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
