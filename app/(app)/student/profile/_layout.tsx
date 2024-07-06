// app/(teacher)/account/_layout.tsx
import { Stack } from "expo-router";
import CustomStack from "../../components/CustomStack";

export default function AccountLayout() {
  return (
    <CustomStack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="editModal"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ClassInfoScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ClassListScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="JoinClassScreen"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </CustomStack>
  );
}
