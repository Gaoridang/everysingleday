import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { useClass } from "~/app/context/ClassProvider";
import ChecklistItem from "../../components/ChecklistItem";
import { useGetTodayCheckLists } from "../../hooks/useCheckList";
import { useUser } from "../../hooks/useUser";
import { useGetClassById } from "../../hooks/useUserClass";
import { supabase } from "~/app/utils/supabase";
import GenerateClassCode from "../../components/GenerateClassCode";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { currentClassId } = useClass();
  const { data: userClass, isLoading } = useGetClassById(currentClassId!);
  const { data: profile } = useUser(user?.id);
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

  if (!userClass || isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="gap-4">
      <View>
        <Link href={"/(teacher)/profile"} className="active:opacity-50 mb-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: profile?.avatar_url || "" }}
              className="w-12 h-12 rounded-full mr-2"
            />
            <Text className="text-lg font-semibold text-slate-500">
              {profile?.name}
            </Text>
            <Entypo name="chevron-right" size={22} className="opacity-50" />
          </View>
        </Link>
        <View className="flex-row justify-between items-center p-4 rounded-xl bg-slate-900">
          <View>
            <Text className="text-slate-100 text-3xl font-bold">
              {userClass.school} ✨
            </Text>
            <Text className="text-lg font-semibold text-slate-200">{`${userClass.grade}학년 ${userClass.class_number}반`}</Text>
          </View>
          <GenerateClassCode />
        </View>
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
