import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import AvatarUpload from "../../../onboarding/avatar";
import { supabase } from "~/app/utils/supabase";

interface Profile {
  name: string;
  email: string;
  avatar_url: string;
}

const editModal = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("name, email, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarChange = (newAvatarPath: string) => {
    if (profile) {
      setProfile({ ...profile, avatar_url: newAvatarPath });
    }
  };

  const handleSave = async () => {
    if (!profile || !user) return;

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        name: profile.name,
        email: profile.email,
      });

      if (error) throw error;

      console.log("Profile saved successfully");
      router.back();
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView className="flex-1 p-6 gap-6">
      <AvatarUpload
        currentAvatarUrl={profile.avatar_url}
        onAvatarChange={handleAvatarChange}
      />
      <TextInput
        className="py-3 border-b border-b-slate-300"
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
        placeholder="Name"
      />
      <TextInput
        className="py-2 border-b border-b-slate-300"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        placeholder="Email"
      />
      <View className="gap-2">
        <TouchableOpacity onPress={handleSave}>
          <Text>저장</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default editModal;
