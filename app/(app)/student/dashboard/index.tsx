import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { useClass } from "~/app/context/ClassProvider";
import ClassInfoCard from "../../components/ClassInfoCard";
import SelfCheckLists from "../../components/SelfCheckLists";
import Statistics from "../../components/Statistics";
import UserInfo from "../../components/UserInfo";
import { useGetMyCheckLists } from "../../hooks/useCheckList";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { currentClassId } = useClass();
  const { data: checklists } = useGetMyCheckLists(currentClassId, user?.id);

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
