import { View, Text } from "react-native";
import React from "react";
import UserInfo from "../../components/UserInfo";
import ClassInfoCard from "../../components/ClassInfoCard";
import Statistics from "../../components/Statistics";
import { useGetMyCheckLists } from "../../hooks/useCheckList";
import { useAuth } from "~/app/context/AuthProvider";
import { useClass } from "~/app/context/ClassProvider";
import CheckLists from "../../components/PeerCheckLists";
import SelfCheckLists from "../../components/SelfCheckLists";

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
    <View className="flex-1">
      <UserInfo />
      <ClassInfoCard />
      <SelfCheckLists />
      <Statistics />
    </View>
  );
};

export default StudentDashboard;
