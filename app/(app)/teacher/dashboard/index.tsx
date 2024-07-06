import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useClass } from "~/app/context/ClassProvider";
import { supabase } from "~/app/utils/supabase";
import ChecklistItem from "../../components/ChecklistItem";
import ClassInfoCard from "../../components/ClassInfoCard";
import UserInfo from "../../components/UserInfo";
import { useGetTodayCheckLists } from "../../hooks/useCheckList";

const TeacherDashboard = () => {
  const { currentClassId } = useClass();

  const {
    data: checklists,
    isLoading: checklistsLoading,
    refetch,
  } = useGetTodayCheckLists(currentClassId);

  useEffect(() => {
    const subscription = supabase
      .channel("postgres_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [refetch]);

  return (
    <View className="gap-4">
      <View>
        <UserInfo />
        <ClassInfoCard />
      </View>
      {checklistsLoading || !checklists ? (
        <Text>Loading...</Text>
      ) : (
        <View className="bg-slate-200 border border-slate-400 rounded-xl overflow-hidden">
          <Text className="p-4 text-lg font-bold">오늘의 체크리스트</Text>
          {checklists.map((item) => (
            <ChecklistItem key={item.id} item={item} />
          ))}
        </View>
      )}
    </View>
  );
};

export default TeacherDashboard;
