import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../utils/supabase";
import { useRouter } from "expo-router";

interface Profile {
  name: string;
  role: string;
  avatar_url: string;
}

const home = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name, role, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("error", error);
      } else if (data && data.name && data.role) {
        setProfile(data);
      } else {
        router.replace("/onboarding/role");
      }
    };

    getProfile();
  }, []);

  return (
    <View>
      <Text>home</Text>
      <Text>{profile?.name || user?.user_metadata.full_name}</Text>
      <Text>{profile?.role}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default home;
