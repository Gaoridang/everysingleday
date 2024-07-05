import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useClass } from "~/app/context/ClassProvider";
import PageTitle from "../../components/PageTitle";
import { useGetClassById } from "../../hooks/useUserClass";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "~/app/context/AuthProvider";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useGetTodayCheckLists } from "../../hooks/useCheckList";
import RowList from "../../components/RowList";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { currentClassId } = useClass();
  const { data: userClass, isLoading } = useGetClassById(currentClassId!);
  const { data: profile } = useUser(user?.id);
  const { data: checklists, isLoading: checklistsLoading } =
    useGetTodayCheckLists(currentClassId);

  console.log("checklist", checklists);

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
              source={{ uri: profile?.avatar_url }}
              className="w-12 h-12 rounded-full mr-2"
            />
            <Text className="text-lg font-semibold text-slate-500">
              {profile?.name}
            </Text>
            <Entypo name="chevron-right" size={22} className="opacity-50" />
          </View>
        </Link>
        <View className="p-4 rounded-xl bg-slate-900">
          <Text className="text-slate-100 text-3xl font-bold">
            {userClass.school} ✨
          </Text>
          <Text className="text-lg font-semibold text-slate-200">{`${userClass.grade}학년 ${userClass.class_number}반`}</Text>
        </View>
      </View>
      {checklistsLoading || !checklists ? (
        <Text>Loading...</Text>
      ) : (
        <View className="bg-slate-200 border border-slate-400 rounded-xl overflow-hidden">
          <Text className="p-4 text-lg font-bold">오늘의 체크리스트</Text>
          {checklists.map((item) => {
            return (
              <RowList
                className="bg-white"
                key={item.id}
                type="link"
                right={{
                  type: "button",
                  content: "알림 보내기",
                }}
                content={{
                  main: item.title,
                  sub: item.scheduled_at,
                }}
                onPress={() => {
                  console.log("체크리스트 시작", item.title);
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default TeacherDashboard;
