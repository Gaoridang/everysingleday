import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { useChecklistResult } from "~/app/(app)/hooks/useChecklistResult";

const ChecklistResultPage = () => {
  const { responseId } = useLocalSearchParams();
  const {
    data: result,
    isLoading,
    error,
  } = useChecklistResult(responseId as string);

  if (isLoading || !result) {
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

  const completedItems = result.items.filter((item) => item.response).length;
  const totalItems = result.items.length;
  const completionRate = (completedItems / totalItems) * 100;

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">{result.checklist?.title}</Text>
      <Text className="text-gray-600 mb-6">
        {result.checklist?.description}
      </Text>

      <View className="bg-blue-100 p-4 rounded-lg mb-6">
        <Text className="text-lg font-semibold mb-2">완료율</Text>
        <View className="w-full bg-gray-200 rounded-full h-2.5">
          <View
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${completionRate}%` }}
          />
        </View>
        <Text className="text-right mt-1">{completionRate.toFixed(1)}%</Text>
      </View>

      <Text className="text-xl font-semibold mb-4">체크리스트 항목</Text>
      {result.items.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center mb-2 p-2 bg-gray-50 rounded"
        >
          <View
            className={`w-6 h-6 rounded-full mr-3 ${
              item.response ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <Text className={item.response ? "text-black" : "text-gray-500"}>
            {item.checklist_item?.description}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ChecklistResultPage;
