import { router } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { Tables } from "~/database.types";
import RowList from "./RowList";
import { useAuth } from "~/app/context/AuthProvider";

const isDatePassed = (dateString: string): boolean => {
  if (!dateString) return false;

  const offset = new Date().getTimezoneOffset();
  const today = new Date(Date.now() - offset * 60 * 1000);
  const formattedToday = today.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식

  return dateString < formattedToday;
};

const isDateToday = (dateString: string): boolean => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식
  return dateString === formattedToday;
};

interface Props {
  checklists: Partial<Tables<"checklists">>[];
}

const CheckLists = ({ checklists }: Props) => {
  const { userRole } = useAuth();

  return (
    <ScrollView className="flex-1">
      {checklists?.map((item) => {
        const isPast = isDatePassed(item.scheduled_at!);
        const isToday = isDateToday(item.scheduled_at!);

        const right = {
          type: "button",
          content: `${isPast ? "마감" : "예정"}`,
        } as const;

        const content = {
          main: item.title!,
          sub: item.scheduled_at!,
        };

        // TODO: Link to the checklist detail screen
        const onPress = () => {
          router.push(`/${userRole}/checklists/${item.id}`);
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
