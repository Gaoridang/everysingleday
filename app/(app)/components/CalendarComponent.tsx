import { View, Text } from "react-native";
import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";

interface Props {
  onSelect?: (date: Date) => void;
}

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};

LocaleConfig.defaultLocale = "ko";

const CalendarComponent = ({ onSelect }: Props) => {
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          onSelect && onSelect(new Date(day.dateString));
        }}
      />
    </View>
  );
};

export default CalendarComponent;
