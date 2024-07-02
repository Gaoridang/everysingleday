import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarUpload from "~/app/onboarding/avatar";
import { Button } from "~/components/ui/button";

interface Profile {
  name: string;
  email: string;
  avatar_url: string;
}

const EditProfile = () => {
  const router = useRouter();
  const { profile: profileParam } = useLocalSearchParams<{ profile: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (profileParam) {
      setProfile(JSON.parse(profileParam));
    }
  }, [profileParam]);

  const handleSave = () => {
    // 여기에 프로필 저장 로직 구현
    console.log("Saving profile:", profile);
    router.back();
  };

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 px-6 gap-6">
      <KeyboardAvoidingView>
        <Text>Edit Profile</Text>
        <AvatarUpload />
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
          <Button variant="default" onPress={handleSave}>
            <Text className="text-white font-bold">저장</Text>
          </Button>
          <Button variant="outline" onPress={() => router.back()}>
            <Text className="font-semibold">취소</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfile;
