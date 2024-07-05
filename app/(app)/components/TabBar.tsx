import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const position = useSharedValue(0);

  return (
    <View className="flex-row">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["index"].includes(route.name)) return null;

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

          position.value = withTiming(index * 100, { duration: 500 });
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ translateX: position.value }],
          };
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            className="flex-1 items-center justify-center pb-12 pt-4"
          >
            <Animated.View style={[animatedStyle]}>
              <Text className={isFocused ? "text-red-500" : "text-gray-400"}>
                {label as ReactNode}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
