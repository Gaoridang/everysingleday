import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import RowList from "~/app/(app)/components/RowList";
import { useGetChecklistItems } from "~/app/(app)/hooks/useCheckList";

const index = () => {
  const { checklistId } = useLocalSearchParams();
  const { data } = useGetChecklistItems(checklistId as string);

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
