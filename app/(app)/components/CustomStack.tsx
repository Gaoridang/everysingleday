import { Stack } from "expo-router";
import React, { PropsWithChildren } from "react";
import { useTheme } from "~/app/context/ThemeProvider";

const CustomStack = ({ children }: PropsWithChildren) => {
  const { isDarkColorScheme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkColorScheme ? "#000000" : "#ffffff",
        },
        headerTintColor: isDarkColorScheme ? "#ffffff" : "#000000",
        contentStyle: {
          padding: 16,
          backgroundColor: isDarkColorScheme ? "#000000" : "#ffffff",
        },
      }}
    >
      {children}
    </Stack>
  );
};

export default CustomStack;
