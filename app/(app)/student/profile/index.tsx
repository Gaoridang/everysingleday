import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { supabase } from "~/app/utils/supabase";
import LinkButton from "../../components/ActionButton";
import ClassInfo from "../../components/ClassInfo";
import { Profile } from "~/app/types";

const StudentAccount = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("name, email, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        throw error;
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  console.log(profile);

  return (
    <View className="gap-6">
      <View className="relative gap-4 justify-center items-center">
        <View>
          {profile?.avatar_url ? (
            <Image
              className="w-24 h-24 rounded-full"
              source={{ uri: profile.avatar_url }}
            />
          ) : (
            <View className="w-24 h-24 bg-slate-400 rounded-full items-center justify-center">
              <Text className="text-gray-500">사진 선택</Text>
            </View>
          )}
        </View>
        <View>
          <Text className="text-center text-2xl font-semibold">
            {profile?.name}
          </Text>
          <Text className="text-center text-base">{profile?.email}</Text>
          <LinkButton href="/student/profile/editModal" text="프로필 수정" />
        </View>
      </View>
      <ClassInfo role="student" />
      {/* 로그아웃 */}
      <TouchableOpacity onPress={signOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentAccount;
