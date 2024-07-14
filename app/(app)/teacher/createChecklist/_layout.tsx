import { Stack } from "expo-router";
import React from "react";
import { ChecklistCreationProvider } from "~/app/context/CheckListCreationContext";

const CreateChecklistLayout = () => {
  return (
    <ChecklistCreationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen
          name="FormScreen"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="CalendarScreen"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </ChecklistCreationProvider>
  );
};

export default CreateChecklistLayout;
