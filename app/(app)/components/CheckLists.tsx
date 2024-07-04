import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useClass } from "~/app/context/ClassProvider";
import { useGetCheckLists } from "../hooks/useCheckList";
import RowList from "./RowList";
import { router } from "expo-router";

const isDatePassed = (dateString: string): boolean => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식
  return dateString < formattedToday;
};

const isDateToday = (dateString: string): boolean => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식
  return dateString === formattedToday;
};

const CheckLists = () => {
  const { currentClassId } = useClass();
  const { data, isLoading } = useGetCheckLists(currentClassId!);

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <ScrollView>
      {data?.map((item) => {
        const isPast = isDatePassed(item.scheduled_at);
        const isToday = isDateToday(item.scheduled_at);

        const right = {
          type: "button",
          content: `${isPast ? "마감" : "예정"}`,
        } as const;

        const content = {
          main: item.title,
          sub: item.scheduled_at,
        };

        // TODO: Link to the checklist detail screen
        const onPress = () => {
          router.push(`/(teacher)/checklists/${item.id}`);
        };

        return (
          <RowList
            key={item.id}
            type="link"
            onPress={onPress}
            content={content}
            right={right}
            className={`${
              isPast ? "opacity-30" : isToday ? "bg-slate-100" : ""
            }`}
          />
        );
      })}
    </ScrollView>
  );
};

export default CheckLists;
