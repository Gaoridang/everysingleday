import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../utils/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    } else {
      router.replace("/profile");
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-3xl mb-12">Every Single Day</Text>
      <TextInput
        className="w-full text-base border-b p-2"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholder="이메일"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full text-base border-b p-2"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Password"
      />
      <TouchableOpacity
        className="w-full border rounded-md py-3 mt-4"
        onPress={handleSignUp}
      >
        <Text className="text-center text-base">회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text>이미 계정이 있으신가요? 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}
