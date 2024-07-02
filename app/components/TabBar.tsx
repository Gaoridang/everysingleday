import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar = ({ state, descriptors, navigation }: Props) => {
  const icons = {
    home: (props: any) => <Feather name="home" size={24} {...props} />,
    account: (props: any) => <Feather name="user" size={24} {...props} />,
  };

  return (
    <View className="absolute bottom-4 flex-row p-4 m-4 justify-between items-center">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            className="flex-1 justify-center items-center"
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View className="p-4 bg-white rounded-xl shadow-md shadow-slate-800/10">
              {icons[route.name]({
                color: isFocused ? "#673ab7" : "#737373",
              })}
            </View>
            {/* <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
