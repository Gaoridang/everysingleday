import { Stack } from "expo-router";
import React from "react";
import CustomStack from "~/app/(app)/components/CustomStack";

const DashboardLayout = () => {
  return (
    <CustomStack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </CustomStack>
  );
};

export default DashboardLayout;
