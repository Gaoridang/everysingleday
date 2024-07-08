import { Feather, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "~/app/context/ThemeProvider";

export default function StudentLayout() {
  const { isDarkColorScheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? "#ffffff" : "#000000",
        tabBarInactiveTintColor: isDarkColorScheme ? "#888888" : "#888888",
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? "#000000" : "#ffffff",
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: "Checklists",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="tasklist" size={size} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("checklists", { screen: "index" });
          },
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Name is profile but not index
            if (route.name === "profile" && navigation.isFocused()) {
              e.preventDefault();
              navigation.navigate("profile", { screen: "index" });
            }
          },
        })}
      />
    </Tabs>
  );
}
