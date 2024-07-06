import { View, Text } from "react-native";
import React from "react";
import CustomStack from "../../components/CustomStack";
import { Stack } from "expo-router";

const StudentDashboardLayout = () => {
  return (
    <CustomStack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </CustomStack>
  );
};

export default StudentDashboardLayout;
