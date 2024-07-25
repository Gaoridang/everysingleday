import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { useProfile } from "../hooks/useProfile";

const UserInfo = () => {
  const { user, userRole } = useAuth();
  const { data: profile } = useProfile(user?.id);

  const onPress = () => {
    router.push({
      pathname: `/${userRole}/profile`,
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center">
        <Image
          source={{ uri: profile?.avatar_url || "" }}
          className="w-12 h-12 rounded-full mr-2"
        />
        <Text className="text-lg font-semibold text-slate-500">
          {profile?.name}
        </Text>
        <Entypo name="chevron-right" size={22} className="opacity-50" />
      </View>
    </TouchableOpacity>
  );
};

export default UserInfo;
