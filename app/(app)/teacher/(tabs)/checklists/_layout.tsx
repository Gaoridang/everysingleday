import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "~/app/context/ThemeProvider";

import { Text } from "react-native";
import CustomStack from "~/app/(app)/components/CustomStack";

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
        name="[checklistId]/index"
        options={{
          headerTitle: "체크리스트",
          headerStyle: {
            backgroundColor: isDarkColorScheme ? "#000" : "#fff",
          },
          headerTintColor: isDarkColorScheme ? "#fff" : "#000",
        }}
      />
    </CustomStack>
  );
};

export default CheckListLayout;
