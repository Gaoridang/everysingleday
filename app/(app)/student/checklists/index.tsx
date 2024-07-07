import React from "react";
import { View } from "react-native";
import LinkButton from "../../components/ActionButton";
import CheckLists from "../../components/PeerCheckLists";
import { useGetCheckLists } from "../../hooks/useCheckList";
import { useClass } from "~/app/context/ClassProvider";
import { Text } from "react-native";
import StudentChecklistResults from "../../components/StudentChecklistResults";

const index = () => {
  const { currentClassId } = useClass();
  const { data: checklists } = useGetCheckLists(currentClassId!);

  if (!checklists) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="relative flex-1">
      <StudentChecklistResults />
      <LinkButton
        className="absolute bottom-0 right-0"
        href="/student/checklists/CreateCheckListScreen"
        text="체크리스트 만들기"
      />
    </View>
  );
};

export default index;
