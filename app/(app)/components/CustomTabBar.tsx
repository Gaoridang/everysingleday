import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const CustomTabBar = () => {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" />
    </Tabs>
  );
};

export default CustomTabBar;
