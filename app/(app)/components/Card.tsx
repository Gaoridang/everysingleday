import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type FeatherIcon = React.ComponentProps<typeof Feather>["name"];

interface ListRowProps {
  onPress: () => void;
  onButtonPress: () => void;
  left?: FeatherIcon; // 아이콘 대신 이모지 사용 시
  contents: {
    subtitle?: string;
    content: string;
  };
  right?: string;
  type: "link" | "modal";
}

const ListRow: React.FC<ListRowProps> = ({
  onPress,
  onButtonPress,
  left,
  contents,
  right,
  type,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center p-4 border-b border-gray-200">
        {/* 좌측 아이콘/이모지 */}
        {left && (
          <View className="pr-4">
            <Feather name={left} size={24} color="#4B5563" />
          </View>
        )}

        {/* 중앙 컨텐츠 */}
        <View className="flex-1">
          {contents.subtitle && (
            <Text className="text-sm text-gray-500">{contents.subtitle}</Text>
          )}
          <Text className={contents.subtitle ? "text-base" : "text-lg"}>
            {contents.content}
          </Text>
        </View>

        {/* 우측 버튼 */}
        {right && (
          <TouchableOpacity onPress={onButtonPress}>
            <View className="pl-4">
              <Text className="text-blue-500">{right}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListRow;
