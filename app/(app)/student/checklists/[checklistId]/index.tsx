import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useGetChecklistItems,
  useUpdateStudentChecklistResponse,
} from "~/app/(app)/hooks/useCheckList";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "~/app/context/AuthProvider";

interface Response {
  item_id: string;
  response: boolean;
}

const ChecklistProgress = () => {
  const { user } = useAuth();
  const { checklistId } = useLocalSearchParams();
  const {
    data: checklistItems,
    isLoading,
    error,
  } = useGetChecklistItems(checklistId as string);
  const update = useUpdateStudentChecklistResponse();
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    if (checklistItems) {
      // 초기 responses 상태 설정
      setResponses(
        checklistItems.map((item) => ({
          item_id: item.id,
          response: false,
        }))
      );
    }
  }, [checklistItems]);

  const handleToggleItem = (itemId: string) => {
    setResponses((prev) =>
      prev.map((item) =>
        item.item_id === itemId ? { ...item, response: !item.response } : item
      )
    );
  };

  const handleSubmit = () => {
    if (!user || !checklistId) return;

    update.mutate({
      checklistId: checklistId as string,
      evaluatedId: user.id,
      itemResponses: responses.map((item) => ({
        item_id: item.item_id,
        response: item.response ? "true" : "false",
      })),
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const response = responses.find((r) => r.item_id === item.id);
    const isCompleted = response ? response.response : false;

    return (
      <TouchableOpacity
        onPress={() => handleToggleItem(item.id)}
        className="flex-row items-center p-4 border-b border-gray-200"
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isCompleted }}
      >
        <View
          className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
            isCompleted ? "bg-blue-500 border-blue-500" : "border-gray-300"
          }`}
        >
          {isCompleted && <Feather name="check" size={16} color="white" />}
        </View>
        <Text
          className={`flex-1 ${isCompleted ? "text-gray-500" : "text-black"}`}
        >
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={checklistItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-4"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={update.isPending}
        className={`m-4 p-4 rounded-lg ${
          update.isPending ? "bg-gray-400" : "bg-blue-500"
        }`}
      >
        <Text className="text-white text-center font-bold">
          {update.isPending ? "제출 중..." : "체크리스트 제출"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChecklistProgress;
