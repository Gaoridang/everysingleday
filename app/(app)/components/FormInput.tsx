import { View, Text, TextInput } from "react-native";
import React, { Component } from "react";

interface Props extends Component<TextInput> {
  className?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightIconAction?: () => void;
}

const FormInput = () => {
  return (
    <View>
      <Text>FormInput</Text>
    </View>
  );
};

export default FormInput;
