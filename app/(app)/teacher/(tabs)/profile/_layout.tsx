import { Stack } from "expo-router";
import CustomStack from "~/app/(app)/components/CustomStack";

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
        name="ClassListScreen"
        options={{
          headerTitle: "학급 목록",
          headerBackTitle: "뒤로",
        }}
      />
      <Stack.Screen name="CreateClassScreen" />
      <Stack.Screen name="ClassInfoScreen" />
    </CustomStack>
  );
}
