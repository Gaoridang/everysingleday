import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import LinkButton from "~/app/(app)/components/ActionButton";
import PageTitle from "~/app/(app)/components/PageTitle";
import CheckLists from "~/app/(app)/components/PeerCheckLists";
import { useGetCheckLists } from "~/app/(app)/hooks/useCheckList";
import { useClass } from "~/app/context/ClassProvider";

const index = () => {
  const { currentClassId } = useClass();
  const { data: checklists } = useGetCheckLists(currentClassId!);

  if (!currentClassId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>아직 학급이 없습니다.</Text>
        <LinkButton
          href="/(teacher)/profile/CreateClassScreen"
          text="학급 만들기"
        />
      </View>
    );
  }

  if (!checklists) {
    return <ActivityIndicator />;
  }

  return (
    <View className="h-full relative">
      <PageTitle title="체크리스트를//만들어보세요!" />
      <CheckLists checklists={checklists} />
      <TouchableOpacity
        className="absolute w-12 h-12 right-0 bottom-0 justify-end p-2 bg-green-500 border-2 rounded-full"
        onPress={() => router.push("/teacher/createChecklist/FormScreen")}
      >
        <Feather name="plus" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default index;
