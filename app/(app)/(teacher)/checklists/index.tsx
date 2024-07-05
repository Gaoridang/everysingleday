import React from "react";
import { View } from "react-native";
import LinkButton from "../../components/ActionButton";
import CheckLists from "../../components/CheckLists";

const index = () => {
  return (
    <View className="flex-1">
      <CheckLists />
      <LinkButton
        href="/(teacher)/checklists/CreateCheckListScreen"
        text="체크리스트 만들기"
      />
    </View>
  );
};

export default index;
