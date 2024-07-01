import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../utils/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // 여기에 실제 로그인 로직을 구현합니다.
    // 예를 들어, Supabase를 사용한 로그인 등
    console.log("로그인 로직 실행");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    } else {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        throw profileError;
      } else {
        const role = profileData.role;
        const rootRoute = "/(protected)";
        const route = `${rootRoute}/(${role})`;

        router.replace(route);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-2xl">Every Single Day</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholder="이메일"
        autoCapitalize="none"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Password"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
