import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { useGetClasses, useGetMainClass } from "../hooks/useUserClass";

interface Props {
  role: "teacher" | "student" | "parent";
}

interface ClassInfo {
  school: string;
  grade: number;
  class_number: number;
}

const ClassInfo = ({ role }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const { data: mainClassId } = useGetMainClass(user?.id);
  const { data: classList } = useGetClasses();

  const classInfo = classList?.find(
    (item) => item.class_id === mainClassId?.class_id
  );

  const classInfoLink = `${role}/profile/ClassInfoScreen`;
  const classCreateLink = `${role}/profile/CreateClassScreen`;
  const classJoinLink = `${role}/profile/JoinClassScreen`;
  const text = role === "teacher" ? "만들기" : "가입하기";

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: classInfoLink,
          params: {
            classId: classInfo?.class_id,
          },
        })
      }
      className="flex-row justify-between items-center p-4 bg-slate-100 rounded-lg"
    >
      <View>
        <Text className="text-base font-medium mb-2">학급 정보</Text>
        {classInfo ? (
          <Text className="text-lg font-bold">
            {classInfo?.school} {classInfo?.grade}학년 {classInfo?.class_number}
            반
          </Text>
        ) : (
          <Text>학급이 없습니다.</Text>
        )}
      </View>
      {classInfo ? (
        <Feather name="chevron-right" size={24} color="#4B5563" />
      ) : (
        <TouchableOpacity
          onPress={() =>
            router.push(role === "teacher" ? classCreateLink : classJoinLink)
          }
        >
          <Text className="font-semibold">{text}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ClassInfo;
