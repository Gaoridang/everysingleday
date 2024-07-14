import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="checklists" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabsLayout;
