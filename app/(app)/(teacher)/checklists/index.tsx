import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LinkButton from "../../components/ActionButton";

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <LinkButton
        href="/(teacher)/checklists/CreateCheckListScreen"
        text="체크리스트 만들기"
      />
    </View>
  );
};

export default index;
