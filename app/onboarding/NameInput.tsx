import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

interface Props {
  name: string;
  setName: (name: string) => void;
}

const NameInput = ({ name, setName }: Props) => {
  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="이름을 입력해주세요"
      />
    </View>
  );
};

export default NameInput;
