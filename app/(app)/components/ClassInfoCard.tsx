import { View, Text } from "react-native";
import React from "react";
import { useClass } from "~/app/context/ClassProvider";
import { useGetClassById } from "../hooks/useUserClass";
import GenerateClassCode from "./GenerateClassCode";
import { useAuth } from "~/app/context/AuthProvider";

const ClassInfoCard = () => {
  const { userRole } = useAuth();
  const { currentClassId } = useClass();
  const { data: userClass } = useGetClassById(currentClassId!);

  return (
    <View className="flex-row justify-between items-center p-4 rounded-xl bg-slate-900">
      <View>
        <Text className="text-slate-100 text-3xl font-bold">
          {userClass?.school} ✨
        </Text>
        <Text className="text-lg font-semibold text-slate-200">{`${userClass?.grade}학년 ${userClass?.class_number}반`}</Text>
      </View>
      {userRole === "teacher" && <GenerateClassCode />}
    </View>
  );
};

export default ClassInfoCard;
