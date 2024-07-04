import { View, Text, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetChecklistItems } from "~/app/(app)/hooks/useCheckList";
import RowList from "~/app/(app)/components/RowList";

const index = () => {
  const { checklistId } = useLocalSearchParams();
  const { data } = useGetChecklistItems(checklistId as string);

  console.log(checklistId);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const left = {
            type: "text",
            content: item.order_num + 1,
          } as const;

          const content = {
            main: item.description,
          };

          return <RowList type="default" left={left} content={content} />;
        }}
      />
    </View>
  );
};

export default index;
