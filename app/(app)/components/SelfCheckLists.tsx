import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Tables } from "~/database.types";
import { useGetMyCheckLists } from "../hooks/useCheckList";
import { useAuth } from "~/app/context/AuthProvider";
import { useClass } from "~/app/context/ClassProvider";
import { cn } from "~/lib/utils";
import { router } from "expo-router";

const SelfCheckLists = () => {
  const { user } = useAuth();
  const { currentClassId } = useClass();
  const { data: checklists } = useGetMyCheckLists(currentClassId, user?.id);

  const bgColors = {
    draft: "bg-yellow-200",
    active: "bg-blue-200",
    completed: "bg-green-200",
  };

  return (
    <View className="border border-slate-500 rounded-lg overflow-hidden">
      <Text className="text-lg font-semibold bg-slate-200 p-4">
        나의 자가점검
      </Text>
      {checklists?.map((checklist) => (
        <View key={checklist.id} className="p-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <View
                className={cn(
                  bgColors[checklist.status!],
                  "w-4 h-4 rounded-full border border-gray-500"
                )}
              />
              <Text>{checklist.title}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push(`/student/checklists/${checklist.id}`)}
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
