import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "~/app/context/ThemeProvider";

type ScreenWrapperProps = {
  children: React.ReactNode;
};

export function ScreenWrapper({ children }: ScreenWrapperProps) {
  const { isDarkColorScheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkColorScheme ? "#000000" : "#ffffff",
      padding: 16,
    },
  });

  return <View style={styles.container}>{children}</View>;
}
