import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import TabBar from "../components/TabBar";

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} initialRouteName="home">
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          href: {
            pathname: "/account",
          },
        }}
      />
    </Tabs>
  );
}
