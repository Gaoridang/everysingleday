import React from "react";
import { Text, View } from "react-native";
import LinkButton from "../../components/ActionButton";
import CheckLists from "../../components/PeerCheckLists";
import { useClass } from "~/app/context/ClassProvider";
import { useGetCheckLists } from "../../hooks/useCheckList";

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
    <View className="flex-1">
      <CheckLists checklists={checklists} />
      <LinkButton
        href="/(teacher)/checklists/CreateCheckListScreen"
        text="체크리스트 만들기"
      />
    </View>
  );
};

export default index;
