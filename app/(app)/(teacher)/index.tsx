import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { useGetMainClass } from "../hooks/useUserClass";

const TeacherIndex = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data } = useGetMainClass(user?.id);

  useEffect(() => {
    redirectToMainClass();
  }, []);

  const redirectToMainClass = async () => {
    if (data?.class_id) {
      router.replace(`/(teacher)/dashboard`);
    } else {
      router.replace("/(teacher)/profile/CreateClassScreen");
    }
  };

  return (
    <View>
      <Text>Redirecting...</Text>
    </View>
  );
};

export default TeacherIndex;
