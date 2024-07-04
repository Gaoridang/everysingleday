import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "~/app/context/ThemeProvider";
import CustomStack from "../../components/CustomStack";

const CheckListLayout = () => {
  const { isDarkColorScheme } = useTheme();

  return (
    <CustomStack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateCheckListScreen"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </CustomStack>
  );
};

export default CheckListLayout;
