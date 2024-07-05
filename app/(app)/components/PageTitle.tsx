import React from "react";
import { Text, View } from "react-native";

interface Props {
  left?: string;
  right?: string;
  title: string;
  subTitle?: string;
}

const PageTitle = ({ title, subTitle, left, right }: Props) => {
  const splitedTitle = title?.split("//");
  const splitedSubTitle = subTitle?.split("//");

  return (
    <View className="gap-1 my-2">
      {splitedTitle.map((line, index) => (
        <Text className="text-3xl font-bold" key={index}>
          {line}
        </Text>
      ))}
      {splitedSubTitle &&
        splitedSubTitle.map((line, index) => (
          <Text className="text-xl font-semibold text-gray-700" key={index}>
            {line}
          </Text>
        ))}
    </View>
  );
};

export default PageTitle;
