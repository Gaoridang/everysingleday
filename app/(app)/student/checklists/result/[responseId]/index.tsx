import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useChecklistResultDetail } from "~/app/(app)/hooks/useChecklistResult";

const ChecklistResultDetail = () => {
  const { responseId } = useLocalSearchParams();
  const {
    data: result,
    isLoading,
    error,
  } = useChecklistResultDetail(responseId as string);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!result) return <Text>No result found</Text>;

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">{result.checklist_title}</Text>
      <Text className="text-gray-600 mb-2">{result.checklist_description}</Text>
      <Text className="mb-2">
        Scheduled:{" "}
        {new Date(result.checklist_scheduled_at!).toLocaleDateString()}
      </Text>
      <Text className="mb-2">Status: {result.response_status}</Text>
      <Text className="mb-2">Achievement: {result.achievement_rate}%</Text>
      <Text className="mb-4">
        Completed: {result.completed_items} / {result.total_items}
      </Text>

      <Text className="text-xl font-bold mb-2">Checklist Items</Text>
      {result.items.map((item, index) => (
        <View key={item.id} className="mb-2 p-2 bg-gray-100 rounded">
          <Text>
            {index + 1}. {item.description}
          </Text>
          <Text className="text-gray-600">
            {item.response ? "✅ Completed" : "❌ Not completed"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ChecklistResultDetail;
