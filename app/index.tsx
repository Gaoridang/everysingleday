import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "./context/AuthProvider";
import { Redirect } from "expo-router";

const index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={"(auth)/login"} />;
  }

  return null;
};

export default index;

const styles = StyleSheet.create({});
