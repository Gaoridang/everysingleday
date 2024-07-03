import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "~/app/context/ThemeProvider";
import { View } from "react-native";
import { cn } from "~/lib/utils";

export default function StudentLayout() {
  const { isDarkColorScheme, toggleTheme } = useTheme();

  return (
    <View className={cn(isDarkColorScheme ? "bg-black" : "bg-white", "flex-1")}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: isDarkColorScheme ? "#ffffff" : "#000000",
          tabBarInactiveTintColor: isDarkColorScheme ? "#888888" : "#888888",
          tabBarStyle: {
            backgroundColor: isDarkColorScheme ? "#000000" : "#ffffff",
          },
          tabBarShowLabel: false,
          headerRight: () => {
            return (
              <Ionicons
                className="mr-4"
                name={isDarkColorScheme ? "sunny" : "moon"}
                size={24}
                color={isDarkColorScheme ? "#ffffff" : "#000000"}
                onPress={toggleTheme}
              />
            );
          },
          headerStyle: {
            backgroundColor: isDarkColorScheme ? "#000000" : "#ffffff",
          },
          headerTintColor: isDarkColorScheme ? "#ffffff" : "#000000",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
