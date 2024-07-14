import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";
import { useAuth } from "~/app/context/AuthProvider";
import { useClass } from "~/app/context/ClassProvider";
import { Tables } from "~/database.types";
import { ProgressChart } from "react-native-chart-kit";
import { router } from "expo-router";

const StudentChecklistResults = () => {
  const { user } = useAuth();
  const { currentClassId } = useClass();

  const {
    data: checklists,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["student_checklist_results"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_class_checklist_results")
        .select("*")
        .eq("student_id", user?.id!)
        .eq("class_id", currentClassId!);

      if (error) {
        throw error;
      } else {
        return data;
      }
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!checklists || checklists.length === 0)
    return <Text>No checklists available</Text>;

  const renderChecklistItem = ({
    item,
  }: {
    item: Tables<"student_class_checklist_results">;
  }) => (
    <TouchableOpacity
      onPress={() =>
        router.push(`/student/checklists/result/${item.checklist_id}`)
      }
      className="flex-row justify-between items-center bg-white p-4 mb-2 rounded-lg"
    >
      <View>
        <Text className="text-lg font-bold">{item.checklist_title}</Text>
        <Text className="text-sm text-gray-600">
          Scheduled:{" "}
          {new Date(item.checklist_scheduled_at!).toLocaleDateString()}
        </Text>
      </View>
      <View className="justify-center items-center">
        <ProgressChart
          data={{
            labels: ["Completed"],
            data: [item.completed_items! / item.total_items!],
          }}
          width={50}
          height={50}
          strokeWidth={4}
          radius={16}
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          hideLegend={true}
        />
        <Text className="text-sm text-gray-600">
          {item.completed_items} / {item.total_items}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={checklists}
        renderItem={renderChecklistItem}
        keyExtractor={(item) => item.checklist_id!}
      />
    </View>
  );
};

export default StudentChecklistResults;
