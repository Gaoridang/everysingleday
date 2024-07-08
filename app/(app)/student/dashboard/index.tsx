import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { useClass } from "~/app/context/ClassProvider";
import ClassInfoCard from "../../components/ClassInfoCard";
import Statistics from "../../components/Statistics";
import UserInfo from "../../components/UserInfo";
import { useGetMyCheckLists } from "../../hooks/useCheckList";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { currentClassId } = useClass();
  const { data: checklists } = useGetMyCheckLists(currentClassId, user?.id);

  if (!currentClassId) {
    return (
      <View>
        <Text>클래스를 선택해주세요.</Text>
      </View>
    );
  }

  if (!checklists) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 gap-4">
      <UserInfo />
      <ClassInfoCard />
      <Statistics />
    </View>
  );
};

export default StudentDashboard;
