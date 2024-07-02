import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { supabase } from "~/app/utils/supabase";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface Profile {
  name: string;
  email: string;
  avatar_url: string;
}

const TeacherAccount = () => {
  // 프로필 정보, 학급 정보
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  const handleEditProfile = () => {
    if (profile) {
      router.push({
        pathname: "/account/EditProfile",
        params: { profile: JSON.stringify(profile) },
      });
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name, email, avatar_url")
        .eq("id", user?.id)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
    };

    if (user) {
      getProfile();
    }
  }, []);

  return (
    <View className="px-6">
      <Card className="relative justify-center items-center">
        <CardHeader>
          <CardTitle>
            {profile?.avatar_url ? (
              <Image
                className="w-24 h-24 rounded-full bg-slate-400"
                source={{ uri: profile?.avatar_url }}
              />
            ) : (
              <View className="w-24 h-24 bg-slate-400 rounded-full items-center justify-center">
                <Text className="text-gray-500">Select Avatar</Text>
              </View>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-center text-2xl font-semibold">
            {profile?.name}
          </Text>
          <Text className="text-center text-base">{profile?.email}</Text>
          <Button
            className="mt-4"
            variant="secondary"
            onPress={handleEditProfile}
          >
            <Text>프로필 수정</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};

export default TeacherAccount;
