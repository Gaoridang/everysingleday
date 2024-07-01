import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "expo-router";

const Home = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.replace("/login");
  };

  return (
    <View className="h-screen justify-center items-center">
      <Text>Protected Home</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
