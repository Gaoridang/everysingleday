import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChecklistCreationProvider } from "~/app/context/CheckListCreationContext";
import { useTabBar } from "~/app/context/TabBarProvider";

const ChecklistForm = () => {
  const { hideTabBar, showTabBar } = useTabBar();

  useEffect(() => {
    hideTabBar();
    return () => {
      showTabBar();
    };
  }, []);

  return <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}></SafeAreaView>;
};

const ChecklistCreationPage = () => (
  <ChecklistCreationProvider>
    <ChecklistForm />
  </ChecklistCreationProvider>
);

export default ChecklistCreationPage;
