import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useClass } from "~/app/context/ClassProvider";

const StudentIndex = () => {
  const router = useRouter();
  const { currentClassId, isLoading } = useClass();

  useEffect(() => {
    if (!isLoading) {
      redirectToMainClass();
    }
  }, [currentClassId, isLoading]);

  const redirectToMainClass = () => {
    if (currentClassId) {
      router.replace(`/student/dashboard`);
    } else {
      router.replace("/student/profile");
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Redirecting... Current Class ID: {currentClassId || "None"}</Text>
    </View>
  );
};

export default StudentIndex;
