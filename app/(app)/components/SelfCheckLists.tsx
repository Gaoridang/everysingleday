import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { useClass } from "~/app/context/ClassProvider";
import { cn } from "~/lib/utils";
import { useGetMyCheckLists } from "../hooks/useCheckList";

const SelfCheckLists = () => {
  const { user } = useAuth();
  const { currentClassId } = useClass();
  const { data: checklists } = useGetMyCheckLists(currentClassId, user?.id);

  const bgColors = {
    not_started: "bg-yellow-200",
    completed: "bg-green-200",
  };

  return (
    <View className="border border-slate-500 rounded-lg overflow-hidden">
      <Text className="text-lg font-semibold bg-slate-200 p-4">
        나의 자가점검
      </Text>
      {checklists?.map((checklist) => (
        <View key={checklist.checklist_id} className="p-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <View
                className={cn(
                  bgColors[checklist.response_status as keyof typeof bgColors],
                  "w-4 h-4 rounded-full border border-gray-500"
                )}
              />
              <Text>{checklist.checklist_title}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push(`/student/checklists/${checklist.checklist_id}`)
              }
            >
              <Text>시작하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SelfCheckLists;
