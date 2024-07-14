import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { cn } from "~/lib/utils";

interface RightProps {
  type: "icon" | "text" | "button";
  content: string;
}

interface LeftProps {
  type: "icon" | "text";
  content: string;
}

interface Props {
  type?: "link" | "alert" | "default";
  onPress?: () => void;
  left?: LeftProps;
  right?: RightProps;
  content: {
    main: string;
    sub?: string;
  };
  className?: string;
}

const RowList = ({
  type = "default",
  onPress,
  left,
  right,
  content,
  className,
}: Props) => {
  const renderLeft = () => {
    switch (left?.type) {
      case "icon":
        return (
          <Feather
            size={20}
            name={left.content as React.ComponentProps<typeof Feather>["name"]}
          />
        );
      case "text":
        return <Text className="text-sm text-gray-500">{left.content}</Text>;
      default:
        return (
          <View>
            <Text>RowList</Text>
          </View>
        );
    }
  };

  const renderRight = () => {
    switch (right?.type) {
      case "icon":
        return (
          <Feather
            name={right.content as React.ComponentProps<typeof Feather>["name"]}
          />
        );
      case "text":
        return <Text>{right.content}</Text>;
      case "button":
        return (
          <TouchableOpacity className="rounded-xl py-2 px-3 bg-gray-200">
            <Text className="font-medium text-sm">{right.content}</Text>
          </TouchableOpacity>
        );

      default:
        return (
          <View>
            <Text>RowList</Text>
          </View>
        );
    }
  };

  if (type === "default") {
    return (
      <View
        className={cn(
          "flex-1 flex-row p-4 justify-between items-center active:scale-95 transition-all",
          className
        )}
      >
        {left && renderLeft()}
        <View>
          <Text className="text-sm text-gray-500">{content.sub}</Text>
          <Text className="font-bold text-lg">{content.main}</Text>
        </View>
        {right && renderRight()}
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "flex-row p-4 justify-between items-center active:scale-95 transition-all",
        className
      )}
    >
      {left && renderLeft()}
      <View>
        <Text className="text-sm text-gray-500">{content.sub}</Text>
        <Text className="font-bold text-lg">{content.main}</Text>
      </View>
      {right && renderRight()}
    </TouchableOpacity>
  );
};

export default RowList;
