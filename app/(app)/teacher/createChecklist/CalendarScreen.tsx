import React from "react";
import { View } from "react-native";
import {
  ChecklistCreationProvider,
  useChecklistCreation,
} from "~/app/context/CheckListCreationContext";
import CalendarComponent from "../../components/CalendarComponent";
import { router } from "expo-router";

const CalendarScreen = () => {
  const { dispatch } = useChecklistCreation();

  const handleSelect = (date: Date) => {
    dispatch({ type: "SET_SCHEDULED_AT", payload: date });
    router.back();
  };

  return (
    <View>
      <CalendarComponent onSelect={handleSelect} />
    </View>
  );
};

export default CalendarScreen;
